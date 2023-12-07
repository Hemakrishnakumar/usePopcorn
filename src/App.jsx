import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RenderMoviesList from "./components/RenderMoviesList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Box from "./components/Box";
import MovieDetails from "./components/MovieDetails";
const KEY = "89c43784";

export default function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    setSelectedMovieId("");
    async function fetchMovies() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("something went wrong while fetching the movies");
        const data = await res.json();
        if (data.Response === "False") setMovies([]);
        else setMovies(data.Search);
      } catch {
        setError("Failed to Fetch");
      }
      setIsLoading(false);
    }
  }, [query]);

  const addMovieHandler = (movie) => {
    setWatched((movies) => [...movies, movie]);
  };

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <main className="main">
        <Box>
          {!isLoading && !error && (
            <RenderMoviesList
              movies={movies}
              selectedMovieId={selectedMovieId}
              setSelectedMovieId={setSelectedMovieId}
            />
          )}
          {!isLoading && <ErrorMessage message={error} />}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              setSelectedMovieId={setSelectedMovieId}
              addWatchedMovie={addMovieHandler}
            />
          ) : (
            <WatchedMoviesList watched={watched} />
          )}
        </Box>
      </main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>{message}</span>
    </p>
  );
}
