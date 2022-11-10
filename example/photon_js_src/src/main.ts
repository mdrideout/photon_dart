import "./style.css";
import { originalImageBase64 } from "./original_image";
import { demoTestAlert, demoWasmTest } from "./demo_functions";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Photon WASM Demo</h1>
    <div class="card">
      <button id="alert-test" type="button">Alert Test</button>
      <br /><br />
      <button id="photon-test" type="button">Photon Test</button>
      <br /><br />
      The photon test will log a base64 image string of the transformed image.
      <br /><br />
      <div>
        Before:</br >
        <img src="data:image/jpeg;base64,${originalImageBase64}" />
      </div>
      <div>
        After:</br >
        <img id="after-photo" />
      </div>
    </div>
    <p class="read-the-docs">
      <a href="https://silvia-odwyer.github.io/photon/guide/using-photon-web/" target="_blank">Photon Docs</a>
    </p>
  </div>
`;

demoTestAlert(document.querySelector<HTMLButtonElement>("#alert-test")!, "Alert Test");

demoWasmTest(
  document.querySelector<HTMLButtonElement>("#photon-test")!,
  document.querySelector<HTMLImageElement>("#after-photo")!,
  originalImageBase64,
  200,
  180
);
