import React from "react";

function MovieDetail(props) {
  const { location, history } = props;
  if (location.state === undefined) {
    history.push("/movie");
    return null;
  } else {
    return <div>{location.state.title}</div>;
  }
}

export default MovieDetail;
