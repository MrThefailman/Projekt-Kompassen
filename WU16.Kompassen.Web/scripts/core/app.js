                
// Function Showing Courses
function GetCourses() {
    $.get("/api/courses", function (data) {

        $.each(data, function (i, course) {
            $("#courseListTable .courseList", function () {
                $(".courseList").append("<tr><td>" + course.name + "</td><td>" + course.credits + "</td><td>" + course.students.length
                    + "</td><td>" + "</td><td>" + course.year
                    + "</td><td>" + "</td><td>" + course.term
                    + "</td><td>" + "<button type='button' class='btn btn-primary'data-id=" + "'"
                    + course.id + "'" + ">Edit</button>" + "</td></tr>");

            });
        });
    });
}
// Function for POST
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

$(document).ready(function () {                         // DOCUMENT READY STARTS HERE

    // Edit Existing Courses
    GetCourses(); {
        $(".courseList :button[type='button']").on('Click', function (e) {
            alert("FUNKAR");
            e.preventDefault();
            var cId = $(this).attr("data-id");
            $.ajax({
                type: "GET",
                url: "/api/courses/" + cId
            }).done(function (c) {
                alert("Course: " + c.name);
                $("#courseListAddCourseForm :input[name='id']").val(c.id);
                $("#courseListAddCourseForm :input[name='name']").val(c.name);
                $("#courseListAddCourseForm :input[name='credits']").val(c.credits);
                $("#courseListAddCourseForm :input[name='year']").val(c.year);
                $("#courseListAddCourseForm :input[name='term']").val(c.term);
                $("#courseListAddCourseForm :input[name='active']").val(c.active);
            });
        });
    }
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
                GetCourses();
              
            }
        });
        });

});
