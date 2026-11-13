/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from 'express'
import promClient from 'prom-client'

const healthCheckGauge = new promClient.Gauge({
  name: 'upstream_healthcheck',
  help: 'health of an upstream dependency - 1 = healthy, 0 = not healthy',
  labelNames: ['service'],
})

export const healthCheckWithPrometheusHandler = (middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res)
    res.json = function interceptJson(body: any) {
      if (body.components) {
        Object.entries(body.components).forEach(([serviceName, checkResult]: [string, any]) => {
          const val = checkResult?.status === 'UP' ? 1 : 0
          healthCheckGauge.labels(serviceName).set(val)
        })
      }
      return originalJson(body)
    }
    middleware.health(req, res, next)
  }
}
