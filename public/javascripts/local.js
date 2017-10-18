$(function(){
    console.log('local.js ready');

    // tab control
    $(".switch-BuySell, .switch-Roadside, .switch-MyItems").on("click", function(){
        var label = $(this).attr("class").replace("switch-", "");
        console.log(label);
        $(".tabs").find(".is-active").each(function(){
            $(this).removeClass("is-active");
        });
        $(this).parent().addClass("is-active");
        $("article>section").each(function(){
            if(!$(this).hasClass("is-hidden")){
                $(this).addClass("is-hidden");
            }
        });
        $("#section-" + label).removeClass("is-hidden");
    });// end: $(".switch-BuySell, .switch-Roadside, .switch-MyItems").on("click", function(){


    // function formValidate
    function isNotBlank(jQuerySelector){
        var result = false;
        if($(jQuerySelector).val() != ""){
            result = true;
        }
        return result;
    }

    // function formValidate
    function isNum(jQuerySelector){
        var result = false;
        if(/[0-9]+/.test($(jQuerySelector).val())){
            result = true;
        }
        return result;
    }

    // from CSCI4313 homework3
    // initialize Google Map API
    function initMap(){
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14, center: {lat: 44.974, lng: -93.234}
        });
    }

    $(window).on('load resize', function(){
        initMap();
    });
    $(".switch-Roadside").on("click", function(){
        initMap();
    });
});

