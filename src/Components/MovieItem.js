import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function MovieItem({ id, year, title, summary, poster, genres }) {
  return (
    <div className="movie">
      <Link
        to={{
          pathname: "movie-detail",
          state: {
            year,
            title,
            summary,
            poster,
            genres
          }
        }}
      >
        <img src={poster} alt={title} title={title}></img>
        <div className="movie_data">
          <h2 className="movie_title">{title}</h2>
          <p className="movie_year">{year}</p>
          <ul className="movie_genre">
            {genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <p className="movie_summary">{summary.slice(0, 200)}...</p>
        </div>
      </Link>
    </div>
  );
}

MovieItem.propTypes = {
  year: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
  poster: propTypes.string.isRequired,
  genres: propTypes.array.isRequired
};

export default MovieItem;
