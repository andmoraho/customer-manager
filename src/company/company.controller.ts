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
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { CompanyService } from './company.service';
import { Company } from './interfaces/comany.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get(':region')
  @UseGuards(AuthGuard)
  findAll(@Param('region') region): Promise<Company[]> {
    return this.companyService.findAll(region);
  }
  @Get(':region/:id')
  @UseGuards(AuthGuard)
  findOne(@Param() params): Promise<Company> {
    return this.companyService.findOne(params.region, params.id);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCompanyDto: CreateCompanyDTO): Promise<Company> {
    return this.companyService.create(createCompanyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id): Promise<Company> {
    return this.companyService.delete(id);
  }

  @Put(':region/:id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateCompanyDto: UpdateCompanyDTO,
    @Param() params,
  ): Promise<Company> {
    return this.companyService.update(
      params.region,
      params.id,
      updateCompanyDto,
    );
  }
}
