import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { OperatorLog } from '../../orm/entities/OperatorLog/OperatorLog';

export class OperatorLogController {
  // GET /operator-logs
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(OperatorLog);

    const data = await repo.find({
      relations: ['operator'],
    });

    return res.json(data);
  }

  // GET /operator-logs/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(OperatorLog);

    const entity = await repo.findOne(id, {
      relations: ['operator'],
    });

    if (!entity) {
      return res.status(404).json({ message: 'Operator log not found' });
    }

    return res.json(entity);
  }

  // POST /operator-logs
  static async create(req: Request, res: Response) {
    const repo = getRepository(OperatorLog);

    const log = repo.create(req.body);
    const saved = await repo.save(log);

    return res.status(201).json(saved);
  }

  // PUT /operator-logs/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(OperatorLog);

    const entity = await repo.findOne(id);
    if (!entity) {
      return res.status(404).json({ message: 'Operator log not found' });
    }

    repo.merge(entity, req.body);
    const updated = await repo.save(entity);

    return res.json(updated);
  }

  // DELETE /operator-logs/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(OperatorLog);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Operator log not found' });
    }

    return res.sendStatus(204);
  }
}
