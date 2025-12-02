import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { FuelMinPrice } from '../../orm/entities/FuelMinPrice/FuelMinPrice';

export class FuelMinPriceController {
  // GET /fuel-min-price
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(FuelMinPrice);

    const records = await repo.find({
      relations: ['fuel'], // join
    });

    return res.json(records);
  }

  // GET /fuel-min-price/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(FuelMinPrice);

    const record = await repo.findOne(id, {
      relations: ['fuel'],
    });

    if (!record) {
      return res.status(404).json({ message: 'Fuel min price not found' });
    }

    return res.json(record);
  }

  // POST /fuel-min-price
  static async create(req: Request, res: Response) {
    const repo = getRepository(FuelMinPrice);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /fuel-min-price/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(FuelMinPrice);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Fuel min price not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /fuel-min-price/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(FuelMinPrice);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Fuel min price not found' });
    }

    return res.sendStatus(204);
  }
}
