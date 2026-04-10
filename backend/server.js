const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/ai/generate-note", (req, res) => {
  const { occasion, relationship, tone } = req.body || {};

  if (!occasion || !relationship || !tone) {
    return res.status(400).json({
      error: "occasion, relationship, and tone are required.",
    });
  }

  return res.status(200).json({
    note: "This is a placeholder generated note.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
