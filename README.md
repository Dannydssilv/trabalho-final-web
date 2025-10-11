# trabalho-final-web
Trabalho final da disciplina de WEB

# Divonicas

### Integrantes
[comment]: <> Ana Paula Souza Carvalho:https://github.com/anapaulaszc
Daniely dos Santos Silva:https://github.com/Dannydssilv
Franklin Eduardo: ??
Lívia Oliveira Cunha:https://github.com/liviacunha14
Maria Eloísa Costa Silva: https://github.com/maeloisaaa

### Modelo Conceitual

[Link da imagem do Modelo Conceitual](./db/modelo_conceitual.png)
[Link da imagem do Modelo Lógico](./db/modelo_logico.png)

#### Explicação das Entidades, Atributos e Relacionamentos
Entidades

As entidades do projeto Flash Up são:

Usuario: Representa a pessoa que se cadastra e utiliza a plataforma para criar e estudar os baralhos.
Baralho: Representa uma coleção de flashcards sobre um tema específico, criada por um usuário.
Flashcard: É o cartão de estudo individual, contendo uma pergunta (frente) e uma resposta (verso).
Categoria: Agrupa os baralhos por matéria ou assunto (ex: ENEM) para facilitar a organização.

Atributos

Os atributos do Flash Up são:

Para a entidade Usuario:
    * id_usuario (Identificador)
    * nome
    * email
    * senha
Para a entidade Categoria:
    * id_categoria (Identificador)
    * nome_categoria
Para a entidade Baralho:
    * id_baralho (Identificador)
    * titulo
    * descricao
    * data_criacao
Para a entidade Flashcard:
    * id_flashcard (Identificador)
    * pergunta
    * resposta

Relacionamentos

Os relacionamentos do Flash Up são:

Cria (entre Usuario e Baralho):
    Descrição: Define a autoria de um baralho, garantindo que cada baralho pertença a um usuário.
    Cardinalidade: Um Usuario pode criar (0,n) (zero ou muitos) Baralhos, e um Baralho deve ser criado por (1,1) (um e somente um) Usuario.

Agrupa (entre Categoria e Baralho):
    Descrição:Organiza os baralhos por assunto.
    Cardinalidade: Uma Categoria pode agrupar (0,n) (zero ou muitos) Baralhos, e um Baralho deve ser agrupado em (1,1) (uma e somente uma) Categoria.

Contém (entre Baralho e Flashcard):
    Descrição: Define quais cartões pertencem a qual baralho. Um flashcard não pode existir sem um baralho.
    Cardinalidade: Um Baralho deve conter (1,n) (um ou muitos) Flashcards, e um Flashcard deve estar contido em (1,1) (um e somente um) Baralho.
