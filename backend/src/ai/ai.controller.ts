import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('recommend')
  recommend(@Body() dto: { interests: string[] }) {
    return this.aiService.recommendCourses(dto.interests);
  }

  @Post('syllabus')
  generate(@Body() dto: { topic: string }) {
    return this.aiService.generateSyllabus(dto.topic);
  }
}
