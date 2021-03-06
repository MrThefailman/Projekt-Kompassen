﻿$(document).ready(function () {                         // DOCUMENT READY STARTS HERE

    // Edit Existing Courses
    $.get("/api/courses", function (data) {
        
        $.each(data, function (i, course) {
            
            $("#courseListTable .courseList", function () {
                $(".courseList").append("<tr><td>" + course.name + "</td><td>"
                    + course.credits + "</td><td>" + course.students.length
                    + "</td><td>" + course.year
                    + "</td><td>" + course.term
                    + "</td><td>" + course.active
                    + "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
                    + course.id + "'" + ">Redigera</button>" + "</td></tr>");
              

                $(document).on('click', ".courseList tr td button", function (e) {
                    e.preventDefault(e);
                    var cId = $(this).attr("data-id");
                    $.ajax({
                        type: 'GET',
                        url: '/api/courses/' + cId
                    }).done(function (c) {
                        $("#courseDetailsPlaceholder").show();
                        console.log("Course: " + c.name);
                        $("#courseDetailsPlaceholder :input[name='id']").val(c.id);
                        $("#courseDetailsPlaceholder :input[name='name']").val(c.name);
                        $("#courseDetailsPlaceholder :input[name='credits']").val(c.credits);
                        $("#courseDetailsPlaceholder :input[name='year']").val(c.year);
                        $("#courseDetailsPlaceholder :input[name='term']").val(c.term);
                        $("#courseDetailsPlaceholder :input[name='active']").val(c.active);

                        // Fylla i Student rullen
                        $("#courseDetailsStudentSelectList").append("<option>" + c.name + c.active + "</option>");


                        
                        });
                        // När du trycker på edit så ska koden skicka upp dig till 
                        $("#editButton").click(function (e) {
                        $('#courseDetailsPlaceholder').hide();
                        $("html body").animate({ scrollTop: '0px' }, 1000);
                    });
                      
                });
                
                // När du trycker på stäng döljs 
                $('#courseDetailsCancelButton').on('click', function (e) {
                    $('#courseDetailsPlaceholder').hide();
                });
            });
        });
    });

    // Posting New Courses
    $("#courseListAddCourseForm :button").on('click', function (e) {
        e.preventDefault(e);


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
                $.get("/api/courses", function (data) {
                    $.each(data, function (i, course) {
                        $("#courseListTable .courseList", function () {
                            $(".courseList").append("<tr><td>" + course.name + "</td><td>"
                                + course.credits + "</td><td>" + course.students.length
                                + "</td><td>" + course.year
                                + "</td><td>" + course.term
                                + "</td><td>" + "<button type='button' class='btn btn-danger'data-id=" + course.active
                                + ">Inaktiv</button>"
                                + "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
                                + course.id + "'" + ">Redigera</button>" + "</td></tr>");
                        });
                    });
                });
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
                $.get("/api/courses", function (data) {
                    $.each(data, function (i, course) {
                        $("#courseListTable .courseList", function () {
                            $(".courseList").append("<tr><td>" + course.name + "</td><td>"
                                + course.credits + "</td><td>" + course.students.length
                                + "</td><td>" + course.year
                                + "</td><td>" + course.term
                                + "</td><td>" + "<button type='button' class='btn btn-danger'data-id=" + course.active
                                + ">Inaktiv</button>"
                                + "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
                                + course.id + "'" + ">Redigera</button>" + "</td></tr>");
                        });
                    });
                });
            }
        });
    });
});