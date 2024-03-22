import { useEffect, useState } from "react";

export const countRegions = (games) => {
  let counts = {};
  let totalRegions = [];
  let finalCounts = [];

  for (let i = 0; i < games.length; i++) {
    let region = games[i].bracket;
    totalRegions.push(region);
  }
  totalRegions.sort((a, b) => a - b);

  totalRegions.forEach((el) => {
    counts[el] = counts[el] ? (counts[el] + 1) : 1;
  });


  const countsSorted = Object.entries(counts).sort(([_, a], [__, b]) => a - b);


  return countsSorted;
};
