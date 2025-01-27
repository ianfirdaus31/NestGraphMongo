import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Repository } from 'typeorm';
import { v7 as uuidV7 } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>
  ) {}

  getLesson(id: string): Promise<Lesson | null> {
    // @ts-ignore
    return this.lessonRepository.findOne({ id });
  }

  createLesson(name: string, startDate: string, endDate: string): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuidV7(),
      name,
      startDate,
      endDate
    });

    return this.lessonRepository.save(lesson);
  }
}
