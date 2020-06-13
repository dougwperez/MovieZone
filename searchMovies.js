import React, { useState } from "react";
import MovieCard from "./movieCard";

export default function SearchMovies() {
  //states = input query, movies
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=a2657ca16cc801deb9a65e9f7f9e3d4f&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      //console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>

        <input
          type="text"
          className="input"
          name="query"
          placeholder="i.e. Star Wars"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="button" type="Submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
