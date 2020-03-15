import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { render, cleanup, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";

import SearchApp from "./Search";
import { mockMovieDetail } from "../mock/Movie";
import { apiBaseUrl } from "../common/apiUtils";

const history = createMemoryHistory();
const renderSearchApp = () => {
  return render(
    <Router history={history}>
      <SearchApp />
    </Router>
  );
};

describe("Search App", () => {
  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });
  it("Search App render", () => {
    const { asFragment } = renderSearchApp();
    expect(asFragment()).toMatchSnapshot();
  });
  it("Default should render MovieSearch", () => {
    history.push("/");
    const { container } = renderSearchApp();
    const getInputElement = container.querySelector('input[type="text"]');
    expect(getInputElement).toBeInTheDocument();
  });
  it("/movie/:id should render MovieDetails", async () => {
    fetchMock.getOnce(
      `${apiBaseUrl}&i=${mockMovieDetail.imdbID}`,
      mockMovieDetail
    );
    history.push(`/movie/${mockMovieDetail.imdbID}`);
    const { container, asFragment } = renderSearchApp();
    await waitForDomChange();
    const findTitleElement = container.querySelector("h1");
    expect(findTitleElement?.innerHTML).toEqual(`${mockMovieDetail.Title}`);
  });
});
