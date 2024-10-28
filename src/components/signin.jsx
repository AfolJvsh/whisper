import React from 'react'
import { Link } from 'react-router-dom'
import Partnership from "../Images/client.png"
import {motion} from "framer-motion"
const signin = () => {
  return (
    <motion.div className="left-r"
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
    x: window.innerWidth, 
    opacity: 0, 
    transition: { 
        duration: 0.5, 
        ease: "easeIn" 
    }
}}

    >
    <div className="lefta">
       <img src={Partnership} alt='' style={{height:"175px", fontWeight:"bold"}}/>
      <h2>Welcome Back!</h2>
      <span>Enter your personal details to use all of the site's features</span>
  <Link to="/login" className='button'>Sign In</Link>
    </div>
  </motion.div>
  )
}

export default signin