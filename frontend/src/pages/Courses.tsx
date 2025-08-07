import { useEffect, useState } from 'react';
import axios from '../components/axiosInstance';

const Courses = ({ role, userId }: any) => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState(3);
  const [courseId, setCourseId] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');

  useEffect(() => {
    axios.get('courses').then(res => setCourses(res.data));
  }, []);

  const createCourse = () => {
    axios.post('courses/create', { title, credits }).then(() => alert('Course created'));
  };

  const enroll = () => {
    axios.post('courses/enroll', { studentId: userId, courseId }).then(() => alert('Enrolled'));
  };

  const drop = () => {
    axios.post('courses/drop', { studentId: userId, courseId }).then(() => alert('Dropped'));
  };

  const approve = () => {
    axios.post(`courses/approve/${enrollmentId}`).then(() => alert('Approved'));
  };

  return (
    <div className="section">
      <h2>Courses</h2>
      {role === 'lecturer' && (
        <>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="number" value={credits} onChange={e => setCredits(Number(e.target.value))} />
          <button onClick={createCourse}>Create Course</button>
        </>
      )}
      {role === 'student' && (
        <>
          <input placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} />
          <button onClick={enroll}>Enroll</button>
          <button onClick={drop}>Drop</button>
        </>
      )}
      {role === 'admin' && (
        <>
          <input placeholder="Enrollment ID" value={enrollmentId} onChange={e => setEnrollmentId(e.target.value)} />
          <button onClick={approve}>Approve Enrollment</button>
        </>
      )}
      <ul>
        {courses.map((c: any) => (
          <li key={c.id}>{c.title} - {c.credits} credits</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;