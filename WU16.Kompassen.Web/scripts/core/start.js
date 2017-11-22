$(document).ready(function () {

    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.

    // .get hämtar URL:en.
    $.get(url, function (data) {

        // .each går genom alla kurser som finns i db enligt ovan URL.
        $.each(data, function (i, course) {
            
            //Modulo går genom .list-group och fördelar dem på 3 resultat(.nameHolder) per row.
            if (i % 3 === 0) {
                $('#defaultPlaceholder').append('<div class="row"' + '</div>');
            }

            // Går in i #defaultPlaceholder, appendar "skapar" upp allt innehåll mellan " ...... ", lägger till course.name, course.term och course.year.
            $("#defaultPlaceholder").append("<div class='col-md-4 list-group-" + i + " mt '><a href='#' class='list-group-item active'>" + course.name + "<i>" + "</a><div class='list-group-item'>Kursstart " + course.term + " " + course.year + "</i>" + "</div><div class='nameHolder-" + i + "'style='display:none'></div></div>");


            // .each går genom alla studenter som finns i db enligt ovan URL.
            $.each(course.students, function (j, student) {
                
                    $('.list-group-' + i).find('.nameHolder-' + i).append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');
                    // Här hämtar den information om studenterna som finns med i respektive kurs.
                    // $('#defaultPlaceholder').find('.list-group' + i).append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');

             });

            $('.list-group-' + i).find('a').on('click', function () {
                $('.nameHolder-' + i).slideToggle('slow');

            });

        });

    });

});

