interface IModalProps {
  modalTitle: string;
  children: React.ReactNode;
}

interface IPropsConfirm {
  modalTitle: string;
  action: () => void;
}

export { IModalProps, IPropsConfirm };
