import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Supplier } from '../../orm/entities/Supplier/Supplier';

export class SupplierController {
  // GET /suppliers
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Supplier);

    const data = await repo.find({
      relations: ['supplies'],
    });

    return res.json(data);
  }

  // GET /suppliers/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supplier);

    const entity = await repo.findOne(id, {
      relations: ['supplies'],
    });

    if (!entity) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    return res.json(entity);
  }

  // POST /suppliers
  static async create(req: Request, res: Response) {
    const repo = getRepository(Supplier);

    const supplier = repo.create(req.body);
    const saved = await repo.save(supplier);

    return res.status(201).json(saved);
  }

  // PUT /suppliers/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supplier);

    const entity = await repo.findOne(id);
    if (!entity) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    repo.merge(entity, req.body);
    const updated = await repo.save(entity);

    return res.json(updated);
  }

  // DELETE /suppliers/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Supplier);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    return res.sendStatus(204);
  }
}
