import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ShopSales } from '../ShopSales/ShopSales';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => ShopSales, (sale) => sale.product)
  sales: ShopSales[];
}
