import { createContext, useContext } from 'react';

export interface DialogContent {
  title?: string;
  description?: string;
  textButton?: string;
  content: any;
  callback?: () => void;
  setDialog?: (data: any) => void;
  button: {
    confirm: {
      text: string;
      customClass: string;
      confirmCallBack: () => void;
    };
    cancel: {
      text: string;
      cancelCallback: () => void;
    };
  };
}

export const DialogContext = createContext({
  dialog: {},
  addDialog: (data: any) => data,
  closeDialog: () => true,
});

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context) {
    return context;
  }
};
