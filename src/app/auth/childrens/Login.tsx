import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfoSuccess } from '../../pages/user/user.actions';
import { AuthService } from '../../core/serivces/auth.service';
import { storeData } from '../../core/helpers/localstorage';
import {
  emailValidator,
  passwordValidator,
} from '../../shared/validations/form.validation';
import { Input } from '../../shared/components/partials';
import { Button } from '../../shared/components/partials';
import Image from '../../../assets/images';
import { environment } from '../../../config';

const authService = new AuthService();
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          if (hash.includes('profile')) {
            navigate(`/profile/${hash.split('=')[1]}`);
          } else {
            navigate('/');
          }
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          setError(error.response.data?.errors);
        });
    }
  };

  return (
    <div className="page-content row">
      <div className="page-link col-5">
        <Link to="/">
          <img src={Image.Logo} alt="Lotus" />
        </Link>
        <img src={Image.LogoAuth} alt="Sign In Lotus" />
      </div>
      <div className="form-signin col-7">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form-title">Sign In</h1>
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
          </div>
          {error && (
            <div className="error-box">
              <span className="txt-center txt-error">{error}</span>
            </div>
          )}
          <div className="form-btn">
            <Button
              classBtn="btn btn-primary btn-auth"
              text="Sign in"
              isLoading={isRequestingAPI}
            />
          </div>
          <a href={`${environment.apiBaseUrl}/auth/google`} className="login-with-google-btn">
            <i className="fa-brands fa-google"></i>
            Sign in with Google
          </a>
        </form>
        <div className="tips txt-center">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
