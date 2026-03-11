/* istanbul ignore file */

import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
import { AuditEventSpec, auditMiddleware } from '../middleware/auditMiddleware'
import validateMiddleware from '../middleware/validateMiddleware'
import { fieldValidators } from './validators'

type RoutingFunction = (path: string | string[], handler: RequestHandler, auditEventSpec?: AuditEventSpec) => Router

type Actions = {
  get: RoutingFunction
  post: RoutingFunction
  put: RoutingFunction
}

export function actions(router: Router): Actions {
  return {
    get: (path: string | string[], handler: RequestHandler, auditEventSpec?: AuditEventSpec) =>
      router.get(path, asyncMiddleware(validateMiddleware(auditMiddleware(handler, auditEventSpec), fieldValidators))),
    post: (path: string | string[], handler: RequestHandler, auditEventSpec?: AuditEventSpec) =>
      router.post(path, asyncMiddleware(validateMiddleware(auditMiddleware(handler, auditEventSpec), fieldValidators))),
    put: (path: string | string[], handler: RequestHandler, auditEventSpec?: AuditEventSpec) =>
      router.put(path, asyncMiddleware(validateMiddleware(auditMiddleware(handler, auditEventSpec), fieldValidators))),
  }
}
