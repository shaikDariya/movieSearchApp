import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

type PaginationContainer = {
  count: number;
  pageCount: number;
  showPage?: number;
  handlePagination: (i: number) => void;
};

const PaginationContainer = ({
  count,
  pageCount,
  showPage = 1,
  handlePagination
}: PaginationContainer) => {
  const [pageState, setPageState] = useState(showPage);
  useEffect(() => {
    handlePagination(pageState);
  }, [count, pageCount, pageState]);
  const loop: number = Math.ceil(count / pageCount);
  const isNextDisabled = pageState === loop;
  const isPrevDisabled = pageState === showPage;
  return (
    <Pagination size="sm" className="m-0 p-0">
      <Pagination.First onClick={() => setPageState(showPage)} />
      <Pagination.Prev
        onClick={() => setPageState(s => s - 1)}
        disabled={isPrevDisabled}
      />
      {renderBtns(loop, pageState, setPageState)}
      <Pagination.Next
        onClick={() => setPageState(s => s + 1)}
        disabled={isNextDisabled}
      />
      <Pagination.Last onClick={() => setPageState(loop)} />
    </Pagination>
  );
};

const renderBtns = (loop: number, showPage: number, callback: any) => {
  const tabs = [];
  for (let i = 1; i <= loop; i++) {
    tabs.push(
      <Pagination.Item
        key={i.toString()}
        onClick={() => {
          callback(i);
        }}
        active={i === showPage}
      >
        {i}
      </Pagination.Item>
    );
  }
  return tabs;
};

export default PaginationContainer;
