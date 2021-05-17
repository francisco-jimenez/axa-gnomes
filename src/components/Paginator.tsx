
import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import Pagination from "react-js-pagination";
import { Gnome } from '../models/Gnome';

interface Props {
    // activePage: number,
    // paginationPageSize: any,
    // setPaginationPageSize: any,
    // totalRecords: number,
    // setActivePage: any
    filterredRecords: Array<Gnome>
    setDisplayedRecords: any
};


const Paginator: FunctionComponent<Props> = (props: Props) => {

    const paginationPageSize = 21
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        setActivePage(1)
        props.setDisplayedRecords(props.filterredRecords.slice(0,paginationPageSize))
    }, [props.filterredRecords])

    useEffect(() => {
        let elementsToSkip = (activePage -1) * paginationPageSize
        let lastElementToShow = elementsToSkip + paginationPageSize
        props.setDisplayedRecords(props.filterredRecords.slice(elementsToSkip,lastElementToShow))
    }, [activePage])

    return (
        <div className='d-flex w-100  align-items-start justify-content-center'>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={paginationPageSize}
                totalItemsCount={props.filterredRecords.length}
                pageRangeDisplayed={5}
                onChange={
                    (activePage: any) => {
                        setActivePage(activePage)
                    }
                }
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    )
}

export default Paginator