import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Client } from '../Client/Client';
import { Finance } from '../Finance/Finance';
import { Operator } from '../Operator/Operator';
import { Product } from '../Product/Product';

@Entity()
export class ShopSales {
  @PrimaryGeneratedColumn()
  sale_id: number;

  @ManyToOne(() => Client, (client) => client.sales, { nullable: true })
  client: Client;

  @ManyToOne(() => Operator, (operator) => operator.sales, { nullable: false })
  operator: Operator;

  @ManyToOne(() => Product, (product) => product.sales, { nullable: false })
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column()
  payment_method: string;

  @Column()
  date_time: Date;

  @OneToMany(() => Finance, (finance) => finance.sale)
  finances: Finance[];
}
