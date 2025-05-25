import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "../utils/json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    }

    respondWithJSON(res, 200, {
        valid: true,
    });
}
