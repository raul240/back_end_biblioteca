
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS dblivraria;
USE dblivraria;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL
);

-- Inserção de usuários de exemplo
INSERT INTO usuarios (nome, email, senha) VALUES
('Vitor Lima', 'vitor.lima@email.com', '1234'),
('Pedro Campos', 'pedro.campos@email.com', 'abcd'),
('Pedro Gabriel', 'pedro.gabriel@email.com', 'senha123'),
('Davi Guedes', 'davi.guedes@email.com', 'teste123'),
('Matheus Lima', 'matheus.lima@email.com', '3210');


CREATE TABLE livros (
livro_id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(255),
autor VARCHAR(255),
disponivel BOOLEAN DEFAULT TRUE 
);

('python para espertinhos', 'não sei oq colocar', '5')
('c# para malditos', 'henrique cuidador de porco'  '3')
('como ler livros O livro', 'thayna adotadora de gato', '15')
('como aprender a ler livros 2 o inimigo agora é outro', 'thayna adotadora de gato', '15');

CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    nota DECIMAL(2,1) CHECK (nota >= 0 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);
INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario)
VALUES
(1, 1, 5.0, 'História envolvente e personagens cativantes.'),
(2, 1, 4.5, 'Ótima leitura, final surpreendente.'),
(3, 2, 4.0, 'Excelente abordagem sobre tecnologia e negócios.'),
(1, 4, 5.0, 'Leitura obrigatória para todo desenvolvedor.'),
(2, 3, 3.5, 'Ideia interessante, mas um pouco confusa em alguns trechos.'),
(3, 5, 4.8, 'Um clássico atemporal, narrativa impecável.');

CREATE TABLE IF NOT EXISTS reservas (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    confirmado_email BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(livro_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favoritos (
    favorito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_favoritado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(livro_id) ON DELETE CASCADE
);