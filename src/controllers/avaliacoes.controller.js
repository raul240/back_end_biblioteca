import { db } from "../config/db.js";

export async function listarAvaliacoes(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        a.id AS avaliacao_id,
        a.nota, 
        a.comentario,
        u.nome AS usuario,
        l.titulo AS livro
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.usuario_id   
      JOIN livros l ON a.livro_id = l.livro_id         
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarAvaliacao(req, res) {
  try {
    const { usuario_id, livro_id, nota, comentario } = req.body;

    if (!usuario_id || !livro_id || !nota)
      return res.status(400).json({ erro: "Campos obrigatórios: usuário, livro e nota" });

    await db.execute(
      "INSERT INTO avaliacoes (usuarios_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
      [usuario_id, livro_id, nota, comentario || ""]
    );

    res.json({ mensagem: "Avaliação criada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

