// libs/vr-helper.js
export const VRHelper = {
    detectHeadset: () => {
        const ua = navigator.userAgent;
        if (ua.includes("OculusBrowser")) return "Meta Quest";
        if (ua.includes("Valve")) return "Valve Index";
        return "Generic WebXR Device";
    },
    
    vibrate: (session, intensity = 1.0, duration = 50) => {
        session.inputSources.forEach(source => {
            if (source.gamepad && source.gamepad.hapticActuators) {
                source.gamepad.hapticActuators[0].pulse(intensity, duration);
            }
        });
    }
};
