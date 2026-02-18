// libs/logger.js
export function vrLog(message) {
    const logContainer = document.getElementById('vr-console-log');
    if (logContainer) {
        const entry = document.createElement('div');
        entry.textContent = `[BloxdVR] ${message}`;
        logContainer.prepend(entry);
    }
    console.log(`[BloxdVR] ${message}`);
}
