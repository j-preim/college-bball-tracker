import { memo, useMemo } from "react";
import TeamPopoverButton from "./TeamPopoverButton";
import ScoreDisplay from "./ScoreDisplay";
import { getBettingInfo } from "../../hooks/getBettingInfo";
import { formatTournamentTime } from "../../utils/dateHelpers";

function getRowClassName(game) {
  if (game.status === "inprogress") {
    return "table-warning";
  }

  return "";
}

function getTeamCellClass(game, side) {
  const isFinal = game.status === "closed" || game.status === "complete";

  if (!isFinal) {
    return "";
  }

  const homePoints =
    typeof game.home_points === "number" ? game.home_points : null;
  const awayPoints =
    typeof game.away_points === "number" ? game.away_points : null;

  if (homePoints === null || awayPoints === null) {
    return "";
  }

  if (side === "home") {
    return homePoints > awayPoints
      ? "border border-success table-success"
      : "border border-danger table-danger";
  }

  return awayPoints > homePoints
    ? "border border-success table-success"
    : "border border-danger table-danger";
}

function GameRow({ game, bettingData }) {
  const bettingInfo = useMemo(() => {
  return getBettingInfo(game.id, bettingData);
}, [game.id, bettingData]);

  return (
    <tr className={getRowClassName(game)}>
      <td>{game.roundName ?? "-"}</td>
      <td>{game.bracket ?? "-"}</td>
      <td>{formatTournamentTime(game.scheduledRaw || game.scheduled)}</td>
      <td className={getTeamCellClass(game, "home")}>
        <TeamPopoverButton
          team={game.home}
          bracketRank={game.bracketRank}
        />
      </td>
      <td className={getTeamCellClass(game, "away")}>
        <TeamPopoverButton
          team={game.away}
          bracketRank={game.bracketRank}
        />
      </td>
      <td>{bettingInfo || "-"}</td>
      <td>
        <ScoreDisplay game={game} />
      </td>
    </tr>
  );
}

export default memo(GameRow);