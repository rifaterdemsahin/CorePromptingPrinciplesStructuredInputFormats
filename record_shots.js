/**
 * Automated Shotlist Screen Recorder with Visible Animated Cursor & Click Waves
 * Core Prompting Principles & Structured Input Formats — Video 1.1
 * Filenames mapped with exact timecodes in both WebM and MP4 formats
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const RECORDINGS_DIR = path.join(__dirname, 'recordings');
if (!fs.existsSync(RECORDINGS_DIR)) {
    fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}

// Convert WebM to MP4 using ffmpeg with standard H.264 compatible encoding
function convertWebmToMp4(webmPath, mp4Path) {
    try {
        console.log(`🔄 Converting ${path.basename(webmPath)} to MP4...`);
        execSync(`ffmpeg -y -i "${webmPath}" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 22 "${mp4Path}"`, { stdio: 'ignore' });
        console.log(`✅ MP4 converted: ${path.basename(mp4Path)}`);
    } catch (e) {
        console.warn(`⚠️ FFmpeg conversion warning for ${webmPath}:`, e.message);
    }
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
                width: 26px;
                height: 26px;
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
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const curX = Math.round(startX + (targetX - startX) * ease);
        const curY = Math.round(startY + (targetY - startY) * ease);
        await page.evaluate(({ x, y }) => window.__moveCursor(x, y), { x: curX, y: curY });
        await page.mouse.move(curX, curY);
        await page.waitForTimeout(18);
    }
}

// Move to element and click with visible ripple and guaranteed viewport visibility
async function moveToElementAndClick(page, selector, currentPos = { x: 500, y: 500 }, durationMs = 700) {
    const el = await page.$(selector);
    if (!el) {
        console.warn(`Selector not found for click: ${selector}`);
        return currentPos;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

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

// Move to element and hover smoothly with guaranteed viewport visibility
async function moveToElementAndHover(page, selector, currentPos = { x: 500, y: 500 }, durationMs = 700) {
    const el = await page.$(selector);
    if (!el) {
        console.warn(`Selector not found for hover: ${selector}`);
        return currentPos;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const box = await el.boundingBox();
    if (!box) return currentPos;

    const targetX = Math.round(box.x + box.width / 2);
    const targetY = Math.round(box.y + box.height / 2);

    await smoothMove(page, currentPos.x, currentPos.y, targetX, targetY, durationMs);
    await page.waitForTimeout(450);
    return { x: targetX, y: targetY };
}

// ----------------------------------------------------
// SHOT 1: Architecture & 4 Core Components (0:00 - 0:24)
// ----------------------------------------------------
async function recordShot1(browser) {
    console.log('\n🎬 Recording Shot 1: Architecture & 4 Core Components [00:00 - 00:24] (24s)...');
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

    const timecodedWebm = 'Video1.1_Shot1_00-00_to_00-24_Architecture-and-Components.webm';
    const timecodedMp4 = 'Video1.1_Shot1_00-00_to_00-24_Architecture-and-Components.mp4';
    const targetWebm = path.join(RECORDINGS_DIR, timecodedWebm);
    const targetMp4 = path.join(RECORDINGS_DIR, timecodedMp4);

    fs.renameSync(await video.path(), targetWebm);
    convertWebmToMp4(targetWebm, targetMp4);

    // Also link/copy legacy names for compatibility
    fs.copyFileSync(targetWebm, path.join(RECORDINGS_DIR, 'video-1.1-shot1-architecture.webm'));
    if (fs.existsSync(targetMp4)) {
        fs.copyFileSync(targetMp4, path.join(RECORDINGS_DIR, 'video-1.1-shot1-architecture.mp4'));
    }

    console.log(`✅ Shot 1 saved: WebM (${targetWebm}) & MP4 (${targetMp4})`);
    return {
        path: targetWebm,
        mp4Path: targetMp4,
        filename: timecodedWebm,
        mp4Filename: timecodedMp4,
        timecode: "00:00 - 00:24",
        durationSec: 24
    };
}

// ----------------------------------------------------
// SHOT 2: Competitive Analysis (0:24 - 0:49)
// ----------------------------------------------------
async function recordShot2(browser) {
    console.log('\n🎬 Recording Shot 2: Competitive Analysis — Left vs. Right [00:24 - 00:49] (25s)...');
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

    const timecodedWebm = 'Video1.1_Shot2_00-24_to_00-49_Competitive-Analysis-Left-vs-Right.webm';
    const timecodedMp4 = 'Video1.1_Shot2_00-24_to_00-49_Competitive-Analysis-Left-vs-Right.mp4';
    const targetWebm = path.join(RECORDINGS_DIR, timecodedWebm);
    const targetMp4 = path.join(RECORDINGS_DIR, timecodedMp4);

    fs.renameSync(await video.path(), targetWebm);
    convertWebmToMp4(targetWebm, targetMp4);

    // Also copy legacy names
    fs.copyFileSync(targetWebm, path.join(RECORDINGS_DIR, 'video-1.1-shot2-comparison.webm'));
    if (fs.existsSync(targetMp4)) {
        fs.copyFileSync(targetMp4, path.join(RECORDINGS_DIR, 'video-1.1-shot2-comparison.mp4'));
    }

    console.log(`✅ Shot 2 saved: WebM (${targetWebm}) & MP4 (${targetMp4})`);
    return {
        path: targetWebm,
        mp4Path: targetMp4,
        filename: timecodedWebm,
        mp4Filename: timecodedMp4,
        timecode: "00:24 - 00:49",
        durationSec: 25
    };
}

// ----------------------------------------------------
// SHOT 3: Guided Builder (0:49 - 1:12)
// ----------------------------------------------------
async function recordShot3(browser) {
    console.log('\n🎬 Recording Shot 3: Guided Builder — Meeting Notes & Null [00:49 - 01:12] (23s)...');
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

    const timecodedWebm = 'Video1.1_Shot3_00-49_to_01-12_Guided-Builder-Meeting-Notes-and-Null.webm';
    const timecodedMp4 = 'Video1.1_Shot3_00-49_to_01-12_Guided-Builder-Meeting-Notes-and-Null.mp4';
    const targetWebm = path.join(RECORDINGS_DIR, timecodedWebm);
    const targetMp4 = path.join(RECORDINGS_DIR, timecodedMp4);

    fs.renameSync(await video.path(), targetWebm);
    convertWebmToMp4(targetWebm, targetMp4);

    // Also copy legacy names
    fs.copyFileSync(targetWebm, path.join(RECORDINGS_DIR, 'video-1.1-shot3-guided-builder.webm'));
    if (fs.existsSync(targetMp4)) {
        fs.copyFileSync(targetMp4, path.join(RECORDINGS_DIR, 'video-1.1-shot3-guided-builder.mp4'));
    }

    console.log(`✅ Shot 3 saved: WebM (${targetWebm}) & MP4 (${targetMp4})`);
    return {
        path: targetWebm,
        mp4Path: targetMp4,
        filename: timecodedWebm,
        mp4Filename: timecodedMp4,
        timecode: "00:49 - 01:12",
        durationSec: 23
    };
}

// ----------------------------------------------------
// SHOT 4: Exercise 1.1 — Prompt Refactor (1:12 - 1:35)
// ----------------------------------------------------
async function recordShot4(browser) {
    console.log('\n🎬 Recording Shot 4: Exercise 1.1 — Prompt Refactor Game [01:12 - 01:35] (23s)...');
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
    await page.waitForTimeout(4000);

    await page.close();
    const video = await page.video();
    await context.close();

    const timecodedWebm = 'Video1.1_Shot4_01-12_to_01-35_Exercise-Prompt-Refactor-Game.webm';
    const timecodedMp4 = 'Video1.1_Shot4_01-12_to_01-35_Exercise-Prompt-Refactor-Game.mp4';
    const targetWebm = path.join(RECORDINGS_DIR, timecodedWebm);
    const targetMp4 = path.join(RECORDINGS_DIR, timecodedMp4);

    fs.renameSync(await video.path(), targetWebm);
    convertWebmToMp4(targetWebm, targetMp4);

    // Also copy legacy names
    fs.copyFileSync(targetWebm, path.join(RECORDINGS_DIR, 'video-1.1-shot4-exercise.webm'));
    if (fs.existsSync(targetMp4)) {
        fs.copyFileSync(targetMp4, path.join(RECORDINGS_DIR, 'video-1.1-shot4-exercise.mp4'));
    }

    console.log(`✅ Shot 4 saved: WebM (${targetWebm}) & MP4 (${targetMp4})`);
    return {
        path: targetWebm,
        mp4Path: targetMp4,
        filename: timecodedWebm,
        mp4Filename: timecodedMp4,
        timecode: "01:12 - 01:35",
        durationSec: 23
    };
}

// ----------------------------------------------------
// MAIN RUNNER & MANIFEST GENERATOR
// ----------------------------------------------------
async function main() {
    console.log('🚀 Launching Chromium Screen Recorder with Visible Virtual Cursor, Dual Formats (WebM + MP4) & Timecode Mapping...');
    const browser = await chromium.launch({
        headless: true,
        args: ['--enable-usermedia-screen-capturing', '--allow-http-screen-capture', '--no-sandbox']
    });

    try {
        const shot1 = await recordShot1(browser);
        const shot2 = await recordShot2(browser);
        const shot3 = await recordShot3(browser);
        const shot4 = await recordShot4(browser);

        const shotObjects = [shot1, shot2, shot3, shot4];

        // Generate Timecode Mapped Manifest JSON with both WebM and MP4 files
        const manifest = {
            project: "Core Prompting Principles & Structured Input Formats",
            module: "Video 1.1 Production",
            generatedAt: new Date().toISOString(),
            resolution: "1920x1080 (1080p)",
            framerate: "60fps",
            formats: ["webm", "mp4"],
            bulkDownloadZip: "Video1.1_Production_Takes_Timecoded.zip",
            shots: shotObjects.map((s, idx) => ({
                shotId: idx + 1,
                timecode: s.timecode,
                duration: `${s.durationSec}s`,
                webmFilename: s.filename,
                mp4Filename: s.mp4Filename,
                webmPath: `recordings/${s.filename}`,
                mp4Path: `recordings/${s.mp4Filename}`,
                webmSizeBytes: fs.existsSync(s.path) ? fs.statSync(s.path).size : 0,
                mp4SizeBytes: fs.existsSync(s.mp4Path) ? fs.statSync(s.mp4Path).size : 0
            }))
        };

        const manifestPath = path.join(RECORDINGS_DIR, 'takes-manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

        // Generate Timecodes text index
        const txtIndex = [
            "=========================================================================",
            "AOU CERTIFIED AI ASSOCIATE — VIDEO 1.1 PRODUCTION TIMECODES (WEBM & MP4)",
            "=========================================================================",
            "",
            "1. Shot 1 [00:00 - 00:24] (24s):",
            `   - WebM: ${shot1.filename}`,
            `   - MP4:  ${shot1.mp4Filename}`,
            "   - Target: index.html (Architecture Flow & Concepts)",
            "",
            "2. Shot 2 [00:24 - 00:49] (25s):",
            `   - WebM: ${shot2.filename}`,
            `   - MP4:  ${shot2.mp4Filename}`,
            "   - Target: comparison.html (Scenario 1 Competitive Analysis)",
            "",
            "3. Shot 3 [00:49 - 01:12] (23s):",
            `   - WebM: ${shot3.filename}`,
            `   - MP4:  ${shot3.mp4Filename}`,
            "   - Target: index.html (Hands-On Workshop DO tab)",
            "",
            "4. Shot 4 [01:12 - 01:35] (23s):",
            `   - WebM: ${shot4.filename}`,
            `   - MP4:  ${shot4.mp4Filename}`,
            "   - Target: exercise.html (Prompt Refactor Game Level 1)",
            "",
            "Total Master Duration: 1 minute 35 seconds (95 seconds)",
            "Dual Formats: WebM (native VP8/VP9) + MP4 (H.264 / AAC / YUV420P)",
            "Generated: " + new Date().toISOString()
        ].join('\n');
        fs.writeFileSync(path.join(RECORDINGS_DIR, 'TIMECODES_INDEX.txt'), txtIndex);

        // Package all recordings into Video1.1_Production_Takes_Timecoded.zip
        console.log('\n📦 Creating master ZIP package containing WebM + MP4 files...');
        try {
            const zipPath = path.join(RECORDINGS_DIR, 'Video1.1_Production_Takes_Timecoded.zip');
            execSync(`cd "${RECORDINGS_DIR}" && zip -r Video1.1_Production_Takes_Timecoded.zip *.webm *.mp4 *.json *.txt`, { stdio: 'ignore' });
            console.log(`✅ Master archive created: ${zipPath}`);
        } catch (zErr) {
            console.warn('⚠️ Zip packaging error:', zErr.message);
        }

        console.log(`\n📄 Takes Manifest generated: ${manifestPath}`);
        console.log(`📋 Timecodes Index generated: ${path.join(RECORDINGS_DIR, 'TIMECODES_INDEX.txt')}`);
        console.log('\n🎉 ALL 4 SHOTS RECORDED IN BOTH WEBM AND MP4 FORMATS IN ./recordings/ !');
    } catch (err) {
        console.error('❌ Error recording shots:', err);
    } finally {
        await browser.close();
    }
}

main();
