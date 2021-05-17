import PropTypes from "prop-types";
import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    setComments(() => [...comments, { displayName, comment }]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="border-t border-gray-primary ">
      <form
        className="flex justify-between pl-0 pr-2"
        method="POST"
        onSubmit={(event) =>
          comment.length > 0
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          type="text"
          className="text-sm w-full mr-3 py-5 px-4 text-gray-base"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          type="button"
          className={`text-sm font-bold text-blue-medium px-5 ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          POST
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};