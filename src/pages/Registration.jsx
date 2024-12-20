import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Signin from '../components/signin';
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Registration = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });
      navigate('/');
    } catch (err) {
      setErr(true);
      console.error("Error during user creation:", err);
    }
  };

  return (
    <motion.fieldset 
    initial={{ opacity: 0 }}
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
    
<Signin/>
      <div className="right-r">
        <div className="righta">
          <form onSubmit={handleSubmit}>
            <h2 style={{marginBottom:0, marginTop:0}}>Create Your Whisper Account</h2>
            <div className="lite" style={{display:'grid', gridTemplateColumns:"auto auto auto auto", marginLeft:"40px"}}>
            <a href="twitter.com" target="_blank" style={{textDecoration:"none", color:'black'}}><FontAwesomeIcon size='2x' icon={faTwitter}/></a>
           <a href="facebook.com" target="_blank" style={{textDecoration:"none", color:'black'}}><FontAwesomeIcon size='2x' icon={faFacebook}/></a>
           <a href="github.com" target="_blank" style={{textDecoration:"none", color:'black'}}><FontAwesomeIcon size='2x' icon={faGithub}/></a>
           <a href="linkedin.com" target="_blank" style={{textDecoration:"none", color:'black'}}><FontAwesomeIcon size='2x' icon={faLinkedin}/></a>
          </div>
            <span>or use your email for registration</span>
            <input id="name" name='name' type="text" required placeholder='Name' />
            <input id="remail" type="email" required placeholder='Email' />
            <input id="rpassword" type="password" required placeholder='Password' />
            <button id="new-user" className="btn-block btn-primary" type="submit">SIGN UP</button>
            {err && <span className="error-message">Something went wrong. Please try again.</span>}
          </form>
        </div>
      </div>
    </motion.fieldset>
  );
};

export default Registration;
