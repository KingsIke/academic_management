import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { CoursesModule } from './courses/courses.module';
// import { AssignmentsModule } from './assignments/assignments.module';
// import { AiModule } from './ai/ai.module';
// import { TranscriptModule } from './transcript/transcript.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    //  / ConfigModule.forRoot({
    //    envFilePath: '.env',
    //   isGlobal: true,
    //   load: [emailConfig],
    // }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    //   TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: typeOrmConfig,
    //   inject: [ConfigService],
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '453622Ike',
      database: process.env.DB_NAME || 'academic_crm',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    // CoursesModule,
    // AssignmentsModule,
    // AiModule,
    // TranscriptModule,
  ],
})
export class AppModule {}
