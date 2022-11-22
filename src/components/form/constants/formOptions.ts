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
  action: 'addBoard(formData: IFormValues)',
  schema: boardSchema,
};

const editBoardForm = {
  initialValues: 'getBoardValues',
  fields: newBoardFields,
  modalTitle: 'boards.editModalTitle',
  btnTitle: 'boards.editSubmitBtnForm',
  action: 'editBoard(formData: IFormValues)',
  schema: boardSchema,
};

const addTaskForm = {
  initialValues: initialTaskValues,
  fields: newTaskFields,
  modalTitle: 'tasks.modalTitle',
  btnTitle: 'tasks.submitBtnForm',
  action: 'addTask(formData: IFormValues)',
  schema: taskSchema,
};

const editTaskForm = {
  initialValues: 'getTaskValues',
  fields: newTaskFields,
  modalTitle: 'tasks.editModalTitle',
  btnTitle: 'tasks.editSubmitBtnForm',
  action: 'editTask(formData: IFormValues)',
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
  action: 'deleteBoard',
};

const deleteTaskForm = {
  modalTitle: 'tasks.deleteTask',
  action: 'deleteTask',
};

const deleteColumnForm = {
  modalTitle: 'columns.deleteColumn',
  action: 'deleteColumn',
};

const deleteProfileForm = {
  modalTitle: 'profile.deleteProfile',
  action: 'deleteProfile',
};

const editProfileForm = {
  modalTitle: 'profile.editProfile',
  action: 'editProfile',
};

export {
  defaultValues,
  addBoardForm,
  editBoardForm,
  addTaskForm,
  editTaskForm,
  addColumnForm,
  deleteBoardForm,
  deleteTaskForm,
  deleteColumnForm,
  deleteProfileForm,
  editProfileForm,
};
