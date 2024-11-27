import { Router } from "express";
import { methods as clienteController } from "./../controllers/cliente";

const router = Router();

router.get("/api/clientes", clienteController.getClientes);
router.get("/api/cliente/:id", clienteController.getCliente);
router.post("/api/cliente/add", clienteController.addCliente);
router.put("/api/cliente/update/:id", clienteController.updateCliente);
router.delete("/api/cliente/delete/:id", clienteController.delCliente);

export default router;
