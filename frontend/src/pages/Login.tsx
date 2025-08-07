import { useState } from 'react';
import axios from '../components/axiosInstance';

const Login = ({ onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', { email, password });
    console.log("Login response:", res.data);
    onLogin(res.data.token, res.data.role, res.data.userId);
  };

  return (
    <form onSubmit={handleSubmit} className="section">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;