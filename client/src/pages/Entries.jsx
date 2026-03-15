export default function Entries() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">Entries coming back soon</h3>
          <p className="mb-2">
            This frontend-only deploy keeps the tracker live on Vercel while the
            database-backed entries system is offline.
          </p>
          <p className="mb-0 text-body-secondary">
            Once the backend is rebuilt or moved to serverless functions, this page can
            be reconnected without changing the rest of the app.
          </p>
        </div>
      </div>
    </div>
  );
}
