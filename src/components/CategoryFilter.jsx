import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/postsSlice";

const categories = ["funny", "news", "gaming", "pics", "AskReddit"];

function CategoryFilter() {
  const dispatch = useDispatch();

  return (
    <select
      onChange={(e) => dispatch(setCategory(e.target.value))}
      className="category-filter"
    >
      <option value="">All</option>
      {categories.map((cat) => (
        <option key={cat} value={`r/${cat}`}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
