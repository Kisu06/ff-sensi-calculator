/**
 * FREE FIRE SENSITIVITY CALCULATOR ENGINE 2026
 * Clean, High Precision & AdSense Policy Safe
 * Custom Logo & Favicon Integration / Zero Emojis
 */

document.addEventListener('DOMContentLoaded', () => {
    // Autocomplete database
    const deviceDatabase = [
        "Redmi Note 12", "Redmi Note 13 Pro", "Redmi Note 11", "Redmi 12 5G", "Redmi Note 10 Pro",
        "Poco X5 Pro", "Poco X6 Pro 5G", "Poco M6 Pro", "Poco F5", "Poco C55",
        "Samsung Galaxy S23 Ultra", "Samsung Galaxy S24 Ultra", "Samsung M34 5G", "Samsung A54 5G", "Samsung A14",
        "Realme 11 Pro+", "Realme 12 Pro", "Realme C55", "Realme Narzo 60", "Realme 9 Pro",
        "Vivo V29 5G", "Vivo T2x 5G", "Vivo Y200", "Vivo V30 Pro", "iQOO Neo 7", "iQOO Z7 Pro",
        "OnePlus Nord CE 3", "OnePlus 11R", "OnePlus 12", "OnePlus Nord 3",
        "iPhone 13", "iPhone 14 Pro Max", "iPhone 15 Pro Max", "iPhone 12", "iPhone 11",
        "Infinix GT 10 Pro", "Infinix Zero 30", "Tecno Pova 5 Pro", "ASUS ROG Phone 7"
    ];

    // Elements Tool 1: Sensi Calibrator
    const platformSelect = document.getElementById('platformSelect');
    const deviceInput = document.getElementById('deviceInput');
    const suggestionsBox = document.getElementById('suggestionsBox');
    const ramPlaystyleSelect = document.getElementById('ramPlaystyleSelect');
    const generateBtn = document.getElementById('generateBtn');

    const resultsPlaceholder = document.getElementById('resultsPlaceholder');
    const resultsGrid = document.getElementById('resultsGrid');

    const valGeneral = document.getElementById('valGeneral');
    const valRedDot = document.getElementById('valRedDot');
    const valScope2x = document.getElementById('valScope2x');
    const valScope4x = document.getElementById('valScope4x');
    const valSniper = document.getElementById('valSniper');
    const valFreeLook = document.getElementById('valFreeLook');

    const valDpi = document.getElementById('valDpi');
    const valFireButton = document.getElementById('valFireButton');

    const btnCopy = document.getElementById('btnCopy');
    const btnShare = document.getElementById('btnShare');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // Elements Tool 2: DPI Calculator Page
    const stockDpiInput = document.getElementById('stockDpiInput');
    const hzInput = document.getElementById('hzInput');
    const calcDpiBtn = document.getElementById('calcDpiBtn');
    const dpiOutputBox = document.getElementById('dpiOutputBox');
    const dpiResultVal = document.getElementById('dpiResultVal');

    if (calcDpiBtn && dpiOutputBox && dpiResultVal) {
        calcDpiBtn.addEventListener('click', () => {
            const stockDpi = parseInt(stockDpiInput.value) || 392;
            const hz = parseInt(hzInput.value) || 60;

            let targetDpi = Math.round(stockDpi * 1.22);
            if (hz >= 120) {
                targetDpi = Math.round(stockDpi * 1.15);
            }

            dpiResultVal.textContent = `${targetDpi} DPI`;
            dpiOutputBox.style.display = 'block';
        });
    }

    // Elements Tool 3: Fire Button Size Calculator Page
    const screenSizeInput = document.getElementById('screenSizeInput');
    const weaponTypeInput = document.getElementById('weaponTypeInput');
    const calcFireBtn = document.getElementById('calcFireBtn');
    const fireOutputBox = document.getElementById('fireOutputBox');
    const fireResultVal = document.getElementById('fireResultVal');

    if (calcFireBtn && fireOutputBox && fireResultVal) {
        calcFireBtn.addEventListener('click', () => {
            const screenSize = screenSizeInput ? screenSizeInput.value : 'standard';
            const weaponType = weaponTypeInput ? weaponTypeInput.value : 'drag';

            let size = 44;
            if (screenSize === 'compact') size = 41;
            if (screenSize === 'large') size = 47;

            if (weaponType === 'shotgun') size = Math.max(38, size - 3);

            fireResultVal.textContent = `${size}%`;
            fireOutputBox.style.display = 'block';
        });
    }

    // Elements Tool 4: Custom HUD Calculator Page
    const clawSelect = document.getElementById('clawSelect');
    const roleSelect = document.getElementById('roleSelect');
    const calcHudBtn = document.getElementById('calcHudBtn');
    const hudOutputBox = document.getElementById('hudOutputBox');

    const hudFireRight = document.getElementById('hudFireRight');
    const hudGloo = document.getElementById('hudGloo');
    const hudScope = document.getElementById('hudScope');
    const hudSprint = document.getElementById('hudSprint');
    const hudCrouch = document.getElementById('hudCrouch');
    const hudSwitch = document.getElementById('hudSwitch');

    if (calcHudBtn && hudOutputBox) {
        calcHudBtn.addEventListener('click', () => {
            const claw = clawSelect ? clawSelect.value : '2';

            if (claw === '2') {
                if (hudFireRight) hudFireRight.textContent = '44%';
                if (hudGloo) hudGloo.textContent = '85%';
                if (hudScope) hudScope.textContent = '65%';
                if (hudSprint) hudSprint.textContent = '75%';
                if (hudCrouch) hudCrouch.textContent = '70%';
                if (hudSwitch) hudSwitch.textContent = '80%';
            } else if (claw === '3') {
                if (hudFireRight) hudFireRight.textContent = '42%';
                if (hudGloo) hudGloo.textContent = '95%';
                if (hudScope) hudScope.textContent = '70%';
                if (hudSprint) hudSprint.textContent = '80%';
                if (hudCrouch) hudCrouch.textContent = '75%';
                if (hudSwitch) hudSwitch.textContent = '88%';
            } else { // 4 Finger Claw
                if (hudFireRight) hudFireRight.textContent = '40%';
                if (hudGloo) hudGloo.textContent = '100%';
                if (hudScope) hudScope.textContent = '75%';
                if (hudSprint) hudSprint.textContent = '85%';
                if (hudCrouch) hudCrouch.textContent = '80%';
                if (hudSwitch) hudSwitch.textContent = '92%';
            }

            hudOutputBox.style.display = 'block';
        });
    }

    // Elements Tool 5: Drag Aim Speed Trainer Canvas Logic
    const trainerBox = document.getElementById('trainerBox');
    const trainerOutputBox = document.getElementById('trainerOutputBox');
    const trainerSpeedVal = document.getElementById('trainerSpeedVal');
    const trainerFeedbackMsg = document.getElementById('trainerFeedbackMsg');
    const trainerInstruction = document.getElementById('trainerInstruction');

    if (trainerBox && trainerOutputBox && trainerSpeedVal) {
        let startY = 0;
        let startTime = 0;

        const handleStart = (y) => {
            startY = y;
            startTime = Date.now();
            if (trainerInstruction) trainerInstruction.textContent = "Drag UPWARDS now!";
        };

        const handleEnd = (y) => {
            if (startTime === 0) return;
            const endY = y;
            const endTime = Date.now();

            const distY = startY - endY; // Upward displacement
            const timeDiff = endTime - startTime;

            startTime = 0;

            if (distY > 30 && timeDiff > 20) {
                const velocity = (distY / timeDiff).toFixed(2);
                trainerSpeedVal.textContent = `${velocity} px/ms`;

                if (velocity < 1.0) {
                    trainerFeedbackMsg.textContent = "Slow Drag Speed detected. Increase your General Sensitivity to 196-198 for easy drag headshots.";
                } else if (velocity <= 1.8) {
                    trainerFeedbackMsg.textContent = "Optimal Drag Speed! General Sensitivity recommended: 194. High Red Number accuracy!";
                } else {
                    trainerFeedbackMsg.textContent = "Ultra Fast Drag Speed! Keep General Sensitivity at 186-190 to avoid overshooting target heads.";
                }

                trainerOutputBox.style.display = 'block';
                if (trainerInstruction) trainerInstruction.textContent = "Drag UPWARDS again to re-test!";
            } else {
                if (trainerInstruction) trainerInstruction.textContent = "Drag UPWARDS faster to measure!";
            }
        };

        trainerBox.addEventListener('mousedown', (e) => handleStart(e.clientY));
        trainerBox.addEventListener('mouseup', (e) => handleEnd(e.clientY));

        trainerBox.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) handleStart(e.touches[0].clientY);
        });
        trainerBox.addEventListener('touchend', (e) => {
            if (e.changedTouches.length > 0) handleEnd(e.changedTouches[0].clientY);
        });
    }

    // Autocomplete
    if (deviceInput) {
        deviceInput.addEventListener('input', () => {
            const query = deviceInput.value.toLowerCase().trim();
            suggestionsBox.innerHTML = '';

            if (query.length < 2) {
                suggestionsBox.style.display = 'none';
                return;
            }

            const matches = deviceDatabase.filter(d => d.toLowerCase().includes(query)).slice(0, 5);

            if (matches.length > 0) {
                matches.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-row';
                    div.textContent = item;
                    div.addEventListener('click', () => {
                        deviceInput.value = item;
                        suggestionsBox.style.display = 'none';
                    });
                    suggestionsBox.appendChild(div);
                });
                suggestionsBox.style.display = 'block';
            } else {
                suggestionsBox.style.display = 'none';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (deviceInput && suggestionsBox && !deviceInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });

    // Sensitivity Calculation Engine
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const platform = platformSelect ? platformSelect.value : 'Android';
            const configChoice = ramPlaystyleSelect ? ramPlaystyleSelect.value : '6_drag';

            generateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> CALCULATING...`;
            generateBtn.disabled = true;

            setTimeout(() => {
                generateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Sensitivity`;
                generateBtn.disabled = false;

                let baseGeneral = 194;
                let baseRedDot = 188;
                let base2x = 178;
                let base4x = 168;
                let baseSniper = 125;
                let baseFreeLook = 160;
                let recommendedDPI = 480;
                let fireBtnSize = 44;

                if (configChoice.startsWith('2_')) {
                    baseGeneral = 198;
                    baseRedDot = 194;
                    base2x = 186;
                    base4x = 176;
                    recommendedDPI = 520;
                    fireBtnSize = 41;
                } else if (configChoice.startsWith('4_')) {
                    baseGeneral = 195;
                    baseRedDot = 190;
                    base2x = 180;
                    base4x = 170;
                    recommendedDPI = 500;
                    fireBtnSize = 43;
                } else if (configChoice.startsWith('8_')) {
                    baseGeneral = 184;
                    baseRedDot = 178;
                    base2x = 168;
                    base4x = 158;
                    recommendedDPI = 420;
                    fireBtnSize = 48;
                }

                if (platform === 'iPhone') {
                    baseGeneral = 196;
                    baseRedDot = 190;
                    recommendedDPI = "Default";
                    fireBtnSize = 43;
                } else if (platform === 'PC') {
                    baseGeneral = 75;
                    baseRedDot = 85;
                    base2x = 70;
                    base4x = 60;
                    baseSniper = 50;
                    baseFreeLook = 100;
                    recommendedDPI = 800;
                    fireBtnSize = 50;
                }

                valGeneral.textContent = baseGeneral;
                valRedDot.textContent = baseRedDot;
                valScope2x.textContent = base2x;
                valScope4x.textContent = base4x;
                valSniper.textContent = baseSniper;
                valFreeLook.textContent = baseFreeLook;

                valDpi.textContent = typeof recommendedDPI === 'number' ? `${recommendedDPI} DPI` : recommendedDPI;
                valFireButton.textContent = `${fireBtnSize}%`;

                resultsPlaceholder.style.display = 'none';
                resultsGrid.style.display = 'flex';

                resultsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 400);
        });
    }

    // Copy to Clipboard
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const sensiText = `FREE FIRE SENSITIVITY CONFIGURATION\n` +
                `Device: ${deviceInput.value || 'Custom Device'} (${platformSelect.value})\n` +
                `General: ${valGeneral.textContent}\n` +
                `Red Dot: ${valRedDot.textContent}\n` +
                `2x Scope: ${valScope2x.textContent}\n` +
                `4x Scope: ${valScope4x.textContent}\n` +
                `Sniper Scope: ${valSniper.textContent}\n` +
                `Free Look: ${valFreeLook.textContent}\n` +
                `Fire Button Size: ${valFireButton.textContent}\n` +
                `Recommended DPI: ${valDpi.textContent}\n` +
                `Calibrated via: https://ffsensi.takiff.online/`;

            navigator.clipboard.writeText(sensiText).then(() => {
                showToast("Sensitivity config copied to clipboard");
            }).catch(() => {
                showToast("Failed to copy settings");
            });
        });
    }

    // Share Button
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            const message = encodeURIComponent(
                `Free Fire Headshot Sensitivity Generator: https://ffsensi.takiff.online/`
            );
            window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item, .faq-card');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    function showToast(msg) {
        if (toastMsg && toast) {
            toastMsg.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }
});
