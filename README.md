🚀 TaskFlow - Project & Task Management System
TaskFlow is a modern full-stack MERN application designed for efficient project collaboration, task assignment, and team management.
It allows organizations, developers, startups, and students to:
•	Create and manage projects
•	Add/remove team members
•	Assign tasks to specific users
•	Track project progress
•	Update task statuses
•	Manage role-based access control
•	Monitor personal tasks and deadlines
________________________________________
📌 Features
🔐 Authentication & Authorization
•	Secure JWT Authentication
•	User Signup/Login
•	Password hashing using bcryptjs
•	Protected routes using middleware
•	Persistent login using localStorage
________________________________________
👨‍💼 Admin Features
Only Admin users can:
•	Create projects
•	Add members to projects
•	Remove members from projects
•	Create tasks
•	Assign tasks to project members
________________________________________
👨‍💻 Member Features
Members can:
•	View assigned projects
•	View tasks assigned to them
•	Update their own task status
•	Track deadlines and priorities
________________________________________
📁 Project Management
•	Create unlimited projects
•	Add project descriptions
•	Project detail page
•	Team member management
•	Admin badge system
________________________________________
✅ Task Management
•	Create tasks with:
o	Title
o	Description
o	Due Date
o	Priority
o	Assigned Member
•	Task statuses:
o	To Do
o	In Progress
o	Done
•	Task priority levels:
o	Low
o	Medium
o	High
________________________________________
📊 Dashboard Analytics
Dashboard provides:
•	Total tasks
•	To Do tasks
•	In Progress tasks
•	Completed tasks
•	Overdue tasks
________________________________________
🛠️ Tech Stack
Frontend
•	React.js
•	React Router DOM
•	Axios
•	Tailwind CSS
•	React Toastify
Backend
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
•	JWT Authentication
•	bcryptjs
________________________________________
📂 Project Structure
TaskFlow/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md


________________________________________
🌐 API Endpoints
🔑 Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register User
POST	/api/auth/login	Login User
________________________________________
📁 Project Routes
Method	Endpoint	Description
POST	/api/projects	Create Project
GET	/api/projects	Get User Projects
GET	/api/projects/:id	Get Single Project
POST	/api/projects/:id/add-member	Add Member
DELETE	/api/projects/:projectId/remove-member/:memberId	Remove Member
________________________________________
✅ Task Routes
Method	Endpoint	Description
POST	/api/tasks	Create Task
GET	/api/tasks	Get Logged User Tasks
PUT	/api/tasks/:id	Update Task Status
GET	/api/tasks/project/:projectId	Get Project Tasks
________________________________________
🧠 Database Models
👤 User Model
{
  name: String,
  email: String,
  password: String,
  role: String
}
________________________________________
📁 Project Model
{
  title: String,
  description: String,
  admin: ObjectId,
  members: [
    {
      user: ObjectId,
      role: String
    }
  ]
}
________________________________________
✅ Task Model
{
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  status: String,
  assignedTo: ObjectId,
  project: ObjectId
}
________________________________________
🔒 Role-Based Access Control
Feature	Admin	Member
Create Project	✅	❌
Add Members	✅	❌
Remove Members	✅	❌
Create Tasks	✅	❌
Assign Tasks	✅	❌
Update Own Task	✅	✅
View Projects	✅	✅
View Assigned Tasks	✅	✅
________________________________________
🎨 UI Features
•	Responsive Dashboard
•	Beautiful Tailwind CSS UI
•	Gradient Authentication Pages
•	Modern Cards & Layouts
•	Dynamic Task Badges
•	Toast Notifications
•	Interactive Project Pages
________________________________________
🔥 Future Improvements
Possible future enhancements:
•	Real-time notifications
•	Chat system
•	File uploads
•	Activity logs
•	Team chat
•	Drag & drop Kanban board
•	Email notifications
•	Dark mode
•	Search & filters
•	Task comments
•	Calendar integration
________________________________________
📸 Screens Included
You can add screenshots here:
![Dashboard](./screenshots/dashboard.png)
![Projects](./screenshots/projects.png)
![Tasks](./screenshots/tasks.png)
________________________________________
🚀 Deployment
Frontend Deployment
Deploy frontend on:
•	Vercel
•	Netlify
•	Railway
Backend Deployment
Deploy backend on:
•	Railway
•	Render
•	Cyclic
Database
Use:
•	MongoDB Atlas
________________________________________
🧪 Sample Admin Account
Email: admin@gmail.com
Password: ********
________________________________________
👨‍💻 Author
Durgesh Singh Chauhan
B.Tech CSE Student
•	MERN Stack Developer
•	Problem Solver
•	Full Stack Enthusiast
________________________________________
📜 License
This project is licensed under the MIT License.
________________________________________
⭐ Support
If you like this project:
•	Give it a ⭐ on GitHub
•	Fork the repository
•	Contribute improvements
