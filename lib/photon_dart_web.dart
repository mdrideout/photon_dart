// In order to *not* need this ignore, consider extracting the "web" version
// of your plugin as a separate package, instead of inlining it in the same
// package as the core of your plugin.
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html show window;

import 'package:flutter/foundation.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:js/js_util.dart';
import 'package:photon_dart/js_interop.dart';

import 'photon_dart_platform_interface.dart';

/// A web implementation of the PhotonDartPlatform of the PhotonDart plugin.
class PhotonDartWeb extends PhotonDartPlatform {
  /// Constructs a PhotonDartWeb
  PhotonDartWeb();

  static void registerWith(Registrar registrar) {
    PhotonDartPlatform.instance = PhotonDartWeb();
  }

  /// Test Alert
  @override
  void testAlert(String alertMessage) {
    debugPrint("Calling jsTestAlert JavaScript method with message $alertMessage");
    jsTestAlert(alertMessage);
  }

  /// WASM Test
  @override
  Future<String?> wasmTest(String base64Image, int width, int height) async {
    debugPrint("Calling jsWasmTest JavaScript method.");
    return await promiseToFuture(jsWasmTest(base64Image, width, height));
  }

  /// Returns a [String] containing the version of the platform.
  @override
  Future<String?> getPlatformVersion() async {
    final version = html.window.navigator.userAgent;
    return version;
  }
}
