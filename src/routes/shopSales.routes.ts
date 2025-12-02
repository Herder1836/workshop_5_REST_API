import { Router } from 'express';

import { ShopSalesController } from '../controllers/ShopSales/shopSales.controller';

const router = Router();

router.get('/', ShopSalesController.getAll);
router.get('/:id', ShopSalesController.getById);
router.post('/', ShopSalesController.create);
router.put('/:id', ShopSalesController.update);
router.delete('/:id', ShopSalesController.delete);

export { router as shopSalesRouter };
