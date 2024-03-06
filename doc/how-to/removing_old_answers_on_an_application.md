
# Removing old answers on an Application

- The application form is built using the inherited [task list
system](https://github.com/ministryofjustice/hmpps-community-accommodation-tier-2-ui/blob/main/doc/task_list_system.md)
- [Matrix for making changes to the questions of an application form](<https://docs.google.com/spreadsheets/d/1gI-iPUCUrPRm7xPWyodWG1WnMZCC3-h3Fc6T6VtEeWU/edit?pli=1#gid=0>)

## Removing old answers

When a user answers a question in such a way that presents them with additional
sub-questions:

```
Do you have a primary address?
- [X] Yes
  - Sub-question: How long have you lived here?:
  - Sub-answer: '1 year'
- [ ] No
```

When the user answers those sub-questions and continues they will be saved inside
the `application`'s `data` blob as normal.

**Should the user come back to this question and wish to change the parent answer, we
need to take extra steps to make sure any sub-answers are removed from the `data` blob
so that they aren't presented back**:

```
Do you have a primary address?
- [ ] Yes
  - Sub-question: How long have you lived here?:
  - Sub-answer: '1 year'
- [X] No
```

We do this in two ways:

1. We extend the `onSave` method on each question page
   ([example](https://github.com/ministryofjustice/hmpps-community-accommodation-tier-2-ui/blob/b92daed3d1298cb014cd53db8e35ef60b8a4c792/server/form-pages/apply/about-the-person/equality-diversity-monitoring/disability.ts#L90))
   to remove the old data
1. If the change in answer needs to change data in other questions we can extend [our 'delete
   orphaned' logic here](https://github.com/ministryofjustice/hmpps-community-accommodation-tier-2-ui/blob/main/server/utils/applications/deleteOrphanedData.ts)
