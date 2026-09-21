// =====================================================
// TELA INICIAL / CADASTRO / LOGIN
// =====================================================

function esconderTelasLogin() {

    const inicio = document.getElementById("inicio");
    const cadastro = document.getElementById("cadastro");
    const login = document.getElementById("login");

    if (inicio) {
        inicio.style.display = "none";
    }

    if (cadastro) {
        cadastro.style.display = "none";
    }

    if (login) {
        login.style.display = "none";
    }

}


// =====================================================
// MOSTRAR INÍCIO
// =====================================================

function mostrarInicio() {

    esconderTelasLogin();

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "flex";
    }

}


// =====================================================
// MOSTRAR CADASTRO
// =====================================================

function mostrarCadastro() {

    esconderTelasLogin();

    const cadastro = document.getElementById("cadastro");

    if (cadastro) {
        cadastro.style.display = "flex";
    }

}


// =====================================================
// MOSTRAR LOGIN
// =====================================================

function mostrarLogin() {

    esconderTelasLogin();

    const login = document.getElementById("login");

    if (login) {
        login.style.display = "flex";
    }

}


// =====================================================
// MOSTRAR / OCULTAR SENHA
// =====================================================

function mostrarSenha(id) {

    const campo = document.getElementById(id);

    if (!campo) {
        return;
    }

    if (campo.type === "password") {

        campo.type = "text";

    } else {

        campo.type = "password";

    }

}


// =====================================================
// CADASTRAR
// =====================================================

function cadastrar() {

    const nome = document.getElementById("cadNome").value.trim();
    const email = document.getElementById("cadEmail").value.trim();
    const senha = document.getElementById("cadSenha").value;
    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    const termos =
        document.getElementById("aceitarTermos").checked;


    if (!nome || !email || !senha || !confirmarSenha) {

        alert("Preencha todos os campos.");

        return;

    }


    if (senha.length < 4) {

        alert(
            "A senha deve ter pelo menos 4 caracteres."
        );

        return;

    }


    if (senha !== confirmarSenha) {

        alert("As senhas não são iguais.");

        return;

    }


    if (!termos) {

        alert(
            "Você precisa aceitar os Termos de Uso e a Política de Privacidade."
        );

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


    alert(
        "Cadastro realizado com sucesso!"
    );


    document.getElementById("loginEmail").value = email;

    document.getElementById("loginSenha").value = senha;

    mostrarLogin();

}


// =====================================================
// FAZER LOGIN
// =====================================================

function fazerLogin() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const senha =
        document.getElementById("loginSenha").value;


    if (!email || !senha) {

        alert(
            "Digite seu e-mail e sua senha."
        );

        return;

    }


    const dadosUsuario =
        localStorage.getItem("tempRoupUsuario");


    if (!dadosUsuario) {

        alert(
            "Nenhuma conta cadastrada. Cadastre-se primeiro."
        );

        mostrarCadastro();

        return;

    }


    const usuario =
        JSON.parse(dadosUsuario);


    if (
        email !== usuario.email ||
        senha !== usuario.senha
    ) {

        alert(
            "E-mail ou senha incorretos."
        );

        return;

    }


    localStorage.setItem(
        "tempRoupLogado",
        "true"
    );


    alert(
        "Login realizado com sucesso!"
    );


    mostrarSite();

}


// =====================================================
// MOSTRAR SITE
// =====================================================

function mostrarSite() {

    const inicio = document.getElementById("inicio");
    const cadastro = document.getElementById("cadastro");
    const login = document.getElementById("login");

    if (inicio) {
        inicio.style.display = "none";
    }

    if (cadastro) {
        cadastro.style.display = "none";
    }

    if (login) {
        login.style.display = "none";
    }

}


// =====================================================
// LOGIN GOOGLE
// =====================================================

function loginGoogle() {

    alert(
        "Login com Google estará disponível em breve."
    );

}


// =====================================================
// LOGIN FACEBOOK
// =====================================================

function loginFacebook() {

    alert(
        "Login com Facebook estará disponível em breve."
    );

}


// =====================================================
// LOGIN APPLE
// =====================================================

function loginApple() {

    alert(
        "Login com Apple estará disponível em breve."
    );

}


// =====================================================
// CONTADOR DO CARRINHO
// =====================================================

function atualizarContadorCarrinho() {

    const contador =
        document.getElementById("contador");

    const contadorAntigo =
        document.getElementById("contador-carrinho");


    if (contador) {

        contador.textContent =
            carrinho.length;

    }


    if (contadorAntigo) {

        contadorAntigo.textContent =
            carrinho.length;

    }

}
