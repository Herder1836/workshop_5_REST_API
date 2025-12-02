import { Router } from 'express';

import { FuelController } from '../controllers/Fuel/fuel.controller';

const router = Router();

router.get('/', FuelController.getAll);
router.get('/:id', FuelController.getById);
router.post('/', FuelController.create);
router.put('/:id', FuelController.update);
router.delete('/:id', FuelController.delete);

export { router as fuelRouter };
