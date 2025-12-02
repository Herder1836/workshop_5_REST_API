import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { ShopSales } from '../../orm/entities/ShopSales/ShopSales';

export class ShopSalesController {
  // GET /shop-sales
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(ShopSales);

    const sales = await repo.find({
      relations: ['client', 'operator', 'product', 'finances'],
    });

    return res.json(sales);
  }

  // GET /shop-sales/:id
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(ShopSales);

    const sale = await repo.findOne(id, {
      relations: ['client', 'operator', 'product', 'finances'],
    });

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.json(sale);
  }

  // POST /shop-sales
  static async create(req: Request, res: Response) {
    const repo = getRepository(ShopSales);

    const entity = repo.create(req.body);
    const saved = await repo.save(entity);

    return res.status(201).json(saved);
  }

  // PUT /shop-sales/:id
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(ShopSales);

    const existing = await repo.findOne(id);
    if (!existing) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /shop-sales/:id
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = getRepository(ShopSales);

    const result = await repo.delete(id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.sendStatus(204);
  }
}
