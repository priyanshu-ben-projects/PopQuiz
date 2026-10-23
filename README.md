<div align="center" style="background-color:white">
  <img src="./frontend/src/assets/logoImg.png" alt="PopQuiz Logo" width="140" />
</div>
<hr/>
<div align="center">
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
</div>

PopQuiz is a full-stack quiz application that allows users to explore quiz categories, customize their assessments, and test their knowledge through dynamically generated quizzes. Built with React, Node.js, Express, and MongoDB, the project focuses on dynamic question selection, database-driven content, and a seamless assessment experience.

## ✨ Features

### ✅ Implemented

- Browse available quiz categories.
- Select the number of questions and quiz duration.
- Fetch questions dynamically based on the selected category.
- Randomly select questions for each assessment.
- Take quizzes with a countdown timer.
- View assessment results after completion.
- Store and retrieve quiz data using MongoDB.
- Connect frontend and backend using Axios and REST APIs.

### 🚧 Upcoming Features

- User authentication and account management.
- Assessment history and performance tracking.
- Detailed result analysis and score breakdown.
- Responsive UI improvements.
- Additional quiz categories and question management features.

## 📚 What I Learned

Building PopQuiz helped me move beyond isolated features and understand how a full-stack application works from frontend to backend.

- **React Development** — Building components, managing state, handling user interactions, and working with forms.
- **Frontend–Backend Integration** — Connecting React with an Express backend using Axios and handling API requests and responses.
- **REST APIs** — Working with GET and POST requests, query parameters, request bodies, and dynamic data flow.
- **MongoDB & Mongoose** — Designing database schemas, working with referenced documents, and retrieving structured data.
- **MongoDB Aggregation** — Using `$lookup` to join related collections, `$match` to filter questions by category, and `$sample` to select random questions.
- **Dynamic Quiz Logic** — Fetching questions according to the selected category and question count.
- **Assessment Workflow** — Connecting assessment configuration, question delivery, countdown timer, and result generation into one flow.
- **State & Data Management** — Passing assessment data between pages and keeping the frontend synchronized with backend responses.
- **Debugging & Problem-Solving** — Identifying API, query, and data-flow issues by inspecting actual values and testing possible solutions.
- **Full-Stack Application Architecture** — Understanding how the frontend, backend, APIs, and database work together to deliver a complete application.

### 💡 Key Takeaway

I believe the best way to learn is by building, experimenting, and solving problems along the way. Every challenge in PopQuiz pushed me to explore new concepts, think independently, and turn unfamiliar problems into learning opportunities. I'm confident in my ability to learn new technologies, adapt to challenges, and keep improving with every project I build.

## 🚀 Run Locally

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd PopQuiz
```

### 2. Install Dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Start the Application

**Backend**

```bash
cd backend
node app.js
```

**Frontend**

Open a new terminal in the project directory.

```bash
cd frontend
npm run dev
```

### 5. Open PopQuiz

Visit the local URL displayed in your frontend terminal to use the application.

## 👨‍💻 About Me

Hi, I'm Priyanshu Ben, a developer passionate about building web applications and solving problems through code.

- 🌱 Currently learning Full Stack Development.
- 💻 Building projects using React, Node.js, Express, and MongoDB.
- 🚀 Working on projects like PopQuiz to strengthen my development skills.
- 🎯 Looking for a Full Stack Developer Internship.
- 🌍 Interested in open source and aiming to contribute to GSoC 2027.
- 📚 I believe the best way to learn is by building real-world projects.

## Authors

[@priyanshuben](https://github.com/priyanshu-ben-projects/PopQuiz)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/priyanshu-ben)
