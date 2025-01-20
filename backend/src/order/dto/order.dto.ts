export class CreateOrderDto {
  email: string;
  phone: number;
  tickets: TicketsI[];
}

export type TicketsI = {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
};
