const questions = [
    { question: "What's your first name?", type: "text", name: "fname" },
    { question: "Set a strong password:", type: "password", name: "password" },
    { question: "Confirm your password:", type: "password", name: "confirm-password" },
    { question: "When's your birthday?", type: "date", name: "dob" }
];

let currIndex = 0;
const responses = {};
let chat;

function AddQuestion() {
    if (currIndex >= questions.length) {
        chat.innerHTML += `<div class="bubble left left-tail"><p>Thank you for signing up!</p></div>`;
        return;
    }

    const currentQuestion = questions[currIndex];
    chat.innerHTML += `
        <div class="bubble left left-tail">
            <p>${currentQuestion.question}</p>
        </div>
        <div class="bubble right right-tail">
            <input type="${currentQuestion.type}" name="${currentQuestion.name}" id="${currentQuestion.name}" value="${responses[currentQuestion.name] || ''}">
            <button type="button" class="next-btn">&#x2BAD;</button>
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;
}

function HandleNextClick(event) {
    if (!event.target.classList.contains("next-btn")) return;

    const inputElement = chat.querySelector(`#${questions[currIndex].name}`);
    const value = inputElement.value;

    if (!value.trim()) {
        alert("This field is required.");
        return;
    }

    const name = questions[currIndex].name;
    responses[name] = value;

    const responseBubble = `
        <div class="bubble right right-tail">
            <p>${value}</p>
            <button class="next-btn" style="visibility: hidden;"></button>
        </div>
    `;
    inputElement.parentElement.outerHTML = responseBubble;

    currIndex++;
    AddQuestion();
}

function Initialize() {
    chat = document.getElementsByTagName("main")[0];
    AddQuestion();
    chat.addEventListener("click", HandleNextClick);
}

document.addEventListener("DOMContentLoaded", Initialize);
