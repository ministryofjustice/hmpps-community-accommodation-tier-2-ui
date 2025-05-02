import { Request } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { Session } from 'express-session'
import SessionService from './sessionService'

describe('SessionService', () => {
  const service = new SessionService()

  describe('getPageBackLink', () => {
    const matchList = ['/pattern1/:param', '/pattern2/']
    const pagePattern = 'page-Pattern'

    const mockRequest = (referer: string, lastStoredReferer: string): DeepMocked<Request> =>
      createMock<Request>({
        headers: { referer },
        session: {
          pageReferers: {
            [pagePattern]: lastStoredReferer,
          },
        },
      })

    const matchingReferer = 'http://domain/pattern1/112233445566'
    const nonMatchingReferer = 'http://domain/pattern3/someParameter'
    const lastStoredReferer = 'http://last/stored/222333444555'

    it('should return the referer if it matches a provided path', () => {
      const request = mockRequest(matchingReferer, undefined)
      expect(service.getPageBackLink(pagePattern, request, matchList)).toEqual(matchingReferer)
      expect(request.session.pageReferers[pagePattern]).toEqual(matchingReferer)
    })

    it('should return the stored referer if the current referer does not match a path', () => {
      const request = mockRequest(nonMatchingReferer, lastStoredReferer)
      expect(service.getPageBackLink(pagePattern, request, matchList)).toEqual(lastStoredReferer)
    })

    it('should return a homepage link if there is no stored referer and the current referer does not match a path', () => {
      const request = mockRequest(null, null)
      request.session = {} as Session
      expect(service.getPageBackLink(pagePattern, request, matchList)).toEqual('/')
    })
  })
})
