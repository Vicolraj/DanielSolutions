import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="state-screen">
      <div className="section-label">Not found</div>
      <h1 className="work-title">This profile is not available.</h1>
      <Link className="btn btn-primary" href="/">
        Go home
      </Link>
    </section>
  );
}
