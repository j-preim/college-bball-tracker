import { useEffect, useState } from "react";

export const getGamesForDay = (day, games) => {
  let selectedGames = [];
  console.log(games);
  for (let i = 0; i < games.length; i++) {
    let oldDate = new Date(games[i].scheduled);
    let formattedDate = oldDate.toLocaleDateString();

    if (formattedDate === day) {
      selectedGames.push(games[i]);
    }
  }
  console.log(selectedGames);
  return selectedGames;
};
