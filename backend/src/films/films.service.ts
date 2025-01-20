import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, Schedule } from './schemas/film.schema';
import { CreateFilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film | null> {
    const film = await this.filmModel.findOne({ id }).exec();
    return film;
  }

  async findSchedule(id: string): Promise<Schedule[]> {
    const film = await this.findById(id);
    return film ? film.schedule : [];
  }
}
