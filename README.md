# Atomize — Habit Tracker (Frontend)

## 🚀 Project Overview

**Atomize** is a React-based frontend for a habit‑tracking app, connected to a Django REST API backend.  
Users can create, edit, log, and delete habits, then review and manage their logs.

- **Frontend:** React, React Bootstrap
- **Backend:** Django REST Framework (running at `http://localhost:8000`)
- **State management:** React Context (`AuthContext`) + Axios default config

---

## 📱 Live Demo & Screenshots

_(Add polished visuals here later, e.g. dashboard grid, cards, modals, logs list)_

---

## 🧩 Key Features

### Habits CRUD

- **Add new habit** via modal form (`POST /habits/`)
- **Edit habit** with prefilled modal (`PATCH /habits/:id/`)
- **Delete habit** with confirmation (`DELETE /habits/:id/`)
- Habit list updates immediately on create/edit/delete

### Habit Logging

- Log habit completion via “Log Habit” button (`POST /habits/logs/`)
- Status updates inline and button disables to prevent duplicates

### Logs Management

- View logs on `/logs` page (`GET /habits/logs/`)
- **Filter by habit** dropdown and **filter by date** input
- Inline **Edit** and **Delete** log entries using `LogCard.js`
- Both PATCH and DELETE methods supported with error feedback

### UX & State Handling

- Responsive layout via Bootstrap grid system
- Visual feedback: spinners, disabled states, success/error messages

---

## 📁 File Structure (src/)
