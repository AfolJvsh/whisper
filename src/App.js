import Login from './pages/Login';
import Registration from './pages/Registration';
import Homepage from './pages/Homepage';
import "./style.scss";
import { useContext } from 'react';
import { AuthContext } from './Context/Authcontext';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Postpage from './pages/Postpage';
import {AnimatePresence} from "framer-motion";


function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const location = useLocation();
 
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="post" element = {<ProtectedRoute><Homepage /></ProtectedRoute>} />
      <Route path="/" element = {<ProtectedRoute><Postpage/></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
    </AnimatePresence>
  );
}

export default App;
