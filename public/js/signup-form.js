function updateDobRestriction() {
    const dobInput = document.getElementById("dob");

    if (dobInput) {
        const today = new Date();
        const minYear = today.getFullYear() - 18;
        const minDate = new Date(minYear, today.getMonth(), today.getDate());
        const formattedMinDate = minDate.toISOString().split("T")[0];
        dobInput.setAttribute("max", formattedMinDate);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateDobRestriction();
    const form = document.querySelector("form");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-messages");
    form.prepend(errorContainer);

    form.addEventListener("submit", function (event) {
         // Stop form submission if there are errors
        event.preventDefault();
        errorContainer.innerHTML = "";
        let errors = [];

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const firstName = document.getElementById("first_name").value.trim();
        const lastName = document.getElementById("last_name").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;

        // Username Validation
        const usernameRegex = /^[A-Za-z0-9]+$/;
        if (!usernameRegex.test(username)) {
            errors.push("Username can only contain letters and numbers (no spaces or special characters).");
        }
        if (username.length < 3) {
            errors.push("Username must be at least 3 characters long.");
        }

        // Password Validation
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must include at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must include at least one lowercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must include at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must include at least one symbol (e.g., !, @, #, etc.).");
        }

        // First & Last Name Validation
        const nameRegex = /^[A-Za-z]+$/;
        if (firstName && !nameRegex.test(firstName)) {
            errors.push("First name can only contain letters.");
        }
        if (lastName && !nameRegex.test(lastName)) {
            errors.push("Last name can only contain letters.");
        }

        // Date of Birth Validation (Must be at least 18 years old)
        if (dob) {
            const dobDate = new Date(dob);
            const today = new Date();
            const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            if (dobDate > minAgeDate) {
                errors.push("You must be at least 18 years old to sign up.");
            }
        }

        // Gender Validation
        const validGenders = ["male", "female", "other", ""];
        if (!validGenders.includes(gender)) {
            errors.push("Invalid gender selection.");
        }

        // Show Errors if Any Exist
        if (errors.length > 0) {
            errorContainer.innerHTML = `<ul>${errors.map(err => `<li>${err}</li>`).join("")}</ul>`;
        } else {
            form.submit();
        }
    });
});
