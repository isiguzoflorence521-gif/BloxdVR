// scripts/camera-mod.js
export function syncVRHeadset(frame, xrRefSpace) {
    const pose = frame.getViewerPose(xrRefSpace);

    if (pose) {
        for (let view of pose.views) {
            // View.transform.orientation contains your head rotation
            // We apply this to the Bloxd camera object
            const headRotation = view.transform.orientation;
            
            // Note: In your injector, you will point 'window.bloxdCamera' 
            // to this headRotation data.
        }
    }
}
