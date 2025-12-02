import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Fuel } from '../Fuel/Fuel';

@Entity()
export class FuelMinPrice {
  @PrimaryGeneratedColumn()
  fmp_id: number;

  @ManyToOne(() => Fuel, (fuel) => fuel.minPrices)
  fuel: Fuel;

  @Column('decimal', { precision: 10, scale: 2 })
  min_price: number;

  @Column()
  date_from: Date;
}
