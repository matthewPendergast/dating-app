function LoadHTML(tag, path) {
    let elements = document.getElementsByTagName(tag);
    if (elements.length > 0) {
        fetch(path)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                elements[0].innerHTML = data;
            });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    LoadHTML("header", "./components/header.html");
});