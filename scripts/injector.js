// scripts/injector.js
import { BloxdVRHandler } from './vr-handler.js';

window.addEventListener('load', () => {
    console.log("BloxdVR: Injecting into Bloxd.io...");
    
    const vrManager = new BloxdVRHandler();
    vrManager.initVR();
});
