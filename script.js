// =====================================================
// TEMP.ROUP - SCRIPT.JS
// =====================================================

let carrinho =
    JSON.parse(localStorage.getItem("tempRoupCarrinho")) || [];

let produtoAtual = {
    nome: "",
    imagem: "",
    preco: 0
};

let tamanhoSelecionado = "";
let corSelecionada = "";


// =====================================================
// INICIAR SITE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    verificarSessao();

    atualizarCarrinho();

});


// =====================================================
// VERIFICAR SESSÃO
// =====================================================

function verificarSessao() {

    const logado =
        localStorage.getItem("tempRoupLogado");

    if (logado === "true") {

        mostrarSite();

    } else {

        mostrarTelaInicial();

    }

}


// =====================================================
// MOSTRAR TELA INICIAL
// =====================================================

function mostrarTelaInicial() {

    esconderTelasAuth();

    const tela =
        document.getElementById("tela-inicial");

    if (tela) {
        tela.style.display = "flex";
    }

}


// =====================================================
// MOSTRAR CADASTRO
// =====================================================

function mostrarCadastro() {

    esconderTelasAuth();

    const tela =
        document.getElementById("cadastro");

    if (tela) {
        tela.style.display = "flex";
    }

}


// =====================================================
// MOSTRAR LOGIN
// =====================================================

function mostrarLogin() {

    esconderTelasAuth();

    const tela =
        document.getElementById("login");

    if (tela) {
        tela.style.display = "flex";
    }

}


// =====================================================
// ESCONDER TELAS DE AUTENTICAÇÃO
// =====================================================

function esconderTelasAuth() {

    const telas = [
        "tela-inicial",
        "cadastro",
        "login"
    ];

    telas.forEach(function (id) {

        const tela =
            document.getElementById(id);

        if (tela) {
            tela.style.display = "none";
        }

    });

}


// =====================================================
// MOSTRAR SITE
// =====================================================

function mostrarSite() {

    esconderTelasAuth();

}


// =====================================================
// CADASTRAR
// =====================================================

function cadastrar(event) {

    event.preventDefault();

    const nome =
        document.getElementById("cadNome").value.trim();

    const email =
        document.getElementById("cadEmail").value.trim();

    const senha =
        document.getElementById("cadSenha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    const termos =
        document.getElementById("aceitarTermos").checked;

    const mensagem =
        document.getElementById("mensagem-cadastro");


    if (!nome || !email || !senha || !confirmarSenha) {

        mensagem.textContent =
            "Preencha todos os campos.";

        return;

    }


    if (senha.length < 4) {

        mensagem.textContent =
            "A senha deve ter pelo menos 4 caracteres.";

        return;

    }


    if (senha !== confirmarSenha) {

        mensagem.textContent =
            "As senhas não são iguais.";

        return;

    }


    if (!termos) {

        mensagem.textContent =
            "Aceite os termos de uso.";

        return;

    }


    const usuario = {

        nome: nome,
        email: email,
        senha: senha

    };


    localStorage.setItem(
        "tempRoupUsuario",
        JSON.stringify(usuario)
    );


    mensagem.textContent =
        "Cadastro realizado com sucesso!";


    setTimeout(function () {

        document.getElementById("loginEmail").value =
            email;

        mostrarLogin();

    }, 700);

}


// =====================================================
// FAZER LOGIN
// =====================================================

function fazerLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const senha =
        document.getElementById("loginSenha").value;

    const mensagem =
        document.getElementById("mensagem-login");

    const usuarioSalvo =
        localStorage.getItem("tempRoupUsuario");


    if (!usuarioSalvo) {

        mensagem.textContent =
            "Nenhuma conta cadastrada. Faça seu cadastro.";

        return;

    }


    const usuario =
        JSON.parse(usuarioSalvo);


    if (
        email !== usuario.email ||
        senha !== usuario.senha
    ) {

        mensagem.textContent =
            "E-mail ou senha incorretos.";

        return;

    }


    localStorage.setItem(
        "tempRoupLogado",
        "true"
    );


    mensagem.textContent =
        "Login realizado com sucesso!";


    setTimeout(function () {

        mostrarSite();

    }, 500);

}


// =====================================================
// MOSTRAR / OCULTAR SENHA
// =====================================================

function mostrarSenha() {

    const senha =
        document.getElementById("loginSenha");

    if (!senha) {
        return;
    }


    if (senha.type === "password") {

        senha.type = "text";

    } else {

        senha.type = "password";

    }

}


// =====================================================
// LOGIN GOOGLE
// =====================================================

function loginGoogle() {

    alert(
        "Login com Google estará disponível em uma próxima versão."
    );

}


// =====================================================
// LOGIN FACEBOOK
// =====================================================

function loginFacebook() {

    alert(
        "Login com Facebook estará disponível em uma próxima versão."
    );

}


// =====================================================
// LOGIN APPLE
// =====================================================

function loginApple() {

    alert(
        "Login com Apple estará disponível em uma próxima versão."
    );

}


// =====================================================
// MENU MOBILE
// =====================================================

function abrirMenu() {

    const menu =
        document.querySelector(".menu");

    if (menu) {

        menu.classList.toggle("ativo");

    }

}


// =====================================================
// VER PRODUTO
// =====================================================

function selecionarProduto(
    nome,
    imagem,
    preco
) {

    produtoAtual = {

        nome: nome,
        imagem: imagem,
        preco: Number(preco)

    };


    tamanhoSelecionado = "";
    corSelecionada = "";


    const modal =
        document.getElementById("modal-produto");


    if (!modal) {

        console.error(
            "Modal do produto não encontrado."
        );

        return;

    }


    const nomeProduto =
        document.getElementById(
            "produto-modal-nome"
        );


    if (nomeProduto) {

        nomeProduto.textContent =
            nome;

    }


    const imagemProduto =
        document.getElementById(
            "produto-modal-imagem"
        );


    if (imagemProduto) {

        imagemProduto.src =
            imagem;

        imagemProduto.alt =
            nome;

    }


    const precoProduto =
        document.getElementById(
            "produto-modal-preco"
        );


    if (precoProduto) {

        precoProduto.textContent =
            "R$ " +
            Number(preco)
                .toFixed(2)
                .replace(".", ",");

    }


    document
        .querySelectorAll(
            "#modal-produto .opcoes button"
        )
        .forEach(function (botao) {

            botao.classList.remove(
                "selecionado"
            );

        });


    const tamanhoTexto =
        document.getElementById(
            "tamanho-escolhido"
        );


    if (tamanhoTexto) {

        tamanhoTexto.textContent =
            "Nenhum";

    }


    const corTexto =
        document.getElementById(
            "cor-escolhida"
        );


    if (corTexto) {

        corTexto.textContent =
            "Nenhuma";

    }


    modal.style.display = "flex";

}


// =====================================================
// FECHAR PRODUTO
// =====================================================

function fecharProduto() {

    const modal =
        document.getElementById(
            "modal-produto"
        );

    if (modal) {

        modal.style.display = "none";

    }

}


// =====================================================
// SELECIONAR TAMANHO
// =====================================================

function selecionarTamanho(elemento) {

    if (!elemento) {
        return;
    }


    tamanhoSelecionado =
        elemento.textContent.trim();


    const botoes =
        document.querySelectorAll(
            "#modal-produto .opcoes button"
        );


    botoes.forEach(function (botao) {

        const texto =
            botao.textContent.trim();


        if (
            texto === "P" ||
            texto === "M" ||
            texto === "G" ||
            texto === "GG"
        ) {

            botao.classList.remove(
                "selecionado"
            );

        }

    });


    elemento.classList.add(
        "selecionado"
    );


    const texto =
        document.getElementById(
            "tamanho-escolhido"
        );


    if (texto) {

        texto.textContent =
            tamanhoSelecionado;

    }

}


// =====================================================
// SELECIONAR COR
// =====================================================

function selecionarCor(elemento) {

    if (!elemento) {
        return;
    }


    corSelecionada =
        elemento.textContent.trim();


    const botoes =
        document.querySelectorAll(
            "#modal-produto .opcoes button"
        );


    botoes.forEach(function (botao) {

        const texto =
            botao.textContent.trim();


        if (
            texto === "Preto" ||
            texto === "Branco" ||
            texto === "Cinza"
        ) {

            botao.classList.remove(
                "selecionado"
            );

        }

    });


    elemento.classList.add(
        "selecionado"
    );


    const texto =
        document.getElementById(
            "cor-escolhida"
        );


    if (texto) {

        texto.textContent =
            corSelecionada;

    }

}


// =====================================================
// ADICIONAR AO CARRINHO
// =====================================================

function adicionarAoCarrinho() {

    if (!tamanhoSelecionado) {

        alert(
            "Selecione um tamanho."
        );

        return;

    }


    if (!corSelecionada) {

        alert(
            "Selecione uma cor."
        );

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

    fecharProduto();


    alert(
        "Produto adicionado ao carrinho!"
    );

}


// =====================================================
// ATUALIZAR CARRINHO
// =====================================================

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "lista-carrinho"
        );


    const contador =
        document.getElementById(
            "contador"
        );


    const contadorAntigo =
        document.getElementById(
            "contador-carrinho"
        );


    const total =
        document.getElementById(
            "total-carrinho"
        );


    if (contador) {

        contador.textContent =
            carrinho.length;

    }


    if (contadorAntigo) {

        contadorAntigo.textContent =
            carrinho.length;

    }


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    let valorTotal = 0;


    if (carrinho.length === 0) {

        lista.innerHTML =
            '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';

    }


    carrinho.forEach(function (
        item,
        index
    ) {

        valorTotal +=
            Number(item.preco);


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
                    R$ ${Number(item.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </span>

            </div>

            <button
                class="remover-item"
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
            valorTotal
                .toFixed(2)
                .replace(".", ",");

    }

}


// =====================================================
// REMOVER DO CARRINHO
// =====================================================

function removerDoCarrinho(index) {

    carrinho.splice(
        index,
        1
    );


    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );


    atualizarCarrinho();

}


// =====================================================
// ABRIR CARRINHO
// =====================================================

function abrirCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }


    atualizarCarrinho();

}


// =====================================================
// FECHAR CARRINHO
// =====================================================

function fecharCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// =====================================================
// FINALIZAR COMPRA
// =====================================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    alert(
        "Compra realizada com sucesso!"
    );


    carrinho = [];


    localStorage.setItem(
        "tempRoupCarrinho",
        JSON.stringify(carrinho)
    );


    atualizarCarrinho();

    fecharCarrinho();

}


// =====================================================
// CONTATO
// =====================================================

function mostrarContato() {

    alert(
        "Entre em contato com a Temp.Roup!"
    );

}


// =====================================================
// FECHAR MODAIS AO CLICAR FORA
// =====================================================

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
            modalProduto &&
            event.target === modalProduto
        ) {

            fecharProduto();

        }


        if (
            modalCarrinho &&
            event.target === modalCarrinho
        ) {

            fecharCarrinho();

        }

    }
);
