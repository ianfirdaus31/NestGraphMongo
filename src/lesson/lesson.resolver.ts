import { Query, Resolver } from "@nestjs/graphql";
import { LessonType } from "src/lesson/lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
  @Query(returns => LessonType)
  lesson() {
    return {
      id: '1',
      name: 'Physics Class',
      startDate: (new Date()).toISOString(),
      endDate: (new Date()).toISOString()
    }
  }
}