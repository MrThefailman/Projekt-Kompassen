//GETCOURSES
function GetCourses() {
    $.get("/api/courses", function (data) {

        $.each(data, function (i, course) {


            $("#courseListTable .courseList", function () {
                $(".courseList").append("<tr><td>" + course.name + "</td><td>"
                    + course.credits + "</td><td>" + course.students.length
                    + "</td><td>" + course.year
                    + "</td><td>" + course.term
                    + "</td><td><button type='button' value='aktiv' class='btn btn-success'data-id='" + course.active + "'>Aktiv</button>"

                    + "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
                    + course.id + "'" + ">Redigera</button>" + "</td></tr>");

            });
        });
    });
}
// GETSTUDENTS
function GetStudents() {

    $.get("/api/students", function (data) {
        $.each(data, function (i, Students) {
            var studentCourses = [];
            var activeStudent = 0;
            $.each(Students.courses, function (i, Courses) {
                studentCourses.push(Courses.name);
            });
            if (Students.active === true) {
                activeStudent = "<button type='button' value='aktiv' class='btn btn-success' data-id='" + Students.id + "'>Aktiv</button>";
            }
            if (Students.active === false) {
                activeStudent = "<button type='button' value='aktiv' class='btn btn-danger' data-id='" + Students.id + "'>Inaktiv</button>";
            }
            
            $("#studentListTable tbody").append("<tr><td>" + Students.firstName + "</td><td>" + Students.lastName
                + "</td><td>" + Students.ssn + "</td><td>" + studentCourses + "</td><td></td><td>"+ activeStudent 
                + "</td></tr>");

            
        
        });
        //$("#studentListTable tbody button").click(function (event) {
        //    event.preventDefault();
        //   console.log("Klicked");
        //    var StudentsId = $(this).attr("data-id");         
        //    $.ajax({
        //        type: "GET",
        //        url: "/api/students/" + StudentsId
        //    }).done(function (dat) {
        //        dat.active = !dat.active;
        //        $.ajax({
        //            headers: {
        //                'Accept': 'application/json; charset=utf-8',
        //                'Content-Type': 'application/json; charset=utf-8'
        //            },
        //            'type': 'POST',
        //            'url': "/api/students",
                   
        //            'success': function (dat) {
        //                students.courses.find(id);
        //                console.log("Student inactivated: " + dat);
        //            }
        //        });
        //    });
        //});
        }); 
}


// DOCUMENT READY STARTS HERE
$(document).ready(function () {
    GetCourses();
    GetStudents();
    //Posting new student
    $("#studentListAddStudentForm :button").on('click', function (e) {
        e.preventDefault();
        $.ajax({
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            'type': 'POST',
            'url': "/api/students/",
            'data': JSON.stringify($("#studentListAddStudentForm").serializeObject()),
            'success': function (data) {
                console.log(data);
                $(".studentlist").empty();

            }
        });
    });

    // GET för att hämta studenterna till dropdown-lista för kurs-fliken.
    $.get("/api/students", function (data) {
        $.each(data, function (j, student) {
            $("#courseDetailsStudentSelectList").append("<option value=" + student.id + ">" + student.firstName + " " + student.lastName + "</option>");

            $('#registerSelectedStudentButton').on('click', function () {
                $("#courseDetailsStudentSelectList option:selected").remove();
                $('#courseDetailsStudentListPlaceholder').append('<p>' + this.firstName + " " + this.lastName + '</p>');
            });
        });

        // Post New students
        $("#studentListAddStudentForm :button").on('click', function (e) {
            e.preventDefault();
            $.ajax({
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                'type': 'POST',
                'url': "/api/students/",
                'data': JSON.stringify($("#studentListAddStudentForm").serializeObject()),
                'success': function (data) {
                    console.log(data);
                    $(".studentlist").empty();
                    GetStudents();
                }
            });
        });

        // EDIT COURSES
        $(document).on('click', ".courseList tr td button", function (e) {
            e.preventDefault(e);
            var cId = $(this).attr("data-id");
            $.ajax({
                type: 'GET',
                url: '/api/courses/' + cId
            }).done(function (courses) {
                //$("#courseDetailsStudentListPlaceholder").empty();
                $("#courseDetailsPlaceholder").show();
                
                $("#courseDetailsPlaceholder :input[name='id']").val(courses.id);
                $("#courseDetailsPlaceholder :input[name='name']").val(courses.name);
                $("#courseDetailsPlaceholder :input[name='credits']").val(courses.credits);
                $("#courseDetailsPlaceholder :input[name='year']").val(courses.year);
                $("#courseDetailsPlaceholder :input[name='term']").val(courses.term);
                $("#courseDetailsPlaceholder :input[name='active']").val(courses.active);
                

                });
            $.get("/api/courses", function (i,data) {
                $.each(data, function (Courses) {
                    var courseStudents = [];
                    
                    $.each(Courses.students, function (i, Students) {
                        
                        courseStudents.push(Students.firstName);
                        console.log(courseStudents);
                        //$("#courseDetailsStudentListPlaceholder").append("<p>" + courseStudents + "</p>");
                    });

                });

            });
        });
        // Pusha in studenter i kursen
            

                


            
            TopWindow();
        });
        // Posting new Courses
        $("#courseListAddCourseForm :button").on('click', function (e) {
            e.preventDefault();
            $.ajax({
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                'type': 'POST',
                'url': "/api/courses/",
                'data': JSON.stringify($("#courseListAddCourseForm").serializeObject()),
                'success': function (data) {
                    console.log(data);
                    $(".courseList").empty();
                    GetCourses();
                }
            });
        });
        // Uppdate Course Button
        $("#courseDetailsForm").submit(function (e) {
            e.preventDefault();
            $.ajax({
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                'type': 'POST',
                'url': "/api/courses",
                'data': JSON.stringify($("#courseDetailsForm").serializeObject()),
                'success': function (data) {
                    console.log(data);
                    $(".courseList").empty();
                    GetCourses();
                }
            });
        });
    });
