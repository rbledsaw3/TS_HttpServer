import express from "express";
import type {
    Request,
    Response,
    NextFunction
}  from "express";
import  { handlerReadiness } from "./api/readiness.js";

const app = express();
const PORT = 8080;

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
const middlewareLogResponses: Middleware = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode > 399 || res.statusCode < 200) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
    });
    next();
};

app.use(middlewareLogResponses);
app.use("/app", middlewareLogResponses, express.static("./src/app"));

app.get("/healthz", middlewareLogResponses, handlerReadiness);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
