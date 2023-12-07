import React from "react";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const KEY = "89c43784";

function MovieDetails({
  selectedMovieId,
  setSelectedMovieId,
  addWatchedMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetchTheMovie();
    async function fetchTheMovie() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
        );
        if (!res.ok)
          throw new Error("something went wrong while fetching the movie");
        const data = await res.json();
        if (data.Response === "False") return;

        setMovie(data);
        setUserRating(data.imdbRating);
        setIsLoading(false);
      } catch (err) {
        console.log("Failed to Fetch", err.message);
        setIsLoading(false);
      }
    }
  }, [selectedMovieId]);

  const addMovieHandler = () => {
    const newMovie = {
      runTime: Number(movie.Runtime.split(" ").at(0)) || 90,
      imdbRating: +movie.imdbRating,
      userRating: +userRating,
      poster: movie.Poster,
      title: movie.Title,
    };
    addWatchedMovie(newMovie);
  };

  return (
    <div className="details">
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedMovieId("")}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                key={movie.imdbID}
                maxRating={10}
                curRating={movie.imdbRating}
                size={22}
                onSetRating={setUserRating}
              />
              <button className="btn-add" onClick={addMovieHandler}>
                + Add to List
              </button>
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>
              <b>Starring : </b> {movie.Actors}
            </p>
            <p>Directed By {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
