import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
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
    return this.lessonRepository.findOne({ id })
  }

  getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find()
  }

  createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = lessonInput;

    const lesson = this.lessonRepository.create({
      id: uuidV7(),
      name,
      startDate,
      endDate
    })

    return this.lessonRepository.save(lesson)
  }
}
