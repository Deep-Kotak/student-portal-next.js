import { notFound } from "next/navigation";
import { students } from "@/data/students";

export default async function StudentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    notFound();
  }

  return (
    <main>
      <h1>Student Details</h1>

      <p>Name: {student.name}</p>
      <p>Course: {student.course}</p>
      <p>Technology: {student.technology}</p>
      <p>Age: {student.age}</p>
    </main>
  );
}