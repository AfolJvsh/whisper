import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const styles = {
  position: "absolute",
  bottom: "50px",
  left: "30px",
  color: "#19485f",
  border:"2px solid #19485f",
  borderRadius:"50%",
  height:"30px",
  width:"30px",
 backgroundColor:"transparent",
};

const Navbar = ({category, onCategoryChange}) => {
  const handleCategorySelection = (value) => {
    onCategoryChange(value); 
    console.log(`Category selected: ${value}`);
  }

  return (
    <>
      <div className="navbar">
        <div className='top'>
          <h2 style={{
            margin:"30px 0 0 20px",
            color:"#19485f"
          }}>Sections</h2>
          <span className='first' value="Mystery Rumors" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Mystery Rumors
          </span>
          <span value="Workplace Whispers" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Workplace Whispers
          </span>
          <span value="Relationship Rumors" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Relationship Rumors
          </span>
          <span value="Neighborhood News" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Neighborhood News
          </span>
          <span value="School Secrets" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            School Secrets
          </span>
          <span value="Family Feuds" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Family Feuds
          </span>
          <span value="Social Media Buzz" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Social Media Buzz
          </span>
          <span value="Party Confessions" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Party Confessions
          </span>
          <span value="Friendship Fallout" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Friendship Fallout
          </span>
          <span value="Celebrity Scoop" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            Celebrity Scoop
          </span>
          <span value="" onClick={(e) => handleCategorySelection(e.target.getAttribute('value'))}>
            General
          </span>
        </div>
      </div>
            <div className='base'>
              <Link to={"post"}>
                <FontAwesomeIcon
                  size="2x"
                  icon={faAdd}
                  style={styles}
                  title='Add New Post'
                  /> 
              </Link>
            </div>
    </>
  );
}

export default Navbar;
