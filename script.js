document.addEventListener("DOMContentLoaded", () => {
    
    // ---------------------------------------------
    // A. RESPONSIVE NAVIGATION MENU
    // ---------------------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // ---------------------------------------------
    // B. DYNAMIC THEME TOGGLE (Global Feature)
    // ---------------------------------------------
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                document.body.classList.replace("dark-theme", "light-theme");
                themeToggleBtn.innerText = "Dark Theme";
            } else {
                document.body.classList.replace("light-theme", "dark-theme");
                themeToggleBtn.innerText = "Switch Theme";
            }
        });
    }

    // ---------------------------------------------
    // C. FORM VALIDATION (CONTACT PAGE VALIDATION)
    // ---------------------------------------------
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents false submission
            
            let isValid = true;

            // 1. Full Name Validation
            const name = document.getElementById("fullName");
            const nameError = document.getElementById("nameError");
            if (name && name.value.trim().length < 3) {
                nameError.style.display = "block";
                isValid = false;
            } else if (nameError) {
                nameError.style.display = "none";
            }

            // 2. Email Validation
            const email = document.getElementById("email");
            const emailError = document.getElementById("emailError");
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (email && !email.value.match(emailPattern)) {
                emailError.style.display = "block";
                isValid = false;
            } else if (emailError) {
                emailError.style.display = "none";
            }

            // 3. Password Validation
            const password = document.getElementById("password");
            const passwordError = document.getElementById("passwordError");
            if (password && password.value.length < 6) {
                passwordError.style.display = "block";
                isValid = false;
            } else if (passwordError) {
                passwordError.style.display = "none";
            }

            // 4. Date of Birth Validation
            const dob = document.getElementById("dob");
            const dobError = document.getElementById("dobError");
            if (dob && dob.value === "") {
                dobError.style.display = "block";
                isValid = false;
            } else if (dobError) {
                dobError.style.display = "none";
            }

            // 5. Gender Validation
            const genderError = document.getElementById("genderError");
            const genderSelected = document.querySelector('input[name="gender"]:checked');
            if (!genderSelected) {
                if (genderError) genderError.style.display = "block";
                isValid = false;
            } else if (genderError) {
                genderError.style.display = "none";
            }

            // 6. Profile Photo Validation
            const photo = document.getElementById("profilePhoto");
            const photoError = document.getElementById("photoError");
            if (photo && photo.files.length === 0) {
                photoError.style.display = "block";
                isValid = false;
            } else if (photoError) {
                photoError.style.display = "none";
            }

            // 7. Terms & Conditions Validation
            const terms = document.getElementById("terms");
            const termsError = document.getElementById("termsError");
            if (terms && !terms.checked) {
                if (termsError) termsError.style.display = "block";
                isValid = false;
            } else if (termsError) {
                termsError.style.display = "none";
            }

            // If all validations pass
            if (isValid) {
                alert("Congratulations! The form has been successfully validated and submitted.");
                contactForm.reset();
            }
        });
    }

    // ---------------------------------------------
    // D. ARCADE HUB INTERACTIVE TABS
    // ---------------------------------------------
    const tabGame1 = document.getElementById("tabGame1");
    const tabGame2 = document.getElementById("tabGame2");
    const wrapperGame1 = document.getElementById("wrapperGame1");
    const wrapperGame2 = document.getElementById("wrapperGame2");

    if (tabGame1 && tabGame2 && wrapperGame1 && wrapperGame2) {
        tabGame1.addEventListener("click", () => {
            tabGame1.classList.add("active");
            tabGame2.classList.remove("active");
            wrapperGame1.classList.add("active-game");
            wrapperGame2.classList.remove("active-game");
        });

        tabGame2.addEventListener("click", () => {
            tabGame2.classList.add("active");
            tabGame1.classList.remove("active");
            wrapperGame2.classList.add("active-game");
            wrapperGame1.classList.remove("active-game");
        });
    }

    // ---------------------------------------------
    // E. MINI-GAMES SETUP (Engine Stubs)
    // ---------------------------------------------
    // Game 1: Jet Alien Defence
    const btnStartGame1 = document.getElementById("btnStartGame1");
    if (btnStartGame1) {
        btnStartGame1.addEventListener("click", () => {
            const canvas1 = document.getElementById("gameCanvas1");
            if (canvas1) {
                const ctx = canvas1.getContext("2d");
                ctx.clearRect(0, 0, canvas1.width, canvas1.height);
                ctx.fillStyle = "#00f2fe";
                ctx.font = "20px Plus Jakarta Sans";
                ctx.fillText("Jet Alien Defence System Initiated...", 50, 200);
                document.getElementById("gameScore1").innerText = "10";
                document.getElementById("gameHealth1").innerText = "100%";
            }
        });
    }

    // Game 2: Sky High Construction
    const btnStartGame2 = document.getElementById("btnStartGame2");
    const btnDropBlock2 = document.getElementById("btnDropBlock2");
    
    if (btnStartGame2) {
        btnStartGame2.addEventListener("click", () => {
            const canvas2 = document.getElementById("gameCanvas2");
            if (canvas2) {
                const ctx = canvas2.getContext("2d");
                ctx.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx.fillStyle = "#ffb703";
                ctx.font = "20px Plus Jakarta Sans";
                ctx.fillText("Foundation Setup Initialized!", 50, 200);
                document.getElementById("gameStatus2").innerText = "Building...";
                document.getElementById("gameScore2").innerText = "1 Floor";
            }
        });
    }

    if (btnDropBlock2) {
        btnDropBlock2.addEventListener("click", () => {
            document.getElementById("gameScore2").innerText = "2 Floors (Segment Dropped)";
        });
    }
});
