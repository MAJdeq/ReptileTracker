import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { ReptilesRepository } from "../repositories/reptiles_repository";

export const buildReptilesController = (reptilesRepository: ReptilesRepository) => {
  const router = Router();

  // POST /reptiles - Create a new reptile
  router.post("/", authMiddleware, async (req, res) => {
    try {
      const reptile = await reptilesRepository.createReptile(req.body, req.user.id);
      res.json(reptile);
    } catch (error) {
      console.error("Error creating reptile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /reptiles - Get all reptiles belonging to the current user
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const reptiles = await reptilesRepository.getReptilesByUserId(req.user.id);
      res.json(reptiles);
    } catch (error) {
      console.error("Error fetching reptiles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
