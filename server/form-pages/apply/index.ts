import { Form } from '../utils/decorators'
import BaseForm from '../baseForm'
import AreaAndFunding from './area-and-funding'
import AboutPerson from './about-person'

@Form({ sections: [AreaAndFunding, AboutPerson] })
export default class Apply extends BaseForm {}
