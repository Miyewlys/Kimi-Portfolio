document.addEventListener("DOMContentLoaded", () => {
    
    // =============================================
    // A. RESPONSIVE NAVIGATION MENU
    // =============================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // =============================================
    // B. DYNAMIC THEME TOGGLE WITH PERSISTENCE (Kekal & Cool)
    // =============================================
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    
    // Fungsi untuk mengemaskini teks & emoji pada button
    const updateButtonUI = (theme) => {
        if (!themeToggleBtn) return;
        if (theme === "dark-theme") {
            themeToggleBtn.innerHTML = "☀️ Light Mode";
        } else {
            themeToggleBtn.innerHTML = "🌙 Dark Mode";
        }
    };

    // Semak tema yang disimpan dalam localStorage sebelum ini (Default: dark-theme)
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark-theme";
    document.body.className = savedTheme;
    updateButtonUI(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                document.body.classList.replace("dark-theme", "light-theme");
                localStorage.setItem("portfolio-theme", "light-theme");
                updateButtonUI("light-theme");
            } else {
                document.body.classList.replace("light-theme", "dark-theme");
                localStorage.setItem("portfolio-theme", "dark-theme");
                updateButtonUI("dark-theme");
            }
        });
    }

    // =============================================
    // C. FORM VALIDATION (CONTACT PAGE VALIDATION)
    // =============================================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("fullName");
            const nameError = document.getElementById("nameError");
            if (name && name.value.trim().length < 3) {
                nameError.style.display = "block";
                isValid = false;
            } else if (nameError) nameError.style.display = "none";

            const email = document.getElementById("email");
            const emailError = document.getElementById("emailError");
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (email && !email.value.match(emailPattern)) {
                emailError.style.display = "block";
                isValid = false;
            } else if (emailError) emailError.style.display = "none";

            const password = document.getElementById("password");
            const passwordError = document.getElementById("passwordError");
            if (password && password.value.length < 6) {
                passwordError.style.display = "block";
                isValid = false;
            } else if (passwordError) passwordError.style.display = "none";

            if (isValid) {
                alert("Congratulations! The form has been successfully validated and submitted.");
                contactForm.reset();
            }
        });
    }

    // =============================================
    // D. ARCADE HUB INTERACTIVE TABS
    // =============================================
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
            resizeCanvases();
        });

        tabGame2.addEventListener("click", () => {
            tabGame2.classList.add("active");
            tabGame1.classList.remove("active");
            wrapperGame2.classList.add("active-game");
            wrapperGame1.classList.remove("active-game");
            resizeCanvases();
        });
    }

    // =============================================
    // E. GAME 1: JET ALIEN DEFENCE (ADVANCED & MOBILE FUNCTIONAL)
    // =============================================
    const canvas1 = document.getElementById("gameCanvas1");
    const btnStartGame1 = document.getElementById("btnStartGame1");
    
    if (canvas1 && btnStartGame1) {
        const ctx1 = canvas1.getContext("2d");
        let score1 = 0, health1 = 100, gameActive1 = false, gameInterval1;
        let jetY = 200, lasers = [], aliens = [], stars = [], items = [], particles = [];
        let lastShotTime = 0, weaponPowerTimer = 0, hasWeaponPower = false;
        let alienSpawnTimeout;
        let powerupSpawnTimeout;
        
        let keys = {};
        window.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true; });
        window.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

        for (let i = 0; i < 45; i++) {
            stars.push({ x: Math.random() * 600, y: Math.random() * 400, speed: Math.random() * 3 + 1 });
        }

        const trackInputGame1 = (clientY) => {
            const rect = canvas1.getBoundingClientRect();
            const scaleY = 400 / rect.height;
            jetY = (clientY - rect.top) * scaleY;
            if (jetY < 25) jetY = 25;
            if (jetY > 375) jetY = 375;
        };

        canvas1.addEventListener("mousemove", (e) => { if (gameActive1) trackInputGame1(e.clientY); });
        canvas1.addEventListener("touchmove", (e) => {
            if (gameActive1 && e.touches.length > 0) {
                trackInputGame1(e.touches[0].clientY);
                e.preventDefault();
            }
        }, { passive: false });

        function createExplosion(x, y, type) {
            let colors = type === 'alien' ? ["#ff4a5a", "#ff7b00", "#ffff00"] : ["#00f2fe", "#00ffcc", "#ffffff"];
            for (let i = 0; i < 12; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    radius: Math.random() * 3 + 1,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }

        function spawnAlien() {
            if (!gameActive1) return;
            aliens.push({
                x: 600,
                y: Math.random() * 340 + 30,
                speed: Math.random() * 1.5 + 2.5 + (score1 / 150),
                width: 32, height: 24,
                pulse: 0
            });
            alienSpawnTimeout = setTimeout(spawnAlien, Math.max(350, 1100 - (score1 * 1.5)));
        }

        function spawnPowerUp() {
            if (!gameActive1) return;
            items.push({
                x: 600,
                y: Math.random() * 340 + 30,
                speed: 2,
                radius: 12,
                type: Math.random() > 0.5 ? 'heal' : 'weapon'
            });
            powerupSpawnTimeout = setTimeout(spawnPowerUp, Math.random() * 7000 + 6000);
        }

        function updateGame1() {
            ctx1.fillStyle = "#02050d";
            ctx1.fillRect(0, 0, 600, 400);

            particles.forEach((p, index) => {
                p.x += p.vx; p.y += p.vy; p.alpha -= 0.02;
                if (p.alpha <= 0) { particles.splice(index, 1); return; }
                ctx1.save();
                ctx1.globalAlpha = p.alpha;
                ctx1.fillStyle = p.color;
                ctx1.beginPath(); ctx1.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx1.fill();
                ctx1.restore();
            });

            ctx1.fillStyle = "rgba(255, 255, 255, 0.6)";
            stars.forEach(star => {
                star.x -= star.speed;
                if (star.x < 0) star.x = 600;
                ctx1.fillRect(star.x, star.y, 2, 2);
            });

            if (keys['w'] || keys['arrowup']) jetY = Math.max(25, jetY - 6);
            if (keys['s'] || keys['arrowdown']) jetY = Math.min(375, jetY + 6);

            if (hasWeaponPower) {
                weaponPowerTimer--;
                if (weaponPowerTimer <= 0) hasWeaponPower = false;
            }

            let now = Date.now();
            if (now - lastShotTime > (hasWeaponPower ? 180 : 260)) {
                if (hasWeaponPower) {
                    lasers.push({ x: 65, y: jetY, vy: -1.5, color: "#00ffcc" });
                    lasers.push({ x: 70, y: jetY, vy: 0, color: "#00f2fe" });
                    lasers.push({ x: 65, y: jetY, vy: 1.5, color: "#00ffcc" });
                } else {
                    lasers.push({ x: 65, y: jetY, vy: 0, color: "#00f2fe" });
                }
                lastShotTime = now;
            }

            ctx1.save();
            ctx1.shadowBlur = hasWeaponPower ? 20 : 8;
            ctx1.shadowColor = hasWeaponPower ? "#00ffcc" : "#00f2fe";

            ctx1.fillStyle = hasWeaponPower ? "#00ffcc" : "#ff5500";
            ctx1.beginPath();
            ctx1.moveTo(12, jetY - 5); ctx1.lineTo(12, jetY + 5);
            ctx1.lineTo(2 - (Math.random() * 15), jetY);
            ctx1.closePath(); ctx1.fill();

            ctx1.fillStyle = "#0f172a";
            ctx1.strokeStyle = hasWeaponPower ? "#00ffcc" : "#00f2fe";
            ctx1.lineWidth = 2;
            ctx1.beginPath();
            ctx1.moveTo(15, jetY - 8); ctx1.lineTo(35, jetY - 22);
            ctx1.lineTo(40, jetY - 6); ctx1.lineTo(68, jetY);
            ctx1.lineTo(40, jetY + 6); ctx1.lineTo(35, jetY + 22);
            ctx1.lineTo(15, jetY + 8); ctx1.lineTo(22, jetY);
            ctx1.closePath(); ctx1.fill(); ctx1.stroke();

            ctx1.fillStyle = "rgba(0, 242, 254, 0.6)";
            ctx1.beginPath();
            ctx1.moveTo(38, jetY - 4); ctx1.lineTo(52, jetY);
            ctx1.lineTo(38, jetY + 4); ctx1.closePath(); ctx1.fill();
            ctx1.restore();

            lasers.forEach((laser, lIdx) => {
                laser.x += 10;
                laser.y += laser.vy;
                ctx1.save();
                ctx1.shadowBlur = 6; ctx1.shadowColor = laser.color;
                ctx1.fillStyle = laser.color;
                ctx1.fillRect(laser.x, laser.y - 2, 18, 4);
                ctx1.restore();
                if (laser.x > 600 || laser.y < 0 || laser.y > 400) lasers.splice(lIdx, 1);
            });

            items.forEach((item, iIdx) => {
                item.x -= item.speed;
                ctx1.save();
                ctx1.shadowBlur = 10; ctx1.shadowColor = item.type === 'heal' ? "#10b981" : "#ffb703";
                ctx1.fillStyle = item.type === 'heal' ? "#10b981" : "#ffb703";
                ctx1.beginPath(); ctx1.arc(item.x, item.y, item.radius, 0, Math.PI * 2); ctx1.fill();
                ctx1.fillStyle = "#ffffff";
                ctx1.font = "bold 12px Plus Jakarta Sans"; ctx1.textAlign = "center"; ctx1.textBaseline = "middle";
                ctx1.fillText(item.type === 'heal' ? "+" : "W", item.x, item.y);
                ctx1.restore();

                let distJet = Math.hypot(40 - item.x, jetY - item.y);
                if (distJet < item.radius + 20) {
                    createExplosion(item.x, item.y, 'player');
                    if (item.type === 'heal') {
                        health1 = Math.min(100, health1 + 20);
                        document.getElementById("gameHealth1").innerText = health1 + "%";
                    } else {
                        hasWeaponPower = true;
                        weaponPowerTimer = 360;
                    }
                    items.splice(iIdx, 1);
                    return;
                }
                if (item.x < -20) items.splice(iIdx, 1);
            });

            aliens.forEach((alien, aIdx) => {
                alien.x -= alien.speed;
                alien.pulse += 0.07;
                
                ctx1.save();
                ctx1.shadowBlur = 8; ctx1.shadowColor = "#ff4a5a";
                ctx1.fillStyle = "#1e1b4b";
                ctx1.strokeStyle = "#ff4a5a";
                ctx1.lineWidth = 1.5;
                ctx1.beginPath();
                ctx1.moveTo(alien.x + alien.width, alien.y);
                ctx1.lineTo(alien.x + 10, alien.y - alien.height/2);
                ctx1.lineTo(alien.x, alien.y - 6);
                ctx1.lineTo(alien.x, alien.y + 6);
                ctx1.lineTo(alien.x + 10, alien.y + alien.height/2);
                ctx1.closePath(); ctx1.fill(); ctx1.stroke();
                
                ctx1.fillStyle = `rgba(255, 74, 90, ${0.4 + Math.sin(alien.pulse) * 0.3})`;
                ctx1.beginPath(); ctx1.arc(alien.x + 16, alien.y, 5, 0, Math.PI * 2); ctx1.fill();
                ctx1.restore();

                lasers.forEach((laser, lIdx) => {
                    if (laser.x >= alien.x && laser.x <= alien.x + alien.width &&
                        laser.y >= alien.y - alien.height/2 && laser.y <= alien.y + alien.height/2) {
                        createExplosion(alien.x + 15, alien.y, 'alien');
                        aliens.splice(aIdx, 1);
                        lasers.splice(lIdx, 1);
                        score1 += 10;
                        document.getElementById("gameScore1").innerText = score1;
                    }
                });

                let distToJet = Math.hypot(35 - alien.x, jetY - alien.y);
                if (distToJet < 25) {
                    createExplosion(alien.x + 10, alien.y, 'alien');
                    aliens.splice(aIdx, 1);
                    health1 -= 20;
                    document.getElementById("gameHealth1").innerText = health1 + "%";
                    checkGameOver();
                }

                if (alien.x < -alien.width) {
                    aliens.splice(aIdx, 1);
                    health1 -= 10;
                    document.getElementById("gameHealth1").innerText = health1 + "%";
                    checkGameOver();
                }
            });
        }

        function checkGameOver() {
            if (health1 <= 0) {
                health1 = 0;
                document.getElementById("gameHealth1").innerText = "0%";
                gameActive1 = false;
                clearInterval(gameInterval1);
                clearTimeout(alienSpawnTimeout);
                clearTimeout(powerupSpawnTimeout);
                ctx1.fillStyle = "#ff4a5a";
                ctx1.font = "bold 26px Plus Jakarta Sans"; ctx1.textAlign = "center";
                ctx1.fillText("SYSTEM CRITICAL: GAME OVER", 300, 200);
            }
        }

        btnStartGame1.addEventListener("click", () => {
            score1 = 0; health1 = 100; lasers = []; aliens = []; items = []; particles = []; jetY = 200;
            hasWeaponPower = false; weaponPowerTimer = 0;
            document.getElementById("gameScore1").innerText = "0";
            document.getElementById("gameHealth1").innerText = "100%";
            gameActive1 = true;
            clearInterval(gameInterval1);
            clearTimeout(alienSpawnTimeout);
            clearTimeout(powerupSpawnTimeout);
            gameInterval1 = setInterval(updateGame1, 1000 / 60);
            
            spawnAlien();
            setTimeout(spawnPowerUp, 5000);
        });
    }

    // =============================================
    // F. GAME 2: SKY HIGH CONSTRUCTION
    // =============================================
    const canvas2 = document.getElementById("gameCanvas2");
    const btnStartGame2 = document.getElementById("btnStartGame2");
    const btnDropBlock2 = document.getElementById("btnDropBlock2");

    if (canvas2 && btnStartGame2 && btnDropBlock2) {
        const ctx2 = canvas2.getContext("2d");
        let score2 = 0, gameActive2 = false, gameInterval2;
        
        let baseLineY = 370, blockHeight = 25;
        let activeBlock = { x: 0, y: 50, width: 150, speed: 4, dir: 1, falling: false, targetY: 0 };
        let stackedBlocks = [];

        function initNewBlock() {
            let currentWidth = stackedBlocks.length > 0 ? stackedBlocks[stackedBlocks.length - 1].width : 150;
            let currentSpeed = 4 + (stackedBlocks.length * 0.4); 
            
            activeBlock.width = currentWidth;
            activeBlock.x = 0;
            activeBlock.y = 40;
            activeBlock.speed = currentSpeed;
            activeBlock.dir = 1;
            activeBlock.falling = false;
            activeBlock.targetY = baseLineY - ((stackedBlocks.length + 1) * blockHeight);
        }

        function triggerDropAction() {
            if (!gameActive2 || activeBlock.falling) return;
            activeBlock.falling = true;
        }

        window.addEventListener("keydown", (e) => { if (e.code === "Space") { triggerDropAction(); e.preventDefault(); } });
        btnDropBlock2.addEventListener("click", (e) => { triggerDropAction(); e.stopPropagation(); });
        canvas2.addEventListener("touchstart", (e) => { triggerDropAction(); e.preventDefault(); }, { passive: false });
        canvas2.addEventListener("mousedown", (e) => { if(e.target === canvas2) triggerDropAction(); });

        function updateGame2() {
            ctx2.fillStyle = "#040812";
            ctx2.fillRect(0, 0, 600, 400);

            ctx2.fillStyle = "#334155";
            ctx2.fillRect(100, baseLineY, 400, 30);

            stackedBlocks.forEach((b) => {
                ctx2.fillStyle = "#10b981";
                ctx2.strokeStyle = "#040812";
                ctx2.fillRect(b.x, b.y, b.width, blockHeight);
                ctx2.strokeRect(b.x, b.y, b.width, blockHeight);
            });

            if (!gameActive2) return;

            if (!activeBlock.falling) {
                activeBlock.x += activeBlock.speed * activeBlock.dir;
                if (activeBlock.x <= 0 || activeBlock.x + activeBlock.width >= 600) {
                    activeBlock.dir *= -1;
                }
            } else {
                activeBlock.y += 12; 
                if (activeBlock.y >= activeBlock.targetY) {
                    activeBlock.y = activeBlock.targetY;
                    activeBlock.falling = false;

                    let baseLeft = stackedBlocks.length > 0 ? stackedBlocks[stackedBlocks.length - 1].x : 100;
                    let baseRight = stackedBlocks.length > 0 ? baseLeft + stackedBlocks[stackedBlocks.length - 1].width : 500;

                    let leftBound = Math.max(activeBlock.x, baseLeft);
                    let rightBound = Math.min(activeBlock.x + activeBlock.width, baseRight);
                    let overlapWidth = rightBound - leftBound;

                    if (overlapWidth > 5) {
                        stackedBlocks.push({ x: leftBound, y: activeBlock.y, width: overlapWidth });
                        score2++;
                        document.getElementById("gameScore2").innerText = `${score2} Floors`;

                        if (stackedBlocks.length * blockHeight > 200) {
                            stackedBlocks.forEach(b => b.y += blockHeight);
                            baseLineY += blockHeight;
                        }
                        initNewBlock();
                    } else {
                        gameActive2 = false;
                        clearInterval(gameInterval2);
                        document.getElementById("gameStatus2").innerText = "Collapse! Game Over";
                        document.getElementById("gameStatus2").style.color = "#ff4a5a";
                    }
                }
            }

            ctx2.fillStyle = "#ffb703";
            ctx2.fillRect(activeBlock.x, activeBlock.y, activeBlock.width, blockHeight);
        }

        btnStartGame2.addEventListener("click", (e) => {
            e.stopPropagation();
            score2 = 0; baseLineY = 370; stackedBlocks = []; gameActive2 = true;
            document.getElementById("gameScore2").innerText = "0 Floors";
            document.getElementById("gameStatus2").innerText = "Constructing...";
            document.getElementById("gameStatus2").style.color = "#10b981";
            initNewBlock();
            clearInterval(gameInterval2);
            gameInterval2 = setInterval(updateGame2, 1000 / 60);
        });
    }

    // =============================================
    // G. RESPONSIVE CANVAS RESOLUTION FIXER
    // =============================================
    function resizeCanvases() {
        [canvas1, canvas2].forEach(canvas => {
            if (canvas) {
                canvas.width = 600;
                canvas.height = 400;
            }
        });
    }
    
    resizeCanvases();
    window.addEventListener("resize", resizeCanvases);
});
