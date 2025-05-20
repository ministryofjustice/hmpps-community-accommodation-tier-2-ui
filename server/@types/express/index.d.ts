export default {}

declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    nowInMinutes: number
    previousPage: string
    pageReferers: Record<string, string>
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
      staffId?: string
    }

    interface Request {
      verified?: boolean
      id: string

      flash(type: string, message: string | ErrorMessages | Array<ErrorSummary> | Record<string, unknown>): number

      logout(done: (err: unknown) => void): void
    }
  }
}

declare module 'express' {
  interface TypedRequest<T extends Query, U = Body> extends Express.Request {
    body: U
    params: T
  }

  interface TypedRequestHandler<T, U = Response> extends Express.RequestHandler {
    (req: T, res: U, next: () => void): void
  }
}
