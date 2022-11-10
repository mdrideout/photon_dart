import 'package:plugin_platform_interface/plugin_platform_interface.dart';

import 'photon_dart_method_channel.dart';

abstract class PhotonDartPlatform extends PlatformInterface {
  /// Constructs a PhotonDartPlatform.
  PhotonDartPlatform() : super(token: _token);

  static final Object _token = Object();

  static PhotonDartPlatform _instance = MethodChannelPhotonDart();

  /// The default instance of [PhotonDartPlatform] to use.
  ///
  /// Defaults to [MethodChannelPhotonDart].
  static PhotonDartPlatform get instance => _instance;

  /// Platform-specific implementations should set this with their own
  /// platform-specific class that extends [PhotonDartPlatform] when
  /// they register themselves.
  static set instance(PhotonDartPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }

  /// Functions that should be implemented by platform specific interfaces:

  /// Test Alert
  void testAlert(String alertMessage) {
    throw UnimplementedError('testAlert() has not been implemented on this platform. This is a web-only plugin.');
  }

  /// WASM Test
  Future<String?> wasmTest(String base64Image) {
    throw UnimplementedError('wasmTest() has not been implemented on this platform. This is a web-only plugin.');
  }

  /// Get Platform Version
  Future<String?> getPlatformVersion() {
    throw UnimplementedError('platformVersion() has not been implemented on this platform. This is a web-only plugin.');
  }
}
