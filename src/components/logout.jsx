import React, { useState } from 'react';
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedOut(true);  // Trigger navigation after successful logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoggedOut) {
    return <Navigate to='/login' />; // Navigate to login page after logout
  }

  return (
    <div>
      <button onClick={handleLogout} id="logoutBtn">Logout</button> 
    </div>
  );
};

export default Logout;
