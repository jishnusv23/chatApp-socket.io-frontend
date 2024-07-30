import axios from "axios";
import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useSelector } from "react-redux";
import { LogoutRoute } from "../utils/Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/features/userSlice";

const Logout = () => {
  const currentUser=useSelector((state:any)=>state.user.userData)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    console.log("1------------------1")
    await axios.get(LogoutRoute).then(()=>{
      navigate('/login')
      dispatch(setUserData(null))
    })
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-xl" onClick={handleLogout}>
        <BiPowerOff size={25} />
      </button>
    </div>
  );
};

export default Logout;
