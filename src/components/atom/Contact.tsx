import './styles/contact.css';

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner reveal">
        <div className="section-label">Let's Talk</div>
        <h2 className="contact-title">
          Got a project<br />
          in <em>mind?</em>
        </h2>
        <p className="contact-body">
          I'm available for freelance work, from building your MVP from scratch
          to fixing what's broken in production. Tell me what you need.
        </p>

        <div className="contact-actions">
          <a href="mailto:vicolraj@gmail.com" className="btn btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>
            vicolraj@gmail.com →
          </a>
          <a href="https://github.com/vicolraj" className="btn btn-ghost" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="https://linkedin.com/in/vicolraj" className="btn btn-ghost" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="contact-big-text" aria-hidden="true">Let's build</div>
    </section>
  );
}
