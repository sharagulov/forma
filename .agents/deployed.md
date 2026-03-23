# Deployment — FORMA

## Статус

**SKIPPED** — автоматический деплой из этого прогона не выполнялся (нет вызова Vercel/Railway CLI и нет учётных данных в среде).

## Целевая платформа

Vercel (по `.agents/architecture.md`).

## Шаги для ручного деплоя

1. Репозиторий с корнем в `forma/` (или monorepo с root = `forma`).
2. Переменные окружения: см. `forma/.env.example`.
3. Команда: подключить репозиторий в Vercel, build command `npm run build`, output Next.js default.

## Примечание

В `.agents/review.md` нет содержательного блока **CRITICAL**, поэтому деплой не блокируется ревью — пропуск связан только с отсутствием автоматизации деплоя в этой сессии.
