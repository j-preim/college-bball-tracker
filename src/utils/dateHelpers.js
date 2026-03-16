export const TOURNAMENT_TIME_ZONE = "America/Chicago";

function getPartsInTimeZone(value, timeZone = TOURNAMENT_TIME_ZONE) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
}

export function toTournamentDateKey(value) {
  const parts = getPartsInTimeZone(value);

  if (!parts) {
    return "";
  }

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function getTodayDateString() {
  return toTournamentDateKey(new Date());
}

export function formatDisplayDate(dateString) {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return dateString;
  }

  // Noon UTC avoids accidental date rollovers when formatting
  const stableDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  return stableDate.toLocaleDateString(undefined, {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTournamentTime(dateTime) {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return "--:--";
  }

  return parsed.toLocaleTimeString([], {
    timeZone: TOURNAMENT_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatTournamentDateTime(dateTime) {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return "TBD";
  }

  return parsed.toLocaleString([], {
    timeZone: TOURNAMENT_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function getBestAvailableDate(gameDates = []) {
  if (!gameDates.length) {
    return "";
  }

  const todayKey = getTodayDateString();

  if (gameDates.includes(todayKey)) {
    return todayKey;
  }

  const sortedDates = [...gameDates].sort();
  const nextUpcoming = sortedDates.find((date) => date >= todayKey);

  return nextUpcoming || sortedDates.at(-1) || gameDates[0];
}

export function formatStatusLabel(status = "") {
  switch (status) {
    case "inprogress":
      return "Live";
    case "closed":
    case "complete":
      return "Final";
    case "scheduled":
      return "Scheduled";
    case "time_tbd":
      return "Time TBD";
    case "if_necessary":
      return "If Necessary";
    default:
      return status || "Unknown";
  }
}