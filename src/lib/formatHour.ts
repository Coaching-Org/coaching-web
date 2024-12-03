export const formatHour = (value: string) => {
  const date = new Date(value);

  const hours = date.getHours().toString().padStart(2, "0"); // Ensures two-digit format
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures two-digit format

  const time = `${hours}:${minutes}`;

  // Outputs: 13:30
  return time;
};
