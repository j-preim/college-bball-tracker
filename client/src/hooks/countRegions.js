export const countRegions = (games = []) => {
  const counts = {};

  for (const game of games) {
    const region = game?.bracket || "Unknown";
    counts[region] = counts[region] ? counts[region] + 1 : 1;
  }

  return Object.entries(counts).sort(([regionA], [regionB]) =>
    regionA.localeCompare(regionB)
  );
};
