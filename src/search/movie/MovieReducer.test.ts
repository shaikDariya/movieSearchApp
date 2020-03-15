import React, { useReducer } from "react";
import MovieReducer, { movieState } from "./MovieReducer";
import { mockMovie } from "../../mock/Movie";
import { dispatchFetchMovie, dispatchSetLoading } from "./MovieAction";
import { renderHook, act } from "@testing-library/react-hooks";

describe("MovieReducer", () => {
  it("Should return default state movieState without any dispacth", () => {
    expect(MovieReducer(movieState, {})).toEqual(movieState);
  });
  it("DispatchFetchMovie should reurn new state with options=mockMovie.Search", () => {
    expect(
      MovieReducer(movieState, dispatchFetchMovie(mockMovie.Search))
    ).toEqual({
      ...movieState,
      options: mockMovie.Search
    });
  });
  it("DispatchFetchMovie should reurn new state with isLoading=true", () => {
    expect(MovieReducer(movieState, dispatchSetLoading(true))).toEqual({
      ...movieState,
      isLoading: true
    });
  });
  it("MovieReducer Should Work in RenderHook Context", async () => {
    const { result } = renderHook(() => useReducer(MovieReducer, movieState));
    const [state, dispatch] = result.current;
    act(() => {
      dispatch(dispatchFetchMovie(mockMovie.Search));
    });
    const [newStateWithMovieResult] = result.current;
    expect(newStateWithMovieResult).toEqual({
      ...state,
      options: mockMovie.Search
    });
    act(() => {
      dispatch(dispatchSetLoading(true));
    });
    const [newStateWithLoading] = result.current;
    expect(newStateWithLoading).toEqual({
      ...newStateWithMovieResult,
      isLoading: true
    });
  });
});
