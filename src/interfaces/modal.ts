import { boardSchema, taskSchema, columnSchema } from 'schemas/boardsSchema';

interface IModalProps {
  modalTitle: string;
  children: React.ReactNode;
}

interface IPropsConfirm {
  modalTitle: string;
  action: () => void;
}

interface IFormProps {
  modalTitle: string;
  action: (values: IFormValues) => void;
  initialValues?: IFormValues;
  btnTitle?: string;
  fields?: IFormField[];
  usersData?: IUserData[];
  schema: typeof boardSchema | typeof columnSchema | typeof taskSchema;
}

interface IUserData {
  id: string;
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
}

export { IModalProps, IFormValues, IFormProps, IPropsConfirm };
