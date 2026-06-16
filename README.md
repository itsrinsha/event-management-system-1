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

<img width="1914" height="878" alt="image" src="https://github.com/user-attachments/assets/89fde924-eb1f-4496-beb0-5abb0e28ee25" />


### Register Experience
<img width="1904" height="871" alt="image" src="https://github.com/user-attachments/assets/8e1a4091-7d54-46aa-ba49-2e4f65437430" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/d1ee493b-2ec6-40b5-aefa-362f094bf337" />

### Event Discovery

<img width="1916" height="886" alt="image" src="https://github.com/user-attachments/assets/d75a386d-3c91-4b57-877d-2496ded5b306" />
<img width="1913" height="865" alt="image" src="https://github.com/user-attachments/assets/4253f602-2dda-461e-be79-d5104d916484" />


### Event Details
<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/d9c9ab5c-8213-4877-a5de-779469ddc377" />

<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/cd4e06b2-0574-46d1-9331-d93fb0f8e4df" />
<img width="1915" height="871" alt="image" src="https://github.com/user-attachments/assets/4a4b6481-7cf1-4553-b1d3-b9ebc9f15e7f" />



### User Timeline

<img width="1919" height="887" alt="image" src="https://github.com/user-attachments/assets/720beb25-a5a5-447f-88e8-92e7bd8773cb" />
<img width="1883" height="857" alt="image" src="https://github.com/user-attachments/assets/3ebd0979-48fb-4a8c-b303-cea80ff088cb" />



### Admin Dashboard

<img width="1919" height="874" alt="image" src="https://github.com/user-attachments/assets/241564dd-e334-47ce-a74a-28709dcb2629" />
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/613b994c-d3ad-4761-a96c-1ddc706203ad" />
<img width="1913" height="871" alt="image" src="https://github.com/user-attachments/assets/20da5319-a827-4e89-8533-e82e1a852fbf" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/3ecc891e-cd92-4fec-8035-6037cf91ac9a" />
<img width="1918" height="874" alt="image" src="https://github.com/user-attachments/assets/531578cd-0417-48d2-bf0c-6eb3fed96d36" />
<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/9d64f081-ab60-4d04-b9fe-0c71cc835729" />
<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/637996eb-cc36-44a8-9bd7-972cae724531" />


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
