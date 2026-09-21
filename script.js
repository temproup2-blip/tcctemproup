// ========================================
// TEMP.ROUP - SCRIPT.JS
// ========================================

let carrinho = JSON.parse(localStorage.getItem("tempRoupCarrinho")) || [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 0
};

let tamanhoSelecionado = "";
let corSelecionada = "";


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    carregarLogin();

    atualizarCarrinho();

    const formulario = document.getElementById("form-login");

    if (formulario) {
        formulario.addEventListener("submit", realizarCadastro);
    }

});


// ========================================
// CADASTRO / ENTRAR
// ========================================

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


function realizarCadastro(event) {

    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const mensagem = document.getElementById("mensagem-login");
    const telaLogin = document.getElementById("tela-login");

    if (!nome || !email || !senha) {
        alert("Erro no formulário de cadastro.");
        return;
    }

    const nomeValor = nome.value.trim();
    const emailValor = email.value.trim();
    const senhaValor = senha.value.trim();

    if (nomeValor === "" || emailValor === "" || senhaValor === "") {

        if (mensagem) {
            mensagem.textContent = "Preencha todos os campos.";
        }

        return;
    }

    if (senhaValor.length < 4) {

        if (mensagem) {
            mensagem.textContent =
                "A senha deve ter pelo menos 4 caracteres.";
        }

        return;
    }

    const usuario = {
        nome: nomeValor,
        email: emailValor
    };

    localStorage.setItem(
        "tempRoupUsuario",
        JSON.stringify(usuario)
    );

    if (mensagem) {
        mensagem.textContent =
            "Cadastro realizado com sucesso!";
    }

    setTimeout(function () {

        if (telaLogin) {
            telaLogin.style.display = "none";
        }

    }, 500);

}


// ========================================
// MENU
// ========================================

function toggleMenu() {

    const menu = document.querySelector(".nav-links");

    if (menu) {
        menu.classList.toggle("ativo");
    }

}


// ========================================
// ABRIR PRODUTO
// ========================================

function selecionarProduto(nome, imagem, preco) {

    produtoAtual.nome = nome;
    produtoAtual.imagem = imagem;
    produtoAtual.preco = preco;

    tamanhoSelecionado = "";
    corSelecionada = "";

    const modal = document.getElementById("modal-produto");

    if (!modal) {

        alert("Não foi possível abrir o produto.");

        return;
    }

    const modalNome =
        document.getElementById("modal-nome");

    const modalImagem =
        document.getElementById("modal-imagem");

    const modalPreco =
        document.getElementById("modal-preco");


    if (modalNome) {

        modalNome.textContent = nome;

    }


    if (modalImagem) {

        modalImagem.src = imagem;

        modalImagem.alt = nome;

    }


    if (modalPreco) {

        modalPreco.textContent =
            "R$ " +
            preco.toFixed(2).replace(".", ",");

    }


    // Remove seleção anterior dos tamanhos

    document.querySelectorAll(".tamanho").forEach(function (botao) {

        botao.classList.remove("selecionado");

    });


    // Remove seleção anterior das cores

    document.querySelectorAll(".cor").forEach(function (botao) {

        botao.classList.remove("selecionado");

    });


    modal.style.display = "flex";

}


// ========================================
// SELECIONAR TAMANHO
// ========================================

function selecionarTamanho(tamanho, elemento) {

    tamanhoSelecionado = tamanho;

    document.querySelectorAll(".tamanho").forEach(function (botao) {

        botao.classList.remove("selecionado");

    });


    if (elemento) {

        elemento.classList.add("selecionado");

    }

}


// ========================================
// SELECIONAR COR
// ========================================

function selecionarCor(cor, elemento) {

    corSelecionada = cor;

    document.querySelectorAll(".cor").forEach(function (botao) {

        botao.classList.remove("selecionado");

    });


    if (elemento) {

        elemento.classList.add("selecionado");

    }

}


// ========================================
// FECHAR MODAL DO PRODUTO
// ========================================

function fecharModal() {

    const modal =
        document.getElementById("modal-produto");

    if (modal) {

        modal.style.display = "none";

    }

}


// ========================================
// ADICIONAR AO CARRINHO
// ========================================

function adicionarAoCarrinho() {

    if (!produtoAtual.nome) {

        alert("Selecione um produto.");

        return;

    }


    if (!tamanhoSelecionado) {

        alert("Selecione um tamanho.");

        return;

    }


    if (!corSelecionada) {

        alert("Selecione uma cor.");

        return;

    }


    const produto = {

        nome: produtoAtual.nome,

        imagem: produtoAtual.imagem,

        preco: produtoAtual.preco,

        tamanho: tamanhoSelecionado,

        cor: corSelecionada

    };


    carrinho.push(produto);


    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );


    atualizarCarrinho();


    fecharModal();


    alert("Produto adicionado ao carrinho!");

}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    const contador =
        document.getElementById("contador-carrinho");

    const total =
        document.getElementById("total-carrinho");


    if (contador) {

        contador.textContent = carrinho.length;

    }


    if (!lista) {

        return;

    }


    lista.innerHTML = "";


    let valorTotal = 0;


    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p class='carrinho-vazio'>Seu carrinho está vazio.</p>";

    }


    carrinho.forEach(function (item, index) {

        valorTotal += Number(item.preco);


        const div =
            document.createElement("div");

        div.className = "item-carrinho";


        div.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-carrinho-info">

                <strong>${item.nome}</strong>

                <p>
                    Tamanho: ${item.tamanho}
                </p>

                <p>
                    Cor: ${item.cor}
                </p>

                <strong>
                    R$ ${Number(item.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>

            </div>

            <button
                onclick="removerDoCarrinho(${index})"
            >
                Remover
            </button>

        `;


        lista.appendChild(div);

    });


    if (total) {

        total.textContent =
            "R$ " +
            valorTotal.toFixed(2).replace(".", ",");

    }

}


// ========================================
// REMOVER DO CARRINHO
// ========================================

function removerDoCarrinho(index) {

    carrinho.splice(index, 1);


    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );


    atualizarCarrinho();

}


// ========================================
// ABRIR CARRINHO
// ========================================

function abrirCarrinho() {

    const modal =
        document.getElementById("modal-carrinho");

    if (modal) {

        modal.style.display = "flex";

    }


    atualizarCarrinho();

}


// ========================================
// FECHAR CARRINHO
// ========================================

function fecharCarrinho() {

    const modal =
        document.getElementById("modal-carrinho");

    if (modal) {

        modal.style.display = "none";

    }

}


// ========================================
// FINALIZAR COMPRA
// ========================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }


    alert(
        "Compra realizada com sucesso!\n\n" +
        "Obrigado por comprar na Temp.Roup!"
    );


    carrinho = [];


    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );


    atualizarCarrinho();


    fecharCarrinho();

}


// ========================================
// CONTATO
// ========================================

function mostrarContato() {

    alert(
        "Entre em contato com a Temp.Roup!"
    );

}


// ========================================
// FECHAR MODAIS CLICANDO FORA
// ========================================

window.addEventListener("click", function (event) {

    const modalProduto =
        document.getElementById("modal-produto");

    const modalCarrinho =
        document.getElementById("modal-carrinho");


    if (
        modalProduto &&
        event.target === modalProduto
    ) {

        modalProduto.style.display = "none";

    }


    if (
        modalCarrinho &&
        event.target === modalCarrinho
    ) {

        modalCarrinho.style.display = "none";

    }

});
