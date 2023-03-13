import express from "express";
import path from "path";
const app = express();
const PORT = 443;
const __dirname = path.resolve();
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/readme.html");
});
console.log(__dirname);
