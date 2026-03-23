/**
 * Общий blur для placeholder="blur" при динамических src (local + remote).
 * Уменьшает «пустой» кадр до загрузки (особенно для тяжёлых PNG).
 */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBkNDRkYIR0hIi0jKTAzKDU4NDE0KTYwOTo0KzM5OD8zQkJDS07MTszSTw8MjU/LzA1LzQ9Pj/2wBDAQkJCQwLDBkNDRkYIR0hIi0jKTAzKDU4NDE0KTYwOTo0KzM5OD8zQkJDS07MTszSTw8MjU/LzA1LzQ9Pj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

/** LCP / полноэкранные hero */
export const QUALITY_HERO = 82;

/** Карточки, сетки, превью */
export const QUALITY_CARD = 76;

/** Галерея — миниатюры в сетке */
export const QUALITY_GALLERY_THUMB = 72;

/** Лайтбокс — крупный просмотр */
export const QUALITY_LIGHTBOX = 86;

/** Стандартные sizes под контейнер ~1400px и сетку проектов */
export const SIZES_PROJECT_CARD =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";

export const SIZES_FEATURED = SIZES_PROJECT_CARD;

export const SIZES_GALLERY_GRID = "(max-width: 768px) 100vw, 50vw";

export const SIZES_LIGHTBOX = "(max-width: 1280px) 100vw, min(1152px, 100vw)";
