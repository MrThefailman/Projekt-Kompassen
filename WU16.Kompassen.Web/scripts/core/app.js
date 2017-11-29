    $(document).ready(function () {                         // DOCUMENT READY STARTS HERE

        // Edit Existing Courses
        $.get("/api/courses", function (data) {

            $.each(data, function (i, course) {
                $("#courseListTable .courseList", function () {
                    $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                        + "</td><td>" + "</td><td>" + course.year
                        + "</td><td>" + "</td><td>" + course.term
                        + "</td><td>" + "<button type='button' class='btn btn-warning'data-id=" + "'"
                        + course.id + "'" + ">Redigera</button>" + "</td></tr>");


                    $(".courseList tr td button").on('click', function (e) {

                        e.preventDefault(e);
                        var cId = $(this).attr("data-id");
                        $.ajax({
                            type: "GET",
                            url: "/api/courses/" + cId
                        }).done(function (c) {
                            console.log("Course: " + c.name);
                            $("#courseListAddCourseForm :input[name='id']").val(c.id);
                            $("#courseListAddCourseForm :input[name='name']").val(c.name);
                            $("#courseListAddCourseForm :input[name='credits']").val(c.credits);
                            $("#courseListAddCourseForm :input[name='year']").val(c.year);
                            $("#courseListAddCourseForm :input[name='term']").val(c.term);
                            $("#courseListAddCourseForm :input[name='active']").val(c.active);
                        });
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
        });

    });
