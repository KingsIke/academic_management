import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard.ts';

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentsService: AssignmentsService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  async submit(
    @Body() dto: { courseId: string; studentId: string; file: string },
    @CurrentUser() user: User,
  ) {
    return this.assignmentsService.submit(dto, user);
  }

  @Post('grade/:id')
  grade(
    @Param('id') id: string,
    @Body() dto: { grade: number },
    @CurrentUser() user: User,
  ) {
    return this.assignmentsService.grade(id, dto.grade, user.id);
  }

  @Get('student/:id')
  byStudent(@Param('id') id: string) {
    return this.assignmentsService.getByStudent(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    dto: {
      courseId: string;
      title: string;
      description?: string;
      dueDate?: string;
    },
    @CurrentUser() user: User,
  ) {
    return this.assignmentsService.create({
      ...dto,
      lecturerId: user.id,
    });
  }
}
