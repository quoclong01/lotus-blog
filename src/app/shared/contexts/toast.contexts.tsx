import { createContext, useContext } from 'react';

export interface ToastContent {
  type: string;
  title: string;
}

export const ToastContext = createContext({
  toast: {},
  addToast: (data: any) => data,
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context) {
    return context;
  }
};
