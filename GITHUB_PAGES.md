# Proofroom GitHub Pages Deployment

The repository is [`DrVicki/proofroom-interview-course`](https://github.com/DrVicki/proofroom-interview-course) on the `main` branch. The public companion is packaged under `/docs` for workflow-free, branch-based GitHub Pages publishing.

| Setting | Value |
| --- | --- |
| Publishing mode | Deploy from a branch |
| Branch | `main` |
| Folder | `/docs` |
| Expected URL | `https://drvicki.github.io/proofroom-interview-course/` |
| Live interactive course | `http://34.26.38.206/` |

## One-time repository setting

Open **Settings → Pages** in the GitHub repository. Under **Build and deployment**, select **Deploy from a branch**, choose `main`, select `/docs`, and save. The GitHub integration can push repository content but may not administer the Pages endpoint, so this one-time setting can require the repository owner.

## Validation

Run `pnpm pages:check` before committing. The validator confirms the required Pages files, relative local assets, live-course link, all four module titles, persistent checklist markup, and deployment configuration.
