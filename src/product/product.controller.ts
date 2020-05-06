import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/interfaces/user.interface';
import { Product } from './interfaces/product.interface';
import { Userparam } from '../user/decorators/user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Userparam() user: User): Promise<Product[]> {
    return this.productService.findAll(user);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id, @Userparam() user: User): Promise<Product> {
    return this.productService.findOne(id, user);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createProductDto: CreateProductDTO,
    @Userparam() user: User,
  ): Promise<Product> {
    return this.productService.create(createProductDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id, @Userparam() user: User): Promise<Product> {
    return this.productService.delete(id, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateProductDto: UpdateProductDTO,
    @Param('id') id,
    @Userparam() user: User,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto, user);
  }
}
