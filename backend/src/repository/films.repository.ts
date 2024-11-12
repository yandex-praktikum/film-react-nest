import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetScheduleDto,GetFilmsDto, CreateFilmsDto } from '../films/dto/films.dto'; 
import { Film, FilmDocument } from '../films/films.schema'; 
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<GetFilmsDto[]> {
    const films = await this.filmModel.find({}).lean().exec(); 

    if (!films || films.length === 0) {
      throw new NotFoundException('Не найден фильм для показа');
    }

    return films.map((film) => this.mapFilmToDto(film));
  }

  async findById(id: string): Promise<GetScheduleDto[]> {
    const film = await this.filmModel.findOne({ id }).lean().exec();

    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }

    return film.schedule;
  }

  async findFilm(id: string): Promise<GetFilmsDto | null> {
    const film = await this.filmModel.findOne({ id }).lean().exec();
    return film ? this.mapFilmToDto(film) : null;
  }
 async create(createFilmDto: CreateFilmsDto): Promise<GetFilmsDto> {
    const newFilm = new this.filmModel(createFilmDto);
    const savedFilm = await newFilm.save();
    return this.mapFilmToDto(savedFilm);
  }

  private mapFilmToDto(film: any): GetFilmsDto {
      return {
          id: film.id,
          rating: film.rating,
          director: film.director,
          tags: film.tags,
          image: film.image,
          cover: film.cover,
          title: film.title,
          about: film.about,
          description: film.description,
          schedule: film.schedule,
      };
  }
}