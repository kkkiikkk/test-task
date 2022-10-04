// Core
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Query
} from '@nestjs/common';

// Entities
import { User } from '../core/entities';

// Services
import { UserService } from '../services';

// Instruments
import { MESSAGES } from '../core/errors';
import {convertCurrency} from "../tools/helpers";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    // ================================================================================================================

    @Get('/balance/:userId')
    @HttpCode(HttpStatus.OK)
    async deposit(@Param('userId') userId: string, @Query() query: any): Promise<User | null> {
        const {currency} = query
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(MESSAGES.USER_NOT)
        }
        if (!currency) {
            return user;
        }
        const convertedAmount = await convertCurrency(currency, user.balance)

        return convertedAmount.result !== null ? {_id: user._id, balance: convertedAmount.result} : user
    }
}
