import { Router } from 'express';

import { FinanceController } from '../controllers/Finance/finance_controller';

const router = Router();

router.get('/', FinanceController.getAll);
router.get('/:id', FinanceController.getById);
router.post('/', FinanceController.create);
router.put('/:id', FinanceController.update);
router.delete('/:id', FinanceController.delete);

export { router as financeRouter };
