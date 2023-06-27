import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import SendMail from "./components/SendMail";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <SendMail />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="register" element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
