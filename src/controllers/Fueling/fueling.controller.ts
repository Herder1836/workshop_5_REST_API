import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Fueling } from '../../orm/entities/Fueling/Fueling';

export class FuelingController {
  // GET /fuelings
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Fueling);

    const records = await repo.find({
      relations: ['client', 'operator', 'fuel', 'finances'],
    });

    return res.json(records);
  }

  // GET /fuelings/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Fueling);

    const record = await repo.findOne(id, {
      relations: ['client', 'operator', 'fuel', 'finances'],
    });

    if (!record) {
      return res.status(404).json({ message: 'Fueling not found' });
    }

    return res.json(record);
  }

  // POST /fuelings
  static async create(req: Request, res: Response) {
    const repo = getRepository(Fueling);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /fuelings/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Fueling);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Fueling not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /fuelings/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Fueling);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Fueling not found' });
    }

    return res.sendStatus(204);
  }
}
