import React, { useContext, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Scroll from "../components/Scroll";
import Gossip from "../Images/gossip.png";
import { AuthContext } from '../Context/Authcontext';

const Form = () => {
  const [reportedBy, setReportedBy] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const {currentUser} = useContext(AuthContext);
 const userId = currentUser.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      console.error('No file selected');
      return;
    }

    setSubmitting(true);

    try {
      const storageRef = ref(storage, `images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        () => {}, // Optional progress handling
        (error) => {
          console.error('Error during file upload:', error);
          setSubmitting(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const postRef = doc(collection(db, 'post'));
            const postId = postRef.id;

            // Data for the post document
            const newFormData = {
              uid: postId,
              reportedBy,
              category,
              description,
              imgUrl: downloadURL,
              createdAt: Date.now(),
              userId,
            };

            // Create the post document
            await setDoc(postRef, newFormData);

            // Create the like counter with an initial value of 0
            const likeRef = doc(db, 'likes', postId);
            const likeData = {
              count: 0,
              postId: postId,
            };
            await setDoc(likeRef, likeData);

            console.log('Post and like counter submitted successfully!');
            setSubmittedData(newFormData);
            setReportedBy('');
            setDescription('');
            setCategory('');
            setImg(null);
          } catch (error) {
            console.error('Error submitting post:', error);
          } finally {
            setSubmitting(false);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting post:', error);
      setSubmitting(false);
    }
  };

  return (
    <div id="posting" className="container-fluid">
      <div>
        <h1 style={{ marginBottom: "5px" }}>
          Post your Whispers<img src={Gossip} style={{ height: "30px" }} alt='' />
        </h1>
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

            <label htmlFor="category">Pick Your Gossip:</label>
            <select
              id="category"
              name="category"
              required
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Type</option>
              <option value="Mystery Rumors">Mystery Rumors</option>
              <option value="Celebrity Scoop">Celebrity Scoop</option>
              <option value="Workplace Whispers">Workplace Whispers</option>
              <option value="Relationship Rumors">Relationship Rumors</option>
              <option value="Neighborhood News">Neighborhood News</option>
              <option value="Family Feuds">Family Feuds</option>
              <option value="School Secrets">School Secrets</option>
              <option value="Social Media Buzz">Social Media Buzz</option>
              <option value="Party Confessions">Party Confessions</option>
              <option value="Friendship Fallout">Friendship Fallout</option>
            </select>

            <label htmlFor="description">The Story:</label>
            <textarea
              id="description"
              name="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            <label htmlFor="imgUrl">Post a Picture or Video:</label>
            <input
              type="file"
              id="imgUrl"
              name="imgUrl"
              required
              onChange={(e) => setImg(e.target.files[0])}
            />

            <button type="submit" id="submitBtn" disabled={submitting}>
              {submitting ? "Submitting..." : "Create Post"}
            </button>
          </div>
          <Scroll formData={submittedData} />
        </form>
      </div>
    </div>
  );
};

export default Form;
