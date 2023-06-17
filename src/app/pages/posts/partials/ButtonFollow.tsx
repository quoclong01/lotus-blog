import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserService } from '../../../core/serivces/user.service';
import withAuthChecking from '../../../shared/components/hoc/withAuthChecking';
import { Button } from '../../../shared/components/partials';

const userService = new UserService();
const ButtonFollow = ({
  id,
  authorInfo,
  checkAuthBeforeAction,
  setAuthorInfo,
}: any) => {
  const { t } = useTranslation();
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const handleFollow = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      userService
        .handleUserFollow({ followingId: id })
        .then((res: any) => {
          setIsRequestingAPI(false);
          authorInfo.isFollowed = res.followed;
          if (res.followed) {
            setAuthorInfo((authorInfo: any) => ({
              ...authorInfo,
              followers: authorInfo.followers + 1,
            }));
          } else {
            setAuthorInfo((authorInfo: any) => ({
              ...authorInfo,
              followers: authorInfo.followers - 1,
            }));
          }
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  };

  const doFollow = () => {
    checkAuthBeforeAction(handleFollow);
  };

  return (
    <Button
      classBtn="btn btn-primary btn-follow"
      text={authorInfo.isFollowed ? t('common.profile.following') : t('common.profile.follow')}
      onClick={doFollow}
      isLoading={isRequestingAPI}
    />
  );
};

export default withAuthChecking(ButtonFollow);
