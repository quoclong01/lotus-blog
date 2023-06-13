import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContent, ToastContext } from '../../contexts/toast.contexts';
import { Button } from './Button';

const Toast = ({ toast }: any) => {
  return createPortal(
    <div className={`toast toast-${toast.type}`}>
      <div>
        <p className="toast-title">{toast.title}</p>
      </div>
      <Button
        text={<i className="fa-solid fa-xmark"></i>}
        classBtn="toast-btn"
      />
    </div>,
    document.body
  );
};

export const ToastProvider = (props: any) => {
  const [toast, setToast] = useState({});

  const addToast = (newToast: ToastContent) => {
    setToast(newToast);
    setTimeout(() => {
      setToast('');
    }, 1000);
  };

  const checkToast = Object.keys(toast).length || '';

  return (
    <ToastContext.Provider value={{ toast, addToast }} {...props}>
      {props.children}
      {checkToast && <Toast toast={toast} />}
    </ToastContext.Provider>
  );
};
