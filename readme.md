# Udyam Registration Form Clone

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

A **full-stack clone** of the first two steps of the **Indian Udyam Registration portal**, built with a modern tech stack.

---

## 📌 Live Demo & Links

- **Frontend (Vercel):** [https://udyam-app-pratham216s-projects.vercel.app/](https://your-frontend-url.vercel.app)
- **Backend (Render):** [https://udyam-app.onrender.com](https://your-backend-url.onrender.com)

---

## 🖼️ Project Screenshot
![alt text](image-1.png)
![alt text](image.png)
---

## 🎯 Project Objective

This project replicates the **UI and functionality** of a real-world government form, showcasing full-stack development skills:

1. **Web Scraping:** Extracting form fields and validation rules from the official Udyam portal.
2. **Frontend Development:** Building a responsive, dynamic interface with React.
3. **Backend Development:** Creating a REST API for data validation and persistence.
4. **Database Integration:** Using PostgreSQL with Prisma ORM.
5. **Testing:** Writing unit tests for both frontend and backend.
6. **Deployment:** Dockerizing and deploying to cloud services.

---

## 🚀 Core Features

- **Two-Step Form:** Aadhaar and PAN verification steps.
- **Dynamic Rendering:** Fields generated from `form_schema.json`.
- **Real-time Validation:** Instant feedback for Aadhaar & PAN formatting.
- **Responsive Design:** Mobile-first UI.
- **REST API:** Handles validation and data storage.
- **Database Persistence:** PostgreSQL integration.
- **Comprehensive Testing:** Unit tests for both UI and API.

---

## 🛠 Tech Stack

| Category      | Technology                               |
|---------------|-------------------------------------------|
| **Frontend**  | React (Vite), Tailwind CSS                |
| **Backend**   | Node.js, Express.js                       |
| **Database**  | PostgreSQL, Prisma ORM                     |
| **Testing**   | Vitest, React Testing Library, Jest, Supertest |
| **Deployment**| Vercel (Frontend), Render (Backend), Railway (Database) |

---

## ⚙️ Local Development Setup

### **Prerequisites**
- Node.js (v18 or later)
- npm
- PostgreSQL connection string (free from Railway/Supabase)

---

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
```

## 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file and add:
DATABASE_URL="postgresql://user:password@host:port/database"

# Run database migrations
npx prisma migrate dev

# Start the backend
npm start
# Runs on http://localhost:5000
```

## 3️⃣ Frontend Setup
```
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
# Runs on http://localhost:5173
```

## 4️⃣ Scraper Setup (Python)
The scraper is a one-time utility to generate the form_schema.json file.
```

# Install Python dependencies
pip install requests beautifulsoup4

# Run the scraper
python scraper.py
```
## 🧪 Running Tests

### Backend Tests
```
cd backend
npm test
```

### Frontend Tests
```
cd frontend
npm test
```

## 📄 License

This project is for educational purposes only and is not affiliated with any government entity.