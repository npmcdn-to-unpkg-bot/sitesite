$(document).ready(function () {

    var $buttonBtn = $('.btn');
    var $buttonServices = $('.services__button');
    var $servicesShowMore = $('.services__item__show-more');

    var $portfolioLink = $('.portfolio-link');
    var $masonryContainer=$('.portfolio__items');
    var $portfolioItem = $('.portfolio__item');
    // Header Scroll
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

    // contact form
    $("#contactsform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit-contacts").attr("disabled", "disabled");
            $.post(a, {
                name: $("#contacts-form-name").val(),
                email: $("#contacts-form-email").val(),
                phone: $("#contacts-form-phone").val(),
                comments: $("#contacts-form-message").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit-contacts").removeAttr("disabled");
                if (null != a.match("success")) $("#contactsform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactsform input, #contactsform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });

    //menu scrolling
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top - 64}, 1000);
    });

    //masonry
    $masonryContainer.imagesLoaded(function(){
        $masonryContainer.masonry({
            itemSelector: '.portfolio__item',
            columnWidth: '.portfolio_sizer',
            percentPosition: true,
            isAnimated: true,
            transitionDuration: '0.2s'
        });
    });

    $portfolioLink.on('click', function () {
        var attribute = $(this).html().toLowerCase();
        var i;
        console.log("ТЭГ НАЧАЛЬНЫЙ: "+attribute);
        $portfolioItem.show();
        $portfolioItem.map(function (i, e) {
            if (attribute == 'все работы') {
                $portfolioItem.show();
            } else if ($(e).data('tag').toLowerCase().indexOf(attribute) == -1) {
                //console.log('ЭЛЕМЕНТ: '+e);
                console.log('ТЭГИ: '+$(e).data('tag'));
                console.log("ОТВЕТ: "+$(e).data('tag').toLowerCase().indexOf(attribute) > -1);
                $(e).hide();
            }

            $masonryContainer.masonry({
                itemSelector: '.portfolio__item',
                columnWidth: '.portfolio_sizer',
                percentPosition: true,
                isAnimated: true,
                transitionDuration: '0.2s'
            },'reload');
        });


    });

    //Show more in services
    $buttonServices.on('click', function () {
        var items = '.services__items';
        var item = '.services__item';
        var showMoreBlock = '.services__item__show-more';

        $servicesShowMore.slideUp();

        var showMore = $(this).closest(item).find(showMoreBlock);

        if (showMore.is(':hidden')) {
            showMore.slideDown();
            $(items).css('align-items', 'flex-start');
        } else {
            showMore.slideUp(function () {
                $(items).css('align-items', 'stretch');
            });

        }
    });
});

