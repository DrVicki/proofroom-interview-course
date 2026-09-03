# Proofroom Independent Manus Task

**Created task:** `https://manus.im/app/MBxwe7CDwQy6JbwxCsMaDV`  
**Task ID:** `MBxwe7CDwQy6JbwxCsMaDV`  
**Visibility:** Private

## Task title

Maintain and Extend the Proofroom Copilot Interview Course

## Initial task prompt

Maintain the standalone **Proofroom** Microsoft Copilot interview-preparation course created and instructed by **Dr. Vicki Bealman**.

Use the dedicated GitHub repository at `https://github.com/DrVicki/proofroom-interview-course` as the source of truth. The public GitHub Pages companion is `https://drvicki.github.io/proofroom-interview-course/`. The existing interactive production course is currently available at `http://34.26.38.206/` and is served by Nginx from `/var/www/proofroom/current` on the connected cloud computer.

Preserve the Proofroom visual system: warm archival paper, blue-black editorial typography, cobalt analysis cues, Room Red live-practice signals, and Proof Lime earned-completion states. Keep the course evidence-led, privacy-conscious, and free of fabricated candidate experience.

The course contains four modules: Interview Brief, Proof Story Bank, Adaptive Mock Interview, and Evidence Debrief. Preserve editable notes, browser-local learner state, prompt copying, Canvas-ready lesson downloads, the complete bundle, the completion certificate, responsive behavior, and reciprocal navigation to Proofwork.

Before publishing changes, run `pnpm pages:check`, `pnpm check`, `pnpm build`, and `git diff --check`. Use workflow-free `main` → `/docs` GitHub Pages publishing unless the repository owner explicitly changes the deployment model.

## Independent project locations

| Resource | Location |
| --- | --- |
| GitHub repository | `https://github.com/DrVicki/proofroom-interview-course` |
| GitHub Pages companion | `https://drvicki.github.io/proofroom-interview-course/` |
| Manus task | `https://manus.im/app/MBxwe7CDwQy6JbwxCsMaDV` |
| Interactive production course | `http://34.26.38.206/` |
| Cloud deployment root | `/var/www/proofroom/current` |
| Nginx configuration | `/etc/nginx/sites-available/proofroom` |
| Local source workspace | `/home/ubuntu/proofroom-interview-course` |
