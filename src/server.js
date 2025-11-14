// ============================
//  Dependências
// ============================
import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js"
import livrosRoutes from "./routes/livros.routes.js";
import avaliacoesRoutes from "./routes/avaliacoes.routes.js";
import reservasRouter from "./routes/reservas.routes.js";
import favoritosRouter from "./routes/favoritos.routes.js";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/",(req, res)=>{
  res.send("API rodando com sucesso")
});
app.use("/usuarios",usuarioRoutes)
app.use("/livros", livrosRoutes)
app.use("/avaliacoes", avaliacoesRoutes)
app.use("/reservas", reservasRouter);
app.use("/favoritos", favoritosRouter);


// ============================
//  Configuração do servidor
// ============================
// ============================
//  Conexão com o MariaDB
// ============================
// ============================
//  Rotas CRUD
// ============================
// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
