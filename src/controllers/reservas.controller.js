import { db } from "../config/db.js";

export async function listarReservas(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT r.reserva_id, r.data_retirada, r.data_devolucao, r.confirmado_email,
             u.nome AS usuario, l.titulo AS livro
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.usuario_id
      JOIN livros l ON r.livro_id = l.livro_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarReserva(req, res) {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;
    if (!usuario_id || !livro_id || !data_retirada || !data_devolucao) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    await db.execute(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );

    res.json({ mensagem: "Reserva criada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function excluirReserva(req, res) {
  try {
    await db.execute("DELETE FROM reservas WHERE reserva_id = ?", [req.params.id]);
    res.json({ mensagem: "Reserva excluída com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


