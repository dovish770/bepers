import express, { Router } from 'express';
import {createBeeper, deleteBeeper, editBeepersStatus, getAllBeepers, getOneBeeper} from '../controllers/beeperController.js'

const router: Router = express.Router();

router.route('/beepers').post(createBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getOneBeeper);
router.route('/beepers/:id').delete(deleteBeeper);
router.route('/beepers/:id').put(editBeepersStatus);

export default router;
