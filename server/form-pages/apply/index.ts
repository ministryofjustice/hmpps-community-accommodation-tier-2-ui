import { Form } from '../utils/decorators'
import BaseForm from '../baseForm'
import BeforeYouStart from './before-you-start'
import AreaAndFunding from './area-and-funding'
import AboutPerson from './about-the-person'

@Form({ sections: [BeforeYouStart, AreaAndFunding, AboutPerson] })
export default class Apply extends BaseForm {}
