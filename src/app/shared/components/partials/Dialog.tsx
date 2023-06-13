import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { DialogContext, DialogContent } from '../../contexts/dialog.contexts';
import { Button } from './Button';

const Dialog = ({ dialog, closeDialog }: any) => {
  const handleCloseDialog = () => {
    closeDialog();
  };

  const handleConfirm = () => {
    dialog.button?.confirm?.confirmCallback();
    closeDialog();
  };

  return createPortal(
    <div className="modal">
      <div className="modal-inner">
        <div className="modal-content">
          <Button
            classBtn="modal-close"
            text={<i className="fa-solid fa-xmark"></i>}
            onClick={handleCloseDialog}
          />
          {dialog.title ? (
            <h2 className="modal-title txt-capitalize">{dialog.title}</h2>
          ) : (
            <></>
          )}
          <div className="modal-text">{dialog.content}</div>
          <div className="modal-btn-group">
            {dialog.button?.cancel?.text ? (
              <button
                className="btn btn-action btn-cancel"
                onClick={dialog.button?.cancel?.cancelCallback}
              >
                {dialog.button.cancel.text}
              </button>
            ) : (
              <></>
            )}
            {dialog.button?.confirm?.text ? (
              <button
                className={`btn btn-action ${dialog.button?.confirm?.customClass}`}
                onClick={handleConfirm}
              >
                {dialog.button.confirm.text}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const DialogProvider = (props: any) => {
  const [dialog, setDialog] = useState({});
  const location = useLocation();

  useEffect(() => {
    setDialog({});
  }, [location]);

  const addDialog = (newDialog: DialogContent) => {
    setDialog(newDialog);
  };

  const closeDialog = () => {
    setDialog({});
  };

  const checkDialog = Object.keys(dialog).length || '';

  return (
    <DialogContext.Provider
      value={{ dialog, addDialog, closeDialog }}
      {...props}
    >
      {props.children}
      {checkDialog && <Dialog dialog={dialog} closeDialog={closeDialog} />}
    </DialogContext.Provider>
  );
};
