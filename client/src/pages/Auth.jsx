export default function Auth() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">Login is temporarily disabled</h3>
          <p className="mb-2">
            This Vercel version is running as a static frontend so the old auth API is
            not available right now.
          </p>
          <p className="mb-0 text-body-secondary">
            The public tracker pages still work. Auth can be restored after the backend
            is rebuilt or replaced with serverless endpoints.
          </p>
        </div>
      </div>
    </div>
  );
}
