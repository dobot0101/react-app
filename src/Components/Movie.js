import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import "./Movie.css";

function Movie() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const {
        data: {
          data: { movies }
        }
      } = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
      );

      setMovies(movies);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <section className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="movies">
          {movies.map(movie => {
            return (
              <MovieItem
                key={movie.id}
                title={movie.title}
                year={movie.year}
                poster={movie.medium_cover_image}
                summary={movie.summary}
                genres={movie.genres}
              ></MovieItem>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Movie;
