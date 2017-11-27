
$(function () {

    $("#start").click(function () {
        $("#containerCourseList").hide();
        $("#containerStudentList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourse").hide();

    });

    $("#courses").click(function () {
        $("#containerCourseList").show();
        $("#containerStudentList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourseCourses").show();

    });

    $("#students").click(function () {
        $("#containerStudentList").show();
        $("#containerCourseList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourseStudents").show();

    });

    //lägg till studenter (i Studenter)
    $(".toggleAddToCourseStudents").click(function () {
        $(".toggleAddToCourseStudents").hide();
        if ($("#someIdStudents").html() === "")
        {
            $("#someIdStudents").html($(".containerCourseDetails").html());
            $(".containerCourseDetails").empty();
            $("#someIdCourses").empty();
            
        }
        
        $(".courseDetailsForm").show();
        //$("html, body").animate({ scrollTop: $("#someIdStudents").height() -$(window) }, 1000);

    });

    //Lägg till Studenter (i kurser)
    $(".toggleAddToCourseCourses").click(function () {
        $(".toggleAddToCourseCourses").hide();
        if ($("#someIdCousrses").html() === "")
        {
            $("#someIdCourses").html($(".containerCourseDetails").html());
            $(".containerCourseDetails").empty();
            $("#someIdStudents").empty();

        }

        $(".courseDetailsForm").show();
        //$("html, body").animate({ scrollTop: $("#someIdCourses").height() -$(window) }, 1000);

    });

    $(".courseDetailsCancelButton").click(function () {
        alert("Alert");
        $(".courseDetailsForm").hide();
        
    });

});