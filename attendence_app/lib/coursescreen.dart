import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'apphomepagefunction.dart';
import 'coursescreen.dart';






class AttendanceDetails extends StatelessWidget {
   AttendanceDetails({Key? key, required this.k, required this.ta, required this.a, required this.tName, required this.cName}) : super(key: key);
  final int k;
  final int ta;
  final int a;
  final String tName;
  final String cName;

   Future<String> getreqta(String cid) async {
     var res = await http.post(
         Uri.parse("http://10.0.2.2:5000/attendence/gettotalattendence"),
         headers: {"Content-Type": "application/json"},
         body: jsonEncode({
           "id": cid
         })
     );
    // print("#@#@#@#@#@#@#");
    // print(res.body);
     return jsonEncode(res.body);
   }
   Future<String> getreqa(String cid) async {
     var res = await http.post(
         Uri.parse("http://10.0.2.2:5000/attendence/getattendence"),
         headers: {"Content-Type": "application/json"},
         body: jsonEncode({
           "id": cid
         })
     );

     return jsonEncode(res.body);
   }
     // if(res.statusCode == 200) return res.body;
     // return null;
  String baseUrl = "http://10.0.2.2:5000/attendence/gettotalattendence";


  CourseClass classService = CourseClass();
  //GetRequiredAttendence att = GetRequiredAttendence();
 // GetRequiredAttendenceP attp = GetRequiredAttendenceP();
  GetRequiredAttendence att = GetRequiredAttendence();
  GetRequiredAttendenceP attp = GetRequiredAttendenceP();
  @override
  Widget build(BuildContext context) {

    int j = k;
    // var jwt = getreqta(snapshot.data![j]['id']);
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueGrey,
          title: Text("Your Attendence"),

        ),
        body: Container(
          child: FutureBuilder<List>(
            future: classService.getenrolledClasses(),
            builder: (context,snapshot) {
             // print(snapshot.data);
              if (snapshot.hasData) {
                return ListView.builder(
                    itemCount: 1, itemBuilder: (context, i) {
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                            children: [
                              SizedBox(
                                height: 45,
                                width: 100,
                              ),
                              SizedBox(
                                height: 70,
                                width: 190,
                                child: Container(
                                  padding: EdgeInsets.only(right: 10),
                                  width: 250,
                                  child: Text(ta.toString() + "/" + a.toString(), style: TextStyle(fontSize: 60, fontWeight: FontWeight.bold),),
                                ),
                              ),
                              SizedBox(
                                height: 50,
                                width: 250,
                                child: Container(
                                  padding: EdgeInsets.only(left: 150),
                                  child : Text("Days", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),),
                                )
                              ),
                              Container(
                                height: 5,
                                color: Colors.black,
                                width: 380,
                              ),
                              Container(
                                padding: EdgeInsets.only(left: 40, top: 10),
                                height: 100,
                                width: 300,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    SizedBox(
                                      height: 50,
                                      width: 93,
                                      child: Text("Attendance Percentage", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),),
                                    ),
                                    Container(
                                      padding: EdgeInsets.only(right: 20),
                                      height: 70,
                                      color: Colors.black,
                                      width: 2,
                                    ),
                                    SizedBox(
                                      height: 50,
                                      width: 120,
                                      child: Text("Attendance Required", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                padding: EdgeInsets.only(right: 20),
                                height: 2,
                                color: Colors.black,
                                width: 350,
                              ),
                              Container(
                                padding: EdgeInsets.only(left: 40, top: 10),
                                height: 100,
                                width: 300,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    SizedBox(
                                      height: 50,
                                      width: 93,
                                      child: Text(attp.getp(a, ta) + " %", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),),
                                    ),
                                    Container(
                                      padding: EdgeInsets.only(right: 20),
                                      height: 70,
                                      color: Colors.black,
                                      width: 2,
                                    ),
                                    SizedBox(
                                      height: 40,
                                      width: 120,
                                      child: Text(att.getra(a, ta) + " Days", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 26),),
                                    ),
                                  ],
                                ),
                              ),
                              // Container(
                              //   height: 25,
                              //   width: 250,
                              //   color: Colors.black,
                              // ),
                              Container(
                                height: 60,
                                padding: EdgeInsets.only(right: 265, top: 20),
                                child: Text("Teacher : ", style: TextStyle(fontSize: 25, fontWeight: FontWeight.w400),),

                              ),
                              Container(
                                height: 80,
                                width: 300,
                                padding: EdgeInsets.only(left: 30, top: 15),
                                child: Text(tName, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),),
                              ),
                              Container(
                                height: 60,
                                padding: EdgeInsets.only(right: 230, top: 20),
                                child: Text("Class Room : ", style: TextStyle(fontSize: 23, fontWeight: FontWeight.w400),),

                              ),
                              Container(
                                height: 80,
                                width: 300,
                                padding: EdgeInsets.only(left: 40, top: 17),
                                child: Text(cName, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),),),



                            ],
                          )
                        ],
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
        )
    );
  }
}
