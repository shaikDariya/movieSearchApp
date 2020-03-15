import { MovieActionType } from "./MovieAction";
import { MovieSuggestionType } from "./MovieType";
import { FETCH_MOVIE, SUGESSTIONS_LOADING } from "./MovieConstants";

type MovieStateType = {
  isLoading: boolean;
  options: MovieSuggestionType[];
};

export const movieState = {
  isLoading: false,
  options: []
};

const MovieReducer = (
  state: MovieStateType,
  action: MovieActionType
): MovieStateType => {
  switch (action.type) {
    case FETCH_MOVIE: {
      return { ...state, options: action.payload };
    }
    case SUGESSTIONS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default MovieReducer;
