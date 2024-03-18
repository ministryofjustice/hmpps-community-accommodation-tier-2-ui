import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'

import PeopleController from './peopleController'
import { errorMessage, errorSummary } from '../utils/validation'
import PersonService from '../services/personService'
import ApplicationService from '../services/applicationService'
import { fullPersonFactory } from '../testutils/factories/person'
import applicationFactory from '../testutils/factories/application'
import { DateFormats } from '../utils/dateUtils'

import { validateReferer } from '../utils/viewUtils'

jest.mock('../utils/viewUtils')

describe('peopleController', () => {
  const flashSpy = jest.fn()
  const token = 'SOME_TOKEN'
  const prisonNumber = '1234'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const personService = createMock<PersonService>({})
  const applicationService = createMock<ApplicationService>({})

  let peopleController: PeopleController

  beforeEach(() => {
    peopleController = new PeopleController(applicationService, personService)
    request = createMock<Request>({
      body: { prisonNumber },
      user: { token },
      flash: flashSpy,
      headers: {
        referer: 'some-referer/',
      },
    })
    response = createMock<Response>({})
    jest.clearAllMocks()
  })

  describe('find', () => {
    beforeEach(() => {
      ;(validateReferer as jest.MockedFunction<typeof validateReferer>).mockReturnValue('some-validated-referer')
    })
    describe('when there is a prison number', () => {
      it('redirects to the show applications path', async () => {
        const requestHandler = peopleController.find()

        const person = fullPersonFactory.build({})

        personService.findByPrisonNumber.mockResolvedValue(person)
        applicationService.createApplication.mockResolvedValue(applicationFactory.build({ id: '123abc' }))

        await requestHandler(request, response, next)

        expect(response.render).toHaveBeenCalledWith('people/confirm-applicant-details', {
          pageHeading: `Confirm ${person.name}'s details`,
          person,
          date: DateFormats.dateObjtoUIDate(new Date()),
          dateOfBirth: DateFormats.isoDateToUIDate(person.dateOfBirth, { format: 'short' }),
        })
      })

      describe('when there are errors', () => {
        describe('when there is a 404 error', () => {
          it('renders a not found error message', async () => {
            const requestHandler = peopleController.find()

            const err = { data: {}, status: 404 }

            personService.findByPrisonNumber.mockImplementation(() => {
              throw err
            })

            request.body.prisonNumber = 'SOME_NUMBER'

            await requestHandler(request, response, next)

            expect(request.flash).toHaveBeenCalledWith('errors', {
              prisonNumber: errorMessage(
                'prisonNumber',
                `No person found for prison number ${request.body.prisonNumber}, please try another number.`,
              ),
            })
            expect(request.flash).toHaveBeenCalledWith('errorSummary', [
              errorSummary(
                'prisonNumber',
                `No person found for prison number ${request.body.prisonNumber}, please try another number.`,
              ),
            ])
            expect(validateReferer).toHaveBeenCalledWith('some-referer/')
            expect(response.redirect).toHaveBeenCalledWith('some-validated-referer')
          })
        })

        describe('when there is a 403 error', () => {
          it('renders a permissions error message', async () => {
            const requestHandler = peopleController.find()

            const err = { data: {}, status: 403 }

            personService.findByPrisonNumber.mockImplementation(() => {
              throw err
            })

            request.body.prisonNumber = 'SOME_NUMBER'

            await requestHandler(request, response, next)

            expect(request.flash).toHaveBeenCalledWith('errors', {
              prisonNumber: errorMessage(
                'prisonNumber',
                'You do not have permission to access the prison number SOME_NUMBER, please try another number.',
              ),
            })
            expect(request.flash).toHaveBeenCalledWith('errorSummary', [
              errorSummary(
                'prisonNumber',
                'You do not have permission to access the prison number SOME_NUMBER, please try another number.',
              ),
            ])
            expect(validateReferer).toHaveBeenCalledWith('some-referer/')
            expect(response.redirect).toHaveBeenCalledWith('some-validated-referer')
          })
        })

        describe('when there is an error of another type', () => {
          it('throws the error', async () => {
            const requestHandler = peopleController.find()

            const err = new Error()

            personService.findByPrisonNumber.mockImplementation(() => {
              throw err
            })

            request.body.nomsNumber = 'SOME_NUMBER'

            expect(async () => requestHandler(request, response, next)).rejects.toThrow(err)
          })
        })
      })
    })

    describe('when there is not a prison number', () => {
      it('sends an error to the flash if a prison number has not been provided', async () => {
        request.body = {}

        const requestHandler = peopleController.find()

        await requestHandler(request, response, next)
        expect(validateReferer).toHaveBeenCalledWith('some-referer/')
        expect(response.redirect).toHaveBeenCalledWith('some-validated-referer')

        expect(flashSpy).toHaveBeenCalledWith('errors', {
          prisonNumber: errorMessage('prisonNumber', 'Enter a prison number'),
        })
        expect(flashSpy).toHaveBeenCalledWith('errorSummary', [errorSummary('prisonNumber', 'Enter a prison number')])
      })
    })
  })
})
