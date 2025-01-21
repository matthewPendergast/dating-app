function LoadHTML(tag, path) {
    const elements = document.getElementsByTagName(tag);
    if (elements.length > 0) {
        fetch(path)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                elements[0].innerHTML += data;
            });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    LoadHTML("header", "./components/header.html");
    LoadHTML("footer", "./components/footer.html");
});