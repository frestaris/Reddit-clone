import React from "react";
import { useDispatch } from "react-redux";
import { selectPost } from "../redux/postsSlice";

function Post({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="post" onClick={() => dispatch(selectPost(post))}>
      <h3>{post.title}</h3>
      <img
        className="post-thumbnail"
        src={
          post.thumbnail && post.thumbnail.startsWith("http")
            ? post.thumbnail
            : "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"
        }
        alt="thumbnail"
      />
      <p>
        👍 {post.ups} | 💬 {post.num_comments}
      </p>
    </div>
  );
}

export default Post;
