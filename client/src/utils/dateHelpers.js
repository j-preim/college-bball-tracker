export function getTodayDateString() {
  return new Date().toLocaleDateString();
}

export function getBestAvailableDate(gameDates = [], preferredDate = getTodayDateString()) {
  if (!Array.isArray(gameDates) || gameDates.length === 0) {
    return "";
  }

  if (gameDates.includes(preferredDate)) {
    return preferredDate;
  }

  const parsed = gameDates
    .map((date) => ({
      label: date,
      value: new Date(date).getTime(),
    }))
    .filter((item) => !Number.isNaN(item.value))
    .sort((a, b) => a.value - b.value);

  if (parsed.length === 0) {
    return gameDates[0] ?? "";
  }

  const now = new Date(preferredDate).getTime();
  const nextUpcoming = parsed.find((item) => item.value >= now);

  if (nextUpcoming) {
    return nextUpcoming.label;
  }

  return parsed[parsed.length - 1]?.label ?? gameDates[0] ?? "";
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
