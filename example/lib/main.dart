import 'dart:async';
import 'dart:convert';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:photon_dart/photon_dart.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _platformVersion = 'Unknown';
  final _photonDartPlugin = PhotonDart();

  final double imageDimensions = 800;

  // Image related
  final ImagePicker imagePicker = ImagePicker();
  XFile? pickedImage;
  ui.Image? dartImage;
  Uint8List? imageBytes;
  String? imageBase64;

  // Converted image vars
  ui.Image? convertedDartImage;
  Uint8List? convertedImageBytes;

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    String platformVersion;
    // Platform messages may fail, so we use a try/catch PlatformException.
    // We also handle the message potentially returning null.
    try {
      platformVersion = await _photonDartPlugin.getPlatformVersion() ?? 'Unknown platform version';
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Photon WASM Example App'),
        ),
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 40),
                const Text(
                    "This is meant for Flutter Web only. iOS and Android do not have the image processing speed issues of dart web."),
                const SizedBox(height: 20),
                Text('Running on: $_platformVersion\n'),
                const SizedBox(height: 20),
                OutlinedButton(
                  onPressed: () {
                    _photonDartPlugin.testAlert("Testing JS Interop.");
                  },
                  child: const Text("Test JS Interop"),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    final XFile? image = await imagePicker.pickImage(source: ImageSource.gallery);

                    if (image != null) {
                      debugPrint("Picked Image ${image.path}");

                      // Read as bytes
                      Uint8List bytes = await image.readAsBytes();

                      // Create base64 version
                      String base64 = base64Encode(bytes);

                      // Create Dart image version
                      ui.Image decoded = await decodeImageFromList(bytes);

                      setState(() {
                        pickedImage = image;
                        imageBytes = bytes;
                        imageBase64 = base64;
                        dartImage = decoded;
                      });
                    }
                  },
                  child: const Text("Pick An Image"),
                ),
                if (pickedImage != null) ...[
                  const SizedBox(height: 20),
                  SizedBox(height: imageDimensions, width: imageDimensions, child: Image.network(pickedImage!.path)),
                  if (imageBytes != null) Text("Size: ${(imageBytes!.lengthInBytes * 0.000001).toStringAsFixed(2)} MB"),
                  if (dartImage != null) Text("Width: ${dartImage!.width}px, Height: ${dartImage!.height}px"),
                ],
                if (imageBase64 != null && dartImage != null) ...[
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () async {
                      String? receivedImage =
                          await _photonDartPlugin.wasmTest(imageBase64!, dartImage!.width, dartImage!.height);

                      if (receivedImage == null) {
                        debugPrint("Image failed to process via WASM. Null data received.");
                        return;
                      }

                      // Read the Base64 URI format returned from Photon (image/jpeg;base64,[base64...])
                      UriData? uriData = Uri.parse(receivedImage).data;

                      if (uriData == null) {
                        debugPrint("Failed to parse data from the Base64 Image Uri.");
                        return;
                      }

                      // Read as bytes
                      Uint8List bytes = uriData.contentAsBytes();

                      // Create Dart image version
                      ui.Image decoded = await decodeImageFromList(bytes);

                      setState(() {
                        convertedImageBytes = bytes;
                        convertedDartImage = decoded;
                      });
                    },
                    child: const Text("WASM Blue Filter"),
                  ),
                ],
                if (convertedImageBytes != null) ...[
                  const SizedBox(height: 20),
                  SizedBox(height: imageDimensions, width: imageDimensions, child: Image.memory(convertedImageBytes!)),
                  Text("Size: ${(convertedImageBytes!.lengthInBytes * 0.000001).toStringAsFixed(2)} MB"),
                  if (convertedDartImage != null)
                    Text("Width: ${convertedDartImage!.width}px, Height: ${convertedDartImage!.height}px"),
                ],
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
