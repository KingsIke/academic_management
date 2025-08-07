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

  async submit(
    dto: { courseId: string; studentId: string; file: string },
    user: User,
  ) {
    console.log('DTO:', dto);
    console.log('User:', user);

    if (user.role !== 'student') {
      throw new ForbiddenException('Only students can submit assignments');
    }

    const course = await this.courseRepo.findOne({
      where: { id: dto.courseId },
    });
    console.log('Course:', course);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const assignment = this.assignmentRepo.create({
      student: user,
      course,
      file: dto.file,
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

  async getByStudent(student: string) {
    return this.assignmentRepo.find({
      where: { student: { id: student } },
      relations: ['course'],
    });
  }

  async create(data: {
    courseId: string;
    lecturerId: string;
    title: string;
    description?: string;
    dueDate?: string;
  }) {
    const lecturer = await this.userRepo.findOne({
      where: { id: data.lecturerId },
    });
    if (!lecturer || lecturer.role !== 'lecturer') {
      throw new ForbiddenException('Only lecturers can create assignments');
    }

    const course = await this.courseRepo.findOne({
      where: { id: data.courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const assignment = this.assignmentRepo.create({
      course,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    });

    return this.assignmentRepo.save(assignment);
  }
}
