import 'package:attendence_app/loginpage.dart';
import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';
import 'package:attendence_app/functionality.dart';
import 'apphomepage.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert' show json, base64, ascii;




//const SERVER_IP = 'http://10.0.2.2:5000';
const SERVER_IP = "http://10.0.2.2:5000";
final storage = FlutterSecureStorage();


void main() {
  runApp( MaterialApp(
    debugShowCheckedModeBanner: false,
  home: LoginPage(),

  //courselist(),
  ));
}

