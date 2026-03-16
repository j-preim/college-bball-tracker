export const getGamesForDay = (day, games) => {
  const selectedGames = games.filter((game) => game.gameDate === day);

  selectedGames.sort((a, b) =>
    (a.scheduled > b.scheduled ? 1 : b.scheduled > a.scheduled ? -1 : 0)
  );

  return selectedGames;
};