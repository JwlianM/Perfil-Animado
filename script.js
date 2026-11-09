// CONFIGURAÇÃO DOS TEXTOS
const nomeParaDigitar = "Jott4 rei delaxs";
const textoParaDigitar = "Tudo posso naquelE que me fortalece!";
const novaMensagemParaDigitar = "Filipenses 4:13";
const titulosDaAba = ["Jott4"]; // As mensagens que vão ficar alternando

let tituloIndex = 0;
let bioIndex = 0;
let novaMsgIndex = 0;
let abaIndex = 0;         // Qual palavra da lista está ativa agora
let caractereIndex = 0;   // Quantas letras já foram digitadas/apagadas
let estaApagando = false; // Controla se o script deve digitar ou apagar no momento

// ELEMENTOS HTML
const entrance = document.getElementById("entrance");
const profile = document.getElementById("profile");
const tituloElemento = document.getElementById("titulo");
const bioElemento = document.getElementById("bio");
const novaMsgElemento = document.getElementById("nova-mensagem");

const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const volumeSlider = document.getElementById("volume-slider");
const volumeValue = document.getElementById("volume-value");

// CONFIGURAÇÃO INICIAL DE ÁUDIO
music.volume = 0.30;

// FUNÇÃO 1: DIGITA O NOME
function digitarTitulo() {
    tituloElemento.classList.add('piscar');
    if (tituloIndex < nomeParaDigitar.length) {
        tituloElemento.textContent += nomeParaDigitar.charAt(tituloIndex);
        tituloIndex++;
        setTimeout(digitarTitulo, 150);
    } else {
        tituloElemento.classList.remove('piscar');
        tituloElemento.classList.add('sem-cursor');
        
        bioElemento.classList.add('digitando');
        bioElemento.classList.add('piscar');
        setTimeout(digitarBio, 500); // Pausa antes de começar a Bio
    }
}

// FUNÇÃO 2: DIGITA A BIO
function digitarBio() {
    if (bioIndex < textoParaDigitar.length) {
        bioElemento.textContent += textoParaDigitar.charAt(bioIndex);
        bioIndex++;
        setTimeout(digitarBio, 120);
    } else {
        // CORREÇÃO/MUDANÇA: Quando a bio termina, remove o cursor dela e ativa o da próxima mensagem
        bioElemento.classList.remove('piscar');
        bioElemento.style.borderRightColor = 'transparent';
        
        novaMsgElemento.classList.add('digitando');
        novaMsgElemento.classList.add('piscar');
        setTimeout(digitarNovaMensagem, 500); // Pausa de meio segundo antes da nova mensagem
    }
}

// FUNÇÃO 3: DIGITA A NOVA MENSAGEM
function digitarNovaMensagem() {
    if (novaMsgIndex < novaMensagemParaDigitar.length) {
        novaMsgElemento.textContent += novaMensagemParaDigitar.charAt(novaMsgIndex);
        novaMsgIndex++;
        setTimeout(digitarNovaMensagem, 100); // Velocidade da terceira digitação (100ms)
    } else {
        // Opcional: Descomente a linha abaixo se quiser sumir com o cursor quando tudo acabar
        // novaMsgElemento.style.borderRightColor = 'transparent';
    }
}

function animarTituloDaAba() {
    const palavraAtual = titulosDaAba[abaIndex];
    let tempoDoProximoPasso = 170; // Velocidade padrão de digitação (150ms)

    if (!estaApagando) {
        // MODO DIGITANDO: Pega o pedaço da palavra do início até a letra atual
        document.title = palavraAtual.substring(0, caractereIndex + 1);
        caractereIndex++;

        // Se terminou de digitar a palavra inteira
        if (caractereIndex === palavraAtual.length) {
            estaApagando = true;
            tempoDoProximoPasso = 1500; // Pausa de 1 segundo para o usuário ler
        }
    } else {
        // MODO APAGANDO: Pega o pedaço da palavra tirando as últimas letras
        document.title = palavraAtual.substring(0, caractereIndex - 1);
        caractereIndex--;

        // Se a palavra foi totalmente apagada
        if (caractereIndex === 0) {
            estaApagando = false;
            // Passa para a próxima palavra da nossa lista (se chegar no fim, volta para a primeira)
            abaIndex = (abaIndex + 1) % titulosDaAba.length;
            tempoDoProximoPasso = 170; // Pausa de meio segundo antes de começar a próxima
        }
    }

    // O "relógio" que chama essa mesma função repetidamente após o tempo calculado
    setTimeout(animarTituloDaAba, tempoDoProximoPasso);
}
// Inicia o efeito assim que a página carrega
animarTituloDaAba();

// EVENTO DE CLIQUE NA TELA DE ENTRADA
entrance.addEventListener("click", async () => {
    entrance.style.opacity = "0";
    
    setTimeout(() => {
        entrance.style.display = "none";
        
        // Ativa o card do perfil
        profile.classList.add("active");
        
        // CORREÇÃO: Ativa o controle de volume apenas NESTE exato momento
        const musicControl = document.querySelector(".music-control");
        if (musicControl) {
            musicControl.classList.add("active");
        }
        
        digitarTitulo();
    }, 800);

    try {
        await music.play();
    } catch (error) {
        console.log("Áudio bloqueado ou não encontrado:", error);
    }
});


// CONTROLE DO SLIDER DE VOLUME
volumeSlider.addEventListener("input", () => {
    const volume = Number(volumeSlider.value);
    music.volume = volume / 100;
    volumeValue.textContent = volume + "%";
});
