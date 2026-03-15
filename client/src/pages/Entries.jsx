export default function Entries() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">Entries are temporarily offline</h3>
          <p className="mb-2">
            This Vercel-ready version is running as a frontend-only tracker.
          </p>
          <p className="mb-0 text-body-secondary">
            You can still use Today, Matchups, and Bracket while the entries backend is being rebuilt.
          </p>
        </div>
      </div>
    </div>
  );
}
