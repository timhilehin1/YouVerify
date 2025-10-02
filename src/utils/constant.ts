export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

// utils/date.ts

export function formatCurrentDate(): string {
  const date = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// utils/date.ts
export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const reminders: any[] = [
  { id: 1, label: "14 days before due date", sent: true },
  { id: 2, label: "7 days before due date", sent: true },
  { id: 3, label: "3 days before due date", sent: false },
  { id: 4, label: "24 hours before due date", sent: false },
];
