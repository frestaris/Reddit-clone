import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPost } from "../redux/postsSlice";

function PostModal() {
  const post = useSelector((state) => state.posts.selectedPost);
  const dispatch = useDispatch();

  if (!post) return null;

  return (
    <div className="modal" onClick={() => dispatch(selectPost(null))}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{post.title}</h2>
        <p>{post.selftext}</p>
        {post.thumbnail && post.thumbnail.startsWith("http") && (
          <img src={post.thumbnail} alt="thumbnail" />
        )}
        <a
          href={`https://reddit.com${post.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View full post
        </a>
      </div>
    </div>
  );
}

export default PostModal;
