/* =====================================================
   TEMP.ROUP - SCRIPT
===================================================== */


/* =====================================================
   VARIÁVEIS
===================================================== */

let carrinho = JSON.parse(
    localStorage.getItem("tempRoupCarrinho")
) || [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 0
};

let tamanhoSelecionado = "";
let corSelecionada = "";


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    carregarLogin();

    atualizarCarrinho();

    const formLogin = document.getElementById("form-login");

    if (formLogin) {

        formLogin.addEventListener(
            "submit",
            realizarCadastro
        );

    }

});


/* =====================================================
   CADASTRO / ENTRAR
===================================================== */

function carregarLogin() {

    const telaLogin =
        document.getElementById("tela-login");

    if (!telaLogin) {
        return;
    }

    const usuario =
        localStorage.getItem("tempRoupUsuario");

    if (usuario) {

        telaLogin.style.display = "none";

    } else {

        telaLogin.style.display = "flex";

    }

}


function realizarCadastro(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value.trim();

    const mensagem =
        document.getElementById("mensagem-login");


    if (!nome || !email || !senha) {

        mensagem.textContent =
            "Preencha todos os campos.";

        return;

    }


    if (senha.length < 4) {

        mensagem.textContent =
            "A senha deve ter pelo menos 4 caracteres.";

        return;

    }


    /*
       Para este protótipo, não armazenamos a senha.
       Guardamos somente nome e e-mail.
    */

    const usuario = {
        nome: nome,
        email: email
    };


    localStorage.setItem(
        "tempRoupUsuario",
        JSON.stringify(usuario)
    );


    mensagem.textContent =
        "Cadastro realizado! Entrando...";


    setTimeout(function () {

        document.getElementById(
            "tela-login"
        ).style.display = "none";

    }, 700);

}


/* =====================================================
   MENU MOBILE
===================================================== */

function abrirMenu() {

    const menu =
        document.querySelector(".menu");

    if (menu) {

        menu.classList.toggle("ativo");

    }

}


/* =====================================================
   PRODUTO
===================================================== */

function selecionarProduto(
    nome,
    imagem,
    preco
) {

    produtoAtual = {
        nome: nome,
        imagem: imagem,
        preco: preco
    };


    tamanhoSelecionado = "";
    corSelecionada = "";


    const modal =
        document.getElementById("modal-produto");


    const imagemModal =
        document.getElementById(
            "produto-modal-imagem"
        );

    const nomeModal =
        document.getElementById(
            "produto-modal-nome"
        );

    const precoModal =
        document.getElementById(
            "produto-modal-preco"
        );


    imagemModal.src = imagem;

    imagemModal.alt = nome;

    nomeModal.textContent = nome;

    precoModal.textContent =
        formatarPreco(preco);


    document.getElementById(
        "tamanho-escolhido"
    ).textContent = "Nenhum";


    document.getElementById(
        "cor-escolhida"
    ).textContent = "Nenhuma";


    limparSelecoes();


    modal.classList.add("ativo");

}


function limparSelecoes() {

    const botoes =
        document.querySelectorAll(
            "#modal-produto .opcoes button"
        );

    botoes.forEach(function (botao) {

        botao.classList.remove(
            "selecionado"
        );

    });

}


/* =====================================================
   TAMANHO
===================================================== */

function selecionarTamanho(botao) {

    const botoes =
        botao.parentElement.querySelectorAll(
            "button"
        );


    botoes.forEach(function (item) {

        item.classList.remove(
            "selecionado"
        );

    });


    botao.classList.add(
        "selecionado"
    );


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

    const botoes =
        botao.parentElement.querySelectorAll(
            "button"
        );


    botoes.forEach(function (item) {

        item.classList.remove(
            "selecionado"
        );

    });


    botao.classList.add(
        "selecionado"
    );


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


    const item = {

        nome: produtoAtual.nome,

        imagem: produtoAtual.imagem,

        preco: produtoAtual.preco,

        tamanho: tamanhoSelecionado,

        cor: corSelecionada

    };


    carrinho.push(item);


    salvarCarrinho();

    atualizarCarrinho();

    fecharProduto();


    alert(
        "Produto adicionado ao carrinho!"
    );

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
   ATUALIZAR CARRINHO
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
   MOSTRAR ITENS
===================================================== */

function mostrarItensCarrinho() {

    const lista =
        document.getElementById(
            "lista-carrinho"
        );


    if (!lista) {
        return;
    }


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="carrinho-vazio">
                Seu carrinho está vazio.
            </div>
        `;

        atualizarTotal();

        return;

    }


    lista.innerHTML = "";


    carrinho.forEach(
        function (item, indice) {

            const elemento =
                document.createElement("div");


            elemento.className =
                "item-carrinho";


            elemento.innerHTML = `

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
                    onclick="removerDoCarrinho(${indice})"
                >
                    Remover
                </button>

            `;


            lista.appendChild(elemento);

        }
    );


    atualizarTotal();

}


/* =====================================================
   REMOVER DO CARRINHO
===================================================== */

function removerDoCarrinho(indice) {

    carrinho.splice(
        indice,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   TOTAL
===================================================== */

function atualizarTotal() {

    const total =
        carrinho.reduce(
            function (soma, item) {

                return soma + Number(item.preco);

            },
            0
        );


    const elemento =
        document.getElementById(
            "total-carrinho"
        );


    if (elemento) {

        elemento.textContent =
            formatarPreco(total);

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
   ABRIR CARRINHO
===================================================== */

function abrirCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    mostrarItensCarrinho();


    modal.classList.add(
        "ativo"
    );

}


/* =====================================================
   FECHAR CARRINHO
===================================================== */

function fecharCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    modal.classList.remove(
        "ativo"
    );

}


/* =====================================================
   FECHAR PRODUTO
===================================================== */

function fecharProduto() {

    const modal =
        document.getElementById(
            "modal-produto"
        );


    modal.classList.remove(
        "ativo"
    );

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
        "Compra demonstrativa da Temp.Roup. Obrigado!"
    );

}


/* =====================================================
   CONTATO
===================================================== */

function mostrarContato() {

    alert(
        "Entre em contato com a equipe Temp.Roup para conhecer mais sobre o projeto."
    );

}


/* =====================================================
   FECHAR MODAIS CLICANDO FORA
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        const modalProduto =
            document.getElementById(
                "modal-produto"
            );

        const modalCarrinho =
            document.getElementById(
                "modal-carrinho"
            );


        if (
            event.target === modalProduto
        ) {

            fecharProduto();

        }


        if (
            event.target === modalCarrinho
        ) {

            fecharCarrinho();

        }

    }
);
