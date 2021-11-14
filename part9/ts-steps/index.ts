/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const {weight, height} = req.query;
    if(!weight || !height) return res.json({
        error: "missing arguments"
    });
    const numHeight = Number(height);
    const numWeight = Number(weight);
    if(isNaN(numHeight) || isNaN(numWeight)) {
        return res.json({
            error: "malformatted parameters"
        });
    }

    return res.json({
        weight: numWeight,
        height: numHeight,
        bmi: bmiCalculator(numHeight, numWeight)
    });
});

app.post("/exercises", (req, res) => {
    const {daily_exercises, target} = req.body;
    if(!daily_exercises || !target) {
        return res.json({
            error: "missing arguments"
        });
    }
    if(!Array.isArray(daily_exercises) || isNaN(Number(target))){
        return res.json({
            error: "malformatted arguments"
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(exerciseCalculator(daily_exercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log("listening on", PORT);
});