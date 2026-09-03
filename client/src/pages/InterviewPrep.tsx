/**
 * Style contract — The Proofroom:
 * This standalone page is an evidence-led rehearsal studio, not a generic
 * interview-question generator. Room Red marks live practice; Proof Lime marks proof.
 */

import CourseStudio from "@/components/CourseStudio";
import { Button } from "@/components/ui/button";
import {
  interviewCourseMeta,
  interviewLessons,
  interviewReferences,
} from "@/data/interviewCourse";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  Link2,
  MessageSquare,
  Repeat2,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const heroImage = "/assets/proofroom-hero.webp";

export default function InterviewPrep() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Proofroom | Build Your Copilot Interview Practice Lab";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const scrollToCourse = () => {
    document.getElementById("course")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell proofroom-page">
      <header className="site-header proofroom-header">
        <div className="container header-inner">
          <a href="#top" className="brand-lockup" aria-label="Proofroom course home">
            <span className="proofroom-symbol" aria-hidden="true">
              <i />
            </span>
            <span>
              <strong>Proofroom</strong>
              <small>Copilot interview lab</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Interview course navigation">
            <a href="#why">Why rehearse</a>
            <a href="#method">The method</a>
            <a href="#course">Course</a>
            <a
              href="https://drvicki.github.io/copilot-resume-skill-course/"
              target="_blank"
              rel="noreferrer"
            >
              Proofwork
            </a>
          </nav>
          <Button onClick={scrollToCourse} className="header-cta proofroom-cta">
            Enter the room <ArrowRight size={16} />
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section proofroom-hero" aria-labelledby="interview-hero-title">
          <div className="container hero-grid proofroom-hero-grid">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="hero-kicker">
                <span>Micro-course</span>
                <span>Microsoft Copilot</span>
              </div>
              <h1 id="interview-hero-title">
                Build a Copilot <em>interview practice</em> lab.
              </h1>
              <p className="hero-lede">
                Stop rehearsing polished scripts. Build one reusable, evidence-led agent that
                reads the role, asks one realistic question at a time, and debriefs what your
                answers actually prove.
              </p>
              <div className="hero-actions">
                <Button onClick={scrollToCourse} size="lg" className="primary-action proofroom-cta">
                  Run lesson one <ArrowDown size={18} />
                </Button>
                <a className="text-link" href="#method">
                  See the practice system <ArrowRight size={16} />
                </a>
              </div>
              <div className="instructor-line">
                <div className="instructor-monogram" aria-hidden="true">
                  VB
                </div>
                <div>
                  <span>Created and instructed by</span>
                  <strong>{interviewCourseMeta.instructor}</strong>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-plate proofroom-plate"
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="question-aperture" aria-hidden="true">?</div>
              <div className="room-signal" aria-hidden="true" />
              <img
                src={heroImage}
                alt="Editorial interview studio with a role brief, evidence cards, and one focused practice chair."
              />
              <div className="plate-caption">
                <span>01 / Interview brief</span>
                <span className="room-chip">
                  <MessageSquare size={13} /> One question in focus
                </span>
              </div>
            </motion.div>
          </div>

          <div className="container hero-facts" aria-label="Interview course details">
            <div>
              <Clock3 size={18} aria-hidden="true" />
              <span>Length</span>
              <strong>{interviewCourseMeta.duration}</strong>
            </div>
            <div>
              <BookOpen size={18} aria-hidden="true" />
              <span>Format</span>
              <strong>{interviewCourseMeta.lessons} working lessons</strong>
            </div>
            <div>
              <FileCheck2 size={18} aria-hidden="true" />
              <span>Deliverable</span>
              <strong>Canvas-ready practice files</strong>
            </div>
            <div>
              <GraduationCap size={18} aria-hidden="true" />
              <span>Instructor</span>
              <strong>{interviewCourseMeta.instructor}</strong>
            </div>
          </div>
        </section>

        <section className="problem-section proofroom-problem" id="why" aria-labelledby="interview-problem-heading">
          <div className="container problem-grid">
            <div className="margin-index" aria-hidden="true">01</div>
            <div className="problem-heading-block">
              <p className="section-kicker">The practice problem</p>
              <h2 id="interview-problem-heading">A question list is not a rehearsal.</h2>
            </div>
            <div className="problem-copy">
              <p>
                Generic interview prompts ask, answer, and coach in the same breath. You recognize
                a polished response without practicing the harder work: retrieving evidence,
                explaining judgment, and surviving a real follow-up.
              </p>
              <blockquote>
                <span>“</span>
                A useful mock interview listens before it coaches.
              </blockquote>
              <p>
                Microsoft documents reusable agents with instructions, knowledge sources, starter
                prompts, and a Try it workflow. Its hosted mock-interview guidance also recommends
                realistic questions, contextual follow-ups, feedback, and repeated practice.
                <sup><a href="#reference-1">[1]</a></sup>
                <sup><a href="#reference-4">[4]</a></sup>
              </p>
            </div>
          </div>

          <div className="container comparison-strip" aria-label="Question list versus practice system comparison">
            <div className="comparison-label">List vs. room</div>
            <div className="comparison-side muted-side">
              <span>One question dump</span>
              <strong>Generate → skim → script → forget</strong>
              <p>The model supplies the performance before you retrieve the evidence.</p>
            </div>
            <div className="comparison-arrow" aria-hidden="true"><ArrowRight /></div>
            <div className="comparison-side proof-side">
              <span>One reusable practice room</span>
              <strong>Brief → answer → probe → debrief</strong>
              <p>The agent preserves live-round conditions and the same evidence rubric.</p>
            </div>
          </div>
        </section>

        <section className="method-section proofroom-method" id="method" aria-labelledby="interview-method-heading">
          <div className="container method-heading-row">
            <div>
              <p className="section-kicker">The rehearsal system</p>
              <h2 id="interview-method-heading">Three things every interview agent needs.</h2>
            </div>
            <p>
              Build the context, organize the proof, and lock the debrief before asking Copilot to
              play interviewer.
            </p>
          </div>

          <div className="container method-ledger">
            <article>
              <div className="ledger-number">01</div>
              <div className="ledger-icon"><ScanSearch size={24} aria-hidden="true" /></div>
              <div className="ledger-copy">
                <span>Brief</span>
                <h3>An interview target map</h3>
                <p>Explicit role requirements, likely question themes, proof areas, and visible assumptions.</p>
              </div>
              <div className="ledger-proof">Room context</div>
            </article>
            <article>
              <div className="ledger-number">02</div>
              <div className="ledger-icon"><ShieldCheck size={24} aria-hidden="true" /></div>
              <div className="ledger-copy">
                <span>Stories</span>
                <h3>A verified proof bank</h3>
                <p>Defensible context, ownership, decisions, constraints, results, and follow-up facts.</p>
              </div>
              <div className="ledger-proof">Answer evidence</div>
            </article>
            <article>
              <div className="ledger-number">03</div>
              <div className="ledger-icon"><Repeat2 size={24} aria-hidden="true" /></div>
              <div className="ledger-copy">
                <span>Debrief</span>
                <h3>A fixed evidence rubric</h3>
                <p>The same scorecard, gap report, answer lab, and next-round plan after every practice.</p>
              </div>
              <div className="ledger-proof">Training loop</div>
            </article>
          </div>

          <div className="container terminology-note proofroom-note">
            <Sparkles size={20} aria-hidden="true" />
            <p>
              <strong>Course terminology:</strong> the reusable learner capability is an interview
              practice “skill.” In Microsoft 365 Copilot, the implementation is a custom declarative
              agent. Interface labels, knowledge sources, and capabilities can vary by account,
              license, language, tenant, and organization settings.
              <sup><a href="#reference-1">[1]</a></sup>
              <sup><a href="#reference-3">[3]</a></sup>
            </p>
          </div>
        </section>

        <section className="instructor-section" aria-labelledby="interview-instructor-heading">
          <div className="container instructor-card proofroom-instructor-card">
            <div className="instructor-stamp" aria-hidden="true">
              <span>VB</span>
              <small>Course 02</small>
            </div>
            <div className="instructor-copy">
              <p className="section-kicker">Creator & instructor</p>
              <h2 id="interview-instructor-heading">{interviewCourseMeta.instructor}</h2>
              <p>
                This course treats practice as a working studio. Every lesson produces a
                reusable prompt, an evidence artifact, and a downloadable record learners can review
                before posting in Canvas.
              </p>
            </div>
            <div className="instructor-principle">
              <span>Teaching principle</span>
              <strong>Practice the room. Keep the evidence.</strong>
            </div>
          </div>
        </section>

        <CourseStudio
          meta={interviewCourseMeta}
          courseLessons={interviewLessons}
          storageKey="proofroom-course-state-v1"
          artifactSlug="proofroom-interview"
          variant="proofroom"
          introHeading="Build the practice room as you learn."
          introCopy="Each lesson adds one working part to your Interview Proofroom agent. Your notes, reflections, and completion evidence stay in this browser until you download them."
          plateLabel="Proofroom practice stage"
          academicIntegrityNote="Review every AI-assisted claim yourself. Do not submit confidential employer, client, transcript, or personally sensitive material to Canvas."
          certificateSummary="The learner completed all four action assignments and produced a reusable, evidence-led Microsoft Copilot workflow for role-specific interview practice and debriefing."
          privateFilesLabel="career and interview transcript files"
        />

        <section className="references-section" aria-labelledby="interview-references-heading">
          <div className="container references-grid">
            <div>
              <p className="section-kicker">Source notes</p>
              <h2 id="interview-references-heading">References</h2>
              <p>
                Agent setup and instruction guidance follows current Microsoft documentation. The
                mock-interview sequence builds on Microsoft-hosted community guidance and adds this
                course’s stricter evidence and feedback rules.
              </p>
            </div>
            <ol>
              {interviewReferences.map((reference) => (
                <li id={`reference-${reference.id}`} key={reference.id}>
                  <span>[{reference.id}]</span>
                  <div>
                    <a href={reference.url} target="_blank" rel="noreferrer">
                      {reference.title} <Link2 size={14} aria-hidden="true" />
                    </a>
                    <small>{reference.publisher}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="site-footer proofroom-footer">
        <div className="container footer-inner">
          <div className="brand-lockup footer-brand">
            <span className="proofroom-symbol" aria-hidden="true">
              <i />
            </span>
            <span>
              <strong>Proofroom</strong>
              <small>One question. Then the evidence.</small>
            </span>
          </div>
          <p>
            {interviewCourseMeta.title}<br />
            Created and instructed by <strong>{interviewCourseMeta.instructor}</strong>
          </p>
          <nav className="footer-links" aria-label="Proofroom course connections">
            <a
              href="https://drvicki.github.io/copilot-resume-skill-course/"
              target="_blank"
              rel="noreferrer"
            >
              Explore Proofwork <ArrowRight size={15} />
            </a>
            <a href="#top">Return to top <ArrowRight size={15} /></a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
