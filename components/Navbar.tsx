import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>{" "}
      <Link href="/about">About</Link>{" "}
      <Link href="/context">Contact</Link>{" "}
      <Link href="/student">Student</Link>
    </nav>
  );
}