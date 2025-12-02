import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Supply } from '../Supply/Supply';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column()
  company_name: string;

  @Column()
  contact_person: string;

  @Column()
  phone_number: string;

  @OneToMany(() => Supply, (supply) => supply.supplier)
  supplies: Supply[];
}
