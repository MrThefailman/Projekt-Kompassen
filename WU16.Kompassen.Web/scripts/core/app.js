                
                   
                
$(document).ready(function () {

    $.get("/api/courses", function (data) {

        $.each(data, function (i, course) { // .each går genom alla kurser som finns i SQL.
            $("#courseListTable > .courseList", function () {
                $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                    + "</td><td>" + "<button type='button' class='btn btn-primary'data-id=" + "'"
                    + course.id + "'" + ">Edit</button>" + "</td></tr>");


                $("#courseListTable > tbody > tr:nth-child(1) > td:nth-child(4) > button").click(function (e) {



                    e.preventDefault();
                    var cId = $(this).attr("data-id");

                    $.ajax({
                        type: "GET",
                        url: "/api/courses/" + cId
                    }).done(function (c) {
                        console.log("Course selected: " + c.name);
                        $("#courseListAddCourseForm :input[name='idnumber']").val(c.id);
                        $("#courseListAddCourseForm :input[name='name']").val(c.name);
                        $("#courseListAddCourseForm :input[name='credits']").val(c.credits);
                        $("#courseListAddCourseForm :input[name='year']").val(c.year);
                        $("#courseListAddCourseForm :input[name='term']").val(c.term);
                        $("#courseListAddCourseForm :input[name='active']").val(c.active);
                        
                        

                        $("#saveCourse").on('click', function (event) {

                            event.preventDefault();

                            $.ajax({
                                headers: {
                                    'Accept': 'application/json; charset=utf-8',
                                    'Content-Type': 'application/json; charset=utf-8'
                                },
                                'type': 'POST',
                                'url': "/api/courses",
                                'data': JSON.stringify($("#courseListAddCourseForm").serializeObject()),
                                'success': function (data) {

                                    $.get(url, function (data) {
                                        $(".courseList").empty();
                                        $.each(data, function (i, course) { // .each går genom alla kurser som finns i SQL.
                                            $("#courseListTable > .courseList", function () {
                                                $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                                                    + "</td><td>" + "<button type='button' class='btn btn-primary'name=" + "'"
                                                    + course.id + "'" + ">Ändra</button>" + "</td></tr>");
                                            });
                                        });
                                    });



                                }
                            });

                        })


                    });
                });
            });
        });

    });
})