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
import { CreateActionDTO } from './dto/create-action.dto';
import { UpdateActionDTO } from './dto/update-action.dto';
import { ActionService } from './action.service';
import { Action } from './interfaces/action.interface';
import { User } from '../user/interfaces/user.interface';
import { AuthGuard } from '../auth/auth.guard';
import { Userparam } from '../user/decorators/user.decorator';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Userparam() user: User): Promise<Action[]> {
    return this.actionService.findAll(user);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id, @Userparam() user: User): Promise<Action> {
    return this.actionService.findOne(id, user);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createActionDto: CreateActionDTO,
    @Userparam() user: User,
  ): Promise<Action> {
    return this.actionService.create(createActionDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id, @Userparam() user: User): Promise<Action> {
    return this.actionService.delete(id, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateActionDto: UpdateActionDTO,
    @Param('id') id,
    @Userparam() user: User,
  ): Promise<Action> {
    return this.actionService.update(id, updateActionDto, user);
  }
}
