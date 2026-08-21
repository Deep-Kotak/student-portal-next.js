type StudentProps = {
  name: string;
  course: string;
  technology?: string;
  age?: number;
};

export default function StudentCard({
  name,
  course,
  technology,
  age,
}: StudentProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Course: {course}</p>

      {technology && <p>Technology: {technology}</p>}

      {age && <p>Age: {age}</p>}
    </div>
  );
}