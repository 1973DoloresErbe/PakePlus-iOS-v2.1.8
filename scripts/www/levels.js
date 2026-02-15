document.addEventListener('DOMContentLoaded', function() {
    const playOthersBtn = document.getElementById('play-others-btn');
    const levelListModal = document.getElementById('level-list-modal');
    const closeBtn = levelListModal.querySelector('.close-btn');

    playOthersBtn.addEventListener('click', function() {
        levelListModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        levelListModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == levelListModal) {
            levelListModal.style.display = 'none';
        }
    });
});