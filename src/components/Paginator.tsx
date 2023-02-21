import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";
import { Gnome } from "../models/Gnome";

interface Props {
  filterredRecords: Array<Gnome>;
  setDisplayedRecords: any;
}

const Paginator: FunctionComponent<Props> = (props: Props) => {
  const paginationPageSize = 20;
  const [activePage, setActivePage] = useState(1);
  const { setDisplayedRecords, filterredRecords } = props;

  useEffect(() => {
    setActivePage(1);
    setDisplayedRecords(filterredRecords.slice(0, paginationPageSize));
  }, [filterredRecords, setDisplayedRecords]);

  useEffect(() => {
    let elementsToSkip = (activePage - 1) * paginationPageSize;
    let lastElementToShow = elementsToSkip + paginationPageSize;
    setDisplayedRecords(
      filterredRecords.slice(elementsToSkip, lastElementToShow)
    );
  }, [activePage, setDisplayedRecords, filterredRecords]);

  return (
    <div className="d-flex w-100  my-5 align-items-start justify-content-center">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={paginationPageSize}
        totalItemsCount={props.filterredRecords.length}
        pageRangeDisplayed={5}
        onChange={(activePage: any) => {
          setActivePage(activePage);
        }}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Paginator;
