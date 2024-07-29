import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import Chatinput from "./Chatinput";
import axios from "axios";
import { AddMsgRoute, GetAllMsg, host } from "../utils/Api";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

interface ChatContainerProps {
  CurrenChat: any;
  ChatRoom: any;
  socket: Socket;
}

const Chatcontainer: React.FC<ChatContainerProps> = ({
  CurrenChat,
  ChatRoom,
  socket,
}) => {
  // console.log("🚀 ~ file: Chatcontainer.tsx:20 ~ ChatRoom:", ChatRoom)
  // console.log("🚀 ~ file: Chatcontainer.tsx:20 ~ CurrenChat:", CurrenChat)
  const currentUser = useSelector((state: any) => state.user.userData);
  const [message, setMessage] = useState<any>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // console.log("🚀 ~ file: Chatcontainer.tsx:22 ~ message:", message);

  if (!CurrenChat) {
    return null;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(`${GetAllMsg}/${ChatRoom.chatId}`);

        if (data.data.success) {
          setMessage(data.data.messages);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [ChatRoom.chatId]);

  useEffect(() => {
    socket.on("get-message", (reciverData: any) => {
      console.log(
        "🚀 ~ file: Chatcontainer.tsx:51 ~ socket.on ~ reciverData444444444:",
        reciverData
      );

      setMessage((prev: any) => [...prev, reciverData]);
    });

    return () => {
      console.log("Cleaning up socket listeners...");
      socket.off("get-message");
    };
  }, [currentUser._id]);

  const handleMsg = async (msg: string) => {
    const msgBdy = {
      senderId: currentUser._id,
      chatId: ChatRoom.chatId,
      message: msg,
    };
    socket.emit("send-messsage", {
      ...msgBdy,
      reciverId: ChatRoom.reciverId,
    });
    try {
      const data = await axios.post(AddMsgRoute, {
        senderId: currentUser._id,
        chatId: ChatRoom.chatId,
        message: msg,
      });
      setMessage(data.data.allMsg);
    } catch (err) {
      console.error(err);
    }
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
            <h4>last seen</h4>
          </div>
        </div>
        <Logout />
      </div>
      <div
        className="flex-1 bg-gray-800 p-4 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        <div className="flex flex-col gap-2">
          {message.map((msg: any, index: number) => (
            <div
              key={index}
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
