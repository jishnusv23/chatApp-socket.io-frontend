import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

// Define the type for the emoji object
interface EmojiObject {
  emoji: string;
  name?: string;
}
interface ChatinputProps{
    handleMsg:(chat:string)=>void
}

const Chatinput:React.FC<ChatinputProps> = ({handleMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (EmojiClickData: EmojiObject) => {

    setMsg((prevMsg) => prevMsg + EmojiClickData.emoji);
  };

  const sendChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (msg.trim()) {
      console.log("Message sent:", msg);
      handleMsg(msg)
      setMsg(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg w-full">
      <div className="relative">
        <div
          className="emoji p-2 text-2xl cursor-pointer text-gray-400 hover:text-gray-200"
          onClick={toggleEmojiPicker}
        >
          <BsEmojiSmileFill />
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0">
            <Picker
              onEmojiClick={(EmojiClickData, event) =>
                handleEmojiClick(EmojiClickData)
              }
            />
          </div>
        )}
      </div>
      <form className="flex flex-1 items-center ml-4" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 ml-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          <IoMdSend className="text-2xl text-white" />
        </button>
      </form>
    </div>
  );
};

export default Chatinput;
