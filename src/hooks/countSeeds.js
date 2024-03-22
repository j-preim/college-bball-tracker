import { useEffect, useState } from "react";

export const countSeeds = (games) => {
  let counts = [];
  let totalSeeds = [];
  let finalCounts = [];

  for (let i = 0; i < games.length; i++) {
    let homeSeed = games[i].home.seed;
    let awaySeed = games[i].away.seed;
    totalSeeds.push(homeSeed, awaySeed);
  }
  totalSeeds.sort((a, b) => a - b);

  totalSeeds.forEach((el) => {
    counts[el] = counts[el] ? (counts[el] + 1) : 1;
  });

  for (let i = 1; i < counts.length; i++) {
    finalCounts.push([i, counts[i]])
  }

  return finalCounts;
};
