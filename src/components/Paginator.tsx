
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

    const [paginationPageSize, setPaginationPageSize] = useState(10)

    return (
        <div className='d-flex w-100  align-items-start justify-content-center'>


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
            {/* <div className='d-flex'>
                <label className='ml-4 mr-1 mt-2'>
                    Items:
                </label>
                <Dropdown
                    selection
                    // defaultValue={10}
                    options={[
                        { value: 10, label: '10' },
                        { value: 20, label: '20' },
                        { value: 30, label: '30' },
                    ]}
                    value={paginationPageSize}
                    //@ts-ignore
                    onChange={(e,data) => { setPaginationPageSize(data.value)}}
                />
            </div> */}

        </div>
    )
}

export default Paginator