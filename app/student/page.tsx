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

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [technology, setTechnology] = useState("");
  const [age, setAge] = useState("");

  // Fetch students
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load students when page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        course,
        technology,
        age: Number(age),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Student added successfully!");

      setName("");
      setCourse("");
      setTechnology("");
      setAge("");

      fetchStudents();
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  // Delete student
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert("Student deleted successfully!");

      fetchStudents();
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  if (loading) {
    return <h1>Loading students...</h1>;
  }

  return (
    <main>
      <h1>Students</h1>

      {/* Add Student Form */}
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>

        <br />

        <div>
          <label>Course</label>
          <br />

          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course"
            required
          />
        </div>

        <br />

        <div>
          <label>Technology</label>
          <br />

          <input
            type="text"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            placeholder="Enter technology"
            required
          />
        </div>

        <br />

        <div>
          <label>Age</label>
          <br />

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            required
          />
        </div>

        <br />

        <button type="submit">Add Student</button>
      </form>

      <hr />

      {/* Student List */}
      <h2>Student List</h2>

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

            {" "}

            <button onClick={() => handleDelete(student.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </main>
  );
}