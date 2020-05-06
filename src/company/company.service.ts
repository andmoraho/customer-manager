import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/comany.interface';
import { CompanyUpdate } from './interfaces/company-update.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async findAll(region: string): Promise<Company[]> {
    const companies = await this.companyModel.find({
      _region: region,
    });
    return companies;
  }
  async findOne(region: string, id: string): Promise<Company> {
    const existCompany = await this.companyModel.findOne({
      _id: id,
      _region: region,
    });
    if (existCompany) return existCompany;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Company not found',
        },
        404,
      );
  }

  async create(company: Company): Promise<Company> {
    const newCompany = new this.companyModel({
      ...company,
    });
    return await newCompany.save();
  }

  async delete(id: string): Promise<Company> {
    const existCompany = await this.companyModel.findOne({
      _id: id,
    });
    if (existCompany) {
      return await this.companyModel.findOneAndRemove(
        {
          _id: id,
        },
        { useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to delete Company',
        },
        400,
      );
    }
  }

  async update(
    region: string,
    id: string,
    company: CompanyUpdate,
  ): Promise<Company> {
    const existCompany = await this.companyModel.findOne({
      _id: id,
      _region: region,
    });

    if (existCompany) {
      return await this.companyModel.findOneAndUpdate(
        {
          _id: id,
          _region: region,
        },
        company,
        { new: true, useFindAndModify: false },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update Company',
        },
        400,
      );
    }
  }
}
