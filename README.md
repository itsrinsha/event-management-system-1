# EventFlow - Premium Event Management Platform

EventFlow is a full-stack Event Registration Platform built with React.js and Django REST Framework. It features a premium, monochrome design aesthetic, comprehensive user authentication, event exploration, and a full-featured system administration dashboard.

This project was built to satisfy the requirements for the **Full Stack Developer Intern Assessment**.

---

## 🌟 Core Features

### For Users
*   **Authentication**: Secure JWT-based Login, Registration, and Logout. Passwords securely hashed.
*   **Event Directory**: Browse all available events with high-res imagery, descriptions, dates, and locations.
*   **Registration System**: Authenticated users can securely register for events. Duplicate registrations are prevented at the database layer.
*   **My Registrations**: A dedicated ledger where users can view all their upcoming commitments.

### For Administrators (Bonus)
*   **Dashboard Telemetry**: High-level metrics on total users, active events, and platform registrations.
*   **Event Lifecycle Management**: Complete CRUD capabilities for events (Create, Edit, Delete, Upload Media).
*   **Registration Ledger**: View a comprehensive list of all platform registrations across all users.

---

## 💻 Tech Stack

*   **Frontend**: React.js, React Router, Tailwind CSS, Axios, GSAP (Animations)
*   **Backend**: Django, Django REST Framework, SimpleJWT
*   **Database**: SQLite (Development) / PostgreSQL ready
*   **File Storage**: Local Media Storage (Development)

---

## 🛠 Installation & Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   Python (3.10+)
*   Git

### 1. Clone the Repository
```bash
git clone <your-github-repo-link>
cd django-assesment
```

### 2. Backend Setup (Django)
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Create an admin superuser
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver
```

### 3. Frontend Setup (React)
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be accessible at `http://localhost:5173`. The backend API runs on `http://localhost:8000`.

---

## 📚 API Documentation

Base URL: `http://localhost:8000/api/`

### Authentication
*   `POST /register/`: Create a new user. Requires `username`, `email`, and `password`.
*   `POST /login/`: Authenticate user and receive JWT access/refresh tokens.

### Events (Public & User)
*   `GET /events/`: Retrieve a list of all events.
*   `GET /events/<id>/`: Retrieve details for a specific event.
*   `POST /events/<id>/register/`: Register the currently authenticated user for the event. Requires JWT Token.

### Registrations (User)
*   `GET /my-registrations/`: Retrieve all events the authenticated user has registered for. Requires JWT Token.

### Admin/System (Protected)
*   `POST /events/`: Create a new event (Admin only).
*   `PUT /events/<id>/`: Modify an event (Admin only).
*   `DELETE /events/<id>/`: Delete an event (Admin only).
*   `GET /admin/dashboard/`: Fetch aggregated system telemetry (Admin only).
*   `GET /registrations/`: Fetch all system registrations (Admin only).

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Add the Environment Variable: `VITE_API_URL` pointing to your deployed Django backend url.
7. Click **Deploy**.

### Backend (Render)
1. Log in to [Render](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Environment** to `Python`.
5. Set the **Build Command** to `pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow gunicorn psycopg2-binary && python manage.py migrate`.
6. Set the **Start Command** to `gunicorn config.wsgi:application`.
7. Add Environment Variables:
   *   `PYTHON_VERSION`: `3.10`
   *   `SECRET_KEY`: (generate a random secure string)
   *   `DEBUG`: `False`
   *   `ALLOWED_HOSTS`: (your render app url)
8. Click **Create Web Service**.

---
*Developed for the Full Stack Developer Intern Assessment.*
