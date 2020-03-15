import React, { useState, useEffect, Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { fetchJson } from "../../common/apiUtils";
import { nAImageLink } from "./MovieSearch";
import { MovieDetailType } from "./MovieType";

const awardsBlock = (state: MovieDetailType) => ({
  title: "Awards Information",
  detail: [{ display: "Awards: ", value: state.Awards }]
});

const boxOfficeBlock = (state: MovieDetailType) => ({
  title: "Box office Information",
  detail: [
    { display: "Director: ", value: state.Director },
    { display: "Writers: ", value: state.Writer },
    { display: "Stars: ", value: state.Actors },
    { display: "Genres: ", value: state.Genre },
    { display: "Type: ", value: state.Type },
    { display: "Country: ", value: state.Country },
    { display: "BoxOffice: ", value: state.BoxOffice || "N/A" },
    { display: "Language: ", value: state.Language },
    { display: "Released Date: ", value: state.Released },
    { display: "Runtime: ", value: state.Runtime }
  ]
});

const metaScoreBlock = (state: MovieDetailType) => ({
  title: "Meta Score Information",
  detail: [{ display: "Metascore: ", value: state.Metascore }]
});

const ratingBlock = (state: MovieDetailType) => ({
  title: "Internet Movie Data Base Rating",
  detail: [
    { display: "ImdbRating: ", value: state.imdbRating },
    ...state.Ratings.map(r => ({
      display: `${r.Source}: `,
      value: r.Value
    }))
  ]
});

const votingBlock = (state: MovieDetailType) => ({
  title: "Internet Movie Data Base Votes",
  detail: [{ display: "ImdbVotes: ", value: state.imdbVotes }]
});

const MovieDetails = () => {
  const [state, setState] = useState<MovieDetailType>();
  const {
    params: { id: movieId }
  } = useRouteMatch();
  useEffect(() => {
    const detailsEndPoint = `i=${movieId}`;
    async function fetchMovieDetails() {
      const movieDetails = await fetchJson(detailsEndPoint);
      setState(movieDetails);
    }
    fetchMovieDetails();
  }, []);
  return (
    <div className="container mt-4 mb-4">
      {state && state.imdbID === movieId ? (
        <Fragment>
          <div className="d-inline-flex ml-2 mr-2">
            <img
              alt={state.Title}
              src={state.Poster === "N/A" ? nAImageLink : state.Poster}
              style={{ width: "200px" }}
            />
            <div className="flex-row pl-2">
              <h1>{state.Title}</h1>
              <p className="font-weight-light m-0">{state.Genre}</p>
              <div className="mt-2">
                <p>{state.Plot}</p>
              </div>
            </div>
          </div>
          <RenderDetail {...awardsBlock(state)} />
          <RenderDetail {...boxOfficeBlock(state)} />
          <RenderDetail {...metaScoreBlock(state)} />
          <RenderDetail {...ratingBlock(state)} />
          <RenderDetail {...votingBlock(state)} />
        </Fragment>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

const RenderDetail = ({ title, detail }: any) => (
  <div className="card p-2 m-2">
    <h4 className="text-center">{title}</h4>
    {detail.map(({ display, value }: any, i: number) => (
      <p key={i.toString()} className="font-weight-bold">
        {display} <span className="font-weight-normal">{value}</span>
      </p>
    ))}
  </div>
);

export default MovieDetails;
