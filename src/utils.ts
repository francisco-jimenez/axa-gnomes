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


export const getProfessions =(gnomes: Array<Gnome>) => {
    let professions =[] as any[]

    for (const gnome of gnomes) {
        let notIncludedProfessions = array.pullAll(gnome.professions,professions)
        professions.push(...notIncludedProfessions)
    }

    return professions.map(string => string.trim()).sort()
}


export const transformProfessionsIntoSelectOptions  =(professions: Array<String>) => {
    return professions.map(profession => {
        return {
            key: profession,
            value: profession,
            text: profession
        }
    })

}




