import { useEffect, useState } from "react";

export const getGamesForDay = (day, games) => {
  let selectedGames = [];

  for (let i = 0; i < games.length; i++) {
    let oldDate = new Date(games[i].scheduled);
    let formattedDate = oldDate.toLocaleDateString();

    if (formattedDate === day) {
      selectedGames.push(games[i]);
    }
  }
  selectedGames.sort((a, b) =>
    (a.scheduled > b.scheduled ? 1 : b.scheduled > a.scheduled ? -1 : 0)
  );
  return selectedGames;
};
