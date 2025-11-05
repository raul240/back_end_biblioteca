import express from "express"
import { listarUsuarios } from "../controllers/usuario.controller.js";
import { criarUsuario } from "../controllers/usuario.controller.js";
import { obterUsuario } from "../controllers/usuario.controller.js";
import { atualizarUsuario } from "../controllers/usuario.controller.js";
import { apagarUsuario } from "../controllers/usuario.controller.js";
const router = express();


router.get("/",listarUsuarios);
router.post("/",criarUsuario);
router.get("/",obterUsuario);
router.put("/",atualizarUsuario);
router.delete("/",apagarUsuario);

export default router;