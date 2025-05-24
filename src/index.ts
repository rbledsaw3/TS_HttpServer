import express from "express";

import  { handlerReadiness } from "./api/readiness.js";
import  { handlerReset } from "./api/reset.js";
import  { handlerMetrics } from "./api/metrics.js";
import {
    middlewareLogResponse,
    middlewareMetricsInc,
} from "./api/middleware.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponse);
app.use(middlewareMetricsInc);

app.use("/app", middlewareLogResponse, middlewareMetricsInc, express.static("./src/app"));
app.get("/healthz", middlewareLogResponse, handlerReadiness);
app.get("/metrics", middlewareLogResponse, handlerMetrics);
app.get("/reset", middlewareLogResponse, handlerReset);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
