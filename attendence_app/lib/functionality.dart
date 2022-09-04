import 'package:web_socket_channel/io.dart';
import 'package:flutter/material.dart';


void sendMessage(msg) {
  IOWebSocketChannel? channel;
  // We use a try - catch statement, because the connection might fail.
  try {
    // Connect to our backend.
    channel = IOWebSocketChannel.connect('ws://localhost:3000');
  } catch (e) {
    // If there is any error that might be because you need to use another connection.
    print("Error on connecting to websocket: $e");
  }
  // Send message to backend
  channel?.sink.add(msg);

  // Listen for any message from backend
  channel?.stream.listen((event) {
    // Just making sure it is not empty
    if (event!.isNotEmpty) {
      print(event);
      // Now only close the connection and we are done here!
      channel!.sink.close();
    }
  });
}