import { Router } from "express";
import { PatientService } from "../services/PatientService";
const r = Router();
r.get("/", async (_, res) => res.json(await PatientService.all()));
r.post(
  "/",
  async (req, res) =>
    res.status(201).json(await PatientService.create(req.body)),
);
r.get("/:id", async (req, res) => {
  const p = await PatientService.find(+req.params.id);
  if (!p) return res.sendStatus(404);
  res.json(p);
});
r.put(
  "/:id",
  async (req, res) =>
    res.json(await PatientService.update(+req.params.id, req.body)),
);
r.delete("/:id", async (req, res) => {
  await PatientService.remove(+req.params.id);
  res.sendStatus(204);
});
export default r;
