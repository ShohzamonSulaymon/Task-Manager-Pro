document.addEventListener("DOMContentLoaded", () => {
    const planets = document.querySelectorAll(".planet");
    const toggleButton = document.getElementById("toggle");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("closeModal");
    let isRunning = true;

    toggleButton.addEventListener("click", () => {
        isRunning = !isRunning;
        planets.forEach(planet => planet.style.animationPlayState = isRunning ? "running" : "paused");
        toggleButton.textContent = isRunning ? "Stop" : "Start";
    });

    planets.forEach(planet => {
        planet.addEventListener("click", () => {
            modal.style.display = "flex";
            modalText.textContent = planet.dataset.info;
        });
        planet.addEventListener("mouseover", () => planet.style.animationPlayState = "paused");
        planet.addEventListener("mouseout", () => planet.style.animationPlayState = isRunning ? "running" : "paused");
    });

    closeModal.addEventListener("click", () => modal.style.display = "none");
});
