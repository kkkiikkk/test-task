// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';

// Instruments
import { Transaction, TransactionDocument, TYPE_OF_TRANSACTION } from '../../core/entities';
import { TransactionTransferDto, TransactionWithdrawDto, TransactionDepositDto } from '../../core/dtos';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) { }

    // ================================================================================================================

    async deposit(body: TransactionDepositDto): Promise<Transaction> {
        const transaction = new this.transactionModel();
        transaction.value = body.value
        transaction.to_userId = body.to
        transaction.type = TYPE_OF_TRANSACTION.DEPOSIT
        return await transaction.save();
    }

    // ================================================================================================================

    async withdraw(body: TransactionWithdrawDto): Promise<Transaction> {
        const transaction = new this.transactionModel();
        transaction.value = body.value
        transaction.from_userId = body.from
        transaction.type = TYPE_OF_TRANSACTION.WITHDRAW
        return await transaction.save()
    }

    // ================================================================================================================

    async transfer(body: TransactionTransferDto): Promise<Transaction> {
        const transaction = new this.transactionModel();
        transaction.value = body.value
        transaction.from_userId = body.from
        transaction.to_userId = body.to
        transaction.type = TYPE_OF_TRANSACTION.TRANSFER

        return await transaction.save()
    }
}
