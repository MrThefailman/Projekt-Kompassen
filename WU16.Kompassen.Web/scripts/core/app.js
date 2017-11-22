
$(function () {



    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var url = "http://localhost:45959/api/courses"; // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.

    // .get hämtar URL:en.
    $.get(url, function (data) {

        // .each går genom alla kurser som finns i SQL.
        $.each(data, function (i, course) {

            $('#defaultPlaceholder', function () { // Stora foldern som inte visas, finns i bakgrunden.

                // Här hämtar den information om kurserna.
                $("#defaultPlaceholder").append("<div class='list-group col-md-4 list-group" + i + "'><a href='#' class='list-group-item active'>" + "<b>" + course.name + "</b>" + "</a><div class='list-group-item'>Kursstart " + "<i>" + course.term + " " + course.year + "</i>" + "</div></div>");

                // .each går genom alla studenterna som finns i SQL.
                $.each(course.students, function (j, student) {

                    // Här hämtar den information om studenterna som finns med i kurserna.
                    $('#defaultPlaceholder').find('.list-group' + i).append('<div class="list-group-item">' + student.firstName + ' ' + student.lastName + '</div>');

                });

            });

        });

        // Hänvisar till vilken URL vi ska hämta informationen ifrån gällande db.

        // .get hämtar URL:en.
        $.get(url, function (data) {

            // .each går genom alla kurser som finns i SQL.
            $.each(data, function (i, course) {
                $("#courseListPlaceholder", function () {
                    $("#nameCol").append("<a href='#' class='list-group-item'>" + "<b>" + course.name + "</b>");
                    $("#pointCol").append("<span class='list-group-item'>" + "<b>" + course.credits + "</b></span>");
                    $("#numCol").append("<span class='list-group-item'>" + "<b>" + course.students.length + "</b></span>"); // Hämta Studenter istället

                });



            });

        });

    });




    $("#saveCourse").on("click", function (event) {

        event.preventDefault();

        $.ajax({
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            'type': 'POST',
            'url': url,
            'data': JSON.stringify($("#courseListAddCourseForm").serializeObject()),
            'success': function (data) {
                //debugger;
                alert("Item has been saved.");
                //console.log(data.Name);
            }
        });

    });



});
