$(function () {

    $("#courses").click(function () {
        $("#courseDetailsPlaceholder").toggleClass("show-li");

        $("#students").click(function () {
            $("#studentListPlaceholder").toggleClass("show-li");

            $("#addCourse").click(function () {
                $("#courseListPlaceholder").toggleClass("show-li");

            });
        });

    });

    $("#start").on("mouseenter", function (event) {

        $(this).css("background-color", "#5cb85c");
    });

    $("#start").on("mouseleave", function (event) {

        $(this).css("background-color", "#428bca");

    });


    $("#courses").on("mouseenter", function (event) {

        $(this).css("background-color", "#5cb85c");
    });

    $("#courses").on("mouseleave", function (event) {

        $(this).css("background-color", "#428bca");

    });

    $("#students").on("mouseenter", function (event) {

        $(this).css("background-color", "#5cb85c");
    });

    $("#students").on("mouseleave", function (event) {

        $(this).css("background-color", "#428bca");

    });

    $("#addCourse").on("mouseenter", function (event) {

        $(this).css("background-color", "#5cb85c");
    });

    $("#addCourse").on("mouseleave", function (event) {

        $(this).css("background-color", "#428bca");

    });

});