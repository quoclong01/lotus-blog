import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../app.reducers';
import { clearUserInfo } from '../../../pages/user/user.actions';
import { AuthService } from '../../../core/serivces/auth.service';
import { KEYS, storeData, getData } from '../../../core/helpers/localstorage';
import withAuthChecking from '../hoc/withAuthChecking';
import Image from '../../../../assets/images';

const WriteTemplate = ({ checkAuthBeforeAction }: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleWrite = (e: any) => {
    e.preventDefault();
    checkAuthBeforeAction(() => navigate('/posts/new'));
  };
  return (
    <li className="nav-item">
      <Link to="/posts/new" className="nav-link" onClick={handleWrite}>
        {t('common.header.write')}
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
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [searchInput, setSearchInput] = useState<string>('');
  const { t, i18n } = useTranslation();
  const languageList = ['vi', 'en', 'ja'];

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  useEffect(() => {
    const lang = getData(KEYS.I18N_LANG, '');
    if (lang) {
      i18n.changeLanguage(lang);
      setCurrentLang(lang);
    }
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

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    storeData(KEYS.I18N_LANG, lang);
    i18n.changeLanguage(lang);
  }

  const handleSearchPost = (e: any) => {
    setSearchInput(e.target.value);
  }

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
            <li className="nav-item">
              <div className="search-box">
                <input type="text" placeholder={t('common.header.search')} className="search-input" value={searchInput} onChange={handleSearchPost}/>
                <a href={`/posts?query=${searchInput}`} className="search-btn">
                  <i className="fas fa-search"></i>
                </a>
              </div>
            </li>
            <li className="nav-item">
              <select className="nav-lang" name="language" onChange={handleChangeLang} value={currentLang}>
                {
                  languageList.map((item: string) =>
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  )
                }
                </select>
            </li>
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
                      {t('common.header.profile')}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/profile/update">
                      <i className="fa-solid fa-file-pen"></i>
                      {t('common.header.update_profile')}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/chat">
                      <i className='bx bxs-chat'></i>
                      {t('common.header.chat')}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/posts/draft">
                      <i className="fa-brands fa-firstdraft"></i>
                      {t('common.header.draft')}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/posts/recycle-bin">
                      <i className="fa-solid fa-trash"></i>
                      {t('common.header.my_recycle_bin')}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/bookmarks">
                      <i className="fa-solid fa-bookmark"></i>
                      {t('common.header.my_bookmarks')}
                    </Link>
                  </li>
                  <li className="dropdown-item" onClick={handleSignOut}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    {t('auth.sign_out')}
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/sign-in" className="nav-link">
                    {t('auth.sign_in')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/sign-up" className="btn btn-secondary">
                    {t('common.header.get_started')}
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
