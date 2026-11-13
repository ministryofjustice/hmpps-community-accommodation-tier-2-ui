/* eslint-disable @typescript-eslint/no-explicit-any */
import promClient from 'prom-client'

jest.mock('prom-client')

const mockGaugeInstance: any = {
  labels: jest.fn().mockReturnThis(),
  set: jest.fn(),
}

jest.mocked(promClient.Gauge).mockImplementation(() => mockGaugeInstance)

describe('healthCheck', () => {
  let createHealthCheckWithPrometheusHandler: any
  let mockReq: any
  let mockRes: any
  let mockNext: any
  let mockMiddleware: any

  beforeAll(async () => {
    const module = await import('./healthCheck')
    createHealthCheckWithPrometheusHandler = module.healthCheckWithPrometheusHandler
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockGaugeInstance.labels.mockClear()
    mockGaugeInstance.set.mockClear()

    mockReq = {}
    mockNext = jest.fn()

    mockRes = {
      json: jest.fn().mockReturnValue(mockRes),
    }

    mockMiddleware = {
      health: jest.fn((req, res, next) => {
        res.json({
          components: {
            'service-1': { status: 'UP', details: {} },
            'service-2': { status: 'DOWN', details: {} },
          },
        })
        if (next) next()
      }),
    }
  })

  describe('healthCheckWithPrometheusHandler', () => {
    it('should create a handler function', () => {
      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      expect(typeof handler).toBe('function')
    })

    it('should call middleware.health', () => {
      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      handler(mockReq, mockRes, mockNext)

      expect(mockMiddleware.health).toHaveBeenCalledWith(mockReq, mockRes, expect.any(Function))
    })

    it('should intercept res.json and update gauge for UP status', () => {
      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      handler(mockReq, mockRes, mockNext)

      expect(mockGaugeInstance.labels).toHaveBeenCalledWith('service-1')
      expect(mockGaugeInstance.set).toHaveBeenCalledWith(1)
    })

    it('should set gauge to 0 for DOWN status', () => {
      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      handler(mockReq, mockRes, mockNext)

      expect(mockGaugeInstance.labels).toHaveBeenCalledWith('service-2')
      expect(mockGaugeInstance.set).toHaveBeenCalledWith(0)
    })

    it('should still call original res.json with the response body', () => {
      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      const originalJson = mockRes.json

      handler(mockReq, mockRes, mockNext)

      expect(originalJson).toHaveBeenCalled()
    })

    it('should handle response with no components', () => {
      mockMiddleware.health = jest.fn((req, res, next) => {
        res.json({})
        if (next) next()
      })

      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      expect(() => {
        handler(mockReq, mockRes, mockNext)
      }).not.toThrow()
    })

    it('should handle multiple services', () => {
      mockMiddleware.health = jest.fn((req, res, next) => {
        res.json({
          components: {
            auth: { status: 'UP', details: {} },
            database: { status: 'UP', details: {} },
            cache: { status: 'DOWN', details: {} },
          },
        })
        if (next) next()
      })

      const handler = createHealthCheckWithPrometheusHandler(mockMiddleware)
      handler(mockReq, mockRes, mockNext)

      expect(mockGaugeInstance.labels).toHaveBeenCalledWith('auth')
      expect(mockGaugeInstance.labels).toHaveBeenCalledWith('database')
      expect(mockGaugeInstance.labels).toHaveBeenCalledWith('cache')
    })
  })
})
