"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/catalyst/button";

import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/catalyst/description-list";

import {
  Field,
  FieldGroup,
  Label,
} from "@/components/catalyst/fieldset";

import { Heading, Subheading } from "@/components/catalyst/heading";

import { Input } from "@/components/catalyst/input";

import { Badge } from "@/components/catalyst/badge";

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

export default function StudentDetail() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  // =========================
  // Student State
  // =========================

  const [student, setStudent] = useState<Student | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =========================
  // Form State
  // =========================

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [technology, setTechnology] = useState("");
  const [age, setAge] = useState("");

  // =========================
  // Alert State
  // =========================

  const [alertType, setAlertType] = useState<
    "success" | "error" | null
  >(null);

  const [alertMessage, setAlertMessage] = useState("");

  // =========================
  // Fetch Student
  // =========================

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `/api/students/${id}`
        );

        if (!response.ok) {
          setStudent(null);
          return;
        }

        const data = await response.json();

        setStudent(data);

        // Fill edit form
        setName(data.name);
        setCourse(data.course);
        setTechnology(data.technology);
        setAge(String(data.age));
      } catch (error) {
        console.error(
          "Error fetching student:",
          error
        );

        setAlertType("error");
        setAlertMessage(
          "Unable to load student information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // =========================
  // Update Student
  // =========================

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const response = await fetch(
        `/api/students/${id}`,
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAlertType("error");

        setAlertMessage(
          data.message ||
            "Unable to update student."
        );

        return;
      }

      // Update student data on screen
      setStudent(data.student);

      // Update form values
      setName(data.student.name);
      setCourse(data.student.course);
      setTechnology(
        data.student.technology
      );
      setAge(String(data.student.age));

      // Success alert
      setAlertType("success");

      setAlertMessage(
        "Student updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating student:",
        error
      );

      setAlertType("error");

      setAlertMessage(
        "Unable to connect to server."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // Loading UI
  // =========================

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-zinc-500">
              Loading student...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Student Not Found
  // =========================

  if (!student) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <Heading>
            Student Not Found
          </Heading>

          <p className="mt-2 text-sm text-zinc-500">
            The student you are looking for does
            not exist or may have been deleted.
          </p>

          <div className="mt-6">
            <Button
              onClick={() =>
                router.push("/student")
              }
            >
              Back to Students
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Main UI
  // =========================

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* =========================
          Header
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading>
            Student Details
          </Heading>

          <p className="mt-2 text-sm text-zinc-500">
            View and update student information.
          </p>
        </div>

        <Button
          outline
          onClick={() =>
            router.push("/student")
          }
        >
          Back to Students
        </Button>
      </div>

      {/* =========================
          Student Information
      ========================= */}

      <div className="mt-8 rounded-2xl border border-zinc-950/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {student.name}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {student.course}
            </p>
          </div>

          <Badge color="blue">
            {student.technology}
          </Badge>
        </div>

        <div className="mt-6">
          <DescriptionList>
            <DescriptionTerm>
              Name
            </DescriptionTerm>

            <DescriptionDetails>
              {student.name}
            </DescriptionDetails>

            <DescriptionTerm>
              Course
            </DescriptionTerm>

            <DescriptionDetails>
              {student.course}
            </DescriptionDetails>

            <DescriptionTerm>
              Technology
            </DescriptionTerm>

            <DescriptionDetails>
              {student.technology}
            </DescriptionDetails>

            <DescriptionTerm>
              Age
            </DescriptionTerm>

            <DescriptionDetails>
              {student.age} years
            </DescriptionDetails>
          </DescriptionList>
        </div>
      </div>

      {/* =========================
          Edit Student
      ========================= */}

      <div className="mt-10">
        <Subheading>
          Edit Student
        </Subheading>

        <p className="mt-1 text-sm text-zinc-500">
          Update the student's information below.
        </p>

        <form
          onSubmit={handleUpdate}
          className="mt-5 rounded-2xl border border-zinc-950/10 bg-white p-6 shadow-sm"
        >
          <FieldGroup>
            {/* Name */}

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

            {/* Course */}

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

            {/* Technology */}

            <Field>
              <Label>
                Technology
              </Label>

              <Input
                type="text"
                value={technology}
                onChange={(e) =>
                  setTechnology(
                    e.target.value
                  )
                }
                placeholder="Enter technology"
                required
              />
            </Field>

            {/* Age */}

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

            {/* Update Button */}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Student"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>

      {/* =========================
          Success / Error Alert
      ========================= */}

      <Alert
        open={alertType !== null}
        onClose={() =>
          setAlertType(null)
        }
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
            ? "The student information has been updated successfully."
            : "Please check the information and try again."}
        </AlertBody>

        <AlertActions>
          <Button
            onClick={() =>
              setAlertType(null)
            }
          >
            OK
          </Button>
        </AlertActions>
      </Alert>
    </main>
  );
}