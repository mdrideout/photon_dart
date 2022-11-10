import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
  String? _base64ManipulatedImage = "Base64 image string will be selectable here.";
  final _photonDartPlugin = PhotonDart();

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
          title: const Text('Plugin example app'),
        ),
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    _photonDartPlugin.testAlert("Testing JS Interop.");
                  },
                  child: const Text("Test alert"),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    String? receivedImage =
                        await _photonDartPlugin.wasmTest("test sending string - replace with base64 string later.");

                    setState(() {
                      _base64ManipulatedImage = receivedImage;
                    });
                  },
                  child: const Text("Process Image Via WASM"),
                ),
                const SizedBox(height: 20),
                Text('Running on: $_platformVersion\n'),
                const SizedBox(height: 20),
                SelectableText(_base64ManipulatedImage ?? "Null"),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
