<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kai - Assistente Pessoal</title>
<link rel="icon" type="image/png" href="https://i.imgur.com/HPsXQqv.png">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
:root {
    --background-color: #F3F6FA; --bot-message-bg: #FFFFFF; --user-message-bg: #2C3E50;
    --text-primary: #2C3E50; --text-light: #FFFFFF; --text-secondary: #8A94A6;
    --border-color: #E0E5EC; --button-outline: #D1D9E6; --shadow-color: rgba(44, 62, 80, 0.1);
    --accent-color: #3498DB;
    --kai-gradient-1: linear-gradient(135deg, #00A3FF, #A162F7, #FF6196);
    --kai-gradient-2: linear-gradient(135deg, #A162F7, #FF6196, #00A3FF);
    --kai-gradient-3: linear-gradient(135deg, #FF6196, #00A3FF, #A162F7);
}
body.dark-mode {
    --background-color: #1A1A1A; --bot-message-bg: #2C2C2C; --user-message-bg: #3498DB;
    --text-primary: #EAEAEA; --text-light: #FFFFFF; --text-secondary: #888888;
    --border-color: #3D3D3D; --button-outline: #4A4A4A; --shadow-color: rgba(0, 0, 0, 0.2);
}
* { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
body { background-color: var(--background-color); min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 10px; transition: background-color 0.3s; }
.container { width: 100%; max-width: 400px; height: 90vh; max-height: 850px; background-color: var(--background-color); border-radius: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; position: relative; border: 8px solid #fff; transition: background-color 0.3s; }

.chat-screen { width: 100%; height: 100%; display: flex; flex-direction: column; background-color: var(--background-color); }
.chat-header { padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
.header-title-group { display: flex; align-items: center; gap: 12px; }
#kai-name-header { font-size: 1.6rem; font-weight: 600; background: var(--kai-gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

.chat-body { flex-grow: 1; position: relative; overflow: hidden; display: flex; flex-direction: column; }
.assistant-ui { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px; transition: opacity 0.5s ease, transform 0.5s ease; }
.assistant-ui.hidden { opacity: 0; transform: scale(0.9); pointer-events: none; }
.greeting-text { font-size: 1.8rem; font-weight: 300; color: var(--text-secondary); }
.greeting-text b { font-weight: 500; color: var(--text-primary); }
.help-text { font-size: 1.1rem; color: var(--text-primary); margin-top: 8px; }

.kai-logo-container { display: flex; align-items: center; margin: 40px 0; }
.kai-logo { width: 120px; height: 120px; border-radius: 50%; background: var(--kai-gradient-1); position: relative; box-shadow: 0 10px 30px rgba(139,92,246,0.3); display: flex; justify-content: center; align-items: center; transition: transform 0.4s ease; }
.kai-logo::before { content: ''; width: 80px; height: 80px; background-color: var(--background-color); border-radius: 50%; }
.kai-logo.thinking { animation: thinking 2s infinite linear; }
@keyframes thinking { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

#kai-name-main { font-size: 3rem; font-weight: 600; margin-left: 15px; background: var(--kai-gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; transition: background 0.5s ease; }

.chat-messages { flex-grow: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; opacity: 0; transition: opacity 0.5s ease; scroll-behavior: smooth; }
.chat-messages.active { opacity: 1; }
.message-group { display: flex; gap: 10px; margin-bottom: 10px; max-width: 90%; align-self: flex-start; align-items: flex-end; animation: fadeIn 0.4s ease-out; }
.message-group.user { align-self: flex-end; }
.bot-avatar { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; overflow: hidden; }
.bot-avatar img { width: 100%; height: 100%; }
.message-bubbles { display: flex; flex-direction: column; gap: 8px; }
.message { padding: 12px 16px; border-radius: 20px; line-height: 1.5; word-wrap: break-word; }
.bot-message { background-color: var(--bot-message-bg); color: var(--text-primary); border-bottom-left-radius: 5px; box-shadow: 0 4px 10px var(--shadow-color); }
.user-message { background-color: var(--user-message-bg); color: var(--text-light); border-bottom-right-radius: 5px; align-self: flex-end; }
.message-timestamp { font-size: 0.75rem; color: var(--text-secondary); opacity: 0.8; margin-top: 6px; text-align: right; }

.quick-reply-area { padding: 10px 20px 0; display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 8px; }
.quick-reply { padding: 8px 16px; border-radius: 20px; border: 1px solid var(--button-outline); color: var(--text-primary); background-color: var(--bot-message-bg); cursor: pointer; transition: all 0.2s; font-size: 0.9rem; }

.chat-input-area { display: flex; align-items: center; padding: 15px; border-top: 1px solid var(--border-color); background-color: var(--background-color); flex-shrink: 0; gap: 10px; }
.input-wrapper { display: flex; align-items: center; flex-grow: 1; border: 1px solid var(--border-color); background-color: var(--bot-message-bg); border-radius: 14px; }
.chat-input { flex-grow: 1; border: none; background: transparent; padding: 14px 16px; font-size: 1rem; color: var(--text-primary); }
.icon-btn { background-color: var(--bot-message-bg); border: 1px solid var(--border-color); width: 48px; height: 48px; border-radius: 14px; font-size: 1.2rem; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }

.modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4); display: none; justify-content: center; align-items: flex-end; z-index: 100; opacity: 0; transition: opacity 0.3s ease; }
.modal-overlay.active { display: flex; opacity: 1; }
.modal-content { background-color: var(--bot-message-bg); color: var(--text-primary); width: 100%; padding: 20px; border-radius: 20px 20px 0 0; transform: translateY(100%); transition: transform 0.3s ease-out; }
.modal-overlay.active .modal-content { transform: translateY(0); }
.menu-list { list-style: none; }
.menu-list a, .menu-list button { display: flex; align-items: center; padding: 15px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); text-decoration: none; font-size: 1rem; background: none; border: none; width: 100%; text-align: left; cursor: pointer; }
.menu-list i { margin-right: 15px; color: var(--text-secondary); width: 20px; }
.switch { position: relative; display: inline-block; width: 44px; height: 24px; margin-left: auto; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px; }
.slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: var(--accent-color); }
input:checked + .slider:before { transform: translateX(20px); }

.toast-notification { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); background-color: #2C3E50; color: #FFFFFF; padding: 12px 20px; border-radius: 10px; font-size: 0.9rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 200; transition: top 0.4s ease-in-out; }
.toast-notification.show { top: 20px; }
</style>
</head>
<body>
<div class="container">

<div class="chat-screen" id="chatScreen">
    <header class="chat-header">
        <div class="header-title-group">
            <h1 id="kai-name-header">Kai</h1>
        </div>
        <div>
            <button type="button" class="icon-btn" id="menuBtn" title="Menu" style="width: 40px; height: 40px;"><i class="fas fa-ellipsis-h"></i></button>
        </div>
    </header>

    <div class="chat-body">
        <div class="assistant-ui" id="assistantUI">
            <p class="greeting-text">Yo! Eu sou o <b id="greetingName">Kai</b>!</p>
            <div class="kai-logo-container">
                <div class="kai-logo" id="kaiLogo"></div>
                <h1 id="kai-name-main">Kai</h1>
            </div>
            <p class="help-text">Bora conversar? Digite algo abaixo.</p>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
    </div>

    <div class="quick-reply-area" id="quickReplyArea"></div>

    <form class="chat-input-area" id="inputArea">
        <div class="input-wrapper">
            <input type="text" class="chat-input" id="userInput" placeholder="Digite sua mensagem...">
        </div>
        <button type="submit" class="icon-btn" id="sendButton"><i class="fas fa-arrow-up"></i></button>
        <button type="button" class="icon-btn" id="micBtn" title="Usar Microfone"><i class="fas fa-microphone"></i></button>
    </form>
</div>

<div class="modal-overlay" id="menuOverlay">
    <div class="modal-content">
        <ul class="menu-list">
            <li><a href="https://naotodev1.github.io/Nova" target="_blank"><i class="fas fa-plus"></i> Nova</a></li>
            <li><a href="https://naotodev1.github.io/terms-e-policy" target="_blank"><i class="fas fa-file-alt"></i> Termos</a></li>
            <li><a href="https://studiotsukiyo.bio.link" target="_blank"><i class="fas fa-layer-group"></i> Studio Tsukiyo Platforms</a></li>
            <li><button id="aboutDevBtn"><i class="fas fa-user"></i> Sobre o Dev: Naoto Dev</button></li>
            <li><button id="aboutKaiBtn"><i class="fas fa-robot"></i> Sobre o Kai</button></li>
            <li><button id="clearChatBtn"><i class="fas fa-trash"></i> Limpar chat</button></li>
        </ul>
    </div>
</div>
<div class="toast-notification" id="toast"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        chatMessages: document.getElementById('chatMessages'),
        quickReplyArea: document.getElementById('quickReplyArea'),
        inputArea: document.getElementById('inputArea'),
        userInput: document.getElementById('userInput'),
        micBtn: document.getElementById('micBtn'),
        menuBtn: document.getElementById('menuBtn'),
        menuOverlay: document.getElementById('menuOverlay'),
        clearChatBtn: document.getElementById('clearChatBtn'),
        assistantUI: document.getElementById('assistantUI'),
        greetingName: document.getElementById('greetingName'),
        kaiLogo: document.getElementById('kaiLogo'),
        kaiNameMain: document.getElementById('kai-name-main'),
        toast: document.getElementById('toast'),
        aboutDevBtn: document.getElementById('aboutDevBtn'),
        aboutKaiBtn: document.getElementById('aboutKaiBtn')
    };

    let isConversationActive = false;
    let speechRecognition;
    let currentGradientIndex = 0;

    const gradients = ['var(--kai-gradient-1)','var(--kai-gradient-2)','var(--kai-gradient-3)'];

    const kaiResponses = [
        "Oi! Como vai você?", "Estou bem, e você?", "Conte-me algo interessante!", "Qual sua cor favorita?",
        "Quer ouvir uma piada?", "Eu adoro aprender coisas novas.", "O que você gosta de fazer?", "Posso te ajudar com alguma coisa?",
        "Fale mais sobre isso.", "Interessante!", "Hahaha, essa foi boa!", "Você já conhece o mundo digital?",
        "Vamos conversar sobre tecnologia?", "Você prefere gatos ou cachorros?", "Gosta de animes?", "Qual seu estilo musical favorito?",
        "Se pudesse viajar, para onde iria?", "Qual seu livro favorito?", "Me conte um segredo!", "Você gosta de desafios?",
        "Qual é o seu sonho?", "O que te inspira?", "Vamos jogar um jogo de palavras?", "Você gosta de café?", "Qual seu emoji favorito?",
        "Prefere praia ou montanha?", "O que te faz sorrir?", "Vamos criar algo juntos?", "Qual seu superpoder secreto?", "Gosta de filmes?",
        "Você tem alguma curiosidade para me contar?", "Se pudesse mudar algo no mundo, o que seria?", "Qual seu momento favorito do dia?",
        "O que te motiva?", "Vamos falar sobre o futuro?", "Você gosta de cores vibrantes?", "Qual seu maior medo?", "Você acredita em sorte?",
        "Prefere manhã ou noite?", "O que te deixa relaxado?", "Tem algum hobby diferente?", "Qual sua comida favorita?", "Se pudesse ser um personagem, quem seria?",
        "Você gosta de música eletrônica?", "Prefere cidades grandes ou pequenas?", "Tem algum talento secreto?", "Vamos aprender algo novo?", "O que te faz feliz?"
    ];

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add('show');
        setTimeout(() => elements.toast.classList.remove('show'), 2500);
    }

    function addMessage(content, type='bot') {
        const messageGroup = document.createElement('div');
        messageGroup.classList.add('message-group');
        if(type==='user') messageGroup.classList.add('user');

        const bubble = document.createElement('div');
        bubble.classList.add('message', type==='bot'?'bot-message':'user-message');
        bubble.textContent = content;

        messageGroup.appendChild(bubble);
        elements.chatMessages.appendChild(messageGroup);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    elements.inputArea.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = elements.userInput.value.trim();
        if(text==='') return;
        addMessage(text,'user');
        elements.userInput.value = '';
        setTimeout(() => addMessage(kaiResponses[Math.floor(Math.random()*kaiResponses.length)]), 800);
        if(!isConversationActive) activateChat();
    });

    function activateChat() {
        isConversationActive = true;
        elements.assistantUI.classList.add('hidden');
        elements.chatMessages.classList.add('active');
    }

    elements.menuBtn.addEventListener('click', ()=>elements.menuOverlay.classList.toggle('active'));
    elements.clearChatBtn.addEventListener('click', ()=>{ elements.chatMessages.innerHTML=''; showToast('Chat limpo!'); });

    elements.aboutDevBtn.addEventListener('click', ()=>alert('Sobre o Dev:\nNaoto Dev\nCriador do Kai e várias obras digitais.'));
    elements.aboutKaiBtn.addEventListener('click', ()=>alert('Sobre o Kai:\nAssistente digital inteligente, pronto para conversar!'));

    elements.micBtn.addEventListener('click', ()=>{
        if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Seu navegador não suporta reconhecimento de voz.');
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        speechRecognition = new SpeechRecognition();
        speechRecognition.lang = 'pt-BR';
        speechRecognition.interimResults = false;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.start();
        speechRecognition.onresult = function(event) {
            const speech = event.results[0][0].transcript;
            elements.userInput.value = speech;
            elements.inputArea.dispatchEvent(new Event('submit'));
        };
        speechRecognition.onerror = function(e) { console.error(e); }
    });

    setInterval(()=> {
        elements.kaiLogo.style.background = gradients[currentGradientIndex];
        elements.kaiNameMain.style.background = gradients[currentGradientIndex];
        currentGradientIndex = (currentGradientIndex+1)%gradients.length;
    },3000);
});
</script>
</body>
</html>
