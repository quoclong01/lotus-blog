import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserService } from '../../../core/serivces/user.service';
import { Button, Input } from '../../../shared/components/partials';
import { useToast } from '../../../shared/contexts/toast.contexts';
import { passwordValidator } from '../../../shared/validations/form.validation';

const userService = new UserService();
const UserUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const checkPass = watch('newPassword');
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const toast = useToast();
  const onSubmit = (data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      userService
        .handleChangePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        })
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: 'Update password successfully',
          });
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'error',
            title:
              'Error! A problem has been occurred while submitting your data.',
          });
        });
    }
  };
  return (
    <>
      <div className="update-pass">
        <form className="update-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="password"
            type="password"
            placeholder="Old Password"
            textLabel="Old Password"
            register={register('oldPassword', passwordValidator())}
            isError={errors.oldPassword ? true : false}
            errorsMsg={errors.oldPassword?.message}
          />
          <Input
            name="password"
            type="password"
            placeholder="New Password"
            textLabel="New Password"
            register={register('newPassword', passwordValidator())}
            isError={errors.newPassword ? true : false}
            errorsMsg={errors.newPassword?.message}
          />
          <Input
            name="password"
            type="password"
            placeholder="Confirm Password"
            textLabel="Confirm Password"
            register={register('confirmPassword', {
              validate: (value) =>
                value === checkPass || 'The password is invalid.',
            })}
            isError={errors.confirmPassword ? true : false}
            errorsMsg={`${
              errors.confirmPassword && errors.confirmPassword?.message
            }`}
          />
          <Button
            classBtn="btn btn-primary update-btn"
            text="Change"
            isLoading={isRequestingAPI}
          />
        </form>
      </div>
    </>
  );
};

export default UserUpdatePassword;
