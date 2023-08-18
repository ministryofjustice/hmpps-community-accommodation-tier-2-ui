import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import logger from '../../logger'
import { AuditConfig } from '../config'

export default class AuditService {
  private readonly sqsClient: SQSClient

  private readonly serviceName: string

  private readonly queueUrl: string

  private readonly logErrors: boolean

  constructor(config: AuditConfig) {
    this.sqsClient = new SQSClient({
      region: config.region,
    })

    this.serviceName = config.serviceName
    this.queueUrl = config.queueUrl
    this.logErrors = config.logErrors
  }

  async sendAuditMessage(action: string, username: string, details: Record<string, string>) {
    const jsonDetails = JSON.stringify(details)

    const jsonMessage = JSON.stringify({
      what: action,
      who: username,
      when: new Date(),
      service: this.serviceName,
      details: jsonDetails,
    })

    try {
      logger.info(`Sending audit message ${action} (${jsonDetails})`)
      await this.sqsClient.send(
        new SendMessageCommand({
          MessageBody: jsonMessage,
          QueueUrl: this.queueUrl,
        }),
      )
    } catch (error) {
      if (this.logErrors) {
        logger.error('Problem sending audit message to SQS queue', error)
      }
    }
  }
}
