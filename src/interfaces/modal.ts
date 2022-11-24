import { boardSchema, taskSchema, columnSchema } from 'schemas/boardsSchema';

interface IModalState {
  closeModal: () => void;
  isModalActive: boolean;
}

interface IModalProps extends IModalState {
  modalTitle: string;
  children: React.ReactNode;
}

interface IPropsConfirm {
  action: () => void;
  closeModal: () => void;
}

interface IFormProps extends IModalState {
  modalTitle: string;
  action: (formData?: IFormValues) => void;
  initialValues?: IFormValues;
  btnTitle?: string;
  fields?: IFormField[];
  isUsers?: boolean;
  schema?: typeof boardSchema | typeof columnSchema | typeof taskSchema;
}

interface IUserData {
  _id: string;
  login: string;
}

interface IFormValues {
  title: string;
  description?: string;
  users?: IUserData[];
}

interface IFormField {
  name: string;
  label: string;
  multiline: boolean;
}

export { IModalProps, IFormValues, IFormProps, IPropsConfirm, IUserData, IFormField };
