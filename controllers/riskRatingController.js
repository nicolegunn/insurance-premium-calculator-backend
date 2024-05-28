const riskyKeyWords = ["collide", "crash", "scratch", "bump", "smash"];

const containsWords = (paragraph) => {
  const regex = /\b[a-zA-Z]+\b/;
  return regex.test(paragraph);
};

const calculateRisk = (claimHistory) => {
  return riskyKeyWords.reduce((count, keyword) => {
    const regex = new RegExp(keyword, "gi");
    const matches = claimHistory.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
};

module.exports.postRiskRating = (req, res) => {
  const { claim_history } = req.body;
  if (!claim_history) {
    return res.status(400).json({ error: "no claim history received" });
  }

  if (!containsWords(claim_history)) {
    return res.status(400).json({ error: "invalid claim history" });
  }
  const riskRating = calculateRisk(claim_history);
  return res.status(200).json({ risk_rating: riskRating });
};
