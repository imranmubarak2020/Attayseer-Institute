/* Mobile navigation menu */
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-nav");

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNavigation.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    mainNavigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNavigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
}


/* Attayseer Institute admission form */
const admissionForm = document.querySelector("#admission-form");
const formNotice = document.querySelector("#form-notice");

if (admissionForm && formNotice) {
    admissionForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = admissionForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        formNotice.textContent = "Sending your application...";

        try {
            const response = await fetch(admissionForm.action, {
                method: "POST",
                body: new FormData(admissionForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formNotice.textContent =
                    "Your application has been submitted successfully. " +
                    "Thank you for applying to Attayseer Institute.";

                admissionForm.reset();
            } else {
                formNotice.textContent =
                    "We could not submit your application. " +
                    "Please check your details and try again.";
            }
        } catch (error) {
            formNotice.textContent =
                "A connection error occurred. Please check your internet " +
                "connection and try again.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

