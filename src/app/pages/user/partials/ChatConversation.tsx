/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { UserService } from '../../../core/serivces/user.service';
import Image from '../../../../assets/images';

const userService = new UserService();
const ChatConversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const userId = data.members.find((id) => id != currentUser);
    const getUserData = async () => {
      try {
        userService
          .getUserInfo(userId)
          .then((res: any) => {
            if (res) {
              setUserData(res);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className='chat-user-item'>
        <div className='chat-user-image'>
          {online && <div className='chat-user-online'></div>}
          <img
            src={userData?.picture || Image.Avatar}
            alt={userData?.displayName}
            onError={(e: any) => {
              e.target['onerror'] = null;
              e.target['src'] = Image.Avatar;
            }}
          />
        </div>
        <div className='chat-user-name'>
          <h4>
            {userData?.firstName} {userData?.lastName}
          </h4>
          <span>{online ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </>
  );
};

export default ChatConversation;
