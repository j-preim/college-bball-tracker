import { useEffect, useMemo, useState } from "react";
import { survivorEntries } from "../data/entriesData";
import {
  resolveSurvivorEntries,
  getSurvivorSummary,
  addEntryPick,
  removeEntryPick,
} from "../utils/entries";
import { loadSavedEntries, saveEntries } from "../utils/entriesStorage";
import { formatDisplayDate } from "../utils/dateHelpers";

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

function PickHistory({ entryId, picks = [], onRemovePick }) {
  if (!picks.length) {
    return (
      <div style={{ marginTop: 12, color: "#6b7280" }}>
        No picks entered yet.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16, overflowX: "auto" }}>
      <table
        className="table table-striped"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead className="table-head">
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Team</th>
            <th style={thStyle}>Opponent</th>
            <th style={thStyle}>Result</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {picks.map((pick, index) => (
            <tr key={`${pick.pickDate}-${pick.teamId}-${index}`}>
              <td style={tdStyle}>{formatDisplayDate(pick.pickDate) || "—"}</td>
              <td style={tdStyle}>
                <span className="seed">{pick.pickedSeed}</span>&nbsp;&nbsp;
                {pick.teamName}
              </td>
              <td style={tdStyle}>
                <span className="seed">{pick.opponentSeed}</span>&nbsp;&nbsp;
                {pick.opponentName}
              </td>
              <td style={tdStyle}>
                <StatusBadge status={pick.result} />
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => onRemovePick(entryId, pick.pickDate)}
                  style={buttonStyle}
                >
                  Remove
                </button>
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
  fontSize: 14,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "8px 6px",
  borderBottom: "1px solid #f3f4f6",
  fontSize: 14,
  alignContent: "center",
};

const inputStyle = {
  width: "100%",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
};

const buttonStyle = {
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  cursor: "pointer",
};

export default function Entries({
  gamesData = [],
  loading = false,
  error = "",
  refreshTournamentData,
}) {
  const [editableEntries, setEditableEntries] = useState(survivorEntries);
  const [selectedEntryId, setSelectedEntryId] = useState(
    survivorEntries[0]?.id || "",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  useEffect(() => {
    const saved = loadSavedEntries();
    if (saved?.length) {
      setEditableEntries(saved);
      setSelectedEntryId(saved[0]?.id || "");
    }
  }, []);

  useEffect(() => {
    saveEntries(editableEntries);
  }, [editableEntries]);

  const selectedEntry = useMemo(() => {
    return (
      editableEntries.find((entry) => entry.id === selectedEntryId) || null
    );
  }, [editableEntries, selectedEntryId]);

  useEffect(() => {
    if (!selectedEntry || !selectedDate) {
      setSelectedTeamId("");
      return;
    }

    const existingPick = selectedEntry.picks?.find(
      (pick) => String(pick.pickDate) === String(selectedDate),
    );

    setSelectedTeamId(existingPick?.teamId || "");
  }, [selectedEntry, selectedDate]);

  const resolvedEntries = useMemo(() => {
    return resolveSurvivorEntries(editableEntries, gamesData);
  }, [editableEntries, gamesData]);

  const summary = useMemo(() => {
    return getSurvivorSummary(resolvedEntries);
  }, [resolvedEntries]);

  const selectedResolvedEntry = useMemo(() => {
    return (
      resolvedEntries.find((entry) => entry.id === selectedEntryId) || null
    );
  }, [resolvedEntries, selectedEntryId]);

  const editorDisabled = selectedResolvedEntry
    ? !selectedResolvedEntry.isActive
    : false;

  const availableDates = useMemo(() => {
    const dates = [
      ...new Set(gamesData.map((game) => game.gameDate).filter(Boolean)),
    ];

    return dates.filter((date) => String(date) >= "2026-03-19").sort();
  }, [gamesData]);

  const selectedEntryPickDates = useMemo(() => {
    return new Set(
      (selectedEntry?.picks || []).map((pick) => String(pick.pickDate)),
    );
  }, [selectedEntry]);

  const availableTeamsForDate = useMemo(() => {
    if (!selectedDate) return [];

    const seen = new Map();

    gamesData.forEach((game) => {
      if (game.gameDate !== selectedDate) return;

      if (game.home?.id) {
        seen.set(game.home.id, {
          teamId: game.home.id,
          teamName: game.home.name,
          seed: game.home.seed ?? null,
        });
      }

      if (game.away?.id) {
        seen.set(game.away.id, {
          teamId: game.away.id,
          teamName: game.away.name,
          seed: game.away.seed ?? null,
        });
      }
    });

    const currentPickForSelectedDate =
      selectedEntry?.picks?.find(
        (pick) => String(pick.pickDate) === String(selectedDate),
      ) || null;

    const usedTeamIds = new Set(
      (selectedEntry?.picks || [])
        .filter((pick) => String(pick.pickDate) !== String(selectedDate))
        .map((pick) => String(pick.teamId)),
    );

    return [...seen.values()]
      .filter((team) => {
        const teamId = String(team.teamId);

        if (
          currentPickForSelectedDate &&
          String(currentPickForSelectedDate.teamId) === teamId
        ) {
          return true;
        }

        return !usedTeamIds.has(teamId);
      })
      .sort((a, b) => {
        const seedA = Number(a.seed ?? 99);
        const seedB = Number(b.seed ?? 99);

        if (seedA !== seedB) return seedA - seedB;

        return String(a.teamName).localeCompare(String(b.teamName));
      });
  }, [gamesData, selectedDate, selectedEntry]);

  function handleSavePick() {
    if (!selectedEntryId || !selectedDate || !selectedTeamId) return;

    const selectedTeam = availableTeamsForDate.find(
      (team) => String(team.teamId) === String(selectedTeamId),
    );

    if (!selectedTeam) return;

    const nextEntries = addEntryPick(editableEntries, selectedEntryId, {
      pickDate: selectedDate,
      teamId: selectedTeam.teamId,
      teamName: selectedTeam.teamName,
      pickedAt: new Date().toISOString(),
    });

    setEditableEntries(nextEntries);
  }

  function handleRemovePick(entryId, pickDate) {
    const nextEntries = removeEntryPick(editableEntries, entryId, pickDate);
    setEditableEntries(nextEntries);
  }

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
    <body style={{ padding: 20 }}>
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
        </div>

        <button onClick={refreshTournamentData} style={buttonStyle}>
          Refresh
        </button>
      </div>

      <div style={{ ...sectionCardStyle, marginBottom: 20 }}>
        <h4 style={{ marginTop: 0 }}>Pick Editor</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            alignItems: "end",
          }}
        >
          <div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>Entry</div>
            <select
              value={selectedEntryId}
              onChange={(e) => setSelectedEntryId(e.target.value)}
              style={inputStyle}
            >
              {editableEntries.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>Date</div>
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              style={inputStyle}
              disabled={editorDisabled}
            >
              <option value="">Select date</option>
              {availableDates.map((date) => {
                const hasPick = selectedEntryPickDates.has(String(date));

                return (
                  <option key={date} value={date}>
                    {formatDisplayDate(date)}
                    {hasPick ? " — saved" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>Team</div>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              style={inputStyle}
              disabled={!selectedDate || editorDisabled}
            >
              <option value="">Select team</option>
              {availableTeamsForDate.map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  <span className="seed">{team.seed}&nbsp;</span>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleSavePick}
              disabled={
                editorDisabled ||
                !selectedEntryId ||
                !selectedDate ||
                !selectedTeamId
              }
              style={buttonStyle}
            >
              Save Pick
            </button>
          </div>
        </div>
      </div>

      {editorDisabled ? (
        <div style={{ marginTop: 12, fontSize: 13, color: "#fca5a5" }}>
          This entry has been eliminated. New picks are disabled.
        </div>
      ) : null}

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
                    <span className="seed">
                      {entry.currentPick?.pickedSeed}
                    </span>
                    &nbsp;&nbsp;{entry.currentPick?.teamName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12 }}>Opponent</div>
                  <div style={{ fontWeight: 600 }}>
                    <span className="seed">
                      {entry.currentPick?.opponentSeed}
                    </span>
                    &nbsp;&nbsp;{entry.currentPick?.opponentName}
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

              <PickHistory
                entryId={entry.id}
                picks={entry.picks}
                onRemovePick={handleRemovePick}
              />
            </div>
          ))}
        </div>
      )}
    </body>
  );
}
