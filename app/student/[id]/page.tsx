"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
  course: string;
  technology: string;
  age: number;
};

export default function StudentDetail() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [technology, setTechnology] = useState("");
  const [age, setAge] = useState("");

  // Update states
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`);

        if (!response.ok) {
          setStudent(null);
          return;
        }

        const data = await response.json();

        setStudent(data);

        setName(data.name);
        setCourse(data.course);
        setTechnology(data.technology);
        setAge(String(data.age));
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("Unable to load student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Update student
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setUpdating(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
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

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setStudent(data.student);
      setMessage("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      setError("Unable to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!student) {
    return <h1>Student not found</h1>;
  }

  return (
    <main>
      <h1>Student Details</h1>

      <p>Name: {student.name}</p>
      <p>Course: {student.course}</p>
      <p>Technology: {student.technology}</p>
      <p>Age: {student.age}</p>

      <hr />

      <h2>Edit Student</h2>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}

      <form onSubmit={handleUpdate}>
        <div>
          <label>Name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            min="1"
            max="100"
            required
          />
        </div>

        <br />

        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Student"}
        </button>
      </form>

      <br />

      <button onClick={() => router.push("/student")}>
        Back to Students
      </button>
    </main>
  );
}