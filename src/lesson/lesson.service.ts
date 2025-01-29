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
    const { name, startDate, endDate, students } = lessonInput;

    const lesson = this.lessonRepository.create({
      id: uuidV7(),
      name,
      startDate,
      endDate,
      students
    })

    return this.lessonRepository.save(lesson)
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    // @ts-ignore
    const lesson = await this.lessonRepository.findOneOrFail({ id: lessonId })
    lesson.students = [...lesson.students, ...studentIds]

    return this.lessonRepository.save(lesson)
  }
}
