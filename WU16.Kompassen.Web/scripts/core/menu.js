
$(function () {

    $("#start").click(function () {
        $(".navbar-nav li").parent().find('li').removeClass("active");
        $(this).addClass("active");
        $("#containerCourseList").hide();
        $("#containerStudentList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourse").hide();

    });

    $("#courses").click(function () {
        $(".navbar-nav li").parent().find('li').removeClass("active");
        $(this).addClass("active");
        $("#containerCourseList").show();
        $("#containerStudentList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourseCourses").show();

    });

    $("#students").click(function () {
        $(".navbar-nav li").parent().find('li').removeClass("active");
        $(this).addClass("active");
        $("#containerStudentList").show();
        $("#containerCourseList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourse").hide();

    });

    //Redigera kurser (i kurser)
    $(".toggleAddToCourseCourses").click(function () {

        $(this).hide();

        $("#containerCourseDetails").show();
        $(".courseDetailsForm").show();

    });

    $(".courseDetailsCancelButton").click(function () {
        
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourseCourses").show();
        
    });

});