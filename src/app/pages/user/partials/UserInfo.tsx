import React, { useEffect, useState } from 'react';
import Image from '../../../../assets/images';
import { checkUserId } from '../../../shared/common/checkUserId';
import { useDialog } from '../../../shared/contexts/dialog.contexts';
import { IUser } from '../../../shared/interfaces/user';
import ButtonFollow from '../../posts/partials/ButtonFollow';
import UserListFollow from './UserListFollow';

interface IUserProps {
  authorInfo: IUser;
}

const UserInfo = ({ authorInfo }: IUserProps) => {
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
        <img src={user?.picture || Image.Avatar} alt={user?.displayName} />
      </div>
      <div className="author-info">
        <h2 className="author-name">{user?.displayName}</h2>
        <ul className="author-list">
          <li className="author-item">{user.Posts?.length || 0} Posts</li>
          <li className="author-item" onClick={handleListFollowers}>
            {user?.followers} Followers
          </li>
          <li className="author-item" onClick={handleListFollowing}>
            {user?.followings} Following
          </li>
        </ul>
        {!checkUserId(user.id) && (
          <ButtonFollow
            id={user.id}
            authorInfo={user}
            setAuthorInfo={setUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
