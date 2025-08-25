// utils/formatTime.js
export function formatTime(dateString) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // 0 -> 12 for midnight
  return `${hours}:${minutes} ${ampm}`;
}
