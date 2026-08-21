"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StudentCard from "@/components/StudentCard";

type Student = {
  id: string;
  name: string;
  course: string;
  technology: string;
  age: number;
};

export default function Student() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading students...</h1>;
  }

  return (
    <main>
      <h1>Students</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
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
        ))
      )}
    </main>
  );
}