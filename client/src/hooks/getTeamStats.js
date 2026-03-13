import { useEffect, useState } from "react";
import teamStatsDb from "../../public/teamStats.json";

export const getTeamStats = (teamId) => {
  let teamStats = [];

  for (let i = 0; i < teamStatsDb.rankings.length; i++) {
    if (teamStatsDb.rankings[i].id === teamId) {
      teamStats = teamStatsDb.rankings[i];
    }
  }
  
  return teamStats;
};

