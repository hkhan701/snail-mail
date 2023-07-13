import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import SendLetter from "./pages/SendLetter";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


function App() {

  const { currentUser } = useContext(AuthContext);

  // If the user is not logged in, redirect to the login page
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />

        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="friends" element={<ProtectedRoute> <Friends /> </ProtectedRoute>} />
        <Route path="send-letter" element={<ProtectedRoute> <SendLetter /> </ProtectedRoute>} />

        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
