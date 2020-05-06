import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from './interfaces/status.interface';
import { StatusUpdate } from './interfaces/status-update.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel('Status') private readonly statusModel: Model<Status>,
  ) {}

  async findAll(user: User): Promise<Status[]> {
    const status = await this.statusModel.find({
      _user: user.id,
    });
    return status.map(stat => stat.name);
  }
  async findOne(id: string, user: User): Promise<Status> {
    const existStatus = await this.statusModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existStatus) return existStatus.name;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Status not found',
        },
        404,
      );
  }

  async create(status: StatusUpdate, user: User): Promise<Status> {
    const newStatus = new this.statusModel({
      _user: user.id,
      ...status,
    });
    return await newStatus.save();
  }

  async delete(id: string, user: User): Promise<Status> {
    const existStatus = await this.statusModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existStatus) {
      return await this.statusModel.findOneAndRemove(
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
          error: 'Unable to delete Status',
        },
        400,
      );
    }
  }

  async update(id: string, status: StatusUpdate, user: User): Promise<Status> {
    const existStatus = await this.statusModel.findOne({
      _id: id,
      _user: user.id,
    });

    if (existStatus) {
      return await this.statusModel.findOneAndUpdate(
        {
          _id: id,
          _user: user.id,
        },
        status,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Status',
        },
        400,
      );
    }
  }
}
