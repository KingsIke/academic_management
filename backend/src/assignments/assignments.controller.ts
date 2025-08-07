import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentsService: AssignmentsService) {}

  @Post('submit')
  submit(@Body() dto: { courseId: string; studentId: string; file: string }) {
    return this.assignmentsService.submit(dto);
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
}
