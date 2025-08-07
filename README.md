Academic Management Platform (Excel CRM for Education)
A scalable University CRM system with role-based access control, course management, assignment workflows, AI integrations, and transcript generation.
Setup Instructions
Local Setup

Clone the Repository:git clone <'https://github.com/KingsIke/academic_management.git'>
cd university-crm


Backend Setup:
Navigate to backend/.
Install dependencies: npm install.
Copy .env.example to .env and update JWT_SECRET and DATABASE_URL.
Start PostgreSQL locally or use Docker (see below).
Run: npm run start:dev.


Frontend Setup:
Navigate to frontend/.
Install dependencies: npm install.
Copy .env.example to .env and update REACT_APP_API_URL if needed.
Run: npm start.


Database:
Ensure PostgreSQL is running (port 5432).
The backend uses TypeORM with synchronize: true to auto-create tables.



Docker Setup

Install Docker: Ensure Docker and Docker Compose are installed.
Copy Environment File:
Copy .env.example to .env in the root directory.
Update JWT_SECRET with a secure value.


Run Containers:docker-compose up --build


Access:
Frontend: http://localhost:3000
Backend: http://localhost:5000
PostgreSQL: localhost:5432 (use user:password from .env).



Sample Credentials
Create users via the /login page with the following roles:

Student: student@example.com, Password: password123, Role: student
Lecturer: lecturer@example.com, Password: password123, Role: lecturer
Admin: admin@example.com, Password: password123, Role: admin

To register users, use the backend endpoint POST /users with { email, password, role }.
AI Usage
The AI features (/ai/recommend and /ai/syllabus) are mocked to return static responses:

Course Recommendations: Returns a list of course names based on the input interest (e.g., "Machine Learning" returns ["Machine Learning 101", ...]).
Syllabus Generation: Returns a simple syllabus outline based on the input topic.To use a real OpenAI API, update the AIService in backend/src/ai/ai.service.ts with an API key and OpenAI client.

Project Structure

/frontend: React app with TypeScript, Tailwind CSS, and Axios.
/backend: NestJS app with TypeScript, TypeORM, and JWT auth.
/docker-compose.yml: Orchestrates frontend, backend, and PostgreSQL.
/SYSTEM_DESIGN.md: System architecture and diagram.
/.env.example: Environment variable template.


