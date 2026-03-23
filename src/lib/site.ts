export const SITE_NAME = "FORMA Architects";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

export const CONTACT_EMAIL = "hello@formaarchitects.studio";
export const PHONE_DISPLAY = "+7 (495) 120-45-67";
export const ADDRESS_LINE = "Sadovaya-Kudrinskaya St. 8, bld. 2";
export const CITY_LINE = "Moscow, Russia 123001";

export const MAP_COORDS = { lat: 55.7614, lng: 37.5905 };
