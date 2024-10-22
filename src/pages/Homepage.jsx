import React from 'react';

import Form  from '../components/form';
import {motion} from "framer-motion"

const Homepage = () => {
 
  return( 
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
     <Form/>
  </motion.div>
  )
}

export default Homepage;
