import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../core/serivces/auth.service';
import { Button, Input } from '../../shared/components/partials';
import Image from '../../../assets/images';
import { validateDob } from '../../shared/common/validateDob';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../shared/validations/form.validation';
import { useToast } from '../../shared/contexts/toast.contexts';

const authService = new AuthService();
const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [error] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const dataRegister = {
      ...data,
      dob: data.dob.split('-').reverse().join('/'),
    };
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      authService
        .signUp(dataRegister)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: t('message.create_account_success'),
          });
          navigate('/auth/sign-in');
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'error',
            title: t('message.error'),
          });
        });
    }
  };
  return (
    <>
      <div className="page-content row">
        <div className="page-link page-link-signup col-5">
          <Link to="/">
            <img src={Image.Logo} alt="Lotus" />
          </Link>
          <img src={Image.LogoAuth} alt="Sign In Lotus" />
        </div>
        <div className="col-7">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form-title">{t('auth.sign_up_your_account')}</h1>
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
                name="email"
                placeholder={t('auth.email')}
                textLabel={t('auth.email')}
                register={register('email', emailValidator())}
                isError={errors.email ? true : false}
                errorsMsg={errors.email?.message}
              />
              <Input
                type="password"
                name="password"
                placeholder={t('auth.your_password')}
                textLabel={t('auth.password')}
                register={register('password', passwordValidator())}
                isError={errors.password ? true : false}
                errorsMsg={errors.password?.message}
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
              <div className="form-group">
                <select
                  className="form-control form-gender"
                  {...register('gender', { required: true })}
                >
                  <option value="male">{t('auth.male')}</option>
                  <option value="female">{t('auth.female')}</option>
                </select>
                <label className="label">{t('auth.gender')}</label>
              </div>
            </div>
            {error && (
              <div className="error-box">
                <span className="txt-center txt-error">{error}</span>
              </div>
            )}
            <div className="form-btn">
              <Button
                classBtn="btn btn-primary btn-auth"
                text={t('auth.sign_up')}
                isLoading={isRequestingAPI}
              />
            </div>
          </form>
          <div className="tips">
            <p className="tip-text">
              {t('auth.have_account')}&nbsp; 
              <Link to="/auth/sign-in" className="tip-link">
                {t('auth.sign_in')}
              </Link>
            </p>
            <p className="tip-text">
              {t('auth.confirm')}&nbsp; 
              <Link to="/" className="tip-link">
                {t('auth.term_of_services')}&nbsp; 
              </Link>
              {t('auth.and')}&nbsp; 
              <Link to="/" className="tip-link">
                {t('auth.privacy_policy')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
