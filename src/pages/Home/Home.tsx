import React, { useEffect, useState, useContext } from "react"
import { Button, Input } from 'semantic-ui-react'
import API from "../../services/API"
import { FeedContext } from "../../contexts/FeedContext"
import { useHistory, useLocation } from "react-router-dom"
import { Gnome } from "../../models/Gnome"
import { filterByName, getProfessions } from "../../utils"
import GnomeCard from "../../components/GnomeCard"


export const Home = () => {


    const [searchText, setSearchText] = useState('')
    const [professionsList, setProfessionsList] = useState([] as String[])
    // const [feedItems, setFeedItems] = useState([] as any[])
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useContext(FeedContext)
    const queryString = require('query-string');

    let history = useHistory();
    let location = useLocation();
    let parsed = '';

    useEffect(() => {
        console.log(location);
        parsed = queryString.parse(window.location.search);
        console.log(parsed)
    }, [location])


    useEffect(() => {
        // const parsed = queryString.parse(window.location.search);


        const doGetFeed = async () => {
            await API.getInitialFeed()
                .then((response: any) => {
                    console.log(response.data.Brastlewark)
                    setFeed(response.data.Brastlewark)
                    setProfessionsList(getProfessions(feed))
                })
                .catch((error) => {
                    alert('error')
                })
        }

        !feed && doGetFeed()
    }, [])


    const doSearch = async () => {
        // setLoading(true)
        history.push(`/?gnome=${searchText}`)
        setFeed(filterByName(feed, searchText))
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
            <div className='d-flex flex-column' style={{ borderBottom: '2px solid grey', paddingBottom: '10px' }}>
                <div className='d-flex flex-row '>
                    <div className='d-flex'>
                        <Input focus
                            placeholder='Nombre...'
                            // style={{ width: '600px' }}
                            value={searchText}
                            onChange={(e, d) => { setSearchText(d.value) }}
                        />
                        <Button
                            type='submit'
                            className='ml-3'
                            onClick={() => doSearch()}
                            loading={loading}
                        // disabled={searchText === ''}
                        >
                            Buscar
                    </Button>
                    </div>
                </div>
            </div>
            <div className ='d-flex flex-wrap justify-content-between'>
                {feed && feed.length > 0 && feed.map((gnome: any) => {
                    return (
                        <GnomeCard
                            key={gnome.id}
                            gnome={gnome}
                        />
                    )
                })}
                {/* {feed && feed.length > 0 && feed.map((gnome: Gnome) => {
                    return (
                        <div>
                            {gnome.name}
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default Home