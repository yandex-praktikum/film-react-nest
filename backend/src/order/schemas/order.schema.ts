import { Schema, Document } from 'mongoose';

export interface Seat {
  row: number;
  seat: number;
}

export interface Ticket {
  filmId: string;
  sessionId: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export interface Order extends Document {
  email: string;
  phone: string; 
  tickets: Ticket[];
}

export const OrderSchema = new Schema<Order>({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  tickets: [
    {
      film: { type: String, required: true },
      session: { type: String, required: true },
      daytime: { type: String, required: true },
      day: { type: String, required: true },
      time: { type: String, required: true },
      row: { type: Number, required: true },
      seat: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});
