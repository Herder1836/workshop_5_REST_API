import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Client } from '../../orm/entities/Client/Client';

export class ClientController {
  // GET /clients
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Client);

    const clients = await repo.find({
      relations: ['fuelings', 'sales', 'finances'],
    });

    return res.json(clients);
  }

  // GET /clients/:id
  static async getById(req: Request, res: Response) {
    const repo = getRepository(Client);

    const client = await repo.findOne(req.params.id, {
      relations: ['fuelings', 'sales', 'finances'],
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.json(client);
  }

  // POST /clients
  static async create(req: Request, res: Response) {
    const repo = getRepository(Client);

    const client = repo.create(req.body);
    const saved = await repo.save(client);

    return res.status(201).json(saved);
  }

  // PUT /clients/:id
  static async update(req: Request, res: Response) {
    const repo = getRepository(Client);

    const existing = await repo.findOne(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: 'Client not found' });
    }

    repo.merge(existing, req.body);
    const updated = await repo.save(existing);

    return res.json(updated);
  }

  // DELETE /clients/:id
  static async delete(req: Request, res: Response) {
    const repo = getRepository(Client);

    const result = await repo.delete(req.params.id);

    if (!result.affected) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.status(204).send();
  }
}
