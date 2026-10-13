import bcrypt from 'bcryptjs';
import { PrismaClient, TestimonialType } from '@prisma/client';

const prisma = new PrismaClient();

type SeedProfile = {
  slug: string;
  displayName: string;
  username: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  accentColor: string;
  heroText: Record<string, string>;
  aboutText: Record<string, string>;
  contactText: Record<string, string>;
  footerText: Record<string, string>;
  navLabels: Record<string, string>;
  sectionTitles: Record<string, string>;
  socials: Record<string, string>;
  skills: string[];
  stats: Array<{ label: string; value: string }>;
};

const profiles: SeedProfile[] = [
  {
    slug: 'danielsolutions',
    displayName: 'Daniel Solutions',
    username: 'danielsolutions',
    role: 'HIPAA compliant AWS software developer',
    headline: 'Secure healthcare software on AWS',
    bio: 'I design and deliver secure healthcare platforms on AWS with HIPAA aligned controls, practical audit trails, and resilient infrastructure for regulated patient workflows.',
    location: 'Remote',
    email: 'hello@danielsolutions.dev',
    phone: '+1 (555) 010-0202',
    accentColor: '#ff0055',
    heroText: {
      firstName: 'Daniel',
      lastName: 'Solutions',
      lineOne: 'Secure AWS',
      lineTwo: 'Healthcare Software',
      subtext: 'I build HIPAA aligned healthcare platforms on AWS using encrypted data pipelines, auditable access controls, and modern TypeScript services.',
      primaryCta: 'See my work ↓',
      secondaryCta: 'Get in touch',
      imageAlt: 'Secure healthcare software architecture on a laptop'
    },
    aboutText: {
      title: 'Built for compliance and reliability',
      body: 'My work combines healthcare domain workflows with AWS architecture to ship systems that protect PHI and scale under clinical demand.',
      longBody: 'From patient intake to integration layers, I focus on encryption at rest and in transit, role based access, and traceable operations for regulated teams.'
    },
    contactText: {
      eyebrow: 'Let us talk',
      titleLineOne: 'Need secure healthcare',
      titleLineTwo: 'software on AWS?',
      body: 'Share your roadmap and I can help scope architecture, delivery milestones, and compliance ready engineering execution.',
      emailButton: 'hello@danielsolutions.dev →',
      githubButton: 'GitHub ↗',
      linkedinButton: 'LinkedIn ↗',
      backgroundWord: 'Secure build'
    },
    footerText: {
      tagline: 'HIPAA aligned AWS software delivery',
      bottomLeft: '© Daniel Solutions',
      bottomRight: 'AWS · TypeScript · Next.js · PostgreSQL · Terraform'
    },
    navLabels: {
      work: 'Work',
      stack: 'Stack',
      testimonials: 'Reviews',
      contact: 'Contact',
      hire: 'Hire me →',
      moreProjects: 'More projects',
      moreReviews: 'More reviews',
      liveSite: 'Live site ↗',
      caseStudy: 'Case study →',
      github: 'GitHub ↗'
    },
    sectionTitles: {
      heroLabel: 'Now shipping',
      workEyebrow: 'Selected work',
      workTitleStart: 'Healthcare systems',
      workTitleEnd: 'on AWS.',
      stackEyebrow: 'Tools of the trade',
      stackTitleStart: 'Core',
      stackTitleEnd: 'stack.',
      testimonialEyebrow: 'Testimonials',
      testimonialTitle: 'What teams say',
      projectPageTitle: 'All projects',
      testimonialPageTitle: 'All reviews'
    },
    socials: {
      github: 'https://github.com/danielsolutions',
      linkedin: 'https://www.linkedin.com/in/danielsolutions'
    },
    skills: [
      'AWS Lambda',
      'Amazon ECS',
      'Amazon RDS',
      'Amazon S3',
      'AWS KMS',
      'AWS CloudTrail',
      'Amazon VPC',
      'HIPAA compliance',
      'Encryption at rest and in transit',
      'Audit logging',
      'Role based access',
      'FHIR/HL7 integrations',
      'Node.js',
      'TypeScript',
      'React',
      'Next.js',
      'PostgreSQL',
      'Terraform'
    ],
    stats: [
      { label: 'Years building', value: '8+' },
      { label: 'Healthcare projects', value: '24+' },
      { label: 'AWS domains', value: '9' }
    ]
  },
  {
    slug: 'northstar-clinic-tech',
    displayName: 'Northstar Clinic Tech',
    username: 'northstarclinic',
    role: 'Healthcare cloud engineer',
    headline: 'Placeholder portfolio profile for future edits',
    bio: 'Placeholder profile content using the same portfolio template for multi profile demonstrations.',
    location: 'Austin, TX',
    email: 'northstar@example.com',
    phone: '+1 (555) 010-0303',
    accentColor: '#60a5fa',
    heroText: {
      firstName: 'Northstar',
      lastName: 'Clinic',
      lineOne: 'Placeholder AWS',
      lineTwo: 'Healthcare profile',
      subtext: 'Placeholder profile seeded for editing in admin.',
      primaryCta: 'See my work ↓',
      secondaryCta: 'Get in touch',
      imageAlt: 'Placeholder portfolio image'
    },
    aboutText: { title: 'Placeholder profile', body: 'Replace this profile with your own content.', longBody: 'This profile is intentionally generic for demonstration.' },
    contactText: {
      eyebrow: 'Let us talk',
      titleLineOne: 'Planning updates',
      titleLineTwo: 'for this profile?',
      body: 'Use the admin panel to replace this placeholder data.',
      emailButton: 'northstar@example.com →',
      githubButton: 'GitHub ↗',
      linkedinButton: 'LinkedIn ↗',
      backgroundWord: 'Placeholder'
    },
    footerText: { tagline: 'Placeholder profile', bottomLeft: '© Northstar Clinic Tech', bottomRight: 'Placeholder stack line' },
    navLabels: { work: 'Work', stack: 'Stack', testimonials: 'Reviews', contact: 'Contact', hire: 'Hire me →', moreProjects: 'More projects', moreReviews: 'More reviews', liveSite: 'Live site ↗', caseStudy: 'Case study →', github: 'GitHub ↗' },
    sectionTitles: { heroLabel: 'Placeholder', workEyebrow: 'Selected work', workTitleStart: 'Projects for', workTitleEnd: 'review.', stackEyebrow: 'Tools', stackTitleStart: 'Technical', stackTitleEnd: 'stack.', testimonialEyebrow: 'Reviews', testimonialTitle: 'Feedback', projectPageTitle: 'All projects', testimonialPageTitle: 'All reviews' },
    socials: { github: 'https://github.com/example', linkedin: 'https://linkedin.com/in/example' },
    skills: ['AWS Lambda', 'TypeScript', 'Next.js', 'PostgreSQL'],
    stats: [
      { label: 'Years building', value: '5+' },
      { label: 'Projects', value: '12+' },
      { label: 'Regions', value: '3' }
    ]
  },
  {
    slug: 'harbor-health-platforms',
    displayName: 'Harbor Health Platforms',
    username: 'harborhealth',
    role: 'Secure software consultant',
    headline: 'Placeholder profile for healthcare SaaS consulting',
    bio: 'Placeholder content profile that shares the same design and schema for quick replacement.',
    location: 'Seattle, WA',
    email: 'harbor@example.com',
    phone: '+1 (555) 010-0404',
    accentColor: '#5bc47a',
    heroText: {
      firstName: 'Harbor',
      lastName: 'Health',
      lineOne: 'Placeholder secure',
      lineTwo: 'software profile',
      subtext: 'Placeholder profile seeded for admin editing workflows.',
      primaryCta: 'See my work ↓',
      secondaryCta: 'Get in touch',
      imageAlt: 'Placeholder profile cover image'
    },
    aboutText: { title: 'Placeholder profile', body: 'Replace this content in admin.', longBody: 'This sample keeps the same template and styling for all profiles.' },
    contactText: {
      eyebrow: 'Let us talk',
      titleLineOne: 'Ready to customize',
      titleLineTwo: 'this profile?',
      body: 'Update copy, projects, and testimonials from the admin panel.',
      emailButton: 'harbor@example.com →',
      githubButton: 'GitHub ↗',
      linkedinButton: 'LinkedIn ↗',
      backgroundWord: 'Template'
    },
    footerText: { tagline: 'Placeholder profile', bottomLeft: '© Harbor Health Platforms', bottomRight: 'Placeholder stack line' },
    navLabels: { work: 'Work', stack: 'Stack', testimonials: 'Reviews', contact: 'Contact', hire: 'Hire me →', moreProjects: 'More projects', moreReviews: 'More reviews', liveSite: 'Live site ↗', caseStudy: 'Case study →', github: 'GitHub ↗' },
    sectionTitles: { heroLabel: 'Placeholder', workEyebrow: 'Selected work', workTitleStart: 'Projects for', workTitleEnd: 'review.', stackEyebrow: 'Tools', stackTitleStart: 'Technical', stackTitleEnd: 'stack.', testimonialEyebrow: 'Reviews', testimonialTitle: 'Feedback', projectPageTitle: 'All projects', testimonialPageTitle: 'All reviews' },
    socials: { github: 'https://github.com/example', linkedin: 'https://linkedin.com/in/example' },
    skills: ['AWS ECS', 'Node.js', 'React', 'Terraform'],
    stats: [
      { label: 'Years building', value: '6+' },
      { label: 'Projects', value: '15+' },
      { label: 'Integrations', value: '11' }
    ]
  }
];

const danielProjects = [
  {
    title: 'Patient Portal Access Hub',
    slug: 'patient-portal-access-hub',
    category: 'website',
    year: 2026,
    description: 'Placeholder project for a secure patient portal with role based access and encrypted records.',
    longDescription: 'Placeholder build for patient messaging, document retrieval, and appointment workflows using AWS managed identity and encrypted storage.',
    role: 'Lead full stack engineer',
    tools: ['Next.js', 'TypeScript', 'AWS Cognito', 'AWS Lambda', 'PostgreSQL'],
    liveUrl: 'https://example.com/patient-portal-placeholder',
    caseStudyUrl: 'https://example.com/patient-portal-case-study',
    order: 1,
    featured: true,
    placeholder: true,
    images: [
      { url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', publicId: 'demo/sample', alt: 'Patient portal dashboard placeholder', order: 0, isCover: true },
      { url: 'https://res.cloudinary.com/demo/image/upload/sea_turtle.jpg', publicId: 'demo/sea_turtle', alt: 'Portal activity stream placeholder', order: 1, isCover: false }
    ]
  },
  {
    title: 'Telehealth Session Backend',
    slug: 'telehealth-session-backend',
    category: 'website',
    year: 2026,
    description: 'Placeholder telehealth API with HIPAA aligned audit logging and session lifecycle events.',
    longDescription: 'Placeholder service architecture using ECS and RDS for secure encounter metadata, clinician notes, and event tracking.',
    role: 'Backend architect',
    tools: ['Node.js', 'Amazon ECS', 'Amazon RDS', 'AWS CloudTrail', 'AWS KMS'],
    liveUrl: 'https://example.com/telehealth-backend-placeholder',
    caseStudyUrl: 'https://example.com/telehealth-backend-case-study',
    order: 2,
    featured: true,
    placeholder: true,
    images: [
      { url: 'https://res.cloudinary.com/demo/image/upload/mountain.jpg', publicId: 'demo/mountain', alt: 'Telehealth architecture placeholder', order: 0, isCover: true }
    ]
  },
  {
    title: 'Secure Document Vault',
    slug: 'secure-document-vault',
    category: 'component',
    year: 2025,
    description: 'Placeholder vault for intake packets and discharge files with strict encryption controls.',
    longDescription: 'Placeholder workflow for encrypted upload, malware checks, and role based retrieval for care teams.',
    role: 'Cloud security engineer',
    tools: ['Amazon S3', 'AWS Lambda', 'AWS KMS', 'Cloudinary', 'Next.js'],
    liveUrl: 'https://example.com/document-vault-placeholder',
    caseStudyUrl: 'https://example.com/document-vault-case-study',
    order: 3,
    featured: true,
    placeholder: true,
    images: [
      { url: 'https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg', publicId: 'demo/leather-bag-gray', alt: 'Document vault placeholder view', order: 0, isCover: true }
    ]
  },
  {
    title: 'Clinical Audit Pipeline',
    slug: 'clinical-audit-pipeline',
    category: 'animation',
    year: 2025,
    description: 'Placeholder event pipeline for immutable audit records and investigation exports.',
    longDescription: 'Placeholder platform streaming audit entries from application services into searchable operational dashboards.',
    role: 'Platform engineer',
    tools: ['AWS Lambda', 'Amazon SQS', 'PostgreSQL', 'TypeScript'],
    liveUrl: 'https://example.com/audit-pipeline-placeholder',
    caseStudyUrl: 'https://example.com/audit-pipeline-case-study',
    order: 4,
    featured: false,
    placeholder: true,
    images: [
      { url: 'https://res.cloudinary.com/demo/image/upload/samples/landscapes/girl-urban-view.jpg', publicId: 'demo/girl-urban-view', alt: 'Audit pipeline placeholder analytics', order: 0, isCover: true }
    ]
  },
  {
    title: 'FHIR Integration Gateway',
    slug: 'fhir-integration-gateway',
    category: 'website',
    year: 2024,
    description: 'Placeholder integration layer for FHIR and HL7 interoperability across partner systems.',
    longDescription: 'Placeholder adapter service normalizing inbound and outbound records with structured validation and trace logging.',
    role: 'Integration lead',
    tools: ['Node.js', 'TypeScript', 'FHIR', 'HL7', 'Amazon VPC'],
    liveUrl: 'https://example.com/fhir-gateway-placeholder',
    caseStudyUrl: 'https://example.com/fhir-gateway-case-study',
    order: 5,
    featured: false,
    placeholder: true,
    images: [
      { url: 'https://res.cloudinary.com/demo/image/upload/samples/animals/three-dogs.jpg', publicId: 'demo/three-dogs', alt: 'FHIR gateway placeholder status panel', order: 0, isCover: true }
    ]
  }
];

async function seed() {
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.profile.deleteMany();

  for (const profile of profiles) {
    const created = await prisma.profile.create({
      data: {
        ...profile,
        sectionVisibility: {
          hero: true,
          work: true,
          stack: true,
          testimonials: true,
          contact: true
        }
      }
    });

    const baseProjects = profile.slug === 'danielsolutions'
      ? danielProjects
      : danielProjects.slice(0, 3).map((project, index) => ({
          ...project,
          title: `${project.title} (${profile.displayName})`,
          slug: `${project.slug}-${profile.slug}`,
          order: index + 1
        }));

    for (const project of baseProjects) {
      await prisma.project.create({
        data: {
          ...project,
          profileId: created.id,
          images: {
            create: project.images
          }
        }
      });
    }

    await prisma.testimonial.createMany({
      data: [
        {
          profileId: created.id,
          type: TestimonialType.TEXT,
          authorName: 'Placeholder Clinical Ops Lead',
          authorRole: 'Healthcare Operations',
          content: `${profile.displayName} delivered a reliable placeholder architecture that our team can adapt for production planning.`,
          order: 1,
          showOnHome: true
        },
        {
          profileId: created.id,
          type: TestimonialType.TEXT,
          authorName: 'Placeholder Security Manager',
          authorRole: 'Compliance Team',
          content: 'Strong communication, clear threat modeling, and practical guardrails for encrypted data handling.',
          order: 2,
          showOnHome: true
        },
        {
          profileId: created.id,
          type: TestimonialType.IMAGE,
          authorName: 'Placeholder Product Owner',
          authorRole: 'Digital Health Product',
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/samples/people/jazz.jpg',
          imagePublicId: 'demo/people/jazz',
          order: 3,
          showOnHome: true
        }
      ]
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'change-me-please';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash
    }
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed complete');
  })
  .catch(async (error) => {
    console.error('Seed failed', error);
    await prisma.$disconnect();
    process.exit(1);
  });
