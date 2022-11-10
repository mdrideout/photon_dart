import 'photon_dart_platform_interface.dart';

class PhotonDart {
  void testAlert(String alertMessage) {
    return PhotonDartPlatform.instance.testAlert(alertMessage);
  }

  /// WASM Test
  /// Provide a [base64Image] string as well as its [width] and [height]
  /// and receive back the image tinted blue by the Photon WASM image processor.
  Future<String?> wasmTest(String base64Image, int width, int height) async {
    return await PhotonDartPlatform.instance.wasmTest(
      base64Image,
      width,
      height,
    );
  }

  Future<String?> getPlatformVersion() {
    return PhotonDartPlatform.instance.getPlatformVersion();
  }
}
