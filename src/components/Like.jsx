import React, { useContext, useEffect, useState, useCallback } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Context/Authcontext';

const Like = ({ postId }) => {
    const [like, setLike] = useState(false);
    const [counter, setCounter] = useState(0);
    const { currentUser } = useContext(AuthContext);

    const postRef = doc(db, 'post', postId);

    // Memoize fetchLikes with useCallback to prevent it from re-creating on every render
    const fetchLikes = useCallback(async () => {
        try {
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const data = postSnap.data();
                setCounter(data.count || 0); 
                setLike(data.likes?.includes(currentUser?.email) || false);
            } else {
                console.log('No matching post document found');
            }
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    }, [postRef, currentUser]);

    // Toggle like and update Firestore
    const toggleLike = async () => {
        if (!currentUser) {
            console.error("User is not logged in");
            return;
        }

        try {
            if (like) {
                // Unlike
                await updateDoc(postRef, {
                    likes: arrayRemove(currentUser.email),
                    count: increment(-1)
                });
                setCounter((prevCounter) => prevCounter - 1);
                setLike(false);
            } else {
                // Like
                await updateDoc(postRef, {
                    likes: arrayUnion(currentUser.email),
                    count: increment(1)
                });
                setCounter((prevCounter) => prevCounter + 1);
                setLike(true);
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    // Fetch initial likes and counter on component mount
    useEffect(() => {
        fetchLikes();
    }, [fetchLikes]); 

    return (
        <>
        <div className="assist"
        style={{position:"relative"}}
        >
            <FontAwesomeIcon
                title={like ? "Unlike" : "Like"}
                icon={faHeart}
                onClick={toggleLike}
                style={{ color: like ? 'red' : 'white', marginLeft:"5px",  textShadow: like ? '': '1px 1px 0 #333, -1px -1px 0 #333, -1px 1px 0 #333, 1px -1px 0 #333',
                }}
                />
            <span style={{marginLeft:"5px"}}>{counter}</span>
                </div>
        </>
    );
};

export default Like;
