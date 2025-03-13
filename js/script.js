document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameField = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const messageField = document.getElementById("message");
    const infoMessage = document.getElementById("char-count");
    let form_errors = [];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    emailField.addEventListener("input", function () {
        if (emailRegex.test(emailField.value)) {
            emailField.setCustomValidity(""); // Clear error
            emailError.textContent = "";
        } else {
            emailField.setCustomValidity("Invalid email format. Must be of the form: example@example.com");
            emailError.textContent = "Invalid email format. Must be of the form: example@example.com";
        }
    });



    nameField.addEventListener("input", function (event) {
        let regex = /^[a-zA-Z\s]*$/; // Only allow letters and spaces
        if (!regex.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, ""); // Remove invalid characters
            nameError.textContent = "Only letters and spaces are allowed!";

            setTimeout(() => {
                nameError.textContent = "";
            }, 3000);
        } else if (nameField.value.length >= 2 && nameField.value.length <= 50) {
            nameField.setCustomValidity(""); // Clear error
            nameError.textContent = "";
        } else {
            nameField.setCustomValidity("Name must be between 2 and 50 characters.");
            nameError.textContent = "Name must be between 2 and 50 characters.";
        }
    });


    messageField.addEventListener("input", function () {
        let charCount = messageField.value.length;

        if (charCount < 10 || charCount > 200) {
            messageField.setCustomValidity("Message must be between 10-200 characters.");
            document.getElementById("message-error").textContent = "Message must be between 10-200 characters.";
        } else {
            messageField.setCustomValidity("");
            document.getElementById("message-error").textContent = "";
        }

        // Character counter
        let remaining = messageField.maxLength - charCount;
        infoMessage.textContent = `Characters remaining: ${remaining}`;
        infoMessage.style.color = remaining < 10 ? "red" : "black";
    });

    form.addEventListener("submit", function (event) {
        form_errors = []; // Reset errors before each submit
        document.querySelectorAll(".error-message").forEach(err => err.textContent = "");

        document.querySelectorAll("input, textarea, select").forEach(field => {
            if (!field.checkValidity()) {
                let errorMsg = field.validationMessage;
                form_errors.push({ field: field.name, error: errorMsg });

                let errorElement = document.getElementById(field.name + "-error");
                if (errorElement) {
                    errorElement.textContent = errorMsg;
                }
            }
        });

        if (form_errors.length > 0) {
            console.log("Captured Errors:", form_errors);
            // Convert errors array to a JSON string and update the hidden field
            document.getElementById("form-errors").value = JSON.stringify(form_errors);

        }
    });
});



