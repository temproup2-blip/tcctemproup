let carrinho = JSON.parse(localStorage.getItem("tempRoupCarrinho")) || [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 0
};

let tamanhoSelecionado = "";
let corSelecionada = "";

document.addEventListener("DOMContentLoaded", function () {

    // Verifica se já existe usuário cadastrado
    const usuario = localStorage.getItem("tempRoupUsuario");
    const telaLogin = document.getElementById("tela-login");

    if (usuario) {
        telaLogin.style.display = "none";
    } else {
        telaLogin.style.display = "flex";
    }

    // CADASTRAR E ENTRAR
    const formulario = document.getElementById("form-login");

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const mensagem = document.getElementById("mensagem-login");

            if (nome === "" || email === "" || senha === "") {
                mensagem.textContent = "Preencha todos os campos.";
                return;
            }

            if (senha.length < 4) {
                mensagem.textContent = "A senha deve ter pelo menos 4 caracteres.";
                return;
            }

            // Salva somente nome e e-mail
            localStorage.setItem(
                "tempRoupUsuario",
                JSON.stringify({
                    nome: nome,
                    email: email
                })
            );

            mensagem.textContent = "Cadastro realizado!";

            // Fecha a tela de cadastro
            setTimeout(function () {
                telaLogin.style.display = "none";
            }, 500);
        });
    }

    atualizarCarrinho();
});


// ===============================
// MENU
// ===============================

function toggleMenu() {
    const menu = document.querySelector(".nav-links");

    if (menu) {
        menu.classList.toggle("ativo");
    }
}


// ===============================
// PRODUTO
// ===============================

function selecionarProduto(nome, imagem, preco) {

    produtoAtual.nome = nome;
    produtoAtual.imagem = imagem;
    produtoAtual.preco = preco;

    tamanhoSelecionado = "";
    corSelecionada = "";

    const modal = document.getElementById("modal-produto");

    if (!modal) return;

    document.getElementById("modal-nome").textContent = nome;
    document.getElementById("modal-imagem").src = imagem;
    document.getElementById("modal-preco").textContent =
        "R$ " + preco.toFixed(2).replace(".", ",");

    document.querySelectorAll(".tamanho").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    document.querySelectorAll(".cor").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    modal.style.display = "flex";
}


function selecionarTamanho(tamanho, elemento) {

    tamanhoSelecionado = tamanho;

    document.querySelectorAll(".tamanho").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    elemento.classList.add("selecionado");
}


function selecionarCor(cor, elemento) {

    corSelecionada = cor;

    document.querySelectorAll(".cor").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    elemento.classList.add("selecionado");
}


// ===============================
// FECHAR MODAL
// ===============================

function fecharModal() {

    const modal = document.getElementById("modal-produto");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// CARRINHO
// ===============================

function adicionarAoCarrinho() {

    if (!tamanhoSelecionado) {
        alert("Selecione um tamanho.");
        return;
    }

    if (!corSelecionada) {
        alert("Selecione uma cor.");
        return;
    }

    const item = {
        nome: produtoAtual.nome,
        imagem: produtoAtual.imagem,
        preco: produtoAtual.preco,
        tamanho: tamanhoSelecionado,
        cor: corSelecionada
    };

    carrinho.push(item);

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

    fecharModal();

    alert("Produto adicionado ao carrinho!");
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const total = document.getElementById("total-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach(function (item, index) {

        valorTotal += item.preco;

        const div = document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `
            <img src="${item.imagem}">
            <div>
                <strong>${item.nome}</strong>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Cor: ${item.cor}</p>
                <p>R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
            </div>
            <button onclick="removerDoCarrinho(${index})">
                Remover
            </button>
        `;

        lista.appendChild(div);
    });

    if (contador) {
        contador.textContent = carrinho.length;
    }

    if (total) {
        total.textContent =
            "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }
}


// ===============================
// REMOVER CARRINHO
// ===============================

function removerDoCarrinho(index) {

    carrinho.splice(index, 1);

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();
}


// ===============================
// ABRIR CARRINHO
// ===============================

function abrirCarrinho() {

    const carrinhoModal =
        document.getElementById("modal-carrinho");

    if (carrinhoModal) {
        carrinhoModal.style.display = "flex";
    }

    atualizarCarrinho();
}


function fecharCarrinho() {

    const carrinhoModal =
        document.getElementById("modal-carrinho");

    if (carrinhoModal) {
        carrinhoModal.style.display = "none";
    }
}


// ===============================
// FINALIZAR COMPRA
// ===============================

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n\n" +
        "Obrigado por comprar na Temp.Roup."
    );
}


// ===============================
// CONTATO
// ===============================

function mostrarContato() {

    alert(
        "Entre em contato com a Temp.Roup:\n\n" +
        "E-mail: contato@temproup.com"
    );
}


// ===============================
// FECHAR MODAIS AO CLICAR FORA
// ===============================

window.addEventListener("click", function (event) {

    const modalProduto =
        document.getElementById("modal-produto");

    const modalCarrinho =
        document.getElementById("modal-carrinho");

    if (event.target === modalProduto) {
        modalProduto.style.display = "none";
    }

    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = "none";
    }

});
