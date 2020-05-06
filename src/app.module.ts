import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StatusModule } from './status/status.module';
import { CompanyModule } from './company/company.module';
import { RegionModule } from './region/region.module';
import { ClientModule } from './client/client.module';

import config from './config/keys';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    ItemsModule,
    UserModule,
    ActionModule,
    AuthModule,
    ProductModule,
    StatusModule,
    CompanyModule,
    RegionModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
