import React, { useState } from 'react';
import axios from '../components/axiosInstance';

interface Props {
  role: string | null;
}

const AIAssistant: React.FC<Props> = ({ role }) => {
  const [interests, setInterests] = useState('');
  const [topic, setTopic] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [syllabus, setSyllabus] = useState<string[]>([]);

  const getRecommendations = async () => {
    const interestArray = interests.split(',').map(i => i.trim());
    try {
      const res = await axios.post('/ai/recommend', { interests: interestArray });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      alert('Error fetching recommendations');
    }
  };

  const generateSyllabus = async () => {
    try {
      const res = await axios.post('/ai/syllabus', { topic });
      setSyllabus(res.data.outline);
    } catch (err) {
      alert('Error generating syllabus');
    }
  };

  return (
    <div className="ai-assistant">
      <h2>AI Assistant</h2>
      <p>Your role: <strong>{role}</strong></p>

      <div className="section">
        <h3>Course Recommendations</h3>
        <input
          type="text"
          placeholder="Enter interests (e.g. AI, Math)"
          value={interests}
          onChange={e => setInterests(e.target.value)}
        />
        <button onClick={getRecommendations}>Recommend Courses</button>
        <ul>
          {recommendations.map((rec: any, index: number) => (
            <li key={index}>
              <strong>{rec.title}</strong>: {rec.reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Generate Syllabus</h3>
        <input
          type="text"
          placeholder="Enter topic (e.g. Machine Learning)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
        <button onClick={generateSyllabus}>Generate</button>
        <ul>
          {syllabus.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIAssistant;
