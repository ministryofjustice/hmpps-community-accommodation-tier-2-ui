import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Key, pathToRegexp } from 'path-to-regexp'
import { auditService } from '@ministryofjustice/hmpps-audit-client'
import logger from '../../logger'
import config from '../config'

export type AuditEventSpec = {
  auditEvent?: string
  auditBodyParams?: string[]
  redirectAuditEventSpecs?: RedirectAuditEventSpec[]
  additionalMetadata?: Record<string, string>
}

type RedirectAuditEventSpec = { path: string; auditEvent: string }
type RedirectAuditMatcher = { keys: Key[]; auditEvent: string; regExp: RegExp }

export const auditMiddleware = (handler: RequestHandler, auditEventSpec?: AuditEventSpec) => {
  if (auditEventSpec) {
    const redirectMatchers: RedirectAuditMatcher[] = auditEventSpec.redirectAuditEventSpecs?.map(
      ({ path, auditEvent: redirectAuditEvent }) => {
        const parsedRegex = pathToRegexp(path)
        return { auditEvent: redirectAuditEvent, keys: parsedRegex.keys, regExp: parsedRegex.regexp }
      },
    )

    return wrapHandler(
      handler,
      auditEventSpec?.auditEvent,
      auditEventSpec?.auditBodyParams,
      auditEventSpec?.additionalMetadata,
      redirectMatchers,
    )
  }
  return handler
}

const wrapHandler =
  (
    handler: RequestHandler,
    auditEvent: string | undefined,
    auditBodyParams: string[] | undefined,
    additionalMetadata: Record<string, string> | undefined,
    redirectMatchers: RedirectAuditMatcher[] | undefined,
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectAuditEvent: string
    let redirectParams: Record<string, string>

    const userUuid = res?.locals?.user?.username

    if (!userUuid) {
      logger.error('User without a username is attempt to access an audited path')
      res.redirect('/authError')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let handlerError: any

    await handler(req, res, error => {
      handlerError = error
    })

    if (!handlerError) {
      const encodedRedirectLocation = res.get('Location')
      if (encodedRedirectLocation && redirectMatchers) {
        const redirectPath = decodeURI(encodedRedirectLocation)
        redirectParams = {}

        redirectMatchers.some(redirectMatcher => {
          if (matchAuditEvent(redirectPath, redirectMatcher, redirectParams)) {
            redirectAuditEvent = redirectMatcher.auditEvent
            return true
          }
          return false
        })
      }

      if (auditEvent) {
        await sendAuditMessage(auditEvent, userUuid, {
          ...auditDetails(req, auditBodyParams),
          ...additionalMetadata,
        })
      }

      if (redirectAuditEvent) {
        await sendAuditMessage(redirectAuditEvent, userUuid, {
          ...redirectParams,
          ...additionalMetadata,
        })
      }
    } else {
      throw handlerError
    }
  }

const auditDetails = (req: Request, auditBodyParams: string[] | undefined) => {
  if (!auditBodyParams) {
    return req.params
  }

  return {
    ...req.params,
    ...auditBodyParams.reduce(
      (previous, current) => (req.body[current] ? { ...previous, [current]: req.body[current] } : previous),
      {},
    ),
  }
}

const sendAuditMessage = async (auditEvent: string, username: string, details: Record<string, string>) => {
  const jsonDetails = JSON.stringify(details)

  const { serviceName, logErrors } = config.apis.audit

  try {
    logger.info(`Sending audit message ${auditEvent} (${jsonDetails})`)
    await auditService.sendAuditMessage({
      action: auditEvent,
      who: username,
      service: serviceName,
      logErrors,
      details: jsonDetails,
    })
  } catch (error) {
    if (logErrors) {
      logger.error('Problem sending audit message', error)
    }
  }
}

const matchAuditEvent = (
  path: string,
  redirectMatcher: RedirectAuditMatcher,
  redirectParams: Record<string, string>,
) => {
  const matches = redirectMatcher.regExp.exec(path)

  if (matches) {
    redirectMatcher.keys.forEach((key, i) => {
      const param = key.name
      redirectParams[param] = decodeURIComponent(matches[i + 1])
    })

    return true
  }
  return false
}
