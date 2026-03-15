export const countSeeds = (games) => {
  const counts = new Map();

  for (const game of games) {
    const homeSeed = Number(game?.home?.seed);
    const awaySeed = Number(game?.away?.seed);

    if (!Number.isNaN(homeSeed) && homeSeed > 0) {
      counts.set(homeSeed, (counts.get(homeSeed) ?? 0) + 1);
    }

    if (!Number.isNaN(awaySeed) && awaySeed > 0) {
      counts.set(awaySeed, (counts.get(awaySeed) ?? 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => a[0] - b[0]);
};
