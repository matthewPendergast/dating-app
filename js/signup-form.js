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
        const thankYouBubble = document.createElement('div');
        thankYouBubble.className = "bubble chat-bubble left left-tail";
        thankYouBubble.innerHTML = "<p>Thank you for signing up!</p>";
        chat.appendChild(thankYouBubble);

        // Trigger animation
        setTimeout(() => thankYouBubble.classList.add('show'), 10);

        return;
    }

    const currentQuestion = questions[currIndex];

    // Create the question bubble
    const questionBubble = document.createElement('div');
    questionBubble.className = "bubble chat-bubble left left-tail";
    questionBubble.innerHTML = `<p>${currentQuestion.question}</p>`;
    chat.appendChild(questionBubble);

    // Create the input bubble
    const inputBubble = document.createElement('div');
    inputBubble.className = "bubble chat-bubble right right-tail";
    inputBubble.innerHTML = `
        <input type="${currentQuestion.type}" name="${currentQuestion.name}" id="${currentQuestion.name}" value="${responses[currentQuestion.name] || ''}">
        <button type="button" class="next-btn">&#x2BAD;</button>
    `;
    chat.appendChild(inputBubble);

    // Trigger animation
    setTimeout(() => {
        questionBubble.classList.add('show');
        inputBubble.classList.add('show');
    }, 10);

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

    // Replace input bubble with response bubble
    const responseBubble = document.createElement('div');
    responseBubble.className = "bubble chat-bubble right right-tail";
    responseBubble.innerHTML = `<p>${value}</p>`;
    inputElement.parentElement.replaceWith(responseBubble);

    // Trigger animation
    setTimeout(() => responseBubble.classList.add('show'), 10);

    currIndex++;
    AddQuestion();
}

function Initialize() {
    chat = document.getElementsByTagName("main")[0];
    AddQuestion();
    chat.addEventListener("click", HandleNextClick);
}

document.addEventListener("DOMContentLoaded", Initialize);
