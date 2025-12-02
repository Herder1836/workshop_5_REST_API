import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Finance } from '../../orm/entities/Finance/Finance';

export class FinanceController {
  // GET /finances
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Finance);

    const finances = await repo.find({
      relations: ['client', 'sale', 'fueling', 'gasstation'],
    });

    return res.json(finances);
  }

  // GET /finances/:id
  static async getById(req: Request, res: Response) {
    const repo = getRepository(Finance);

    const entity = await repo.findOne(req.params.id, {
      relations: ['client', 'sale', 'fueling', 'gasstation'],
    });

    if (!entity) {
      return res.status(404).json({ message: 'Finance record not found' });
    }

    return res.json(entity);
  }

  // POST /finances
  static async create(req: Request, res: Response) {
    const repo = getRepository(Finance);

    const finance = repo.create(req.body);
    const saved = await repo.save(finance);

    return res.status(201).json(saved);
  }

  // PUT /finances/:id
  static async update(req: Request, res: Response) {
    const repo = getRepository(Finance);

    const entity = await repo.findOne(req.params.id);
    if (!entity) {
      return res.status(404).json({ message: 'Finance record not found' });
    }

    repo.merge(entity, req.body);
    const saved = await repo.save(entity);

    return res.json(saved);
  }

  // DELETE /finances/:id
  static async delete(req: Request, res: Response) {
    const repo = getRepository(Finance);

    const result = await repo.delete(req.params.id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Finance record not found' });
    }

    return res.sendStatus(204);
  }
}
