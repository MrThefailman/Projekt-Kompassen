$(document).ready(function () {
    // Get Students
    GetStudents();
    function GetStudents() {
        $.get("/api/students", function (data) {
            $.each(data, function (y, Students) {
                var studentCourses = [];
                var activeStudent = 0;
                $.each(Students.courses, function (k, Courses) {
                    studentCourses.push(Courses.name);
                });
                if (Students.active === true) {
                    activeStudent = "<button type='button' value='aktiv' class='btn btn-success' data-id='" + Students.id + "'>Aktiv</button>";
                }
                if (Students.active === false) {
                    activeStudent = "<button type='button' value='aktiv' class='btn btn-danger' data-id='" + Students.id + "'>Inaktiv</button>";
                }
                $("#studentListTable tbody").append("<tr><td>" + Students.firstName + "</td><td>" + Students.lastName
                    + "</td><td>" + Students.ssn + "</td><td>" + studentCourses + "</td><td></td><td>" + activeStudent
                    + "</td></tr>");
            });
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
                        GetStudents();
                    }
                });
            });
        });
    }
});