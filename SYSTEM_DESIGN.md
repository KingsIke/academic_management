System Design: Academic Management Platform (Excel CRM for Education)
Overview
The Academic Management Platform is a fullstack web application designed to manage university operations, including user authentication, course lifecycle workflows, assignment management, and AI-driven features for course recommendations and syllabus generation. The system is built as a modular monolith with a clear separation of concerns, deployed using Docker for scalability and ease of setup.
Architecture
The application follows a client-server architecture with the following components:

Frontend: React.js with TypeScript, Tailwind CSS for styling, and Axios for API calls. Pages include login, role-specific dashboards, course management, and AI assistant.
Backend: NestJS with TypeScript, providing REST APIs, JWT-based authentication, and role-based access control (RBAC). TypeORM handles database interactions.
Database: PostgreSQL, storing user, course, enrollment, and assignment data.
AI Integration: Mocked OpenAI API for course recommendations and syllabus generation, with potential for real API integration.
PDF Generation: pdfkit for generating transcript PDFs as a bonus feature.

Architecture Diagram
graph TD
    A[Client Browser] -->|HTTP Requests| B[Frontend: React]
    B -->|REST API Calls| C[Backend: NestJS]
    C -->|TypeORM| D[PostgreSQL]
    C -->|Mocked API| E[AI Service: Mocked OpenAI]
    C -->|PDF Generation| F[pdfkit]
    G[Docker Compose] -->|Orchestrates| B
    G -->|Orchestrates| C
    G -->|Orchestrates| D

Components

Frontend:
Routes: /login, /dashboard (role-specific), /courses, /ai-assistant.
Features: JWT-based auth, file uploads for assignments, role-based UI rendering.


Backend:
Modules: Auth, Users, Courses, Enrollments, Assignments, AI.
Middleware: JWT authentication, RBAC to restrict endpoints by role.
Endpoints: /auth/login, /courses/enroll, /assignments/grade, /ai/recommend, /ai/syllabus, /transcripts/generate.


Database:
Tables: users (id, email, password, role), courses (id, title, credits, lecturerId, syllabus), enrollments (id, courseId, studentId, status), assignments (id, courseId, studentId, file, grade).


AI Integration:
Mocked endpoints return static responses for course recommendations and syllabus generation.


Docker:
Containers: frontend (React), backend (NestJS), PostgreSQL.
Configured via docker-compose.yml with environment variables in .env.



Scalability

Monolith with Modules: The backend is a monolith with modular services (auth, courses, etc.), allowing easy refactoring to microservices if needed.
Docker: Containers ensure consistent environments and easy scaling.
Database: PostgreSQL supports high read/write loads with indexing on frequently queried fields (e.g., userId, courseId).
Caching: Future enhancement could include Redis for caching frequent queries (e.g., course lists).

Security

JWT Authentication: Tokens issued on login, validated via middleware.
RBAC: Role checks (student, lecturer, admin) restrict endpoint access.
File Uploads: Sanitized and stored securely (e.g., in database as base64 or on disk with validation).
Environment Variables: Sensitive data (e.g., JWT secret, database credentials) stored in .env.

Future Enhancements

Real-time notifications using WebSockets.
Integration with actual OpenAI API for AI features.
Horizontal scaling with load balancers and Kubernetes.
