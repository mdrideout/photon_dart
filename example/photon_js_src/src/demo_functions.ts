import { jsTestAlert, jsWasmTest } from "./photon_dart";

export function demoTestAlert(element: HTMLButtonElement, message: string) {
  element.addEventListener("click", () => jsTestAlert(message));
}

// WASM Test - provide an image as a Base64 String
// 1. Applies the "oceanic" blue tint style filter to the image
// 2. Returns as a Base64 String for rendering
export async function demoWasmTest(
  buttonElement: HTMLButtonElement,
  afterImageElement: HTMLImageElement,
  base64Image: string,
  width: number,
  height: number
) {
  buttonElement.addEventListener("click", async () => {
    const result = await jsWasmTest(base64Image, width, height);
    afterImageElement.src = result;
  });
}
