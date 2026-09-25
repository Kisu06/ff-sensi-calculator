/**
 * VIRAL SENSI - FREE FIRE SENSITIVITY GENERATOR ENGINE 2026
 * Clean, High Precision & Policy Safe
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Drawer Controls
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDrawer();
        });
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeDrawer);
    }

    // Elements: Sensitivity Profile Builder
    const gameVersionSelect = document.getElementById('gameVersionSelect');
    const deviceClassSelect = document.getElementById('deviceClassSelect');
    const ramSelect = document.getElementById('ramSelect');
    const dpiSelect = document.getElementById('dpiSelect');
    const refreshRateSelect = document.getElementById('refreshRateSelect');
    const playStyleSelect = document.getElementById('playStyleSelect');
    const aimComfortSlider = document.getElementById('aimComfortSlider');
    const comfortBadge = document.getElementById('comfortBadge');
    const playstyleBadge = document.getElementById('playstyleBadge');

    const valGeneral = document.getElementById('valGeneral');
    const valRedDot = document.getElementById('valRedDot');
    const valScope2x = document.getElementById('valScope2x');
    const valScope4x = document.getElementById('valScope4x');
    const valSniper = document.getElementById('valSniper');
    const valFreeLook = document.getElementById('valFreeLook');

    const valDpi = document.getElementById('valDpi');
    const valFireButton = document.getElementById('valFireButton');

    const btnCopy = document.getElementById('btnCopy');
    const btnReset = document.getElementById('btnReset');
    const btnShare = document.getElementById('btnShare');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // Comfort Labels Mapping
    const comfortLabels = {
        '1': 'ULTRA STABLE',
        '2': 'STABLE',
        '3': 'BALANCED',
        '4': 'FAST',
        '5': 'ULTRA FAST'
    };

    // Playstyle Badge Text Mapping
    const playstyleNames = {
        'balanced': 'BALANCED',
        'drag': 'DRAG HEADSHOT',
        'gloo': 'FAST MOVEMENT',
        'spray': 'SPRAY CONTROL'
    };

    // Calculate Sensitivity Profile Function
    function calculateProfile() {
        if (!valGeneral) return; // Not on index.html

        const gameVer = gameVersionSelect ? gameVersionSelect.value : '200';
        const devClass = deviceClassSelect ? deviceClassSelect.value : 'mid';
        const ram = ramSelect ? ramSelect.value : '4';
        const dpiRange = dpiSelect ? dpiSelect.value : 'medium';
        const hz = refreshRateSelect ? refreshRateSelect.value : '60';
        const style = playStyleSelect ? playStyleSelect.value : 'balanced';
        const comfort = aimComfortSlider ? parseInt(aimComfortSlider.value) : 3;

        // Baseline (exact values matching reference screenshot when defaults are chosen:
        // 200-point, mid range, 4GB RAM, medium DPI, 60Hz, balanced aim, comfort 3)
        let baseGen = 160;
        let baseRed = 158;
        let base2x = 150;
        let base4x = 138;
        let baseSnp = 118;
        let baseFrl = 145;

        let recDpi = '480 DPI';
        let fireBtn = 44;

        // 1. Device Class Adjustments
        if (devClass === 'budget') {
            baseGen += 8;
            baseRed += 7;
            base2x += 5;
            base4x += 4;
            baseSnp += 3;
            baseFrl += 5;
            fireBtn = 46;
        } else if (devClass === 'flagship') {
            baseGen -= 6;
            baseRed -= 5;
            base2x -= 4;
            base4x -= 4;
            baseSnp -= 2;
            baseFrl -= 4;
            fireBtn = 42;
        } else if (devClass === 'iphone') {
            baseGen -= 4;
            baseRed -= 3;
            base2x -= 3;
            base4x -= 3;
            baseSnp -= 2;
            baseFrl -= 3;
            recDpi = 'Default (iOS)';
            fireBtn = 42;
        }

        // 2. RAM Adjustments
        if (ram === '2') {
            baseGen += 6;
            baseRed += 5;
        } else if (ram === '3') {
            baseGen += 3;
            baseRed += 2;
        } else if (ram === '6') {
            baseGen -= 2;
            baseRed -= 2;
        } else if (ram === '8') {
            baseGen -= 4;
            baseRed -= 3;
        } else if (ram === '12') {
            baseGen -= 6;
            baseRed -= 5;
        }

        // 3. DPI Range Adjustments
        if (devClass !== 'iphone') {
            if (dpiRange === 'default') {
                baseGen += 4;
                baseRed += 3;
                recDpi = 'Stock (392 DPI)';
            } else if (dpiRange === 'medium') {
                recDpi = '480 DPI';
            } else if (dpiRange === 'high') {
                baseGen -= 5;
                baseRed -= 4;
                recDpi = '540 DPI';
            }
        }

        // 4. Screen Refresh Rate Adjustments
        if (hz === '90') {
            baseGen -= 2;
            baseRed -= 2;
        } else if (hz === '120') {
            baseGen -= 5;
            baseRed -= 4;
            base2x -= 3;
            base4x -= 3;
        } else if (hz === '144') {
            baseGen -= 8;
            baseRed -= 6;
            base2x -= 4;
            base4x -= 4;
        }

        // 5. Play Style Adjustments
        if (style === 'drag') {
            baseGen += 6;
            baseRed += 7;
            fireBtn = Math.max(38, fireBtn - 3);
        } else if (style === 'gloo') {
            baseGen += 8;
            baseFrl += 12;
            fireBtn = fireBtn - 1;
        } else if (style === 'spray') {
            baseGen -= 6;
            baseRed -= 5;
            base2x -= 6;
            base4x -= 6;
            fireBtn = fireBtn + 3;
        }

        // 6. Aim Comfort Slider Adjustments (1: -8, 2: -4, 3: 0, 4: +4, 5: +8)
        const comfortOffset = (comfort - 3) * 4;
        baseGen += comfortOffset;
        baseRed += comfortOffset;
        base2x += Math.round(comfortOffset * 0.8);
        base4x += Math.round(comfortOffset * 0.7);
        baseSnp += Math.round(comfortOffset * 0.5);
        baseFrl += comfortOffset;

        // 7. Game Version Scale (200-point vs 100-point legacy)
        if (gameVer === '100') {
            baseGen = Math.round(baseGen / 2);
            baseRed = Math.round(baseRed / 2);
            base2x = Math.round(base2x / 2);
            base4x = Math.round(base4x / 2);
            baseSnp = Math.round(baseSnp / 2);
            baseFrl = Math.round(baseFrl / 2);

            baseGen = Math.min(100, Math.max(10, baseGen));
            baseRed = Math.min(100, Math.max(10, baseRed));
            base2x = Math.min(100, Math.max(10, base2x));
            base4x = Math.min(100, Math.max(10, base4x));
            baseSnp = Math.min(100, Math.max(10, baseSnp));
            baseFrl = Math.min(100, Math.max(10, baseFrl));
        } else {
            baseGen = Math.min(200, Math.max(20, baseGen));
            baseRed = Math.min(200, Math.max(20, baseRed));
            base2x = Math.min(200, Math.max(20, base2x));
            base4x = Math.min(200, Math.max(20, base4x));
            baseSnp = Math.min(200, Math.max(20, baseSnp));
            baseFrl = Math.min(200, Math.max(20, baseFrl));
        }

        // Render Sensitivity Numbers
        valGeneral.textContent = baseGen;
        valRedDot.textContent = baseRed;
        valScope2x.textContent = base2x;
        valScope4x.textContent = base4x;
        valSniper.textContent = baseSnp;
        valFreeLook.textContent = baseFrl;

        // Render Secondary Badges
        if (valDpi) valDpi.textContent = recDpi;
        if (valFireButton) valFireButton.textContent = `${fireBtn}%`;

        // Update Badges
        if (comfortBadge) {
            comfortBadge.textContent = comfortLabels[comfort.toString()] || 'BALANCED';
        }
        if (playstyleBadge) {
            playstyleBadge.textContent = playstyleNames[style] || 'BALANCED AIM';
        }
    }

    // Attach Event Listeners to all 6 selectors and slider for instant reactive updates
    const inputs = [gameVersionSelect, deviceClassSelect, ramSelect, dpiSelect, refreshRateSelect, playStyleSelect];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('change', calculateProfile);
        }
    });

    if (aimComfortSlider) {
        aimComfortSlider.addEventListener('input', calculateProfile);
    }

    // Reset Button Handler
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (gameVersionSelect) gameVersionSelect.value = '200';
            if (deviceClassSelect) deviceClassSelect.value = 'mid';
            if (ramSelect) ramSelect.value = '4';
            if (dpiSelect) dpiSelect.value = 'medium';
            if (refreshRateSelect) refreshRateSelect.value = '60';
            if (playStyleSelect) playStyleSelect.value = 'balanced';
            if (aimComfortSlider) aimComfortSlider.value = '3';

            calculateProfile();
            showToast("Reset to default profile");
        });
    }

    // Initial calculation on load
    if (valGeneral) {
        calculateProfile();
    }

    // Copy to Clipboard
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const verText = gameVersionSelect ? gameVersionSelect.options[gameVersionSelect.selectedIndex].text : '200-point';
            const devText = deviceClassSelect ? deviceClassSelect.options[deviceClassSelect.selectedIndex].text : 'Mid range phone';
            const ramText = ramSelect ? ramSelect.value + ' GB' : '4 GB';
            const hzText = refreshRateSelect ? refreshRateSelect.value + ' Hz' : '60 Hz';

            const sensiText = `VIRAL SENSI - FREE FIRE SENSITIVITY\n` +
                `Menu Scale: ${verText}\n` +
                `Device: ${devText} (${ramText} RAM, ${hzText})\n` +
                `-------------------------\n` +
                `General: ${valGeneral.textContent}\n` +
                `Red Dot: ${valRedDot.textContent}\n` +
                `2x Scope: ${valScope2x.textContent}\n` +
                `4x Scope: ${valScope4x.textContent}\n` +
                `Sniper Scope: ${valSniper.textContent}\n` +
                `Free Camera: ${valFreeLook.textContent}\n` +
                `Fire Button Size: ${valFireButton ? valFireButton.textContent : '44%'}\n` +
                `Recommended DPI: ${valDpi ? valDpi.textContent : '480 DPI'}\n` +
                `-------------------------\n` +
                `How to apply: Open Free Fire Settings > Sensitivity and manually adjust each slider.\n` +
                `Generated via: https://viralsensi.takiff.online/`;

            navigator.clipboard.writeText(sensiText).then(() => {
                showToast("Values copied! Manually adjust sliders in game settings");
            }).catch(() => {
                showToast("Failed to copy values");
            });
        });
    }

    // Share Button
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            const message = encodeURIComponent(
                `Generate your Free Fire Sensitivity Profile with Viral Sensi: https://viralsensi.takiff.online/`
            );
            window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
        });
    }

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

            const distY = startY - endY;
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
