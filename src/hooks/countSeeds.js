export const countSeeds = (games = []) => {
  const counts = [];
  const finalCounts = [];

  for (const game of games) {
    const homeSeed = game?.home?.seed;
    const awaySeed = game?.away?.seed;

    if (Number.isInteger(homeSeed)) {
      counts[homeSeed] = counts[homeSeed] ? counts[homeSeed] + 1 : 1;
    }

    if (Number.isInteger(awaySeed)) {
      counts[awaySeed] = counts[awaySeed] ? counts[awaySeed] + 1 : 1;
    }
  }

  for (let i = 1; i < counts.length; i += 1) {
    if (counts[i]) {
      finalCounts.push([i, counts[i]]);
    }
  }

  return finalCounts;
};
