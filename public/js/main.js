// Header Fixed
$(document).ready(function () {
    var $navToFixed=$('.header');

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('body').css('margin-top',$navToFixed.outerHeight()+'px');
            $navToFixed.addClass('fixed-menu');
        } else {
            $navToFixed.removeClass('fixed-menu');
            $('body').css('margin-top',0);
        }
    });

});

// contact form sender
$(document).ready(function () {

    function formSender(form, failMessage) {
        $(form).submit(function () {
            var a = $(this).attr("action");

            $(failMessage).slideUp(750, function () {
                $(failMessage).hide();
                $(form).attr("disabled", "disabled");
                $.post(a, {
                    name: $(form + "__name").val(),
                    phone: $(form + "__phone").val(),
                    message: $(form + "__message").val()
                }, function (a) {
                    $(failMessage).html(a);
                    $(failMessage).slideDown("slow");
                    if (null != a.match("success")) $(form).slideDown("slow");
                });
            });
            return false;
        });
        $(form + " input").keyup(function () {
            $(failMessage).slideUp(1500);
        });
    }

    formSender('.form_contacts','.form__message');
});


//menu scrolling
$(document).ready(function () {

    $(".menu-link").click(function (event) {
        event.preventDefault();
        console.log($(this).attr('href'));
        var selectorName=$(this).attr('href');
        var $selector=$(selectorName);
        $('html,body').animate({scrollTop: $selector.offset().top - 50}, 1000);
    });

});

//Show more in services
//
// $(document).ready(function () {
//
//     var $buttonBtn = $('.btn');
//     var $buttonServices = $('.services__button');
//     var $servicesShowMore = $('.services__item__show-more');
//
//
//     $buttonServices.on('click', function () {
//         var items = '.services__items';
//         var item = '.services__item';
//         var showMoreBlock = '.services__item__show-more';
//
//         $servicesShowMore.slideUp();
//
//         var showMore = $(this).closest(item).find(showMoreBlock);
//
//         if (showMore.is(':hidden')) {
//             showMore.slideDown();
//             $(items).css('align-items', 'flex-start');
//         } else {
//             showMore.slideUp(function () {
//                 $(items).css('align-items', 'stretch');
//             });
//
//         }
//     });
// });

//masonry grid + filter by data-*
$(document).ready(function () {

    var $portfolioLink = $('.portfolio-link');
    var $masonryContainer=$('.portfolio__items');
    var $portfolioItem = $('.portfolio__item');

    //masonry
    $masonryContainer.imagesLoaded(function(){
        $masonryContainer.masonry({
            itemSelector: '.portfolio__item',
            columnWidth: '.portfolio_sizer',
            percentPosition: true
        });
    });

    $portfolioLink.on('click', function () {
        var attribute = $(this).html().toLowerCase();
        // console.log("ТЭГ НАЧАЛЬНЫЙ: "+attribute);
        $portfolioItem.show();
        $portfolioItem.map(function (i, e) {
            if (attribute == 'все работы') {
                $portfolioItem.show();
            } else if ($(e).data('tag').toLowerCase().indexOf(attribute) == -1) {
                //console.log('ЭЛЕМЕНТ: '+e);
                // console.log('ТЭГИ: '+$(e).data('tag'));
                // console.log("ОТВЕТ: "+$(e).data('tag').toLowerCase().indexOf(attribute) > -1);
                $(e).hide();
            }

            $masonryContainer.masonry({
                itemSelector: '.portfolio__item',
                columnWidth: '.portfolio_sizer',
                percentPosition: true
            },'reload');
        });
    });
});