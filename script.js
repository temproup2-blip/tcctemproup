/* =====================================================
   TEMP.ROUP
   Sistema de produtos e carrinho
===================================================== */


let carrinho = [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 299.90
};

let tamanhoSelecionado = "";
let corSelecionada = "";


/* =====================================================
   CARREGAR CARRINHO
===================================================== */

function carregarCarrinho() {

    const salvo = localStorage.getItem("tempRoupCarrinho");

    if (salvo) {
        try {
            carrinho = JSON.parse(salvo);
        } catch {
            carrinho = [];
        }
    }

    atualizarCarrinho();
}


/* =====================================================
   SALVAR CARRINHO
===================================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );

}


/* =====================================================
   SELECIONAR PRODUTO
===================================================== */

function selecionarProduto(nome, imagem, preco) {

    produtoAtual = {
        nome: nome,
        imagem: imagem,
        preco: preco
    };

    tamanhoSelecionado = "";
    corSelecionada = "";

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
        "tamanho-escolhido"
    ).textContent = "Nenhum";

    document.getElementById(
        "cor-escolhida"
    ).textContent = "Nenhuma";


    document.querySelectorAll(
        ".opcoes button"
    ).forEach(button => {

        button.classList.remove("selecionado");

    });


    document.getElementById(
        "modal-produto"
    ).classList.add("ativo");

}


/* =====================================================
   FECHAR PRODUTO
===================================================== */

function fecharProduto() {

    document.getElementById(
        "modal-produto"
    ).classList.remove("ativo");

}


/* =====================================================
   TAMANHO
===================================================== */

function selecionarTamanho(botao) {

    document.querySelectorAll(
        ".opcoes button"
    ).forEach(button => {

        if (
            button.parentElement ===
            botao.parentElement
        ) {
            button.classList.remove(
                "selecionado"
            );
        }

    });


    botao.classList.add("selecionado");

    tamanhoSelecionado =
        botao.textContent.trim();

    document.getElementById(
        "tamanho-escolhido"
    ).textContent =
        tamanhoSelecionado;

}


/* =====================================================
   COR
===================================================== */

function selecionarCor(botao) {

    document.querySelectorAll(
        ".opcoes button"
    ).forEach(button => {

        if (
            button.parentElement ===
            botao.parentElement
        ) {
            button.classList.remove(
                "selecionado"
            );
        }

    });


    botao.classList.add("selecionado");

    corSelecionada =
        botao.textContent.trim();

    document.getElementById(
        "cor-escolhida"
    ).textContent =
        corSelecionada;

}


/* =====================================================
   ADICIONAR AO CARRINHO
===================================================== */

function adicionarAoCarrinho() {

    if (!tamanhoSelecionado) {

        alert(
            "Escolha um tamanho antes de adicionar ao carrinho."
        );

        return;
    }


    if (!corSelecionada) {

        alert(
            "Escolha uma cor antes de adicionar ao carrinho."
        );

        return;
    }


    const produto = {

        id: Date.now(),

        nome: produtoAtual.nome,

        imagem: produtoAtual.imagem,

        preco: produtoAtual.preco,

        tamanho: tamanhoSelecionado,

        cor: corSelecionada

    };


    carrinho.push(produto);

    salvarCarrinho();

    atualizarCarrinho();

    fecharProduto();

    alert(
        "Produto adicionado ao carrinho!"
    );

}


/* =====================================================
   ATUALIZAR CONTADOR
===================================================== */

function atualizarCarrinho() {

    const contador =
        document.getElementById(
            "contador-carrinho"
        );


    if (contador) {

        contador.textContent =
            carrinho.length;

    }


    mostrarItensCarrinho();

}


/* =====================================================
   ABRIR CARRINHO
===================================================== */

function abrirCarrinho() {

    mostrarItensCarrinho();

    document.getElementById(
        "modal-carrinho"
    ).classList.add("ativo");

}


/* =====================================================
   FECHAR CARRINHO
===================================================== */

function fecharCarrinho() {

    document.getElementById(
        "modal-carrinho"
    ).classList.remove("ativo");

}


/* =====================================================
   MOSTRAR ITENS
===================================================== */

function mostrarItensCarrinho() {

    const lista =
        document.getElementById(
            "lista-carrinho"
        );

    const totalElemento =
        document.getElementById(
            "total-carrinho"
        );


    if (!lista) return;


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div style="
                text-align:center;
                padding:30px 10px;
                color:#777;
            ">
                Seu carrinho está vazio.
            </div>
        `;

        totalElemento.textContent =
            "R$ 0,00";

        return;
    }


    let total = 0;


    lista.innerHTML = "";


    carrinho.forEach((produto, index) => {

        total += Number(produto.preco);


        const item =
            document.createElement("div");

        item.className =
            "item-carrinho";


        item.innerHTML = `

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

            <div class="item-carrinho-info">

                <h4>
                    ${produto.nome}
                </h4>

                <p>
                    Tamanho:
                    ${produto.tamanho}
                </p>

                <p>
                    Cor:
                    ${produto.cor}
                </p>

                <strong>
                    ${formatarPreco(produto.preco)}
                </strong>

                <br>

                <button
                    class="remover"
                    onclick="removerProduto(${index})"
                >
                    Remover
                </button>

            </div>

        `;


        lista.appendChild(item);

    });


    totalElemento.textContent =
        formatarPreco(total);

}


/* =====================================================
   REMOVER PRODUTO
===================================================== */

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   FINALIZAR COMPRA
===================================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    alert(
        "Pedido preparado! Esta é uma demonstração do projeto Temp.Roup."
    );

}


/* =====================================================
   CONTATO
===================================================== */

function mostrarContato() {

    alert(
        "Entre em contato com a equipe Temp.Roup para conhecer o projeto."
    );

}


/* =====================================================
   MENU MOBILE
===================================================== */

function abrirMenu() {

    const menu =
        document.querySelector(".menu");


    if (!menu) return;


    if (
        menu.style.display === "flex"
    ) {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

        menu.style.position = "absolute";

        menu.style.top = "72px";

        menu.style.left = "0";

        menu.style.right = "0";

        menu.style.background = "#071b72";

        menu.style.padding = "20px";

        menu.style.flexDirection = "column";

    }

}


/* =====================================================
   FORMATAR PREÇO
===================================================== */

function formatarPreco(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================================
   FECHAR MODAL CLICANDO FORA
===================================================== */

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


        if (
            event.target ===
            modalProduto
        ) {
            fecharProduto();
        }


        if (
            event.target ===
            modalCarrinho
        ) {
            fecharCarrinho();
        }

    }
);


/* =====================================================
   INICIAR
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarCarrinho();

    }
);
