# 🎓 Learnora LMS

> A modern, responsive and role-based Learning Management System built with **HTML, CSS and JavaScript**.

Learnora LMS is a premium front-end Learning Management System designed for **Students, Parents and Teachers**. The platform provides separate dashboards and features for each user role, with a dynamic login and account-based experience.

---

## 🚀 Project Overview

Learnora LMS provides a centralized digital learning environment where students can access their courses, assignments, quizzes, results, schedules and recorded lectures.

Parents can monitor their child's academic progress, while teachers can manage courses, assignments, quizzes, announcements and student-related activities.

The project focuses on:

* 🎓 Student learning experience
* 👨‍👩‍👧 Parent academic monitoring
* 👨‍🏫 Teacher management
* 🔐 Role-based authentication
* 📚 Course management
* 📝 Assignments and quizzes
* 📊 Academic performance
* 📢 Announcements
* 🎥 Recorded lectures
* 💬 Messaging
* 📅 Schedule management
* 👤 Profile management
* 📱 Responsive design

---

## ✨ Features

### 🔐 Authentication

* Role-based login system
* Student login
* Parent login
* Teacher login
* Account-based session handling
* Automatic dashboard redirection
* Logged-in user persistence using `localStorage`
* Parent → Child relationship handling

---

### 🎓 Student Portal

Students can:

* View dashboard
* Access enrolled courses
* View course details
* Watch recorded lectures
* Complete assignments
* Attempt quizzes
* Check results
* View academic performance
* View announcements
* Check class schedule
* Read messages
* Manage profile

---

### 👨‍👩‍👧 Parent Portal

Parents can:

* View child's academic overview
* Monitor CGPA and GPA
* View enrolled courses
* Track assignments
* View quiz performance
* Check schedule
* View announcements
* Access recordings
* Monitor academic progress
* View child-related information

---

### 👨‍🏫 Teacher Portal

Teachers can:

* Manage courses
* View students
* Create/manage assignments
* Manage quizzes
* Publish announcements
* View schedules
* Manage recordings
* Communicate with students
* View academic information

---

## 📚 LMS Modules

| Module         | Description                       |
| -------------- | --------------------------------- |
| Authentication | Login and role-based access       |
| Dashboard      | Personalized user overview        |
| Courses        | Course listing and course details |
| Lessons        | Learning content and lessons      |
| Assignments    | Assignment management             |
| Quizzes        | Interactive quizzes               |
| Results        | Academic performance              |
| Recordings     | Recorded lectures                 |
| Announcements  | Academic announcements            |
| Schedule       | Class and academic schedule       |
| Messages       | User communication                |
| Profile        | Account and profile information   |

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

### UI & Styling

* DM Sans
* Manrope
* Font Awesome
* CSS Grid
* Flexbox
* Custom responsive layouts

### Data & Authentication

* JavaScript
* LocalStorage
* Dynamic JavaScript data objects
* Client-side role-based authentication

---

## 📁 Project Structure

```text
learnora-lms/
│
├── index.html
│
├── pages/
│   ├── login.html
│   ├── student-dashboard.html
│   ├── parent-dashboard.html
│   ├── teacher-dashboard.html
│   │
│   ├── courses/
│   │   ├── courses.html
│   │   └── course-details.html
│   │
│   ├── lesson.html
│   ├── assignments.html
│   ├── quizzes.html
│   ├── results.html
│   ├── recordings.html
│   ├── announcements.html
│   ├── schedule.html
│   ├── messages.html
│   └── profile.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   ├── login.css
│   ├── student.css
│   ├── parent.css
│   └── teacher.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── data.js
│   ├── student.js
│   ├── parent.js
│   ├── teacher.js
│   ├── courses.js
│   ├── quiz.js
│   ├── assignments.js
│   └── notifications.js
│
└── assets/
    ├── images/
    ├── icons/
    └── ...
```

---

## 🎨 Design System

Learnora LMS uses a modern dark academic interface with blue and cyan accents.

### Primary Colors

```text
Background: #050B14
Primary Blue: #2878FF
Accent Cyan: #27D9F4
Text: #F8FAFC
Muted Text: #94A3B8
```

The design emphasizes:

* Modern dashboard cards
* Clean navigation
* Responsive layouts
* Visual data presentation
* Consistent spacing
* Professional typography
* Dark premium interface

---

## 🔄 Login Flow

```text
                ┌───────────────┐
                │   Login Page  │
                └───────┬───────┘
                        │
                Select User Role
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    Student          Parent          Teacher
        │               │               │
        ▼               ▼               ▼
 Student Dashboard  Parent Dashboard  Teacher Dashboard
```

The application stores the current login session using browser `localStorage`.

Example:

```text
learnora_current_user
logged_in
user_role
user_email
user_id
student_name
current_parent
current_child
```

---

## 👨‍👩‍👧 Parent → Child System

The parent portal supports linked child accounts.

Example relationship:

```text
Parent
  │
  ├── Child 1
  │
  └── Child 2
```

After login, the parent can view information related to the selected child, including:

* Courses
* Assignments
* Quizzes
* Results
* Schedule
* Announcements
* Academic performance

---

## 📊 Sample Academic Data

The demo environment includes sample academic information such as:

```text
CGPA: 3.42
Semester GPA: 3.58
Credits: 15
```

This data can be replaced with real student records when connecting the LMS to a backend/database.

---

## 📱 Responsive Design

Learnora LMS is designed to work across:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📲 Tablet

Responsive CSS adjusts:

* Sidebar navigation
* Dashboard cards
* Tables
* Course layouts
* Forms
* Navigation menus
* Typography
* Content spacing

---

## ▶️ How to Run

Learnora LMS is a static frontend project and does not require Node.js, npm or a backend server.

### Option 1 — VS Code Live Server

1. Open the project in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Open `index.html`.
4. Right-click the file.
5. Select **Open with Live Server**.

---

### Option 2 — Browser

You can also open:

```text
index.html
```

directly in a browser.

For the best experience, however, use **VS Code Live Server**.

---

## 🔑 Demo Login

The project contains demo accounts for different roles.

### Student

```text
Role: Student
```

### Parent

```text
Role: Parent
```

### Teacher

```text
Role: Teacher
```

> Demo credentials can be configured inside the JavaScript authentication/data files.

---

## 🧩 Future Improvements

The current version is frontend-focused. The following features can be added in future versions:

* 🔐 Backend authentication
* 🗄️ MySQL / PostgreSQL database
* 🔥 Firebase integration
* REST API
* Real-time messaging
* Online payments
* Attendance management
* Student fee management
* Email notifications
* Push notifications
* Admin dashboard
* Teacher analytics
* Advanced reporting
* PDF report generation
* Cloud-based video storage

---

## 🔮 Future Architecture

```text
                    Learnora LMS
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Student           Parent           Teacher
        │                │                │
        └────────────────┼────────────────┘
                         │
                    REST API
                         │
                    Backend
                         │
                    Database
```

---

## 🎯 Project Goals

Learnora LMS was developed to demonstrate how a modern educational platform can provide different experiences for different types of users.

The main goals are:

* Create a professional LMS interface
* Implement role-based navigation
* Build reusable frontend components
* Manage user sessions
* Create dynamic dashboards
* Provide responsive layouts
* Simulate real-world educational workflows

---

## 📸 Screenshots

Add your project screenshots inside the `assets/images/` folder and reference them here.

Example:

```markdown
## Screenshots

### Login

![Learnora Login](assets/images/login.png)

### Student Dashboard

![Student Dashboard](assets/images/student-dashboard.png)

### Parent Dashboard

![Parent Dashboard](assets/images/parent-dashboard.png)

### Teacher Dashboard

![Teacher Dashboard](assets/images/teacher-dashboard.png)

### Courses

![Courses](assets/images/courses.png)
```

---

## 👨‍💻 Developer

**Sheheryar Hilal**

Software Engineering Graduate | Data Analyst | Power BI Developer | Flutter Developer

### Skills

* HTML
* CSS
* JavaScript
* Flutter
* Dart
* SQL
* Python
* Power BI
* Data Analytics

---

## 📄 License

This project is developed for **educational, portfolio and demonstration purposes**.

You are free to modify and extend the project according to your requirements.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

# Learnora LMS

**Learn • Manage • Track • Grow**
