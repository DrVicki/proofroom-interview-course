# Proofroom Standalone Launch Checklist

- [x] Serve Proofroom directly from the root route.
- [x] Remove résumé-course navigation, data, and shared state.
- [x] Use Proofroom branding in the header, metadata, favicon, and footer.
- [x] Validate TypeScript and the production build.
- [x] Validate desktop and mobile layouts.
- [x] Validate notes, progress, Canvas downloads, bundle, and certificate.
- [x] Deploy the standalone production build.

## Linked Learning Path and Module Checklist

- [ ] Add a persistent Proofwork navigation link to the Proofroom header.
- [ ] Add a responsive Proofwork promotional banner to the Proofroom course.
- [ ] Build an interactive checklist covering the four interview-preparation modules.
- [ ] Persist checklist progress independently in browser-local storage.
- [ ] Make checklist items keyboard-accessible with visible completed states and a progress summary.
- [ ] Validate reciprocal links, checklist persistence, mobile layout, TypeScript, build, and production logs.
- [ ] Redeploy the standalone Proofroom site and update its maintenance archive.

## Independent Project Handoff

- [x] Create a dedicated private GitHub repository for Proofroom.
- [x] Commit the standalone source, course data, design decisions, and deployment documentation.
- [x] Create a separate private Manus task for future Proofroom development using `MANUS_TASK_HANDOFF.md`.
- [x] Confirm the new task points to the dedicated Proofroom repository, Pages companion, and current standalone deployment.

## Dedicated Task and GitHub Pages Publication

- [x] Confirm the validated standalone source and exclude build output, dependencies, logs, and secrets.
- [x] Create a dedicated private `proofroom-interview-course` GitHub repository.
- [x] Initialize Git, commit the standalone source, and push `main`.
- [x] Create a workflow-free `/docs` GitHub Pages companion with relative assets, live-course handoff, reciprocal Proofwork link, and a persistent module checklist.
- [x] Add and run a `pages:check` validator, TypeScript check, production build, diff review, desktop interaction check, and mobile layout check.
- [x] Create a separate private Manus task with the repository, Pages URL, and standalone deployment context.
- [x] Configure `main` → `/docs` Pages publishing and verify the public site, reciprocal Proofwork link, module checklist, and persisted 25% review state.
- [x] Update Proofwork’s Proofroom links to the GitHub Pages URL.
- [x] Deliver the new task, repository, and Pages publication details.
