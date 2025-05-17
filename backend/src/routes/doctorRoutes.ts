import { Router } from "express";
import { DoctorService } from "../services/DoctorService";
const r = Router();
r.get("/", async (_, res) => res.json(await DoctorService.all()));
r.post(
  "/",
  async (req, res) =>
    res.status(201).json(await DoctorService.create(req.body)),
);
r.get("/:id", async (req, res) => {
  const d = await DoctorService.find(+req.params.id);
  if (!d) return res.sendStatus(404);
  res.json(d);
});
r.put(
  "/:id",
  async (req, res) =>
    res.json(await DoctorService.update(+req.params.id, req.body)),
);
r.delete("/:id", async (req, res) => {
  await DoctorService.remove(+req.params.id);
  res.sendStatus(204);
});
export default r;
