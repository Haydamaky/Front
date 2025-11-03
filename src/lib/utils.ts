import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toZonedTime, format } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToTime(isoDate: string) {
  const date = new Date(isoDate);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  return timeString;
}

export function convertUtcIsoToUserIso(
  utcIso: string,
  timeZone: string = 'UTC',
): string {
  if (!utcIso) return '';
  try {
    const utcDate = new Date(utcIso);
    const zonedDate = toZonedTime(utcDate, timeZone);
    const offsetIso = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", {
      timeZone,
    });
    return offsetIso;
  } catch (err) {
    console.error('Invalid date or timezone:', utcIso, timeZone, err);
    return utcIso;
  }
}
