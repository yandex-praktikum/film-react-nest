import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/films.dto';


@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { };
    @Get('/')
    findAll() {
        return this.filmsService.findAll;
    }
    @Get('/:id/schedule')
    findSchedule(@Param('id') id: string) {
        return this.filmsService.findById(id);
    }

    @Post('/')
    create(@Body() createFilmDto: CreateFilmsDto) {
        return this.filmsService.createFilm(createFilmDto);
    }

}

