import { Router } from "express";
import { AppointmentService } from "../services/AppointmentService";
const r = Router();
r.get("/", async (_, res) => res.json(await AppointmentService.all()));
r.post("/", async (req, res) =>
  res.status(201).json(await AppointmentService.create(req.body))
);
r.get("/:id", async (req, res) => {
  const a = await AppointmentService.find(+req.params.id);
  if (!a) return res.sendStatus(404);
  res.json(a);
});
r.put("/:id", async (req, res) =>
  res.json(await AppointmentService.update(+req.params.id, req.body))
);
r.delete("/:id", async (req, res) => {
  await AppointmentService.remove(+req.params.id);
  res.sendStatus(204);
});
r.patch("/:id/finish", async (req, res) => {
  await AppointmentService.finish(+req.params.id);
  res.sendStatus(204);
});

export default r;
