import { useEffect, useState } from 'react';
import axios from 'axios';

const Assignments = ({ role, userId }: any) => {
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState('');
  const [grade, setGrade] = useState(0);
  const [courseId, setCourseId] = useState('');
  const [assignmentId, setAssignmentId] = useState('');

  // Lecturer fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const token = localStorage.getItem('token');

  // Get assignments (for students only)
  useEffect(() => {
    if (role === 'student' && userId) {
      axios.get(`http://localhost:5000/assignments/student/${userId}`)
        .then(res => setAssignments(res.data))
        .catch(err => console.error('Error:', err));
    }
  }, [role, userId]);

  // Student submits assignment
  const handleSubmit = () => {
    axios.post('http://localhost:5000/assignments/submit', {
      courseId,
      studentId: userId,
      file
    })
    .then(() => alert('Assignment submitted'))
    .catch(err => {
      console.error(err.response?.data || err.message);
      alert('Error submitting assignment');
    });
  };

  // Lecturer creates assignment
  const handleCreateAssignment = () => {
    axios.post('http://localhost:5000/assignments', {
      courseId,
      title,
      description,
      dueDate,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => alert('Assignment created'))
    .catch(err => {
      console.error(err.response?.data || err.message);
      alert('Error creating assignment');
    });
  };

  // Lecturer grades assignment
  const handleGrade = () => {
    axios.post(`http://localhost:5000/assignments/grade/${assignmentId}`, {
      grade
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => alert('Assignment graded'))
    .catch(err => {
      console.error(err.response?.data || err.message);
      alert('Error grading assignment');
    });
  };

  return (
    <div className="section">
      <h2>Assignments</h2>

      {/* Student submit assignment */}
      {role === 'student' && (
        <>
          <h3>Submit Assignment</h3>
          <input
            placeholder="Assignment ID"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
          />
          <input
            placeholder="Assignment File URL"
            value={file}
            onChange={e => setFile(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit Assignment</button>

          <h3>Your Submissions</h3>
          <ul>
            {assignments.map((a: any) => (
              <li key={a.id}>
                {a.course.title || a.course.id} — Grade: {a.grade ?? 'Pending'}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Lecturer creates and grades assignment */}
      {role === 'lecturer' && (
        <>
          <h3>Create New Assignment</h3>
          <input
            placeholder="Course ID"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
          />
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <button onClick={handleCreateAssignment}>Create Assignment</button>

          <h3>Grade Assignment</h3>
          <input
            placeholder="Assignment ID"
            value={assignmentId}
            onChange={e => setAssignmentId(e.target.value)}
          />
          <input
            type="number"
            value={grade}
            onChange={e => setGrade(Number(e.target.value))}
          />
          <button onClick={handleGrade}>Grade</button>
        </>
      )}
    </div>
  );
};

export default Assignments;