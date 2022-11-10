import 'photon_dart_platform_interface.dart';

class PhotonDart {
  void testAlert(String alertMessage) {
    return PhotonDartPlatform.instance.testAlert(alertMessage);
  }

  Future<String?> wasmTest(String base64Image) async {
    return await PhotonDartPlatform.instance.wasmTest(base64Image);
  }

  Future<String?> getPlatformVersion() {
    return PhotonDartPlatform.instance.getPlatformVersion();
  }
}
