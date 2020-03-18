import React, { useState, useRef, Fragment } from "react";
import "./AutoSuggestSearch.css";
const AutoSuggestSearch = ({
  isLoading,
  options,
  onSearch,
  placeholder,
  labelKey,
  onSelect,
  renderMenuItem
}: any) => {
  const [search, updateSearch] = useState("");
  const [show, setShow] = useState(false);
  const dropDownMenu = useRef<any>();
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.length > 2) {
      setShow(true);
      onSearch(inputValue);
    } else {
      setShow(false);
    }
    updateSearch(inputValue);
  };
  const handleDown = (e: any) => {
    if (show) {
      const findFocusElement = dropDownMenu.current.querySelector(":focus");
      const isUp = e.keyCode === 40;
      const isDown = e.keyCode === 38;
      const isEsc = e.keyCode === 27;
      const isEnter = e.keyCode === 13;
      if (isUp || isDown) {
        if (findFocusElement) {
          const isInput = findFocusElement.tagName === "INPUT";
          if (isInput) {
            let query = "a.dropdown-item";
            if (isUp) {
              query = query + ":first-child";
            } else {
              query = query + ":last-child";
            }
            dropDownMenu.current.querySelector(query).focus();
          } else {
            if (isUp) {
              findFocusElement.nextSibling
                ? findFocusElement.nextSibling.focus()
                : dropDownMenu.current.querySelector("input").focus();
            } else {
              findFocusElement.previousSibling
                ? findFocusElement.previousSibling.focus()
                : dropDownMenu.current.querySelector("input").focus();
            }
          }
        }
      }
      if (isEsc) {
        setShow(false);
      }
      if (isEnter) {
        findFocusElement.click();
        setShow(false);
      }
    }
    return;
  };
  return (
    <div className="form-group" onKeyDown={handleDown} ref={dropDownMenu}>
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {show && (
        <div className="dropdown">
          <div className="dropdown-menu d-block mt-0">
            <RenderItems
              {...{
                options,
                labelKey,
                search,
                renderMenuItem,
                onSelect,
                isLoading
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const RenderItems = ({
  options,
  labelKey,
  search,
  renderMenuItem,
  isLoading,
  onSelect
}: any) => {
  const list = options.filter((l: any) => l[labelKey].includes(search));
  return (
    <Fragment>
      {isLoading ? (
        <div className="p-2">Searching...</div>
      ) : list.length ? (
        list.map((x: any) => (
          <a
            key={x.imdbID.toString()}
            className="dropdown-item"
            href="#"
            onClick={e => {
              e.preventDefault();
              onSelect([x]);
            }}
          >
            {renderMenuItem(x)}
          </a>
        ))
      ) : (
        <div className="p-2">No Results found.</div>
      )}
    </Fragment>
  );
};

export default AutoSuggestSearch;
