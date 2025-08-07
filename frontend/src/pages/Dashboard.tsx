import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface DashboardProps {
  role: string | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [userData, setUserData] = useState<any>({});
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/auth/me');
        setUserData(userRes.data);
        if (role === 'student') {
          const enrollmentsRes = await axios.get('http://localhost:5000/enrollments');
          setCourses(enrollmentsRes.data);
          const assignmentsRes = await axios.get('http://localhost:5000/assignments');
          setAssignments(assignmentsRes.data);
        } else if (role === 'lecturer') {
          const coursesRes = await axios.get('http://localhost:5000/courses');
          setCourses(coursesRes.data.filter((c: any) => c.lecturerId === userRes.data.id));
        } else if (role === 'admin') {
          const coursesRes = await axios.get('http://localhost:5000/courses');
          setCourses(coursesRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [role]);

  return (
    <div className="section">
      <div className="flex">
        <h1>Welcome, {userData.email} ({role})</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
      <nav>
        <Link to="/courses">Courses</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
      </nav>
      {role === 'student' && (
        <div>
          <h2>Your Courses</h2>
          <ul>
            {courses.map((course: any) => (
              <li key={course.id}>{course.title} - Status: {course.status}</li>
            ))}
          </ul>
          <h2>Your Assignments</h2>
          <ul>
            {assignments.map((assignment: any) => (
              <li key={assignment.id}>Course: {assignment.courseId} - Grade: {assignment.grade || 'Pending'}</li>
            ))}
          </ul>
        </div>
      )}
      {role === 'lecturer' && (
        <div>
          <h2>Your Courses</h2>
          <ul>
            {courses.map((course: any) => (
              <li key={course.id}>{course.title} - Credits: {course.credits}</li>
            ))}
          </ul>
        </div>
      )}
      {role === 'admin' && (
        <div>
          <h2>All Courses</h2>
          <ul>
            {courses.map((course: any) => (
              <li key={course.id}>{course.title} - Lecturer ID: {course.lecturerId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;