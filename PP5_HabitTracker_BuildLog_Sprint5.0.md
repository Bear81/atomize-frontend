## 🔄 Sprint 5 – Logs Page: Filtering, Edit, Delete

### 📅 Date: 2025-07-29  
### 📁 File: `PP5_HabitTracker_BuildLog_Sprint5.0.md`

---

### ✅ Features Implemented

#### 1. `LogsPage.js` – Log List View
- Fetched logs via `GET /habits/logs/`
- Displayed with Bootstrap cards
- Integrated loading state, error handling, and empty fallback
- Added filter controls:
  - Dropdown list of user’s habits (`GET /habits/`)
  - Date picker for log filtering
  - Filters passed as query params (`?habit=1&date=YYYY-MM-DD`)
  - Controlled inputs update API call live
  - “Clear” button resets filters

#### 2. `LogCard.js` – Log Entry Component
- Created new reusable component for each log entry
- Props: `log`, `onDelete()`, `onUpdate()`
- Inline editing of:
  - Status (dropdown: done/skipped)
  - Note (textarea)
- PATCH to `/habits/logs/:id/`
- DELETE to `/habits/logs/:id/` with confirmation
- Buttons: Edit, Save, Cancel, Delete
- State handling for save status, local updates, and errors

#### 3. Integrated into `LogsPage.js`
- Swapped out old `<Card>` mapping with `<LogCard />`
- Handlers passed to manage:
  - Updating log in local state after edit
  - Removing log from UI after delete

---

### 🧹 Cleanup & Fixes

- Removed unused `Card` import from `LogsPage.js` after replacing with `LogCard`
- Verified all JSX props and handlers match usage

---

### 📚 References

- `URLSearchParams` for dynamic filtering: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- React Bootstrap Form components: [react-bootstrap.github.io/forms](https://react-bootstrap.github.io/forms/)
- DRF filtering reference: [StackOverflow](https://stackoverflow.com/q/73471301)

---

### 🧪 Manual Testing Checklist

- [x] Logs load from `/habits/logs/`
- [x] Habit dropdown populated from `/habits/`
- [x] Filtering by habit + date works
- [x] Clear filters resets view
- [x] Edit note/status inline
- [x] Save PATCH request succeeds
- [x] Delete removes log after confirmation
- [x] Error states handled cleanly (no crash)

---

✅ Sprint 5 complete – logs feature set is now fully CRUD-ready and testable.
Ready to move on to habit editing or README/test documentation.