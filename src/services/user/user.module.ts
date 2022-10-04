// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Instruments
import { UserSchema, User } from '../../core/entities';
import { UserService } from './user.service'

@Module({
    imports:     [ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ],
    providers:   [ UserService ],
    exports:     [ UserService ],
})
export class UserModule {}
