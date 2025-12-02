import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Fuel } from '../../orm/entities/Fuel/Fuel';

export class FuelController {
  // GET /fuels
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Fuel);

    const fuels = await repo.find({
      relations: ['fuelings', 'minPrices', 'supplies'],
    });

    return res.json(fuels);
  }

  // GET /fuels/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Fuel);

    const fuel = await repo.findOne(id, {
      relations: ['fuelings', 'minPrices', 'supplies'],
    });

    if (!fuel) {
      return res.status(404).json({ message: 'Fuel not found' });
    }

    return res.json(fuel);
  }

  // POST /fuels
  static async create(req: Request, res: Response) {
    const repo = getRepository(Fuel);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /fuels/:id
  static async update(req: Request, res: Response) {
    const repo = getRepository(Fuel);
    const id = Number(req.params.id);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Fuel not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /fuels/:id
  static async delete(req: Request, res: Response) {
    const repo = getRepository(Fuel);
    const id = Number(req.params.id);

    const result = await repo.delete(id);

    if (!result.affected) {
      return res.status(404).json({ message: 'Fuel not found' });
    }

    return res.sendStatus(204);
  }
}
