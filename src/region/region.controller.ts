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
import { CreateRegionDTO } from './dto/create-region.dto';
import { UpdateRegionDTO } from './dto/update-region.dto';
import { RegionService } from './region.service';
import { Region } from './interfaces/region.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id): Promise<Region> {
    return this.regionService.findOne(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRegionDto: CreateRegionDTO): Promise<Region> {
    return this.regionService.create(createRegionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id): Promise<Region> {
    return this.regionService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateRegionDto: UpdateRegionDTO,
    @Param('id') id,
  ): Promise<Region> {
    return this.regionService.update(id, updateRegionDto);
  }
}
