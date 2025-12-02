import { Router } from 'express';

import { OperatorController } from '../controllers/Operator/operator.controller';

const router = Router();

router.get('/', OperatorController.getAll);
router.get('/:id', OperatorController.getById);
router.post('/', OperatorController.create);
router.put('/:id', OperatorController.update);
router.delete('/:id', OperatorController.delete);

export { router as operatorRouter };
