import {Request,Response} from 'express'
import {Beeper, Status, Coordinates} from '../models/beeperType.js';
import { v4 as uuidv4 } from 'uuid';
import {writeBeepersToJson, getBeepersFromJson, updateStatus, checkCoordinates, setBeeperToMission, startMission} from '../DAL/bookService.js';
import jsonfile from 'jsonfile';


export const createBeeper = async (req: Request, res: Response) => {
    
    try {
        const beeper:Beeper = {
            id: uuidv4(),
            name: req.body.name,
            status: Status[0],
            createdAt: new Date()
        }
        await writeBeepersToJson(beeper);
        res.status(201).send('beeper created successfully')
    } catch {
        res.status(500).send("An error occurred while creating the new beeper.");
    }
};

export const getAllBeepers = async (req: Request, res: Response)=>{
    try {
        const beepers = await getBeepersFromJson()
        
        if (!beepers || beepers.length === 0) {
            res.status(404).send("No Beepers found.");
        }
        res.status(200).json(beepers);
    } catch {
        res.status(500).send("An error occurred while getting beepers.");
    }
}

export const getOneBeeper = async (req: Request, res: Response)=>{
    try {
        const beepers = await getBeepersFromJson()
        if (beepers) {
            if(beepers.length > 0){
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    res.status(400).send("Invalid user ID.");
                }
                res.status(200).json(beepers[beeperIndex]);
            }
        }else{
            res.status(404).send("No Beepers found.");
        }
    } catch {
        res.status(404).send("An error occurred while getting beeper.");
    }
}

export const deleteBeeper = async (req:Request, res:Response) => {
    try {
        let beepers = await getBeepersFromJson();
        
        if (beepers) {
            if(beepers.length > 0){
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    res.status(400).send("Invalid user ID.");
                }
                beepers = beepers.filter(b => b.id !== req.params.id);
                await jsonfile.writeFile('./data/db.json', beepers);
                res.status(200).json('beeper was deleted successfully');
            }
        }
    } catch{
        res.status(500).send("An error occurred while deleting the beeper.");
    }
}

export const editBeepersStatus = async (req: Request, res: Response) => {
    try {
        let beepers = await getBeepersFromJson();

        if (beepers) {
            if (beepers.length > 0) {
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    return res.status(400).send("Invalid beeper ID.");
                }

                const isDeployed: boolean = updateStatus(beepers[beeperIndex]);
                if (isDeployed) {
                    const coordinates: Coordinates = req.body;

                    if (!checkCoordinates(coordinates)) {
                        return res.status(400).send("Invalid coordinations.");
                    }

                    setBeeperToMission(beepers[beeperIndex], coordinates);
                    await startMission(beepers[beeperIndex])
                }

                await jsonfile.writeFile('./data/db.json', beepers);

                res.status(200).json('status was updated successfully');
            }
        }
    } catch (error) {
        res.status(500).send("An error occurred while updating status.");
    }
};





