import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { StatusSchema } from './schemas/status.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [StatusService, AuthService],
})
export class StatusModule {}
