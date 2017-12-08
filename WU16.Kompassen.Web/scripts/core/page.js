$(function () {
    $('.navbar-brand').on('click', function () {
        location.reload();
    });
    // Nedan element har satts som .hide då endast #defaultPlaceholder ska synas vid start.
    $('#courseDetailsPlaceholder').hide();
    $('#courseListPlaceholder').hide();
    $('#studentListPlaceholder').hide();
    // Vad som sker när du klickar på navbar-länkarna (#start, #courses, #students).
    $('#navbar li a').on('click', function () {
        // Referar till den specifika länken man klickar på (this) och sätter den till aktiv, samtidigt som den inaktiverar syskonen till den aktiva länken.
        $(this).parent().attr('class', 'active').siblings().removeAttr('class', 'active');
        // Skapandet av en variabel för activeLink.
        var activeLink = $(this).attr('href');
        if (activeLink === '#start') {
            $('#defaultPlaceholder').show().siblings('div').hide();
        }
        // if-satser som kontroller ifall specifik navbar-länk är korrekt.
        if (activeLink === '#courses') {
            // Om if-satsen är korrekt så visas elementet och övrika syskon döljs.
            $('#courseListPlaceholder').show().siblings('div').hide();
            // $('#courseDetailsPlaceholder').show();
        }
        if (activeLink === '#students') {
            $('#studentListPlaceholder').show().siblings('div').hide();
        }
    });
});