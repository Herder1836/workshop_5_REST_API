import { Router } from 'express';

import { OperatorLogController } from '../controllers/OperatorLog/operatorLog.controller';

const router = Router();

router.get('/', OperatorLogController.getAll);
router.get('/:id', OperatorLogController.getById);
router.post('/', OperatorLogController.create);
router.put('/:id', OperatorLogController.update);
router.delete('/:id', OperatorLogController.delete);

export { router as operatorLogRouter };
