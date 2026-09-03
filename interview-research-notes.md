# Microsoft Copilot Interview Course Research Notes

Research completed September 2, 2026. Use the linked official sources for website citations and avoid presenting changing limits as permanent product guarantees.

## Source 1 — Agent Builder

**Title:** Build agents by using Agent Builder in Microsoft 365 Copilot  
**URL:** https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-build-agents

Current Microsoft guidance says Agent Builder can create a declarative agent from a natural-language description, through a manual Configure tab, or from a template. The configuration includes name, description, instructions, knowledge sources, and starter prompts. Learners can test and refine the agent in the Try it tab. Natural-language creation and specific knowledge or capability options can vary by language, account, license, and tenant.

**Course use:** Lesson 1 will build the Interview Practice Lab agent shell. Lesson 4 will require testing and refining the instructions rather than relying on one successful run.

## Source 2 — Effective Instructions

**Title:** Write effective instructions for declarative agents  
**URL:** https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/declarative-agent-instructions

Microsoft recommends modular step-by-step workflows with a goal, action, and transition; explicit tone and output format; Markdown structure; defined domain vocabulary; named knowledge sources or capabilities; examples for complex tasks; a final self-evaluation; and iterative refinement. Ordered lists should be reserved for steps where order matters.

**Course use:** Every lesson prompt will separate purpose, truth rules, workflow, transition conditions, output contract, and final check. The mock-interview prompt will enforce one question at a time and prevent coaching before the learner answers.

## Source 3 — Knowledge Sources

**Title:** Add knowledge sources to your declarative agent in Microsoft 365 Copilot  
**URL:** https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-add-knowledge

Microsoft documents public websites, SharePoint and OneDrive content, embedded files, and license- or tenant-dependent Microsoft 365 sources. Existing permissions and sensitivity labels remain relevant for organizational files. Microsoft also recommends concise source files for effective retrieval.

**Course use:** Learners will build a concise Interview Evidence Pack from a job description, current resume, and verified story bank. They will be warned to remove confidential employer, client, student, patient, financial, or proprietary information.

## Source 4 — Microsoft Community Mock-Interview Guide

**Title:** Step-by-Step Guide: Using Copilot for Mock Interviews in Nonprofits  
**URL:** https://techcommunity.microsoft.com/blog/nonprofittechies/step-by-step-guide-using-copilot-for-mock-interviews-in-nonprofits/4390270

The Microsoft-hosted community guide recommends defining the interview structure, assigning Copilot a career-coach persona, asking realistic questions, maintaining context for follow-up questions, requesting feedback, and repeating practice with varied question sets.

**Course use:** Lesson 3 will formalize these ideas into a stricter adaptive protocol: one question, one answer, one evidence-aware follow-up, and no response rewriting until the mock interview ends.

## Change-Safe Copy Decisions

The website will call the implementation a **custom declarative agent** and the learner outcome a reusable **interview-practice skill**. Product steps will use durable phrasing such as “Open the agent creation experience available to your Microsoft 365 Copilot account.” Exact numerical limits will not be central course requirements because they can change. A course note will state that interface labels and availability can vary by license, language, tenant, and organization settings.
