//TODO реализовать DTO для /orders
export class TicketsDto {
    film: string;
    session: string;
    daytime: string;
    day: string;
    time: string;
    row: number;
    seat: number;
    price: number;
  }
  
  export class CreateOrdersDto {
    email: string;
    phone: string;
    tickets: TicketsDto[];
  }