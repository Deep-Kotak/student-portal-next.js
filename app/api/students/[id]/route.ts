import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const studentRef = doc(db, "students", id);
  const studentSnap = await getDoc(studentRef);

  if (!studentSnap.exists()) {
    return Response.json(
      {
        message: "Student not found",
      },
      {
        status: 404,
      }
    );
  }

  return Response.json({
    id: studentSnap.id,
    ...studentSnap.data(),
  });
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  if (!body.name || !body.course || !body.technology) {
    return Response.json(
      {
        message: "Name, course and technology are required",
      },
      {
        status: 400,
      }
    );
  }

  if (
    typeof body.age !== "number" ||
    body.age < 1 ||
    body.age > 100
  ) {
    return Response.json(
      {
        message: "Age must be a number between 1 and 100",
      },
      {
        status: 400,
      }
    );
  }

  const studentRef = doc(db, "students", id);

  const studentSnap = await getDoc(studentRef);

  if (!studentSnap.exists()) {
    return Response.json(
      {
        message: "Student not found",
      },
      {
        status: 404,
      }
    );
  }

  await updateDoc(studentRef, {
    name: body.name,
    course: body.course,
    technology: body.technology,
    age: body.age,
  });

  return Response.json({
    message: "Student updated successfully",
    student: {
      id,
      name: body.name,
      course: body.course,
      technology: body.technology,
      age: body.age,
    },
  });
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const studentRef = doc(db, "students", id);

  const studentSnap = await getDoc(studentRef);

  if (!studentSnap.exists()) {
    return Response.json(
      {
        message: "Student not found",
      },
      {
        status: 404,
      }
    );
  }

  await deleteDoc(studentRef);

  return Response.json({
    message: "Student deleted successfully",
    id,
  });
}