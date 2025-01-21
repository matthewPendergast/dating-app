const questions = [
    { output: "What's your first name?", type: "text", name: "fname", autofill: "Taylor" },
    { output: "Set a strong password:", type: "password", name: "password", autofill: "Str0ngP@ssw0rd!" },
    { output: "Confirm your password:", type: "password", name: "confirm-password", autofill: "Str0ngP@ssw0rd!" },
    { output: "When's your birthday?", type: "date", name: "dob", autofill: "2000-01-01" },
];

let chat;
let currIndex = 0;
const responses = {};

// @param (string) input - User input value
// @param (string) name - questions.name
function ValidateUserInput(input, name) {
    const result = { isValid: false, error: null };

    if (name == "fname") {
        if (input.trim() === "") {
            result.error = "First name can't be empty";
        }
    } else if (name === "password") {
        if (input.length < 8) {
            result.error = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(input)) {
            result.error = "Password must include an uppercase letter";
        } else if (!/[a-z]/.test(input)) {
            result.error = "Password must include a lowercase letter";
        } else if (!/[0-9]/.test(input)) {
            result.error = "Password must include a number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input)) {
            result.error = "Password must include a symbol (e.g., !, @, #)";
        }
    } else if (name === "confirm-password") {
        if (input !== responses["password"]) {
            result.error = "Passwords do not match";
        }
    } else if (name === "dob") {
        const dob = new Date(input);
        const today = new Date();
        if (dob > today) {
            result.error = "Birthday can't be in the future";
        }
    }

    if (result.error === null) {
        result.isValid = true;
    }

    return result;
}

// @param (string) error - Error message from ValidateUserInput
function ShowValidationError(error) {
    alert(error);
}

function AddQuestion() {
    if (currIndex >= questions.length) {
        // To Do
        return;
    }

    // Get current question
    const question = questions[currIndex];

    // Setup prompt bubble
    const leftBubble = document.createElement("div");
    leftBubble.className = "bubble bubble--left"
    leftBubble.innerHTML = `<p>${question.output}</p>`;
    chat.appendChild(leftBubble);

    // Setup user input bubble
    const rightBubble = document.createElement("div");
    rightBubble.className = "bubble bubble--right bubble--user";
    let toggleBtn = '';
    if (question.type === "password") {
        toggleBtn = `
            <button id="btn-visibility__icon" class="btn-visibility" type="button" onclick="TogglePasswordVisibility('${question.name}')">
                <i  class="fa-solid fa-eye-slash"></i>
            </button>
        `;
        // Set input text to visible by default
        question.type = "text";
    }
    const input = `<input id="${question.name}" type="${question.type}" name="${question.name}">`;
    const sendBtn = `
        <button class="btn-send" type="button">
            <i class="fa-solid fa-reply"></i>
        </button>
        `;
    rightBubble.innerHTML = toggleBtn + input + sendBtn;

    chat.appendChild(rightBubble);

    // Add listener for autofill
    const element = rightBubble.querySelector(`#${question.name}`);
    element.addEventListener("focus", () => {
        if (!element.value) {
            element.value = question.autofill;
        }
    });
}

function HandleNextClick(event) {
    let button = event.target;
    if (!button.classList.contains("btn-send")) {
        button = event.target.closest(".btn-send");
    }

    if (!button) return;

    const name = questions[currIndex].name
    const inputElement = chat.querySelector(`#${name}`);
    let value = inputElement.value;

    const result = ValidateUserInput(value, name);
    if (!result.isValid) {
        ShowValidationError(result.error);
        return;
    }

    responses[name] = value;

    if (questions[currIndex].name === "password" || questions[currIndex].name === "confirm-password") {
        value = "●".repeat(value.length);
    }

    // Swap out "sent" user message with static bubble
    const newBubble = document.createElement("div");
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