$(function () {


   

    $("#courses").click(function () {
        $("#courseListPlaceholder").show();
        $("#studentListPlaceholder").hide();
        

        $("#students").click(function () {
            $("#studentListPlaceholder").show();
            $("#courseListPlaceholder").hide();
            

        });

    });
});