document.addEventListener('DOMContentLoaded', () => {
    const confirmBtn = document.getElementById('confirm-btn');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
});