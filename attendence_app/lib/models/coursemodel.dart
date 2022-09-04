class CourseModel {
  final String url;
  final String courseName;
  final String tName;
  final String cid;
  final int atten;
  final int totaldays;


  CourseModel(
      {
        required this.url,
  required this.courseName,
  required this.tName,
  required this.cid,
  required this.atten,
  required this.totaldays,
       });


  Map<String, dynamic> getJson() {
    return {
      'url' : url,
      'courseName' : courseName,
      'tName' : tName,
      'cid' : cid,
      'atten' : atten,
      'totaldays' : totaldays,
    };
  }

  factory CourseModel.getModelFromJson({ required Map<String,dynamic> json}) {
    return CourseModel(url: json["url"], courseName: json["courseName"], tName: json["tName"], cid: json["cid"], atten: json["atten"], totaldays: json["totaldays"] );
  }

}