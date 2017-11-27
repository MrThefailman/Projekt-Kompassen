$(document).ready(function () {

    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån på db.

    // .get hämtar URL:en enligt ovan variabel.
    $.get(url, function (data) {

        // .each går genom alla kurser som finns i db enligt ovan URL.
        $.each(data, function (i, course) {

            // Modulo letar efter en matchning, vid matchning utförs skapandet av en ny row och den hoppar ner till nästa steg och gör samma sak. (matchning = jämnt delbart med 3 kolumner).
            if (i % 3 === 0) {
                $('#defaultPlaceholder').append('<div class="row"' + '</div>');
            }

            // Går in i #defaultPlaceholder, appendar "skapar/skriver ut html-element för varje objekt" upp allt innehåll mellan " ...... ", lägger till course.name, course.term och course.year från db.
            $("#defaultPlaceholder").append("<div class='col-md-4 list-group-" + i + " mt '><a href='#' class='list-group-item active'>" + course.name + '<span class="badge"></span></a><div class="list-group-item"><i>Kursstart ' + course.term + " " + course.year + "</i>" + "</div><div class='nameHolder-" + i + "'style='display:none'></div></div>");

            //Variabel skapad för framtagning av antalet aktiva studenter till badgen.
            var activeStudents = 0;

            // .each går genom alla studenter i respektive kurs som finns i db enligt ovan URL.
            $.each(course.students, function (j, student) {

                if (student.active === true) {

                    // Räknare för variabel activeStudents till badgen.
                    activeStudents++;

                    // Går in i .list-group- +1 och letar efter .nameHolder- +1, appendar "skapar/skriver ut html-element för varje objekt" upp allt innehåll mellan " ..... ", lägger till student.firstName och student.lastName. från db.
                    $('.list-group-' + i).find('.nameHolder-' + i).append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');
                    $('.list-group-' + i).find('.badge').text(activeStudents + " " + "Deltagare");

                }

            });

            $('.list-group-' + i).find('a').on('click', function () {
                $('.nameHolder-' + i).slideToggle('slow');

            });

        });

    });

});