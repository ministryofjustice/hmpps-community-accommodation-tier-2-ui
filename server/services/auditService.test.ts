import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import AuditService from './auditService'
import { ServiceName } from '../@types/shared'
import logger from '../../logger'

jest.mock('@aws-sdk/client-sqs')
jest.mock('../../logger')

describe('AuditService', () => {
  const MockSqsClient = SQSClient as jest.MockedClass<typeof SQSClient>
  const MockSendMessageCommand = SendMessageCommand as jest.MockedClass<typeof SendMessageCommand>

  const config = {
    region: 'some-region',
    queueUrl: 'some-queue-url',
    serviceName: 'some-service-name' as ServiceName,
    logErrors: false,
  }

  describe('AuditService', () => {
    it('initialises the the SQS client', () => {
      // eslint-disable-next-line no-new
      new AuditService(config)

      expect(MockSqsClient).toHaveBeenCalledWith({
        region: config.region,
      })
    })
  })

  describe('sendAuditMessage', () => {
    it('sends a messages using the SQS client, timestamped with the current time', async () => {
      const service = new AuditService(config)

      const date = new Date(2023, 3, 14)
      jest.useFakeTimers().setSystemTime(date)

      const expectedJsonMessage = JSON.stringify({
        what: 'some-action',
        who: 'some-user-uuid',
        when: date,
        service: 'some-service-name',
        details: JSON.stringify({ detailsParam: 'some-details' }),
      })

      await service.sendAuditMessage('some-action', 'some-user-uuid', { detailsParam: 'some-details' })

      expect(MockSendMessageCommand).toHaveBeenCalledWith({
        MessageBody: expectedJsonMessage,
        QueueUrl: 'some-queue-url',
      })
      expect(MockSqsClient.mock.instances[0].send).toHaveBeenCalledWith(MockSendMessageCommand.mock.instances[0])
    })

    it('does not propogate errors from from the SQS client', async () => {
      const service = new AuditService(config)

      MockSqsClient.prototype.send.mockImplementation(async () => {
        throw new Error()
      })

      await expect(
        service.sendAuditMessage('some-action', 'some-user-uuid', { detailsParam: 'some-details' }),
      ).resolves.not.toThrow()
    })

    it("does not log errors when 'logError' is configured to false", async () => {
      const service = new AuditService(config)

      MockSqsClient.prototype.send.mockImplementation(async () => {
        throw new Error()
      })

      await service.sendAuditMessage('some-action', 'some-user-uuiid', { detailParam: 'some-details' })

      expect(logger.error).not.toHaveBeenCalled()
    })

    it("logs errors when 'logError' is configured to true", async () => {
      const service = new AuditService({ ...config, logErrors: true })
      const error = new Error()

      MockSqsClient.prototype.send.mockImplementation(async () => {
        throw error
      })

      await service.sendAuditMessage('some-action', 'some-user-uuid', { detailParam: 'some-details' })

      expect(logger.error).toHaveBeenCalledWith('Problem sending audit message to SQS queue', error)
    })
  })
})
