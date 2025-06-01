import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { fetchPosts } from "../redux/postsSlice";

function PostList() {
  const { items, status, searchTerm, category } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(category));
  }, [category, dispatch]);

  const filtered = items.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load posts.</p>;

  return (
    <div className="post-list">
      {filtered.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
