import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import Signup from '../components/signup';
import {motion} from "framer-motion"



const Login = () => {
  const [err, setErr] = useState(null); // Set error message instead of a boolean
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');  
    } catch (err) {
      setErr("Invalid email or password. Please try again."); // Improved error message
    }
  };

  return (
    <motion.fieldset 
    initial={{ opacity: 0}}
    animate={{
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }}
    exit={{
        opacity: 0.2,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }}
    
    >
      <div className="left">
        <div className="left-a">
          <h2>SIGN IN</h2>
          <div className="lite"></div>
          <form onSubmit={handleSubmit}>
          <span>or use your email and password</span>
            <input id="email" name="email" type="email" placeholder="Email" required />
            <input id="password" name="password" type="password" placeholder="Password" required />
            <Link to="/forgot-password"><span>Forgot Your Password?</span></Link>
            <button type="submit">Sign In</button>
          </form>
          {err && <span className="error-message">{err}</span>}
        </div>
      </div>
      <Signup/>
         </motion.fieldset>
  );
};

export default Login;