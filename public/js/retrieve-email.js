document.addEventListener("DOMContentLoaded", () => {
    const email = new URLSearchParams(window.location.search).get("email");
    document.getElementById("email").innerText = decodeURIComponent(email);
});
