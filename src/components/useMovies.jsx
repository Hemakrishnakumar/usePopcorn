import { useEffect, useState } from "react";
const KEY = "89c43784";

export function useMovies(query, setSelectedMovieId) {
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    const controller = new AbortController();
    fetchMovies();
    setSelectedMovieId?.("");

    async function fetchMovies() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("something went wrong while fetching the movies");
        const data = await res.json();
        if (data.Response === "False") setMovies([]);
        else setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError("");
        setError("Failed to Fetch");
      }
      setIsLoading(false);
    }
    return function () {
      controller.abort();
    };
  }, [query, setSelectedMovieId]);

  return { error, movies, isLoading };
}
