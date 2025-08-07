import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  recommendCourses(interests: string[]) {
    return {
      recommendations: interests.map((i) => ({
        title: `${i} 101`,
        reason: `Popular in ${i}`,
      })),
    };
  }

  generateSyllabus(topic: string) {
    return {
      topic,
      outline: [
        `Week 1: Introduction to ${topic}`,
        'Week 2: Deep Dive',
        'Week 3: Projects',
        'Week 4: Review & Exam',
      ],
    };
  }
}
