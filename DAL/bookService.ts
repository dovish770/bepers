import jsonfile from 'jsonfile';
import {Beeper, Coordinates, Status} from '../models/beeperType.js';
import {coordinatesList} from '../data/coordinates.js';


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

export function updateStatus(beeper:Beeper):boolean{
    switch(beeper.status) {
        case Status[0]:
            beeper.status = Status[1];
            return false
        case Status[1]:
            beeper.status = Status[2];
            return false
        case Status[2]:
            beeper.status = Status[3];
            return true         
        case Status[3]:
            beeper.status = Status[4];
            beeper.detonatedAt = new Date();
            return false         
    }
    return false
}

export function checkCoordinates(coordinates:Coordinates){
    return coordinatesList.some(coord => coord.lat === coordinates.latitude && coord.lon === coordinates.longitude);
}

export function setBeeperToMission(beeper:Beeper, coordinates:Coordinates){
    beeper.latitude = coordinates.latitude;
    beeper.longitude = coordinates.longitude;
}

export async function startMission(beeper:Beeper){
    await new Promise<void> ((resolve) => setTimeout(() => {
        updateStatus(beeper);
        resolve()
    },10000));
}
