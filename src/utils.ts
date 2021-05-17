import { cloneElement } from "react";
import { Gnome } from "./models/Gnome"

var collection = require('lodash/collection');
var array = require('lodash/array');

export const filterByName  =(gnomes: Array<Gnome>, searchString: string) => {
    if(searchString){
        let matches = collection.filter(gnomes, function(gnome: Gnome) { return gnome.name.toLowerCase().indexOf(searchString.toLowerCase())!== -1})
        return collection.sortBy(matches, [function(gnome:Gnome) { return gnome.name.toLowerCase().indexOf(searchString.toLowerCase())}])
    } else {
        return gnomes
    }
}

export const filterByProfession  =(gnomes: Array<Gnome>, profession: string) => {
    if(profession){
        return collection.filter(gnomes, function(gnome: Gnome) { return gnome.professions.map(prof => prof.trim()).includes(profession)})
    } else {
        return gnomes
    }
}
export const filterByHairColor  =(gnomes: Array<Gnome>, hairColor: String) => {
    if(hairColor){
        return collection.filter(gnomes, function(gnome: Gnome) { return gnome.hair_color === hairColor})
    } else {
        return gnomes
    }
}
export const filterByAge  =(gnomes: Array<Gnome>, age: {min : number, max: number}) => {
    if(age){
        return collection.filter(gnomes, function(gnome: Gnome) { return gnome.age> age.min && gnome.age< age.max})
    } else {
        return gnomes
    }
}
export const filterByHeight  =(gnomes: Array<Gnome>, height: {min : number, max: number}) => {
    if(height){
        return collection.filter(gnomes, function(gnome: Gnome) { return gnome.height> height.min && gnome.height< height.max})
    } else {
        return gnomes
    }
}
export const filterByWeight  =(gnomes: Array<Gnome>, weight: {min : number, max: number}) => {
    if(weight){
        return collection.filter(gnomes, function(gnome: Gnome) { return gnome.weight> weight.min && gnome.weight< weight.max})
    } else {
        return gnomes
    }
}


export const getPossibleValues =(gnomes: Array<Gnome>) => {
    let professions =[] as any[]
    let hairColors =[] as String[]
    let minHeight = null
    let maxHeight = null
    let minWeight = null
    let maxWeight = null
    let minAge = null
    let maxAge = null

    for (const gnome of gnomes) {
        let notIncludedProfessions = array.pullAll(gnome.professions,professions)
        professions.push(...notIncludedProfessions)

        if(!hairColors.includes(gnome.hair_color)){
            hairColors.push(gnome.hair_color)
        }

        if(!minHeight || gnome.height <  minHeight) {
            minHeight = gnome.height
        }
        if(!maxHeight || gnome.height >  maxHeight) {
            maxHeight = gnome.height
        }
        if(!minWeight || gnome.weight <  minWeight) {
            minWeight = gnome.weight
        }
        if(!maxWeight || gnome.weight >  maxWeight) {
            maxWeight = gnome.weight
        }
        if(!minAge || gnome.age <  minAge) {
            minAge = gnome.age
        }
        if(!maxAge || gnome.age >  maxAge) {
            maxAge = gnome.age
        }
    }

    return {
        professions: professions.map(string => string.trim()).sort(),
        hairColors: hairColors.sort(),
        minHeight : minHeight ? minHeight: 0,
        maxHeight : maxHeight? maxHeight : 100,
        minWeight : minWeight? minWeight: 0,
        maxWeight : maxWeight? maxWeight: 100,
        minAge : minAge? minAge: 0,
        maxAge : maxAge? maxAge : 100
    }
    
}


export const transformArrayIntoSelectOptions  =(array: Array<string>) => {
    return array.map(profession => {
        return {
            key: profession,
            value: profession,
            text: profession
        }
    })

}




