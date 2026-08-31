/**
 * Automated Shotlist Screen Recorder with Visible Animated Cursor & Click Waves
 * Core Prompting Principles & Structured Input Formats — Video 1.1
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const RECORDINGS_DIR = path.join(__dirname, 'recordings');
if (!fs.existsSync(RECORDINGS_DIR)) {
    fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}

// Injects a high-visibility cursor and click ripple animation into any page
async function injectVisualCursor(page) {
    await page.evaluate(() => {
        if (document.getElementById('recording-virtual-cursor')) return;

        // Cursor element
        const cursor = document.createElement('div');
        cursor.id = 'recording-virtual-cursor';
        cursor.innerHTML = `
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 10px rgba(0,0,0,0.7));">
                <path d="M6 3L23 15L14 18L10 27L6 3Z" fill="#fbbf24" stroke="#0b1120" stroke-width="2.5" stroke-linejoin="round"/>
                <circle cx="6" cy="3" r="3.5" fill="#38bdf8" stroke="#0b1120" stroke-width="1.5" />
            </svg>
        `;
        cursor.style.position = 'fixed';
        cursor.style.top = '0px';
        cursor.style.left = '0px';
        cursor.style.width = '34px';
        cursor.style.height = '34px';
        cursor.style.zIndex = '9999999';
        cursor.style.pointerEvents = 'none';
        cursor.style.transform = 'translate(-6px, -3px)';
        cursor.style.transition = 'transform 0.06s ease-out, opacity 0.2s ease';
        document.body.appendChild(cursor);

        // Click Ripple style
        const style = document.createElement('style');
        style.textContent = `
            .rec-click-ripple {
                position: fixed;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(251, 191, 36, 0.5);
                border: 2.5px solid #38bdf8;
                pointer-events: none;
                z-index: 9999998;
                transform: translate(-50%, -50%) scale(0.4);
                animation: ripple-anim 0.65s cubic-bezier(0.1, 0.3, 0.7, 1) forwards;
            }
            @keyframes ripple-anim {
                0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(3.8); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        window.__moveCursor = (x, y) => {
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
        };

        window.__clickRipple = (x, y) => {
            const ripple = document.createElement('div');
            ripple.className = 'rec-click-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 750);
        };
    });
}

// Helper to smoothly move cursor between coordinates
async function smoothMove(page, startX, startY, targetX, targetY, durationMs = 600) {
    const steps = Math.max(12, Math.floor(durationMs / 18));
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // EaseInOutCubic
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const curX = Math.round(startX + (targetX - startX) * ease);
        const curY = Math.round(startY + (targetY - startY) * ease);
        await page.evaluate(({ x, y }) => window.__moveCursor(x, y), { x: curX, y: curY });
        await page.mouse.move(curX, curY);
        await page.waitForTimeout(18);
    }
}

// Move to element and click with visible ripple
async function moveToElementAndClick(page, selector, currentPos = { x: 500, y: 500 }, durationMs = 700) {
    const el = await page.$(selector);
    if (!el) {
        console.warn(`Selector not found for click: ${selector}`);
        return currentPos;
    }
    const box = await el.boundingBox();
    if (!box) return currentPos;

    const targetX = Math.round(box.x + box.width / 2);
    const targetY = Math.round(box.y + box.height / 2);

    await smoothMove(page, currentPos.x, currentPos.y, targetX, targetY, durationMs);
    await page.evaluate(({ x, y }) => window.__clickRipple(x, y), { x: targetX, y: targetY });
    await page.mouse.click(targetX, targetY);
    await page.waitForTimeout(350);

    return { x: targetX, y: targetY };
}

// Move to element and hover smoothly
async function moveToElementAndHover(page, selector, currentPos = { x: 500, y: 500 }, durationMs = 700) {
    const el = await page.$(selector);
    if (!el) {
        console.warn(`Selector not found for hover: ${selector}`);
        return currentPos;
    }
    const box = await el.boundingBox();
    if (!box) return currentPos;

    const targetX = Math.round(box.x + box.width / 2);
    const targetY = Math.round(box.y + box.height / 2);

    await smoothMove(page, currentPos.x, currentPos.y, targetX, targetY, durationMs);
    await page.waitForTimeout(450);
    return { x: targetX, y: targetY };
}

// ----------------------------------------------------
// SHOT 1: Architecture & 4 Core Components (24s)
// ----------------------------------------------------
async function recordShot1(browser) {
    console.log('\n🎬 Recording Shot 1: Architecture & 4 Core Components (~24s)...');
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: { dir: RECORDINGS_DIR, size: { width: 1920, height: 1080 } }
    });
    const page = await context.newPage();
    const filePath = `file://${path.join(__dirname, 'index.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await injectVisualCursor(page);

    let pos = { x: 960, y: 180 };
    await page.evaluate(({ x, y }) => window.__moveCursor(x, y), pos);
    await page.waitForTimeout(1500);

    // 1. Point to header
    pos = await moveToElementAndHover(page, 'header h1', pos, 900);
    await page.waitForTimeout(2000);

    // 2. Smoothly scroll down to Architecture Flow Diagram
    await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'smooth' }));
    await page.waitForTimeout(1200);

    // 3. Move cursor across 4 diagram nodes
    pos = await moveToElementAndHover(page, '.flow-node.highlight-blue', pos, 800);
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '.flow-node.highlight-purple', pos, 800);
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '.flow-node.highlight-amber', pos, 800);
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '.flow-node.highlight-green', pos, 800);
    await page.waitForTimeout(1500);

    // 4. Scroll down to Core Concepts Section
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '#tab-architecture section:nth-of-type(1)', pos, 900);
    await page.waitForTimeout(3000);

    await page.close();
    const video = await page.video();
    await context.close();

    const targetFile = path.join(RECORDINGS_DIR, 'video-1.1-shot1-architecture.webm');
    fs.renameSync(await video.path(), targetFile);
    console.log(`✅ Shot 1 saved to: ${targetFile}`);
    return targetFile;
}

// ----------------------------------------------------
// SHOT 2: Competitive Analysis (Left vs Right) (25s)
// ----------------------------------------------------
async function recordShot2(browser) {
    console.log('\n🎬 Recording Shot 2: Competitive Analysis — Left vs. Right (~25s)...');
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: { dir: RECORDINGS_DIR, size: { width: 1920, height: 1080 } }
    });
    const page = await context.newPage();
    const filePath = `file://${path.join(__dirname, 'comparison.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await injectVisualCursor(page);

    let pos = { x: 450, y: 180 };
    await page.evaluate(({ x, y }) => window.__moveCursor(x, y), pos);
    await page.waitForTimeout(1500);

    // 1. Highlight Scenario 1 button
    pos = await moveToElementAndClick(page, '.scenario-pill.active', pos, 800);
    await page.waitForTimeout(1200);

    // 2. Highlight Left Column (Red border - Unstructured bad prompt)
    pos = await moveToElementAndHover(page, '.column-card.bad-side', pos, 1000);
    await page.waitForTimeout(2000);

    pos = await moveToElementAndHover(page, '#bad-output-text', pos, 800);
    await page.waitForTimeout(2000);

    // 3. Pan smoothly across to Right Column (Green border - Structured prompt)
    pos = await moveToElementAndHover(page, '.column-card.good-side', pos, 1200);
    await page.waitForTimeout(2500);

    pos = await moveToElementAndHover(page, '#good-output-text', pos, 1000);
    await page.waitForTimeout(3000);

    // 4. Scroll down to analysis comparison
    await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'smooth' }));
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '.metric-strip', pos, 900);
    await page.waitForTimeout(2500);

    await page.close();
    const video = await page.video();
    await context.close();

    const targetFile = path.join(RECORDINGS_DIR, 'video-1.1-shot2-comparison.webm');
    fs.renameSync(await video.path(), targetFile);
    console.log(`✅ Shot 2 saved to: ${targetFile}`);
    return targetFile;
}

// ----------------------------------------------------
// SHOT 3: Guided Builder — Meeting Notes & Null (23s)
// ----------------------------------------------------
async function recordShot3(browser) {
    console.log('\n🎬 Recording Shot 3: Guided Builder — Meeting Notes & Null Constraints (~23s)...');
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: { dir: RECORDINGS_DIR, size: { width: 1920, height: 1080 } }
    });
    const page = await context.newPage();
    const filePath = `file://${path.join(__dirname, 'index.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await injectVisualCursor(page);

    let pos = { x: 600, y: 150 };
    await page.evaluate(({ x, y }) => window.__moveCursor(x, y), pos);
    await page.waitForTimeout(1000);

    // 1. Click Hands-On Workshop (DO & APPLY) tab
    pos = await moveToElementAndClick(page, 'button[onclick="switchTab(\'workshop\')"]', pos, 800);
    await page.waitForTimeout(1500);

    // 2. Move cursor through Form fields on the left
    pos = await moveToElementAndHover(page, '#doRole', pos, 800);
    await page.waitForTimeout(1000);

    pos = await moveToElementAndHover(page, '#doContext', pos, 700);
    await page.waitForTimeout(1000);

    pos = await moveToElementAndHover(page, '#doTask', pos, 700);
    await page.waitForTimeout(1000);

    pos = await moveToElementAndHover(page, '#doData', pos, 700);
    await page.waitForTimeout(1200);

    pos = await moveToElementAndHover(page, '#doConstraints', pos, 700);
    await page.waitForTimeout(1200);

    // 3. Move cursor to real-time assembled preview
    pos = await moveToElementAndHover(page, '#doOutput', pos, 900);
    await page.waitForTimeout(2500);

    // 4. Click the Copy Assembled Prompt button
    pos = await moveToElementAndClick(page, 'button[onclick="copyCode(\'doOutput\')"]', pos, 800);
    await page.waitForTimeout(2500);

    await page.close();
    const video = await page.video();
    await context.close();

    const targetFile = path.join(RECORDINGS_DIR, 'video-1.1-shot3-guided-builder.webm');
    fs.renameSync(await video.path(), targetFile);
    console.log(`✅ Shot 3 saved to: ${targetFile}`);
    return targetFile;
}

// ----------------------------------------------------
// SHOT 4: Exercise 1.1 — Prompt Refactor Game (23s)
// ----------------------------------------------------
async function recordShot4(browser) {
    console.log('\n🎬 Recording Shot 4: Exercise 1.1 — Prompt Refactor Game (~23s)...');
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: { dir: RECORDINGS_DIR, size: { width: 1920, height: 1080 } }
    });
    const page = await context.newPage();
    const filePath = `file://${path.join(__dirname, 'exercise.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await injectVisualCursor(page);

    let pos = { x: 400, y: 250 };
    await page.evaluate(({ x, y }) => window.__moveCursor(x, y), pos);
    await page.waitForTimeout(1500);

    // Click puzzle pieces in sequence: role_1, context_1, task_1, input_1, output_1
    const pieceIds = ['piece-role_1', 'piece-context_1', 'piece-task_1', 'piece-input_1', 'piece-output_1'];

    for (const pid of pieceIds) {
        pos = await moveToElementAndClick(page, `#${pid}`, pos, 700);
        await page.waitForTimeout(550);
    }

    // Click Check & Test Prompt button
    pos = await moveToElementAndClick(page, '.btn-check', pos, 900);
    await page.waitForTimeout(4000); // allow celebration and score animation

    await page.close();
    const video = await page.video();
    await context.close();

    const targetFile = path.join(RECORDINGS_DIR, 'video-1.1-shot4-exercise.webm');
    fs.renameSync(await video.path(), targetFile);
    console.log(`✅ Shot 4 saved to: ${targetFile}`);
    return targetFile;
}

// ----------------------------------------------------
// MAIN RUNNER
// ----------------------------------------------------
async function main() {
    console.log('🚀 Launching Chromium Screen Recorder with Visible Virtual Cursor & Clicks...');
    const browser = await chromium.launch({
        headless: true,
        args: ['--enable-usermedia-screen-capturing', '--allow-http-screen-capture', '--no-sandbox']
    });

    try {
        const shot1 = await recordShot1(browser);
        const shot2 = await recordShot2(browser);
        const shot3 = await recordShot3(browser);
        const shot4 = await recordShot4(browser);

        // Generate Takes Manifest JSON
        const manifest = {
            project: "Core Prompting Principles & Structured Input Formats",
            module: "Video 1.1 Production",
            generatedAt: new Date().toISOString(),
            resolution: "1920x1080 (1080p)",
            framerate: "60fps",
            shots: [
                {
                    shotId: 1,
                    title: "Shot 1: Architecture & The 4 Core Components",
                    targetPage: "index.html",
                    duration: "24s",
                    file: path.basename(shot1),
                    relativePath: `recordings/${path.basename(shot1)}`,
                    sizeBytes: fs.statSync(shot1).size
                },
                {
                    shotId: 2,
                    title: "Shot 2: Competitive Analysis — Left vs. Right Contrast",
                    targetPage: "comparison.html",
                    duration: "25s",
                    file: path.basename(shot2),
                    relativePath: `recordings/${path.basename(shot2)}`,
                    sizeBytes: fs.statSync(shot2).size
                },
                {
                    shotId: 3,
                    title: "Shot 3: Guided Builder — Meeting Notes & Null Constraints",
                    targetPage: "index.html#workshop",
                    duration: "23s",
                    file: path.basename(shot3),
                    relativePath: `recordings/${path.basename(shot3)}`,
                    sizeBytes: fs.statSync(shot3).size
                },
                {
                    shotId: 4,
                    title: "Shot 4: Exercise 1.1 — The Interactive Prompt Refactor Game",
                    targetPage: "exercise.html",
                    duration: "23s",
                    file: path.basename(shot4),
                    relativePath: `recordings/${path.basename(shot4)}`,
                    sizeBytes: fs.statSync(shot4).size
                }
            ]
        };

        const manifestPath = path.join(RECORDINGS_DIR, 'takes-manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`\n📄 Takes Manifest generated: ${manifestPath}`);

        console.log('\n🎉 ALL 4 SHOTS SUCCESSFULLY RECORDED & SAVED TO ./recordings/ !');
    } catch (err) {
        console.error('❌ Error recording shots:', err);
    } finally {
        await browser.close();
    }
}

main();
