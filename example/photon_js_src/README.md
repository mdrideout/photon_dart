# Photon WASM Javascript Source

The [Photon WASM library](https://silvia-odwyer.github.io/photon/guide/using-photon-web/) is an npm based JavaScript and WASM package.
The image processor functionality is based in Rust and is compiled to Web Assembly. The npm package is an easy to use JavaScript wrapper API for the WASM module.
The JavaScript executes image processing commands against the WASM package to make rapid alterations to images.

The package's features can be made available to Dart and Flutter applications so they may leverage the fast image processing speeds of Photon's WASM module.

This npm source project includes an html demo showing a base64 string based image file being processed by the Photon WASM library, running on [Vite](https://vitejs.dev/).
The demo is powered by a vite server.

## Running the npm demo:

Go to `photon_js_src` folder. This is the html / JavaScript source and demo of the npm WASM functionality.

```bash
# start the vite server, then visit the indicated URL to test the image processing.
$ npm start dev
```

# Installation For Your Flutter App

### 1. Install photon_dart

Add the photon_dart package to your Flutter app's pubspec.yaml

### 2. Add photon_js_src folder to Flutter project root

This npm package src folder `photon_js_src` must be placed in the root directory of your flutter project
in order for the vite build output to be properly placed in the Flutter project's web directory. `<project_root>/photon_js_src`.

### 3. Build the JavaScript source for compatibility with Dart

The photon_dart package utilizes the [js dart package](https://pub.dev/packages/js) to provide a platform interface between dart commands and external JavaScript commands.

By default, the npm photon wasm library is not compatible with the JavaScript convention requirements of the js dart package. So we use [Vite](https://vitejs.dev/) to build our
TypeScript project into JavaScript files with compatibility.

**vite.config.js** is configured to build directly to the Flutter project's **web** directory.

**Execute the build command from the `photon_js_src` folder**

```bash
# cd into the source folder
$ cd photon_js_src

# Install node modules
$ npm install

# Run the vite build process
$ npm run build
```

You should find the build's output inside the Flutter project's `web` folder, at `web/photon_js_dist`.

### 4. Add the \<script> tag to the Flutter project's index.html

Open the `web/index.html` file and add the following `<script>` tag before the `flutter.js` script tag.

**Example**

```html
<!-- This script contains the functions executable against Photon -->
<script src="photon_js_dist/index.js"></script>

<!-- This script adds the flutter initialization JS code -->
<script src="flutter.js" defer></script>
```

You will need to stop any app instance and rebuild for web anytime changes are made to the `web` folder. Hot restart will not reflect the changes.

### 5. Pass a base64 encoded image to a photon_dart function

[TODO] add more example instructions
