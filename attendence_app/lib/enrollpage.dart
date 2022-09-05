import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' show ascii, base64, json, jsonDecode, jsonEncode;

class courseenroll extends StatefulWidget {
  const courseenroll({Key? key, required this.Cid, required this.Sid}) : super(key: key);
  final String Cid;
  final String Sid;
  @override
  State<courseenroll> createState() => _courseenrollState();
}

class _courseenrollState extends State<courseenroll> {
  final TextEditingController _enrollcourseController = TextEditingController();



  Future<String?> attemptEnroll(String eid,String cid, String sid) async {
    var res = await http.post(Uri.parse("http://10.0.2.2:5000/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"classId":cid, "studentId": sid, "enrollKey": eid }));
    if (res.statusCode == 200) return res.body;
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(

      ),
      body: Container(
        child: Center(
          child: Column(
            children: [
              Row(
                children: [
                  SizedBox(
                    height: 20,
                    width: 200,
                    child: Text("Enter Enroll Key"),
                  ),
                  SizedBox(
                    child: TextField(
                      controller: _enrollcourseController,
                      decoration: InputDecoration(labelText: 'eid'),
                    ),

                  ),
                  TextButton(onPressed: () async {
                    //var eid = _enrollcourseController.text;
                    var cid =   widget.Cid;
                    var res = attemptEnroll(_enrollcourseController.text, cid, widget.Sid);
                    if (res==null)

                             Navigator.pop(context);



                  },
                      child: Text("Log In")),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
