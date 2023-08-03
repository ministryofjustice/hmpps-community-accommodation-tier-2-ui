# The CAS UI "task list" system

The CAS1 team have developed code for developing a multi-stage questionnaire
which is presented using the GOV.UK ["task list"
pattern](https://design-system.service.gov.uk/patterns/task-list-pages/).

[Skip to the TLDR below if you want step-by-step instructions for adding one page](#tldr-adding-a-questionpage-to-an-existing-task)

Questions (and their answers) are the 'grain' of the system. They live within
the following hierarchy:

```
sections
  tasks
    pages
      questions
```

## Task list

### Form pages

The clever plumbing for this system uses the
[reflect-metadata](https://github.com/rbuckton/reflect-metadata) library to
build a list of sections, tasks and pages for a given form. See the decorators:

```
server/form-pages/
├── baseForm.ts
├── tasklistPage.ts
└── utils
    ├── decorators
    │   ├── form.decorator.ts
    │   ├── index.ts
    │   ├── page.decorator.ts
    │   ├── section.decorator.ts
    │   └── task.decorator.ts
    ├── getTaskStatus.ts
    └── index.ts
```

A present we only need one `JourneyType`:

```ts
export type JourneyType = 'applications'
```

but as is the case with the other CAS services, there may in time be a need for
additional task lists.

A basic 'Apply' journey task list can be defined as below within an `apply`
directory:

```
server/form-pages/
└── apply
    ├── gang-affiliations
    │   ├── describeGangAffiliations.ts
    │   └── index.ts
    ├── health-needs
    │   ├── index.ts
    │   ├── physical-health
    │   │   ├── describePhysicalHealth.ts
    │   │   └── index.ts
    │   └── substance-misuse
    │       ├── describeSubstanceMisuse.ts
    │       └── index.ts
    ├── index.ts
    └── prison-information
        └── index.ts
```

### Task list

The task list is defined in `apply.index.ts`, for example:

```ts
@Form({ sections: [
  HealthNeeds, 
  PrisonInformation, 
  GangAffiliations
  ] 
})
```

### Section

#### more than one task in section

An example 'Health needs' section with two tasks, e.g. at
`apply/health-needs/index.ts`, could look like:

```ts
@Section({
  title: 'Health needs',
  tasks: [HealthNeeds, PhysicalHealth],
})
```

### Task

Tasks should be defined in sub-directories e.g.
`apply/health-needs/physical-health/index.ts` and may list multiple pages
defined within the same directory, from which the overall task is comprised:

```ts
@Task({
  slug: 'physical-health',
  name: 'Physical health',
  pages: [DescribePhysicalHealth, DescribeAssistiveNeeds],
})
```

NB: pages don't appear in the task list: only sections and their tasks are
displayed.

Tasks are also declared in `server/@types/ui/index.d.ts`:

```ts
export type TaskNames = 'substance-misuse'
```

And then used to construct the `FormPages` type 

```ts
export type FormPages = { [key in TaskNames]: Record<string, unknown> }
```

This was an attempt to have strict typing on the task names, but it isn't [caught by typechecking at the moment](https://mojdt.slack.com/archives/C03K0HB0LBE/p1689685378372169?thread_ts=1689684800.189759&cid=C03K0HB0LBE), so in CAS1 not all task names are defined by the type.

We also have a `GetTaskStatus` utility
(`server/form-pages/utils/getTaskStatus.ts`) to indicate the status of a given
task by examining the stored page data for that task.

### Page

A Page class is defined like so

```
@Page({
  name: 'funding-source',
  bodyProperties: ['fundingSource'],
})
```

With a constructor method to define the body of the question

```
  constructor(
    body: Partial<FundingSourceBody>,
  ) {
    this.body = body as FundingSourceBody
  }

```

A `previous` and `next` function to determine where the user is taken after the
questions has been answered

A `response` function that is called when the question is submitted, where logic
can be added based on the answer given.

An `items` function that is called by the layout to transform the json of the
`body` into the object shape needed by the form component.


### Form views

Each 'form page' needs a corresponding Nunjucks view within the appropriate
"journey" namespace:

```
server/views/{:journey}/pages/
```
e.g.
```
server/views/applications/pages/health-needs/substance-misuse.njk
```

These views need to be rendered by a `PagesController`
(`server/controllers/apply/applications/pagesController.ts`), whose `show`
action is passed a `taskName` and a `pageName`.

### Routing

Our "apply" journey applies a routing pattern for pages as defined in
`server/routes/apply.ts`:

```ts
const { pattern } =
  paths.applications.show.path(`tasks/${taskKey}/pages/${pageKey}`
```

The routes would then follow this pattern:

```
/applications/:id/tasks/health-needs/pages/substance-misuse
/applications/:id/tasks/health-needs/pages/physical-health
/applications/:id/tasks/physical-health/pages/physical-health
/applications/:id/tasks/physical-health/pages/assistive-needs
/applications/:id/tasks/prison-information/pages/prison-information
/applications/:id/tasks/gang-affiliations/pages/gang-affiliations
```

Other routing would then be defined in `server/paths/apply.ts`:

```ts
const applicationsPath = path('/applications')
const singleApplicationPath = applicationsPath.path(':id')
const pagesPath = 
  singleApplicationPath.path('tasks/:task/pages/:page')
const peoplePath = applicationsPath.path('people')
  
const paths = {
  applications: {
    create: applicationsPath.path('create'),
    new: applicationsPath.path('new'),
    people: {
      find: peoplePath.path('find'),
    },
    show: singleApplicationPath,
    index: applicationsPath,
    submission: singleApplicationPath.path('submission'),
    pages: {
      show: pagesPath,
      update: pagesPath,
    },
  },
}
```

### View templates

A number of utilities are added to the nunjucks setup
(`server/utils/nunjucksSetup.ts`) including `TasklistUtils` and
`mapApiPersonRisksForUi`

#### Form components

Some enhanced GOV.UK form components are required and can be copied over from
CAS1:

```
server/views/components/formFields/form-page-checkboxes/
server/views/components/formFields/form-page-date-input/
server/views/components/formFields/form-page-radios/
server/views/components/formFields/form-page-textarea/
```

#### Applying flow control to the form

```nunjucks
  {% set healthSubstances %}  
  {{
    formPageTextarea(
      { 
        fieldName: "substancesHistory",
        spellcheck: false,
        label: {
          text: page.questions.substancesHistory
        }
      },
      fetchContext()
    )
  }}
  {% endset -%}

  {{
  formPageRadios(
    {
      fieldName: "substancesYesNo",
      fieldset: {
        legend: {
          text: page.questions.substancesYesNo,
          classes: "govuk-fieldset__legend--m"
        }
      },
      hint: {
        text: "Guidance goes here..."
      },
      items: [
        {
          value: "yes",
          text: "Yes",
          conditional: {
            html: healthSubstances
          }
        },
        {
          value: "no",
          text: "No"
        }
      ]
    },
    fetchContext()
  )
}}
```

If I choose the 'yes' radio option to the 'substance misuse?' question, then a
`substancesHistory` textarea input asking for more details is inserted into the
form.


## TLDR: adding a question/page to an existing task

* If this is NOT the first page in a task:
  * Update the previous question page's `next` function, including the page’s
    unit tests to return the string value of the page you are adding, eg
    `sexual-orientation` 

* Add integration test and class for your page (like the `sexAndGender.ts`, and
  `complete_sex_gender_page.cy.ts`)
    * Using the `applicationData.json` fixture
        * add your answer data to the `applicationData.json` file. This json
          file has all the data (sections/tasks/pages/answers) needed to have a
          'complete' application
        * If the page under test is the first page in a task - In your test,
          edit the data for the task and assign it a blank object, in order to
          remove the answers and thus have that task in the 'not started'
          status. e.g. `applicationData['equality-and-diversity-monitoring'] =
          {}`
        * If the page is NOT the first page in a task - edit the data for the
          task so that on your question data is blank, e.g.
          `applicationData['equality-and-diversity-monitoring']['sex-and-gender']
          = {}`
    * You do not need to write integration tests for error messages/back button,
      only the happy path(s)

* Create your `Page` file, see
  `server/form-pages/apply/about-the-person/equality-diversity-monitoring/sexAndGender.ts`
  as an example
    * The `response` function should return all of your response data
    * Add error scenarios in, putting error copy into the shared `errorLookups.json`
    * Add `next`/`previous` logic and tests

* Add your page class to the `@Task` list of `pages`, e.g.
  `server/form-pages/apply/about-the-person/equality-diversity-monitoring/index.ts` 

* Create nunjucks template, see
  `server/views/applications/pages/equality-and-diversity-monitoring/disability.njk`
  as an example