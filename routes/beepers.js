import express from 'express';
import { createBeeper, getAllBeepers, getOneBeeper } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/beepers').post(createBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getOneBeeper);
export default router;
