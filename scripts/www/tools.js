document.addEventListener('DOMContentLoaded', () => {
    const rechargeBtn = document.getElementById('recharge-btn');
    const pointsBtn = document.getElementById('points-btn');
    const modeSelectBtn = document.getElementById('mode-select-btn');
    const rechargeModal = document.getElementById('recharge-modal');
    const pointsModal = document.getElementById('points-modal');
    const modeSelectModal = document.getElementById('mode-select-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const modeOptionBtns = document.querySelectorAll('.mode-option-btn');

    const userInput = document.getElementById('user-input');

    if (userInput) {
        userInput.addEventListener('focus', () => {
            window.location.href = 'input_details.html';
        });
    }

    rechargeBtn.addEventListener('click', () => {
        rechargeModal.style.display = 'block';
    });

    pointsBtn.addEventListener('click', () => {
        pointsModal.style.display = 'block';
    });

    modeSelectBtn.addEventListener('click', () => {
        modeSelectModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            rechargeModal.style.display = 'none';
            pointsModal.style.display = 'none';
            modeSelectModal.style.display = 'none';
        });
    });

    modeOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedMode = btn.textContent;
            modeSelectBtn.textContent = selectedMode;
            modeSelectModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == rechargeModal) {
            rechargeModal.style.display = 'none';
        }
        if (event.target == pointsModal) {
            pointsModal.style.display = 'none';
        }
        if (event.target == modeSelectModal) {
            modeSelectModal.style.display = 'none';
        }
    });
});