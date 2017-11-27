
$(function () {
    
    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.
     
    $.get(url, function (data) {
          
        $.each(data, function (i, course) { // .each går genom alla kurser som finns i SQL.
                $("#courseListTable > .courseList", function () {
                    $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                        + "</td><td>" + "<button type='button' class='btn btn-primary'name=" + "'"
                        + course.id + "'" + ">Edit</button>" + "</td></tr>");
                    
                    $(".courseList tr td button").on('click', function () { // Edit Knappen För Kurser
                
                        $("#courseDetailsPlaceholder").show(); // Visa Kursinformation i ett Formulär

                  });
                });
              });
            });

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
                                + course.id + "'" + ">Edit</button>" + "</td></tr>");

                            
                            $(".courseList tr td button").on('click', function () { // Edit Knappen För Kurser
                                $("#courseDetailsPlaceholder").show();
                                $.ajax({
                                    type: "GET",
                                    url: "/api/courses/" + cId
                                }).done(function (data) {

                                    var cId = $(this).attr("data-id");
                                    $("#courseListAddCourseForm :input[name='idnumber']").val(course.id);
                                    $("#courseListAddCourseForm :input[name='name']").val(course.name);
                                    $("#courseListAddCourseForm :input[name='credits']").val(course.credits);
                                    $("#courseListAddCourseForm :input[name='year']").val(course.year);
                                    $("#courseListAddCourseForm :input[name='term']").val(course.term);
                                    $("#courseListAddCourseForm :input[name='active']").val(course.active);
                                });
                                 // Visa Kursinformation i ett Formulär

                            });
                        });
                    });
                });
                
            }
            });
          });
        });




   





