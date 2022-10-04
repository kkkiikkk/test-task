// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Instruments
import { TransactionSchema, Transaction } from '../../core/entities';
import { TransactionService } from './transaction.service'

@Module({
    imports:     [ MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]) ],
    providers:   [ TransactionService ],
    exports:     [ TransactionService ],
})
export class TransactionModule {}
