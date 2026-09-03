/**
 * Content contract — The Proofroom:
 * Every lesson creates one working part of the evidence-led interview practice system.
 */

export type Lesson = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  duration: string;
  summary: string;
  objective: string;
  readingTitle: string;
  reading: string[];
  keyMoves: string[];
  promptTitle: string;
  promptIntro: string;
  prompt: string;
  assignmentTitle: string;
  assignment: string;
  reflection: string;
  deliverable: string;
  art: string;
  artAlt: string;
  sourceIds: number[];
};
