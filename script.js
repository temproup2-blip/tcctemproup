/* =====================================
   TEMP.ROUP
   SISTEMA DO SITE
===================================== */

let carrinho = [];

let produtoAtual = null;

let tamanhoSelecionado = null;

let corSelecionada = null;


/* =====================================
   CARREGAR CARRINHO
===================================== */

function carregarCarrinho() {

    const dados =
        localStorage.getItem("tempRoupCarrinho");

    if (dados) {
        carrinho = JSON.parse(dados);
    }

    atualizarContador();

}


/* =====================================
   SALVAR CARRINHO
===================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

}


/* =====================================
   SELECIONAR PRODUTO
===================================== */

function selecionarProduto(nome, imagem, preco) {

    produtoAtual = {
        nome: nome,
        imagem: imagem,
        preco: preco
    };

    tamanhoSelecionado = null;
    corSelecionada = null;

    document.getElementById(
        "produto-modal-nome"
    ).textContent = nome;

    document.getElementById(
        "produto-modal-imagem"
    ).src = imagem;

    document.getElementById(
        "produto-modal-imagem"
    ).alt = nome;

    document.getElementById(
        "produto-modal-preco"
    ).textContent = formatarPreco(preco);

    document.getElementById(
        "tamanho-escolhido"
    ).textContent = "Nenhum";

    document.getElementById(
        "cor-escolhida"
    ).textContent = "Nenhuma";


    document.querySelectorAll(
        ".opcoes button"
    ).forEach(function(botao) {

        botao.classList.remove("selecionado");

    });


    document.getElementById(
        "modal-produto"
    ).classList.add("ativo");

}


/* =====================================
   FECHAR PRODUTO
===================================== */

function fecharProduto() {

    document.getElementById(
        "modal-produto"
    ).classList.remove("ativo");

}


/* =====================================
   TAMANHO
===================================== */

function selecionarTamanho(botao) {

    document.querySelectorAll(
        ".opcoes button"
    ).forEach(function(item) {

        item.classList.remove("selecionado");

    });

    /*
       Seleciona somente os botões
       da seção de tamanho.
    */

    const botoesTamanho =
        botao.parentElement.querySelectorAll("button");

    botoesTamanho.forEach(function(item) {

        item.classList.remove("selecionado");

    });

    botao.classList.add("selecionado");

    tamanhoSelecionado =
        botao.textContent.trim();

    document.getElementById(
        "tamanho-escolhido"
    ).textContent = tamanhoSelecionado;

}


/* =====================================
   COR
===================================== */

function selecionarCor(botao) {

    const botoesCor =
        botao.parentElement.querySelectorAll("button");

    botoesCor.forEach(function(item) {

        item.classList.remove("selecionado");

    });

    botao.classList.add("selecionado");

    corSelecionada =
        botao.textContent.trim();

    document.getElementById(
        "cor-escolhida"
    ).textContent = corSelecionada;

}


/* =====================================
   ADICIONAR AO CARRINHO
===================================== */

function adicionarAoCarrinho() {

    if (!produtoAtual) {
        return;
    }

    if (!tamanhoSelecionado) {

        alert(
            "Escolha um tamanho antes de adicionar o produto."
        );

        return;
    }

    if (!corSelecionada) {

        alert(
            "Escolha uma cor antes de adicionar o produto."
        );

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

    salvarCarrinho();

    atualizarContador();

    fecharProduto();

    alert(
        "Produto adicionado ao carrinho!"
    );

}


/* =====================================
   ATUALIZAR CONTADOR
===================================== */

function atualizarContador() {

    const contador =
        document.getElementById(
            "contador-carrinho"
        );

    if (!contador) {
        return;
    }

    contador.textContent =
        carrinho.length;

}


/* =====================================
   ABRIR CARRINHO
===================================== */

function abrirCarrinho() {

    document.getElementById(
        "modal-carrinho"
    ).classList.add("ativo");

    mostrarItensCarrinho();

}


/* =====================================
   FECHAR CARRINHO
===================================== */

function fecharCarrinho() {

    document.getElementById(
        "modal-carrinho"
    ).classList.remove("ativo");

}


/* =====================================
   MOSTRAR ITENS
===================================== */

function mostrarItensCarrinho() {

    const lista =
        document.getElementById(
            "lista-carrinho"
        );

    const totalElemento =
        document.getElementById(
            "total-carrinho"
        );


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="carrinho-vazio">
                Seu carrinho está vazio.
            </div>
        `;

        totalElemento.textContent =
            "R$ 0,00";

        return;
    }


    let total = 0;

    lista.innerHTML = "";


    carrinho.forEach(function(item, index) {

        total += item.preco;


        const div =
            document.createElement("div");

        div.className =
            "item-carrinho";


        div.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-carrinho-info">

                <strong>
                    ${item.nome}
                </strong>

                <span>
                    Tamanho: ${item.tamanho}
                </span>

                <span>
                    Cor: ${item.cor}
                </span>

                <span>
                    ${formatarPreco(item.preco)}
                </span>

            </div>

            <button
                class="remover-item"
                onclick="removerProduto(${index})"
            >
                🗑️
            </button>

        `;


        lista.appendChild(div);

    });


    totalElemento.textContent =
        formatarPreco(total);

}


/* =====================================
   REMOVER PRODUTO
===================================== */

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarContador();

    mostrarItensCarrinho();

}


/* =====================================
   FINALIZAR COMPRA
===================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    alert(
        "Compra demonstrativa da Temp.Roup. O sistema de pagamento será integrado posteriormente."
    );

}


/* =====================================
   CONTATO
===================================== */

function mostrarContato() {

    alert(
        "Entre em contato com a equipe Temp.Roup para conhecer o projeto."
    );

}


/* =====================================
   MENU MOBILE
===================================== */

function abrirMenu() {

    const menu =
        document.querySelector(".menu");

    menu.classList.toggle("aberto");

}


/* =====================================
   FORMATAR PREÇO
===================================== */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================
   FECHAR MODAL CLICANDO FORA
===================================== */

window.addEventListener(
    "click",
    function(event) {

        const modalProduto =
            document.getElementById(
                "modal-produto"
            );

        const modalCarrinho =
            document.getElementById(
                "modal-carrinho"
            );


        if (event.target === modalProduto) {

            fecharProduto();

        }


        if (event.target === modalCarrinho) {

            fecharCarrinho();

        }

    }
);


/* =====================================
   INICIAR SITE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarCarrinho();

    }
);
