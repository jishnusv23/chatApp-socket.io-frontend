import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contact from "../components/Contact";
import { ChatRoomCreateRouter, GetAllUser } from "../utils/Api";
import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";
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
  // console.log("🚀 ~ file: Chat.tsx:28 ~ users:", users);

  useEffect(() => {
    const checking = async (): Promise<void> => {
      try {
        if (!users) {
          navigate("/login");
        } else {
          setCurrentUser(users);
        }
      } catch (err) {
        console.error("Error fetching user from localStorage in chat", err);
      }
    };
    checking();
  }, [navigate]);

  useEffect(() => {
    const passing = async (): Promise<void> => {
      try {
        if (users && users.isAvatarImageset) {
          const { data } = await axios.get(`${GetAllUser}/${currentUser._id}`);
          setContact(data.data);
        } else {
          navigate("/setAvatar");
        }
      } catch (err) {
        console.error(err);
      }
    };
    passing();
  }, [currentUser]);
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
        console.log(
          "🚀 ~ file: Chat.tsx:70 ~ handleChange ~ response:",
          response
        );
        setChatRoom({
          senderId: users._id,
          reciverId: chat._id,
          chatId: response.data.ChatRoom._id,
        });
      }
      // console.log("🚀 ~ file: Chat.tsx:65 ~ handleChange ~ response:", response)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Contact contact={contact} changeChat={handleChange} />
      <div className="h-full w-full">
        {currentChat ? (
          <Chatcontainer ChatRoom={ChatRoom} CurrenChat={currentChat} />
        ) : (
          <Welcome />
        )}
      </div>
    </Container>
  );
};

export default Chat;
