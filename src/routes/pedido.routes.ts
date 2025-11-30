import { Router } from "express";
import {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
  getProductosByPedidoId,
  getPedidosByUserId,
} from "../controller/pedido.controller";

const router = Router();

router.get("/pedidos", getPedidos);             
router.get("/pedidos/:id", getPedidoById);       
router.post("/pedidos", createPedido);           
router.put("/pedidos/:id", updatePedido);        
router.delete("/pedidos/:id", deletePedido);     

router.get("/pedidos/:id/productos", getProductosByPedidoId); 
router.get("/usuarios/:id_user/pedidos", getPedidosByUserId); 

export default router;
