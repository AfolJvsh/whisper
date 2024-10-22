import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { Link } from 'react-router-dom';
import Gossip from '../Images/gossip.png';

const styles={color:"#d9e0a4"};
const Scroll = ({formData}) => {
 
  return (
    <>
    <div className="scroll">
      <div className="scroller">
      {formData ? (
        <div className='form-details'>
          <h2>Your Post</h2>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Your Name:</strong> {formData.reportedBy}</p>
          <p><strong>Your Story:</strong>{formData.description}</p>
          {formData.imgUrl && (
            <div>
              <img src={formData.imgUrl} alt="Incident" />
            </div>
          )}
        </div>
      ) : (
        <span>
        <p>You've got any whispers?</p>
        <img src={Gossip} alt=''/>
        <p>Share those juiciest gossip annonymously and let the drama unfold</p>
        </span>
      
      )}
    </div>
       <Link to={"/"} style={{position:"absolute", right:0, bottom:0}}>
                <FontAwesomeIcon
                  size="2x"
                  style={styles}
                  icon={faArrowRight}
                  title='Shared Whispers'
                  />
              </Link>
                  </div>
                  </>
  )
}

export default Scroll