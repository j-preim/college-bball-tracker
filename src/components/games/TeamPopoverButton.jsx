import { useEffect, useMemo, useRef } from "react";
import { Popover } from "bootstrap";
import { getTeamStats } from "../../hooks/getTeamStats";
import kenpomData from "../../data/kenpom.json";
import {
  buildTeamLookup,
  canonicalizeTeamName,
} from "../../utils/teamNameUtils";

const kenpomByTeam = buildTeamLookup(kenpomData, "team");

const MASCOT_SUFFIXES = [
  "Aggies",
  "Badgers",
  "Bears",
  "Billikens",
  "Bison",
  "Blue Devils",
  "Boilermakers",
  "Broncos",
  "Buckeyes",
  "Bulls",
  "Bulldogs",
  "Cardinals",
  "Cavaliers",
  "Commodores",
  "Cougars",
  "Cowboys",
  "Crimson Tide",
  "Cyclones",
  "Fighting Illini",
  "Gators",
  "Gaels",
  "Gamecocks",
  "Hawks",
  "Horned Frogs",
  "Hurricanes",
  "Huskies",
  "Jayhawks",
  "Lancers",
  "Longhorns",
  "Mustangs",
  "Owls",
  "Paladins",
  "Panthers",
  "Pride",
  "Quakers",
  "Raiders",
  "Rainbow Warriors",
  "Rams",
  "Razorbacks",
  "Rebels",
  "Red Raiders",
  "Red Storm",
  "RedHawks",
  "Royals",
  "Saints",
  "Spartans",
  "Tar Heels",
  "Tigers",
  "Trojans",
  "Vandals",
  "Volunteers",
  "Wildcats",
  "Wolverines",
  "Wolfpack",
  "Zips",
  "Cornhuskers",
];

function extractSchoolName(fullName = "") {
  const trimmed = String(fullName).trim();
  const sortedSuffixes = [...MASCOT_SUFFIXES].sort(
    (a, b) => b.length - a.length,
  );

  for (const suffix of sortedSuffixes) {
    if (trimmed.endsWith(` ${suffix}`)) {
      return trimmed.slice(0, -(suffix.length + 1)).trim();
    }
  }

  return trimmed;
}

function formatValue(value) {
  return value ?? "-";
}

function buildPopoverHtml(team, bracketRank, teamStats, kenpomStats) {
  const impliedRank =
    typeof team?.seed === "number" && typeof bracketRank === "number"
      ? team.seed * 4 - (4 - bracketRank)
      : "-";

  return `
    <div class="small">
      <div><strong>Seed:</strong> ${team?.seed ?? "-"}</div>
      <div><strong>Implied Rank:</strong> ${impliedRank}</div>
      <div><strong>RPI Rank:</strong> ${teamStats?.rank ?? "-"}</div>
      <div><strong>KenPom Rank:</strong> ${formatValue(kenpomStats?.rk)}</div>
      <div><strong>KenPom Off/Def Rank:</strong> ${formatValue(kenpomStats?.ortg_rk)} / ${formatValue(kenpomStats?.drtg_rk)}</div>
      <div><strong>Overall Record:</strong> ${teamStats?.wins ?? "-"}-${teamStats?.losses ?? "-"}</div>
      <div><strong>Home/Away Record:</strong> ${teamStats?.home_wins ?? "-"}-${teamStats?.home_losses ?? "-"} / ${teamStats?.away_wins ?? "-"}-${teamStats?.away_losses ?? "-"}</div>
      <div><strong>Strength of Schedule:</strong> ${teamStats?.sos ?? "-"}</div>
      <div><strong>KenPom SOS Rank:</strong> ${formatValue(kenpomStats?.sos_netrtg_rk)}</div>
      <div><strong>Top 25/50 Record:</strong> ${teamStats?.opponents?.[0]?.wins ?? "-"}-${teamStats?.opponents?.[0]?.losses ?? "-"} / ${teamStats?.opponents?.[1]?.wins ?? "-"}-${teamStats?.opponents?.[1]?.losses ?? "-"}</div>
    </div>
  `;
}

// other available kenpom stats
// <div><strong>KenPom Net:</strong> ${formatValue(kenpomStats?.netrtg)}</div>
// <div><strong>Off Rating:</strong> ${formatValue(kenpomStats?.ortg)}</div>
// <div><strong>Def Rating:</strong> ${formatValue(kenpomStats?.drtg)}</div>
// <div><strong>Adj Tempo:</strong> ${formatValue(kenpomStats?.adjtempo)}</div>
// <div><strong>KenPom Tempo Rank:</strong> ${formatValue(kenpomStats?.adjtempo_rk)}</div>
// <div><strong>Luck:</strong> ${formatValue(kenpomStats?.luck)}</div>
// <div><strong>KenPom Luck Rank:</strong> ${formatValue(kenpomStats?.luck_rk)}</div>
// <div><strong>SOS Net:</strong> ${formatValue(kenpomStats?.sos_netrtg)}</div>
// <div><strong>SOS Off:</strong> ${formatValue(kenpomStats?.sos_ortg)}</div>
// <div><strong>SOS Off Rank:</strong> ${formatValue(kenpomStats?.sos_ortg_rk)}</div>
// <div><strong>SOS Def:</strong> ${formatValue(kenpomStats?.sos_drtg)}</div>
// <div><strong>SOS Def Rank:</strong> ${formatValue(kenpomStats?.sos_drtg_rk)}</div>
// <div><strong>Non-Conf Net:</strong> ${formatValue(kenpomStats?.nonconf_netrtg)}</div>
// <div><strong>Non-Conf Net Rank:</strong> ${formatValue(kenpomStats?.nonconf_netrtg_rk)}</div>

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

  const kenpomLookupName = useMemo(() => {
    return extractSchoolName(team?.name || "");
  }, [team?.name]);

  const kenpomStats = useMemo(() => {
    if (!kenpomLookupName) {
      return null;
    }

    return kenpomByTeam[canonicalizeTeamName(kenpomLookupName)] ?? null;
  }, [kenpomLookupName]);

  // 🔍 TEMP DEBUG
  if (team?.name && !kenpomStats) {
  console.log("KENPOM MISS:", {
    name: team.name,
    extracted: extractSchoolName(team.name),
    normalized: canonicalizeTeamName(extractSchoolName(team.name)),
  });
}

  useEffect(() => {
    if (!buttonRef.current || !team?.name) {
      return undefined;
    }

    const popover = new Popover(buttonRef.current, {
      html: true,
      trigger: "hover focus",
      placement: "top",
      delay: { show: 250, hide: 0 },
      title: team?.name ?? "Team",
      content: buildPopoverHtml(team, bracketRank, teamStats, kenpomStats),
    });

    return () => {
      popover.dispose();
    };
  }, [team, bracketRank, teamStats, kenpomStats]);

  if (!team) {
    return <span className="text-body-secondary">TBD</span>;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-sm p-0 text-decoration-none teamNamePopover"
    >
      <span className="seed">{team.seed ?? "-"}</span> &nbsp;
      <span>{team.name}</span>
    </button>
  );
}
