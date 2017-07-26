(function ($) {

    var blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    var imgCentering = function (obj, options) {
        var defaults = {
            'forceWidth': false,
            'forceHeight': false,
            'forceSmart': false
        };

        function forceWidth(obj) {
            obj.css('width', '100%');
        }

        function forceHeight(obj) {
            obj.css('height', '100%');
        }

        var img = $(obj);
        var settings = $.extend(defaults, options);
        img.load(function () {

            var _conwidth = img.parent().width();
            var _conheight = img.parent().height();
            var _parentpos = img.parent().css('position');

            img.css('width', 'auto');
            img.css('height', 'auto');

            if (settings.forceSmart) {
                var _fullratio = img.width() / img.height();
                var _conratio = _conwidth / _conheight;
                if (_fullratio < _conratio)
                    forceWidth(img);
                else
                    forceHeight(img);
            } else {
                if (settings.forceWidth)
                    forceWidth(img);
                if (settings.forceHeight)
                    forceHeight(img);
            }

            var _finalwidth = img.width();
            var _finalheight = img.height();

            img.css({
                'position': 'relative',
                'left': -(_finalwidth - _conwidth) / 2 + 'px',
                'top': -(_finalheight - _conheight) / 2 + 'px'
            }).addClass('done')
                .parent().css({
                'position': _parentpos,
                'overflow': 'hidden'
            });
        });

        if (obj.complete || obj.complete === undefined) {
            var src = obj.src;
            obj.src = blank;
            obj.src = src;
        }
    };
    $.fn.imgCentering = function (options) {

        return this.each(function (e) {
            var img = $(this);
            if (img.data('imgCentering')) return;

            var imgcenter = new imgCentering(this, options);
            img.data('imgCentering', imgcenter);

        });
    }

})(jQuery);