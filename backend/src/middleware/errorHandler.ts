import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400).json({ message: "Malformed JSON request body" });
        return;
    }

    if (error instanceof Error && error.name === "ValidationError") {
        res.status(400).json({ message: error.message });
        return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
};