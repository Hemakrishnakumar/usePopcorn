import { useState } from "react";
import Navbar from "./components/Navbar";
import RenderMoviesList from "./components/RenderMoviesList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Box from "./components/Box";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./components/useMovies";
import { useLocalStorage } from "./components/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");

  const [watched, setWatched] = useLocalStorage([], "watched");
  const { error, movies, isLoading } = useMovies(query, setSelectedMovieId);

  const addMovieHandler = (movie) => {
    setWatched((movies) => [...movies, movie]);
  };

  const deleteMovieHandler = (id) => {
    setWatched((arr) => arr.filter((item) => item.imdbID !== id));
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
              key={selectedMovieId}
              selectedMovieId={selectedMovieId}
              setSelectedMovieId={setSelectedMovieId}
              addWatchedMovie={addMovieHandler}
              watched={watched}
            />
          ) : (
            <WatchedMoviesList
              watched={watched}
              deleteMovieHandler={deleteMovieHandler}
            />
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
