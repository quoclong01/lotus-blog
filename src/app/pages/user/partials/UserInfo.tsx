import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Image from '../../../../assets/images';
import { checkUserId } from '../../../shared/common/checkUserId';
import { useDialog } from '../../../shared/contexts/dialog.contexts';
import { IUser } from '../../../shared/interfaces/user';
import ButtonFollow from '../../posts/partials/ButtonFollow';
import UserListFollow from './UserListFollow';
import withAuthChecking from '../../../shared/components/hoc/withAuthChecking';
import { toast } from 'react-toastify';
import { getData } from '../../../core/helpers/localstorage';
import { parseJwt } from '../../../core/helpers/parseJwt';
import { ChatService } from '../../../core/serivces/chat.service';

interface IUserProps {
  authorInfo: IUser;
}

const ButtonChatTemplate = ({ checkAuthBeforeAction }: any) => {
  const chatService = new ChatService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  const handleChat = async () => {
    const token = getData('token', '');
    let userId: any;
    if (token) {
      userId = parseJwt(token).userId;
    }
    const data = {
      senderId: userId.toString(),
      receiverId: id?.toString(),
    };
    try {
      chatService
        .createChat(data)
        .then((res) => {
          if (res) {
            navigate('/chat');
          }
        })
        .catch((error: any) => {
          toast.error('Khong the nhan tin');
        });
    } catch (error: any) {
      toast.error('Khong the nhan tin');
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    checkAuthBeforeAction(handleChat);
  };

  return (
    <button className="btn btn-primary btn-follow ml-2" onClick={handleClick}>
      {t('common.header.chat')}
    </button>
  );
}

const ButtonChat = withAuthChecking(ButtonChatTemplate);

const UserInfo = ({ authorInfo }: IUserProps) => {
  const { t } = useTranslation();
  const dialog = useDialog();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    setUser(authorInfo);
  }, [authorInfo]);

  const handleListFollowers = () => {
    dialog?.addDialog({
      content: <UserListFollow id={user.id} type="followers" />,
    });
  };

  const handleListFollowing = () => {
    dialog?.addDialog({
      content: <UserListFollow id={user.id} type="followings" />,
    });
  };

  return (
    <div className="author-info-content">
      <div className="author-avatar">
        <img
          src={user?.picture || Image.Avatar}
          alt={user?.displayName}
          onError={(e: any) => {
            e.target['onerror'] = null;
            e.target['src'] = Image.Avatar;
          }}
        />
      </div>
      <div className="author-info">
        <h2 className="author-name">{user?.displayName}</h2>
        <ul className="author-list">
          <li className="author-item">{user.Posts?.length || 0} {t('common.profile.posts')}</li>
          <li className="author-item" onClick={handleListFollowers}>
            {user?.followers} {t('common.profile.follower')}
          </li>
          <li className="author-item" onClick={handleListFollowing}>
            {user?.followings} {t('common.profile.following')}
          </li>
        </ul>
        {!checkUserId(user.id) && (
          <div className='flex-center'>
            <ButtonFollow
              id={user.id}
              authorInfo={user}
              setAuthorInfo={setUser}
            />
            <ButtonChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
