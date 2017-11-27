
$(function () {

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };



    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.

    

        $.get(url, function (data) {

            // .each går genom alla kurser som finns i SQL.
            $.each(data, function (i, course) {
                $("#courseListTable > .courseList", function () {
                    $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                        + "</td><td>" + "<button type='button' class='btn btn-primary'name=" + "'"
                        + course.id + "'" + ">Edit</button>" + "</td></tr>");


                    $(".courseList tr td button").on('click', function () {
                        //$(this).attr();
                        //alert("Clicked");


                        $("#courseDetailsPlaceholder").show();


                        $.get("/api/course", function (data) {

                            $.each(data, function (i, course) {



                            });
                        });


                    });
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
            'url': url,
            'data': JSON.stringify($("#courseListAddCourseForm").serializeObject()),
            'success': function (data) {




            }

        });

    });





