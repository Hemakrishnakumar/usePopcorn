import React from "react";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const KEY = "89c43784";

function MovieDetails({
  selectedMovieId,
  setSelectedMovieId,
  addWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched
    .map((item) => item.imdbID)
    .includes(selectedMovieId);

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
        setIsLoading(false);
      } catch (err) {
        console.log("Failed to Fetch", err.message);
        setIsLoading(false);
      }
    }
  }, [selectedMovieId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return function () {
      document.title = "usePopcorn";
    };
  }, [movie]);

  const cleanUp = (e) => {
    if (e.code == "Escape") setSelectedMovieId("");
  };

  useEffect(() => {
    document.addEventListener("keydown", cleanUp);

    return function () {
      document.removeEventListener("keydown", cleanUp);
    };
  }, [setSelectedMovieId]);

  const addMovieHandler = () => {
    const newMovie = {
      runTime: Number(movie.Runtime.split(" ").at(0)) || 90,
      imdbRating: +movie.imdbRating,
      userRating: +userRating,
      poster: movie.Poster,
      title: movie.Title,
      imdbID: movie.imdbID,
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
              {isWatched ? (
                <p>
                  You rated this movie with{" "}
                  {
                    watched.find((item) => item.imdbID === selectedMovieId)
                      .userRating
                  }
                </p>
              ) : (
                <>
                  <StarRating
                    key={movie.imdbID}
                    maxRating={10}
                    curRating={movie.imdbRating}
                    size={22}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addMovieHandler}>
                      + Add to List
                    </button>
                  )}
                </>
              )}
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
