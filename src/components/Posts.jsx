import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Secret from "../Images/secret.png";
import Like from './Like';
import { AuthContext } from '../Context/Authcontext';

const Posts = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.email;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let q;

        if (category === userId) {
          // If "userPosts" category is selected, fetch only the current user's posts
          q = query(collection(db, 'post'), where("userId", "==", userId));
        } else if (category) {
          // If a specific category is selected, fetch posts for that category
          q = query(collection(db, 'post'), where('category', '==', category));
        } else {
          // Default: Fetch all posts
          q = query(collection(db, 'post'), where('uid', '!=', ''));
        }

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Sort posts by creation date
          fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
          
          setPosts(fetchedPosts);
        } else {
          console.log("No matching documents found!");
          setPosts([]); // Clear posts if no documents match
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchPosts();
  }, [category, userId]);

  const handleDelete = async (postId) => {
    try {
      const docRef = doc(db, 'post', postId);
      await deleteDoc(docRef);
      console.log(`Document with ID ${postId} deleted successfully`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className='post-container'>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className='post-item'>
            <div className="opp">
              <span style={{backgroundColor:"#19485f", overflow:"hidden", padding:"10px", borderRadius:"0px 60px 50px 0px", color:"#e7eeb1"}}>{post.category}</span>
              <div className="lob">
                <img src={post.imgUrl} alt=""/>
                <button onClick={() => handleDelete(post.id)}>
                  <FontAwesomeIcon size='2x' icon={faTrash} title='Delete'/>
                </button>
              </div>
            </div>
            <div className="lone">
              <span style={{margin:"10px", gap:"5px"}}>
                {post.reportedBy}
                <img src={Secret} alt='' style={{height:"20px", fontWeight:"bold"}}/> 
                {post.description} 
                <Like postId={post.id}/>
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="span">
          <span>Loading posts...</span>
        </div>
      )}
    </div>
  );
};

export default Posts;
