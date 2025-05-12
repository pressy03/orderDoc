
# Clinic Project v2

## Нови възможности
* Таблица **patients** и пълни CRUD API + UI
* Таблица **appointments** (patient ↔ doctor) с причина за часа
* `schema.sql` съдържа примерни данни за всички таблици

### Инсталация
1. Импортирай `backend/schema.sql` през phpMyAdmin (XAMPP).
2. `cp backend/.env.example backend/.env` и попълни данните за MySQL.
3. Стартирай бекенда:
   ```bash
   cd backend
   npm i
   npm run dev
   ```
4. Стартирай фронтенда:
   ```bash
   cd frontend
   npm i
   npm run dev
   ```
### API пътища
* `/api/doctors`
* `/api/patients`
* `/api/appointments`

## Appointments UI
* Пълен CRUD екран с Tailwind визия
