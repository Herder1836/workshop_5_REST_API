import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Product } from '../../orm/entities/Product/Product';

export class ProductController {
  // GET /products
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Product);

    const items = await repo.find({
      relations: ['sales'], // JOIN
    });

    return res.json(items);
  }

  // GET /products/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Product);

    const entity = await repo.findOne(id, {
      relations: ['sales'],
    });

    if (!entity) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(entity);
  }

  // POST /products
  static async create(req: Request, res: Response) {
    const repo = getRepository(Product);

    const product = repo.create(req.body);
    const saved = await repo.save(product);

    return res.status(201).json(saved);
  }

  // PUT /products/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Product);

    const exists = await repo.findOne(id);
    if (!exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    repo.merge(exists, req.body);
    const updated = await repo.save(exists);

    return res.json(updated);
  }

  // DELETE /products/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(Product);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.sendStatus(204);
  }
}
