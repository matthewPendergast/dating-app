const questions = [
    { output: "What's your first name?", type: "text", name: "fname" },
    { output: "Set a strong password:", type: "password", name: "password" },
    { output: "Confirm your password:", type: "password", name: "confirm-password" },
    { output: "When's your birthday?", type: "date", name: "dob" },
]

let chat;
let currIndex = 0;
let responses = {};

function AddQuestion() {
    if (currIndex >= questions.length) {
        // To Do
        return;
    }

    // Get current question
    let question = questions[currIndex];

    // Setup prompt bubble
    let leftBubble = document.createElement("div");
    leftBubble.className = "bubble bubble--left"
    leftBubble.innerHTML = `<p>${question.output}</p>`;
    chat.appendChild(leftBubble);

    // Setup user input bubble
    let rightBubble = document.createElement("div");
    rightBubble.className = "bubble bubble--right bubble--user";
    let toggleBtn = '';
    if (question.type === "password") {
        toggleBtn = `
            <button id="btn-visibility__icon" class="btn-visibility" type="button" onclick="TogglePasswordVisibility('${question.name}')">
                <i  class="fa-solid fa-eye"></i>
            </button>
        `;
    }
    let input = `<input id="${question.name}" type="${question.type}" name="${question.name}">`;
    let sendBtn = `<button class="btn-send" type="button">&#129033;</button>`;
    rightBubble.innerHTML = toggleBtn + input + sendBtn;

    chat.appendChild(rightBubble);
}

function HandleNextClick(event) {
    if (!event.target.classList.contains("btn-send")) return;

    let name = questions[currIndex].name
    let inputElement = chat.querySelector(`#${name}`);
    let value = inputElement.value;

    responses[name] = value;

    // Swap out "sent" user message with static bubble
    let newBubble = document.createElement("div");
    newBubble.className = "bubble bubble--right";
    newBubble.innerHTML = `<p>${value}</p>`;
    inputElement.parentElement.replaceWith(newBubble);

    currIndex++;
    AddQuestion();
}

function Initialize() {
    chat = document.getElementsByTagName("main")[0];
    AddQuestion();
    chat.addEventListener("click", HandleNextClick);
}

document.addEventListener("DOMContentLoaded", Initialize);