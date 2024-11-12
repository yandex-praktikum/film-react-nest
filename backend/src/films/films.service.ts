import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateFilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
    constructor(private readonly filmsRepository: FilmsRepository) { }

    async createFilm(createFilmDto: CreateFilmsDto) {
        return this.filmsRepository.create(createFilmDto);
    }
    async findAll() {
        return this.filmsRepository.findAll();
    }
    async findById(id: string) {
        return this.filmsRepository.findById(id);
    }
}
