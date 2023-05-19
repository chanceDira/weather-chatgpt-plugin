import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import getweatherRoute from "./routers/get-weather.js";

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Get Weather Plugin");
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  const filePath = path.join(__dirname, "/.well-known/ai-plugin.json");

  res.sendFile(filePath, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send({
        msg: "error sending file",
      });
    } else {
      console.log("Sent:", filePath);
    }
  });
});

app.get("/.well-known/openai.yaml", (req, res) => {
  const filePath = path.join(__dirname, "/openai.yaml");

  res.sendFile(filePath, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send({
        msg: "error sending file",
      });
    } else {
      console.log("Sent:", filePath);
    }
  });
});

app.use("/api/v1/get-weather", getweatherRoute);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
