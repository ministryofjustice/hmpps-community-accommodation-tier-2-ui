# Refactor 'review answers' code inherited from CAS1/CAS3

Date: 2023-10-06

## Status

Accepted

## Context

The pages for checking your answers and reviewing submitted applications/assessments in CAS1 and CAS3 are generated using a complicated series of functions and callbacks, located in a number of different util files. Some of this functionality is duplicated in the integration tests for those projects. The complexity of the code makes it difficult to understand and difficult to debug.

As it stands, both projects loop through all sections (except any `Check your answers` section) and generate an object for each, then looping through the section's tasks and generating a tile for each task, the rows of which are populated by looping through the task's pages, and for each key/value pair in the page's `response()` method, adding a `SummaryListItem` (or, in the case of an array, an array of items). This system centres around the page's `response()` method, which is responsible for translating questions and answers from keys to user readable values.

## Decision

We will refactor the functions that generate the check your answers page, to make them more self-documenting and easier to follow.

We will also create a `getQuestions` function that will return the questions and answers (where answers are predefined, e.g. yes/no) for all form pages, and store text values by key for all questions and answers (where predefined). This will in most cases render the Page's `response()` method redundant. We will instead loop through the tasks, pages and questions in the Application's `data` key, and for each question, return the question and answer text (if predefined) from the `getQuestions` function. If the answer text is not predefined (e.g. in the case of a free text input), we will return it from the Application data.

Whereas the CAS1/3 approach of relying on the Page's `response()` method allows all special cases in terms of data structure to be handled at the Page level, our code will by default loop through tasks, pages, questions and - where they are predefined - answers. Where a data structure is nested differently (in the case of RoSH summary, ACCT and behaviour notes), this looping pattern will break. We will treat RoSH summary outside of the this looping pattern, instead rendering the widget on the side of the check your answers page. In the case of ACCT and behaviour notes we will continue to use a `response()` method on the Page. While looping through the pages in a task, we will check for the presence of a `response` method on each `Page`. Where there is a `response` method, we will use it to return questions and answers for that class and generate a summary list item for each question.

## Consequences

This change will create a single source of truth for form page questions and answers. This allows less repetition within the code and tests.

The change should reduce the maintenance overheads on the check your answers code, by simplifying it.

This will require us to refactor the existing form pages to use the centrally stored questions and answers.
