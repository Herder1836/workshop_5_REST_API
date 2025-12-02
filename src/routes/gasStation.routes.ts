import { Router } from 'express';

import { GasStationController } from '../controllers/GasStation/gasStation.controller';

const router = Router();

router.get('/', GasStationController.getAll);
router.get('/:id', GasStationController.getById);
router.post('/', GasStationController.create);
router.put('/:id', GasStationController.update);
router.delete('/:id', GasStationController.delete);

export { router as gasStationRouter };
