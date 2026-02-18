// scripts/input-bridge.js
export function bridgeVRInput(session) {
    const inputSources = session.inputSources;

    for (let source of inputSources) {
        if (source.gamepad) {
            const axes = source.gamepad.axes; 
            // axes[2] = horizontal, axes[3] = vertical thumbstick

            if (axes[3] < -0.5) simulateKey('w');
            if (axes[3] > 0.5)  simulateKey('s');
            if (axes[2] < -0.5) simulateKey('a');
            if (axes[2] > 0.5)  simulateKey('d');
        }
    }
}

function simulateKey(key) {
    const event = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(event);
}
