import React, { useEffect, useState, useContext } from "react"
import { Button, Input, Pagination, Loader, Dropdown } from 'semantic-ui-react'
import API from "../../services/API"
import { filterByAge, filterByHeight, filterByName, filterByProfession, filterByWeight, getProfessions, transformProfessionsIntoSelectOptions } from "../../utils"
import GnomeCard from "../../components/GnomeCard"
import Paginator from "../../components/Paginator"
import InputRange from 'react-input-range';

export const Home = () => {


    const [searchText, setSearchText] = useState('')
    const [professionsList, setProfessionsList] = useState([] as String[])
    // const [feedItems, setFeedItems] = useState([] as any[])
    const [loading, setLoading] = useState(false)
    const [allGnomes, setAllGnomes] = useState([])
    const [displayedGnomes, setDisplayedGnomes] = useState([])
    const [filterredGnomes, setFilterredGnomes] = useState([])
    const [selectedProfession, setSelectedProfession] = useState('')
    const [selectedAgeRange, setSelectedAgeRange] = useState({ min: 0, max: 100 } as any)
    const [selectedHeightRange, setSelectedHeightRange] = useState({ min: 0, max: 100 } as any)
    const [selectedWeightRange, setSelectedWeightRange] = useState({ min: 0, max: 100 } as any)


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
        let gnomesToFilter = allGnomes
        gnomesToFilter = filterByName(gnomesToFilter, searchText)
        console.log('after name', gnomesToFilter)
        gnomesToFilter = filterByProfession(gnomesToFilter, selectedProfession)
        console.log('after profession', gnomesToFilter)
        gnomesToFilter = filterByAge(gnomesToFilter, selectedAgeRange)
        gnomesToFilter = filterByHeight(gnomesToFilter, selectedHeightRange)
        gnomesToFilter = filterByWeight(gnomesToFilter, selectedWeightRange)
        setFilterredGnomes(gnomesToFilter)
    }

    return (
        <div className='m-3'>

            <>
                <div className='d-flex flex-column' style={{ borderBottom: '2px solid grey', paddingBottom: '10px' }}>
                    <div className='d-flex flex-row '>
                        <div className='d-flex flex-column'>
                            <Input focus
                                placeholder='Nombre...'
                                value={searchText}
                                onChange={(e, d) => { setSearchText(d.value) }}
                            />
                            <Dropdown
                                search
                                selection
                                //@ts-ignore
                                options={transformProfessionsIntoSelectOptions(professionsList)}
                                onChange={(e, d) => setSelectedProfession(String(d.value))}
                                clearable={true}
                            />

                            <div  className = 'my-4 mx-2'>
                                <label className ='mb-3'>
                                    Age
                                </label>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    step={1}
                                    value={selectedAgeRange}
                                    //@ts-ignore
                                    onChange={(value) => {
                                        console.log(value)
                                        setSelectedAgeRange(value)
                                    }}
                                />
                            </div>
                            <div  className = 'my-4 mx-2'>
                                <label className ='mb-3'>
                                    Height
                                </label>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    step={1}
                                    value={selectedHeightRange}
                                    //@ts-ignore
                                    onChange={(value) => {
                                        console.log(value)
                                        setSelectedHeightRange(value)
                                    }}
                                />
                            </div>
                            <div  className = 'my-4 mx-2'>
                                <label className ='mb-3'>
                                    Weight
                                </label>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    step={1}
                                    value={selectedWeightRange}
                                    //@ts-ignore
                                    onChange={(value) => {
                                        console.log(value)
                                        setSelectedWeightRange(value)
                                    }}
                                />
                            </div>
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
                }
            </>
        </div>
    )
}

export default Home