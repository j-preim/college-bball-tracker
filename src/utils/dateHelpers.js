export function getTodayDateString() {
  return new Date().toLocaleDateString();
}

export function formatDisplayDate(dateString) {
  if (!dateString) {
    return "";
  }

  const parsed = new Date(dateString);

  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getBestAvailableDate(gameDates = []) {
  if (!gameDates.length) {
    return "";
  }

  const todayKey = new Date().toISOString().split("T")[0];

  if (gameDates.includes(todayKey)) {
    return todayKey;
  }

  const sortedDates = [...gameDates].sort();
  const nextUpcoming = sortedDates.find((date) => date >= todayKey);

  return nextUpcoming || sortedDates.at(-1) || gameDates[0];
}

// export function getBestAvailableDate(gameDates = [], preferredDate = getTodayDateString()) {
//   if (!Array.isArray(gameDates) || gameDates.length === 0) {
//     return "";
//   }

//   if (gameDates.includes(preferredDate)) {
//     return preferredDate;
//   }

//   const parsed = gameDates
//     .map((date) => ({
//       label: date,
//       value: new Date(date).getTime(),
//     }))
//     .filter((item) => !Number.isNaN(item.value))
//     .sort((a, b) => a.value - b.value);

//   if (parsed.length === 0) {
//     return gameDates[0] ?? "";
//   }

//   const now = new Date(preferredDate).getTime();
//   const nextUpcoming = parsed.find((item) => item.value >= now);

//   if (nextUpcoming) {
//     return nextUpcoming.label;
//   }

//   return parsed[parsed.length - 1]?.label ?? gameDates[0] ?? "";
// }

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
