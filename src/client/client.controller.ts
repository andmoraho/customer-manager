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
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';
import { ClientService } from './client.service';
import { Client } from './interfaces/client.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }
  @Get('company/:company')
  @UseGuards(AuthGuard)
  findByCompany(@Param() params): Promise<Client> {
    return this.clientService.findByCompany(params.company);
  }
  @Get('identification/:identification')
  @UseGuards(AuthGuard)
  findByIden(@Param() params): Promise<Client> {
    return this.clientService.findByIden(params.identification);
  }
  @Get('name/:name')
  @UseGuards(AuthGuard)
  findByName(@Param() params): Promise<Client[]> {
    return this.clientService.findByName(params.name);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createClientDto: CreateClientDTO): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id): Promise<Client> {
    return this.clientService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateClientDto: UpdateClientDTO,
    @Param() params,
  ): Promise<Client> {
    return this.clientService.update(params.id, updateClientDto);
  }
}
