function normalizeTeamName(name = "") {
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s&-]/g, "")
    .replace(/&/g, "and")
    .replace(/\bsaint\b/g, "st")
    .replace(/\bstate\b/g, "st")
    .replace(/\buniversity\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const TEAM_ALIASES = {
  uconn: "connecticut",
  "ole miss": "mississippi",
  smu: "southern methodist",
  byu: "brigham young",
  vcu: "virginia commonwealth",
  "st marys": "saint marys",
  "st mary's": "saint marys",
  unc: "north carolina",
  utsa: "texas san antonio",
  "uc san diego": "california san diego",
};

function canonicalizeTeamName(name = "") {
  const normalized = normalizeTeamName(name);
  return TEAM_ALIASES[normalized] || normalized;
}

function isWithinMinutes(a, b, minutes = 20) {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();

  if (!Number.isFinite(timeA) || !Number.isFinite(timeB)) {
    return false;
  }

  return Math.abs(timeA - timeB) <= minutes * 60 * 1000;
}

function formatSpread(value) {
  if (value === null || value === undefined || value === "") return "TBD";

  const num = Number(value);
  if (!Number.isFinite(num)) return "TBD";
  if (num === 0) return "PK";
  if (num > 0) return `+${num}`;

  return `${num}`;
}

function isGameComplete(game) {
  const status = String(game?.status || "").toLowerCase();

  return [
    "complete",
    "completed",
    "closed",
    "finished",
  ].includes(status);
}

export function findBettingEventForGame(game, bettingData = []) {
  const homeKey = canonicalizeTeamName(
    game?.home?.name || game?.homeTeam || "",
  );
  const awayKey = canonicalizeTeamName(
    game?.away?.name || game?.awayTeam || "",
  );
  const scheduled = game?.scheduledRaw || game?.scheduled || "";

  return (
    bettingData.find((event) => {
      return (
        canonicalizeTeamName(event.homeTeam) === homeKey &&
        canonicalizeTeamName(event.awayTeam) === awayKey &&
        isWithinMinutes(event.scheduled, scheduled, 20)
      );
    }) || null
  );
}

export function getBettingInfo(game, bettingData = []) {
  // ✅ Completed games should never show betting lines
  if (isGameComplete(game)) {
    return {
      spread: "-",
      provider: "ESPN",
      matched: false,
    };
  }

  const matchedEvent = findBettingEventForGame(game, bettingData);

  if (!matchedEvent) {
    return {
      spread: "TBD",
      provider: "ESPN",
      matched: false,
    };
  }

  return {
    spread: formatSpread(matchedEvent.odds?.spread),
    provider: matchedEvent.odds?.provider || "ESPN",
    matched: true,
  };
}
