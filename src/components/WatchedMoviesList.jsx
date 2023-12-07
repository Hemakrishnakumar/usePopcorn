import React, { useState } from "react";
import WatchedMoviesSummary from "./WatchedMoviesSummary";

const WatchedMoviesList = ({ watched }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedMoviesSummary watched={watched} />
          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.poster} alt={`${movie.title} poster`} />
                <h3>{movie.title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runTime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default WatchedMoviesList;
