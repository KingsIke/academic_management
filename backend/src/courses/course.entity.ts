import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  credits: number;

  @ManyToOne(() => User, {
    nullable: false,
    eager: true,
  })
  lecturer: User;

  @Column({ nullable: true })
  syllabus: string;
}
