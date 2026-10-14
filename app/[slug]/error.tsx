'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="state-screen">
      <div className="section-label">Error</div>
      <h1 className="work-title">Unable to load this portfolio right now.</h1>
      <button className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}
