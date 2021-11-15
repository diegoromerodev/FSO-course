import express from "express";
import { createPatient, getPrivatedPatients } from "../services/patients";
import { toNewPatientEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getPrivatedPatients());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatientEntry(req.body);
    const createdPatient = createPatient(newPatient);
    res.json(createdPatient);
  } catch (err: unknown) {
    let errorMsg = "Something exploded ";
    if (err instanceof Error) {
      errorMsg += err.message;
    }
    res.json({
      error: errorMsg,
    });
  }
});

export default router;
