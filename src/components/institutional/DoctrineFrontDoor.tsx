import Link from "next/link";
import { institutionalIdentity } from "@/lib/institutional-identity";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "@/lib/site-contact";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { ReaderRouteGlyph } from "./ReaderRouteGlyph";
import { doctrineFrontDoor as content } from "./content/doctrineFrontDoor";
import styles from "./styles/DoctrineFrontDoor.module.css";

type Doctrine = (typeof content.doctrines)[number];
type Section = { readonly title: string; readonly body: string };

function DoctrineCards({ exclude }: { exclude?: Doctrine["slug"] }) {
  return (
    <div className={styles.cards}>
      {content.doctrines.filter((d) => d.slug !== exclude).map((d) => (
        <Link className={styles.card} href={`/${d.slug}`} key={d.slug}>
          <span className={styles.num} data-reader-kicker><ReaderRouteGlyph href={`/${d.slug}`} /><span>DOCTRINE {d.number}</span></span>
          <h3>{d.name}</h3>
          <p>{d.summary}</p>
          <span className={styles.arrow}>Read the doctrine <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  );
}

type DoctrineContext = keyof typeof content.doctrineContexts;

export function DoctrineLinksSection({ context = "related", exclude }: { context?: DoctrineContext; exclude?: Doctrine["slug"] }) {
  const copy = content.doctrineContexts[context];
  const trust = content.trustLinks.find(item => item.context === context);
  return (
    <>
    {trust && <section className={styles.section} data-trust-link={context}><p className={styles.eyebrow}>Evidence &amp; Trust</p><h2>{trust.title}</h2><p className={styles.sectionIntro}>{trust.body}</p><Link className={styles.textLink} href={trust.href}>{trust.label} <span aria-hidden="true">→</span></Link></section>}
    <section className={`${styles.section} ${styles.doctrineSection}`} aria-label={copy.title} data-doctrine-links={context}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2>{copy.title}</h2>
      <p className={styles.sectionIntro}>{copy.intro}</p>
      <DoctrineCards exclude={exclude} />
    </section>
    </>
  );
}

export function DoctrineRelatedLinks({ exclude, context = "related" }: { exclude?: Doctrine["slug"]; context?: DoctrineContext }) {
  return (
    <div className={styles.surface}>
      <div className={styles.wrap}>
        <DoctrineLinksSection context={context} exclude={exclude} />
      </div>
    </div>
  );
}

function DigitalNativeInstitutionLink({ context }: { context: "home" | "work-with-us" }) {
  const copy = context === "home" ? content.digitalNativeInstitution.homeIntro : content.digitalNativeInstitution.workIntro;
  return (
    <section className={styles.section} data-institution-link={context}>
      <p className={styles.eyebrow}>How the Lab works</p>
      <h2>{copy.title}</h2>
      <p className={styles.sectionIntro}>{copy.body}</p>
      <Link className={styles.textLink} href={copy.href}>{copy.label} <span aria-hidden="true">→</span></Link>
    </section>
  );
}

export function InstrumentCollectionLink({ context }: { context: keyof typeof content.instrumentLinks }) {
  const copy=content.instrumentLinks[context];
  return <section className={styles.section} data-instrument-link={context}><p className={styles.eyebrow}>Instruments · Teaching examples</p><h2>{copy.title}</h2><p className={styles.sectionIntro}>{copy.body}</p><Link className={styles.textLink} href={copy.href}>{copy.label} →</Link></section>;
}

export function AudiencePathways({ context }: { context: keyof typeof content.audiencePaths }) {
  const copy = content.audiencePaths[context];
  return <section className={styles.section} data-audience-paths={context} aria-labelledby={`audience-${context}`}>
    <p className={styles.eyebrow}>Find your starting point</p><h2 id={`audience-${context}`}>{copy.title}</h2><p className={styles.sectionIntro}>{copy.intro}</p>
    <div className={styles.pathGrid}>{copy.cards.map(card => <article className={styles.pathCard} key={card.id} data-audience-card={card.id}>
      <p className={styles.workStatus}>{card.audience}</p><h3>{card.question}</h3><p>{card.body}</p>
      <div className={styles.audienceLinks}>{card.links.map(item => <Link className={styles.textLink} key={item.label} href={item.href}>{item.label} <span aria-hidden="true">→</span></Link>)}</div>
    </article>)}</div>
  </section>;
}

function ReadingSections({ sections }: { sections: readonly Section[] }) {
  return <>{sections.map((s) => <article key={s.title}><h2>{s.title}</h2><p>{s.body}</p></article>)}</>;
}

function DoctrineReaderGuide({ doctrine }: { doctrine: Doctrine }) {
  const guide = doctrine.guide;
  return (
    <section className={styles.readerGuide} data-reader-guide>
      <p className={styles.eyebrow}>Reading pathways</p>
      <h2>{guide.title}</h2>
      <p className={styles.sectionIntro}>{guide.note}</p>
      <div className={styles.guideGrid}>
        {guide.topics.map((topic) => (
          <article className={styles.guideTopic} key={topic.title}>
            <h3>{topic.title}</h3><p>{topic.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DoctrineEditorialBody({ doctrine }: { doctrine: Doctrine }) {
  return (
    <>
      <div className={styles.reading}>
        <div><p className={styles.eyebrow}>{doctrine.question}</p><ReadingSections sections={doctrine.sections} /></div>
        <aside className={styles.example}><p className={styles.eyebrow}>In practice</p><h2>{doctrine.example.title}</h2><p>{doctrine.example.body}</p></aside>
      </div>
      <blockquote className={styles.principle}>{doctrine.principle}</blockquote>
    </>
  );
}

// Preserve the existing Forge / Certify / Forbid treatment. This section adds
// source-grounded orientation and reading pathways without replacing it.
export function AiGovernanceEditorialIntroduction() {
  const doctrine = content.doctrines.find((d) => d.slug === "ai-governance")!;
  return <div className={styles.surface}><div className={styles.wrap}><DoctrineEditorialBody doctrine={doctrine} /></div></div>;
}

export function AiGovernanceReadingGuide() {
  const doctrine = content.doctrines.find((d) => d.slug === "ai-governance")!;
  return <div className={styles.surface}><div className={styles.wrap}><DoctrineReaderGuide doctrine={doctrine} /><InstrumentCollectionLink context="ai-governance" /></div></div>;
}

export function DoctrineHomePage() {
  const { home, maintenance, foundation, history, mission } = content;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={styles.hero} data-institutional-hero>
          <p className={styles.eyebrow}>{home.eyebrow}</p>
          <h1 data-institutional-tagline="home">{institutionalIdentity.tagline}</h1>
          <p className={styles.lead}>{institutionalIdentity.mission}</p>
          <p className={styles.support}>{home.support}</p>
          <p className={styles.identityLine} data-institutional-descriptor>{institutionalIdentity.descriptor}</p>
        </section>
        <section className={styles.section} data-home-entry-paths aria-labelledby="home-entry-title">
          <h2 id="home-entry-title" className={styles.entryHeading}>Three ways into the Lab</h2>
          <div className={styles.cards}>{home.paths.map(path => <Link className={styles.card} key={path.href} href={path.href}><span className={styles.num} data-reader-kicker><ReaderRouteGlyph href={path.href} /><span>{path.tagline}</span></span><h3>{path.title}</h3><p>{path.body}</p><span className={styles.arrow}>{path.label} <span aria-hidden="true">→</span></span></Link>)}</div>
          <p className={styles.smallPrint}>{home.commitmentLine}</p>
        </section>
        <section className={`${styles.section} ${styles.callout}`} aria-labelledby="maintenance-title">
          <div>
            <p className={styles.eyebrow}>Our purpose</p>
            <h2 id="maintenance-title">{maintenance.title}</h2>
          </div>
          <p className={styles.calloutText}>{maintenance.body}</p>
        </section>
        <section className={`${styles.section} ${styles.split}`} aria-label="Our foundations and history">
          <article>
            <p className={styles.eyebrow}>Research</p><h2>{foundation.title}</h2><p>{foundation.body}</p>
            <Link className={styles.textLink} href="/observatory">Explore the Observatory</Link>
          </article>
          <article>
            <p className={styles.eyebrow}>Our story</p><h2>{history.title}</h2><p>{history.body}</p>
            <Link className={styles.textLink} href="/observatory/intellectual-lineage">Discover our story</Link>
          </article>
        </section>
        <section className={styles.section} aria-labelledby="public-good-title">
          <p className={styles.eyebrow}>The institution</p><h2 id="public-good-title">{mission.title}</h2><p className={styles.sectionIntro}>{mission.body}</p>
          <blockquote className={styles.humanPurpose}>{mission.humanPurpose}</blockquote>
          <p className={`${styles.identityLine} ${styles.agencyLine}`}>{mission.closing}</p>
          <div className={styles.links}>
            <Link className={styles.textLink} href="/work-with-us">Work with us</Link>
            <Link className={styles.textLink} href="/evidence-and-trust" id="featured-work">Examine our evidence and commitments</Link>
          </div>
        </section>
        <DigitalNativeInstitutionLink context="home" />
        <DoctrineLinksSection context="home" />
      </div>
    </InstitutionalPageShell>
  );
}

export function DoctrineLandingPage({ slug }: { slug: "consequential-systems" | "ai-governance" | "constructive-human-agency" }) {
  const doctrine = content.doctrines.find((d) => d.slug === slug)!;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/">← Boundary First Labs</Link>
          <p className={styles.eyebrow}>Doctrine {doctrine.number}</p>
          <h1>{doctrine.name}</h1><p className={styles.tagline}>{doctrine.tagline}</p>
          <p className={styles.lead}>{doctrine.lead}</p><p className={styles.support}>{doctrine.support}</p>
        </section>
        <DoctrineEditorialBody doctrine={doctrine} />
        {"framework" in doctrine && <section className={styles.section} data-governance-framework><p className={styles.eyebrow}>Governance in practice</p><h2>Different capabilities, different obligations.</h2><div className={styles.frameworkGrid}>{doctrine.framework.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>}
        <DoctrineReaderGuide doctrine={doctrine} />
        <section className={styles.section}>
          <p className={styles.eyebrow}>Go deeper</p><h2>Explore the work.</h2>
          <div className={styles.links}>{doctrine.depth.map((link) => <Link key={link.href} className={styles.textLink} href={link.href}>{link.label}</Link>)}</div>
        </section>
        <InstrumentCollectionLink context={slug} />
        <DoctrineLinksSection exclude={slug} />
      </div>
    </InstitutionalPageShell>
  );
}

export function CodexwareIntroductionPage() {
  const c = content.codexware;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/">← Boundary First Labs</Link>
          <p className={styles.eyebrow}>Application vision · In development</p>
          <h1>{c.name}</h1><p className={styles.tagline}>{c.tagline}</p>
          <p className={styles.lead}>{c.lead}</p><p className={styles.support}>{c.support}</p>
        </section>
        <AudiencePathways context="codexware" />
        <section className={`${styles.section} ${styles.callout}`} data-civic-record-entry>
          <div><p className={styles.eyebrow}>Codexware Civic</p><h2>{c.civicIntro.title}</h2><p className={styles.tagline}>{c.civicIntro.tagline}</p></div>
          <div><p className={styles.calloutText}>{c.civicIntro.body}</p><p className={styles.status}>{c.civicIntro.status}</p><Link className={styles.textLink} href={c.civicIntro.href}>{c.civicIntro.label} →</Link></div>
        </section>
        <section className={styles.section} data-codexware-examples>
          <p className={styles.eyebrow}>What and why</p><h2>{c.examples.heading}</h2><p className={styles.sectionIntro}>{c.examples.intro}</p>
          <div className={styles.pathGrid}>{c.examples.items.map(item => <article className={styles.pathCard} key={item.id} data-codexware-example={item.id}><p className={styles.workStatus}>Intended use</p><h3>{item.title}</h3><p><strong>{item.question}</strong></p><p>{item.body}</p></article>)}</div>
          <p className={styles.smallPrint} data-example-limit>{c.examples.limit}</p>
          <p className={styles.sectionIntro}>{c.examples.linkIntro}</p><Link className={styles.textLink} href={c.examples.href}>{c.examples.label} →</Link>
        </section>
        <div className={styles.reading}>
          <details className={styles.readerDetails} data-reader-detail="codexware-design"><summary>Explore application design and interoperability</summary><ReadingSections sections={c.sections} /></details>
          <aside className={styles.example}><p className={styles.eyebrow}>Development status</p><h2>Application vision</h2><p>{c.status}</p></aside>
        </div>
        <section className={styles.section} data-codexware-commitments>
          <p className={styles.eyebrow}>Governance by construction</p>
          <h2>{c.commitments.heading}</h2>
          <p className={styles.sectionIntro}>{c.commitments.intro}</p>
          <div className={styles.pathGrid}>
            {c.commitments.items.map((item) => (
              <article className={styles.pathCard} key={item.title}>
                <h3>{item.title}</h3><p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className={styles.smallPrint} data-deployment-limit>{c.commitments.note}</p>
          <blockquote className={styles.principle}>{c.commitments.closing}</blockquote>
          <div className={styles.links} aria-label="Related principles">
            <Link className={styles.textLink} href="/ai-governance">Explore AI governance</Link>
            <Link className={styles.textLink} href="/constructive-human-agency">Explore constructive human agency</Link>
          </div>
        </section>
        <blockquote className={styles.principle}>{c.principle}</blockquote>
        <InstrumentCollectionLink context="codexware" />
        <DoctrineLinksSection context="codexware" />
      </div>
    </InstitutionalPageShell>
  );
}

type WorkPath = (typeof content.workWithUs.groups)[number]["cards"][number] | (typeof content.workWithUs.know.cards)[number];

function WorkPathCard({ path }: { path: WorkPath }) {
  return (
    <article className={styles.pathCard} data-work-path={path.id}>
      <p className={styles.workStatus}>{path.status}</p>
      <h3>{path.title}</h3><p>{path.body}</p>
      <Link className={styles.textLink} href={path.href}>{path.label} <span aria-hidden="true">→</span></Link>
    </article>
  );
}

export function WorkWithUsPage() {
  const work = content.workWithUs;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <p className={styles.eyebrow}>{work.eyebrow}</p>
          <h1>{work.name}</h1><p className={styles.tagline}>{work.tagline}</p>
          <p className={styles.lead}>{work.lead}</p><p className={styles.support}>{work.support}</p>
          <Link className={styles.action} href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
        </section>
        <AudiencePathways context="work-with-us" />
        {work.groups.map((group, index) => (
          <section className={styles.section} data-work-group={group.id} key={group.id} aria-labelledby={`work-${group.id}`}>
            <p className={styles.eyebrow}>Engagement path {index + 1}</p>
            <h2 id={`work-${group.id}`}>{group.title}</h2><p className={styles.sectionIntro}>{group.intro}</p>
            <div className={styles.pathGrid}>{group.cards.map(path => <WorkPathCard path={path} key={path.id} />)}</div>
          </section>
        ))}
        <section className={styles.section} data-work-section="engagement" aria-labelledby="work-engagement">
          <p className={styles.eyebrow}>How an engagement works</p><h2 id="work-engagement">{work.engagement.title}</h2>
          <p className={styles.sectionIntro}>{work.engagement.intro}</p>
          <details className={styles.readerDetails} data-engagement-detail><summary>Read the four engagement stages</summary><ol className={styles.workSteps}>{work.engagement.steps.map((step, index) => <li key={step.title}><span className={styles.num}>0{index+1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></details>
          <div className={styles.workNotes}><article><h3>What you might receive</h3><p>{work.engagement.outputs}</p></article><article><h3>What we agree before proceeding</h3><p>{work.engagement.limits}</p></article></div>
        </section>
        <section className={styles.section} data-work-section="know" aria-labelledby="work-know">
          <p className={styles.eyebrow}>Get to know us</p><h2 id="work-know">{work.know.title}</h2><p className={styles.sectionIntro}>{work.know.intro}</p>
          <div className={styles.pathGrid}>{work.know.cards.map(path => <WorkPathCard key={path.id} path={path} />)}</div>
        </section>
        <blockquote className={styles.principle}>{work.principle}</blockquote>
        <section className={styles.section} data-work-section="contact" aria-labelledby="work-contact">
          <p className={styles.eyebrow}>Contact the Lab</p><h2 id="work-contact">{work.contact.title}</h2><p className={styles.sectionIntro}>{work.contact.body}</p>
          <p className={styles.smallPrint}>{work.contact.privacy}</p>
          <div className={styles.links}><Link className={styles.action} href={work.contact.href}>{work.contact.label} <span aria-hidden="true">→</span></Link><a className={styles.textLink} href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a></div>
        </section>
        <DigitalNativeInstitutionLink context="work-with-us" />
        <InstrumentCollectionLink context="work-with-us" />
        <DoctrineLinksSection context="work-with-us" />
      </div>
    </InstitutionalPageShell>
  );
}

export function DigitalNativeInstitutionPage() {
  const institution = content.digitalNativeInstitution;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/">← Boundary First Labs</Link>
          <p className={styles.eyebrow}>{institution.eyebrow}</p>
          <h1>{institution.name}</h1><p className={styles.tagline}>{institution.tagline}</p>
          <p className={styles.lead}>{institution.lead}</p><p className={styles.support}>{institution.support}</p>
        </section>
        <div className={styles.reading}>
          <div><ReadingSections sections={institution.sections} /></div>
          <aside className={styles.example}><p className={styles.eyebrow}>Institutional status</p><h2>{institution.statusTitle}</h2><p>{institution.status}</p></aside>
        </div>
        <section className={styles.section} data-stewardship-values aria-labelledby="stewardship-values">
          <p className={styles.eyebrow}>Institutional commitments</p><h2 id="stewardship-values">{institution.stewardship.heading}</h2>
          <p className={styles.sectionIntro}>{institution.stewardship.intro}</p>
          <div className={styles.pathGrid}>{institution.stewardship.values.map(value => <article className={styles.pathCard} key={value.id} data-charter-value={value.id}><h3>{value.title}</h3><p>{value.body}</p></article>)}</div>
        </section>
        <section className={styles.section} data-institutional-nongoals aria-labelledby="institutional-nongoals">
          <h2 id="institutional-nongoals">{institution.stewardship.limitsHeading}</h2><p className={styles.sectionIntro}>{institution.stewardship.limitsIntro}</p>
          <div className={styles.pathGrid}>{institution.stewardship.limits.map(item => <article className={styles.pathCard} key={item.id} data-institutional-limit={item.id}><h3>{item.pursue}</h3><p><strong>Not:</strong> {item.not}</p></article>)}</div>
          <p className={styles.smallPrint} data-stewardship-limit>{institution.stewardship.note}</p>
        </section>
        <blockquote className={styles.principle}>{institution.principle}</blockquote>
        <section className={styles.section}>
          <p className={styles.eyebrow}>Participate or inspect</p><h2>Get to know the work.</h2>
          <div className={styles.links}>{institution.links.map((item) => <Link key={item.href} className={styles.textLink} href={item.href}>{item.label}</Link>)}</div>
        </section>
        <InstrumentCollectionLink context="digital-native-institution" />
        <DoctrineLinksSection context="digital-native-institution" />
      </div>
    </InstitutionalPageShell>
  );
}


type EngagementGuideSlug = (typeof content.engagementGuides)[number]["slug"];
export function EngagementGuidePage({ slug }: { slug: EngagementGuideSlug }) {
  const guide = content.engagementGuides.find((g) => g.slug === slug)!;
  return (
    <InstitutionalPageShell mainClassName={styles.surface}>
      <div className={styles.wrap} data-engagement-guide={slug}>
        <section className={`${styles.hero} ${styles.doctrineHero}`} data-institutional-hero>
          <Link className={styles.back} href="/work-with-us">← Work With Us</Link>
          <p className={styles.eyebrow}>{guide.eyebrow}</p><h1>{guide.name}</h1>
          <p className={styles.tagline}>{guide.tagline}</p><p className={styles.lead}>{guide.lead}</p><p className={styles.support}>{guide.support}</p>
        </section>
        <section className={styles.section} data-guide-offers>
          <h2>{guide.offerHeading}</h2><div className={styles.frameworkGrid}>{guide.offers.map((offer) => <article key={offer.title}><h3>{offer.title}</h3><p>{offer.body}</p></article>)}</div>
        </section>
        <div className={styles.reading} data-guide-method><div><ReadingSections sections={guide.sections} /></div>
          <aside className={styles.example} data-guide-status><p className={styles.eyebrow}>Engagement status</p><h2>{guide.statusTitle}</h2><p>{guide.status}</p></aside>
        </div>
        <section className={styles.section} data-guide-example><p className={styles.eyebrow}>Example, not a completed engagement</p><h2>{guide.exampleTitle}</h2><p className={styles.sectionIntro}>{guide.example}</p></section>
        <blockquote className={styles.principle}>{guide.principle}</blockquote>
        <section className={styles.section} data-guide-contact><h2>Start a conversation.</h2><p className={styles.sectionIntro}>{guide.ask}</p>
          <div className={styles.links}><Link className={styles.action} href="/contact">Contact the Lab</Link><a className={styles.textLink} href={`${PUBLIC_CONTACT_MAILTO}?subject=${encodeURIComponent(guide.subject)}`}>{PUBLIC_CONTACT_EMAIL}</a></div>
          <div className={styles.links}>{guide.links.map((item) => <Link key={item.href} className={styles.textLink} href={item.href}>{item.label}</Link>)}<Link className={styles.textLink} href="/work-with-us">All engagement paths</Link></div>
        </section>
        {slug !== "work-with-us/funding" && <InstrumentCollectionLink context={slug} />}
        <DoctrineLinksSection context={slug} />
      </div>
    </InstitutionalPageShell>
  );
}
