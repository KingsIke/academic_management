import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { User } from '../users/user.entity';
import { CurrentUser } from '../users/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.ts';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: { title: string; credits: number },
    @CurrentUser() user: User,
  ) {
    return this.coursesService.createCourse(dto, user);
  }

  @Get()
  getAll() {
    return this.coursesService.findAllCourses();
  }

  @Post('enroll')
  enroll(@Body() dto: { studentId: string; courseId: string }) {
    return this.coursesService.enroll(dto.studentId, dto.courseId);
  }

  @Post('approve/:id')
  approve(@Param('id') id: string, @CurrentUser() user: User) {
    return this.coursesService.approveEnrollment(id, user.id);
  }

  @Post('drop')
  drop(@Body() dto: { studentId: string; courseId: string }) {
    return this.coursesService.dropEnrollment(dto.studentId, dto.courseId);
  }
}
