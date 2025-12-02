import { Router } from 'express';

import { FuelMinPriceController } from '../controllers/FuelMinPrice/fuelMinPrice.controller';

const router = Router();

router.get('/', FuelMinPriceController.getAll);
router.get('/:id', FuelMinPriceController.getById);
router.post('/', FuelMinPriceController.create);
router.put('/:id', FuelMinPriceController.update);
router.delete('/:id', FuelMinPriceController.delete);

export { router as fuelMinPriceRouter };
