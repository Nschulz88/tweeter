$( document ).ready(function () {
console.log('YEY, I loaded!');


    $('textarea').on('input', function() {
        var maxChar = 140;
        var count = $(this).val().length;
        $(this)
            .siblings('.counter')
            .text(maxChar - count)
            .css('color', (count > maxChar) ? 'red' : 'grey');
    });
});