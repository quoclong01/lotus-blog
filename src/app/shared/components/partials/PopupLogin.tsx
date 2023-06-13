import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
        <h1 className="popup-login-title">Welcome to</h1>
        <div className="popup-login-image">
          <img src={Image.Logo} alt="Lotus" />
        </div>
      </div>
      <div className="form-wrapper">
        <Input
          type="text"
          name="email"
          placeholder="Email"
          textLabel="Email"
          register={register('email', emailValidator())}
          isError={errors.email ? true : false}
          errorsMsg={errors.email?.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Your Password"
          textLabel="Password"
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
          text="Sign in"
          isLoading={isRequestingAPI}
        />
      </div>
      <a href={`${environment.apiBaseUrl}/auth/google`} className="login-with-google-btn">
        <i className="fa-brands fa-google"></i>
        Sign in with Google
      </a>
      <Link to="/" className="tip-link">
        Forgot your password?
      </Link>
      <p className="tip-text">
        Don’t have an account?
        <Link to="/auth/sign-up" className="tip-link">
          {' '}
          Sign up{' '}
        </Link>
      </p>
    </form>
  );
};

export default PopUpLogin;
