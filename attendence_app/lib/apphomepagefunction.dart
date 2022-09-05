import 'dart:convert';
import 'dart:core';
import 'dart:core';
import 'package:http/http.dart' as http;

class CourseClass {
  //String baseUrl = "http://10.0.2.2:8000/demobackend/courses/";
  String baseUrl = "http://10.0.2.2:5000/course/getcourses";
  Future<List> getenrolledClasses() async {
    try {
      var response = await http.get(Uri.parse(baseUrl));
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
}




class GetAttendence {


  String baseUrl = "http://10.0.2.2:8000/demobackend/courses/";

  Future<List> getClassInfo(int cid) async {
    try {

      var response = await http.get(Uri.parse(baseUrl));
      //print(baseUrl+(cid.toString()));
      if (response.statusCode == 200) {
        // print(response.body);
         //print(jsonDecode(response.body));
        return jsonDecode(response.body);
      }
      else {
        return Future.error('Server Error');
      }
    }
    catch (e) {
      return Future.error(e);
    }
  }}


class GetRequiredAttendence {
  String getra(int totald,int presentd )  {
    if ((presentd/totald)*100<=75)
      {
         if ((totald*(0.75)-(presentd))<10)
           {
             return ((totald*(0.75)-(presentd)).toString().substring(0,1));
           }
         else {
           return ((totald * (0.75) - (presentd)).toString().substring(0,2));
         }
      }
    else
      {
        return "0";
      }
  }}

class GetRequiredAttendenceP {
  String getp(int totald,int presentd )  {
    if ((presentd/totald)*100<=10)
    {
      return (((presentd/totald)*100).toString().substring(0,3));
    }
    else if ((presentd/totald)*100>99.9)
      {
        return (((presentd/totald)*100).toString().substring(0,3));
      }
    else
    {
      return (((presentd/totald*100)).toString().substring(0,4));
    }
  }}

class GetRequiredAttendenceNode {

  String baseUrl = "http://10.0.2.2:5000/attendence/gettotalattendence";

  Future<int> getAttendenceTotal(String cid) async {
    try {

      var response = await http.post(Uri.parse(baseUrl),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({
      "_id" : cid
    }));
      //print(baseUrl+(cid.toString()));
      if (response.statusCode == 200) {
        // print(response.body);
        //print(jsonDecode(response.body));
        return jsonDecode(response.body);
      }
      else {
        return Future.error('Server Error');
      }
    }
    catch (e) {
      return Future.error(e);
    }
  }}