import React from "react";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  return (
    <div>
      <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-xl">
        <BiPowerOff size={25} />
      </button>
    </div>
  );
};

export default Logout;
