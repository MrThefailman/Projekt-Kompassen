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

    var url = "http://localhost:45959/api/students";

    // .get hämtar URL:en.
    $.get(url, function (data) {

        // .each går genom alla studenter som finns i SQL.
        $.each(data, function (i, students) {

            $('#defaultPlaceholder', function () { // Stora foldern som inte visas, finns i bakgrunden.

                // Här hämtar den information om studenterna.
                $("#defaultPlaceholder").append("<div class='form-group form-input-container" + i + "'><a href='#' class='form-control active'>" + "<b>" + students.name + "</b>" + "</a><div class='list-group-item'>Kursstart " + "<i>" + Last.name + " " + birth.year + "</i>" + "</div></div>");

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
                $("#studentListTable", function () {
                    $("#nameCol").append("<a href='#' class='list-group-item'>" + "<b>" + student.name + "</b>");
                    $("#LastCol").append("<span class='list-group-item'>" + "<b>" + Last.name + "</b></span>");
                    $("#PersonalID").append("<span class='list-group-item'>" + "<b>" + personal.ID + "</b></span>"); // Hämta Studenter istället

                });



            });

        });

    });


    $("#savestudent").on("click", function (event) {

        event.preventDefault();

        $.ajax({
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            'type': 'POST',
            'url': url,
            'data': JSON.stringify($("#studentListAddStudentForm").serializeObject()),
            'success': function (data) {
                //debugger;
                alert("Item has been saved.");
                //console.log(data.Name);
            }
        });

    });








});