import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Finance } from '../Finance/Finance';
import { Operator } from '../Operator/Operator';

@Entity()
export class GasStation {
  @PrimaryGeneratedColumn()
  azs_id: number;

  @Column()
  azs_name: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @OneToMany(() => Operator, (operator) => operator.gasstation)
  operators: Operator[];

  @OneToMany(() => Finance, (finance) => finance.gasstation)
  finances: Finance[];
}
