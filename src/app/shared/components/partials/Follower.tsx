import React from 'react';
import { Link } from 'react-router-dom';
import { checkUserId } from '../../common/checkUserId';
import Image from '../../../../assets/images';

interface IFollowerProps {
  follower: any;
}

const Follower = ({ follower }: IFollowerProps) => {
  return (
    <li className="follower">
      <div className="follower-item">
        <div className="follower-image">
          <Link
            to={
              checkUserId(follower?.id)
                ? `/profile/me`
                : `/profile/${follower?.id}`
            }
            className="follower-image-link"
          >
            <img
              src={follower?.picture || Image.Avatar}
              alt={follower?.displayName}
              onError={(e: any) => {
                e.target['onerror'] = null;
                e.target['src'] = Image.Avatar;
              }}
            />
          </Link>
        </div>
        <div className="follower-info">
          <Link
            to={
              checkUserId(follower?.id)
                ? `/profile/me`
                : `/profile/${follower?.id}`
            }
            className="follower-username"
          >
            <span>{follower?.displayName}</span>
          </Link>
          <p className="follower-name">
            {follower?.firstName} {follower?.lastName}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Follower;
