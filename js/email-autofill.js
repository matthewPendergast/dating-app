document.addEventListener("DOMContentLoaded", () => {
    let emailInput = document.getElementById("email");
    if (emailInput) {
        emailInput.addEventListener("focus", () => {
            if (!emailInput.value) {
                emailInput.value = "taylor.jordan@example.com";
                emailInput.style.color = "black"
            }
        });
    }
});