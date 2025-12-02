import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Fuel } from '../Fuel/Fuel';
import { Supplier } from '../Supplier/Supplier';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  supply_id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplies)
  supplier: Supplier;

  @ManyToOne(() => Fuel, (fuel) => fuel.supplies)
  fuel: Fuel;

  @Column('decimal', { precision: 10, scale: 2 })
  volume: number;

  @Column()
  delivery_date: Date;
}
