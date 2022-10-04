// Core
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDepositDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    to: string

    @IsString()
    description?: string
}

export class TransactionWithdrawDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    from: string

    @IsString()
    description?: string
}

export class TransactionTransferDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    to: string

    @IsString()
    @IsNotEmpty()
    from: string

    @IsString()
    description?: string
}
