import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { getUserInfo } from './user/user.actions';
import { getData, storeData } from '../core/helpers/localstorage';
import { Header } from '../shared/components/layout';
import { useToast } from '../shared/contexts/toast.contexts';

const Page = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const toast = useToast();
  const accessToken = new URLSearchParams(location.search).get('accessToken');
  const isNewUser = new URLSearchParams(location.search).get('isNewUser');
  const providerType = new URLSearchParams(location.search).get('providerType'); 

  useEffect(() => {
    if (accessToken) {
      storeData('token', accessToken);
      storeData('providerType', providerType);
      if(isNewUser === 'true') {
        toast?.addToast({
          type: 'success',
          title: 'Create account successfully.',
        });
      }
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    if (getData('token', '')) {
      dispatch(getUserInfo({ id: 'me' }));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Page;
