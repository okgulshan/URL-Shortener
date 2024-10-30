const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const PORT = 8001;
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB Connected!");
});
app.use(express.json());
app.use("/url", urlRoute);
/* app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}); */

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } // returns the updated document
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("Short URL not found");
  }
});
app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
