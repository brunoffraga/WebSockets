# 🏛️ Sistema de Chat em Tempo Real (WebSocket STOMP)

- Um sistema de comunicação instantânea bidirecional desenvolvido com Spring Boot, permitindo a troca de mensagens públicas, privadas e a funcionalidade de edição de mensagens em tempo real.

🎯 **Foco do projeto:**

- Demonstrar a implementação de mensagens síncronas e assíncronas utilizando o protocolo STOMP, garantindo transparência, organização e agilidade na comunicação interna.

🧩 **Tecnologias:**

- **Java 17+**
- **Spring Boot 3.x**
    - Spring WebSocket (Messaging Broker)
    - Spring Web
- **Frontend Interativo:**
    - HTML5 e CSS3 (UI moderna com interface responsiva)
    - JavaScript Vanilla (Lógica de conexão e manipulação de DOM)
- **Protocolos & Bibliotecas Client:**
    - **STOMP:** Protocolo orientado a texto para gerenciamento de tópicos e filas.
    - **SockJS:** Fallback para garantir conectividade em navegadores antigos.
    - **StompJS:** Cliente para interação com o Message Broker do Spring.

⚙️ **Pré-requisitos:**

- **Java JDK 17** ou superior instalado.
- **Maven** configurado para gerenciamento de dependências.

🚀 **Executando o Projeto:**

1.  **Clonagem do Repositório:**
    ```bash
    git clone [https://github.com/brunoffraga/WebSockets.git](https://github.com/brunoffraga/WebSockets.git)
    cd WebSockets
    ```
2.  **Configuração Automática de IP:**
    - O projeto utiliza `window.location.hostname` no `chat.js`, o que permite rodar o servidor em sua máquina e acessar de outros dispositivos (celular/tablet) na mesma rede sem alterar o código.
3.  **Rodar a Aplicação:**
    - Execute o comando no terminal:
    ```bash
    mvn spring-boot:run
    ```
4.  **Acesso ao Sistema:**
    - Acesse localmente: `http://localhost:8080`
    - Acesse na rede: `http://SEU_IP_LOCAL:8080`

💬 **Funcionalidades do Chat:**

- **Entrada:** Sistema de Handshake customizado que identifica o usuário pelo apelido.
- **Mensagens Públicas:** Canal geral para todos os usuários conectados (`/topic/chat`).
- **Mensagens Privadas:** Envio direcionado. Preencha o campo "Para quem?" e utilize o botão 🔒.
- **Edição em Tempo Real:** Clique no ícone do lápis ✎ em suas mensagens para corrigir o conteúdo instantaneamente para todos os usuários.

📜 **Licença:**

- Este projeto está sob a licença **MIT**.
- Sinta-se à vontade para usar, estudar e modificar.

👨‍💻 **Autor:**

- **Bruno Fraga**
