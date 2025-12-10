const urlBase = "https://trabalho-final-web-ruddy.vercel.app";

const botaoSalvar = document.getElementById("submit");
botaoSalvar.addEventListener("click", inserirAdmin);

async function inserirAdmin(e) {
    e.preventDefault(); // Impede o comportamento padrão do botão

    try {
        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value
        };

        if (!dados.nome || !dados.email || !dados.senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const endpoint = "/admin"; // Endpoint ajustado para o contexto de admin
        const urlFinal = urlBase + endpoint;

        const response = await fetch(urlFinal, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        alert("Administrador inserido com sucesso!");
        window.location.href = "admin.html";

    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Administrador não inserido: " + error.message);
        window.location.href = "admin.html";
    }
}