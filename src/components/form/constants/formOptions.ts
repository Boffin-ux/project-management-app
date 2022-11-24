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
    multiline: false,
  },
];

const newTaskFields = [
  {
    name: NAME,
    label: 'tasks.titleLabelForm',
    multiline: false,
  },
  {
    name: DESC,
    label: 'tasks.descLabelForm',
    multiline: true,
  },
];

const newColumnfields = [
  {
    name: NAME,
    label: 'columns.titleLabelForm',
    multiline: false,
  },
];

const addBoardForm = {
  initialValues: initialBoardValues,
  fields: newBoardFields,
  modalTitle: 'boards.boardModalTitle',
  btnTitle: 'boards.submitBtnForm',
  schema: boardSchema,
  isUsers: true,
};

const editBoardForm = {
  initialValues: 'getBoardValues',
  fields: newBoardFields,
  modalTitle: 'boards.editModalTitle',
  btnTitle: 'boards.editSubmitBtnForm',
  action: 'editBoard(formData: IFormValues)',
  schema: boardSchema,
  isUsers: true,
};

const addTaskForm = {
  initialValues: initialTaskValues,
  fields: newTaskFields,
  modalTitle: 'tasks.modalTitle',
  btnTitle: 'tasks.submitBtnForm',
  schema: taskSchema,
  isUsers: true,
};

const editTaskForm = {
  initialValues: 'getTaskValues',
  fields: newTaskFields,
  modalTitle: 'tasks.editModalTitle',
  btnTitle: 'tasks.editSubmitBtnForm',
  schema: taskSchema,
  isUsers: true,
};

const addColumnForm = {
  initialValues: defaultValues,
  fields: newColumnfields,
  modalTitle: 'columns.modalTitle',
  btnTitle: 'columns.submitBtnForm',
  schema: columnSchema,
  isUsers: false,
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
};

const editProfileForm = {
  modalTitle: 'profile.editProfile',
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
