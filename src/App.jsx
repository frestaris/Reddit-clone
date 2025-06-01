import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, clearError } from "./redux/postsSlice";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import PostModal from "./components/PostModal";

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="header">
        <h1>Reddit Client</h1>
        <SearchBar />
        <CategoryFilter />
      </header>
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => dispatch(clearError())}>Dismiss</button>
        </div>
      )}
      <main>
        <PostList />
      </main>
      <PostModal />
    </div>
  );
}

export default App;
