import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Action } from './interfaces/action.interface';
import { ActionUpdate } from './interfaces/action-update.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class ActionService {
  constructor(
    @InjectModel('Action') private readonly actionModel: Model<Action>,
  ) {}

  async findAll(user: User): Promise<Action[]> {
    const actions = await this.actionModel.find({
      _user: user.id,
    });
    return actions.map(action => action.name);
  }
  async findOne(id: string, user: User): Promise<Action> {
    const existAction = await this.actionModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existAction) return existAction.name;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Action not found',
        },
        404,
      );
  }

  async create(action: ActionUpdate, user: User): Promise<Action> {
    const newAction = new this.actionModel({
      _user: user.id,
      ...action,
    });
    return await newAction.save();
  }

  async delete(id: string, user: User): Promise<Action> {
    const existAction = await this.actionModel.findOne({
      _id: id,
      _user: user.id,
    });
    if (existAction) {
      return await this.actionModel.findOneAndRemove(
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
          error: 'Unable to delete Action',
        },
        400,
      );
    }
  }

  async update(id: string, action: ActionUpdate, user: User): Promise<Action> {
    const existAction = await this.actionModel.findOne({
      _id: id,
      _user: user.id,
    });

    if (existAction) {
      return await this.actionModel.findOneAndUpdate(
        {
          _id: id,
          _user: user.id,
        },
        action,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Action',
        },
        400,
      );
    }
  }
}
