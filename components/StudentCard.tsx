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
    <div className="student-card">
      <div className="student-card-header">
        <div className="student-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{name}</h2>
          <p className="student-course">{course}</p>
        </div>
      </div>

      <div className="student-info">
        {technology && (
          <div className="student-info-item">
            <span>Technology</span>
            <strong>{technology}</strong>
          </div>
        )}

        {age !== undefined && (
          <div className="student-info-item">
            <span>Age</span>
            <strong>{age} years</strong>
          </div>
        )}
      </div>
    </div>
  );
}