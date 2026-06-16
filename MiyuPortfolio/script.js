document.addEventListener("DOMContentLoaded", () => {
    
    // ---------------------------------------------
    // A. LIGHT / DARK PERSISTENT THEME SWITCHER
    // ---------------------------------------------
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const currentTheme = localStorage.getItem("theme") || "dark-theme";
    document.body.className = currentTheme;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                document.body.className = "light-theme";
                localStorage.setItem("theme", "light-theme");
            } else {
                document.body.className = "dark-theme";
                localStorage.setItem("theme", "dark-theme");
            }
        });
    }

    // ---------------------------------------------
    // B. DYNAMIC CLOCK TIMED GREETING ENGINE
    // ---------------------------------------------
    const greetingText = document.getElementById("dynamicGreeting");
    if (greetingText) {
        const hours = new Date().getHours();
        if (hours < 12) greetingText.innerText = "☀️ Good Morning! Welcome to the IoT Domain";
        else if (hours < 18) greetingText.innerText = "🌤️ Good Afternoon! Welcome to the IoT Domain";
        else greetingText.innerText = "🌙 Good Evening! Welcome to the IoT Domain";
    }

    // ---------------------------------------------
    // C. REAL-TIME VALIDATION INDICATOR
    // ---------------------------------------------
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.addEventListener("input", () => {
            if (passwordInput.value.length >= 6) passwordInput.classList.add("valid-secure");
            else passwordInput.classList.remove("valid-secure");
        });
    }

    // ---------------------------------------------
    // D. RESPONSIVE MOBILE MENU SELECTOR
    // ---------------------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // ---------------------------------------------
    // E. FRONT-END CONTACT REGISTRATION VALIDATION
    // ---------------------------------------------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("fullName");
            const nameError = document.getElementById("nameError");
            if (name.value.trim().length < 3) { nameError.style.display = "block"; isValid = false; }
            else nameError.style.display = "none";

            const email = document.getElementById("email");
            const emailError = document.getElementById("emailError");
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.value.match(emailPattern)) { emailError.style.display = "block"; isValid = false; }
            else emailError.style.display = "none";

            const password = document.getElementById("password");
            const passwordError = document.getElementById("passwordError");
            if (password.value.length < 6) { passwordError.style.display = "block"; isValid = false; }
            else passwordError.style.display = "none";

            const dob = document.getElementById("dob");
            const dobError = document.getElementById("dobError");
            if (dob.value === "") { dobError.style.display = "block"; isValid = false; }
            else dobError.style.display = "none";

            const genderError = document.getElementById("genderError");
            if (!document.querySelector('input[name="gender"]:checked')) { genderError.style.display = "block"; isValid = false; }
            else genderError.style.display = "none";

            const photo = document.getElementById("profilePhoto");
            const photoError = document.getElementById("photoError");
            if (photo.files.length === 0) { photoError.style.display = "block"; isValid = false; }
            else photoError.style.display = "none";

            const terms = document.getElementById("terms");
            const termsError = document.getElementById("termsError");
            if (!terms.checked) { termsError.style.display = "block"; isValid = false; }
            else termsError.style.display = "none";

            if (isValid) {
                alert("Success! Parameters logged safely. Excellent work Hakimi.");
                contactForm.reset();
                if (passwordInput) passwordInput.classList.remove("valid-secure");
            }
        });
    }

    // ---------------------------------------------
    // INTERACTIVE MULTI-TAB CONTROLLER SYSTEM
    // ---------------------------------------------
    const tabGame1 = document.getElementById("tabGame1");
    const tabGame2 = document.getElementById("tabGame2");
    const wrapperGame1 = document.getElementById("wrapperGame1");
    const wrapperGame2 = document.getElementById("wrapperGame2");

    if (tabGame1 && tabGame2) {
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
    // F. GAME 1: ALIEN DEFENCE ENGINE (VECTOR FIGHTER JET)
    // ---------------------------------------------
    const canvas1 = document.getElementById("gameCanvas1");
    const btnStart1 = document.getElementById("btnStartGame1");

    if (canvas1 && btnStart1) {
        const ctx1 = canvas1.getContext("2d");
        let score1 = 0, health1 = 100, gameActive1 = false;
        let enemies1 = [], lasers1 = [], mouseX1 = canvas1.width / 2;
        let frameCounter = 0;

        canvas1.addEventListener("mousemove", (e) => {
            const rect = canvas1.getBoundingClientRect();
            mouseX1 = e.clientX - rect.left;
        });

        canvas1.addEventListener("click", () => {
            if (!gameActive1) return;
            // Launch dual wing-tip plasma bolts
            lasers1.push({ x: mouseX1 - 18, y: canvas1.height - 30, speed: 8 });
            lasers1.push({ x: mouseX1 + 18, y: canvas1.height - 30, speed: 8 });
        });

        function spawnEnemy1() {
            if (!gameActive1) return;
            const size = Math.random() * 15 + 25; // Outer dimensions mapping
            enemies1.push({
                x: Math.random() * (canvas1.width - size),
                y: -size,
                size: size,
                speed: Math.random() * 1.5 + 1.2
            });
            setTimeout(spawnEnemy1, Math.random() * 800 + 600);
        }

        // Vector Fighter Jet Rendering Pipeline
        function drawFighterJet(ctx, x, y) {
            const colorPrimary = document.body.classList.contains("light-theme") ? "#10b981" : "#00f2fe";
            
            // 1. Animated Exhaust Jet Flame Trails
            frameCounter++;
            let flameHeight = (frameCounter % 4 === 0) ? 12 : 18;
            ctx.fillStyle = "#ff7e5f"; 
            ctx.beginPath();
            ctx.moveTo(x - 6, y + 15);
            ctx.lineTo(x, y + 15 + flameHeight);
            ctx.lineTo(x + 6, y + 15);
            ctx.closePath();
            ctx.fill();

            // 2. Main Swept Wings Shape
            ctx.fillStyle = "#475569"; // Mechanical Dark Slate
            ctx.beginPath();
            ctx.moveTo(x, y - 10);
            ctx.lineTo(x - 24, y + 12);
            ctx.lineTo(x - 6, y + 8);
            ctx.lineTo(x + 6, y + 8);
            ctx.lineTo(x + 24, y + 12);
            ctx.closePath();
            ctx.fill();

            // 3. Central Aerodynamic Main Fuselage Hull
            ctx.fillStyle = colorPrimary; 
            ctx.beginPath();
            ctx.moveTo(x, y - 25); // Nose cone point
            ctx.lineTo(x + 7, y + 15); // Right fuselage base
            ctx.lineTo(x - 7, y + 15); // Left fuselage base
            ctx.closePath();
            ctx.fill();

            // 4. Integrated High-Tech Cockpit Canopy
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(x, y - 12);
            ctx.lineTo(x + 3, y);
            ctx.lineTo(x - 3, y);
            ctx.closePath();
            ctx.fill();

            // 5. Dual Tactical Wing-tip Missile Rails
            ctx.fillStyle = "#94a3b8";
            ctx.fillRect(x - 25, y + 2, 2, 10);
            ctx.fillRect(x + 23, y + 2, 2, 10);
        }

        // Vector Alien Mothership Saucer Drawing Method
        function drawAlienUFO(ctx, x, y, size) {
            // Main Outer Elliptical Hull Ring
            ctx.fillStyle = "#a855f7"; // Alien Purple Structure
            ctx.beginPath();
            ctx.ellipse(x + size / 2, y + size / 2, size / 2, size / 3, 0, 0, 2 * Math.PI);
            ctx.fill();

            // Central Upper Biosphere Command Dome
            ctx.fillStyle = "#ff4a5a"; // Hostile Crimson Overlay
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 3, size / 4, Math.PI, 0);
            ctx.fill();

            // Pulsating Under-carriage Weapon Ports
            ctx.fillStyle = (frameCounter % 10 < 5) ? "#ffff00" : "#ff0000";
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size * 0.6, 3, 0, 2 * Math.PI);
            ctx.fill();
        }

        function updateGame1() {
            if (!gameActive1) return;
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

            // Render high-performance vector fighter jet layout
            drawFighterJet(ctx1, mouseX1, canvas1.height - 30);

            // Process Laser Logic Engine Tracks
            lasers1.forEach((laser, lIndex) => {
                laser.y -= laser.speed;
                ctx1.fillStyle = "#00f2fe"; // Glowing Plasma Cyan Bolts
                ctx1.fillRect(laser.x - 1.5, laser.y, 3, 12);
                if (laser.y < 0) lasers1.splice(lIndex, 1);
            });

            // Process Hostile Alien Entity Positions
            enemies1.forEach((enemy, eIndex) => {
                enemy.y += enemy.speed;
                
                // Draw Upgraded Custom Alien UFO Saucers
                drawAlienUFO(ctx1, enemy.x, enemy.y, enemy.size);

                // Check Overlapping Plasma Laser Matrix Collision
                lasers1.forEach((laser, lIndex) => {
                    if (laser.x > enemy.x && laser.x < enemy.x + enemy.size &&
                        laser.y > enemy.y && laser.y < enemy.y + enemy.size) {
                        enemies1.splice(eIndex, 1);
                        lasers1.splice(lIndex, 1);
                        score1 += 10;
                        document.getElementById("gameScore1").innerText = score1;
                    }
                });

                // Check Perimeter Boundary Invasions
                if (enemy.y > canvas1.height) {
                    enemies1.splice(eIndex, 1);
                    health1 -= 20;
                    if (health1 <= 0) {
                        health1 = 0;
                        gameActive1 = false;
                        alert("DEFENCE BREACHED! The sector fell to alien scouts. Final Score: " + score1);
                    }
                    document.getElementById("gameHealth1").innerText = health1 + "%";
                }
            });

            requestAnimationFrame(updateGame1);
        }

        btnStart1.addEventListener("click", () => {
            score1 = 0; health1 = 100; enemies1 = []; lasers1 = [];
            document.getElementById("gameScore1").innerText = score1;
            document.getElementById("gameHealth1").innerText = health1 + "%";
            if (!gameActive1) { gameActive1 = true; spawnEnemy1(); updateGame1(); }
        });
    }

    // ---------------------------------------------
    // G. GAME 2: SKY HIGH BUILDING CONSTRUCTION SYSTEM
    // ---------------------------------------------
    const canvas2 = document.getElementById("gameCanvas2");
    const btnStart2 = document.getElementById("btnStartGame2");
    const btnDrop2 = document.getElementById("btnDropBlock2");

    if (canvas2 && btnStart2 && btnDrop2) {
        const ctx2 = canvas2.getContext("2d");
        
        let score2 = 0;
        let gameActive2 = false;
        let stack = [];
        
        let currentBlock = { x: 0, y: 0, width: 160, height: 30, speed: 3, direction: 1 };
        const baseHeight = 30;

        function initFoundation() {
            stack = [
                { x: (canvas2.width - 200) / 2, y: canvas2.height - baseHeight, width: 200, height: baseHeight }
            ];
            resetSwingingBlock(200);
            score2 = 0;
            document.getElementById("gameScore2").innerText = score2 + " Floors";
            document.getElementById("gameStatus2").innerText = "Building Active";
            document.getElementById("gameStatus2").style.color = "#10b981";
        }

        function resetSwingingBlock(targetWidth) {
            currentBlock.width = targetWidth;
            currentBlock.x = 0;
            currentBlock.height = 28;
            
            let currentYLevel = canvas2.height - baseHeight - (stack.length * 28);
            if(currentYLevel < 100) {
                stack.splice(1, stack.length - 2); // Structural buffer cleanup optimization
            }
            currentBlock.y = canvas2.height - baseHeight - ((stack.length) * 28);
            currentBlock.speed = 3 + (score2 * 0.25); 
            currentBlock.direction = 1;
        }

        function updateGame2() {
            if (!gameActive2) return;
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

            const colorPrimary = document.body.classList.contains("light-theme") ? "#10b981" : "#00f2fe";

            // Baseline Ground Level Indicator
            ctx2.fillStyle = "#334155";
            ctx2.fillRect(0, canvas2.height - 10, canvas2.width, 10);

            // Render Locked Structural Building Blocks
            stack.forEach((block, index) => {
                ctx2.fillStyle = index === 0 ? "#475569" : colorPrimary;
                ctx2.fillRect(block.x, block.y, block.width, block.height);
                ctx2.strokeStyle = "#050b14";
                ctx2.strokeRect(block.x, block.y, block.width, block.height);
            });

            // Move Active Crane Block Segment
            currentBlock.x += currentBlock.speed * currentBlock.direction;
            if (currentBlock.x + currentBlock.width > canvas2.width || currentBlock.x < 0) {
                currentBlock.direction *= -1; 
            }

            // Render Dynamic Hanging Modular Slab
            ctx2.fillStyle = "#ffb703"; 
            ctx2.fillRect(currentBlock.x, currentBlock.y, currentBlock.width, currentBlock.height);

            requestAnimationFrame(updateGame2);
        }

        btnDrop2.addEventListener("click", () => {
            if (!gameActive2) return;

            let lowerBlock = stack[stack.length - 1];
            
            let leftEdge = Math.max(currentBlock.x, lowerBlock.x);
            let rightEdge = Math.min(currentBlock.x + currentBlock.width, lowerBlock.x + lowerBlock.width);
            let newWidth = rightEdge - leftEdge;

            if (newWidth <= 0) {
                gameActive2 = false;
                document.getElementById("gameStatus2").innerText = "TOWER COLLAPSED";
                document.getElementById("gameStatus2").style.color = "#ff4a5a";
                alert("CONSTRUCTION CRASHED! The slab missed the target foundation level. Final Tower Height: " + score2 + " Floors.");
            } else {
                stack.push({
                    x: leftEdge,
                    y: currentBlock.y,
                    width: newWidth,
                    height: currentBlock.height
                });
                
                score2++;
                document.getElementById("gameScore2").innerText = score2 + " Floors";
                resetSwingingBlock(newWidth);
            }
        });

        btnStart2.addEventListener("click", () => {
            gameActive2 = true;
            initFoundation();
            updateGame2();
        });
    }
});