// Core
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Instruments
import { User, UserDocument } from '../../core/entities';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    // ================================================================================================================

    async createOne({ balance, _id }: { balance: number, _id: string }): Promise<User> {
        const user = new this.userModel({ balance, _id });
        return await user.save();
    }

    // ================================================================================================================

    async findById(userId: string): Promise<User | null> {
        const user = await this.userModel.findById(userId);

        return user;
    }

    // ================================================================================================================

    async increaseBalance(userId: string, amount: number): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, { $inc: { balance: amount } })
    }

    // ================================================================================================================

    async decreaseBalance(userId: string, amount: number): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, { $inc: { balance: -amount } })
    }
}
