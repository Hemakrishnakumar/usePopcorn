import React, { useState } from "react";

const RenderMoviesList = ({ movies, setSelectedMovieId, selectedMovieId }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (movies.length === 0) return <p className="error">No Movies Found</p>;

  const handleClick = (id) => {
    if (id === selectedMovieId) setSelectedMovieId("");
    else setSelectedMovieId(id);
  };

  return (
    <>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <li key={movie.imdbID} onClick={() => handleClick(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RenderMoviesList;
