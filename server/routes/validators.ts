export type Validators = Record<string, RegExp>

const validators: Validators = {
  uuid: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  task: /^[a-z-]+$/,
  page: /^[a-z-]+$/,
  index: /^[0-9]+$/,
  statusName: /^[a-z-]+$/,
  name: /^[a-z-]+$/,
}

export const fieldValidators: Validators = {
  id: validators.uuid,
  task: validators.task,
  page: validators.page,
  index: validators.index,
  statusName: validators.statusName,
  name: validators.name,
}
