import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createCourse(data: { title: string; credits: number }, user: User) {
    if (user.role !== 'lecturer')
      throw new ForbiddenException('Only lecturers can create courses');

    const course = this.courseRepo.create({
      title: data.title,
      credits: data.credits,
      lecturer: user as User,
    });
    return this.courseRepo.save(course);
  }
  async findAllCourses() {
    return this.courseRepo.find({ relations: ['lecturer'] });
  }

  async enroll(studentId: string, courseId: string) {
    const student = await this.userRepo.findOne({ where: { id: studentId } });
    if (!student || student.role !== 'student')
      throw new ForbiddenException('Only students can enroll');

    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = this.enrollmentRepo.create({
      student,
      course,
      status: 'pending',
    });
    return this.enrollmentRepo.save(enrollment);
  }

  async approveEnrollment(enrollmentId: string, adminId: string) {
    const admin = await this.userRepo.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== 'admin')
      throw new ForbiddenException('Only admins can approve enrollments');
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id: enrollmentId },
      relations: ['course', 'student'],
    });

    enrollment.status = 'approved';
    return this.enrollmentRepo.save(enrollment);
  }

  async dropEnrollment(studentId: string, courseId: string) {
    return this.enrollmentRepo.delete({
      student: { id: studentId } as User,
      course: { id: courseId } as Course,
    });
  }
}
