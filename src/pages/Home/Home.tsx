import React, { useEffect, useState, useContext } from "react"
import { Button, Input, Pagination, Loader, Dropdown } from 'semantic-ui-react'
import API from "../../services/API"
import { filterByAge, filterByHeight, filterByName, filterByProfession, filterByWeight, getPossibleValues, transformArrayIntoSelectOptions } from "../../utils"
import GnomeCard from "../../components/GnomeCard"
import Paginator from "../../components/Paginator"
import InputRange from 'react-input-range';
import { Gnome } from "../../models/Gnome"
import SearchModal from "../../components/SearchModal"

var math = require('lodash/math');

export const Home = () => {


    const [loading, setLoading] = useState(false)


    const [allGnomes, setAllGnomes] = useState([])
    const [displayedGnomes, setDisplayedGnomes] = useState([])
    const [filterredGnomes, setFilterredGnomes] = useState([])

    // const [showSearchModal, setShowSearchModal] = useState(false)


    useEffect(() => {
        const doGetFeed = async () => {
            setLoading(true)
            await API.getInitialFeed()
                .then((response: any) => {
                    let gnomesList = response.data.Brastlewark
                    console.log(gnomesList)
                    setAllGnomes(gnomesList)
                    setFilterredGnomes(gnomesList)
                })
                .catch((error) => {
                    alert('error')
                    console.log(error)
                })
                .finally(() => { setLoading(false) })
        }

        doGetFeed()
    }, [])


    return (
        <div className='m-4'>
            <>

                {loading &&
                    <Loader active size='massive' inline='centered' style={{ marginTop: '50px' }} />
                }
                {!loading &&
                    <>
                        <div className='d-flex justify-content-center align-items-center px-5 mx-5'>
                            <img
                                src={'/Gnomle.png'}
                                style={{ height: '100px' }}
                            />
                        </div>
                        <SearchModal
                            allGnomes={allGnomes}
                            setFilterredGnomes={setFilterredGnomes}
                            loading={loading}
                        />
                        <div className='d-flex flex-wrap justify-content-center'>
                            {filterredGnomes && filterredGnomes.length === 0 &&
                                <div>
                                    No results
                                </div>
                            }
                            {filterredGnomes && filterredGnomes.length > 0 && displayedGnomes && displayedGnomes.length > 0 && displayedGnomes.map((gnome: any) => {
                                return (
                                    <GnomeCard
                                        key={gnome.id}
                                        gnome={gnome}
                                        setGnomeFriendsView={(gnome) => console.log(gnome)}
                                    />
                                )
                            })}
                            {filterredGnomes && filterredGnomes.length > 0 &&
                                <Paginator
                                    filterredRecords={filterredGnomes}
                                    setDisplayedRecords={setDisplayedGnomes}
                                />
                            }
                            {/* {console.log('all', allGnomes)}
                        {console.log('filterred', filterredGnomes)}
                        {console.log('displayed', displayedGnomes)} */}

                        </div>
                    </>
                }
            </>
        </div>
    )
}

export default Home