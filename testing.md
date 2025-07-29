## 🧪 Manual Testing

| Feature                 | Test Description                                      | Status |
| ----------------------- | ----------------------------------------------------- | ------ |
| ✅ Login                | Log in with valid credentials                         | Pass   |
| ✅ Invalid Login        | Submit invalid login, see error                       | Pass   |
| ✅ Logout               | Click logout, redirected to login                     | Pass   |
| ✅ Auth Routing         | Visit `/habits` or `/logs` without login → redirected | Pass   |
| ✅ Add Habit            | Submit new habit via form                             | Pass   |
| ✅ Edit Habit           | Click edit, update fields, save changes               | Pass   |
| ✅ Validation (Edit)    | Leave required field blank, see validation error      | Pass   |
| ✅ Delete Habit         | Click delete, confirm prompt, habit removed           | Pass   |
| ✅ Log Habit            | Click log button, status updates to "Done"            | Pass   |
| ✅ Logs Page            | `/logs` lists recent logs for habits                  | Pass   |
| ✅ Invalid Routes       | Visit unknown route shows fallback / blank content    | Pass   |
| ✅ Responsive Layout    | Cards and buttons display correctly on mobile         | Pass   |
| ✅ Axios Error Catching | Network/API error shows user-friendly message         | Pass   |
| ✅ CSRF Handling        | Login, log, and form submission all succeed with CSRF | Pass   |
