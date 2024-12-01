// src/components/HootDetails/HootDetails.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./HootDetails.module.css";

const HootDetails = (props) => {
  const { hootId } = useParams(); // Make sure to destructure the hootId when calling upon useParams().
  console.log("hootId is:", hootId);
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log("single hootData is:", hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
  console.log("hoot state:", hoot);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    //console.log('commentFormData', commentFormData);
  };

  const handleDeleteComment = async (commentId) => {
    console.log("commentId is:", commentId);
    await hootService.deleteComment(hootId, commentId);
    setHoot({
      ...hoot,
      comments: hoot.comments.filter((comment) => comment._id !== commentId),
    });
  };

  //------------------------------------\\

  if (!hoot) return <main>Loading...</main>;
  return (
    <main className={styles.container}>
      <header>
        <p>{hoot?.category?.toUpperCase() || "No Category"}</p>
        <h1>{hoot.title}</h1>

        <div>
          <p>
            {hoot.author.username} posted on
            {new Date(hoot.createdAt).toLocaleDateString()}
          </p>
          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button
                onClick={() => {
                  props.handleDeleteHoot(hootId);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </header>

      <p>{hoot.text}</p>

      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments?.length && <p>There are no comments.</p>}
        {hoot.comments?.map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                <p>
                  {comment.author.username} posted on
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
                      Edit
                    </Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
