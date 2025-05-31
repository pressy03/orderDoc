import { Router } from "express";
import { AppointmentRepository } from "../repositories/AppointmentRepository";

const repo = new AppointmentRepository();
const r = Router();

r.get("/",      async (_, res) => res.json(await repo.pending()));
r.post("/",     async (req,res) => res.status(201).json(await repo.create(req.body)));
r.get("/:id",   async (req,res) => {
  const a = await repo.find(+req.params.id);
  if (!a) return res.sendStatus(404);
  res.json(a);
});
r.put("/:id",   async (req,res) => res.json(await repo.update(+req.params.id, req.body)));
r.patch("/:id/finish", async (req,res) => { await repo.finish(+req.params.id); res.sendStatus(204); });
r.delete("/:id", async (req,res) => { await repo.remove(+req.params.id); res.sendStatus(204); });

export default r;