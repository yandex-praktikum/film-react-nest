import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const allFilms = await this.filmsService.findAll();
    return { items: allFilms };
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string) {
    const oneFilm = await this.filmsService.findSchedule(id);
    return { items: oneFilm };
  }
}
