import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { Operator, OperatorRole } from '../entities/Operator/Operator';

export class SeedOperators1670000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repo = getRepository(Operator);

    const admin = repo.create({
      first_name: 'Walter',
      last_name: 'White',
      username: 'Heisenberg',
      password: 'pass1',
      role: OperatorRole.ADMIN,
      shift_number: 1,
    });
    await repo.save(admin);

    const op = repo.create({
      first_name: 'Jesse',
      last_name: 'Pinkman',
      username: 'Jesse',
      password: 'pass1',
      role: OperatorRole.OPERATOR,
      shift_number: 1,
    });
    await repo.save(op);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Operator).delete({});
  }
}
