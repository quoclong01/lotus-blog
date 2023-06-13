import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app.reducers';
import { clearUserInfo } from '../../../pages/user/user.actions';
import { AuthService } from '../../../core/serivces/auth.service';
import { getData } from '../../../core/helpers/localstorage';
import withAuthChecking from '../hoc/withAuthChecking';
import Image from '../../../../assets/images';

const WriteTemplate = ({ checkAuthBeforeAction }: any) => {
  const navigate = useNavigate();
  const handleWrite = (e: any) => {
    e.preventDefault();
    checkAuthBeforeAction(() => navigate('/posts/new'));
  };
  return (
    <li className="nav-item">
      <Link to="/posts/new" className="nav-link" onClick={handleWrite}>
        Write
      </Link>
    </li>
  );
};

const Write = withAuthChecking(WriteTemplate);
const authService = new AuthService();
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.data);
  const [sticky, setSticky] = useState<string>('');
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100 ? 'header-sticky' : '';
    setSticky(stickyClass);
  };

  const handleSignOut = () => {
    const providerType = getData('providerType', '');
    if (providerType !== 'email') {
      localStorage.removeItem('providerType');
      localStorage.removeItem('token');
      dispatch(clearUserInfo());
      navigate('/');
    } else {
      if (!isRequestingAPI) {
        setIsRequestingAPI(true);
        authService
          .signOut()
          .then((res: any) => {
            setIsRequestingAPI(false);
            localStorage.removeItem('token');
            dispatch(clearUserInfo());
            navigate('/');
          })
          .catch((error: any) => {
            setIsRequestingAPI(false);
          });
      }
    }
  };

  return (
    <header className={`header ${sticky}`}>
      <div className="container">
        <div className="header-inner">
          <h1 className="logo">
            <Link to="/" className="logo-image">
              <img src={Image.Logo} alt="Lotus" />
            </Link>
          </h1>
          <ul className="nav-list">
            <Write />
            {Object.keys(user).length ? (
              <li className="nav-item">
                <div className="nav-image">
                  <img
                    src={user.picture || Image.Avatar}
                    alt={user.displayName}
                    onError={(e: any) => {
                      e.target['onerror'] = null;
                      e.target['src'] = Image.Avatar;
                    }}
                  />
                </div>
                <ul className="dropdown-menu dropdown-menu-hide">
                  <li className="dropdown-item">
                    <Link to={`/profile/me`}>
                      <i className="fa-solid fa-user"></i>
                      Profile
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/profile/update">
                      <i className="fa-solid fa-file-pen"></i>
                      Update Profile
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/posts/recycle-bin">
                      <i className="fa-solid fa-trash"></i>
                      My Recycle Bin
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/bookmarks">
                      <i className="fa-solid fa-bookmark"></i>
                      My Bookmarks
                    </Link>
                  </li>
                  <li className="dropdown-item" onClick={handleSignOut}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Sign Out
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/sign-in" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/sign-up" className="btn btn-secondary">
                    Get started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
