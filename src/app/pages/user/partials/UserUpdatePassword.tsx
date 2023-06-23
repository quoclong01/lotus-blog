import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UserService } from '../../../core/serivces/user.service';
import { Button, Input } from '../../../shared/components/partials';
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
  const { t } = useTranslation();

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
          toast.success(t('message.update_passord_success'));
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          toast.error(t('message.error'));
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
            placeholder={t('auth.old_password')}
            textLabel={t('auth.old_password')}
            register={register('oldPassword', passwordValidator())}
            isError={errors.oldPassword ? true : false}
            errorsMsg={errors.oldPassword?.message}
          />
          <Input
            name="password"
            type="password"
            placeholder={t('auth.new_password')}
            textLabel={t('auth.new_password')}
            register={register('newPassword', passwordValidator())}
            isError={errors.newPassword ? true : false}
            errorsMsg={errors.newPassword?.message}
          />
          <Input
            name="password"
            type="password"
            placeholder={t('auth.confirm_passowrd')}
            textLabel={t('auth.confirm_passowrd')}
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
            text={t('auth.update')}
            isLoading={isRequestingAPI}
          />
        </form>
      </div>
    </>
  );
};

export default UserUpdatePassword;
