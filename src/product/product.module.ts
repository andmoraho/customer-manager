import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';
import { UserSchema } from '../user/schemas/user.schema';
import { ProductSchema } from './schemas/product.schema';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService, AuthService],
})
export class ProductModule {}
