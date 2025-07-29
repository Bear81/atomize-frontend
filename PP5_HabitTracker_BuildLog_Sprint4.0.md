## 🔄 Sprint 4 – Dashboard Features: Add & Log Habits

### 📅 Date: 2025-07-29  
### 📁 File: `PP5_HabitTracker_BuildLog_Sprint4.0.md`

---

### ✅ Features Implemented

#### 1. `DashboardPage.js` – Habit Overview Page
- Integrated `HabitGrid` to display all habits in a responsive layout.
- Replaced local `.map()` in `DashboardPage` with reusable component.
- Added loading spinner, error alert, and empty state message.
- Fetched authenticated `/habits/` data using Axios.

#### 2. `HabitGrid.js` – Responsive Layout Wrapper
- Created Bootstrap `<Row><Col>` layout for all `HabitCard` components.
- Handles empty array gracefully.
- Accepts `habits` array and maps over cards.
- Fully modular and used only inside `DashboardPage`.

#### 3. `HabitCard.js` – Habit Display Component
- Receives full habit data via props.
- Styled with React Bootstrap card layout.
- Includes:
  - Title
  - Description
  - Frequency & goal type
  - Priority badge (mapped to color)
  - Status badge
  - Big “Log Habit” button
- Log button:
  - Makes `POST /habits/logs/` API call
  - Updates status to “Done”
  - Shows inline errors on failure
  - Prevents duplicate logs with disabled state

#### 4. `AddHabitModal.js` – Habit Creation Modal
- Controlled form with validation and error handling.
- Fields:
  - Title (required)
  - Description (optional)
  - Goal Type (daily/weekly/monthly)
  - Frequency (min 1)
  - Priority (low/med/high)
- Submit sends `POST /habits/` with form data.
- On success:
  - Closes modal
  - Passes created habit to parent for immediate render

#### 5. `DashboardPage.js` Integration
- Added `+ Add Habit` button that opens modal.
- Tracked modal state with `useState`.
- Passed `onHabitCreated()` handler to modal.
- Injected new habit into grid on success without re-fetch.

---

### 🧹 Refactoring & Cleanup

- Renamed `HabitsPage.js` → `DashboardPage.js` (matches walkthrough naming).
- Removed misplaced `DashboardPage.js` from `components/` folder.
- Confirmed proper imports from `pages/`.

---

### 📚 References

- 🧠 Walkthrough Logic Followed:
  - Moments → PostFeed + Post structure
  - Create flow mirrors Moments CreatePostForm → onSuccess inject pattern
- 🧾 Axios POST log format:
  - Docs: [DRF POST Example](https://www.django-rest-framework.org/api-guide/serializers/#saving-instances)
- ❗ Linter-safe JSX: replaced en dash with ASCII hyphen (`-`)
- 🔒 Form validation mirrors HTML5 + Bootstrap native features

---

### 🧪 Manual Testing Checklist

- [x] `GET /habits/` shows cards
- [x] `POST /habits/` adds a new habit
- [x] Modal resets and closes on success
- [x] “Log Habit” creates a log via `POST /habits/logs/`
- [x] Disabled state prevents duplicate logging
- [x] Error feedback shown if log POST fails
- [x] Status badge updates correctly

---

✅ Sprint 4 frontend functionality complete. Ready to implement filter/search or switch to `/logs` page.