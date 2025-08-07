import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrollment]), UsersModule],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [TypeOrmModule],
})
export class CoursesModule {}
