import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionSchema } from './schemas/action.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
  ],
  controllers: [ActionController],
  providers: [ActionService, AuthService],
})
export class ActionModule {}
