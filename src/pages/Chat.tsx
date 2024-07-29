import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contact from "../components/Contact";
import { ChatRoomCreateRouter, GetAllUser, host } from "../utils/Api";
import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import Chatcontainer from "../components/Chatcontainer";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-screen w-screen flex justify-center items-center bg-blue-950 p-0 m-0">
    <div className="h-full w-9/12 bg-black grid grid-cols-[1fr_3fr] p-0 m-0">
      {children}
    </div>
  </div>
);

const Chat: React.FC = () => {
  const [contact, setContact] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [ChatRoom, setChatRoom] = useState({
    senderId: "",
    reciverId: "",
    chatId: "",
  });
  const navigate = useNavigate();
  const users = useSelector((state: any) => state.user.userData);
  const socket: Socket = io(`${host}`, { autoConnect: false });

  useEffect(() => {
    if (users) {
      setCurrentUser(users);
      socket.connect();
      socket.emit("add-online-users", users._id);
    } else {
      navigate("/login");
    }
  }, [users, navigate, socket]);

  useEffect(() => {
    if (users && users.isAvatarImageset) {
      const fetchContacts = async () => {
        try {
          const { data } = await axios.get(`${GetAllUser}/${currentUser._id}`);
          setContact(data.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchContacts();
    } else {
      navigate("/setAvatar");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("👽 connected socket server");
      socket.emit("add-online-users", currentUser._id);
    });

    return () => {
      socket.off("connect");
      console.log("stop here also ");
      socket.disconnect();
    };
  }, [socket]);

  const handleChange = async (chat: any) => {
    setCurrentChat(chat);
    try {
      const newChat = {
        sender_id: users._id,
        reciver_id: chat._id,
      };
      const response = await axios.post(ChatRoomCreateRouter, {
        newChat,
      });

      if (response.data.success) {
        setChatRoom({
          senderId: users._id,
          reciverId: chat._id,
          chatId: response.data.ChatRoom._id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Contact contact={contact} changeChat={handleChange} socket={socket} />
      <div className="h-full w-full">
        {currentChat ? (
          <Chatcontainer
            ChatRoom={ChatRoom}
            CurrenChat={currentChat}
            socket={socket}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </Container>
  );
};

export default Chat;
