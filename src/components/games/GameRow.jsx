import TeamPopoverButton from "./TeamPopoverButton";
import ScoreDisplay from "./ScoreDisplay";
import { getBettingInfo } from "../../hooks/getBettingInfo";

function formatTime(dateTime) {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return "--:--";
  }

  return parsed.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

export default function GameRow({ game, bettingData }) {
  return (
    <tr className={getRowClassName(game)}>
      <td>{game.roundName ?? "-"}</td>
      <td>{game.bracket ?? "-"}</td>
      <td>{formatTime(game.scheduledRaw || game.scheduled)}</td>
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
      <td>{getBettingInfo(game.id, bettingData) || "-"}</td>
      <td>
        <ScoreDisplay game={game} />
      </td>
    </tr>
  );
}