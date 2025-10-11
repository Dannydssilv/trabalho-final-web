INSERT INTO usuarios (nome, email, senha) VALUES
('Lívia Cunha', 'livia.cunha@email.com', 'senha_super_segura_123'),
('Daniely Silva', 'danny.silva@email.com', 'outra_senha_456');

INSERT INTO categorias (nome_categoria) VALUES
('ENEM'),
('Biologia'),
('História do Brasil');

INSERT INTO baralhos (titulo, descricao, id_usuario, id_categoria) VALUES
('Fórmulas de Física para o ENEM', 'Principais fórmulas de física cobradas na prova.', 1, 1);

INSERT INTO flashcards (pergunta, resposta, id_baralho) VALUES
('Qual é a segunda lei de Newton?', 'Força é igual a massa vezes a aceleração (F = m * a).', 1),
('O que diz a lei de Ohm?', 'A corrente em um circuito é diretamente proporcional à tensão e inversamente proporcional à resistência (V = R * i).', 1),
('Qual a fórmula da velocidade média?', 'Distância percorrida dividida pelo tempo gasto (Vm = Δs / Δt).', 1);