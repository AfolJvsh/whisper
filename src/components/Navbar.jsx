import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';

const styles = {
  position: "absolute",
  bottom: "50px",
  left: "30px",
  color: "#19485f",
  border: "2px solid #19485f",
  borderRadius: "50%",
  height: "30px",
  width: "30px",
  backgroundColor: "transparent",
};

const Navbar = ({ category, onCategoryChange }) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.email; // Optional chaining to avoid errors if currentUser is null

  const handleCategorySelection = (value) => {
    onCategoryChange(value); 
    console.log(`Category selected: ${value}`);
  }

  return (
    <>
      <div className="navbar">
        <div className='top'>
          <h2 style={{
            margin: "30px 0 0 20px",
            color: "#19485f"
          }}>Sections</h2>

          {/* Use direct function calls with explicit category values */}
          <span className='first' onClick={() => handleCategorySelection("Mystery Rumors")}>
            Mystery Rumors
          </span>
          <span onClick={() => handleCategorySelection("Workplace Whispers")}>
            Workplace Whispers
          </span>
          <span onClick={() => handleCategorySelection("Relationship Rumors")}>
            Relationship Rumors
          </span>
          <span onClick={() => handleCategorySelection("Neighborhood News")}>
            Neighborhood News
          </span>
          <span onClick={() => handleCategorySelection("School Secrets")}>
            School Secrets
          </span>
          <span onClick={() => handleCategorySelection("Family Feuds")}>
            Family Feuds
          </span>
          <span onClick={() => handleCategorySelection("Social Media Buzz")}>
            Social Media Buzz
          </span>
          <span onClick={() => handleCategorySelection("Party Confessions")}>
            Party Confessions
          </span>
          <span onClick={() => handleCategorySelection("Friendship Fallout")}>
            Friendship Fallout
          </span>
          <span onClick={() => handleCategorySelection("Celebrity Scoop")}>
            Celebrity Scoop
          </span>
          <span onClick={() => handleCategorySelection("")}>
            General
          </span>
          {userId && (
            <span onClick={() => handleCategorySelection(userId)}>
              My Posts
            </span>
          )}
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
