import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

import Chat from "./pages/Chat";
import Loginhere from "./pages/Loginhere";
import SetAvatar from "./components/SetAvatar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginhere />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Chat />} />
          <Route path="/setAvatar" element={<SetAvatar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
