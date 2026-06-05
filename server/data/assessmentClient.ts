import {
  Cas2HdcAssessment,
  Cas2HdcUpdateAssessment,
  Cas2HdcAssessmentStatusUpdate as AssessmentStatusUpdate,
} from '@approved-premises/api'
import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'

export default class AssessmentClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('assessmentClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async find(assessmentId: string): Promise<Cas2HdcAssessment> {
    return this.restClient.get<Cas2HdcAssessment>({
      path: paths.assessments.show({ id: assessmentId }),
    })
  }

  async update(assessmentId: string, updateData: Cas2HdcUpdateAssessment): Promise<Cas2HdcAssessment> {
    return this.restClient.put<Cas2HdcAssessment>({
      path: paths.assessments.update({ id: assessmentId }),
      data: updateData,
    })
  }

  async updateStatus(assessmentId: string, newStatus: AssessmentStatusUpdate): Promise<void> {
    await this.restClient.post({
      path: paths.assessmentStatusUpdates.create({ id: assessmentId }),
      data: newStatus,
    })
  }
}
