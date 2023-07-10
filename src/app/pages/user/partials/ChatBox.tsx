/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { UserService } from '../../../core/serivces/user.service';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
import Image from '../../../../assets/images';
import { ChatService } from '../../../core/serivces/chat.service';

const chatService = new ChatService();
const userService = new UserService();
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const getUserData = async () => {
    const userId = chat?.members?.find((id) => id != currentUser);
    try {
      userService
        .getUserInfo(userId)
        .then((res: any) => {
          setUserData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // fetching data for header
  useEffect(() => {
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  const getMessages = async () => {
    try {
      chatService
        .getMessages(chat.id)
        .then((res) => {
          if (res) {
            setMessages(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (chat !== null) getMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEnter = () => {
    handleSendMessage();
  };

  // Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat.id,
    };
    const receiverId = chat.members.find((id) => id != currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      chatService
        .addMessage(message)
        .then((res) => {
          if (res) {
            setMessages([...messages, res]);
            setNewMessage('');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log('error');
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId == chat.id) {
      console.log('DEBUGGGGG', receivedMessage)
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  
  const scroll = useRef<any>();
  return (
    <>
      <div className='chatbox-container'>
        {chat ? (
          <>
            {/* chat-header */}
            <div className='chatbox-header'>
              <div className='chatbox-header-left'>
                <div className='chatbox-header-image'>
                  <img
                    src={userData?.picture || Image.Avatar}
                    alt={userData?.displayName}
                    onError={(e: any) => {
                      e.target['onerror'] = null;
                      e.target['src'] = Image.Avatar;
                    }}
                  />
                </div>
                <h4 className='chatbox-header-name'>
                  {userData?.firstName} {userData?.lastName}
                </h4>
              </div>
              <div className='chatbox-header-right'>
                <ul className='chatbox-setting'>
                  <li className='chatbox-setting-item'>
                    <i className='fa-solid fa-phone'></i>
                  </li>
                  <li className='chatbox-setting-item'>
                    <i className='fa-solid fa-video'></i>
                  </li>
                  <li className='chatbox-setting-item'>
                    <i className='fa-solid fa-gear'></i>
                  </li>
                </ul>
              </div>
            </div>
            {/* chat-body */}
            <div className='chatbox-body'>
              {messages.map((message: any, index: number) => (
                <div
                  ref={scroll}
                  className={
                    message.senderId == currentUser.toString()
                      ? 'message own'
                      : 'message'
                  }
                  key={index}
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className='chatbox-sender'>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                fontFamily='Roboto, sans-serif'
                onEnter={handleEnter}
                cleanOnEnter={true}
              />
              <div className='btn-send button' onClick={handleSubmit}>
                <i className='fa-solid fa-paper-plane'></i>
              </div>
            </div>
          </>
        ) : (
          <span className='chatbox-empty-message'>
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
