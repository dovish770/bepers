import {Request,Response} from 'express'
import {Beeper, Status} from '../models/beeperType.js';
import { v4 as uuidv4 } from 'uuid';
import {writeBeepersToJson, getBeepersFromJson} from '../DAL/jsonService.js';
import jsonfile from 'jsonfile';


export const createBeeper = async (req: Request, res: Response) => {
    
    try {
        const beeper:Beeper = {
            id: uuidv4(),
            name: req.body.name,
            status: 'manufactured',
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
