import { DataTypes } from '@sequelize/core';
import { Table, Column, Model, ForeignKey, PrimaryKey } from 'sequelize-typescript';

import { Item } from './item.entity'
import { USD, EUR, GBP } from '../enums/currenciesEnums'

@Table({initialAutoIncrement: '1'})
export class Payout extends Model {
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id: number;

    @Column
    sellerReference: number;

    @Column
    amount: number;

    @Column(DataTypes.ENUM(USD, EUR, GBP))
    currency: string;

    @ForeignKey(() => Item)
    @Column
    itemId: number;
}

export const PayoutEntity = Payout