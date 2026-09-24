const displayPressao =
document.getElementById("displayPressao");

const loadingSpinner =
document.getElementById("loadingSpinner");

const mensagemErro =
document.getElementById("mensagemErro");

const barraPressao =
document.getElementById("barraPressao");

const statusBadge =
document.getElementById("statusBadge");

const ultimaAtualizacao =
document.getElementById("ultimaAtualizacao");


async function monitorarPressao() {

    try {

        loadingSpinner.classList.remove("d-none");

        mensagemErro.classList.add("d-none");

        displayPressao.style.opacity = "0.5";

        statusBadge.textContent = "SINCRONIZANDO";
        statusBadge.className =
            "badge bg-warning mb-3";

        const resposta =
            await fetch(
                "https://jsonplaceholder.typicode.com/todos/1"
            );

        if (!resposta.ok) {
            throw new Error(
                `Erro ${resposta.status}`
            );
        }

        const dados =
            await resposta.json();

        // Simulação industrial
        let pressao =
            (dados.id * 35) +
            Math.floor(Math.random() * 50);

        atualizarInterface(pressao);

    }
    catch (erro) {

        displayPressao.textContent =
            "OFFLINE";

        displayPressao.className =
            "display-digital offline";

        statusBadge.textContent =
            "OFFLINE";

        statusBadge.className =
            "badge bg-danger mb-3";

        mensagemErro.classList.remove(
            "d-none"
        );

        mensagemErro.textContent =
            "Falha de comunicação com o sensor: "
            + erro.message;
    }
    finally {

        loadingSpinner.classList.add(
            "d-none"
        );

        displayPressao.style.opacity =
            "1";
    }
}


function atualizarInterface(pressao) {

    displayPressao.textContent =
        `${pressao.toFixed(1)} BAR`;

    ultimaAtualizacao.textContent =
        new Date().toLocaleString("pt-BR");

    let porcentagem = pressao;

    if (porcentagem > 100) {
        porcentagem = 100;
    }

    barraPressao.style.width =
        porcentagem + "%";

    barraPressao.textContent =
        porcentagem + "%";

    if (pressao < 60) {

        displayPressao.className =
            "display-digital online";

        barraPressao.className =
            "progress-bar bg-success";

        statusBadge.textContent =
            "NORMAL";

        statusBadge.className =
            "badge bg-success mb-3";
    }

    else if (pressao < 80) {

        displayPressao.className =
            "display-digital alerta";

        barraPressao.className =
            "progress-bar bg-warning";

        statusBadge.textContent =
            "ATENÇÃO";

        statusBadge.className =
            "badge bg-warning mb-3";
    }

    else {

        displayPressao.className =
            "display-digital critico";

        barraPressao.className =
            "progress-bar bg-danger";

        statusBadge.textContent =
            "CRÍTICO";

        statusBadge.className =
            "badge bg-danger mb-3";
    }
}


// Atualização automática a cada 5 segundos
setInterval(() => {
    monitorarPressao();
}, 5000);
