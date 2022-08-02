import { Table, Column, Model, PrimaryKey, HasMany } from 'sequelize-typescript';
import { DataTypes } from '@sequelize/core';

import { USD, EUR, GBP } from '../enums/currenciesEnums'
import { Payout } from './payout.entity'

@Table({initialAutoIncrement: '1'})
export class Item extends Model {
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id: number;

    @Column
    name: string;

    @Column(DataTypes.ENUM(USD, EUR, GBP))
    priceCurrency: string

    @Column
    priceAmount: number;

    @Column
    sellerReference: number;

    @HasMany(() => Payout)
        payouts: Payout[];
}

export const ItemEntity = Item