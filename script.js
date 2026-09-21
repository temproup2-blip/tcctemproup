// =====================================================
// TEMP.ROUP - SCRIPT.JS
// =====================================================

// ---------- CONFIGURAÇÕES ----------
// Troque pelo número real (código do país + DDD + número, só dígitos)
const CONTATO_WHATSAPP = "5511999999999";
const CONTATO_MENSAGEM = "Olá! Gostaria de saber mais sobre a Temp.Roup.";

const CHAVE_CARRINHO = "tempRoupCarrinho";
const CHAVE_USUARIO = "tempRoupUsuario";

const TAMANHOS = {
    roupa: ["P", "M", "G", "GG"],
    calcado: ["38", "39", "40", "41", "42", "43"]
};

// ---------- ESTADO ----------
let carrinho = carregarCarrinho();

let produtoAtual = { nome: "", imagem: "", preco: 0, tipo: "roupa" };
let tamanhoSelecionado = "";
let corSelecionada = "";
let toastTimer = null;


// =====================================================
// UTILITÁRIOS
// =====================================================

function formatarPreco(valor) {
    return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}

// Evita que texto vindo do localStorage quebre o HTML
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = String(texto);
    return div.innerHTML;
}

function lerJSON(chave, padrao) {
    try {
        const valor = JSON.parse(localStorage.getItem(chave));
        return valor === null ? padrao : valor;
    } catch (erro) {
        return padrao;
    }
}

function salvarJSON(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
        console.error("Não foi possível salvar em", chave, erro);
    }
}

function carregarCarrinho() {
    const dados = lerJSON(CHAVE_CARRINHO, []);

    if (!Array.isArray(dados)) {
        return [];
    }

    // Garante que itens antigos (sem quantidade) continuem funcionando
    return dados.map(function (item) {
        return Object.assign({}, item, {
            quantidade: Number(item.quantidade) > 0 ? Number(item.quantidade) : 1
        });
    });
}

function salvarCarrinho() {
    salvarJSON(CHAVE_CARRINHO, carrinho);
}

function mostrarAviso(texto) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = texto;
    toast.classList.add("visivel");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("visivel");
    }, 2500);
}

function atualizarScroll() {
    const algumAberto = document.querySelector(".modal.ativo");
    document.body.classList.toggle("sem-scroll", Boolean(algumAberto));
}


// =====================================================
// INICIAR SITE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    carregarLogin();
    atualizarCarrinho();

    // Formulário de cadastro
    const formulario = document.getElementById("form-login");

    if (formulario) {
        formulario.addEventListener("submit", realizarCadastro);
    }

    // Botões "Ver produto" (usa data-attributes, sem parâmetros no onclick)
    document.querySelectorAll(".btn-ver").forEach(function (botao) {
        botao.addEventListener("click", function () {
            selecionarProduto({
                nome: botao.dataset.nome,
                imagem: botao.dataset.imagem,
                preco: botao.dataset.preco,
                tipo: botao.dataset.tipo
            });
        });
    });

    // Botões de cor
    document.querySelectorAll("#opcoes-cor button").forEach(function (botao) {
        botao.addEventListener("click", function () {
            selecionarCor(botao);
        });
    });

    // Fecha o menu mobile ao clicar em um link
    document.querySelectorAll("#menu a").forEach(function (link) {
        link.addEventListener("click", fecharMenu);
    });

});


// =====================================================
// CADASTRO / LOGIN
// (Demonstração: os dados ficam só no navegador.
//  A senha NÃO é armazenada. Um sistema real precisa de back-end.)
// =====================================================

function realizarCadastro(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagem-login");

    if (!nome || !email || !senha) {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    if (senha.length < 4) {
        mensagem.textContent = "A senha deve ter pelo menos 4 caracteres.";
        return;
    }

    salvarJSON(CHAVE_USUARIO, { nome: nome, email: email });

    mensagem.textContent = "Cadastro realizado com sucesso!";

    setTimeout(function () {
        const telaLogin = document.getElementById("tela-login");

        if (telaLogin) {
            telaLogin.style.display = "none";
        }

        document.getElementById("form-login").reset();
        mensagem.textContent = "";

        mostrarAviso("Bem-vindo(a), " + nome.split(" ")[0] + "!");
    }, 500);

}

function carregarLogin() {

    const telaLogin = document.getElementById("tela-login");
    const botaoSair = document.getElementById("btn-sair");

    if (!telaLogin) {
        return;
    }

    const usuario = lerJSON(CHAVE_USUARIO, null);

    telaLogin.style.display = usuario ? "none" : "flex";

    if (botaoSair) {
        botaoSair.style.display = usuario ? "" : "none";
    }

}

function sair() {

    localStorage.removeItem(CHAVE_USUARIO);

    fecharMenu();
    carregarLogin();

}


// =====================================================
// MENU MOBILE
// =====================================================

function abrirMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("ativo");
    }
}

function fecharMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.remove("ativo");
    }
}


// =====================================================
// MODAL DO PRODUTO
// =====================================================

function selecionarProduto(produto) {

    produtoAtual = {
        nome: produto.nome,
        imagem: produto.imagem,
        preco: Number(produto.preco),
        tipo: produto.tipo === "calcado" ? "calcado" : "roupa"
    };

    tamanhoSelecionado = "";
    corSelecionada = "";

    const modal = document.getElementById("modal-produto");

    if (!modal) {
        console.error("Modal do produto não encontrado.");
        return;
    }

    // Nome, imagem e preço
    document.getElementById("produto-modal-nome").textContent = produtoAtual.nome;

    const imagem = document.getElementById("produto-modal-imagem");
    imagem.src = produtoAtual.imagem;
    imagem.alt = produtoAtual.nome;
    imagem.onerror = function () {
        console.error("Imagem não encontrada:", produtoAtual.imagem);
    };

    document.getElementById("produto-modal-preco").textContent =
        formatarPreco(produtoAtual.preco);

    // Cria os botões de tamanho conforme o tipo do produto
    const areaTamanhos = document.getElementById("opcoes-tamanho");
    areaTamanhos.innerHTML = "";

    TAMANHOS[produtoAtual.tipo].forEach(function (tamanho) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = tamanho;
        botao.addEventListener("click", function () {
            selecionarTamanho(botao);
        });
        areaTamanhos.appendChild(botao);
    });

    // Limpa seleções anteriores de cor
    document.querySelectorAll("#opcoes-cor button").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    document.getElementById("tamanho-escolhido").textContent = "Nenhum";
    document.getElementById("cor-escolhida").textContent = "Nenhuma";

    modal.classList.add("ativo");
    atualizarScroll();

}

function fecharProduto() {

    const modal = document.getElementById("modal-produto");

    if (modal) {
        modal.classList.remove("ativo");
    }

    atualizarScroll();

}

function selecionarTamanho(elemento) {

    tamanhoSelecionado = elemento.textContent.trim();

    document.querySelectorAll("#opcoes-tamanho button").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    elemento.classList.add("selecionado");

    document.getElementById("tamanho-escolhido").textContent = tamanhoSelecionado;

}

function selecionarCor(elemento) {

    corSelecionada = elemento.dataset.cor || elemento.textContent.trim();

    document.querySelectorAll("#opcoes-cor button").forEach(function (botao) {
        botao.classList.remove("selecionado");
    });

    elemento.classList.add("selecionado");

    document.getElementById("cor-escolhida").textContent = corSelecionada;

}


// =====================================================
// CARRINHO
// =====================================================

function adicionarAoCarrinho() {

    if (!tamanhoSelecionado) {
        mostrarAviso("Selecione um tamanho.");
        return;
    }

    if (!corSelecionada) {
        mostrarAviso("Selecione uma cor.");
        return;
    }

    // Se o mesmo item (nome + tamanho + cor) já existe, soma a quantidade
    const existente = carrinho.find(function (item) {
        return item.nome === produtoAtual.nome &&
               item.tamanho === tamanhoSelecionado &&
               item.cor === corSelecionada;
    });

    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinho.push({
            nome: produtoAtual.nome,
            imagem: produtoAtual.imagem,
            preco: produtoAtual.preco,
            tamanho: tamanhoSelecionado,
            cor: corSelecionada,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    fecharProduto();

    mostrarAviso("Produto adicionado ao carrinho!");

}

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const total = document.getElementById("total-carrinho");

    let valorTotal = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(function (item) {
        valorTotal += Number(item.preco) * item.quantidade;
        quantidadeTotal += item.quantidade;
    });

    if (contador) {
        contador.textContent = quantidadeTotal;
    }

    if (total) {
        total.textContent = formatarPreco(valorTotal);
    }

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach(function (item, index) {

        const div = document.createElement("div");
        div.className = "item-carrinho";

        div.innerHTML = `
            <img src="${escaparHTML(item.imagem)}" alt="${escaparHTML(item.nome)}">

            <div class="item-carrinho-info">
                <strong>${escaparHTML(item.nome)}</strong>
                <span>Tamanho: ${escaparHTML(item.tamanho)}</span>
                <span>Cor: ${escaparHTML(item.cor)}</span>
                <span>${formatarPreco(item.preco)}</span>

                <div class="qtd-controles">
                    <button type="button" onclick="alterarQuantidade(${index}, -1)" aria-label="Diminuir">−</button>
                    <span>${item.quantidade}</span>
                    <button type="button" onclick="alterarQuantidade(${index}, 1)" aria-label="Aumentar">+</button>
                </div>
            </div>

            <button type="button" class="remover-item" onclick="removerDoCarrinho(${index})">
                Remover
            </button>
        `;

        lista.appendChild(div);

    });

}

function alterarQuantidade(index, variacao) {

    const item = carrinho[index];

    if (!item) {
        return;
    }

    item.quantidade += variacao;

    if (item.quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    atualizarCarrinho();

}

function removerDoCarrinho(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();
    atualizarCarrinho();

}

function abrirCarrinho() {

    const modal = document.getElementById("modal-carrinho");

    atualizarCarrinho();

    if (modal) {
        modal.classList.add("ativo");
    }

    fecharMenu();
    atualizarScroll();

}

function fecharCarrinho() {

    const modal = document.getElementById("modal-carrinho");

    if (modal) {
        modal.classList.remove("ativo");
    }

    atualizarScroll();

}

function finalizarCompra() {

    if (carrinho.length === 0) {
        mostrarAviso("Seu carrinho está vazio.");
        return;
    }

    carrinho = [];

    salvarCarrinho();
    atualizarCarrinho();
    fecharCarrinho();

    mostrarAviso("Compra realizada com sucesso!");

}


// =====================================================
// CONTATO
// =====================================================

function mostrarContato() {

    const url =
        "https://wa.me/" + CONTATO_WHATSAPP +
        "?text=" + encodeURIComponent(CONTATO_MENSAGEM);

    window.open(url, "_blank", "noopener");

}


// =====================================================
// FECHAR MODAIS (clique fora e tecla Esc)
// =====================================================

window.addEventListener("click", function (event) {

    if (event.target === document.getElementById("modal-produto")) {
        fecharProduto();
    }

    if (event.target === document.getElementById("modal-carrinho")) {
        fecharCarrinho();
    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        fecharProduto();
        fecharCarrinho();
        fecharMenu();
    }

});
