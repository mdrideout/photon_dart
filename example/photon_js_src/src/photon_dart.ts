export function jsTestAlert(message: string) {
  alert(message);
}

// WASM Test - provide an image as a Base64 String
// 1. Applies the "oceanic" blue tint style filter to the image
// 2. Returns as a Base64 String for rendering
export async function jsWasmTest(base64Image: string, width: number, height: number) {
  console.log(`[jsWasmTest] Starting photon for image with dimensions of width: ${width}, height: ${height}`);

  return new Promise<string>((resolve, reject) => {
    import("@silvia-odwyer/photon")
      .then((photon) => {
        console.log(`[jsWasmTest] Photon started.`);

        // Get the image type from the Base64 String
        const imageTypeId = base64Image.charAt(0);
        let getImageType = () => {
          switch (imageTypeId) {
            case "/":
              return "image/jpeg";
            case "i":
              return "image/png";
            case "R":
              return "image/gif";
            case "U":
              return "image/webp";
            default:
              return "image/jpeg";
          }
        };

        const imageType = getImageType();

        // Set up image
        const originalImage = new Image();
        originalImage.src = `data:${imageType};base64,${base64Image}`;

        originalImage.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext("2d")!;

          // Draw the image element onto the canvas
          ctx.drawImage(originalImage, 0, 0);

          // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
          let image = photon.open_image(canvas, ctx);

          // Filter the image, the PhotonImage's raw pixels are modified
          photon.filter(image, "oceanic");

          // Place the modified image back on the canvas
          photon.putImageData(canvas, ctx, image);

          // Convert to a base64 string
          const dataURL = canvas.toDataURL(imageType, 0.8);

          // Remove the canvas from the DOM
          canvas.remove();

          // Log the new image string
          let clippedString = dataURL.substring(0, 100);
          console.log(`[jsWasmTest] Processed image: ${clippedString}... (clipped string)`);

          resolve(dataURL);
        };
      })
      .catch((e) => {
        console.error("Error loading photon module", e);
        reject(e);
      });
  });
}
