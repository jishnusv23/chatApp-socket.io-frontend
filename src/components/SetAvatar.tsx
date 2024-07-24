import React, { useEffect, useState } from "react";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { updateAvatar } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice";

// Define the Container component
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center flex-col bg-black">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
      {children}
    </div>
  </div>
);

// Define the SetAvatar component
const SetAvatar: React.FC = () => {
  const data = useSelector((state: any) => state.user.userData);
  const [avatar, setAvatar] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const api = "api/45678945"; // Adjusted for proxy setup
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data: string[] = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 100)}`,
            { responseType: "arraybuffer" }
          );
          const buffer = Buffer.from(image.data, "binary");
          data.push(buffer.toString("base64"));
        } catch (err: any) {
          if (err.response && err.response.status === 429) {
            console.error("Rate limit exceeded, retrying...");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
            i--; // Retry the current iteration
          } else {
            console.error("Error fetching image:", err);
          }
        }
      }
      localStorage.setItem("avatarImages", JSON.stringify(data));
      setAvatar(data);
    };

    const savedImages = localStorage.getItem("avatarImages");
    if (savedImages) {
      setAvatar(JSON.parse(savedImages));
    } else {
      fetchData();
    }
  }, []);

  const handleAvatarSelection = async () => {
    try {
      if (selectedAvatar === null) {
        console.log("No avatar selected");
      } else {
        // const userDetails = JSON.parse(datas as string);
        const datas = await axios.post(`${updateAvatar}/${data.email}`, {
          image: avatar[selectedAvatar],
        });
      
        if (datas?.data.success) {
          console.log("first");
          // localStorage.setItem("current-user", JSON.stringify(datas.data));
          dispatch(setUserData(datas.data));
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
  };

  return (
    <Container>
      <div>
        <h2 className="text-2xl font-bold mb-4">Pick Your Avatar</h2>
      </div>
      <div>
        {avatar.length === 0 ? (
          <div className="flex justify-center items-center min-w-[150px] min-h-[150px]">
            <img src={loader} alt="Loading..." className="w-16 h-16" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {avatar.map((img, index) => (
              <img
                key={index}
                src={`data:image/svg+xml;base64,${img}`}
                alt={`avatar-${index}`}
                className={`w-full h-auto object-cover rounded-lg cursor-pointer ${
                  selectedAvatar === index ? "border-4 border-blue-500" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleAvatarSelection}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Select One
      </button>
    </Container>
  );
};

export default SetAvatar;
