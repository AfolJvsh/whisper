import React from 'react'
import { Link } from 'react-router-dom'
import Asperger from "../Images/asperger.png"
import {motion} from "framer-motion"
 
const signup = () => {
  return (
    < motion.div className="right" 
    initial={{ width: 0, opacity: 0 }}
animate={{ 
    width: "100%", 
    opacity: 1, 
    transition: { 
        duration: 0.8, 
        ease: "easeOut"
    }
}}
exit={{ 
    x: -window.innerWidth, 
    opacity: 0, 
    transition: { 
        duration: 0.5, 
        ease: "easeIn" 
    }
}}

    >
        <div className="right-a">
          <img src={Asperger} alt='' style={{height:"175px", fontWeight:"bold"}}/>
          <h2>Hello, Friend</h2>
          <span>Register with your personal details to use all of the site's features</span>
          <Link to="/registration">
            <button>Sign Up</button>
          </Link>
        </div>
      </motion.div>

  )
}

export default signup