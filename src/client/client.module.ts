import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { UserSchema } from '../user/schemas/user.schema';
import { CompanySchema } from '../company/schemas/company.schema';
import { ActionSchema } from '../action/schemas/action.schema';
import { StatusSchema } from '../status/schemas/status.schema';
import { ProductSchema } from '../product/schemas/product.schema';
import { ClientSchema } from './schemas/client.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, AuthService],
})
export class ClientModule {}
