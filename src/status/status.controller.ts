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
import { CreateStatusDTO } from './dto/create-status.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { StatusService } from './status.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/interfaces/user.interface';
import { Status } from './interfaces/status.interface';
import { Userparam } from '../user/decorators/user.decorator';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Userparam() user: User): Promise<Status[]> {
    return this.statusService.findAll(user);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id, @Userparam() user: User): Promise<Status> {
    return this.statusService.findOne(id, user);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createStatusDto: CreateStatusDTO,
    @Userparam() user: User,
  ): Promise<Status> {
    return this.statusService.create(createStatusDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id, @Userparam() user: User): Promise<Status> {
    return this.statusService.delete(id, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateStatusDto: UpdateStatusDTO,
    @Param('id') id,
    @Userparam() user: User,
  ): Promise<Status> {
    return this.statusService.update(id, updateStatusDto, user);
  }
}
