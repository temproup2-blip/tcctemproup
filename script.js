```javascript
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
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("emailCadastro").value.trim();

    const senha =
        document.getElementById("senhaCadastro").value;

    const confirmar =
        document.getElementById("confirmarSenha").value;


    if (!nome || !email || !senha || !confirmar) {

        mostrarMensagem(
            "Preencha todos os campos.",
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


    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);


    mostrarMensagem(
        "Cadastro realizado com sucesso!",
        "green"
    );


    setTimeout(function () {

        mostrarLogin();

    }, 1200);

}


/* =========================
   LOGIN
========================= */

function fazerLogin() {

    const email =
        document.getElementById("emailLogin").value.trim();

    const senha =
        document.getElementById("senhaLogin").value;


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

        document.getElementById("login").style.display = "none";
        document.getElementById("inicio").style.display = "none";
        document.getElementById("cadastro").style.display = "none";

        document.getElementById("site").style.display = "block";


        mostrarMensagem(
            "Login realizado!",
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
   MOSTRAR / OCULTAR SENHA
========================= */

function mostrarSenha(id) {

    const campo =
        document.getElementById(id);


    if (campo.type === "password") {

        campo.type = "text";

    } else {

        campo.type = "password";

    }

}


/* =========================
   MENSAGEM
========================= */

function mostrarMensagem(texto, cor) {

    const mensagem =
        document.getElementById("mensagem");


    mensagem.innerText = texto;

    mensagem.style.backgroundColor = cor;

    mensagem.style.display = "block";


    setTimeout(function () {

        mensagem.style.display = "none";

    }, 2500);

}


/* =========================
   CARRINHO
========================= */

let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];


let tamanhoSelecionado = "";
let corSelecionada = "";


/* ABRIR CARRINHO */

function abrirCarrinho() {

    const carrinhoBox =
        document.getElementById("carrinho-box");

    if (carrinhoBox) {
        carrinhoBox.classList.add("ativo");
    }

}


/* FECHAR CARRINHO */

function fecharCarrinho() {

    const carrinhoBox =
        document.getElementById("carrinho-box");

    if (carrinhoBox) {
        carrinhoBox.classList.remove("ativo");
    }

}


/* SELECIONAR TAMANHO */

function selecionarTamanho(tamanho) {

    tamanhoSelecionado = tamanho;

}


/* SELECIONAR COR */

function selecionarCor(cor) {

    corSelecionada = cor;

}


/* SALVAR CARRINHO */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


/* ADICIONAR PRODUTO */

function adicionarCarrinho() {

    if (tamanhoSelecionado === "") {

        alert("Escolha um tamanho.");

        return;
    }


    if (corSelecionada === "") {

        alert("Escolha uma cor.");

        return;
    }


    const produto = {

        id: Date.now(),

        nome: "Blusa Inteligente Temp.Roup",

        tamanho: tamanhoSelecionado,

        cor: corSelecionada,

        preco: 299.90

    };


    carrinho.push(produto);


    salvarCarrinho();

    atualizarCarrinho();


    alert("Produto adicionado ao carrinho!");

}


/* ATUALIZAR CARRINHO */

function atualizarCarrinho() {

    const area =
        document.getElementById("itens-carrinho");

    const contador =
        document.getElementById("contador");

    const totalElemento =
        document.getElementById("total");


    if (!area || !contador || !totalElemento) {
        return;
    }


    area.innerHTML = "";


    let total = 0;


    carrinho.forEach(function (produto, index) {

        total += produto.preco;


        area.innerHTML += `

            <div class="item">

                <h4>
                    ${produto.nome}
                </h4>

                <p>
                    Tamanho: ${produto.tamanho}
                </p>

                <p>
                    Cor: ${produto.cor}
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

    });


    contador.innerText =
        carrinho.length;


    totalElemento.innerText =
        "Total: R$ " + total.toFixed(2);

}


/* REMOVER ITEM */

function removerItem(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


/* FINALIZAR COMPRA */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Carrinho vazio.");

        return;
    }


    alert("Compra finalizada!");


    carrinho = [];


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   SAIR DA CONTA
========================= */

function sair() {

    document.getElementById("site").style.display = "none";

    document.getElementById("inicio").style.display = "flex";

}


/* =========================
   INICIALIZAÇÃO
========================= */

window.onload = function () {

    atualizarCarrinho();

};
```

**Esse código mantém o carrinho que já existe no seu projeto**, mas muda o sistema de login para funcionar com a nova estrutura da tela inicial, cadastro e login.

Agora me manda o link do **`index.html`** e depois o **`style.css`**. Aí eu atualizo os dois para ficarem **com a tela azul inicial do modelo + cadastro/login + sua loja e carrinho**, sem perder o que você já tem.
