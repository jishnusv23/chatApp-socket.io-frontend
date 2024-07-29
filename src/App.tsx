import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";

import Chat from "./pages/Chat";
import Loginhere from "./pages/Loginhere";
import SetAvatar from "./components/SetAvatar";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

function App() {
  const [userExists, setUserexits] = useState(false);
  const userData = useSelector((state: any) => state.user.userData);
  useEffect(() => {
    if (userData) {
      setUserexits(true);
    }
  }, [userData]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginhere />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={userExists ? <Chat /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/setAvatar"
            element={userExists ? <SetAvatar /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
