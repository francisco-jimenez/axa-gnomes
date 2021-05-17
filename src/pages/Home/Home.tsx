import React, { useEffect, useState, useContext } from "react"
import { Button, Input, Pagination, Loader, Dropdown } from 'semantic-ui-react'
import API from "../../services/API"
import { filterByAge, filterByHeight, filterByName, filterByProfession, filterByWeight, getPossibleValues, transformProfessionsIntoSelectOptions } from "../../utils"
import GnomeCard from "../../components/GnomeCard"
import Paginator from "../../components/Paginator"
import InputRange from 'react-input-range';
import { Gnome } from "../../models/Gnome"

var math = require('lodash/math');

export const Home = () => {


    const [loading, setLoading] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [professionsList, setProfessionsList] = useState([] as String[])

    const [allGnomes, setAllGnomes] = useState([])
    const [displayedGnomes, setDisplayedGnomes] = useState([])
    const [filterredGnomes, setFilterredGnomes] = useState([])

    const [selectedProfession, setSelectedProfession] = useState('')

    const [minAge, setMinAge] = useState(0 as Number)
    const [maxAge, setMaxAge] = useState(0 as Number)
    const [selectedAgeRange, setSelectedAgeRange] = useState({ } as any)

    const [minHeight, setMinHeight] = useState(0 as Number)
    const [maxHeight, setMaxHeight] = useState(0 as Number)
    const [selectedHeightRange, setSelectedHeightRange] = useState({  } as any)

    const [minWeight, setMinWeight] = useState(0 as Number)
    const [maxWeight, setMaxWeight] = useState(0 as Number)
    const [selectedWeightRange, setSelectedWeightRange] = useState({  } as any)


    const getProfessionsAndRangesPossibleValues = (gnomesList: Array<Gnome>) => {
        let possibleValues = getPossibleValues(gnomesList)
        setProfessionsList(possibleValues.professions)

        setMinAge(possibleValues.minAge)
        setMaxAge(possibleValues.maxAge)
        setSelectedAgeRange({ min: possibleValues.minAge, max: possibleValues.maxAge })

        setMinHeight(possibleValues.minHeight)
        setMaxHeight(possibleValues.maxHeight)
        setSelectedHeightRange({ min: possibleValues.minHeight, max: possibleValues.maxHeight })

        setMinWeight(possibleValues.minWeight)
        setMaxWeight(possibleValues.maxWeight)
        setSelectedWeightRange({ min: possibleValues.minWeight, max: possibleValues.maxWeight })
    }


    useEffect(() => {
        const doGetFeed = async () => {
            setLoading(true)
            await API.getInitialFeed()
                .then((response: any) => {
                    let gnomesList = response.data.Brastlewark
                    console.log(gnomesList)
                    setAllGnomes(gnomesList)
                    setFilterredGnomes(gnomesList)
                    getProfessionsAndRangesPossibleValues(gnomesList)
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
        gnomesToFilter = filterByProfession(gnomesToFilter, selectedProfession)
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
                                placeholder='Name'
                                value={searchText}
                                onChange={(e, d) => { setSearchText(d.value) }}
                            />
                            <Dropdown
                                placeholder ='Profession'
                                search
                                selection
                                //@ts-ignore
                                options={transformProfessionsIntoSelectOptions(professionsList)}
                                onChange={(e, d) => setSelectedProfession(String(d.value))}
                                clearable={true}
                            />
                            {minAge && maxAge && selectedAgeRange.min &&
                                <div className='my-4 mx-2'>
                                    <label className='mb-3'>
                                        Age {'(' + selectedAgeRange.min + ' - ' + selectedAgeRange.max + ')'}
                                    </label>
                                    <InputRange
                                        maxValue={maxAge.valueOf()}
                                        minValue={minAge.valueOf()}
                                        step={1}
                                        value={selectedAgeRange}
                                        //@ts-ignore
                                        onChange={(value) => {
                                            console.log(value)
                                            setSelectedAgeRange(value)
                                        }}
                                    />
                                </div>
                            }
                            {minHeight && maxHeight > 0 &&
                                <div className='my-4 mx-2'>
                                    <label className='mb-3'>
                                        Height {'(' + math.round(selectedHeightRange.min, 1) + ' - ' + math.round(selectedHeightRange.max, 1) + ')'}
                                    </label>
                                    <InputRange
                                        maxValue={maxHeight.valueOf()}
                                        minValue={minHeight.valueOf()}
                                        step={0.1}
                                        value={selectedHeightRange}
                                        //@ts-ignore
                                        onChange={(value) => {
                                            console.log(value)
                                            setSelectedHeightRange(value)
                                        }}

                                    />
                                </div>
                            }
                            {minWeight && maxWeight > 0 &&
                                <div className='my-4 mx-2'>
                                    <label className='mb-3'>
                                        Weight {'(' + math.round(selectedWeightRange.min, 1) + ' - ' + math.round(selectedWeightRange.max, 1) + ')'}
                                    </label>
                                    <InputRange
                                        maxValue={maxWeight.valueOf()}
                                        minValue={minWeight.valueOf()}
                                        step={0.1}
                                        value={selectedWeightRange}
                                        //@ts-ignore
                                        onChange={(value) => {
                                            console.log(value)
                                            setSelectedWeightRange(value)
                                        }}
                                    />
                                </div>
                            }
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