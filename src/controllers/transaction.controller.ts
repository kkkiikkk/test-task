// Core
import {
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

// Entities
import { Transaction } from '../core/entities';

// Services
import { UserService, TransactionService } from '../services';

// Instruments
import { TransactionTransferDto, TransactionDepositDto, TransactionWithdrawDto } from '../core/dtos';
import { MESSAGES } from '../core/errors';

@Controller('transactions')
export class TransactionController {
    constructor(
        private readonly userService: UserService,
        private readonly transactionService: TransactionService
    ) {}

    // ================================================================================================================

    @Post('/deposit')
    @HttpCode(HttpStatus.CREATED)
    async deposit(@Body() body: TransactionDepositDto): Promise<Transaction | null> {
        const user = await this.userService.findById(body.to);

        if (!user) {
            await this.userService.createOne({ balance: body.value, _id: body.to })
        }
        else {
            await this.userService.increaseBalance(body.to, body.value)
        }

        return await this.transactionService.deposit(body);
    }

    @Post('/withdraw')
    @HttpCode(HttpStatus.CREATED)
    async withdraw(@Body() body: TransactionWithdrawDto): Promise<Transaction> {
        const user = await this.userService.findById(body.from)

        if (!user) {
            throw new NotFoundException(MESSAGES.USER_NOT)
        }

        if ( user.balance < body.value ) {
            throw new BadRequestException(MESSAGES.NOT_MONEY)
        }

        await this.userService.decreaseBalance(user._id, body.value)

        return await this.transactionService.withdraw(body);
    }

    // ================================================================================================================

    @Post('/transfer')
    @HttpCode(HttpStatus.CREATED)
    async transfer(@Body() body: TransactionTransferDto): Promise<Transaction> {
        const sender = await this.userService.findById(body.from);
        const receiver = await this.userService.findById(body.to)

        if (!sender || !receiver) {
            throw new NotFoundException(MESSAGES.USER_NOT)
        }

        if (sender.balance < body.value) {
            throw new BadRequestException(MESSAGES.NOT_MONEY)
        }

        return await this.transactionService.transfer(body);
    }
}
