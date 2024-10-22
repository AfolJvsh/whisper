import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Scroll from "../components/Scroll";
import Gossip from "../Images/gossip.png";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFile } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
  const [reportedBy, setReportedBy] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitting, setSubmitting] =useState(false);
  // const [disabled, setDisabled] 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      console.error('No file selected');
      return;
    }

    try {
      const storageRef = ref(storage, `images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error('Error during file upload:', error);
        },
        async () => {
          try {
            setSubmitting(true)
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const postRef = doc(collection(db, 'post'));
            const postId = postRef.id;

            // Form data to be stored in Firestore and shown in FormDetails
            const newFormData = {
              uid: postId,
              reportedBy,
              category,
              description,
              imgUrl: downloadURL,
              createdAt: Date.now(),
            };
            await setDoc(postRef, newFormData);
    
                console.log('Post submitted successfully!')
                setSubmittedData(newFormData);
                setReportedBy('');
                setDescription('');
                setCategory('');
                setImg(null);
          } catch (error) {
            console.error('Error submitting post:', error);
          }
          finally{
            setSubmitting(false)
          }
        }
      );
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div id="posting" className="container-fluid">
      <div>
        <h1 style={{marginBottom:"5px"}}>Post your Whispers<img src={Gossip} style={{height:"30px"}} alt=''/></h1>
        <form onSubmit={handleSubmit}>
          <div className="one">
            <label htmlFor="reportedBy">Whisperer's Name:</label>
            <input
              id="reportedBy"
              type="text"
              name="reportedBy"
              required
              placeholder="John Doe"
              onChange={(e) => setReportedBy(e.target.value)}
              value={reportedBy}
            />

            <label htmlFor="category"> Pick Your Gossip:</label>
            <select
              id="category"
              name="category"
              required
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Type</option>
              <option value="Mystery Rumors" title='Unverified But Intriguing Stories.'>Mystery Rumors</option>
              <option value="Celebrity Scoop" title='Latest Rumors About Famous People.'>Celebrity Scoop</option>
              <option value="Workplace Whispers" title='Office drama and juicy work-related stories.'>Workplace Whispers</option>
              <option value="Relationship Rumors" title='Love triangles, breakups, and hookups.'>Relationship Rumors</option>
              <option value="Neighborhood News" title='Local scandals and community secrets.'>Neighborhood News</option>
              <option value="Family Feuds" title='Family drama and disputes.'>Family Feuds</option>
              <option value="School Secrets" title='High school or college gossip.'>School Secrets</option>
              <option value="Social Media Buzz" title='Trending online gossip and viral moments.'>Social Media Buzz</option>
              <option value="Party Confessions" title='Wild stories from nights out.'>Party Confessions</option>
              <option value="Friendship Fallout" title='Betrayals and secrets among friends.'>Friendship Fallout</option>
            </select>
            <label htmlFor="description">The Story</label>
            <textarea
              id="description"
              name="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            <label htmlFor="imgUrl">Post a Picture or Video</label>
            <input
              type="file"
              id="imgUrl"
              name="imgUrl"
              required
              onChange={(e) => setImg(e.target.files[0])}
            />
            <button type="submit" id="submitBtn" onClick={()=>setSubmitting(!submitting)}>{submitting?"Submitting":"Create Post"}</button>
          </div>
          <Scroll formData={submittedData} />
        </form>
      </div>
    </div>
  );
};

export default Form;
