import React, { FunctionComponent, useEffect, useState } from "react"
import InputRange from "react-input-range"
import { Button, Dropdown, Input } from "semantic-ui-react"
import { Gnome } from "../models/Gnome"
import { filterByAge, filterByHairColor, filterByHeight, filterByName, filterByProfession, filterByWeight, getPossibleValues, transformArrayIntoSelectOptions } from "../utils"

interface Props {
    allGnomes: Array<Gnome>
    setFilterredGnomes: any
    loading: boolean
};



var math = require('lodash/math');





const SearchModal: FunctionComponent<Props> = (props: Props) => {

    const [selectedProfession, setSelectedProfession] = useState('')
    const [selectedHairColor, setSelectedHairColor] = useState('')

    const [minAge, setMinAge] = useState(0 as Number)
    const [maxAge, setMaxAge] = useState(0 as Number)
    const [selectedAgeRange, setSelectedAgeRange] = useState({} as any)

    const [minHeight, setMinHeight] = useState(0 as Number)
    const [maxHeight, setMaxHeight] = useState(0 as Number)
    const [selectedHeightRange, setSelectedHeightRange] = useState({} as any)

    const [minWeight, setMinWeight] = useState(0 as Number)
    const [maxWeight, setMaxWeight] = useState(0 as Number)
    const [selectedWeightRange, setSelectedWeightRange] = useState({} as any)

    const [searchText, setSearchText] = useState('')

    const [professionsList, setProfessionsList] = useState([] as String[])

    const [hairColorsList, setHairColorsList] = useState([] as String[])

    const getProfessionsAndRangesPossibleValues = (gnomesList: Array<Gnome>) => {
        let possibleValues = getPossibleValues(gnomesList)

        setProfessionsList(possibleValues.professions)
        setHairColorsList(possibleValues.hairColors)

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


    const reset = () => {
        setSelectedWeightRange({ min: minWeight, max: maxWeight })
        setSelectedHeightRange({ min: minHeight, max: maxHeight })
        setSelectedAgeRange({ min: minAge, max: maxAge })
        setSelectedHairColor('')
        setSelectedProfession('')
        setSearchText('')
    }



    const doSearch = () => {
        let gnomesToFilter = props.allGnomes
        gnomesToFilter = filterByName(gnomesToFilter, searchText)
        gnomesToFilter = filterByProfession(gnomesToFilter, selectedProfession)
        gnomesToFilter = filterByAge(gnomesToFilter, selectedAgeRange)
        gnomesToFilter = filterByHeight(gnomesToFilter, selectedHeightRange)
        gnomesToFilter = filterByWeight(gnomesToFilter, selectedWeightRange)
        gnomesToFilter = filterByHairColor(gnomesToFilter, selectedHairColor)
        props.setFilterredGnomes(gnomesToFilter)
    }

    useEffect(() => {
        getProfessionsAndRangesPossibleValues(props.allGnomes)
    }, [])

    return (
        <div className='d-flex flex-column p-4'>
            <div className='d-flex flex-row  flex-wrap justify-content-center align-items-end'>
                {/* <div className='d-flex flex-column'> */}
                <div className='m-4'>

                    <Input focus
                        placeholder='Name'
                        className='gnomle-search-input'
                        value={searchText}
                        onChange={(e, d) => { setSearchText(d.value) }}
                    />

                </div>
                <div className='m-4'>
                    <Dropdown
                        className='gnomle-profession-selector'
                        placeholder='Profession'
                        search
                        selection
                        value={selectedProfession}
                        //@ts-ignore
                        options={transformArrayIntoSelectOptions(professionsList)}
                        onChange={(e, d) => setSelectedProfession(String(d.value))}
                        clearable={true}
                    />
                </div>
                <div className='m-4'>
                    <Dropdown
                        className='gnomle-hair-color-selector'
                        placeholder='Hair Color'
                        search
                        selection
                        value={selectedHairColor}
                        //@ts-ignore
                        options={transformArrayIntoSelectOptions(hairColorsList)}
                        onChange={(e, d) => setSelectedHairColor(String(d.value))}
                        clearable={true}
                    />
                </div>
                <div className='d-flex justify-content-between'>
                    {minAge && maxAge && selectedAgeRange.min &&
                        <div className='m-4 gnomle-age-selector'>
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
                        <div className='m-4 gnomle-height-selector'>
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
                        <div className='m-4 gnomle-weight-selector'>
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
                </div>
                <div>

                    <Button
                        type='submit'
                        className='m-4 gnomle-search-button'
                        onClick={() => doSearch()}
                        loading={props.loading}
                    >
                        Buscar
                    </Button>
                    <u className = 'gnomle-reset-button' onClick={() => reset()}>
                        Reset
                    </u>
                </div>
                {/* </div> */}
            </div>
        </div>

    )
}

export default SearchModal
