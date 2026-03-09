import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  items!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
