//TODO описать DTO для запросов к /films

export class GetScheduleDto {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
}

export class GetFilmsDto {
    id: string;
    rating: number;
    director: string;
    tags: string[];
    title: string;
    about: string;
    description: string;
    image: string;
    cover: string;
    schedule: GetScheduleDto[];
}

export class CreateFilmsDto {
    rating: number;
    director: string;
    tags: string[];
    image: string;
    cover: string;
    title: string;
    about: string;
    description: string;
    schedule: GetScheduleDto[];
}