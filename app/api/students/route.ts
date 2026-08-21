import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

export async function GET() {
  const snapshot = await getDocs(
    collection(db, "students")
  );

  const students = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json(students);
}

export async function POST(request: Request) {
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

  const docRef = await addDoc(
    collection(db, "students"),
    {
      name: body.name,
      course: body.course,
      technology: body.technology,
      age: body.age,
    }
  );

  return Response.json(
    {
      message: "Student created successfully",
      student: {
        id: docRef.id,
        ...body,
      },
    },
    {
      status: 201,
    }
  );
}