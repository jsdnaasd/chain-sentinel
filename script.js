const form = document.querySelector("#scan-form");
const walletInput = document.querySelector("#wallet");
const scoreEl = document.querySelector("#score");
const verdictEl = document.querySelector("#verdict");
const findingsEl = document.querySelector("#findings");
const gaugeEl = document.querySelector("#gauge");

const defaultWallet = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

function hashAddress(address) {
  return [...address.toLowerCase()].reduce((acc, char, index) => {
    return (acc + char.charCodeAt(0) * (index + 17)) % 9973;
  }, 0);
}

function analyzeWallet(address) {
  const normalized = address.trim();
  const seed = hashAddress(normalized || defaultWallet);
  const contractExposure = 38 + (seed % 45);
  const concentration = 30 + ((seed * 7) % 58);
  const bridgeActivity = 18 + ((seed * 11) % 64);
  const behaviorDrift = 20 + ((seed * 13) % 70);
  const score = Math.round((contractExposure * 0.3) + (concentration * 0.24) + (bridgeActivity * 0.2) + (behaviorDrift * 0.26));

  const verdict = score >= 75 ? "High Risk" : score >= 55 ? "Review Required" : "Low Risk";
  const color = score >= 75 ? "#fb7185" : score >= 55 ? "#fbbf24" : "#5eead4";

  return {
    score,
    verdict,
    color,
    findings: [
      `Contract exposure: ${contractExposure}% - ${contractExposure > 65 ? "heavy smart-contract interaction detected." : "moderate interaction footprint."}`,
      `Asset concentration: ${concentration}% - ${concentration > 66 ? "portfolio may depend on a narrow token set." : "asset spread looks manageable."}`,
      `Bridge activity: ${bridgeActivity}% - ${bridgeActivity > 60 ? "cross-chain behavior should be reviewed." : "no aggressive bridge pattern in demo model."}`,
      `Behavior drift: ${behaviorDrift}% - ${behaviorDrift > 62 ? "recent pattern change deserves manual inspection." : "activity pattern appears stable."}`
    ]
  };
}

function renderReport(report) {
  scoreEl.textContent = report.score;
  verdictEl.textContent = report.verdict;
  gaugeEl.style.stroke = report.color;
  gaugeEl.style.strokeDashoffset = 314 - (314 * report.score / 100);
  findingsEl.innerHTML = "";
  report.findings.forEach((finding) => {
    const item = document.createElement("li");
    item.textContent = finding;
    findingsEl.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderReport(analyzeWallet(walletInput.value));
});

walletInput.value = defaultWallet;
renderReport(analyzeWallet(defaultWallet));
