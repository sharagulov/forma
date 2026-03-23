# Backend / API — FORMA (done)

## Резюме по ТЗ и архитектуре

- По `.agents/architecture.md` отдельный backend и БД **не требуются**; данные проектов — статические (`src/data/` в будущем).
- Реализована **опция B**: `POST /api/contact` (Next.js Route Handler) с отправкой через **Resend**, плюс заголовки безопасности в `next.config.ts` (SEC-006).

## Эндпоинты

| Метод | Путь | Описание |
|--------|------|----------|
| `POST` | `/api/contact` | Тело JSON: `name`, `email`, `message`. Успех: `200`, `{ "ok": true }`. |
| `GET` | `/api/contact` | `405`, `{ "ok": false, "error": "method_not_allowed" }` |

### Расширения относительно таблицы §2.2 (осознанно)

- **`403`** `{ "ok": false, "error": "forbidden" }` — проверка `Origin`/`Referer` против `NEXT_PUBLIC_SITE_URL` (SEC-003). В dev при отсутствии `NEXT_PUBLIC_SITE_URL` проверка ослаблена.
- **`429`** `{ "ok": false, "error": "rate_limited" }` — лимит ~8 запросов / IP / 60 с в памяти процесса (SEC-002).

## Безопасность (сопоставление с `.agents/security-spec-review.md`)

| ID | Мера |
|----|------|
| SEC-002 | In-memory rate limit по IP (`x-forwarded-for` / `x-real-ip`). |
| SEC-003 | Сверка origin с `NEXT_PUBLIC_SITE_URL` в production. |
| SEC-004 | Zod: email/name без `\r\n`; лимиты длины; тело письма — plain text. |
| SEC-006 | CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` в `next.config.ts`. |
| SEC-007 | В логах нет email/текста сообщения; при ошибках — только код/строка ошибки, без PII. |

**Компромиссы:** лимит не общий между инстансами serverless (нужен Redis/Upstash для жёсткого лимита). CAPTCHA/honeypot не добавлялись (в ТЗ не обязательны). HSTS задаётся платформой (Vercel) и доменом — не дублировали в `next.config`.

## Файлы

- `src/app/api/contact/route.ts` — handler, Resend, ответы по контракту.
- `src/lib/contact-validation.ts` — схема Zod.
- `src/lib/contact-rate-limit.ts` — rate limit.
- `src/lib/verify-origin.ts` — проверка origin.
- `next.config.ts` — security headers.
- `.env.example` — переменные окружения (без секретов).

## Переменные окружения

См. `.env.example`. Для работы отправки почты нужны: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL_TO`. Для продакшен-проверки same-origin: `NEXT_PUBLIC_SITE_URL`.

## Команды

```bash
npm install
npm run dev      # dev с Turbopack
npm run build    # production (webpack; без --turbopack — иначе Turbopack не резолвил zod/resend)
npm run start
npm run lint
```

## Проверка

- `npm run build` — **успешно** (Next.js 15.5.14).
- `npm run lint` — без предупреждений.

## TODO (по желанию)

- Подключить Redis/Edge KV для rate limit в проде.
- Добавить honeypot/CAPTCHA при росте спама.
- Ужесточить CSP (nonce) после подключения Mapbox/GSAP на страницах.
