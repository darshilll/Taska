/* eslint-disable no-unused-vars */
export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  if (typeof fullName !== "string" || fullName.trim() === "") {
    return ""; // Return an empty string or handle the error as needed
  }

  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  const initialsStr = initials.join("");

  return initialsStr;
}

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-[#fabb18]",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: " bg-[#be185d]",
  "in progress": "bg-blue-600",
  completed: "bg-green-500",
};

export const BGS = [
  "bg-[#fabb18]",
  "bg-blue-600",
  "bg-red-600",
  "bg-[#5bb51c]",
];
