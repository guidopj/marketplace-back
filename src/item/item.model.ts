import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Item extends Model {
  @Column
  name: string;

  @Column
  priceCurrency: string;

  @Column
  priceAmount: number;

  @Column
  sellerReference: number;
}