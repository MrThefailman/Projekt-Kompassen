$(function () {

   // var search = "#testSearch".val();
    var url = "/api/Students/6";

    $("button").click(function () {
        $.get(url, function (data) {
            $("#test").append(data.firstName);



        });

    });

    

    });



    
    