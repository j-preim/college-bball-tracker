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

function useIsMobile() {
  const getIsMobile = () =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

function StatusBadge({ status, isMobile }) {
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
          ? { background: "#dbeafe", color: "#166534" }
          : normalized === "invalid"
            ? { background: "#fef3c7", color: "#92400e" }
            : {
                background: "#374151",
                color: "#f3f4f6",
                outline: "1px solid #6b7280",
              };

  return (
    <span
      style={{
        display: "inline-block",
        padding: isMobile ? "2px 6px" : "4px 10px",
        borderRadius: 999,
        fontSize: isMobile ? 10 : 12,
        fontWeight: 600,
        ...styles,
      }}
    >
      {label}
    </span>
  );
}

function PickHistory({ entryId, picks = [], onRemovePick, isMobile }) {
  if (!picks.length) {
    return (
      <div style={{ marginTop: 12, color: "#ffffff" }}>
        No picks entered yet.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12, overflowX: "auto" }}>
      {isMobile ? (
        <div style={{ marginTop: 2, display: "grid", gap: 8 }}>
          {picks.map((pick, index) => (
            <div
              key={`${pick.pickDate}-${pick.teamId}-${index}`}
              style={{
                border: "1px solid #6b7280",
                borderRadius: 8,
                padding: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  fontSize: 12,
                  marginBottom: 8,
                  justifyContent: "space-between",
                }}
              >
                {formatDisplayDate(pick.pickDate) || "—"}
                <StatusBadge status={pick.result} isMobile={true} />
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: "larger" }}>
                  <span className="seed">
                    {pick.pickedSeed}&nbsp;&nbsp;
                    {pick.teamName}&nbsp;
                  </span>
                  &nbsp;vs&nbsp; {pick.opponentSeed}&nbsp;&nbsp;
                  {pick.opponentName}
                </div>
                <button
                  onClick={() => onRemovePick(entryId, pick.pickDate)}
                  style={{
                    padding: "1px 4px",
                    borderRadius: 2,
                    border: "1px solid #d1d5db",
                    background: "#ffffff",
                    color: "#111827",
                    fontSize: "x-small",
                    cursor: "pointer",
                    width: "auto",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table
          className="table table-striped"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 500,
          }}
        >
          <thead className="table-head">
            <tr>
              <th style={thStyle(isMobile)}>Date</th>
              <th style={thStyle(isMobile)}>Pick</th>
              <th style={thStyle(isMobile)}>Opponent</th>
              <th style={thStyle(isMobile)}>Result</th>
              <th style={thStyle(isMobile)}>Actions</th>
            </tr>
          </thead>
          <tbody className="table-light">
            {picks.map((pick, index) => (
              <tr key={`${pick.pickDate}-${pick.teamId}-${index}`}>
                <td style={tdStyle(isMobile)}>
                  {formatDisplayDate(pick.pickDate) || "—"}
                </td>
                <td style={tdStyle(isMobile)}>
                  <span className="seed">{pick.pickedSeed}</span>&nbsp;&nbsp;
                  {pick.teamName}
                </td>
                <td style={tdStyle(isMobile)}>
                  <span className="seed">{pick.opponentSeed}</span>&nbsp;&nbsp;
                  {pick.opponentName}
                </td>
                <td style={tdStyle(isMobile)}>
                  <StatusBadge status={pick.result} isMobile={true} />
                </td>
                <td style={tdStyle(isMobile)}>
                  <button
                    onClick={() => onRemovePick(entryId, pick.pickDate)}
                    style={{
                      ...buttonStyle(isMobile),
                      width: "auto",
                      fontSize: "smaller",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const sectionCardStyle = (isMobile) => ({
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: isMobile ? 10 : 12,
  background: "#565656",
  color: "#ffffff",
});

const thStyle = (isMobile) => ({
  textAlign: "left",
  padding: isMobile ? "6px 4px" : "10px 8px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: isMobile ? 11 : 14,
  whiteSpace: "nowrap",
});

const tdStyle = (isMobile) => ({
  padding: isMobile ? "6px 4px" : "8px 6px",
  borderBottom: "1px solid #f3f4f6",
  fontSize: isMobile ? 11 : 14,
  verticalAlign: "middle",
});

const inputStyle = {
  width: "100%",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
};

const buttonStyle = (isMobile) => ({
  padding: isMobile ? "4px 6px" : "6px 10px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  fontSize: isMobile ? "x-small" : "small",
  cursor: "pointer",
});

function createEntryId(name = "") {
  const slug = String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `entry-${slug || "custom"}-${Date.now()}`;
}

export default function Entries({
  gamesData = [],
  loading = false,
  error = "",
  refreshTournamentData,
}) {
  const isMobile = useIsMobile();

  const [editableEntries, setEditableEntries] = useState(survivorEntries);
  const [selectedEntryId, setSelectedEntryId] = useState(
    survivorEntries[0]?.id || "",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [newEntryName, setNewEntryName] = useState("");
  const [entryError, setEntryError] = useState("");
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);

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

  const sortedResolvedEntries = useMemo(() => {
    return [...resolvedEntries].sort((a, b) => {
      if (a.isActive === b.isActive) {
        return String(a.name).localeCompare(String(b.name));
      }

      return a.isActive ? -1 : 1;
    });
  }, [resolvedEntries]);

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

  function handleAddEntry() {
    const trimmedName = newEntryName.trim();

    if (!trimmedName) {
      setEntryError("Enter an entry name.");
      return;
    }

    const duplicateName = editableEntries.some(
      (entry) =>
        String(entry.name).trim().toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicateName) {
      setEntryError("An entry with that name already exists.");
      return;
    }

    const newEntry = {
      id: createEntryId(trimmedName),
      name: trimmedName,
      picks: [],
    };

    const nextEntries = [...editableEntries, newEntry];

    setEditableEntries(nextEntries);
    setSelectedEntryId(newEntry.id);
    setSelectedDate("");
    setSelectedTeamId("");
    setNewEntryName("");
    setEntryError("");
    setIsAddEntryOpen(false);
  }

  function handleDeleteEntry(entryId) {
    const entryToDelete = editableEntries.find((entry) => entry.id === entryId);
    if (!entryToDelete) return;

    const confirmed = window.confirm(
      `Delete entry "${entryToDelete.name}"? This will remove all saved picks for it.`,
    );

    if (!confirmed) return;

    const nextEntries = editableEntries.filter((entry) => entry.id !== entryId);
    setEditableEntries(nextEntries);

    if (selectedEntryId === entryId) {
      setSelectedEntryId(nextEntries[0]?.id || "");
      setSelectedDate("");
      setSelectedTeamId("");
    }
  }

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
        <h4 style={{ margin: 0, fontSize: isMobile ? 16 : 20 }}>
          Project Payday Survivor Entries
        </h4>
        <p>Loading tournament data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h4 style={{ margin: 0, fontSize: isMobile ? 16 : 20 }}>
          Project Payday Survivor Entries
        </h4>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button onClick={refreshTournamentData} style={buttonStyle(isMobile)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? 12 : 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: isMobile ? 16 : 20 }}>
            Project Payday Survivor Entries
          </h4>
        </div>

        {/* <button onClick={refreshTournamentData} style={buttonStyle(isMobile)}>
          Refresh
        </button> */}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            ...sectionCardStyle(isMobile),
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 13 }}>Total Entries</div>
            <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700 }}>
              {summary.totalEntries}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13 }}>Active</div>
            <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700 }}>
              {summary.activeEntries}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13 }}>Eliminated</div>
            <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700 }}>
              {summary.eliminatedEntries}
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...sectionCardStyle(isMobile), marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ marginTop: 0, fontSize: isMobile ? 16 : 20 }}>
            Pick Editor
          </h4>
          {selectedEntryId ? (
            <div style={{ marginBottom: "0.5rem" }}>
              <button
                onClick={() => handleDeleteEntry(selectedEntryId)}
                style={{
                  ...buttonStyle(isMobile),
                  background: "#fee2e2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                }}
              >
                Delete Selected Entry
              </button>
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            alignItems: "end",
          }}
        >
          <div>
            <div style={{ fontSize: isMobile ? 11 : 12, marginBottom: 6 }}>
              Entry
            </div>
            <select
              value={selectedEntryId}
              onChange={(e) => setSelectedEntryId(e.target.value)}
              style={inputStyle}
            >
              {sortedResolvedEntries.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                  {!entry.isActive ? " — eliminated" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={{ fontSize: isMobile ? 11 : 12, marginBottom: 6 }}>
              Date
            </div>
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              style={inputStyle}
              disabled={editorDisabled || !selectedEntryId}
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
            <div style={{ fontSize: isMobile ? 11 : 12, marginBottom: 6 }}>
              Team
            </div>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              style={inputStyle}
              disabled={!selectedDate || editorDisabled || !selectedEntryId}
            >
              <option value="">Select team</option>
              {availableTeamsForDate.map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  {team.seed ? `${team.seed} ` : ""}
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
              style={{
                ...buttonStyle(isMobile),
                width: isMobile ? "100%" : "auto",
              }}
            >
              Save Pick
            </button>
          </div>
        </div>
      </div>

      {editorDisabled ? (
        <div
          style={{
            marginTop: -8,
            marginBottom: 20,
            fontSize: 13,
            color: "#fca5a5",
          }}
        >
          This entry has been eliminated. New picks are disabled.
        </div>
      ) : null}

      <div style={{ ...sectionCardStyle(isMobile), marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => setIsAddEntryOpen((prev) => !prev)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
          }}
        >
          <h4 style={{ margin: 0, fontSize: isMobile ? 16 : 20 }}>
            Add New Entry
          </h4>
          <span
            style={{
              fontSize: isMobile ? 20 : 24,
              fontWeight: 700,
              lineHeight: 1,
              minWidth: 24,
              textAlign: "center",
            }}
          >
            {isAddEntryOpen ? "−" : "+"}
          </span>
        </button>

        {isAddEntryOpen ? (
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "minmax(240px, 1fr) auto",
                gap: 12,
                alignItems: "end",
              }}
            >
              <div>
                <div style={{ fontSize: isMobile ? 11 : 12, marginBottom: 6 }}>
                  Entry Name
                </div>
                <input
                  type="text"
                  value={newEntryName}
                  onChange={(e) => {
                    setNewEntryName(e.target.value);
                    if (entryError) setEntryError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddEntry();
                    }
                  }}
                  placeholder="Enter a new entry name"
                  style={inputStyle}
                />
              </div>

              <div>
                <button
                  onClick={handleAddEntry}
                  style={{
                    ...buttonStyle(isMobile),
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Add Entry
                </button>
              </div>
            </div>

            {entryError ? (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#fecaca",
                }}
              >
                {entryError}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {sortedResolvedEntries.length === 0 ? (
        <div style={sectionCardStyle(isMobile)}>
          <h2 style={{ marginTop: 0 }}>No entries yet</h2>
          <p style={{ marginBottom: 0 }}>
            Add your first entry above to start tracking survivor picks.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {sortedResolvedEntries.map((entry) => (
            <div key={entry.id} style={sectionCardStyle(isMobile)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: isMobile ? "" : "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: isMobile ? 15 : 18 }}>
                    {entry.name}
                  </h4>
                </div>

                <StatusBadge
                  status={entry.isActive ? "active" : "lost"}
                  isMobile={true}
                />
              </div>

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

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: isMobile ? 11 : 12 }}>
                    Current Pick
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    <span className="seed">
                      {entry.currentPick?.pickedSeed}
                    </span>
                    &nbsp;&nbsp;
                    {entry.currentPick?.teamName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: isMobile ? 11 : 12 }}>Seed Total</div>
                  <div style={{ fontWeight: 600 }}>
                    {(entry.picks || []).reduce(
                      (total, pick) => total + Number(pick.pickedSeed ?? 0),
                      0,
                    )}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: entry.isActive ? "none" : "",
                      fontSize: isMobile ? 11 : 12,
                    }}
                  >
                    Eliminated On
                  </div>
                  <div
                    style={{
                      display: entry.isActive ? "none" : "",
                      fontWeight: 600,
                    }}
                  >
                    {formatDisplayDate(entry.eliminatedAt) || "—"}
                  </div>
                </div>
              </div>

              <PickHistory
                entryId={entry.id}
                picks={entry.picks}
                onRemovePick={handleRemovePick}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
