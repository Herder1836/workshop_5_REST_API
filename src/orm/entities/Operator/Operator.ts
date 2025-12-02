import * as bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

import { Fueling } from '../Fueling/Fueling';
import { GasStation } from '../GasStation/GasStation';
import { OperatorLog } from '../OperatorLog/OperatorLog';
import { ShopSales } from '../ShopSales/ShopSales';

export enum OperatorRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  operator_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  shift_number: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: OperatorRole,
    default: OperatorRole.OPERATOR,
  })
  role: OperatorRole;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => GasStation, (gasstation) => gasstation.operators)
  gasstation: GasStation;

  @OneToMany(() => ShopSales, (sale) => sale.operator)
  sales: ShopSales[];

  @OneToMany(() => Fueling, (fueling) => fueling.operator)
  fuelings: Fueling[];

  @OneToMany(() => OperatorLog, (log) => log.operator)
  logs: OperatorLog[];

  // ========== METHODS ==========
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkPassword(plain: string) {
    return bcrypt.compareSync(plain, this.password);
  }
}
