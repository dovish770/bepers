var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from '../models/beeperType.js';
import { v4 as uuidv4 } from 'uuid';
import { writeBeepersToJson, getBeepersFromJson, updateStatus, checkCoordinates, setBeeperToMission, startMission } from '../DAL/bookService.js';
import jsonfile from 'jsonfile';
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = {
            id: uuidv4(),
            name: req.body.name,
            status: Status[0],
            createdAt: new Date(),
            latitude: 0,
            longitude: 0
        };
        if (beeper.name) {
            yield writeBeepersToJson(beeper);
            res.status(201).send('beeper created successfully');
        }
        else {
            res.status(400).send('body request is invalid');
        }
    }
    catch (_a) {
        res.status(500).send("An error occurred while creating the new beeper.");
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeepersFromJson();
        if (!beepers || beepers.length === 0) {
            res.status(404).send("No Beepers found.");
        }
        res.status(200).json(beepers);
    }
    catch (_a) {
        res.status(500).send("An error occurred while getting beepers.");
    }
});
export const getOneBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeepersFromJson();
        if (beepers) {
            if (beepers.length > 0) {
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    res.status(400).send("Invalid beeper ID.");
                }
                res.status(200).json(beepers[beeperIndex]);
            }
        }
        else {
            res.status(404).send("No Beepers found.");
        }
    }
    catch (_a) {
        res.status(404).send("An error occurred while getting beeper.");
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let beepers = yield getBeepersFromJson();
        if (beepers) {
            if (beepers.length > 0) {
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    res.status(400).send("Invalid user ID.");
                }
                beepers = beepers.filter(b => b.id !== req.params.id);
                yield jsonfile.writeFile('./data/db.json', beepers);
                res.status(200).send('beeper was deleted successfully');
            }
        }
        else {
            res.status(400).send('beeper was not found');
        }
    }
    catch (_a) {
        res.status(500).send("An error occurred while deleting the beeper.");
    }
});
export const editBeepersStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let beepers = yield getBeepersFromJson();
        if (beepers) {
            if (beepers && beepers.length > 0) {
                const beeperIndex = beepers.findIndex((b) => b.id === req.params.id);
                if (beeperIndex === -1) {
                    res.status(400).send("Invalid beeper ID.");
                }
                const isFinished = updateStatus(beepers[beeperIndex]);
                if (isFinished) {
                    res.status(400).send("cant change status");
                }
                yield jsonfile.writeFile('./data/db.json', beepers);
                res.status(200).json('Status was updated successfully to - ' + beepers[beeperIndex].status);
                if (beepers[beeperIndex].status === "deployed") {
                    const coordinates = req.body;
                    if (!checkCoordinates(coordinates)) {
                        res.status(400).send("Invalid coordinates.");
                    }
                    setBeeperToMission(beepers[beeperIndex], coordinates);
                    startMission(beepers[beeperIndex]);
                }
            }
        }
    }
    catch (error) {
        res.status(500).send("An error occurred while updating status.");
    }
});
