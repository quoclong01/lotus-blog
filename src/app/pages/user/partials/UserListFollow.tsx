import React, { useEffect, useState } from 'react';
import { UserService } from '../../../core/serivces/user.service';
import Follower from '../../../shared/components/partials/Follower';

const userService = new UserService();
interface IUserListFollowersProps {
  id: string;
  type: string;
}
const UserListFollow = ({ id, type }: IUserListFollowersProps) => {
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const [listFollowers, setListFollowers] = useState([]);

  useEffect(() => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      userService
        .getListFollow({ id, type })
        .then((res: any) => {
          setIsRequestingAPI(false);
          setListFollowers(res);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  }, []);

  return (
    <div className="section-follower">
      <h4 className="follower-title">{type}</h4>
      <ul className="follower-list">
        {listFollowers.length ? (
          listFollowers.map((follower: any) => (
            <Follower key={follower.id} follower={follower} />
          ))
        ) : (
          <p>No {type}.</p>
        )}
      </ul>
    </div>
  );
};

export default UserListFollow;
