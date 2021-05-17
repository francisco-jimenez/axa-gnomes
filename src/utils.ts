import { cloneElement } from "react";
import { Gnome } from "./models/Gnome"

var collection = require('lodash/collection');

export const filterByName  =(gnomes: Array<Gnome>, searchString: string) => {
    if(searchString){
        let matches = collection.filter(gnomes, function(gnome: Gnome) { return gnome.name.toLowerCase().indexOf(searchString.toLowerCase())!== -1})
        return collection.sortBy(matches, [function(gnome:Gnome) { return gnome.name.toLowerCase().indexOf(searchString.toLowerCase())}])
    } else {
        return gnomes
    }
}