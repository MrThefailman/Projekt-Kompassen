function Getstudents() {

    $('#searchStudentForm').hide();

    $.get("/api/students", "/api/courses", function (data) {

       $.each(data, function (i, student,  course) {
            $("#studentListTable, .studentlist", function () {
                $(".studentlist").append("<tr><td>" + student.firstName + "</td><td>" + student.lastName + "</td><td>" + student.ssn
                    + "</td><td>" + "</td><td>" + courses.length + "<li>" + courses.Name + "<\/li>"
                    + "</td><td>" +
                    "</td><td>" +
                    "<button type='button' class='btn btn-success toggleButtonActive' >Aktiv</button>"
                    + "</td><td>" + "<button type='button' class='btn btn-warning 'data-id=" + "'"
                    + "'" + ">Redigera</button>" + "</td></tr>");

           });
        });


       $(document).on("click", ".toggleButtonActive", function () {
            if ($(this).hasClass("btn-success")) {                
               $(this).removeClass("btn-success");
                $(this).addClass("btn-danger").html("Inaktiv");
            } else {
                $(this).removeClass("btn-danger").html("Inaktiv");
                $(this).addClass("btn-success").html("aktiv");
            }
        });


   });
}

$(document).ready(function () {


Getstudents(); {
    $(".studentlist :button[type='button']").on('Click', function (e) {
        alert("FUNKAR");
        e.preventDefault();
        var cId = $(this).attr("data-id");
        $.ajax({
            type: "GET",
            url: "/api/students/" + cId
        }).done(function (c) {
            alert("Student: " + c.name);
            $("#studentListAddStudentForm :input[name='id']").val(c.id);
            $("#studentListAddStudentForm :input[name='firstname']").val(c.firstname);
            $("#studentListAddStudentForm :input[name='lastname']").val(c.lastname);
            $("#studentListAddStudentForm :input[name='ssn']").val(c.ssn);
            $("#studentListAddStudentForm :input[name='active']").val(c.active);
            $("#studentListAddStudentForm :input[name='status']").val(c.status);
        });
    });
}

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
                Getstudents();

           }
        });
    });


});