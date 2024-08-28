import express from 'express';
import { createDriver, getDrivers, updateDriver, deleteDriver } from '../controllers/DriverController.js';

const router = express.Router();

router.post('/drivers', createDriver);
router.get('/drivers', getDrivers);
router.put('/drivers/:id', updateDriver);
router.delete('/drivers/:id', deleteDriver);

export default router;
