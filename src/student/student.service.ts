import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from 'src/student/create-student.input';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) {}

  getStudent(id: string): Promise<Student> {
    // @ts-ignore
    return this.studentRepository.findOne({ id });
  }

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  createStudent(inputStudet: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = inputStudet;

    const student = this.studentRepository.create({
      id: uuidV4(),
      firstName,
      lastName
    });

    return this.studentRepository.save(student);
  }

  getManyStudents(studentIds: string[]): Promise<Student[]> {
    return studentIds ? 
      this.studentRepository.find({
        where: {
          id: {
            // @ts-ignore
            $in: studentIds
          }
        }
      }) :
      this.studentRepository.find();
  }
}
