import type { ProjectCategory } from "./projects";

/** Порядок кнопок фильтра на /projects */
export const PROJECT_CATEGORY_ORDER: ProjectCategory[] = [
  "Estate & Grounds",
  "Heritage Interiors",
  "Civic & Club",
];

/**
 * Что забить в Pinterest / Google Images, когда ищешь референсы пачкой
 * под одну тему (одинаковая «температура» кадра для всех проектов в группе).
 */
export const categoryPinterestQueries: Record<
  ProjectCategory,
  { label: string; queries: string[] }
> = {
  "Estate & Grounds": {
    label: "Поместья, парки, главные фасады",
    queries: [
      "old money estate architecture",
      "limestone manor exterior",
      "heritage country house facade",
      "classic estate driveway",
      "quiet luxury home exterior",
      "traditional coastal estate house",
    ],
  },
  "Heritage Interiors": {
    label: "Интерьеры: панели, библиотеки, притихшая роскошь",
    queries: [
      "old money interior aesthetic",
      "wood panelled living room",
      "heritage apartment interior",
      "classic library room design",
      "prewar apartment interior",
      "understated luxury interior",
    ],
  },
  "Civic & Club": {
    label: "Клубы, библиотеки, спокойная публичная архитектура",
    queries: [
      "classical library interior architecture",
      "heritage civic building interior",
      "private members club aesthetic",
      "old money public building",
      "traditional reading room architecture",
    ],
  },
};
