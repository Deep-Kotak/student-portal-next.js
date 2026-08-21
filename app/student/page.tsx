import Link from "next/link";
import StudentCard from "@/components/StudentCard";
import { students } from "@/data/students";

export default function Student() {
  return (
    <main>
      <h1>Students</h1>

      {students.map((student) => (
        <div key={student.id}>
          <StudentCard
            name={student.name}
            course={student.course}
            technology={student.technology}
            age={student.age}
          />

          <Link href={`/student/${student.id}`}>
            View Student
          </Link>

          <hr />
        </div>
      ))}
    </main>
  );
}