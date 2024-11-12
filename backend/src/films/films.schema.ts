import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop()
  daytime: string;

  @Prop()
  hall: number;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);


@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  director: string;

  @Prop()
  rating: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);