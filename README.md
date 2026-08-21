🎓 Student Portal

A modern and responsive Student Management Portal built with Next.js, TypeScript, Firebase Firestore, and Catalyst UI Kit.

The application provides complete CRUD functionality for managing student records through a clean, responsive interface.

🚀 Project Overview

The Student Portal is a full-stack web application built using the Next.js App Router.

It allows users to:

Add students

View all students

View individual student details

Update student information

Delete students

Validate student input

Handle loading and empty states

Display success and error alerts

Confirm deletion with a UI dialog

Test APIs using Postman

The application uses Next.js API Routes as the backend layer and Firebase Firestore as the database.

✨ Features

👨‍🎓 Student Management

Add a new student

View all students

View individual student details

Edit student information

Delete students

Dynamic student detail pages

🔄 CRUD Operations

Operation

HTTP Method

Endpoint

Purpose

Create

POST

/api/students

Add a student

Read

GET

/api/students

Fetch all students

Read Single

GET

/api/students/:id

Fetch one student

Update

PUT

/api/students/:id

Update a student

Delete

DELETE

/api/students/:id

Delete a student

🛠️ Technologies Used

Frontend

Next.js 16

React

TypeScript

Tailwind CSS

Backend

Next.js API Routes

REST API

Database

Firebase Firestore

UI

Catalyst UI Kit

Headless UI

Tailwind CSS

API Testing

Postman

Version Control

Git

GitHub

🎨 UI Kit

This project uses Catalyst UI Kit for building a reusable and professional user interface.

Catalyst components used in the project include:

Button

Input

Field

Label

Badge

Dialog

Alert

Heading

Description List

Tailwind CSS was used to customize layouts, spacing, responsiveness, and visual styling.

🔌 API Testing with Postman

The API endpoints were tested using Postman before and during frontend integration.

GET — All Students

GET /api/students

Returns all student records.

GET — Student by ID

GET /api/students/:id

Returns a specific student using the Firebase document ID.

POST — Create Student

POST /api/students
Content-Type: application/json

Example request body:

{
  "name": "Deep",
  "course": "M.Sc Computer Science",
  "technology": "Next.js",
  "age": 23
}

PUT — Update Student

PUT /api/students/:id
Content-Type: application/json

Example request body:

{
  "name": "Deep Updated",
  "course": "M.Sc Computer Science",
  "technology": "React",
  "age": 24
}

DELETE — Delete Student

DELETE /api/students/:id

Deletes the selected student from Firestore.

🔥 Firebase Firestore

Firebase Firestore is used as the database.

Student records are stored in the:

students

collection.

Example document:

{
  "id": "firebase-document-id",
  "name": "Deep",
  "course": "M.Sc Computer Science",
  "technology": "Next.js",
  "age": 23
}

Firebase configuration is handled through:

lib/firebase.ts

📁 Project Structure

myapp/
│
├── app/
│   ├── api/
│   │   └── students/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── student/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── context/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── catalyst/
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── description-list.tsx
│   │   ├── fieldset.tsx
│   │   ├── heading.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── Navbar.tsx
│   └── StudentCard.tsx
│
├── lib/
│   └── firebase.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json

🔄 Application Flow

User
  │
  ▼
Next.js Frontend
  │
  ├── Student Form
  ├── Student List
  └── Student Details
  │
  ▼
Next.js API Routes
  │
  ├── GET
  ├── POST
  ├── PUT
  └── DELETE
  │
  ▼
Firebase Firestore
  │
  ▼
Students Collection

✅ Validation

Basic form validation has been implemented.

Field

Validation

Name

Required

Course

Required

Technology

Required

Age

Required

Age

Minimum 1

Age

Maximum 100

Examples:

Age: 0
❌ Invalid

Age: 101
❌ Invalid

Age: 23
✅ Valid

💬 User Feedback

The application provides success and error feedback using Catalyst Alert components.

Add Student

Student added successfully!

Update Student

Student updated successfully!

Delete Student

Student deleted successfully!

Error Handling

Unable to connect to server.

🗑️ Delete Confirmation

Before deleting a student, a Catalyst Dialog asks for confirmation.

Delete Student

Are you sure you want to delete this student?

[Cancel] [Delete Student]

This helps prevent accidental deletion.

⏳ Loading State

While student data is being fetched, a loading spinner is displayed.

Loading students...

📭 Empty State

When there are no students in the database, the application displays an empty state:

No Students Found

There are no students in the database yet.
Add your first student using the form above.

📱 Responsive Design

The UI is designed to work across:

Desktop

Laptop

Tablet

Mobile

The student cards use responsive grid layouts:

Mobile  → 1 column
Tablet  → 2 columns
Desktop → 3 columns

🧠 Challenges Faced During Development

1. Firebase Integration

One of the initial challenges was connecting Firebase correctly with the Next.js project.

An error occurred:

Module not found: Can't resolve 'firebase/app'

Solution

Firebase was installed using:

npm install firebase

The installation was then verified using:

npm list firebase

2. Understanding Firebase CRUD

Understanding Firestore CRUD operations was initially challenging.

The project uses Firestore operations such as:

addDoc()
getDocs()
getDoc()
updateDoc()
deleteDoc()

These operations were integrated gradually into the API routes.

3. Dynamic Routing

The project uses a dynamic route:

/student/[id]

This allows individual student records to be displayed using their Firebase document ID.

Example:

/student/NMDU14HwSyR9LSpXCf7T

4. PUT API Integration

Connecting the edit form with the PUT API was another important challenge.

The final flow is:

Edit Form
    ↓
PUT Request
    ↓
Next.js API Route
    ↓
Firebase Firestore
    ↓
Updated Student
    ↓
Updated UI

5. DELETE Confirmation

Initially, deletion used the browser's window.confirm().

It was later replaced with a Catalyst Dialog to provide a better and more professional user experience.

6. Catalyst UI Kit Integration

Integrating Catalyst UI components into the existing Next.js application required understanding the component structure and dependencies.

Components such as:

Button
Input
Field
Badge
Dialog
Alert
Heading
DescriptionList

were integrated into the project.

7. Loading and Empty States

The application needed to handle multiple UI states:

Loading
   ↓
Students Found

or:

Loading
   ↓
No Students Found

Separate UI states were implemented to improve the user experience.

8. Git and GitHub

Git was used to track project changes and maintain the source code on GitHub.

Common commands used:

git status
git add .
git commit
git push

📚 What I Learned

Through this project, I learned and practiced:

Next.js App Router

React

TypeScript

Client Components

Dynamic Routing

Next.js API Routes

REST API concepts

HTTP methods

Firebase Firestore

CRUD operations

Form handling

Form validation

Catalyst UI Kit

Tailwind CSS

Headless UI

Postman API testing

Git and GitHub

Responsive UI development

Error handling

Loading states

Empty states

🚀 Getting Started

1. Clone the repository

git clone <your-github-repository-url>

2. Navigate to the project

cd myapp

3. Install dependencies

npm install

4. Configure Firebase

Create a .env.local file and add your Firebase configuration.

Example:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Never commit sensitive credentials or private environment variables to GitHub.

5. Start the development server

npm run dev

Open:

http://localhost:3000

🧪 Testing

The APIs were tested using Postman.

Tested operations:

GET     → Fetch all students
GET/:id → Fetch a single student
POST    → Add a student
PUT     → Update a student
DELETE  → Delete a student

Frontend testing included:

Add student

View student

Update student

Delete student

Form validation

Loading state

Empty state

Success alerts

Error alerts

Delete confirmation dialog

Responsive layout

🔮 Future Enhancements

Possible future improvements include:

Student search

Student filtering

Pagination

Authentication

Role-based access

Admin dashboard

Student profile images

Advanced form validation

Student sorting

Export student data

Firebase Authentication

Deployment

Analytics dashboard

👨‍💻 Author

Deep Kotak

M.Sc Computer Science

📄 License

This project was developed for learning, internship practice, and portfolio purposes.