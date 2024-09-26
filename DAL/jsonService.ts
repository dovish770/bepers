import jsonfile from 'jsonfile';
import {Beeper} from '../models/beeperType.js'

export const writeBeepersToJson = async(beeper:Beeper)=>{
    jsonfile.readFile('./data/db.json')
    .then(beepers=>{
        beepers.push(beeper);
        jsonfile.writeFile('./data/db.json', beepers, function (err) {
            if (err)
                console.error(err);                
        });
    })
    .catch(error => console.error(error));
}


export const getBeepersFromJson = async()=> {
    const beepers: Beeper[] = await jsonfile.readFile('./data/db.json');
        
    if (!beepers || beepers.length === 0) {
        return null;
    }
    return beepers;
}