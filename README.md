# Atomize – Habit Tracker

A full-stack web application for tracking daily, weekly, and monthly habits. Built using React (frontend) and Django REST Framework (backend). Atomize is inspired by the book *Atomic Habits* and designed to help users build better routines.

---

## Table of Contents

- [Live Site](#live-site)
- [Project Summary](#project-summary)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Authentication Setup](#authentication-setup)
- [Known Issues](#known-issues)
- [Development Log](#development-log)

---

## Live Site

- **Frontend**: [https://atomize-frontend-e01055da979c.herokuapp.com](https://atomize-frontend-e01055da979c.herokuapp.com)
- **Backend API**: [https://atomize-backend-c71ff550658c.herokuapp.com](https://atomize-backend-c71ff550658c.herokuapp.com)

---

## Project Summary

Atomize is a personal habit tracking app that lets users:

- Register and log in
- Create, view, and delete habits
- Track logs associated with habit performance

Authentication is managed using `dj-rest-auth` and `django-allauth`, with session-based authentication and CSRF protection enabled for secure browser use.

---

## Tech Stack

**Frontend**

- React
- React Bootstrap
- Axios
- React Router DOM

**Backend**

- Django
- Django REST Framework
- django-allauth
- dj-rest-auth
- PostgreSQL

**Hosting**

- Heroku (frontend and backend)

---

## Features

### Authentication

- Registration with username and password (email optional)
- Session-based login/logout using cookies and CSRF tokens

### Habit Management

- Add new habits (daily, weekly, monthly goals)
- Filter habits by type and priority
- Automatically assigns ownership based on session user

### Logging

- Track actions on habits
- Filter log entries by habit and date

---

## Setup Instructions

### Backend

```bash
cd atomize-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Set environment variables:

```
DEBUG=True
SECRET_KEY=<your-secret>
DATABASE_URL=<Postgres-URI>
REACT_APP_URL=https://atomize-frontend-e01055da979c.herokuapp.com
```

### Frontend

```bash
cd atomize-frontend
npm install
npm start
```

Ensure this is set in `.env.production` for deployment:

```
REACT_APP_BACKEND_URL=https://atomize-backend-c71ff550658c.herokuapp.com
```

---

## Authentication Setup

The app uses **SessionAuthentication** with **CSRF tokens**.

### Django Settings Snippets:

```python
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://atomize-frontend-e01055da979c.herokuapp.com",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://atomize-frontend-e01055da979c.herokuapp.com",
]
```

### Axios Config

```js
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;
```

### CSRF Cookie Fetcher (for initial login)

```python
from django.views.decorators.csrf import ensure_csrf_cookie
@ensure_csrf_cookie
def csrf_debug(request):
    return JsonResponse({'message': 'CSRF cookie set'}, status=200)
```

URL added to backend:

```python
path("csrf/", csrf_debug),
```

---

## Known Issues

- Habit creation fails with 403 due to unresolved CSRF/session misalignment.
- Logout also returns 403 for the same reason.
- User remains logged in even after hard refresh due to persisted session cookies.
- CSRF token not being reliably attached to POST requests despite correct settings.
- Time constraints prevented a full resolution of session auth flow on production.

---

## Development Log

### Major Fixes Applied

- ✅ Fixed `dj-rest-auth` login flow by confirming session and CSRF settings
- ✅ Confirmed CORS and `withCredentials` config across frontend
- ✅ Added `/csrf/` route to force initial CSRF cookie load
- ✅ Ensured all POST routes use `IsAuthenticated` permission class
- ✅ Used `SessionAuthentication` only in DRF

### Remaining Bugs

- ❌ POST to `/habits/` consistently returns 403
- ❌ Logout fails with 403, even though cookie/session exist
- ❌ Frontend does not automatically clear user session on backend timeout

### Troubleshooting Summary

Over 6 hours were spent debugging CSRF/session issues:

- Cross-checked cookie transmission
- Manually confirmed cookies: `csrftoken`, `sessionid`
- Used `ensure_csrf_cookie`, axios interceptors, manual headers
- Attempted full rebuilds of frontend/backend multiple times
- Tried Heroku config var rewrites and environment resets

Final deployment is functional but **only partially usable**. Registration/login works. Viewing data works. Creating or deleting habits/logs does **not** work due to session-auth and CSRF misalignment.

---

## Next Steps for Resubmission

1. Swap out SessionAuthentication for Token or JWT auth
2. If keeping session auth:
   - Double check Axios interceptor applies `X-CSRFToken`
   - Consider using Django's login\_required view for early debug
   - Add frontend feedback if `403` is returned
3. Optional: add logout fallback to clear `sessionid` and redirect to login
4. Polish UI further
5. Write full manual testing.md and screenshots

---

## Acknowledgements

- Code Institute Moments Walkthrough
- RealPython CSRF/AJAX Guide
- James Clear (*Atomic Habits*) for naming inspiration

---

**Status**: Submitted for review despite known bugs. Awaiting feedback window for resubmission.

