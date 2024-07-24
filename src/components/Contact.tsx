import React, { useState } from "react";
import Logo from "../assets/Logo.jpg";
import { useSelector } from "react-redux";

interface ContactProps {
  contact: any[];
  changeChat: (chat: any) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined
  );
  const currentUser = useSelector((state: any) => state.user.userData);
  
  const handleChange = (index: number, contact: any) => {
    setCurrentSelected(index)
    changeChat(contact);
  };

  return (
    <div className="bg-custom-dark-blue flex flex-col h-full px-4">
      {" "}
      <div className="flex items-center justify-center p-4">
        <img src={Logo} alt="Logo" className="h-12 w-12" />
        <h3 className="text-white ml-2">Logo</h3>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
        {contact.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center p-3 cursor-pointer rounded-md mb-2 ${
              index === currentSelected ? "bg-gray-700" : "bg-gray-800"
            } hover:bg-gray-600 transition-colors duration-200`}
            onClick={()=>handleChange(index, contact)}
          >
            <div className="avatar mr-3">
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <span className="text-white">{contact.name}</span>
          </div>
        ))}
      </div>
      {currentUser && (
        <div className="flex items-center p-4 bg-gray-800 mt-0">
          <div className="avatar mr-3">
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="Current User Avatar"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <span className="text-white">{currentUser.name}</span>
        </div>
      )}
    </div>
  );
};

export default Contact;
