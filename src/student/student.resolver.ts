import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "src/student/create-student.input";
import { StudentService } from "src/student/student.service";
import { StudentType } from "src/student/student.type";

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService
  ) {}

  @Query(returns => StudentType)
  student(
    @Args('id') id: string
  ) {
    return this.studentService.getStudent(id)
  }

  @Query(returns => [StudentType])
  students() {
    return this.studentService.getStudents()
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('studentInput') studentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(studentInput)
  }
}