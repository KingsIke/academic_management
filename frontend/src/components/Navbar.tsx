import { Link } from 'react-router-dom';

const Navbar = ({ token, role, onLogout }: any) => {
  return (
    <div className="navbar flex">
      <nav>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/ai-assistant">AI Assistant</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      {token && (
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;