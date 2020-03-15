import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import {
  render,
  cleanup,
  waitForDomChange,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";

import MovieSearch from "./MovieSearch";
import { mockMovie } from "../../mock/Movie";
import { apiBaseUrl } from "../../common/apiUtils";
import { act } from "react-dom/test-utils";

jest.mock("popper.js", () => {
  const PopperJS = jest.requireActual("popper.js");

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {}
      };
    }
  };
});

const history = createMemoryHistory();
const renderMovieSearch = () => {
  return render(
    <Router history={history}>
      <MovieSearch />
    </Router>
  );
};

describe("MovieSearch", () => {
  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });
  it("MovieSearch renderer", () => {
    const { asFragment } = renderMovieSearch();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Input with Search for a Movie ...", () => {
    const { getByPlaceholderText } = renderMovieSearch();
    const inputElment = getByPlaceholderText(/Search for a Movie .../);
    expect(inputElment).toBeInTheDocument();
  });
  describe("Search", () => {
    it("with below 3 keywords should not show suggestion", () => {
      const { container, getByPlaceholderText } = renderMovieSearch();
      const inputElment = getByPlaceholderText(/Search for a Movie .../);
      fireEvent.change(inputElment, { target: { value: "ab" } });
      expect(container.querySelector(".dropdown-menu")).not.toBeInTheDocument();
    });
    it("with 3 keywords should show suggestion", async () => {
      const { container, getByPlaceholderText } = renderMovieSearch();
      const inputElment = getByPlaceholderText(/Search for a Movie .../);
      act(() => {
        fireEvent.change(inputElment, { target: { value: "abc" } });
      });
      await waitForDomChange();
      expect(container.querySelector(".dropdown-menu")).toBeInTheDocument();
    });
    it("Mock movie reults should shown in suggestion dropdown", async () => {
      const query = "test";
      fetchMock.getOnce(`${apiBaseUrl}&s=${query}`, mockMovie);
      const { container, getByPlaceholderText } = renderMovieSearch();
      const inputElment = getByPlaceholderText(/Search for a Movie .../);
      act(() => {
        fireEvent.change(inputElment, { target: { value: query } });
      });
      await waitForDomChange();
      const findDropDownItems = container.querySelectorAll(
        ".dropdown-menu .dropdown-item"
      );
      expect(findDropDownItems.length).toEqual(mockMovie.Search.length);
    });
    it("Suggestion DropDown onSelect Should Navigate to Details Page", async () => {
      const query = "test";
      fetchMock.getOnce(`${apiBaseUrl}&s=${query}`, mockMovie);
      const { container, getByPlaceholderText } = renderMovieSearch();
      const inputElment = getByPlaceholderText(/Search for a Movie .../);
      act(() => {
        fireEvent.change(inputElment, { target: { value: query } });
      });
      await waitForDomChange();
      const findDropDownItems = container.querySelectorAll(
        ".dropdown-menu .dropdown-item"
      );
      act(() => {
        fireEvent.click(findDropDownItems[0]);
      });
      expect(history.location.pathname).toEqual(
        `/movie/${mockMovie.Search[0].imdbID}`
      );
    });
  });
});
