/* eslint-disable eqeqeq */
import React, { useRef, useState } from "react";
import ChatBox from "../partials/ChatBox";
import Conversation from "../partials/Conversation";
import ChatSearch from "../partials/ChatSearch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../app.reducers';
import { io } from 'socket.io-client'
import { userChats } from "../api/ChatRequest";
import { parseJwt } from "../../../core/helpers/parseJwt";
import { getData } from "../../../core/helpers/localstorage";

const Chat = () => {
  const socket = useRef<any>();
  const user = useSelector((state: RootState) => state.users.data);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [active, setActive] = useState<number>();
  // Get the chat in chat section
  const token = getData('token', '');
  const userId = parseJwt(token).userId;
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(userId);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userId]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
        setReceivedMessage(data);
      }
    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member != userId);
    const online = onlineUsers.find((user: any) => user.userId == chatMember);
    return online ? true : false;
  };

  return (
    <section className="section-chat">
      {/* Left Side */}
      <div className="chat-left">
        <ChatSearch />
        <div className="chat-container">
          <div className="chat-heading">
            <h2>Chats</h2>
            <i className="fa-solid fa-list-ul"></i>
          </div>
          <div className="chat-user-list">
            {chats.map((chat, index) => (
              <div key={index}
                onClick={() => {
                  setCurrentChat(chat);
                  setActive(index);
                }}
                className={active === index ? 'chat-user-active' : ''}
              >
                <Conversation
                  data={chat}
                  currentUser={userId}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="chat-right">
        <ChatBox
          chat={currentChat}
          currentUser={userId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </section>
  );
};

export default Chat;
