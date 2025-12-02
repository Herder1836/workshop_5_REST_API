import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Client } from '../Client/Client';
import { Fueling } from '../Fueling/Fueling';
import { GasStation } from '../GasStation/GasStation';
import { ShopSales } from '../ShopSales/ShopSales';

@Entity()
export class Finance {
  @PrimaryGeneratedColumn()
  finance_id: number;

  @ManyToOne(() => Client, (client) => client.finances, { nullable: true })
  client: Client;

  @ManyToOne(() => ShopSales, (sale) => sale.finances, { nullable: true })
  sale: ShopSales;

  @ManyToOne(() => Fueling, (fueling) => fueling.finances, { nullable: true })
  fueling: Fueling;

  @ManyToOne(() => GasStation, (gasstation) => gasstation.finances, { nullable: true })
  gasstation: GasStation;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  date_time: Date;
}
