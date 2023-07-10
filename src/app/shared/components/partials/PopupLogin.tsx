import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDialog } from './../../contexts/dialog.contexts';
import { AuthService } from './../../../core/serivces/auth.service';
import { getUserInfoSuccess } from '../../../pages/user/user.actions';
import { storeData } from '../../../core/helpers/localstorage';
import { Input } from './Input';
import { Button } from './Button';
import Image from '../../../../assets/images';
import {
  emailValidator,
  passwordValidator,
} from '../../validations/form.validation';
import { environment } from '../../../../config';

const authService = new AuthService();
const PopUpLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const dialog = useDialog();
  const { t } = useTranslation();

  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [error, setError] = useState('');

  const onSubmit = (data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      authService
        .signIn(data)
        .then((res: any) => {
          setIsRequestingAPI(false);
          storeData('token', res.accessToken);
          dispatch(getUserInfoSuccess(res.userInfo));
          dialog?.closeDialog();
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          setError(error.response.data?.errors);
        });
    }
  };

  return (
    <form className="popup-login" onSubmit={handleSubmit(onSubmit)}>
      <div className="popup-login-header">
        <h1 className="popup-login-title">{t('common.header.welcome')}</h1>
        <div className="popup-login-image">
          <img src={Image.Logo} alt="Lotus" />
        </div>
      </div>
      <div className="form-wrapper">
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
        {error && (
          <div className="error-box">
            <span className="txt-center txt-error">{error}</span>
          </div>
        )}
      </div>
      <div className="form-btn">
        <Button
          classBtn="btn btn-primary popup-login-btn"
          text={t('auth.sign_in')}
          isLoading={isRequestingAPI}
        />
      </div>
      <a href={`${environment.apiBaseUrl}/auth/google`} className="login-with-google-btn">
        <i className="fa-brands fa-google"></i>
        {t('auth.login_with_google')}
      </a>
      <a href={`${environment.apiBaseUrl}/auth/github?redirect_to=${window.location.origin}`} className="btn btn-github">
        <i className="fa-brands fa-github"></i>
        {t('auth.login_with_github')}
      </a>
      <Link to="/" className="tip-link">
        {t('auth.forgot_password')}
      </Link>
      <p className="tip-text">
        {t('auth.dont_have_account')}
        <Link to="/auth/sign-up" className="tip-link">
          {' '}
          {t('auth.sign_up')}{' '}
        </Link>
      </p>
    </form>
  );
};

export default PopUpLogin;
