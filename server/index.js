import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const filename = fileURLToPath(import.meta.url);
const directory = path.dirname(filename);
const clientDist = path.join(directory, "..", "client", "dist");

app.use(express.json());
app.use(express.static(clientDist));

app.get("/api/health", (request, response) => {
    response.json({
        status: "ok",
        service: "algorithms-visualizer"
    });
});

app.get("*", (request, response) => {
    response.sendFile(path.join(clientDist, "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});