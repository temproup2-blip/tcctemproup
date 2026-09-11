/* =========================
   TROCA DE TELAS
========================= */


function mostrarCadastro() {

    document.getElementById("inicio").style.display = "none";

    document.getElementById("login").style.display = "none";

    document.getElementById("site").style.display = "none";

    document.getElementById("cadastro").style.display = "flex";

}


function mostrarLogin() {

    document.getElementById("inicio").style.display = "none";

    document.getElementById("cadastro").style.display = "none";

    document.getElementById("site").style.display = "none";

    document.getElementById("login").style.display = "flex";

}


function mostrarInicio() {

    document.getElementById("cadastro").style.display = "none";

    document.getElementById("login").style.display = "none";

    document.getElementById("site").style.display = "none";

    document.getElementById("inicio").style.display = "flex";

}


/* =========================
   CADASTRO
========================= */


function cadastrar() {

    const nome =
        document.getElementById("cadNome").value.trim();

    const email =
        document.getElementById("cadEmail").value.trim();

    const senha =
        document.getElementById("cadSenha").value;

    const confirmar =
        document.getElementById("confirmarSenha").value;

    const termos =
        document.getElementById("aceitarTermos").checked;


    if (
        !nome ||
        !email ||
        !senha ||
        !confirmar
    ) {

        mostrarMensagem(
            "Preencha todos os campos.",
            "red"
        );

        return;
    }


    if (!termos) {

        mostrarMensagem(
            "Aceite os termos para continuar.",
            "red"
        );

        return;
    }


    if (senha !== confirmar) {

        mostrarMensagem(
            "As senhas não são iguais.",
            "red"
        );

        return;
    }


    localStorage.setItem(
        "nome",
        nome
    );


    localStorage.setItem(
        "email",
        email
    );


    localStorage.setItem(
        "senha",
        senha
    );


    mostrarMensagem(
        "Cadastro realizado com sucesso!",
        "green"
    );


    setTimeout(
        function () {

            mostrarLogin();

        },
        1200
    );

}


/* =========================
   LOGIN
========================= */


function fazerLogin() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const senha =
        document.getElementById("loginSenha").value;


    const emailSalvo =
        localStorage.getItem("email");

    const senhaSalva =
        localStorage.getItem("senha");


    if (!email || !senha) {

        mostrarMensagem(
            "Digite seu e-mail e senha.",
            "red"
        );

        return;
    }


    if (
        email === emailSalvo &&
        senha === senhaSalva
    ) {

        document.getElementById(
            "inicio"
        ).style.display = "none";


        document.getElementById(
            "cadastro"
        ).style.display = "none";


        document.getElementById(
            "login"
        ).style.display = "none";


        document.getElementById(
            "site"
        ).style.display = "block";


        mostrarMensagem(
            "Login realizado com sucesso!",
            "green"
        );

    } else {

        mostrarMensagem(
            "E-mail ou senha incorretos.",
            "red"
        );

    }

}


/* =========================
   MOSTRAR SENHA
========================= */


function mostrarSenha(id) {

    const campo =
        document.getElementById(id);


    if (
        campo.type === "password"
    ) {

        campo.type = "text";

    } else {

        campo.type = "password";

    }

}


/* =========================
   MENSAGEM
========================= */


function mostrarMensagem(
    texto,
    cor
) {

    const mensagem =
        document.getElementById(
            "mensagem"
        );


    mensagem.innerText =
        texto;


    mensagem.style.backgroundColor =
        cor;


    mensagem.style.display =
        "block";


    setTimeout(
        function () {

            mensagem.style.display =
                "none";

        },
        2500
    );

}


/* =========================
   LOGIN SOCIAL
========================= */


function loginGoogle() {

    mostrarMensagem(
        "Login pelo Google em desenvolvimento.",
        "#071b72"
    );

}


function loginFacebook() {

    mostrarMensagem(
        "Login pelo Facebook em desenvolvimento.",
        "#071b72"
    );

}


function loginApple() {

    mostrarMensagem(
        "Login pela Apple em desenvolvimento.",
        "#071b72"
    );

}


/* =========================
   PRODUTO
========================= */


let tamanhoSelecionado = "";

let corSelecionada = "";


function selecionarTamanho(
    tamanho
) {

    tamanhoSelecionado =
        tamanho;


    document.getElementById(
        "tamanhoEscolhido"
    ).innerText =
        tamanho;

}


function selecionarCor(
    cor
) {

    corSelecionada =
        cor;


    document.getElementById(
        "corEscolhida"
    ).innerText =
        cor;

}


/* IR PARA PRODUTO */

function irParaProduto() {

    document.getElementById(
        "produto"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


/* =========================
   CARRINHO
========================= */


let carrinho = JSON.parse(
    localStorage.getItem(
        "carrinho"
    )
) || [];


/* SALVAR CARRINHO */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


/* ABRIR CARRINHO */

function abrirCarrinho() {

    const carrinhoBox =
        document.getElementById(
            "carrinho"
        );


    if (carrinhoBox) {

        carrinhoBox.classList.add(
            "ativo"
        );

    }


    atualizarCarrinho();

}


/* FECHAR CARRINHO */

function fecharCarrinho() {

    const carrinhoBox =
        document.getElementById(
            "carrinho"
        );


    if (carrinhoBox) {

        carrinhoBox.classList.remove(
            "ativo"
        );

    }

}


/* =========================
   ADICIONAR PRODUTO
========================= */


function adicionarCarrinho() {


    if (
        tamanhoSelecionado === ""
    ) {

        mostrarMensagem(
            "Escolha um tamanho.",
            "red"
        );

        return;

    }


    if (
        corSelecionada === ""
    ) {

        mostrarMensagem(
            "Escolha uma cor.",
            "red"
        );

        return;

    }


    const produto = {

        id:
            Date.now(),

        nome:
            "Blusa Inteligente Temp.Roup",

        tamanho:
            tamanhoSelecionado,

        cor:
            corSelecionada,

        preco:
            299.90

    };


    carrinho.push(
        produto
    );


    salvarCarrinho();


    atualizarCarrinho();


    mostrarMensagem(
        "Produto adicionado ao carrinho!",
        "green"
    );

}


/* =========================
   ATUALIZAR CARRINHO
========================= */


function atualizarCarrinho() {

    const area =
        document.getElementById(
            "itens-carrinho"
        );


    const contador =
        document.getElementById(
            "contador"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    if (
        !area ||
        !contador ||
        !totalElemento
    ) {

        return;

    }


    area.innerHTML = "";


    let total = 0;


    if (carrinho.length === 0) {

        area.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;

    }


    carrinho.forEach(
        function(
            produto,
            index
        ) {


            total +=
                produto.preco;


            area.innerHTML += `

                <div class="item">

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

                    <p>
                        R$ ${produto.preco.toFixed(2)}
                    </p>

                    <button
                        onclick="removerItem(${index})">

                        Remover

                    </button>

                </div>

            `;

        }
    );


    contador.innerText =
        carrinho.length;


    totalElemento.innerText =
        "Total: R$ " +
        total.toFixed(2);

}


/* =========================
   REMOVER
========================= */


function removerItem(
    index
) {

    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();


    atualizarCarrinho();


    mostrarMensagem(
        "Produto removido.",
        "#071b72"
    );

}


/* =========================
   FINALIZAR COMPRA
========================= */


function finalizarCompra() {


    if (
        carrinho.length === 0
    ) {

        mostrarMensagem(
            "Carrinho vazio.",
            "red"
        );

        return;

    }


    carrinho = [];


    salvarCarrinho();


    atualizarCarrinho();


    fecharCarrinho();


    mostrarMensagem(
        "Compra finalizada com sucesso!",
        "green"
    );

}


/* =========================
   INICIALIZAÇÃO
========================= */


window.onload = function() {

    atualizarCarrinho();

};
