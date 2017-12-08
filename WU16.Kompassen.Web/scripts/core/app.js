
$(document).ready(function () {
//GETCOURSES
GetCourses(); 
function GetCourses() {
$.get("/api/courses", function (data) {
$.each(data, function (i, course) {
$("#courseListTable .courseList", function () {
$(".courseList").append("<tr><td>" + course.name + "</td><td>"
+ course.credits + "</td><td>" + course.students.length
+ "</td><td>" + course.year
+ "</td><td>" + course.term
+ "</td><td><button type='button' value='aktiv' class='btn btn-success'data-id='" + course.active + "'>Aktiv</button>"
+ "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning'data-id=" + "'"
+ course.id + "'" + ">Redigera</button>" + "</td></tr>");

});
// EDIT COURSES
$(document).on('click', ".courseList tr td button", function (e) {
e.preventDefault(e);
var cId = $(this).attr("data-id");
$.ajax({
type: 'GET',
url: '/api/courses/' + cId
}).done(function (courses) {
//$("#courseDetailsStudentListPlaceholder").empty();
$("#courseDetailsPlaceholder").show();
$("#courseDetailsPlaceholder :input[name='id']").val(courses.id);
$("#courseDetailsPlaceholder :input[name='name']").val(courses.name);
$("#courseDetailsPlaceholder :input[name='credits']").val(courses.credits);
$("#courseDetailsPlaceholder :input[name='year']").val(courses.year);
$("#courseDetailsPlaceholder :input[name='term']").val(courses.term);
$("#courseDetailsPlaceholder :input[name='active']").val(courses.active);
});
});
//Students in Selected Course
$.each(course.students, function (g, student) {
if (student.active === true) {
console.log(student.firstName +student.lastName);
$("#courseDetailsStudentListPlaceholder").append("<br><p>" + student.firstName + student.lastName + "</p>");
}
});
});          
// Posting new Courses
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
// Uppdate Course Button
$("#courseDetailsForm").submit(function (e) {
e.preventDefault();
$.ajax({
headers: {
'Accept': 'application/json; charset=utf-8',
'Content-Type': 'application/json; charset=utf-8'
},
'type': 'POST',
'url': "/api/courses",
'data': JSON.stringify($("#courseDetailsForm").serializeObject()),
'success': function (data) {
console.log(data);
$(".courseList").empty();
GetCourses();
}
});
});
});
// GET för att hämta studenterna till dropdown-lista för kurs-fliken.
$.get("/api/students", function (data) {
$.each(data, function (j, student) {
$("#courseDetailsStudentSelectList").append("<option value=" + student.id + ">" + student.firstName + " " + student.lastName + "</option>");
$('#registerSelectedStudentButton').on('click', function () {
$("#courseDetailsStudentSelectList option:selected").remove();
$('#courseDetailsStudentListPlaceholder').append('<p>' + this.firstName + " " + this.lastName + '</p>');
});
});
TopWindow();

});       
} 
});

