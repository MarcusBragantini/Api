import express from 'express';
import { createTravels, getTravels, updateTravels, deleteTravels } from '../controllers/TravelController.js'; // Adicionei .js na importação

const router = express.Router();

router.post('/travels', createTravels);
router.get('/travels', getTravels);
router.put('/travels/:id', updateTravels);
router.delete('/travels/:id', deleteTravels);

export default router;
