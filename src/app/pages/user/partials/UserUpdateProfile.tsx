import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SignaturesService } from './../../../core/serivces/signatures.service';
import { UserService } from './../../../core/serivces/user.service';
import { RootState } from '../../../app.reducers';
import { getUserInfoSuccess } from '../user.actions';
import { Button, Input } from '../../../shared/components/partials';
import { validateDob } from '../../../shared/common/validateDob';
import { nameValidator } from '../../../shared/validations/form.validation';
import Loading from '../../../shared/components/partials/Loading';
import Image from '../../../../assets/images';

const userService = new UserService();
const signaturesService = new SignaturesService();
const UserUpdateProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string>(Image.Avatar);
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [error] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: dataUser, isLoading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (Object.keys(dataUser).length) {
      const dobFormat = dataUser.dob ? dataUser?.dob.split('/').reverse().join('-') : '';
      setValue('picture', dataUser?.picture);
      setValue('firstName', dataUser?.firstName);
      setValue('lastName', dataUser?.lastName);
      setValue('displayName', dataUser?.displayName);
      setValue('phone', dataUser?.phone);
      setValue('dob', dobFormat);
      setValue('gender', dataUser?.gender);
      setAvatar(dataUser?.picture);
    }
  }, [dataUser]);

  const onSubmit = (data: any) => {
    const dataUpdate = {
      ...data,
      dob: data.dob.split('-').reverse().join('/'),
    };
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      userService
        .updateProfileUser(dataUpdate)
        .then((res: any) => {
          setIsRequestingAPI(false);
          dispatch(getUserInfoSuccess(res));
          toast.success(t('message.update_profile_success'));
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast.error(t('message.error'));
        });
    }
  };

  const handleChangeAvatar = async (e: any) => {
    const file = e.target.files[0];
    const payload = {
      type_upload: 'avatar',
      file_name: file.name,
      file_type: file.type,
    };
    try {
      await signaturesService.getSignatures(payload).then((data: any) => {
        setValue('picture', data.url);
      });
    } catch (err) {
      toast.error(t('message.error'));
    }
    setAvatar(URL.createObjectURL(file));
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="update-user">
        <form className="update-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="update-avatar">
            <div className="update-avatar-image">
              <img
                src={avatar || Image.Avatar}
                alt={dataUser.displayName}
                onError={(e: any) => {
                  e.target['onerror'] = null;
                  e.target['src'] = Image.Avatar;
                }}
              />
            </div>
            <input
              type="file"
              className="update-file"
              id="update-file"
              {...register('picture')}
              onChange={handleChangeAvatar}
              accept="image/png, image/jpeg"
            />
            <label htmlFor="update-file" className="update-file-label">
              <i className="fa-solid fa-camera-rotate"></i>
            </label>
          </div>
          <div className="form-wrapper">
            <Input
              type="text"
              name="firstName"
              placeholder={t('auth.first_name')}
              textLabel={t('auth.first_name')}
              register={register('firstName', nameValidator())}
              isError={errors.firstName ? true : false}
              errorsMsg={`First name ${errors.firstName?.message}`}
            />
            <Input
              type="text"
              name="lastName"
              placeholder={t('auth.last_name')}
              textLabel={t('auth.last_name')}
              register={register('lastName', nameValidator())}
              isError={errors.lastName ? true : false}
              errorsMsg={`Last name ${errors.lastName?.message}`}
            />
            <Input
              type="text"
              name="displayName"
              placeholder={t('auth.user_name')}
              textLabel={t('auth.user_name')}
              register={register('displayName', nameValidator())}
              isError={errors.displayName ? true : false}
              errorsMsg={`User name ${errors.displayName?.message}`}
            />
            <Input
              type="text"
              name="phone"
              placeholder={t('auth.phone')}
              textLabel={t('auth.phone')}
              register={register('phone', {
                required: 'required',
                pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              })}
              isError={errors.phone ? true : false}
              errorsMsg="Phone is invalid."
            />
            <Input
              type="date"
              name="dob"
              placeholder={t('auth.date_of_birth')}
              textLabel={t('auth.date_of_birth')}
              register={register('dob', {
                required: 'required',
                validate: validateDob,
              })}
              isError={errors.dob ? true : false}
              errorsMsg={`Date of birth is ${
                errors.dob && errors.dob.message
              }.`}
            />
            <div className="update-gender">
              <label htmlFor="male" className="update-gender-label">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                />
                {t('auth.male')}
                <span className="checkmark"></span>
              </label>
              <label htmlFor="female" className="update-gender-label">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                />
                {t('auth.female')}
                <span className="checkmark"></span>
              </label>
              <label htmlFor="other" className="update-gender-label">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  name="gender"
                  value="other"
                  id="other"
                />
                {t('auth.other')}
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          {error && (
            <div className="error-box">
              <span className="txt-center txt-error">{error}</span>
            </div>
          )}
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

export default UserUpdateProfile;
