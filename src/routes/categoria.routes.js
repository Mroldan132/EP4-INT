import { Router } from "express";
import { methods as categoryController } from "./../controllers/categoria";

const router = Router();

router.get("/api/categorias", categoryController.getCategorias);
router.get("/api/categoria/:id", categoryController.getCategoria);
router.post("/api/categoria/add", categoryController.addCategoria);
router.put("/api/categoria/update", categoryController.updateCategoria);
router.delete("/api/categoria/delete/:id", categoryController.delCategoria);

export default router;
