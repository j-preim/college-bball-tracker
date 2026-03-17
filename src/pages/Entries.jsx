import { useMemo } from "react";
import { survivorEntries } from "../data/entriesData";
import {
  resolveSurvivorEntries,
  getSurvivorSummary,
} from "../utils/entries";
import { useTournamentData } from "../hooks/useTournamentData";

function StatusBadge({ status }) {
  const normalized = String(status).toLowerCase();

  const label =
    normalized === "won"
      ? "Won"
      : normalized === "lost"
      ? "Lost"
      : normalized === "active"
      ? "Active"
      : "Pending";

  const styles =
    normalized === "won"
      ? { background: "#dcfce7", color: "#166534" }
      : normalized === "lost"
      ? { background: "#fee2e2", color: "#991b1b" }
      : normalized === "active"
      ? { background: "#dbeafe", color: "#1d4ed8" }
      : { background: "#f3f4f6", color: "#374151" };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        ...styles,
      }}
    >
      {label}
    </span>
  );
}

function PickHistory({ picks = [] }) {
  if (!picks.length) {
    return (
      <div style={{ marginTop: 12, color: "#6b7280" }}>
        No picks entered yet.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thstyle}>Date</th>
            <th style={thStyle}>Round</th>
            <th style={thStyle}>Team</th>
            <th style={thStyle}>Opponent</th>
            <th style={thStyle}>Result</th>
          </tr>
        </thead>
        <tbody>
          {picks.map((pick, index) => (
            <tr key={`${pick.roundId || pick.roundName}-${pick.teamId}-${index}`}>
              <td style={tdStyle}>{pick.gameDate || "—"}</td>
              <td style={tdStyle}>{pick.roundName || pick.roundId || "—"}</td>
              <td style={tdStyle}>{pick.teamName || "—"}</td>
              <td style={tdStyle}>{pick.opponentName || "—"}</td>
              <td style={tdStyle}>
                <StatusBadge status={pick.result} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sectionCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  background: "#565656",
  color: "#ffffff",
};

const thStyle = {
  textAlign: "left",
  padding: "10px 8px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: 13,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px 8px",
  borderBottom: "1px solid #f3f4f6",
  fontSize: 14,
};

export default function Entries() {
  const {
    games,
    loading,
    error,
    lastUpdated,
    refreshTournamentData,
  } = useTournamentData();

  const resolvedEntries = useMemo(() => {
    return resolveSurvivorEntries(survivorEntries, games);
  }, [games]);

  const summary = useMemo(() => {
    return getSurvivorSummary(resolvedEntries);
  }, [resolvedEntries]);

  const sectionCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  background: "#565656",
  color: "#ffffff",
};

const thStyle = {
  textAlign: "left",
  padding: "10px 8px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: 13,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px 8px",
  borderBottom: "1px solid #f3f4f6",
  fontSize: 14,
};

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Entries</h1>
        <p>Loading tournament data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Entries</h1>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button onClick={refreshTournamentData}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Splash NCAAB Survivor Entries</h1>
          <p style={{ marginTop: 8}}>
            Track your entries against live tournament data.
          </p>
          {lastUpdated ? (
            <p style={{ marginTop: 4, fontSize: 13, color: "#83817d" }}>
              Last updated: {lastUpdated}
            </p>
          ) : null}
        </div>

        <button onClick={refreshTournamentData}>Refresh</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={sectionCardStyle}>
          <div style={{ fontSize: 13}}>Total Entries</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {summary.totalEntries}
          </div>
        </div>

        <div style={sectionCardStyle}>
          <div style={{ fontSize: 13 }}>Active</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {summary.activeEntries}
          </div>
        </div>

        <div style={sectionCardStyle}>
          <div style={{ fontSize: 13 }}>Eliminated</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {summary.eliminatedEntries}
          </div>
        </div>
      </div>

      {resolvedEntries.length === 0 ? (
        <div style={sectionCardStyle}>
          <h2 style={{ marginTop: 0 }}>No entries yet</h2>
          <p style={{ marginBottom: 0 }}>
            Add entries in <code>src/data/entriesData.js</code> to start tracking your survivor picks.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {resolvedEntries.map((entry) => (
            <div key={entry.id} style={sectionCardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2 style={{ margin: 0 }}>{entry.name}</h2>
                </div>

                <StatusBadge status={entry.isActive ? "active" : "lost"} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 12 }}>Current Pick</div>
                  <div style={{ fontWeight: 600 }}>
                    {entry.currentPick?.teamName || "—"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Opponent</div>
                  <div style={{ fontWeight: 600 }}>
                    {entry.currentPick?.opponentName || "—"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Current Round</div>
                  <div style={{ fontWeight: 600 }}>
                    {entry.currentPick?.roundName || entry.currentPick?.roundId || "—"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Eliminated In</div>
                  <div style={{ fontWeight: 600 }}>
                    {entry.eliminatedAt || "—"}
                  </div>
                </div>
              </div>

              <PickHistory picks={entry.picks} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}