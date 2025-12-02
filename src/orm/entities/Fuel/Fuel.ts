import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Fueling } from '../Fueling/Fueling';
import { FuelMinPrice } from '../FuelMinPrice/FuelMinPrice';
import { Supply } from '../Supply/Supply';

@Entity()
export class Fuel {
  @PrimaryGeneratedColumn()
  fuel_id: number;

  @Column()
  fuel_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Fueling, (fueling) => fueling.fuel)
  fuelings: Fueling[];

  @OneToMany(() => FuelMinPrice, (fmp) => fmp.fuel)
  minPrices: FuelMinPrice[];

  @OneToMany(() => Supply, (supply) => supply.fuel)
  supplies: Supply[];
}
