import dayjs from 'dayjs';

export function formatTimestampToCustomDate(timestamp: string | number): string {
  return dayjs(timestamp).format('h:mm A, D MMM');
}
