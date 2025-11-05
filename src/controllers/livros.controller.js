import { db } from "../config/db.js";


export async function listarLivros(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function buscarLivro(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros WHERE livro_id = ?", [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function criarLivro(req, res) {
  try {
    const { titulo, autor, disponivel } = req.body;
    if (!titulo || !autor)
      return res.status(400).json({ erro: "Campos obrigatórios: título e autor" });

    await db.execute(
      "INSERT INTO livros (titulo, autor, disponivel) VALUES (?, ?, ?)",
      [titulo, autor, disponivel ?? 1]
    );
    res.json({ mensagem: "Livro criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function atualizarLivro(req, res) {
  try {
    const { titulo, autor, disponivel } = req.body;
    await db.execute(
     "UPDATE livros SET titulo = ?, autor = ?, disponivel = ? WHERE livro_id = ?",
      [titulo, autor, disponivel, req.params.id]
    );
    res.json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function excluirLivro(req, res) {
  try {
    await db.execute("DELETE FROM livros WHERE livro_id = ?", [req.params.id]);
    res.json({ mensagem: "Livro deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
