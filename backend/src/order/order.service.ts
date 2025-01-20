import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, TicketsI } from './dto/order.dto';
import { Order } from './schemas/order.schema';
import { FilmsService } from '../films/films.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly filmsService: FilmsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { email, phone, tickets } = createOrderDto;

    for (const ticket of tickets) {
      const { film: filmId, session: sessionId, row, seat } = ticket;

      const film = await this.filmsService.findById(filmId);
      if (!film) {
        throw new NotFoundException(`Film with ID ${filmId} not found`);
      }

      const session = film.schedule.find((s) => s.id === sessionId);
      if (!session) {
        throw new NotFoundException(`Session with ID ${sessionId} not found`);
      }

      const seatId = `${row}:${seat}`;
      if (session.taken.includes(seatId)) {
        throw new ConflictException(`Seat ${seatId} is already taken`);
      }

      session.taken.push(seatId);
      film.save();
    }

    const order = new this.orderModel({
      email,
      phone,
      tickets,
    });

    return order.save();
  }
}
