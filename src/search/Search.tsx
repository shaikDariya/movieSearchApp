import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import MovieSearch from "./movie/MovieSearch";
import MovieDetails from "./movie/MovieDetails";
const SearchApp = () => (
  <Fragment>
    <Switch>
      <Route path="/" exact>
        <MovieSearch />
      </Route>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
    </Switch>
  </Fragment>
);

export default SearchApp;
