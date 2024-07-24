import React, { useEffect, useState } from "react";
import robot from "../assets/robot.gif";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [userName, setUserName] = useState("");
  const data = useSelector((state: any) => state.user.userData);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchName = async (): Promise<void> => {
      try {
        if (!data) {
          console.log("err");
          navigate('/login')
        } else {
          setUserName(data.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchName();
  }, []);
  return (
    <div className="flex justify-center items-center text-white flex-col">
      <img src={robot} alt="" className="max-w-min" />
      <h1>Welcome:{userName}</h1>
      <h3>Please select a chat to Strat messaging</h3>
    </div>
  );
};

export default Welcome;
