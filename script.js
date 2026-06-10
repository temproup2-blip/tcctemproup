/* LOGIN */

function mostrarCadastro(){

    document.getElementById("login").style.display = "none";

    document.getElementById("cadastro").style.display = "block";

}

function mostrarLogin(){

    document.getElementById("cadastro").style.display = "none";

    document.getElementById("login").style.display = "block";

}

function cadastrar(){

    let nome =
    document.getElementById("cadNome").value;

    let email =
    document.getElementById("cadEmail").value;

    let senha =
    document.getElementById("cadSenha").value;

    localStorage.setItem("nome", nome);

    localStorage.setItem("email", email);

    localStorage.setItem("senha", senha);

    mostrarMensagem(
        "Cadastro realizado!",
        "green"
    );

}

function fazerLogin(){

    let email =
    document.getElementById("loginEmail").value;

    let senha =
    document.getElementById("loginSenha").value;

    let emailSalvo =
    localStorage.getItem("email");

    let senhaSalva =
    localStorage.getItem("senha");

    if(
        email === emailSalvo &&
        senha === senhaSalva
    ){

        document.querySelector(".container")
        .style.display = "none";

        document.getElementById("site")
        .style.display = "block";

    }else{

        mostrarMensagem(
            "Email ou senha incorretos",
            "red"
        );

    }

}

function mostrarMensagem(texto, cor){

    let msg =
    document.getElementById("mensagem");

    msg.innerHTML = texto;

    msg.style.color = cor;

}

/* CARRINHO */

let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];

let tamanhoSelecionado = "";
let corSelecionada = "";

function abrirCarrinho(){

    document.getElementById("carrinho-box")
    .classList.add("ativo");

}

function fecharCarrinho(){

    document.getElementById("carrinho-box")
    .classList.remove("ativo");

}

function selecionarTamanho(tamanho){

    tamanhoSelecionado = tamanho;

    alert("Tamanho: " + tamanho);

}

function selecionarCor(cor){

    corSelecionada = cor;

    alert("Cor: " + cor);

}

function salvarCarrinho(){

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

function adicionarCarrinho(){

    if(tamanhoSelecionado === ""){
        alert("Escolha um tamanho");
        return;
    }

    if(corSelecionada === ""){
        alert("Escolha uma cor");
        return;
    }

    const produto = {

        id:Date.now(),

        nome:"Blusa Inteligente Temp.Roup",

        tamanho:tamanhoSelecionado,

        cor:corSelecionada,

        preco:299.90

    };

    carrinho.push(produto);

    salvarCarrinho();

    atualizarCarrinho();

    alert("Produto adicionado!");

}

function atualizarCarrinho(){

    const area =
    document.getElementById("itens-carrinho");

    const contador =
    document.getElementById("contador");

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto,index)=>{

        total += produto.preco;

        area.innerHTML += `

        <div class="item">

        <h4>${produto.nome}</h4>

        <p>Tamanho:
        ${produto.tamanho}</p>

        <p>Cor:
        ${produto.cor}</p>

        <p>R$
        ${produto.preco.toFixed(2)}</p>

        <button onclick="removerItem(${index})">
        Remover
        </button>

        </div>

        `;

    });

    contador.innerText =
    carrinho.length;

    document.getElementById("total")
    .innerText =
    "Total: R$ " + total.toFixed(2);

}

function removerItem(index){

    carrinho.splice(index,1);

    salvarCarrinho();

    atualizarCarrinho();

}

function finalizarCompra(){

    if(carrinho.length === 0){

        alert("Carrinho vazio");
        return;

    }

    alert("Compra finalizada!");

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

}

window.onload = function(){

    atualizarCarrinho();

}
