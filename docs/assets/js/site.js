const checklistKey = "proofroom-pages-module-checklist-v1";
const checklistButtons = [...document.querySelectorAll("[data-module]")];

function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(checklistKey) || "[]");
  } catch {
    return [];
  }
}

let completedModules = new Set(loadChecklist());

function renderChecklist() {
  checklistButtons.forEach((button) => {
    const complete = completedModules.has(button.dataset.module);
    button.setAttribute("aria-pressed", String(complete));
    button.classList.toggle("is-complete", complete);
    button.querySelector("b").textContent = complete ? "Reviewed" : "Mark reviewed";
  });

  const count = completedModules.size;
  const percent = Math.round((count / checklistButtons.length) * 100);
  document.querySelector("#progress-label").textContent = `${count} of ${checklistButtons.length} reviewed`;
  document.querySelector("#progress-percent").textContent = `${percent}%`;
  document.querySelector("#progress-bar").style.transform = `scaleX(${percent / 100})`;
}

checklistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const moduleId = button.dataset.module;
    if (completedModules.has(moduleId)) completedModules.delete(moduleId);
    else completedModules.add(moduleId);
    localStorage.setItem(checklistKey, JSON.stringify([...completedModules]));
    renderChecklist();
  });
});

document.querySelectorAll(".lesson > button").forEach((button) => {
  button.addEventListener("click", () => {
    const lesson = button.closest(".lesson");
    const detail = lesson.querySelector(".lesson-detail");
    const control = button.querySelector("b");
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    lesson.classList.toggle("is-open", !isOpen);
    detail.hidden = isOpen;
    control.textContent = isOpen ? "+" : "−";
  });
});

renderChecklist();
