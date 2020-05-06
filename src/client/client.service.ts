import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './interfaces/client.interface';
import { Company } from '../company/interfaces/comany.interface';
import { ClientUpdate } from './interfaces/client-update.interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async findAll(): Promise<Client[]> {
    const clients = await this.clientModel.find();
    return clients;
  }
  async findByCompany(company: string): Promise<Client> {
    const existCompany = await this.companyModel.findOne({
      _id: company,
    });

    if (!existCompany)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Company not found',
        },
        404,
      );

    const clients = await this.clientModel.find({
      _company: company,
    });

    return clients;
  }

  async findByIden(identification: string): Promise<Client> {
    const existClient = await this.clientModel.findOne({
      identification,
    });

    if (existClient) return existClient;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Client not found',
        },
        404,
      );
  }

  async findByName(name: string): Promise<Client[]> {
    const existClient = await this.clientModel.find({
      name: { $regex: name, $options: 'i' },
    });

    if (existClient) return existClient;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Client not found',
        },
        404,
      );
  }

  async create(client: Client): Promise<Client> {
    const newClient = new this.clientModel({
      ...client,
    });
    return await newClient.save();
  }

  async delete(id: string): Promise<Client> {
    const existClient = await this.clientModel.findOne({
      _id: id,
    });
    if (existClient) {
      return await this.clientModel.findOneAndRemove(
        {
          _id: id,
        },
        { useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to delete Client',
        },
        400,
      );
    }
  }

  async update(id: string, client: ClientUpdate): Promise<Client> {
    const existClient = await this.clientModel.findOne({
      _id: id,
    });

    if (existClient) {
      return await this.clientModel.findOneAndUpdate(
        {
          _id: id,
        },
        client,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Client',
        },
        400,
      );
    }
  }
}
