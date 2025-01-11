document.addEventListener("DOMContentLoaded", () => {
    let email = new URLSearchParams(window.location.search).get("email");
    document.getElementById("email").innerText = decodeURIComponent(email);
});
