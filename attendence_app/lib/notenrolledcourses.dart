import 'package:jwt_decoder/jwt_decoder.dart';

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'apphomepagefunction.dart';
import 'coursescreen.dart';
import 'enrollpage.dart';

class noncourselist extends StatefulWidget {
  const noncourselist({Key? key, required this.jwt}) : super(key: key);
  final String jwt;
  @override
  State<noncourselist> createState() => _noncourselistState();
}

class _noncourselistState extends State<noncourselist> {
  //CourseClass2 classService = CourseClass2();
  Future<List> getnonenrolledClasses() async {
  try {
  var response = await http.get(Uri.parse("http://10.0.2.2:5000/course/getenrolledcourses"));



  // print(response);
  if (response.statusCode == 200) {
  //    print(jsonDecode(response.body));
  return jsonDecode(response.body);
  }
  else {
  return Future.error('Server Error');
  }
  }
  catch (e) {
  return Future.error(e);
  }
  }

  GetRequiredAttendenceNode gta = GetRequiredAttendenceNode();
  Future<String> atgta(String rid) async {
    var res = await http.post(Uri.parse("http://10.0.2.2:5000/attendence/gettotalattendence"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"classId": rid}));
    if (res.statusCode == 200) return res.body.toString();
    return "0";
  }
  Future<String> atga(String rid, String sid) async {
    var res = await http.post(Uri.parse("http://10.0.2.2:5000/attendence/getattendence"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"classId": rid,
          "studentId" : sid}));
    if (res.statusCode == 200) return res.body.toString();
    return "9";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueGrey,
          title: Text("Your Classes"),

        ),
        body: Container(
          child: FutureBuilder<List>(
            future: getnonenrolledClasses(),
            builder: (context,snapshot) {
              //print(snapshot.data);
              if (snapshot.hasData) {
                return ListView.builder(
                    itemCount: snapshot.data?.length, itemBuilder: (context, i) {
                  return GestureDetector(
                    onTap:() async {


                      Navigator.push(context,
                          MaterialPageRoute(builder: (context)=>courseenroll(Cid: snapshot.data![i]['_id'].toString(), Sid: JwtDecoder.decode(widget.jwt)["_id"],)));},//(k : int.parse(snapshot.data![i]['id'])))),
                    child: Card(
                      child: ListTile(
                        title: Text(snapshot.data![i]['module'].toString(),
                          style: TextStyle(
                              fontSize: 30
                          ),),
                        subtitle: Text(snapshot.data![i]['key'].toString(), style: TextStyle(
                            fontSize: 30
                        ),),
                      ),
                    ),
                  );
                });
              }
              else {
                return Center(
                  child: Text("You Are Enrolled In Every Course, maybe chill a little "),
                );
              }
            },
          ),
        )
    );
  }
}
