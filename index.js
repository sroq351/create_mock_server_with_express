const express = require("express");
const fs = require("fs");

const PORT = 3001;
const app = express();

app.use(express.json());

const PersonalData = JSON.parse(fs.readFileSync(`mock-server/data/data.json`));

app.get("/me", (req, res) => {
  res.status(200).json({
    results: PersonalData.length,
    data: PersonalData,
  });
});

app.patch("/me", (req, res) => {
  const updates = req.body;

  const UpdatedData = { ...PersonalData, ...updates };

  fs.writeFile(
    `mock-server/data/data.json`,
    JSON.stringify(UpdatedData),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to update data",
        });
      }
      res.status(200).json({
        status: "success",
        data: UpdatedData,
      });
    }
  );
});
app.delete("/me", (req, res) => {
  fs.writeFile(
    `mock-server/data/data.json`,
    JSON.stringify(PersonalData),
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error during personal data deleting." });
      }
      res.status(200).json({ message: "Personal data deleted successfully." });
    }
  );
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
