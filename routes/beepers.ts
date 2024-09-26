import express, { Router } from 'express';
import {createBeeper, getAllBeepers} from '../controllers/beeperController.js'

const router: Router = express.Router();

router.route('/beepers').post(createBeeper);
router.route('/beepers').get(getAllBeepers);

export default router;