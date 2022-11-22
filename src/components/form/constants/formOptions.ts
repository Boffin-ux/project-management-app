import { IFormValues } from 'interfaces/modal';
import { boardSchema, columnSchema, taskSchema } from 'schemas/boardsSchema';
import { FIELD_OPTIONS } from 'utils/variables';
const { NAME, DESC } = FIELD_OPTIONS;

const defaultValues = {
  title: '',
};

const initialBoardValues = {
  title: '',
  users: [],
};

const initialTaskValues = {
  title: '',
  description: '',
  users: [],
};

const newBoardFields = [
  {
    name: NAME,
    label: 'boards.titleLabelForm',
  },
];

const newTaskFields = [
  {
    name: NAME,
    label: 'tasks.titleLabelForm',
  },
  {
    name: DESC,
    label: 'tasks.descLabelForm',
  },
];

const newColumnfields = [
  {
    name: NAME,
    label: 'columns.titleLabelForm',
  },
];

const addBoardForm = {
  initialValues: initialBoardValues,
  fields: newBoardFields,
  modalTitle: 'boards.boardModalTitle',
  btnTitle: 'boards.submitBtnForm',
  action: (formData: IFormValues) => {
    console.log('formData: ', formData);
  },
  schema: boardSchema,
};

const addTaskForm = {
  initialValues: initialTaskValues,
  fields: newTaskFields,
  modalTitle: 'tasks.modalTitle',
  btnTitle: 'tasks.submitBtnForm',
  action: (formData: IFormValues) => {
    console.log('formData: ', formData);
  },
  schema: taskSchema,
};

const addColumnForm = {
  initialValues: defaultValues,
  fields: newColumnfields,
  modalTitle: 'columns.modalTitle',
  btnTitle: 'columns.submitBtnForm',
  action: (formData: IFormValues) => {
    console.log('formData: ', formData);
  },
  schema: columnSchema,
};

const deleteBoardForm = {
  modalTitle: 'boards.deleteBoard',
  action: () => {
    console.log('deleteBoard');
  },
};

const deleteTaskForm = {
  modalTitle: 'tasks.deleteTask',
  action: () => {
    console.log('deleteTask');
  },
};

const deleteColumnForm = {
  modalTitle: 'columns.deleteColumn',
  action: () => {
    console.log('deleteColumn');
  },
};

const deleteProfileForm = {
  modalTitle: 'profile.deleteProfile',
  action: () => {
    console.log('deleteProfile');
  },
};

export {
  defaultValues,
  addBoardForm,
  addTaskForm,
  addColumnForm,
  deleteBoardForm,
  deleteTaskForm,
  deleteColumnForm,
  deleteProfileForm,
};
