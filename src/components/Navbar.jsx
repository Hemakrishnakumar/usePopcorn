import React, { useEffect, useRef } from "react";

const Navbar = ({ query, setQuery, movies }) => {
  const inputEL = useRef(null);

  useEffect(() => {
    inputEL.current.focus();
  }, []);

  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEL}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
    </div>
  );
};

export default Navbar;
