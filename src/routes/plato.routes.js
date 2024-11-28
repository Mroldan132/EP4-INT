import { Router } from "express";
import { methods as platoController } from "../controllers/plato";
import upload from "../middlewares/upload";

const router = Router();

router.get("/api/platos", platoController.getPlatos);
router.get("/api/plato/:id", platoController.getPlato);
router.post("/api/plato/add", upload.single('imagen'),platoController.addPlato);
router.put('/api/plato/update', upload.single('imagen'), platoController.updatePlato);
router.delete("/api/plato/delete/:id", platoController.delPlato);


export default router;
