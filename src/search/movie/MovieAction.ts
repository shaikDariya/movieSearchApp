import { MovieSuggestionType } from "./MovieType";
import { FETCH_MOVIE, SUGESSTIONS_LOADING } from "./MovieConstants";

// Movie Action Types
type FetchMovieActionType = {
  type: typeof FETCH_MOVIE;
  payload: Array<MovieSuggestionType>;
};
type SetMovieLoading = {
  type: typeof SUGESSTIONS_LOADING;
  payload: boolean;
};

export type MovieActionType = FetchMovieActionType | SetMovieLoading;

// Action Dispatchers
export const dispatchFetchMovie = (
  movies: Array<MovieSuggestionType>
): FetchMovieActionType => ({
  type: FETCH_MOVIE,
  payload: movies
});
export const dispatchSetLoading = (loading: boolean): SetMovieLoading => ({
  type: SUGESSTIONS_LOADING,
  payload: loading
});
