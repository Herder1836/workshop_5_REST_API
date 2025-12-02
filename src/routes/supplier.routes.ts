import { Router } from 'express';

import { SupplierController } from '../controllers/Supplier/supplier.controller';

const router = Router();

router.get('/', SupplierController.getAll);
router.get('/:id', SupplierController.getById);
router.post('/', SupplierController.create);
router.put('/:id', SupplierController.update);
router.delete('/:id', SupplierController.delete);

export { router as supplierRouter };
