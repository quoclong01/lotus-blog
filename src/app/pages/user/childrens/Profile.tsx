import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserInfo from '../partials/UserInfo';
import SekeletonPost from '../../../shared/components/partials/SekeletonPost';
import SekeletonUserInfo from '../../../shared/components/partials/SekeletonUserInfo';
import { getData } from '../../../core/helpers/localstorage';
import { UserService } from './../../../core/serivces/user.service';
import PostList from '../../posts/partials/PostList';

const userService = new UserService();
const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [authorInfo, setAuthorInfo] = useState<any>();
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    setIsLoadingUser(true);
    userService
      .getUserInfo(id!)
      .then((userInfo: any) => {
        if (!getData('token', '')) {
          setIsLoadingUser(false);
          setAuthorInfo(userInfo);
        }
        if (getData('token', '') && id) {
          userService
            .getUserPosts(id)
            .then((res: any) => {
              setIsLoadingUser(false);
              setAuthorInfo({ ...res, isFollowed: userInfo.isFollowed });
            })
            .catch((error: any) => {
              setIsLoadingUser(false);
            });
        }
      })
      .catch((error: any) => {
        setIsLoadingUser(false);
        navigate('/error/not-found');
      });
  }, [id]);

  return (
    <div className="section-user-post">
      {isLoadingUser ? (
        <SekeletonUserInfo />
      ) : (
        <UserInfo authorInfo={authorInfo} />
      )}
      {isLoadingUser ? (
        <SekeletonPost />
      ) : (
        <>
          {getData('token', '') ? (
            <PostList posts={authorInfo?.Posts} />
          ) : (
            <div className="message-post">
              { t('common.profile.please') }
              <Link to={`/auth/sign-in#profile=${id}`} className="message-link">
                { t('auth.sign_in') }
              </Link>
              { t('common.profile.lotus_view') }
              <span className="message-name"> {authorInfo.displayName} </span>
              { t('common.profile.posts_view') }
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
