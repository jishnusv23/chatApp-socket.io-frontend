import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import Chatinput from "./Chatinput";
import axios from "axios";
import { AddMsgRoute, GetAllMsg, host } from "../utils/Api";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface ChatContainerProps {
  CurrenChat: any;
  ChatRoom: any;
}

const Chatcontainer: React.FC<ChatContainerProps> = ({
  CurrenChat,
  ChatRoom,
}) => {
  const currentUser = useSelector((state: any) => state.user.userData);
  const [message, setMessage] = useState<any>([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!CurrenChat) {
    return null;
  }

  useEffect(() => {
    const GettAll = async () => {
      try {
        const data = await axios.get(`${GetAllMsg}/${ChatRoom.chatId}`);
        if (data.data.success) {
          setMessage(data.data.messages);
        }
      } catch (err) {
        console.error(err);
      }
    };
    GettAll();
  }, [ChatRoom.chatId]);

  useEffect(() => {
    const socket: Socket = io(`${host}`);

    socket.on("connect", () => {
      console.log("👽 connected socket server");
      socket.emit("add-online-users", currentUser._id);
    });

    socket.on("getOnlineUsers", (data: []) => {
      console.log("getOnline");
      setOnlineUsers(data);
    });

    socket.on("get-message", (reciverData: any) => {
      console.log("get message", reciverData);
      setMessage((prev: any) => [...prev, reciverData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser._id]);

  const handleMsg = async (msg: string) => {
    let msgBdy = {
      senderId: currentUser._id,
      chatId: ChatRoom.chatId,
      message: msg,
    };
    const socket: Socket = io(`${host}`);
    socket.emit("send-message", {
      ...msgBdy,
      reciverId: ChatRoom.reciverId,
    });
    const data = await axios.post(AddMsgRoute, {
      senderId: currentUser._id,
      chatId: ChatRoom.chatId,
      message: msg,
    });
    setMessage(data.data.allMsg);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white">
      <div className="chat-header flex items-center justify-between bg-gray-800 w-full">
        <div className="user-details flex items-center p-4">
          <img
            src={`data:image/svg+xml;base64,${CurrenChat.avatarImage}`}
            alt="User Avatar"
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <div className="text-lg font-semibold">{CurrenChat.name}</div>
          </div>
        </div>
        <Logout />
      </div>
      <div
        className="flex-1 bg-gray-800 p-4 overflow-y-auto scrollbar-hide  "
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        <div className="flex flex-col gap-2">
          {message.map((msg: any) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === currentUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`relative p-2 rounded-lg max-w-xs flex flex-col ${
                  msg.senderId === currentUser._id
                    ? "bg-blue-500 text-white items-end"
                    : "bg-gray-700 text-white items-start"
                }`}
              >
                <div className="message-content">{msg.message}</div>
                <span className="text-xs self-end">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <Chatinput handleMsg={handleMsg} />
    </div>
  );
};

export default Chatcontainer;
