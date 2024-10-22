import React, { useState } from 'react'
import Posts from '../components/Posts';
import Navbar from '../components/Navbar';
import Logout from '../components/logout'
import Secret from "../Images/secret.png"
import {motion} from "framer-motion"

const Postpage = () => {
const [category, setCategory] = useState('');
const handleCategoryChange = (newCategory) => {
  setCategory(newCategory);
};
  return (
    <motion.div
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
    <Logout/>
    <div id="posted" >
      <div className='bck'></div>
    <h1>Gossip Center<img src={Secret} style={{height:"30px", opacity:"1"}} alt=''/></h1>
    <div className="container">
    <div className="post">
          <Navbar category={category} onCategoryChange={handleCategoryChange}/>
          </div> 
    <Posts category={category}/>
    </div>
    </div>
    </motion.div>
  )
}

export default Postpage