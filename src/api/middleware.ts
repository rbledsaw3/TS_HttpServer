import type {
    Request,
    Response,
    NextFunction
} from 'express';
import { config } from "../config.js";

export function middlewareMetricsInc(
    _: Request,
    __: Response,
    next: NextFunction
): void {
    config.fileServerHits++;
    next();
}

export function middlewareLogResponse(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    res.on("finish", () => {
        if (res.statusCode > 399 || res.statusCode < 200) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
    });
    next();
};

