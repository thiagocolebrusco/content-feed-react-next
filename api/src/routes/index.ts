import type { Express, } from "express";
import Feed from "./feed";

const router = (app: Express) => {
    app.use("/feed", Feed);
}

export default router;