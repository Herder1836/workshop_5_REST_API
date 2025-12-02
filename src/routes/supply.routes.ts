import { Router } from 'express';

import { SupplyController } from '../controllers/Supply/supply.controller';

const router = Router();

router.get('/', SupplyController.getAll);
router.get('/:id', SupplyController.getById);
router.post('/', SupplyController.create);
router.put('/:id', SupplyController.update);
router.delete('/:id', SupplyController.delete);

export { router as supplyRouter };
