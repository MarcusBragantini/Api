import express from 'express';
import { createVehicles, getVehicles, updateVehicles, deleteVehicles } from '../controllers/VehicleController.js';

const router = express.Router();

router.post('/vehicles', createVehicles);
router.get('/vehicles', getVehicles);
router.put('/vehicles/:id', updateVehicles);
router.delete('/vehicles/:id', deleteVehicles);

export default router;
