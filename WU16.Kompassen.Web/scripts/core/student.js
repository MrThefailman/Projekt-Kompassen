function Getstudents() {

    $('#searchStudentForm').hide();

    $.get("/api/students", function (data) {

       $.each(data, function (i, student) {
            $("#studentListTable, .studentlist", function () {
                $(".studentlist").append("<tr><td>" + student.firstName + "</td><td>" + student.lastName + "</td><td>" + student.ssn
                    + "</td><td>" + "</td><td>" +
                    "<button type='button' class='btn btn-success name='" + student.active + "' >Aktiv</button>"
                    + "</td><td>");

           });
        });


 
   });
}

$(document).ready(function () {

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