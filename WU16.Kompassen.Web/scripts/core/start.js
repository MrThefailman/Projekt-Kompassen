$(document).ready(function () {

    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.

    // .get hämtar URL:en.
    $.get(url, function (data) {

        // .each går genom alla kurser som finns i SQL.
        $.each(data, function (i, course) { 

            // Här hämtar den information om kurserna.
            $("#defaultPlaceholder").append("<div class='col-md-4 list-group-" + i + "'><a href='#panel-collapse collapse' class='list-group-item active'>" + course.name + "<i>" + "</a><div class='list-group-item'>Kursstart " + course.term + " " + course.year + "</i>" + "</div><div class='nameHolder'></div></div>");
            // $('.nameHolder').hide();

                    // .each går genom alla studenterna som finns i SQL.
            $.each(course.students, function (j, student) {
                
                        $('.list-group-' + i).find('.nameHolder').append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');
                        // Här hämtar den information om studenterna som finns med i respektive kurs.
                        // $('#defaultPlaceholder').find('.list-group' + i).append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');

             });

        });

    });

});

