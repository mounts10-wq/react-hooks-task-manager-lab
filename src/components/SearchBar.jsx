import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const inputRef = useRef(null);
  const queryRef = useRef("");
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    queryRef.current = e.target.value;
    setQuery(queryRef.current);
  }

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
