import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Film, FilmDocument } from '../films/films.schema';
  import { CreateOrdersDto, TicketsDto } from './dto/order.dto';
  
  @Injectable()
  export class OrderService {
    constructor(
      @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
    ) {}
  
    async createOrder(orderDto: CreateOrdersDto): Promise<string> {
      const { tickets } = orderDto;
  
      for (const ticket of tickets) {
        await this.processTicket(ticket);
      }
  
      return `Билет куплен`;
    }
  
    async processTicket(ticket: TicketsDto): Promise<void> {
        const { film, session, row, seat } = ticket;
      
        const filmDoc = await this.findFilmById(film);
        const schedule = this.findSessionInFilm(filmDoc, session);
      
        const seatCode = this.getSeatCode(row, seat);
      
        if (schedule.taken.includes(seatCode)) {
          throw new BadRequestException(`Место ${seatCode} уже забронировано.`);
        }
      
        schedule.taken.push(seatCode);
        await filmDoc.save();
      }
  
    async findFilmById(filmId: string): Promise<FilmDocument> {
      const filmDoc = await this.filmModel.findOne({ id: filmId }).exec();
      if (!filmDoc) {
        throw new NotFoundException(`Фильм ${filmId} не найден.`);
      }
      return filmDoc;
    }
  
    private findSessionInFilm(filmDoc: FilmDocument, sessionId: string) {
      const schedule = filmDoc.schedule.find((s) => s.id === sessionId);
      if (!schedule) {
        throw new NotFoundException(`Такого сеанса нет ${sessionId} для фильма ${filmDoc.id}.`);
      }
      return schedule;
    }
  
    private getSeatCode(row: number, seat: number): string {
      return `${row}:${seat}`;
    }
  

  }
  