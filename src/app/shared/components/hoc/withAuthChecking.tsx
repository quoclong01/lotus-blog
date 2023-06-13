import React  from 'react';
import { getData } from '../../../core/helpers/localstorage';
import { useDialog } from '../../contexts/dialog.contexts';
import PopUpLogin from '../partials/PopupLogin';

const withAuthChecking = (Wrapped: any) => {
  return (props: any) => {
    const dialog = useDialog();
    const checkAuthBeforeAction = (callback: any) => {
      if (getData('token', '')) callback();
      else {
        dialog?.addDialog({content: <PopUpLogin />});
      }
    };

    return (
      <>
        <Wrapped {...props} checkAuthBeforeAction={checkAuthBeforeAction} />
      </>
    );
  };
};

export default withAuthChecking;
