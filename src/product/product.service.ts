import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { ProductUpdate } from './interfaces/product-update.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAll(user: User): Promise<Product[]> {
    const products = await this.productModel.find({
      _user: user.id,
    });
    return products.map(product => product.name);
  }
  async findOne(id: string, user: User): Promise<Product> {
    const existProduct = await this.productModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existProduct) return existProduct.name;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        },
        404,
      );
  }

  async create(product: ProductUpdate, user: User): Promise<Product> {
    const newProduct = new this.productModel({
      _user: user.id,
      ...product,
    });
    return await newProduct.save();
  }

  async delete(id: string, user: User): Promise<Product> {
    const existProduct = await this.productModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existProduct) {
      return await this.productModel.findOneAndRemove(
        {
          _id: id,
          _user: user.id,
        },
        { useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to delete Product',
        },
        400,
      );
    }
  }

  async update(
    id: string,
    product: ProductUpdate,
    user: User,
  ): Promise<Product> {
    const existProduct = await this.productModel.findOne({
      _id: id,
      _user: user.id,
    });

    if (existProduct) {
      return await this.productModel.findOneAndUpdate(
        {
          _id: id,
          _user: user.id,
        },
        product,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Product',
        },
        400,
      );
    }
  }
}
