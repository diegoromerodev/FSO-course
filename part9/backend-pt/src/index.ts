/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import cors from "cors";
const app = express();
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
