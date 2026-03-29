export const cleanTextData = (text: string): string => {
  return text.replace(/\r\n/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\s+/g, ' ').trim();
};
