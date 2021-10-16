const express = require("express");
const morgan = require("morgan");
const app = express();
const persons = require("./data");

app.use(express.json());
morgan.token("body", (req) =>
  req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : ""
);
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

app.get("/info", (req, res) => {
  const numberOfPeople =
    persons.length +
    (persons.length > 1 || !persons.length ? " people" : "person");
  const date = new Date();
  const html = `<p>Phonebook has info for ${numberOfPeople}.</p><p>${date}</p>`;
  res.send(html);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "request must contain a name and a number",
    });
  } else if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 9999999),
  };

  persons.push(person);

  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === Number(req.params.id));
  if (person) {
    return res.send(person);
  }
  res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const idx = persons.findIndex((p) => p.id === Number(req.params.id));
  persons.splice(idx, 1);
  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("LISTENING ON PORT " + PORT);
});
