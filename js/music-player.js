// O CÓDIGO AGORA ESTÁ FORA DO DOMContentLoaded PARA EXECUTAR MAIS RÁPIDO

// --- ELEMENTOS GLOBAIS DA MÚSICA ---
const backgroundMusic = document.getElementById('background-music');
const musicControlBtn = document.getElementById('music-control-btn');

// Se não houver elementos de música na página, o resto do script não precisa rodar.
if (backgroundMusic && musicControlBtn) {
    const musicControlIcon = musicControlBtn.querySelector('i');

    // --- LÓGICA PRINCIPAL QUE RODA EM TODAS AS PÁGINAS ---
    const handleMusicState = () => {
        const consent = localStorage.getItem('musicConsent');
        const musicTime = parseFloat(localStorage.getItem('musicTime')) || 0;
        const musicIsPaused = localStorage.getItem('musicIsPaused') === 'true';

        if (consent === 'accepted') {
            backgroundMusic.currentTime = musicTime;
            musicControlBtn.hidden = false;

            if (musicIsPaused) {
                musicControlIcon.classList.replace('fa-pause', 'fa-play');
            } else {
                backgroundMusic.play().catch(e => console.log("Reprodução automática impedida."));
                musicControlIcon.classList.replace('fa-play', 'fa-pause');
            }
        }
    };

    // --- LÓGICA DO MODAL (SÓ RODA NA PÁGINA INICIAL) ---
    const musicModal = document.getElementById('music-consent-modal');
    const overlay = document.getElementById('modal-overlay');

    if (musicModal && overlay) {
        const acceptMusicBtn = document.getElementById('accept-music');
        const rejectMusicBtn = document.getElementById('reject-music');

        const closeModal = () => {
            overlay.classList.remove('visible');
            musicModal.classList.remove('visible');
            setTimeout(() => {
                overlay.style.display = 'none';
                musicModal.style.display = 'none';
            }, 300);
        };

        if (!localStorage.getItem('musicConsent')) {
            setTimeout(() => {
                overlay.style.display = 'block';
                musicModal.style.display = 'block';
                setTimeout(() => {
                    overlay.classList.add('visible');
                    musicModal.classList.add('visible');
                }, 50);
            }, 2000);
        }

        acceptMusicBtn.addEventListener('click', () => {
            localStorage.setItem('musicConsent', 'accepted');
            closeModal();
            handleMusicState();
        });

        rejectMusicBtn.addEventListener('click', () => {
            localStorage.setItem('musicConsent', 'rejected');
            closeModal();
        });
    }

    // --- EVENTOS DO BOTÃO DE CONTROLE E SINCRONIZAÇÃO ---
    musicControlBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControlIcon.classList.replace('fa-play', 'fa-pause');
        } else {
            backgroundMusic.pause();
            musicControlIcon.classList.replace('fa-pause', 'fa-play');
        }
        localStorage.setItem('musicIsPaused', backgroundMusic.paused);
    });

    window.addEventListener('beforeunload', () => {
        if (localStorage.getItem('musicConsent') === 'accepted') {
            localStorage.setItem('musicTime', backgroundMusic.currentTime);
            localStorage.setItem('musicIsPaused', backgroundMusic.paused);
        }
    });

    // Inicia a verificação de estado assim que o script é lido
    handleMusicState();
}