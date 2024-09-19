import { RequestHandler } from 'express'

const trimStringValues = (body?: Record<string, unknown>) =>
  body
    ? Object.entries(body).forEach(([key, value]) => {
        body[key] = typeof value === 'string' ? value.trim() : value
      })
    : undefined

export default function trimInput(): RequestHandler {
  return async (req, res, next) => {
    trimStringValues(req.body)
    trimStringValues(req.query)

    next()
  }
}
