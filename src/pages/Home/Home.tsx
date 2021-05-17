import React, { useEffect, useState, useContext } from "react"
import { Button, Input, Pagination, Loader } from 'semantic-ui-react'
import API from "../../services/API"
import { AllGnomes } from "../../contexts/AllGnomesContext"
import { useHistory, useLocation } from "react-router-dom"
import { Gnome } from "../../models/Gnome"
import { filterByName, getProfessions } from "../../utils"
import GnomeCard from "../../components/GnomeCard"
import Paginator from "../../components/Paginator"
import { DisplayedGnomes } from "../../contexts/DisplayedGnomesContext"


export const Home = () => {


    const [searchText, setSearchText] = useState('')
    const [professionsList, setProfessionsList] = useState([] as String[])
    // const [feedItems, setFeedItems] = useState([] as any[])
    const [loading, setLoading] = useState(false)
    const [allGnomes, setAllGnomes] = useState([])
    const [displayedGnomes, setDisplayedGnomes] = useState([])
    const [filterredGnomes, setFilterredGnomes] = useState([])


    useEffect(() => {
        const doGetFeed = async () => {
            setLoading(true)
            await API.getInitialFeed()
                .then((response: any) => {
                    let gnomesList = response.data.Brastlewark
                    console.log(gnomesList)
                    setAllGnomes(gnomesList)
                    setFilterredGnomes(gnomesList)
                    setProfessionsList(getProfessions(gnomesList))
                })
                .catch((error) => {
                    alert('error')
                    console.log(error)
                })
                .finally(() => { setLoading(false) })
        }

        doGetFeed()
    }, [])

    const doSearch = async () => {
        // setLoading(true)
        // history.push(`/?gnome=${searchText}`)
        setFilterredGnomes(filterByName(allGnomes, searchText))
        // await API.search(searchText, sessionStorage.getItem('user') + '', prepareFiltersToSend())
        //     .then((response: any) => {
        //         setFeedItems(response.data)
        //         setFeed(response.data)
        //     })
        //     .catch((error) => {
        //         alert('error')
        //     }).finally(() => setLoading(false))
    }

    return (
        <div className='m-3'>

            <>
                <div className='d-flex flex-column' style={{ borderBottom: '2px solid grey', paddingBottom: '10px' }}>
                    <div className='d-flex flex-row '>
                        <div className='d-flex'>
                            <Input focus
                                placeholder='Nombre...'
                                value={searchText}
                                onChange={(e, d) => { setSearchText(d.value) }}
                            />
                            <Button
                                type='submit'
                                className='ml-3'
                                onClick={() => doSearch()}
                                loading={loading}
                            >
                                Buscar
                    </Button>
                        </div>
                    </div>
                </div>
                {loading &&
                    <Loader active size='massive' inline='centered' style={{ marginTop: '50px' }} />
                }
                {!loading &&
                    <div className='d-flex flex-wrap justify-content-between'>
                        {displayedGnomes && displayedGnomes.length > 0 && displayedGnomes.map((gnome: any) => {
                            return (
                                <GnomeCard
                                    key={gnome.id}
                                    gnome={gnome}
                                />
                            )
                        })}
                        {filterredGnomes && filterredGnomes.length > 0 &&
                            <Paginator
                                filterredRecords={filterredGnomes}
                                setDisplayedRecords={setDisplayedGnomes}
                            />
                        }
                        {console.log('all',allGnomes)}
                        {console.log('filterred',filterredGnomes)}
                        {console.log('displayed',displayedGnomes)}

                    </div>
                }
            </>
        </div>
    )
}

export default Home