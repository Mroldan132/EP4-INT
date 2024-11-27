import { Router } from "express";
import { methods as platoController } from "../controllers/plato";

const router = Router();

router.get("/api/platos", platoController.getPlatos);
router.get("/api/plato/:id", platoController.getPlato);
router.post("/api/plato/add", platoController.addPlato);
router.put("/api/plato/update/:id", platoController.updatePlato);
router.delete("/api/plato/delete/:id", platoController.delPlato);


export default router;
