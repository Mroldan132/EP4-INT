import { Router } from "express";
import { methods as orderController } from "./../controllers/orden";

const router = Router();

router.get("/api/ordenes", orderController.getOrdenes);
router.post("/api/orden/add", orderController.addOrden);
router.get("/api/orden/:id", orderController.getOrden);
router.put("/api/orden/update/:id", orderController.updateOrden);
router.delete("/api/orden/delete/:id", orderController.delOrden);

export default router;
