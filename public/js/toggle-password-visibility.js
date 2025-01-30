// @param (string) id - Element id to toggle
function TogglePasswordVisibility(id) {
    const element = document.getElementById(id);
    const visibilityIcon = document.getElementById("btn-visibility__icon");
    if (element.type === "password") {
        element.type = "text";
        visibilityIcon.innerHTML = "<i class='fa-solid fa-eye-slash'></i>";
    } else {
        element.type = "password";
        visibilityIcon.innerHTML = "<i class='fa-solid fa-eye'></i>";
    }
}