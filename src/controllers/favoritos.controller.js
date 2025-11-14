import { db } from "../config/db.js";

export async function listarFavoritos(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT f.favorito_id, u.nome AS usuario, l.titulo AS livro, f.data_favoritado
      FROM favoritos f
      JOIN usuarios u ON f.usuario_id = u.usuario_id
      JOIN livros l ON f.livro_id = l.livro_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarFavorito(req, res) {
  try {
    const { usuario_id, livro_id } = req.body;
    if (!usuario_id || !livro_id)
      return res.status(400).json({ erro: "Usuário e livro são obrigatórios." });

    await db.execute(
      "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
      [usuario_id, livro_id]
    );

    res.json({ mensagem: "Livro adicionado aos favoritos!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function excluirFavorito(req, res) {
  try {
    await db.execute("DELETE FROM favoritos WHERE favorito_id = ?", [req.params.id]);
    res.json({ mensagem: "Favorito removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}