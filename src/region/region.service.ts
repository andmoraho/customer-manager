import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './interfaces/region.interface';
import { RegionUpdate } from './interfaces/region-update.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel('Region') private readonly regionModel: Model<Region>,
  ) {}

  async findAll(): Promise<Region[]> {
    const regions = await this.regionModel.find();
    return regions.map(region => region.name);
  }
  async findOne(id: string): Promise<Region> {
    const existRegion = await this.regionModel.findOne({
      _id: id,
    });
    if (existRegion) return existRegion.name;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Region not found',
        },
        404,
      );
  }

  async create(region: RegionUpdate): Promise<Region> {
    const newRegion = new this.regionModel({
      ...region,
    });
    return await newRegion.save();
  }

  async delete(id: string): Promise<Region> {
    const existRegion = await this.regionModel.findOne({
      _id: id,
    });
    if (existRegion) {
      return await this.regionModel.findOneAndRemove(
        {
          _id: id,
        },
        { useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to delete Region',
        },
        400,
      );
    }
  }

  async update(id: string, region: RegionUpdate): Promise<Region> {
    const existRegion = await this.regionModel.findOne({
      _id: id,
    });

    if (existRegion) {
      return await this.regionModel.findOneAndUpdate(
        {
          _id: id,
        },
        region,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Region',
        },
        400,
      );
    }
  }
}
