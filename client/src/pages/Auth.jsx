export default function Auth() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">Login is temporarily offline</h3>
          <p className="mb-2">
            This frontend-only deployment does not include the original Express auth API.
          </p>
          <p className="mb-0 text-body-secondary">
            The tracker pages are live, but sign-in and account creation are disabled until the backend is restored.
          </p>
        </div>
      </div>
    </div>
  );
}
