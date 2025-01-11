document.addEventListener("DOMContentLoaded", () => {
    let emailInput = document.getElementById("email");
    emailInput.addEventListener("focus", () => {
        if (!emailInput.value) {
            emailInput.value = "taylor.jordan@example.com";
            emailInput.style.color = "black"
        }
    });
});