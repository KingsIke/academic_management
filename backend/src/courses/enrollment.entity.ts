import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from './course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  student: User;

  @Column()
  status: 'pending' | 'approved' | 'rejected';
}
