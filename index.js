import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";
//import FirstPersonControls from 'FirstPersonControls.js';

const canvas = document.getElementById("canvas");
const progressDialog = document.getElementById("progress-dialog");
const progressIndicator = document.getElementById("progress-indicator");

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
camera.position = new SPLAT.Vector3(0, 0, 0);
const controls = new SPLAT.FPSControls(camera, canvas);


async function main() {
    const url = "MiestnostB.splat";
    await SPLAT.Loader.LoadAsync(url, scene, (progress) => (progressIndicator.value = progress * 100));
    progressDialog.close();

    const handleResize = () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    const frame = () => {
        controls.update(); // Aktualizujte ovládanie pred kontrolou limitov

        // Kontrola a aplikácia limitov
        if (camera.position.z > 0.9) {
            camera.position.z = 0.9;
        }
        if (camera.position.z < -0.9) {
            camera.position.z = -0.9;
        }
        if (camera.position.x > 0.9) {
            camera.position.x = 0.9;
        }
        if (camera.position.x < -0.8) {
            camera.position.x = -0.8;
        }
        // Prípadné ďalšie kontroly pre os X alebo minimálne hodnoty

        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(frame);
}

main();
