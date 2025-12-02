import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Finance } from '../Finance/Finance';
import { Fueling } from '../Fueling/Fueling';
import { ShopSales } from '../ShopSales/ShopSales';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @OneToMany(() => Fueling, (fueling) => fueling.client)
  fuelings: Fueling[];

  @OneToMany(() => ShopSales, (sale) => sale.client)
  sales: ShopSales[];

  @OneToMany(() => Finance, (finance) => finance.client)
  finances: Finance[];
}
