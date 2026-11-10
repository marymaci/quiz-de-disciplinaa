const perguntas = [
    {
        pergunta: "Qual linguagem é usada para estruturar páginas web?",
        opcoes: ["HTML", "CSS", "JavaScript"],
        resposta: 0
    },
    {
        pergunta: "Qual linguagem é usada principalmente para estilizar páginas?",
        opcoes: ["Python", "CSS", "Java"],
        resposta: 1
    },
    {
        pergunta: "Qual linguagem permite criar interações em uma página web?",
        opcoes: ["JavaScript", "HTML", "SQL"],
        resposta: 0
    },
    {
        pergunta: "Qual tag HTML representa o título principal?",
        opcoes: ["<p>", "<h1>", "<img>"],
        resposta: 1
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

function mostrarPergunta() {
    respondeu = false;

    document.getElementById("progresso").innerText =
        "Pergunta " + (indiceAtual + 1) +
        " de " + perguntas.length;

    document.getElementById("pergunta").innerText =
        perguntas[indiceAtual].pergunta;

    document.getElementById("feedback").innerText = "";

    document.getElementById("proxima").disabled = true;

    const area = document.getElementById("opcoes");
    area.innerHTML = "";

    perguntas[indiceAtual].opcoes.forEach(function(opcao, indice) {
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.innerText = opcao;

        botao.addEventListener("click", function() {
            verificarResposta(indice);
        });

        area.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indiceAtual].resposta;
    const feedback = document.getElementById("feedback");

    if (escolha === correta) {
        pontuacao++;

        feedback.innerText = "Correto! Muito bem.";
        feedback.style.color = "green";

    } else {
        feedback.innerText =
            "Não foi dessa vez. A resposta correta é: " +
            perguntas[indiceAtual].opcoes[correta] + ".";

        feedback.style.color = "crimson";
    }

    document.querySelectorAll(".opcao").forEach(botao => {
        botao.disabled = true;
    });

    document.getElementById("proxima").disabled = false;
}

function proximaPergunta() {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.querySelector(".quiz").innerHTML =
        "<h1>Resultado final</h1>" +
        "<p>Você acertou " + pontuacao +
        " de " + perguntas.length + " perguntas!</p>" +
        "<p>" +
        (pontuacao === perguntas.length
            ? "Parabéns! Você acertou todas!"
            : "Continue praticando. Você consegue melhorar!") +
        "</p>" +
        '<button id="reiniciar" onclick="reiniciarQuiz()">Reiniciar quiz</button>';
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;

    document.querySelector(".quiz").innerHTML =
        '<h1>Quiz de Conhecimentos</h1>' +
        '<p id="progresso"></p>' +
        '<p id="pergunta"></p>' +
        '<div id="opcoes"></div>' +
        '<p id="feedback"></p>' +
        '<button id="proxima" onclick="proximaPergunta()" disabled>Próxima pergunta</button>';

    mostrarPergunta();
}

mostrarPergunta();
