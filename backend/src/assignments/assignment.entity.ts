import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course)
  courseId: Course;

  @ManyToOne(() => User)
  studentId: User;

  @Column({ nullable: true })
  file: string; // filepath

  @Column({ nullable: true })
  grade: number;
}
