// Function for POST

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
function TopWindow() {
    $("#editButton").click(function (e) {
        $('#courseDetailsPlaceholder').hide();
        $("html body").animate({ scrollTop: '0px' }, 1000);
    });
    // När du trycker på stäng döljs 
    $('#courseDetailsCancelButton').on('click', function (e) {
        $('#courseDetailsPlaceholder').hide();
    });
}




