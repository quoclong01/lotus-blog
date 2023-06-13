import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
            title: 'Create account successfully',
          });
          navigate('/auth/sign-in');
        })
        .catch((error: any) => {
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
      <div className="page-content row">
        <div className="page-link page-link-signup col-5">
          <Link to="/">
            <img src={Image.Logo} alt="Lotus" />
          </Link>
          <img src={Image.LogoAuth} alt="Sign In Lotus" />
        </div>
        <div className="col-7">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form-title">Sign Up Your Account</h1>
            <div className="form-wrapper">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                textLabel="First Name"
                register={register('firstName', nameValidator())}
                isError={errors.firstName ? true : false}
                errorsMsg={`First name ${errors.firstName?.message}`}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                textLabel="Last Name"
                register={register('lastName', nameValidator())}
                isError={errors.lastName ? true : false}
                errorsMsg={`Last name ${errors.lastName?.message}`}
              />
              <Input
                type="text"
                name="displayName"
                placeholder="User Name"
                textLabel="User Name"
                register={register('displayName', nameValidator())}
                isError={errors.displayName ? true : false}
                errorsMsg={`User name ${errors.displayName?.message}`}
              />
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
              <Input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                textLabel="Date of Birth"
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <label className="label">Gender</label>
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
                text="Sign up"
                isLoading={isRequestingAPI}
              />
            </div>
          </form>
          <div className="tips">
            <p className="tip-text">
              Already have an account?
              <Link to="/auth/sign-in" className="tip-link">
                {' '}
                Sign In{' '}
              </Link>
            </p>
            <p className="tip-text">
              By signing up, you confirm that you've read and accepted our
              <Link to="/" className="tip-link">
                {' '}
                Terms of Service{' '}
              </Link>
              and
              <Link to="/" className="tip-link">
                {' '}
                Privacy Policy{' '}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
