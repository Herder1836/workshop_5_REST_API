import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Operator } from '../Operator/Operator';

@Entity()
export class OperatorLog {
  @PrimaryGeneratedColumn()
  log_id: number;

  @ManyToOne(() => Operator, (operator) => operator.logs, { nullable: false })
  operator: Operator;

  @Column()
  action: string;

  @CreateDateColumn()
  changed_at: Date;

  @Column('jsonb', { nullable: true })
  old_data: any;

  @Column('jsonb', { nullable: true })
  new_data: any;
}
