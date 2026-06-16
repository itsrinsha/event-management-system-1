# Event Registration Platform

Full stack intern assessment project built with React, Django, Django REST Framework, SQLite, and JWT authentication.

## Features

- User registration, login, and logout
- JWT protected API requests
- Event listing and event detail pages
- Authenticated event registration
- Duplicate registration prevention
- My Registrations page
- Responsive React UI with loading and error states

## Tech Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Django, Django REST Framework, Simple JWT
- Database: SQLite

## Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The backend runs at:

```txt
http://127.0.0.1:8000/
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173/
```

## API Documentation

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/api/register` | Create a new user | No |
| POST | `/api/login` | Login and receive JWT tokens | No |
| GET | `/api/events` | List all events | No |
| GET | `/api/events/:id` | View event details | No |
| POST | `/api/events/:id/register` | Register for an event | Yes |
| GET | `/api/my-registrations` | View logged-in user's registrations | Yes |

Trailing-slash versions of these endpoints also work.

## Database Models

User fields are provided by Django's built-in user model.

Event:

- `id`
- `title`
- `description`
- `date`
- `location`
- `created_at`

Registration:

- `id`
- `user`
- `event`
- `registered_at`

Each user can register for the same event only once.

## Verification

```bash
venv\Scripts\python.exe backend\manage.py check
cd frontend
npm run build
```
