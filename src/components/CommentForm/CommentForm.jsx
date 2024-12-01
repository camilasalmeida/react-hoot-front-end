// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';
import { useParams, useNavigate } from 'react-router-dom';                     // Hooks can only be used inside the body of a functional component.

const CommentForm = (props) => {
const { hootId, commentId } = useParams();
const navigate = useNavigate();
const [formData, setFormData] = useState({ text: '' });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const hootData = await hootService.show(hootId);
        // Find the specific comment by ID
        const commentToEdit = hootData.comments.find((comment) => comment._id === commentId);
        if (commentToEdit) setFormData(commentToEdit);
      } catch (error) {
        console.log("Error fetching hoot data:", error);
      }
    };
    if (hootId && commentId) fetchComment();                     // Only fetch if both hootId and commentId are true.
  }, [hootId, commentId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
if (hootId && commentId) {
    hootService.updateComment(hootId, commentId, formData);
    navigate(`/hoots/${hootId}`);
} else {
    props.handleAddComment(formData);
  }
    setFormData({ text: '' });
  };

//-----------------------------------------------------------\\
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;


