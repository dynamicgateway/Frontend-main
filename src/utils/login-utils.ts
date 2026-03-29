export function isValidIsraeliID(id: string) {
  // Ensure the ID is a string and remove any whitespace
  const cleanedId = String(id).trim();

  // Check if the ID has exactly 9 digits and is composed only of numbers
  if (!/^\d{9}$/.test(cleanedId)) {
    return false;
  }

  // Convert the ID string to an array of numbers
  const digits = Array.from(cleanedId, Number);

  // Calculate the checksum
  const sum = digits.reduce((counter, digit, i) => {
    // Multiply every second digit (from right to left, 0-indexed) by 2
    // If the result is greater than 9, subtract 9
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
  }, 0);

  // The ID is valid if the sum is a multiple of 10
  return sum % 10 === 0;
}
