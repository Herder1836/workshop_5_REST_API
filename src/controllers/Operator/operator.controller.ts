import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Operator } from '../../orm/entities/Operator/Operator';

export class OperatorController {
  // GET /operators
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Operator);

    const data = await repo.find({
      relations: ['gasstation', 'sales', 'fuelings', 'logs'],
    });

    return res.json(data);
  }

  // GET /operators/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Operator);

    const op = await repo.findOne(id, {
      relations: ['gasstation', 'sales', 'fuelings', 'logs'],
    });

    if (!op) {
      return res.status(404).json({ message: 'Operator not found' });
    }

    return res.json(op);
  }

  // POST /operators
  static async create(req: Request, res: Response) {
    const repo = getRepository(Operator);

    const op = repo.create(req.body);
    const saved = await repo.save(op);

    return res.status(201).json(saved);
  }

  // PUT /operators/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Operator);

    const exists = await repo.findOne(id);
    if (!exists) {
      return res.status(404).json({ message: 'Operator not found' });
    }

    repo.merge(exists, req.body);
    const updated = await repo.save(exists);

    return res.json(updated);
  }

  // DELETE /operators/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Operator);

    const result = await repo.delete(id);

    if (!result.affected) {
      return res.status(404).json({ message: 'Operator not found' });
    }

    return res.sendStatus(204);
  }
}
