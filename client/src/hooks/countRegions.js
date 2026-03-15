export const countRegions = (games) => {
  const counts = new Map();

  for (const game of games) {
    const region = game?.bracket;
    if (!region) {
      continue;
    }

    counts.set(region, (counts.get(region) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
};
