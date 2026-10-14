type Props = {
  contactText: Record<string, string>;
  socials: Record<string, string>;
};

export function ContactSection({ contactText, socials }: Props) {
  return (
    <section id="contact">
      <div className="contact-inner reveal">
        <div className="section-label">{contactText.eyebrow}</div>
        <h2 className="contact-title">
          {contactText.titleLineOne}
          <br />
          <em>{contactText.titleLineTwo}</em>
        </h2>
        <p className="contact-body">{contactText.body}</p>

        <div className="contact-actions">
          <a href={`mailto:${contactText.emailButton.replace(' →', '')}`} className="btn btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>
            {contactText.emailButton}
          </a>
          <a href={socials.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
            {contactText.githubButton}
          </a>
          <a href={socials.linkedin} className="btn btn-ghost" target="_blank" rel="noreferrer">
            {contactText.linkedinButton}
          </a>
        </div>
      </div>

      <div className="contact-big-text" aria-hidden="true">
        {contactText.backgroundWord}
      </div>
    </section>
  );
}
