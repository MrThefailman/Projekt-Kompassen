﻿//GETCOURSES
function GetCourses() {
$.get("/api/courses", function (data) {

    $.each(data, function (i, course) {
            
                
        $("#courseListTable .courseList", function () {
            $(".courseList").append("<tr><td>" + course.name + "</td><td>"
                + course.credits + "</td><td>" + course.students.length
                + "</td><td>" + course.year
                + "</td><td>" + course.term
                + "</td><td><button type='button' value='aktiv' class='btn btn-success'data-id='"+course.active+"'>Aktiv</button>"
              
                + "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
                + course.id + "'" + ">Redigera</button>" + "</td></tr>");

            });
        });
    });
}
// GETSTUDENTS
function GetStudents() {

    

    $.get("/api/students", function (data) {
          
        
        $.each(data, function (i, student) {
           
            $("#studentListTable, .studentlist", function () {
                
               
                
               $(".studentlist").append("<tr><td>" + student.firstName + "</td><td>" + student.lastName
                   + "</td><td>" + student.ssn + "</td><td><ul><li>" + student.courses[i].name +"</li></ul>"+"</td><td>"
                    +"</td><td><button type='button' class='btn btn-success name='"
                    + student.active + "' >Aktiv</button>"
                    + "</td></tr>");
            });
        });
    });

}

$(document).ready(function () {                         // DOCUMENT READY STARTS HERE
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
            
            $("#courseDetailsPlaceholder").show();
                            
                $("#courseDetailsPlaceholder :input[name='id']").val(courses.id);
                $("#courseDetailsPlaceholder :input[name='name']").val(courses.name);
                $("#courseDetailsPlaceholder :input[name='credits']").val(courses.credits);
                $("#courseDetailsPlaceholder :input[name='year']").val(courses.year);
                $("#courseDetailsPlaceholder :input[name='term']").val(courses.term);
                $("#courseDetailsPlaceholder :input[name='active']").val(course.active);
                
                //$.get("/api/courses", function (data) {

                //    $.each(data, function (i, course) {
                //        $("#courseDetailsStudentListPlaceholder").append(courses.students[i].firstName);
                //        TopWindow();
                //    });
                //});
            });

        // När du trycker på edit så ska koden skicka upp dig till 
           });
    // GETTING STUDENTS IN SCROLLIST
    
    
    // POSTING NEW COURSES
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