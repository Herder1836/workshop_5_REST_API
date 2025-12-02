import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Client } from '../Client/Client';
import { Finance } from '../Finance/Finance';
import { Fuel } from '../Fuel/Fuel';
import { Operator } from '../Operator/Operator';

@Entity()
export class Fueling {
  @PrimaryGeneratedColumn()
  fueling_id: number;

  @ManyToOne(() => Client, (client) => client.fuelings, { nullable: true })
  client: Client;

  @ManyToOne(() => Operator, (operator) => operator.fuelings, { nullable: true })
  operator: Operator;

  @ManyToOne(() => Fuel, (fuel) => fuel.fuelings, { nullable: true })
  fuel: Fuel;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  volume: number;

  @OneToMany(() => Finance, (finance) => finance.fueling)
  finances: Finance[];
}
