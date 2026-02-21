// BloxdVR v1.3.0 - Character Loader
import * as THREE from 'https://cdn.skypack.dev';
import { GLTFLoader } from 'https://cdn.skypack.dev/examples/jsm/loaders/GLTFLoader.js';

export class ModelLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.playerModel = null;
    }

    // Load Bob.glb from your GitHub repo
    loadPlayerModel(modelName = 'Bob') {
        const url = `https://isiguzoflorence521-gif.github.io{modelName}.glb`;

        this.loader.load(url, (gltf) => {
            this.playerModel = gltf.scene;

            // 🖐️ v1.3.0 PRO MOVE: Hide the head for the local VR player
            const head = this.playerModel.getObjectByName('head_group');
            if (head) {
                head.visible = false; 
                console.log(`BloxdVR: ${modelName}'s head hidden for VR comfort.`);
            }

            this.scene.add(this.playerModel);
            console.log(`BloxdVR: ${modelName} model injected successfully.`);
        }, 
        undefined, 
        (error) => {
            console.error('BloxdVR Model Error:', error);
        });
    }

    // Sync Bob's body to your VR Headset position
    updatePosition(xrCamera) {
        if (this.playerModel) {
            this.playerModel.position.set(
                xrCamera.position.x,
                xrCamera.position.y - 1.6, // Keep Bob's feet on the floor
                xrCamera.position.z
            );
            // Make Bob's body face where you are looking
            this.playerModel.rotation.y = xrCamera.rotation.y;
        }
    }
}
