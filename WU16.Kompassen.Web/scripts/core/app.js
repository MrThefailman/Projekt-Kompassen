$(document).ready(function () {                         // DOCUMENT READY STARTS HERE

    // Edit Existing Courses
    $.get("/api/courses", function (data) {

        $.each(data, function (i, course) {
            $("#courseListTable .courseList", function () {
                $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                    + "</td><td>" + "</td><td>" + course.year
                    + "</td><td>" + "</td><td>" + course.term
                    + "</td><td>" + "<button type='button' class='btn btn-default'data-id=" + "'"
                    + course.active + "'" + ">Aktiv</button>"
                    + "</td><td>" + "<button type='button' class='btn btn-warning'data-id=" + "'"
                    + course.id + "'" + ">Redigera</button>" + "</td></tr>");


                $(".courseList tr td button").on('click', function (e) {
                    
                    e.preventDefault();
                    var cId = $(this).attr("data-id");
                    var sC = [];
                    $.ajax({
                        type: "GET",
                        url: "/api/courses/" + cId
                    }).done(function (c, i) {
                        $("#courseDetailsPlaceholder").show();
                        console.log("Course: " + c.name);
                        $("#courseListAddCourseForm:input[name='id']").val(c.id);
                        $("#courseDetailsPlaceholder :input[name='name']").val(c.name);
                        $("#courseDetailsPlaceholder :input[name='credits']").val(c.credits);
                        $("#courseDetailsPlaceholder :input[name='year']").val(c.year);
                        $("#courseDetailsPlaceholder :input[name='term']").val(c.term);
                        $("#courseDetailsPlaceholder :input[name='active']").val(c.active);

                        var activeStudents = 0;
                        $.each(course.students, function (j, student) {

                            if (student.active === true) {

                                activeStudents++;
                                $("#courseDetailsStudentListPlaceholder").append("</br>Namn: "+ j + student.firstName +" "+ student.lastName);

                            }
                        });
                        });
                    window.scrollTo(0, 0);
                });
            });
        });
    });

    // Posting New Courses
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
                $.get("/api/courses", function (data) {
                    $.each(data, function (i, course) {
                        $("#courseListTable .courseList", function () {
                            $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                                + "</td><td>" + "</td><td>" + course.year
                                + "</td><td>" + "</td><td>" + course.term
                                + "</td><td>" + "<button type='button' class='btn btn-warning'data-id=" + "'"
                                + course.id + "'" + ">Redigera</button>" + "</td></tr>");
                        });
                    });
                });
            }
        });

        // Uppdate Courses
        $("#courseDetailsForm > div > div.panel-body > div:nth-child(3) > button.btn.btn-success").on('click', function (e) {
            alert('funkar');
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
                    $.get("/api/courses", function (data) {
                        $.each(data, function (i, course) {
                            $("#courseListTable .courseList", function () {
                                $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                                    + "</td><td>" + "</td><td>" + course.year
                                    + "</td><td>" + "</td><td>" + course.term
                                    + "</td><td>" + "<button type='button' class='btn btn-warning'data-id=" + "'"
                                    + course.id + "'" + ">Redigera</button>" + "</td></tr>");
                            });
                        });
                    });
                }
            });
        });
        

    });
});