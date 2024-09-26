import express from 'express';
import { createBeeper, getAllBeepers } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/beepers').post(createBeeper);
router.route('/beepers').get(getAllBeepers);
export default router;
