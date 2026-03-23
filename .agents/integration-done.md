# Integration — FORMA (done)

## Корень проекта

`/Users/pavelsharagulov/Dev/Projects/portwebsites/forma`

## Связка фронт ↔ API

- Контактная форма (`src/components/contact/ContactForm.tsx`) отправляет `POST /api/contact` с JSON `{ name, email, message }`.
- При отсутствии конфигурации Resend (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `RESEND_FROM_EMAIL`) форма откатывается на `mailto:` (см. клиентский код).
- Проверка origin и rate limit на сервере — см. `src/app/api/contact/route.ts` и `.agents/backend-done.md`.

## Проверка локально

```bash
cd forma && npm run dev
```

Открыть `/contact`, отправить форму (с заполненным `.env` для почты или проверить mailto-fallback).

## Известные моменты

- `NEXT_PUBLIC_SITE_URL` нужен для строгой проверки Origin в production.
