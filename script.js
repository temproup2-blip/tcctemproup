// TEMP.ROUP - SCRIPT.JS

let carrinho = JSON.parse(localStorage.getItem("tempRoupCarrinho")) || [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 0
};

let tamanhoSelecionado = "";
let corSelecionada = "";


/* =========================
   CADASTRAR E ENTRAR
========================= */

function realizarCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (nome === "" || email === "" || senha === "") {
        alert("Preencha todos os campos.");
        return false;
    }

    if (senha.length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres.");
        return false;
    }

    localStorage.setItem(
        "tempRoupUsuario",
        JSON.stringify({
            nome: nome,
            email: email
        })
    );

    document.getElementById("tela-login").style.display = "none";

    return false;
}


/* =========================
   VERIFICAR LOGIN
========================= */

function carregarLogin() {

    const telaLogin = document.getElementById("tela-login");

    if (!telaLogin) {
        return;
    }

    const usuario = localStorage.getItem("tempRoupUsuario");

    if (usuario) {
        telaLogin.style.display = "none";
    } else {
        telaLogin.style.display = "flex";
    }
}


/* =========================
   VER PRODUTO
========================= */

function selecionarProduto(nome, imagem, preco) {

    produtoAtual.nome = nome;
    produtoAtual.imagem = imagem;
    produtoAtual.preco = preco;

    tamanhoSelecionado = "";
    corSelecionada = "";

    const modal = document.getElementById("modal-produto");

    if (!modal) {
        return;
    }

    const modalNome = document.getElementById("modal-nome");
    const modalImagem = document.getElementById("modal-imagem");
    const modalPreco = document.getElementById("modal-preco");

    if (modalNome) {
        modalNome.textContent = nome;
    }

    if (modalImagem) {
        modalImagem.src = imagem;
    }

    if (modalPreco) {
        modalPreco.textContent =
            "R$ " + preco.toFixed(2).replace(".", ",");
    }

    document.querySelectorAll(".tamanho").forEach(function(elemento) {
        elemento.classList.remove("selecionado");
    });

    document.querySelectorAll(".cor").forEach(function(elemento) {
        elemento.classList.remove("selecionado");
    });

    modal.style.display = "flex";
}


/* =========================
   TAMANHO
========================= */

function selecionarTamanho(tamanho, elemento) {

    tamanhoSelecionado = tamanho;

    document.querySelectorAll(".tamanho").forEach(function(botao) {
        botao.classList.remove("selecionado");
    });

    if (elemento) {
        elemento.classList.add("selecionado");
    }
}


/* =========================
   COR
========================= */

function selecionarCor(cor, elemento) {

    corSelecionada = cor;

    document.querySelectorAll(".cor").forEach(function(botao) {
        botao.classList.remove("selecionado");
    });

    if (elemento) {
        elemento.classList.add("selecionado");
    }
}


/* =========================
   FECHAR PRODUTO
========================= */

function fecharModal() {

    const modal = document.getElementById("modal-produto");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =========================
   CARRINHO
========================= */

function adicionarAoCarrinho() {

    if (!tamanhoSelecionado) {
        alert("Selecione um tamanho.");
        return;
    }

    if (!corSelecionada) {
        alert("Selecione uma cor.");
        return;
    }

    carrinho.push({
        nome: produtoAtual.nome,
        imagem: produtoAtual.imagem,
        preco: produtoAtual.preco,
        tamanho: tamanhoSelecionado,
        cor: corSelecionada
    });

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

    fecharModal();

    alert("Produto adicionado ao carrinho!");
}


function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const total = document.getElementById("total-carrinho");

    if (contador) {
        contador.textContent = carrinho.length;
    }

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach(function(item, index) {

        valorTotal += Number(item.preco);

        const div = document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">

            <div>
                <strong>${item.nome}</strong>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Cor: ${item.cor}</p>
                <p>
                    R$ ${Number(item.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </p>
            </div>

            <button onclick="removerDoCarrinho(${index})">
                Remover
            </button>
        `;

        lista.appendChild(div);
    });

    if (total) {
        total.textContent =
            "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }
}


function removerDoCarrinho(index) {

    carrinho.splice(index, 1);

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();
}


/* =========================
   ABRIR / FECHAR CARRINHO
========================= */

function abrirCarrinho() {

    const modal = document.getElementById("modal-carrinho");

    if (modal) {
        modal.style.display = "flex";
    }

    atualizarCarrinho();
}


function fecharCarrinho() {

    const modal = document.getElementById("modal-carrinho");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =========================
   FINALIZAR COMPRA
========================= */

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    alert("Compra realizada com sucesso!");

    carrinho = [];

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

    fecharCarrinho();
}


/* =========================
   CONTATO
========================= */

function mostrarContato() {
    alert("Entre em contato com a Temp.Roup!");
}


/* =========================
   INICIAR
========================= */

document.addEventListener("DOMContentLoaded", function() {

    carregarLogin();

    atualizarCarrinho();

    const formulario = document.getElementById("form-login");

    if (formulario) {
        formulario.onsubmit = realizarCadastro;
    }

});
