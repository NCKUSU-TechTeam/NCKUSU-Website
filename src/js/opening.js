// Scroll Reveal
var config = {
    easing: 'ease',
    reset: true
};

window.sr = new scrollReveal(config);

// Background slide
$(window).load(function() {
    var theWindow = $(window),
        $bg = $('.background'),
        aspectRatio = $bg.width() / $bg.height();

    function resizeBg() {
        if ((theWindow.width() / theWindow.height()) < aspectRatio) {
            $bg.removeClass()
                .addClass('bgheight');
        } else {
            $bg.removeClass()
                .addClass('bgwidth');
        }

        $('.slideshow').cycle({
            timeout: 9000
        });
    }

    theWindow.resize(resizeBg)
        .trigger('resize');
});
