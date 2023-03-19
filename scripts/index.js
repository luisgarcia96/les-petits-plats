// DOM Elements
const buttons = document.querySelectorAll('.button');

// Add listeners to the buttons
buttons.forEach((btn) => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
    })
});