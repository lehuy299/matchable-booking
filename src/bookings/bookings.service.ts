import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entites/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDTO } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async findBookings(userId: number): Promise<BookingEntity[]> {
    const query = this.bookingRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.user', 'u')
      .leftJoinAndSelect('b.trainerSession', 'ts')
      .leftJoinAndSelect('ts.trainer', 't')
      .leftJoinAndSelect('ts.session', 's')
      .andWhere('u.id = :userId', { userId });

    const result = await query.getMany();
    return result.map((booking) => ({
      ...booking,
      user: null,
    }));
  }

  async createBookings(
    userId: number,
    bookings: CreateBookingDTO[],
  ): Promise<BookingEntity[]> {
    return this.bookingRepository.save(bookings.map((b) => ({ userId, ...b })));
  }
}
