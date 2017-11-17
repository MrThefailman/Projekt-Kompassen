
$(function () {

    $("#courses").click(function () {
        $("#containerCourseList").show();
        $("#containerStudentList").hide();
        $("#courseDetailsForm").hide();

    });

    $("#students").click(function () {
        $("#containerStudentList").show();
        $("#containerCourseList").hide();
        $("#courseDetailsForm").hide();

    });

    $(".toggleAddToCourse").click(function () {
        $("#courseDetailsForm").toggle();
    });
});