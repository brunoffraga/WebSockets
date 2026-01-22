let stompClient = null;
let currentUsername = null;

function conectar() {
    const usuarioInput = document.getElementById("usuario");
    currentUsername = usuarioInput.value.trim();

    if (!currentUsername) {
        alert("Digite seu nome!");
        return;
    }

    // Usa o host atual (localhost ou IP da rede) automaticamente
    const host = window.location.hostname;
    const socket = new SockJS(`http://${host}:8080/ws?user=${encodeURIComponent(currentUsername)}`);
    stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
        document.getElementById("btn-conectar").disabled = true;
        usuarioInput.disabled = true;
        addLog("Conectado ao chat!", "system", null);

        // --- MENSAGENS PÚBLICAS ---
        stompClient.subscribe("/topic/chat", (message) => {
            const data = JSON.parse(message.body);

            if (data.type === 'EDIT') {
                atualizarMensagemNaTela(data.id, data.content);
            } else {
                const type = data.sender === currentUsername ? "sent" : "received";
                addLog(`${data.sender}: ${data.content}`, type, data.id);
            }
        });

        // --- MENSAGENS PRIVADAS ---
        stompClient.subscribe("/user/queue/messages", (message) => {
            // Se o seu backend envia apenas string no privado, tratamos aqui
            addLog("🔒 Privado: " + message.body, "private", null);
        });

    }, (error) => {
        alert("Erro na conexão: " + error);
    });
}

// Gera um ID único para cada mensagem para podermos editá-la depois
function gerarId() {
    return 'msg-' + Math.random().toString(36).substr(2, 9);
}

function sendMensagem() {
    const input = document.getElementById("mensagem");
    const texto = input.value.trim();
    if (!texto || !stompClient) return;

    const payload = {
        id: gerarId(),
        sender: currentUsername,
        content: texto,
        type: 'CHAT'
    };

    stompClient.send("/app/chat", {}, JSON.stringify(payload));
    input.value = "";
}

function enviarPrivado() {
    const to = document.getElementById("to").value.trim();
    const input = document.getElementById("mensagem");
    const texto = input.value.trim();

    if (!to || !texto || !stompClient) {
        alert("Preencha o destinatário e a mensagem!");
        return;
    }

    const payload = {
        to: to,
        content: `[Privado de ${currentUsername}]: ${texto}`
    };

    stompClient.send("/app/privada", {}, JSON.stringify(payload));
    addLog(`🔒 Para ${to}: ${texto}`, "sent private", null);
    input.value = "";
}

function solicitarEdicao(id, textoAntigo) {
    const novoTexto = prompt("Edite sua mensagem:", textoAntigo);
    if (novoTexto && novoTexto.trim() !== "" && novoTexto !== textoAntigo) {
        const payload = {
            id: id,
            sender: currentUsername,
            content: novoTexto,
            type: 'EDIT'
        };
        stompClient.send("/app/chat", {}, JSON.stringify(payload));
    }
}

function atualizarMensagemNaTela(id, novoConteudo) {
    const msgElement = document.getElementById(id);
    if (msgElement) {
        const spanTexto = msgElement.querySelector(".texto-corpo");
        if (spanTexto) {
            spanTexto.textContent = novoConteudo;
            // Adiciona um pequeno indicador de editado
            if (!msgElement.querySelector(".edited-label")) {
                const small = document.createElement("small");
                small.className = "edited-label";
                small.style.fontSize = "0.7em";
                small.style.opacity = "0.6";
                small.textContent = " (editada)";
                msgElement.appendChild(small);
            }
        }
    }
}

function addLog(texto, type, id) {
    const log = document.getElementById("log");
    const li = document.createElement("li");
    if (id) li.id = id;
    li.className = `message ${type}`;

    // Container do texto
    const span = document.createElement("span");
    span.className = "texto-corpo";
    span.textContent = texto;
    li.appendChild(span);

    // Botão de editar (apenas se a mensagem for minha e tiver ID)
    if (type === "sent" && id) {
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "✎";
        btnEdit.style.marginLeft = "10px";
        btnEdit.style.fontSize = "1em"; // Aumentei um pouco para facilitar o clique
        btnEdit.style.background = "none";
        btnEdit.style.border = "none";
        btnEdit.style.cursor = "pointer";
        btnEdit.style.color = "black"; // <--- A COR PRETA AQUI
        btnEdit.style.fontWeight = "bold"; // Deixa o lápis mais visível

        btnEdit.onclick = () => {
            // Pegamos apenas o conteúdo da mensagem, removendo o "Nome: "
            const partes = span.textContent.split(': ');
            const textoMensagem = partes.length > 1 ? partes[1] : partes[0];
            solicitarEdicao(id, textoMensagem);
        };
        li.appendChild(btnEdit);
    }

    log.appendChild(li);
    log.scrollTop = log.scrollHeight;
}

// Atalho: Enviar com Enter
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMensagem();
});