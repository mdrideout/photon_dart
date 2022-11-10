@JS() // sets the context, in this case being `window`
library main; // required library declaration

import 'package:js/js.dart';

/// Test Alert
/// Test function to check that the JS has loaded
@JS('jsTestAlert')
external void jsTestAlert(String alertMessage);

/// WASM Test
/// A test of the Photon WASM functionality
/// Provide an image in base64 string format, and the WASM image
/// processor will apply a filter and return the image in base64 string format.
@JS('jsWasmTest')
external Future<String> jsWasmTest(String base64Image, int width, int height);
