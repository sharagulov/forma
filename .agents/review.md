# Code review — FORMA

## CRITICAL

(пусто — блокирующих замечаний по текущей спецификации нет)

## WARNING

- **Rate limiting** в `POST /api/contact` хранится в памяти процесса — на serverless несколько инстансов обходят общий лимит; для продакшена рассмотреть Redis/Upstash (уже отмечено в `backend-done.md`).
- **Карта на Contact:** статический Mapbox требует токен; без токена показывается fallback — ок для портфолио, для продакшена задать `NEXT_PUBLIC_MAPBOX_TOKEN`.

## SUGGESTION

- Добавить `vitest` + smoke e2e Playwright по маршрутам из архитектуры.
- Рассмотреть `loading.tsx` / `error.tsx` для сегментов при росте сложности.
- При желании выровнять число членов команды About с ТЗ (6 человек).
