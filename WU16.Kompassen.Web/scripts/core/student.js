// Gets students function
function Getstudents() {
    $('#searchStudentForm').hide();
    $.get("/api/students", function (data) {
        // Loads all the students
        $.each(data, function (i, student) {
            $("#studentListTable, .studentlist", function () {
                $(".studentlist :input[name='id']").val(student.id);
                $(".studentlist").append("<tr><td>" +
                    student.firstName + "</td><td>" +
                    student.lastName + "</td><td>" +
                    student.ssn + "</td><td>" +
                    "<button type='button' id='" + student.id + "' class='btn btn-xs' name='" + student.active + "'></button>" +
                    "</td></tr>");
                // Gives color and text to the Active-button depending on its state
                if (student.active === true) {
                    $("#" + student.id).addClass("btn-success").append("Aktiv");
                } else {
                    $("#" + student.id).addClass("btn-danger").append("Inaktiv");
                }
                // Changes the boolean value of the active-button
                $("#" + student.id).on("click", function () {
                    if (student.active === false) {
                        student.active = true;
                    } else {
                        student.active = false;
                    }
                    console.log(student.id, student.active);
                    updateStudent(student);
                });
            });
            // Student update function
            function updateStudent(student) {
                console.log("uppdaterar student: " + student.firstName + " " + student.lastName);
                console.log(JSON.stringify(student));
                $.ajax({
                    headers: {
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    'type': 'POST',
                    'url': "/api/students/" + student.id,
                    'data': JSON.stringify(student),
                    'success': function (data) {
                        console.log(data);
                        $(".studentlist").empty();
                        Getstudents();
                    }
                });
            }
        });
    });
}
$(document).ready(function () {
    Getstudents();
    // Posting new student
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