"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/catalyst/button";
import {
  Field,
  Label,
  FieldGroup,
} from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Badge } from "@/components/catalyst/badge";

import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "@/components/catalyst/dialog";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertActions,
} from "@/components/catalyst/alert";

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
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [technology, setTechnology] = useState("");
  const [age, setAge] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(
    null
  );

  const [alertType, setAlertType] = useState<
    "success" | "error" | null
  >(null);

  const [alertMessage, setAlertMessage] = useState("");

  // =========================
  // Fetch Students
  // =========================

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch students"
        );
      }

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);

      setAlertType("error");
      setAlertMessage("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load Students
  // =========================

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // Add Student
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
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

      if (!response.ok) {
        setAlertType("error");
        setAlertMessage(
          data.message || "Something went wrong"
        );

        return;
      }

      setAlertType("success");
      setAlertMessage("Student added successfully!");

      // Clear form
      setName("");
      setCourse("");
      setTechnology("");
      setAge("");

      // Refresh students
      await fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);

      setAlertType("error");
      setAlertMessage("Unable to connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // Delete Student
  // =========================

  const handleDelete = async () => {
    if (!deleteStudentId) {
      return;
    }

    setDeletingId(deleteStudentId);

    try {
      const response = await fetch(
        `/api/students/${deleteStudentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAlertType("error");

        setAlertMessage(
          data.message || "Unable to delete student"
        );

        return;
      }

      setAlertType("success");

      setAlertMessage(
        "Student deleted successfully!"
      );

      // Close delete dialog
      setDeleteStudentId(null);

      // Refresh students
      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);

      setAlertType("error");
      setAlertMessage("Unable to connect to server");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // Loading UI
  // =========================

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-zinc-500">
              Loading students...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Main UI
  // =========================

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
          Students
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your students and their information.
        </p>
      </div>

      {/* =========================
          Add Student
      ========================= */}

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-950">
          Add Student
        </h2>

        <p className="mt-1 mb-6 text-sm text-zinc-500">
          Enter the student information below.
        </p>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label>Name</Label>

              <Input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter name"
                required
              />
            </Field>

            <Field>
              <Label>Course</Label>

              <Input
                type="text"
                value={course}
                onChange={(e) =>
                  setCourse(e.target.value)
                }
                placeholder="Enter course"
                required
              />
            </Field>

            <Field>
              <Label>Technology</Label>

              <Input
                type="text"
                value={technology}
                onChange={(e) =>
                  setTechnology(e.target.value)
                }
                placeholder="Enter technology"
                required
              />
            </Field>

            <Field>
              <Label>Age</Label>

              <Input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
                placeholder="Enter age"
                min="1"
                max="100"
                required
              />
            </Field>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Adding..."
                  : "Add Student"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>

      {/* =========================
          Student List Header
      ========================= */}

      <div className="mb-5 mt-10">
        <h2 className="text-xl font-semibold text-zinc-950">
          Student List
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          All students currently registered in
          the portal.
        </p>
      </div>

      {/* =========================
          Student List
      ========================= */}

      {students.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-lg font-semibold text-zinc-950">
              No Students Found
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              There are no students in the database
              yet. Add your first student using the
              form above.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Student Header */}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold text-zinc-950">
                    {student.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {student.course}
                  </p>
                </div>

                <Badge color="blue">
                  {student.technology}
                </Badge>
              </div>

              {/* Age */}

              <div className="mt-5">
                <p className="text-sm text-zinc-500">
                  Age
                </p>

                <p className="font-medium text-zinc-950">
                  {student.age} years
                </p>
              </div>

              {/* Actions */}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/student/${student.id}`}
                  className="flex-1"
                >
                  <Button className="w-full">
                    View Student
                  </Button>
                </Link>

                <Button
                  color="red"
                  className="flex-1"
                  onClick={() =>
                    setDeleteStudentId(
                      student.id
                    )
                  }
                  disabled={deletingId !== null}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          Delete Confirmation Dialog
      ========================= */}

      <Dialog
        open={deleteStudentId !== null}
        onClose={() => {
          if (deletingId === null) {
            setDeleteStudentId(null);
          }
        }}
      >
        <DialogTitle>
          Delete Student
        </DialogTitle>

        <DialogDescription>
          Are you sure you want to delete this
          student?
        </DialogDescription>

        <DialogBody>
          <p className="text-sm text-zinc-500">
            This student will be permanently
            deleted. This action cannot be undone.
          </p>
        </DialogBody>

        <DialogActions>
          <Button
            outline
            onClick={() =>
              setDeleteStudentId(null)
            }
            disabled={deletingId !== null}
          >
            Cancel
          </Button>

          <Button
            color="red"
            onClick={handleDelete}
            disabled={deletingId !== null}
          >
            {deletingId !== null
              ? "Deleting..."
              : "Delete Student"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================
          Success / Error Alert
      ========================= */}

      <Alert
        open={alertType !== null}
        onClose={() => setAlertType(null)}
      >
        <AlertTitle>
          {alertType === "success"
            ? "Success"
            : "Error"}
        </AlertTitle>

        <AlertDescription>
          {alertMessage}
        </AlertDescription>

        <AlertBody>
          {alertType === "success"
            ? "Your operation was completed successfully."
            : "Please check the information and try again."}
        </AlertBody>

        <AlertActions>
          <Button
            onClick={() => setAlertType(null)}
          >
            OK
          </Button>
        </AlertActions>
      </Alert>
    </main>
  );
}