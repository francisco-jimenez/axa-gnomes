
import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import Pagination from "react-js-pagination";

interface Props {
    activePage: number,
    paginationPageSize: any,
    setPaginationPageSize: any,
    totalRecords: number,
    setActivePage: any
};


const Paginator: FunctionComponent<Props> = (props: Props) => {

    const [paginationPageSize, setPaginationPageSize] = useState(props.paginationPageSize)

    return (
        <div className='d-flex w-100  align-items-end justify-content-center'>


            <Pagination
                activePage={props.activePage}
                itemsCountPerPage={props.paginationPageSize}
                totalItemsCount={props.totalRecords}
                pageRangeDisplayed={5}
                onChange={
                    (activePage: any) => {
                        props.setActivePage(activePage)
                    }

                }
                itemClass="page-item"
                linkClass="page-link"
            />
            <div className='d-flex'>
                <label className='ml-4 mr-1 mt-2'>
                    Items:
                </label>
                <select 
                    multiple ={false}
                    defaultValue ={paginationPageSize}
                    onChange={(v) => { 
                        props.setPaginationPageSize(Number(v)) 
                        props.setActivePage(1)
                    }}
                />
            </div>

        </div>
    )
}

export default Paginator