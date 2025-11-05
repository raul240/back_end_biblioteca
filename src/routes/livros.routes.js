import express from "express";
import {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  excluirLivro
} from "../controllers/livros.controller.js";

const router = express.Router();

router.get("/", listarLivros);
router.get("/:id", buscarLivro);
router.post("/", criarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", excluirLivro);

export default router;
