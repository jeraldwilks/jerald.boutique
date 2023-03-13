import express from "express";

const app = express();
const PORT = 443;
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
