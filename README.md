# EventFlow – Event Management Platform

A modern event management platform designed to streamline event discovery, registration, and administration through a clean user experience and a powerful management dashboard.

EventFlow enables users to explore curated events, register instantly, and manage their personal event timeline, while administrators can efficiently create, manage, and monitor events through a dedicated control panel.

---

## Overview

EventFlow is a full-stack web application built with React.js and Django REST Framework.

The platform combines secure authentication, event registration workflows, image-based event showcases, and role-based administration into a unified experience.

---

## Features

### User Features

* Secure JWT Authentication
* User Registration & Login
* Event Discovery Platform
* Detailed Event Information Pages
* Event Registration System
* Personal Registration Timeline
* Protected User Routes
* Responsive User Interface

### Administration Features

* Role-Based Access Control
* Admin Dashboard
* Event Creation & Management
* Event Editing
* Event Deletion
* Event Image Upload Support
* Registration Monitoring
* Platform Statistics Overview

---

## Event Management

Administrators can:

* Create new events
* Upload event cover images
* Edit event information
* Update locations and schedules
* Delete outdated events
* Track user registrations

Supported event types include:

* Technology Conferences
* Developer Meetups
* AI & Innovation Summits
* Startup Networking Events
* Career Workshops
* Open Source Communities
* Training Programs

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* GSAP Animations
* Vite

### Backend

* Django
* Django REST Framework
* Simple JWT
* Django CORS Headers

### Database

* SQLite

### File Handling

* Image Upload Support
* Media File Management

---

## Project Architecture

Frontend

* Authentication Module
* Event Discovery Module
* Registration Module
* Admin Dashboard Module

Backend

* Accounts Application
* Events Application
* Registrations Application
* JWT Authentication System

Database

* Users
* Events
* Registrations

Communication

* REST API Architecture
* Token-Based Authentication

---

## Folder Structure

```text
.
## Project Structure

```text
django-assesment/
├── backend/
│   ├── .env
│   ├── db.sqlite3
│   ├── manage.py
│   ├── accounts/
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── events/
│   ├── registrations/
│   └── media/
│
├── frontend/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── api.js
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── README.md
├── requirements.txt
├── .gitignore
└── venv/
```

---

## Environment Variables

### Backend Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

Example:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Environment Variable Templates

For security reasons, `.env` files are excluded from version control.

Create the following files locally:

### backend/.env

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### frontend/.env

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Security Notes

* Sensitive environment variables are stored in `.env` files.
* `.env` files are ignored by Git through `.gitignore`.
* Never commit secrets or API keys to public repositories.

```

```
## Environment Variables

### Backend (.env)

Create a `.env` file inside the backend directory.

```env
SECRET_KEY=django-insecure-x7j3k9m2n5p8q1r4t6y8u0a2b3c4d5e6f7g8h9i0
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (.env)

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:8000/api
```

## API Endpoints

### Authentication

| Method | Endpoint            | Auth | Description              |
| ------ | ------------------- | ---- | ------------------------ |
| POST   | /api/register/      | No   | Register a new user      |
| POST   | /api/login/         | No   | Authenticate user        |
| POST   | /api/token/refresh/ | No   | Refresh JWT access token |

### Events

| Method | Endpoint                   | Auth | Description        |
| ------ | -------------------------- | ---- | ------------------ |
| GET    | /api/events/               | No   | Get all events     |
| GET    | /api/events/<id>/          | No   | Get event details  |
| POST   | /api/events/<id>/register/ | User | Register for event |

### User Registrations

| Method | Endpoint               | Auth | Description            |
| ------ | ---------------------- | ---- | ---------------------- |
| GET    | /api/my-registrations/ | User | View registered events |

### Admin Operations

| Method | Endpoint              | Auth  | Description              |
| ------ | --------------------- | ----- | ------------------------ |
| GET    | /api/admin/dashboard/ | Admin | Get dashboard statistics |
| POST   | /api/events/          | Admin | Create event             |
| PUT    | /api/events/<id>/     | Admin | Update event             |
| DELETE | /api/events/<id>/     | Admin | Delete event             |
| GET    | /api/registrations/   | Admin | View all registrations   |

```
```

## Installation

### Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd django-assesment
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Screenshots

### Login Experience

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6a2dd530-b9d4-45c2-a34f-8469b4a5a467" />

### Register Experience
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/260c1943-df8c-4d35-b4ea-451794898a3c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7c533924-d93b-4119-b78a-bf0570cbe606" />

### Event Discovery

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9db46a13-f15d-4559-941b-77a440128cc2" />


### Event Details

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/11763722-f2a0-4acc-8b8e-91fb1364aa63" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec9c7ea5-9d42-476b-acee-d86c763b5fe6" />



### User Timeline

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/46b4a3ee-fb98-4f8e-8509-cf3da8abbb09" />


### Admin Dashboard

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a1b298b1-c59f-4bfe-915d-0e379a14aa6c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bf2c3837-1154-408c-b0fb-8ba7c813a10c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/642ccc23-3c5c-4894-b4c2-dd7148be4c77" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/63b2058c-c27a-4629-bb7d-681730ea35ef" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d879cd0d-1e24-473d-ad91-e9b4d39634cf" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8aec94c8-6881-40ad-99c9-621db18b8d91" />

---

## Future Enhancements

* Event Categories
* Search & Filtering
* Email Notifications
* Event Analytics
* Cloud Image Storage
* Multi-Admin Support
* Event Capacity Limits

---

## Author

Fathima Rinsha Ak
Full Stack Developer
GitHub: https://github.com/itsrinsha
LinkedIn: https://www.linkedin.com/in/rinshaak/
