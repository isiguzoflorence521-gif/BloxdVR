/**
 * BloxdVR v1.3.0 - Universal Input Bridge
 * Optimized for: Quest 2/3/Pro, PICO 4, and Valve Index
 */

export class InputBridge {
    constructor() {
        this.keys = {};
        this.activeButtons = new Set();
    }

    update(session, frame, refSpace) {
        for (let source of session.inputSources) {
            if (!source.gamepad) continue;

            const axes = source.gamepad.axes;
            const buttons = source.gamepad.buttons;

            // --- LEFT CONTROLLER: Movement & Sprint ---
            if (source.handedness === 'left') {
                // Joystick Movement (WASD)
                this.handleJoystick(axes[2], axes[3]); 
                
                // Sprint (Joystick Click / Button X)
                if (buttons[0]?.pressed || buttons[4]?.pressed) this.sendKey('Shift', true);
                else this.sendKey('Shift', false);
            }

            // --- RIGHT CONTROLLER: Interaction & Looking ---
            if (source.handedness === 'right') {
                // Jump (A Button - Index 4 or 0 depending on firmware)
                if (buttons[4]?.pressed || buttons[0]?.pressed) this.sendKey(' ', true);
                else this.sendKey(' ', false);

                // Mining/Attack (Trigger - Index 0)
                if (buttons[0]?.value > 0.1) {
                    this.simulateMouse(0, 'mousedown');
                    this.triggerHaptics(source, buttons[0].value);
                } else {
                    this.simulateMouse(0, 'mouseup');
                }

                // Place Block (Grip - Index 1)
                if (buttons[1]?.pressed) this.simulateMouse(2, 'mousedown');
                else this.simulateMouse(2, 'mouseup');

                // Inventory (B Button - Index 5)
                if (buttons[5]?.pressed) this.sendKey('e', true);
            }
        }
    }

    handleJoystick(x, y) {
        // Forward/Back
        if (y < -0.5) this.sendKey('w', true); else this.sendKey('w', false);
        if (y > 0.5) this.sendKey('s', true); else this.sendKey('s', false);
        // Strafe
        if (x < -0.5) this.sendKey('a', true); else this.sendKey('a', false);
        if (x > 0.5) this.sendKey('d', true); else this.sendKey('d', false);
    }

    sendKey(key, isPressed) {
        if (this.keys[key] === isPressed) return;
        this.keys[key] = isPressed;
        
        const type = isPressed ? 'keydown' : 'keyup';
        const event = new KeyboardEvent(type, { 
            key: key, 
            code: key === ' ' ? 'Space' : key,
            bubbles: true 
        });
        window.dispatchEvent(event);
    }

    simulateMouse(button, type) {
        const event = new MouseEvent(type, {
            button: button,
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.dispatchEvent(event);
    }

    triggerHaptics(source, intensity) {
        if (source.gamepad.hapticActuators && source.gamepad.hapticActuators[0]) {
            source.gamepad.hapticActuators[0].pulse(intensity * 0.5, 100);
        }
    }
}
