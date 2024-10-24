const ball = document.getElementById('ball');
const dropButton = document.getElementById('dropBall');

function dropBall() {
    ball.style.visibility = 'visible';
    ball.style.transition = 'top 2s, left 2s';
    let randomOffset = Math.random() * 100 - 50;  // Random horizontal movement
    ball.style.top = '400px'; // Move ball to the bottom of the board
    ball.style.left = `calc(50% + ${randomOffset}px)`;
}

// Attach event listener to the button
dropButton.addEventListener('click', () => {
    // Reset ball position
    ball.style.top = '10px';
    ball.style.left = '50%';
    setTimeout(dropBall, 100); // Drop ball after resetting
});
