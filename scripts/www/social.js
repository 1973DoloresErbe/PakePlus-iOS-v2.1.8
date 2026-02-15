document.addEventListener('DOMContentLoaded', () => {
    const pointsBtn = document.getElementById('points-btn');
    const redeemBtn = document.getElementById('redeem-btn');
    const pointsModal = document.getElementById('points-modal');
    const redeemModal = document.getElementById('redeem-modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    pointsBtn.addEventListener('click', () => {
        pointsModal.style.display = 'block';
    });

    redeemBtn.addEventListener('click', () => {
        redeemModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pointsModal.style.display = 'none';
            redeemModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == pointsModal) {
            pointsModal.style.display = 'none';
        }
        if (event.target == redeemModal) {
            redeemModal.style.display = 'none';
        }
    });
});