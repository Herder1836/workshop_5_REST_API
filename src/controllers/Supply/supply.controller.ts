import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Supply } from '../../orm/entities/Supply/Supply';

export class SupplyController {
  // GET /supplies
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Supply);

    const supplies = await repo.find({
      relations: ['supplier', 'fuel'],
    });

    return res.json(supplies);
  }

  // GET /supplies/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supply);

    const supply = await repo.findOne(id, {
      relations: ['supplier', 'fuel'],
    });

    if (!supply) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    return res.json(supply);
  }

  // POST /supplies
  static async create(req: Request, res: Response) {
    const repo = getRepository(Supply);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /supplies/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supply);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /supplies/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supply);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    return res.sendStatus(204);
  }
}
