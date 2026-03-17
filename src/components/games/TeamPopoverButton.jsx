import { useEffect, useMemo, useRef } from "react";
import { Popover } from "bootstrap";
import { getTeamStats } from "../../hooks/getTeamStats";

function buildPopoverHtml(team, bracketRank, teamStats) {
  const impliedRank =
    typeof team?.seed === "number" && typeof bracketRank === "number"
      ? team.seed * 4 - (4 - bracketRank)
      : "-";

  return `
    <div class="small">
      <div><strong>Seed:</strong> ${team?.seed ?? "-"}</div>
      <div><strong>Implied Rank:</strong> ${impliedRank}</div>
      <div><strong>RPI Rank:</strong> ${teamStats?.rank ?? "-"}</div>
      <div><strong>Overall Record:</strong> ${teamStats?.wins ?? "-"}-${teamStats?.losses ?? "-"}</div>
      <div><strong>Home Record:</strong> ${teamStats?.home_wins ?? "-"}-${teamStats?.home_losses ?? "-"}</div>
      <div><strong>Away Record:</strong> ${teamStats?.away_wins ?? "-"}-${teamStats?.away_losses ?? "-"}</div>
      <div><strong>Strength of Schedule:</strong> ${teamStats?.sos ?? "-"}</div>
      <div><strong>Top 25 Record:</strong> ${teamStats?.opponents?.[0]?.wins ?? "-"}-${teamStats?.opponents?.[0]?.losses ?? "-"}</div>
      <div><strong>Top 50 Record:</strong> ${teamStats?.opponents?.[1]?.wins ?? "-"}-${teamStats?.opponents?.[1]?.losses ?? "-"}</div>
    </div>
  `;
}

export default function TeamPopoverButton({ team, bracketRank }) {
  const buttonRef = useRef(null);

  const teamStats = useMemo(() => {
    if (!team?.id) {
      return null;
    }

    try {
      return getTeamStats(team.id);
    } catch {
      return null;
    }
  }, [team]);

  useEffect(() => {
    if (!buttonRef.current || !team?.id) {
      return undefined;
    }

    const popover = new Popover(buttonRef.current, {
      html: true,
      trigger: "hover focus",
      placement: "top",
      delay: { show: 250, hide: 0 },
      title: team?.name ?? "Team",
      content: buildPopoverHtml(team, bracketRank, teamStats),
    });

    return () => {
      popover.dispose();
    };
  }, [team, bracketRank, teamStats]);

  if (!team) {
    return <span className="text-body-secondary">TBD</span>;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-link btn-sm p-0 text-decoration-none team-popover-button"
    >
      <span className="badge rounded-pill text-bg-light border me-1">
        {team.seed ?? "-"}
      </span>
      <span>{team.name}</span>
    </button>
  );
}