import { Router } from "express";
import { methods as meseroController } from "./../controllers/mesero";

const router = Router();

router.get("/api/meseros", meseroController.getMeseros);
router.get("/api/mesero/:id", meseroController.getMesero);
router.post("/api/mesero/add", meseroController.addMesero);
router.put("/api/mesero/update", meseroController.updateMesero);
router.delete("/api/mesero/delete/:id", meseroController.delMesero);

export default router;
