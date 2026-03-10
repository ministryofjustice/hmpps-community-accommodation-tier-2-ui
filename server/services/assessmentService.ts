import {
  Cas2Assessment,
  UpdateCas2Assessment,
  Cas2AssessmentStatusUpdate as AssessmentStatusUpdate,
} from '@approved-premises/api'
import { AssessmentClient, RestClientBuilder } from '../data'

export default class AssessmentService {
  constructor(private readonly assessmentClientFactory: RestClientBuilder<AssessmentClient>) {}

  async findAssessment(token: string, assessmentId: string): Promise<Cas2Assessment> {
    const assessmentClient = this.assessmentClientFactory(token)

    return assessmentClient.find(assessmentId)
  }

  async updateAssessment(
    token: string,
    assessmentId: string,
    updateData: UpdateCas2Assessment,
  ): Promise<Cas2Assessment> {
    const assessmentClient = this.assessmentClientFactory(token)

    return assessmentClient.update(assessmentId, updateData)
  }

  async updateAssessmentStatus(token: string, assessmentId: string, newStatus: AssessmentStatusUpdate): Promise<void> {
    const assessmentClient = this.assessmentClientFactory(token)

    await assessmentClient.updateStatus(assessmentId, newStatus)
  }
}
