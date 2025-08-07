import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  async submit(data: { courseId: string; studentId: string; file: string }) {
    const student = await this.userRepo.findOne({
      where: { id: data.studentId },
    });
    if (!student || student.role !== 'student')
      throw new ForbiddenException('Only students can submit assignments');

    const course = await this.courseRepo.findOne({
      where: { id: data.courseId },
    });
    if (!course) throw new NotFoundException('Course not found');

    const assignment = this.assignmentRepo.create({
      studentId: student,
      courseId: course,
      file: data.file,
    });
    return this.assignmentRepo.save(assignment);
  }

  async grade(id: string, grade: number, lecturerId: string) {
    const lecturer = await this.userRepo.findOne({ where: { id: lecturerId } });
    if (!lecturer || lecturer.role !== 'lecturer')
      throw new ForbiddenException('Only lecturers can grade assignments');

    const assignment = await this.assignmentRepo.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!assignment) throw new NotFoundException('Assignment not found');

    assignment.grade = grade;
    return this.assignmentRepo.save(assignment);
  }

  async getByStudent(studentId: string) {
    return this.assignmentRepo.find({
      where: { studentId: { id: studentId } },
      relations: ['course'],
    });
  }
}
