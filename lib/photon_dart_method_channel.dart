import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import 'photon_dart_platform_interface.dart';

/// An implementation of [PhotonDartPlatform] that uses method channels.
class MethodChannelPhotonDart extends PhotonDartPlatform {
  /// The method channel used to interact with the native platform.
  @visibleForTesting
  final methodChannel = const MethodChannel('photon_dart');

  @override
  void testAlert(String alertMessage) {
    methodChannel.invokeMethod<void>('testAlert', alertMessage);
    return;
  }

  @override
  Future<String?> wasmTest(String base64Image) async {
    final updatedBase64Image = await methodChannel.invokeMethod<String>('wasmTest', base64Image);
    return updatedBase64Image;
  }

  @override
  Future<String?> getPlatformVersion() async {
    final version = await methodChannel.invokeMethod<String>('getPlatformVersion');
    return version;
  }
}
