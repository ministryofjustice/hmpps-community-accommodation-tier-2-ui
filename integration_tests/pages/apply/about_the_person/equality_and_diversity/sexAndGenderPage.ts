import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'

export default class SexAndGenderPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Sex and gender identity', application, 'equality-and-diversity-monitoring', 'sex-and-gender')
  }

  selectSex(): void {
    this.checkRadioByNameAndValue('sex', 'female')
  }

  confirmGenderIdentity(): void {
    this.checkRadioByNameAndValue('gender', 'no')
  }
}
