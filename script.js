const form = document.querySelector("#serviceForm");
const result = document.querySelector("#requestResult");
const summary = document.querySelector("#requestSummary");
const status = document.querySelector("#copyStatus");

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#service").value = button.dataset.service;
    document.querySelector("#request").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-city]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#city").value = button.dataset.city;
    document.querySelector("#request").scrollIntoView({ behavior: "smooth" });
  });
});

function buildSummary() {
  const data = new FormData(form);
  const details = String(data.get("details") || "").trim();
  return [
    "JOHN'S ELECTRIC CO. — SERVICE REQUEST",
    "",
    "Name: " + data.get("name"),
    "Phone: " + data.get("phone"),
    "Service area: " + data.get("city"),
    "Project: " + data.get("service"),
    "Timing: " + data.get("timing"),
    "",
    "Project details:",
    details || "No additional details provided."
  ].join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  summary.textContent = buildSummary();
  form.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#editRequest").addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "center" });
});

async function copyText() {
  try {
    await navigator.clipboard.writeText(summary.textContent);
    status.textContent = "Copied — your request is ready to paste.";
  } catch {
    status.textContent = "Press and hold the request text above to copy it.";
  }
}

document.querySelector("#copyRequest").addEventListener("click", copyText);

document.querySelector("#shareRequest").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({ title: "Electrical service request", text: summary.textContent });
      status.textContent = "Shared.";
    } catch (error) {
      if (error.name !== "AbortError") status.textContent = "Sharing was unavailable. You can copy the text instead.";
    }
  } else {
    await copyText();
  }
});
