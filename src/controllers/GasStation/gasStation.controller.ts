import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { GasStation } from '../../orm/entities/GasStation/GasStation';

export class GasStationController {
  // GET /gasstations
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(GasStation);

    const stations = await repo.find({
      relations: ['operators', 'finances'], // JOIN таблиц
    });

    return res.json(stations);
  }

  // GET /gasstations/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(GasStation);

    const station = await repo.findOne(id, {
      relations: ['operators', 'finances'],
    });

    if (!station) {
      return res.status(404).json({ message: 'Gas station not found' });
    }

    return res.json(station);
  }

  // POST /gasstations
  static async create(req: Request, res: Response) {
    const repo = getRepository(GasStation);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /gasstations/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(GasStation);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Gas station not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /gasstations/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(GasStation);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Gas station not found' });
    }

    return res.sendStatus(204);
  }
}
