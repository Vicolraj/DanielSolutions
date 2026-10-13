type Props = {
  skills: string[];
  titleStart: string;
  titleEnd: string;
  eyebrow: string;
};

export function TechStackSection({ skills, titleStart, titleEnd, eyebrow }: Props) {
  const grouped = [
    { group: 'Cloud & Security', items: skills.filter((skill) => /AWS|HIPAA|Encryption|Audit|Role|VPC|KMS|CloudTrail/i.test(skill)) },
    { group: 'Healthcare Integrations', items: skills.filter((skill) => /FHIR|HL7/i.test(skill)) },
    { group: 'Application Stack', items: skills.filter((skill) => /Node|TypeScript|React|Next|PostgreSQL|Terraform|ECS|Lambda|RDS|S3/i.test(skill)) }
  ].filter((group) => group.items.length);

  return (
    <section id="tech">
      <div className="reveal">
        <div className="section-label">{eyebrow}</div>
        <h2 className="tech-section-title">
          {titleStart} <em>{titleEnd}</em>
        </h2>
      </div>

      <div className="tech-groups">
        {grouped.map((group, gi) => (
          <div key={group.group} className={`tech-group reveal reveal-delay-${Math.min(gi + 1, 4)}`}>
            <div className="tech-group-label">{group.group}</div>
            <div className="tech-items">
              {group.items.map((item) => (
                <span key={item} className="tech-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
