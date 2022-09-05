import 'package:jwt_decoder/jwt_decoder.dart';

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'apphomepagefunction.dart';
import 'coursescreen.dart';
import 'notenrolledcourses.dart';

class courselist extends StatefulWidget {
  const courselist({Key? key, required this.jwt}) : super(key: key);
  final String jwt;


  // factory courselist.fromBase64(String jwt) =>
  //     courselist(
  //         jwt,
  //         json.decode(
  //             ascii.decode(
  //                 base64.decode(base64.normalize(jwt.split(".")[1]))
  //             )
  //         ), jwt: '$jwt', payload: {payload},
  //     );


  @override
  State<courselist> createState() => _courselistState();
}

class _courselistState extends State<courselist> {
  CourseClass classService = CourseClass();
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
          future: classService.getenrolledClasses(),
          builder: (context,snapshot) {
            print(snapshot.data);
            if (snapshot.hasData) {
              return ListView.builder(
                  itemCount: snapshot.data?.length, itemBuilder: (context, i) {
                return GestureDetector(
                  onTap:() async {
                    var vta = await atgta(snapshot.data![i]['_id'].toString());
                    var va = await atga(snapshot.data![i]['_id'].toString(), JwtDecoder.decode(widget.jwt)["_id"]);
                    print("wwwwwwwwwwwwwwwwwwwwww");
                    print(va);

                    Navigator.push(context,
                        MaterialPageRoute(builder: (context)=>AttendanceDetails(k: i, ta: int.parse(va), a: int.parse(vta), tName: 'Rajesh', cName: 'MAB 303',)));},//(k : int.parse(snapshot.data![i]['id'])))),
                  child: Card(
                    child: ListTile(
                      title: Text(snapshot.data![i]['module'].toString(),
                        style: TextStyle(
                            fontSize: 30
                        ),),
                      subtitle: Text("", style: TextStyle(
                          fontSize: 30
                      ),),
                    ),
                  ),
                );
              });
            }
            else {
              return Center(
                child: Text("You Have Not Enrolled In Any Courses"),
              );
            }
          },
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        elevation: 4.0,
        icon: const Icon(Icons.add),
        label: const Text('Enroll'),
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => noncourselist(jwt: widget.jwt)),
          );
        },
      ),

    );
  }
}
