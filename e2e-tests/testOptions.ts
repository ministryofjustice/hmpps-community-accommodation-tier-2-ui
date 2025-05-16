export type TestOptions = {
  person: {
    crn: string
    name: string
    nomsNumber: string
  }
  personWithoutOasys: {
    crn: string
    name: string
    nomsNumber: string
  }
  personWithLaoRestrictions: {
    crn: string
    name: string
    nomsNumber: string
  }
  pomUser: {
    name: string
    username: string
    password: string
    email?: string
  }
  lcaUser: {
    name: string
    username: string
    password: string
    email?: string
  }
  adminUser: {
    name: string
    username: string
    password: string
  }
  assessorUser: {
    name: string
    username: string
    password: string
  }
  miUser: {
    name: string
    username: string
    password: string
  }
  user: TestOptions['pomUser'] | TestOptions['lcaUser']
}
