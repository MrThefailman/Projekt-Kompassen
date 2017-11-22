
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
        $(".toggleAddToCourse").show();

    });

    $("#students").click(function () {
        $("#containerStudentList").show();
        $("#containerCourseList").hide();
        $(".courseDetailsForm").hide();
        $(".toggleAddToCourse").show();

    });

    $(".toggleAddToCourse").click(function () {
        $(".toggleAddToCourse").hide();
        if ($(".someClass").html() == "")
        {
            $(".someClass").html($(".containerCourseDetails").html());
            $(".containerCourseDetails").html("");
            
        }
        console.log($(".containerCourseDetails"));
        $(".courseDetailsForm").show();

    });

});