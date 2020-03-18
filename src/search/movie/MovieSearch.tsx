import React, { useReducer } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import MovieReducer, { movieState } from "./MovieReducer";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./MovieSearch.css";
import { dispatchSetLoading, dispatchFetchMovie } from "./MovieAction";
import { useHistory } from "react-router-dom";
import { MovieSuggestionType } from "./MovieType";
import { fetchJson } from "../../common/apiUtils";
import AutoSuggestSearch from "./AutoSuggestSearch";

export const nAImageLink =
  "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/32x44/film-3119741174._CB468665901_.png";

const MovieSearch = () => {
  const [state, dispatch] = useReducer(MovieReducer, movieState);
  const history = useHistory();

  const handleSearch = async (query: string) => {
    dispatch(dispatchSetLoading(true));
    const { Search } = await fetchJson(`s=${query}`);
    dispatch(dispatchFetchMovie(Search));
    dispatch(dispatchSetLoading(false));
  };
  const handleSelect = (selected: any) => {
    console.log(selected);
    const { imdbID } = selected.pop();
    history.push(`/movie/${imdbID}`);
  };
  return (
    <div className="d-flex justify-content-center mt-2">
      <div className="col-8 col-sm-6 col-md-4">
        <h1> React Bootstrap Typeahead</h1>
        <AsyncTypeahead
          id="movie-search"
          {...state}
          minLength={3}
          clearButton
          labelKey="Title"
          onSearch={handleSearch}
          onChange={handleSelect}
          placeholder="Search for a Movie ..."
          renderMenuItemChildren={option => <MovieTitle {...option} />}
        />

        <h1> Custom AutoSuggest</h1>

        <AutoSuggestSearch
          {...state}
          onSearch={handleSearch}
          placeholder="Search for a Movie ..."
          labelKey="Title"
          renderMenuItem={(option: any) => <MovieTitle {...option} />}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

const MovieTitle = ({ Title, imdbID, Poster }: MovieSuggestionType) => {
  return (
    <div className="d-flex align-items-center">
      <img
        alt="ass"
        src={Poster === "N/A" ? nAImageLink : Poster}
        className="img-icon"
      />
      <span className="d-inline-block text-truncate col-10 p-0">{Title}</span>
    </div>
  );
};

export default MovieSearch;
