import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentInput } from "src/lesson/assign-student.input";
import { Lesson } from "src/lesson/lesson.entity";
import { StudentService } from "src/student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {}

  @Query(returns => LessonType)
  lesson(
    @Args('id') id: string
  ) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('lessonInput') lessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentInput') assignStudentInput: AssignStudentInput,
  ) {
    const { lessonId, studentIds } = assignStudentInput
    
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  students(
    @Parent() lesson: Lesson
  ) {
    return this.studentService.getManyStudents(lesson.students)
  }
}