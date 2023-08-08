import { Form } from '../utils/decorators'
import BaseForm from '../baseForm'
import BeforeYouStart from './before-you-start'
import AreaAndFunding from './area-and-funding'
import AboutPerson from './about-the-person'
import RisksAndNeeds from './risks-and-needs'

@Form({ sections: [BeforeYouStart, AreaAndFunding, AboutPerson, RisksAndNeeds] })
export default class Apply extends BaseForm {}
