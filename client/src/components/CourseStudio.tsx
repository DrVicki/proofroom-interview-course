/**
 * Style contract — The Evidence Desk:
 * The course workspace behaves like a rigorous field notebook: offset lesson rail,
 * visible proof states, cobalt process cues, and lime only for earned completion.
 */

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { Lesson } from "@/data/types";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Download,
  FileDown,
  FileText,
  Lightbulb,
  NotebookPen,
  Quote,
  RotateCcw,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type WorkEntry = {
  notes: string;
  reflection: string;
  evidence: string;
  completed: boolean;
};

type CourseState = {
  schemaVersion: 2;
  studentName: string;
  courseSection: string;
  work: Record<string, WorkEntry>;
};

type CourseMeta = {
  title: string;
  shortTitle: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: number;
};

export type CourseStudioProps = {
  meta: CourseMeta;
  courseLessons: Lesson[];
  storageKey?: string;
  artifactSlug?: string;
  variant?: "evidence-desk" | "proofroom";
  introHeading?: string;
  introCopy?: string;
  plateLabel?: string;
  academicIntegrityNote?: string;
  certificateSummary?: string;
  privateFilesLabel?: string;
};

const emptyEntry = (): WorkEntry => ({
  notes: "",
  reflection: "",
  evidence: "",
  completed: false,
});

const initialState = (courseLessons: Lesson[]): CourseState => ({
  schemaVersion: 2,
  studentName: "",
  courseSection: "",
  work: Object.fromEntries(courseLessons.map((lesson) => [lesson.id, emptyEntry()])),
});

function buildLessonFile(
  lesson: Lesson,
  entry: WorkEntry,
  studentName: string,
  courseSection: string,
  meta: CourseMeta,
  academicIntegrityNote: string,
) {
  const completedAt = entry.completed ? new Date().toLocaleDateString() : "Not marked complete";

  return `${meta.shortTitle} — Canvas Lesson Submission
Creator and Instructor: ${meta.instructor}

STUDENT
Name: ${studentName || "[Enter your name]"}
Course / Section: ${courseSection || "[Enter your course or section]"}
Lesson: ${lesson.number} — ${lesson.title}
Completion status: ${completedAt}

============================================================
LESSON NOTES
============================================================

${entry.notes || "[Add your lesson notes here before submitting.]"}

============================================================
COPILOT PROMPT USED
============================================================

${lesson.prompt}

============================================================
ACTION ASSIGNMENT
============================================================

${lesson.assignment}

COMPLETION EVIDENCE / SUMMARY

${entry.evidence || "[Briefly describe what you completed. Do not include confidential employer information.]"}

============================================================
REFLECTION
============================================================

Prompt: ${lesson.reflection}

Response:
${entry.reflection || "[Add your reflection response here before submitting.]"}

============================================================
DELIVERABLE CHECK
============================================================

${lesson.deliverable}

Academic integrity and privacy note: ${academicIntegrityNote}
`;
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function filenameName(name: string) {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "student";
}

function FieldPlate({ lesson, plateLabel }: { lesson: Lesson; plateLabel: string }) {
  const mode =
    lesson.number === "02" ? "stories" : lesson.number === "03" ? "mock" : "debrief";

  return (
    <figure className={`lesson-visual lesson-visual--diagram lesson-visual--${mode}`}>
      <div className="field-plate-canvas" role="img" aria-label={lesson.artAlt}>
        {mode === "stories" ? (
          <>
            <div className="story-card-orbit" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => (
                <span className="story-proof-card" key={index}>
                  <i />
                  <i />
                  <i />
                </span>
              ))}
              <span className="story-proof-core">
                <i />
                <i />
                <i />
              </span>
            </div>
            <span className="plate-verify-tab" aria-hidden="true" />
          </>
        ) : null}

        {mode === "mock" ? (
          <>
            <div className="mock-stage" aria-hidden="true">
              <span className="mock-chair mock-chair--candidate" />
              <span className="mock-light" />
              <span className="mock-chair mock-chair--interviewer" />
            </div>
            <div className="question-sequence" aria-hidden="true">
              <span className="sequence-node is-live" />
              <i />
              <span className="sequence-node" />
              <i />
              <span className="sequence-node is-proof" />
              <i />
              <span className="sequence-node" />
            </div>
          </>
        ) : null}

        {mode === "debrief" ? (
          <div className="scorecard-comparison" aria-hidden="true">
            {["round-one", "round-two"].map((round) => (
              <span className={`diagram-scorecard ${round}`} key={round}>
                <i className="scorecard-clip" />
                {Array.from({ length: 5 }, (_, index) => (
                  <i className="scorecard-row" key={index} />
                ))}
                <i className="scorecard-proof" />
              </span>
            ))}
            <span className="revision-loop" />
          </div>
        ) : null}

        <span className="plate-registration plate-registration--one" aria-hidden="true" />
        <span className="plate-registration plate-registration--two" aria-hidden="true" />
      </div>
      <figcaption>
        <span>Field plate {lesson.number}</span>
        <span>{plateLabel}</span>
      </figcaption>
    </figure>
  );
}

export default function CourseStudio({
  meta,
  courseLessons,
  storageKey = "proofroom-course-state-v1",
  artifactSlug = "proofroom-interview",
  variant = "proofroom",
  introHeading = "Build the practice room as you learn.",
  introCopy =
    "Each lesson adds one working part to your Interview Proofroom agent. Your notes, reflections, and completion evidence stay in this browser until you download them.",
  plateLabel = "Proofroom practice stage",
  academicIntegrityNote =
    "Review every resume claim yourself. Do not submit confidential, proprietary, or personally sensitive material to Canvas.",
  certificateSummary =
    "The learner completed all four action assignments and produced a reusable, evidence-led Microsoft Copilot workflow for honest resume tailoring.",
  privateFilesLabel = "career files",
}: CourseStudioProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [state, setState] = useState<CourseState>(() => initialState(courseLessons));
  const [hydrated, setHydrated] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const initialCourseState = useMemo(() => initialState(courseLessons), [courseLessons]);
  const activeLesson = courseLessons[activeIndex];
  const activeEntry = state.work[activeLesson.id] ?? emptyEntry();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CourseState>;
        setState({
          ...initialCourseState,
          ...parsed,
          work: {
            ...initialCourseState.work,
            ...(parsed.work ?? {}),
          },
        });
      }
    } catch {
      toast.error("Saved course work could not be restored.");
    } finally {
      setHydrated(true);
    }
  }, [initialCourseState, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state, storageKey]);

  const completedCount = useMemo(
    () => courseLessons.filter((lesson) => state.work[lesson.id]?.completed).length,
    [courseLessons, state.work],
  );
  const progress = Math.round((completedCount / courseLessons.length) * 100);

  const updateActiveEntry = (changes: Partial<WorkEntry>) => {
    setState((current) => ({
      ...current,
      work: {
        ...current.work,
        [activeLesson.id]: {
          ...(current.work[activeLesson.id] ?? emptyEntry()),
          ...changes,
        },
      },
    }));
  };

  const clearSavedCourseData = () => {
    const hasSavedWork =
      Boolean(state.studentName.trim() || state.courseSection.trim()) ||
      Object.values(state.work).some(
        (entry) => entry.notes || entry.evidence || entry.reflection || entry.completed,
      );

    if (
      hasSavedWork &&
      !window.confirm(
        "Clear your saved Proofroom name, notes, evidence, reflections, and completion marks from this browser? This cannot be undone.",
      )
    ) {
      return;
    }

    setState(initialState(courseLessons));
    toast.success("Saved Proofroom course data cleared from this browser.");
  };

  const goToLesson = (index: number) => {
    setActiveIndex(index);
    window.setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(activeLesson.prompt);
      toast.success(`Lesson ${activeLesson.number} prompt copied.`);
    } catch {
      toast.error("Copy was blocked. Select the prompt text and copy it manually.");
    }
  };

  const downloadLesson = () => {
    downloadText(
      `${filenameName(state.studentName)}-${artifactSlug}-lesson-${activeLesson.number}.txt`,
      buildLessonFile(
        activeLesson,
        activeEntry,
        state.studentName,
        state.courseSection,
        meta,
        academicIntegrityNote,
      ),
    );
    toast.success(`Lesson ${activeLesson.number} submission downloaded.`);
  };

  const downloadAll = () => {
    const sections = courseLessons.map((lesson) =>
      buildLessonFile(
        lesson,
        state.work[lesson.id] ?? emptyEntry(),
        state.studentName,
        state.courseSection,
        meta,
        academicIntegrityNote,
      ),
    );
    downloadText(
      `${filenameName(state.studentName)}-${artifactSlug}-complete-course.txt`,
      sections.join("\n\n\n############################################################\n\n\n"),
    );
    toast.success("Complete Canvas submission bundle downloaded.");
  };

  const downloadCertificate = () => {
    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    downloadText(
      `${filenameName(state.studentName)}-${artifactSlug}-certificate.txt`,
      `CERTIFICATE OF COMPLETION

This certifies that

${state.studentName || "[Student name]"}

completed the micro-course

${meta.title}

on ${date}.

Created and instructed by ${meta.instructor}

${certificateSummary}
`,
    );
    toast.success("Completion certificate downloaded.");
  };

  return (
    <section
      className={`course-section course-section--${variant}`}
      id="course"
      aria-labelledby="course-heading"
    >
      <div className="container">
        <div className="course-intro">
          <div>
            <p className="section-kicker">Your working course</p>
            <h2 id="course-heading">{introHeading}</h2>
          </div>
          <p>
            {introCopy}
          </p>
        </div>

        <div className="student-strip" aria-label="Student submission details">
          <div className="student-field">
            <label htmlFor="student-name">Student name</label>
            <input
              id="student-name"
              value={state.studentName}
              onChange={(event) =>
                setState((current) => ({ ...current, studentName: event.target.value }))
              }
              placeholder="Name for Canvas files"
            />
          </div>
          <div className="student-field">
            <label htmlFor="course-section">Course / section</label>
            <input
              id="course-section"
              value={state.courseSection}
              onChange={(event) =>
                setState((current) => ({ ...current, courseSection: event.target.value }))
              }
              placeholder="Example: EDU 610 · Section 02"
            />
          </div>
          <div className="progress-cluster" aria-label={`${progress}% course complete`}>
            <div className="progress-label">
              <span>Course progress</span>
              <strong>{progress}%</strong>
            </div>
            <Progress value={progress} className="course-progress" />
            <span className="progress-caption">
              {completedCount} of {courseLessons.length} lessons complete
            </span>
            <Button
              type="button"
              variant="ghost"
              className="clear-course-button"
              onClick={clearSavedCourseData}
            >
              <RotateCcw size={14} aria-hidden="true" />
              Clear this browser’s course data
            </Button>
          </div>
        </div>

        <div className="studio-shell" ref={workspaceRef}>
          <aside className="lesson-rail" aria-label="Course lessons">
            <div className="rail-label">Course index</div>
            <nav>
              {courseLessons.map((lesson, index) => {
                const isActive = index === activeIndex;
                const isComplete = state.work[lesson.id]?.completed;
                return (
                  <button
                    type="button"
                    key={lesson.id}
                    className={`lesson-tab ${isActive ? "is-active" : ""} ${
                      isComplete ? "is-complete" : ""
                    }`}
                    onClick={() => goToLesson(index)}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="lesson-tab-number">{lesson.number}</span>
                    <span className="lesson-tab-copy">
                      <strong>{lesson.eyebrow}</strong>
                      <small>{lesson.duration}</small>
                    </span>
                    <span className="lesson-tab-status" aria-hidden="true">
                      {isComplete ? <Check size={15} /> : <span />}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="canvas-kit-mini">
              <Upload size={18} aria-hidden="true" />
              <strong>Canvas submission kit</strong>
              <p>Download one lesson at a time or combine all four into one text file.</p>
              <Button className="rail-download" variant="outline" onClick={downloadAll}>
                <FileDown size={16} />
                Download all
              </Button>
            </div>
          </aside>

          <article className="lesson-workspace" aria-labelledby={`lesson-${activeLesson.id}`}>
            <header className="lesson-masthead">
              <div className="lesson-index-block">
                <span>Lesson</span>
                <strong>{activeLesson.number}</strong>
              </div>
              <div className="lesson-title-block">
                <div className="lesson-meta-line">
                  <span>{activeLesson.eyebrow}</span>
                  <span>{activeLesson.duration}</span>
                </div>
                <h3 id={`lesson-${activeLesson.id}`}>{activeLesson.title}</h3>
                <p>{activeLesson.summary}</p>
              </div>
            </header>

            {activeIndex > 0 ? (
              activeLesson.art ? (
                <figure className="lesson-visual">
                  <img src={activeLesson.art} alt={activeLesson.artAlt} />
                  <figcaption>
                    <span>Field plate {activeLesson.number}</span>
                    <span>{plateLabel}</span>
                  </figcaption>
                </figure>
              ) : (
                <FieldPlate lesson={activeLesson} plateLabel={plateLabel} />
              )
            ) : null}

            <div className="objective-band">
              <div className="objective-icon">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <div>
                <span>Lesson objective</span>
                <p>{activeLesson.objective}</p>
              </div>
            </div>

            <section className="reading-block" aria-labelledby={`reading-${activeLesson.id}`}>
              <div className="content-label">Read</div>
              <div className="reading-copy">
                <h4 id={`reading-${activeLesson.id}`}>{activeLesson.readingTitle}</h4>
                {activeLesson.reading.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="source-line">
                  Microsoft source notes: {activeLesson.sourceIds.map((id, index) => (
                    <span key={id}>
                      {index > 0 ? " " : ""}
                      <a href={`#reference-${id}`} aria-label={`Go to reference ${id}`}>
                        [{id}]
                      </a>
                    </span>
                  ))}
                </p>
              </div>
            </section>

            <section className="moves-block" aria-labelledby={`moves-${activeLesson.id}`}>
              <div className="content-label">Mark</div>
              <div>
                <h4 id={`moves-${activeLesson.id}`}>Three moves to keep</h4>
                <div className="move-list">
                  {activeLesson.keyMoves.map((move, index) => (
                    <div className="move-row" key={move}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{move}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="prompt-lab" aria-labelledby={`prompt-${activeLesson.id}`}>
              <div className="prompt-topline">
                <div>
                  <span className="prompt-kicker">
                    <Lightbulb size={15} aria-hidden="true" /> Prompt lab
                  </span>
                  <h4 id={`prompt-${activeLesson.id}`}>{activeLesson.promptTitle}</h4>
                </div>
                <Button variant="outline" onClick={copyPrompt} className="copy-button">
                  <Copy size={16} />
                  Copy prompt
                </Button>
              </div>
              <p className="prompt-intro">{activeLesson.promptIntro}</p>
              <pre tabIndex={0} aria-label={`${activeLesson.promptTitle} prompt`}>
                <code>{activeLesson.prompt}</code>
              </pre>
            </section>

            <section className="assignment-block" aria-labelledby={`assignment-${activeLesson.id}`}>
              <div className="assignment-marker">
                <ClipboardCheck size={25} aria-hidden="true" />
              </div>
              <div>
                <span className="assignment-kicker">Action assignment</span>
                <h4 id={`assignment-${activeLesson.id}`}>{activeLesson.assignmentTitle}</h4>
                <p>{activeLesson.assignment}</p>
              </div>
            </section>

            <section className="notes-workspace" aria-labelledby={`notes-${activeLesson.id}`}>
              <div className="notes-heading">
                <div>
                  <span className="notes-kicker">
                    <NotebookPen size={16} aria-hidden="true" /> Student field notes
                  </span>
                  <h4 id={`notes-${activeLesson.id}`}>Prepare your Canvas submission</h4>
                </div>
                <span className="autosave-label">Saved in this browser</span>
              </div>

              <label htmlFor={`notes-input-${activeLesson.id}`}>Lesson notes</label>
              <Textarea
                id={`notes-input-${activeLesson.id}`}
                value={activeEntry.notes}
                onChange={(event) => updateActiveEntry({ notes: event.target.value })}
                placeholder="Capture the ideas, decisions, warnings, and language you want to keep…"
                className="course-textarea"
              />

              <label htmlFor={`evidence-input-${activeLesson.id}`}>
                Completion evidence / summary
              </label>
              <Textarea
                id={`evidence-input-${activeLesson.id}`}
                value={activeEntry.evidence}
                onChange={(event) => updateActiveEntry({ evidence: event.target.value })}
                placeholder="Briefly describe what you built or tested. Exclude confidential information."
                className="course-textarea compact"
              />

              <div className="reflection-card">
                <Quote size={19} aria-hidden="true" />
                <div>
                  <label htmlFor={`reflection-input-${activeLesson.id}`}>
                    Reflection prompt
                  </label>
                  <p>{activeLesson.reflection}</p>
                  <Textarea
                    id={`reflection-input-${activeLesson.id}`}
                    value={activeEntry.reflection}
                    onChange={(event) => updateActiveEntry({ reflection: event.target.value })}
                    placeholder="Write your response for Canvas…"
                    className="course-textarea compact"
                  />
                </div>
              </div>

              <div className="deliverable-note">
                <FileText size={19} aria-hidden="true" />
                <div>
                  <strong>What your download includes</strong>
                  <p>{activeLesson.deliverable}</p>
                </div>
              </div>

              <div className="submission-actions">
                <Button
                  variant="outline"
                  className="complete-button"
                  onClick={() => updateActiveEntry({ completed: !activeEntry.completed })}
                >
                  {activeEntry.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <span className="empty-check" aria-hidden="true" />
                  )}
                  {activeEntry.completed ? "Lesson complete" : "Mark lesson complete"}
                </Button>
                <Button onClick={downloadLesson} className="download-button">
                  <Download size={18} />
                  Download for Canvas
                </Button>
              </div>
            </section>

            <footer className="lesson-pagination">
              <Button
                variant="ghost"
                disabled={activeIndex === 0}
                onClick={() => goToLesson(activeIndex - 1)}
              >
                <ArrowLeft size={17} /> Previous lesson
              </Button>
              <span>
                {activeIndex + 1} / {courseLessons.length}
              </span>
              <Button
                variant="ghost"
                disabled={activeIndex === courseLessons.length - 1}
                onClick={() => goToLesson(activeIndex + 1)}
              >
                Next lesson <ArrowRight size={17} />
              </Button>
            </footer>
          </article>
        </div>

        <div className={`completion-panel ${progress === 100 ? "is-unlocked" : ""}`}>
          <div className="completion-seal" aria-hidden="true">
            <CheckCircle2 size={30} />
          </div>
          <div>
            <span>{progress === 100 ? "Submission kit complete" : "Finish line"}</span>
            <h3>
              {progress === 100
                ? "Your complete course bundle is ready."
                : `${courseLessons.length - completedCount} lesson${
                    courseLessons.length - completedCount === 1 ? "" : "s"
                  } left to complete.`}
            </h3>
            <p>
              Download one combined text file for Canvas. At 100%, enter your name to unlock a
              named completion certificate credited to {meta.instructor}.
            </p>
          </div>
          <div className="completion-actions">
            <Button variant="outline" onClick={downloadAll}>
              <FileDown size={17} /> Download course bundle
            </Button>
            <Button
              onClick={downloadCertificate}
              disabled={progress !== 100 || !state.studentName.trim()}
              title={
                progress !== 100
                  ? "Complete all four lessons to unlock the certificate."
                  : !state.studentName.trim()
                    ? "Enter your name above to create a named certificate."
                    : "Download your named completion certificate."
              }
            >
              <Download size={17} /> Completion certificate
            </Button>
          </div>
        </div>

        <div className="canvas-guide">
          <div className="canvas-guide-number">04</div>
          <div>
            <span className="section-kicker">Canvas handoff</span>
            <h3>From working notes to submitted evidence.</h3>
          </div>
          <ol>
            <li>Enter your name and course section before downloading.</li>
            <li>Review the file and remove confidential or proprietary information.</li>
            <li>Use the lesson number in the filename to match the Canvas assignment.</li>
            <li>
              Upload the downloaded .txt file, then keep your original {privateFilesLabel} private.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
