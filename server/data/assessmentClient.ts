import {
  Cas2Assessment,
  UpdateCas2Assessment,
  Cas2AssessmentStatusUpdate as AssessmentStatusUpdate,
} from '@approved-premises/api'
import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'

export default class AssessmentClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('assessmentClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async find(assessmentId: string): Promise<Cas2Assessment> {
    return (await this.restClient.get({
      path: paths.assessments.show({ id: assessmentId }),
    })) as Cas2Assessment
  }

  async update(assessmentId: string, updateData: UpdateCas2Assessment): Promise<Cas2Assessment> {
    return (await this.restClient.put({
      path: paths.assessments.update({ id: assessmentId }),
      data: updateData,
    })) as Cas2Assessment
  }

  async updateStatus(assessmentId: string, newStatus: AssessmentStatusUpdate): Promise<void> {
    await this.restClient.post({
      path: paths.assessmentStatusUpdates.create({ id: assessmentId }),
      data: newStatus,
    })
  }
}
