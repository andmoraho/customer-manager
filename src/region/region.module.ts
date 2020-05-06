import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { RegionSchema } from './schemas/region.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Region', schema: RegionSchema }]),
  ],
  controllers: [RegionController],
  providers: [RegionService, AuthService],
})
export class RegionModule {}
