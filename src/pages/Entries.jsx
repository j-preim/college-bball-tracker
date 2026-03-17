import { useMemo } from "react";
import { survivorEntries } from "../data/entriesData";
import { resolveSurvivorEntries, getSurvivorSummary } from "../utils/entries";
import { useTournamentData } from "../hooks/useTournamentData";
import { formatDisplayDate } from "../utils/dateHelpers";

function formatTeamWithSeed(name, seed) {
  if (!name) return "—";
  if (seed == null || seed === "") return name;
  return `(${seed}) ${name}`;
}

function StatusBadge({ status }) {
  const normalized = String(status).toLowerCase();

  const label =
    normalized === "won"
      ? "Won"
      : normalized === "lost"
        ? "Lost"
        : normalized === "active"
          ? "Active"
          : normalized === "invalid"
            ? "Invalid"
            : "Pending";

  const styles =
    normalized === "won"
      ? { background: "#dcfce7", color: "#166534" }
      : normalized === "lost"
        ? { background: "#fee2e2", color: "#991b1b" }
        : normalized === "active"
          ? { background: "#dbeafe", color: "#1d4ed8" }
          : normalized === "invalid"
            ? { background: "#fef3c7", color: "#92400e" }
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
      <table className="table table-striped" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="table-head">
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Team</th>
            <th style={thStyle}>Opponent</th>
            <th style={thStyle}>Result</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {picks.map((pick, index) => (
            <tr key={`${pick.pickDate}-${pick.teamId}-${index}`}>
              <td style={tdStyle}>{formatDisplayDate(pick.pickDate) || "—"}</td>
              <td style={tdStyle}>
                <span className="seed">{pick.pickedSeed}</span>&nbsp;&nbsp;{pick.teamName}
              </td>
              <td style={tdStyle}>
                <span className="seed">{pick.opponentSeed}</span>&nbsp;&nbsp;{pick.opponentName}
              </td>
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
  const { games, loading, error, lastUpdated, refreshTournamentData } =
    useTournamentData();

  const resolvedEntries = useMemo(() => {
    return resolveSurvivorEntries(survivorEntries, games);
  }, [games]);

  const summary = useMemo(() => {
    return getSurvivorSummary(resolvedEntries);
  }, [resolvedEntries]);

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <h4>Project Payday Survivor Entries</h4>
        <p>Loading tournament data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h4>Project Payday Survivor Entries</h4>
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
          <h4>Project Payday Survivor Entries</h4>
          {/* <p style={{ marginTop: 8}}>
            Track your entries against live tournament data.
          </p> */}
          {/* {lastUpdated ? (
            <p style={{ marginTop: 4, fontSize: 13, color: "#83817d" }}>
              Last updated: {lastUpdated}
            </p>
          ) : null} */}
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
          <div style={{ fontSize: 13 }}>Total Entries</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {summary.totalEntries}
          </div>
        </div>

        <div style={sectionCardStyle}>
          <div style={{ fontSize: 13 }}>Active</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {summary.activeEntries}
          </div>
        </div>

        <div style={sectionCardStyle}>
          <div style={{ fontSize: 13 }}>Eliminated</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {summary.eliminatedEntries}
          </div>
        </div>
      </div>

      {resolvedEntries.length === 0 ? (
        <div style={sectionCardStyle}>
          <h2 style={{ marginTop: 0 }}>No entries yet</h2>
          <p style={{ marginBottom: 0 }}>
            Add entries in <code>src/data/entriesData.js</code> to start
            tracking your survivor picks.
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
                  borderBottom: "1px solid #f3f4f6"
                }}
              >
                {entry.hasValidationErrors ? (
                  <div
                    style={{
                      marginTop: 12,
                      padding: 12,
                      borderRadius: 8,
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      color: "#92400e",
                      fontSize: 14,
                    }}
                  >
                    This entry has validation issues that may make one or more
                    picks invalid.
                  </div>
                ) : null}
                <div>
                  <h4 style={{ margin: 0 }}>{entry.name}</h4>
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
                    <span className="seed">{entry.currentPick?.pickedSeed}</span>&nbsp;&nbsp;{entry.currentPick?.teamName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Opponent</div>
                  <div style={{ fontWeight: 600 }}>
                    <span className="seed">{entry.currentPick?.opponentSeed}</span>&nbsp;&nbsp;{entry.currentPick?.opponentName}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12 }}>Pick Date</div>
                  <div style={{ fontWeight: 600 }}>
                    {formatDisplayDate(entry.currentPick?.pickDate) || "—"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Eliminated On</div>
                  <div style={{ fontWeight: 600 }}>
                    {formatDisplayDate(entry.eliminatedAt) || "—"}
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
