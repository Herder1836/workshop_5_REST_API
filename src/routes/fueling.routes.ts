import { Router } from 'express';

import { FuelingController } from '../controllers/Fueling/fueling.controller';

const router = Router();

router.get('/', FuelingController.getAll);
router.get('/:id', FuelingController.getById);
router.post('/', FuelingController.create);
router.put('/:id', FuelingController.update);
router.delete('/:id', FuelingController.delete);

export { router as fuelingRouter };
