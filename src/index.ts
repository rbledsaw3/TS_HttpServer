import express from "express";

import  { handlerReadiness } from "./api/readiness.js";
import  { handlerChirpsValidate } from "./api/chirps.js";
import  { handlerReset } from "./admin/reset.js";
import  { handlerMetrics } from "./admin/metrics.js";
import {
    middlewareLogResponse,
    middlewareMetricsInc,
} from "./api/middleware.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponse);
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", handlerChirpsValidate);

app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
