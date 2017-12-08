
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
+ "</td><td><button type='button' id='aktiv" + course.id + "' class='btn btn-xs' data-id='" + course.active + "'></button>"
+ "</td><td>" + "<button type='button' id='editButton' class='btn btn-warning btn-xs'data-id=" + "'"
+ course.id + "'" + ">Redigera</button>" + "</td></tr>");
// Adds color and text to the active-button depending on its state
if (course.active === true) {
$("#aktiv" + course.id).addClass("btn-success").append("Aktiv");
} else {
$("#aktiv" + course.id).addClass("btn-danger").append("Inaktiv");
}
// Changes the boolean value of the active-button
$("#aktiv" + course.id).on("click", function () {
if (course.active === false) {
course.active = true;
} else {
course.active = false;
}
console.log(course.id, course.active);
updateCourse(course);
});

});

// Updates courses
function updateCourse(course) {
console.log("Uppdaterar kurs: " + course.name);
console.log(JSON.stringify(course));
$.ajax({
headers: {
'Accept': 'application/json; charset=utf-8',
'Content-Type': 'application/json; charset=utf-8'
},
'type': 'POST',
'url': "/api/courses/" + course.id,
'data': JSON.stringify(course),
'success': function (data) {
console.log(data);
$(".courseList").empty();
GetCourses();
}
});
}
            
// EDIT COURSES
$(document).on('click', "#editButton", function (e) {
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

});
       
$.each(courses.students, function (p, student) {
if (student.active === true) {
$("#courseDetailsStudentListPlaceholder").append("<p>" + student.firstName + " " + student.lastName + "</p >");
}
});
        
//Students in Selected Course
$.get("/api/students", function (data) {
$.each(data, function (i, student) {
// Fylla i Student rullen med aktiva studenter.
if (student.active === true) {
$("#courseDetailsStudentSelectList").append("<option value='" + student.id + "'>" + student.firstName + " " + student.lastName + "</option>");
}
$("#registerSelectedStudentButton").on("click", function () {
var val = $("#courseDetailsStudentSelectList option:selected").val();
if (val === student.id) {
$("#courseDetailsStudentListPlaceholder").append("<p>" + student.firstName + " " + student.lastName + "</p >");
$("#courseDetailsStudentSelectList [value='" + student.id + "']").remove();
}
});
            
               
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
$('#courseListPlaceholder').show();
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
$("#courseDetailsPlaceholder").hide();
GetCourses();
}
});
});
});
TopWindow();
} 
});

