import { Router } from 'express';

import { clientRouter } from './client.routes';
import { financeRouter } from './finance.routes';
import { fuelRouter } from './fuel.routes';
import { fuelingRouter } from './fueling.routes';
import { fuelMinPriceRouter } from './fuelMinPrice.routes';
import { gasStationRouter } from './gasStation.routes';
import { operatorRouter } from './operator.routes';
import { operatorLogRouter } from './operatorLog.routes';
import { productRouter } from './product.routes';
import { shopSalesRouter } from './shopSales.routes';
import { supplierRouter } from './supplier.routes';
import { supplyRouter } from './supply.routes';

const router = Router();

router.use('/clients', clientRouter);
router.use('/finances', financeRouter);
router.use('/gasstations', gasStationRouter);
router.use('/fuels', fuelRouter);
router.use('/fuelings', fuelingRouter);
router.use('/fuel-min-price', fuelMinPriceRouter);
router.use('/operators', operatorRouter);
router.use('/operator-logs', operatorLogRouter);
router.use('/products', productRouter);
router.use('/shop-sales', shopSalesRouter);
router.use('/suppliers', supplierRouter);
router.use('/supplies', supplyRouter);

export default router;
