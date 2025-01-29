import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentInput {
  @IsUUID("all")
  @Field(type => ID)
  lessonId: string;

  @IsUUID("all", { each: true })
  @Field(type => [ID])
  studentIds: string[];
}