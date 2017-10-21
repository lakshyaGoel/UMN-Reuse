$(function(){
    document.getElementById('popUpFormRS').style.display='none';
    console.log('local.js ready');
    $('[name="slider"]').click(function() {
    console.log("Inside!!!");
    $(this).parents('.sliderComplete').children('button').removeClass('close').fadeIn(300);

    // The button, that was visible, goes on display none.
    $(this).addClass('close').fadeOut(300);

    // We do a fluid slider with the class '.turn'.
    $(this).parents('.sliderComplete').children('.wrapper').children('.slider').toggleClass('turn');
    });


      //interested function
      $('.interestedFunction').click(function(){
        console.log("Interested Item Reached");
        var uid=$(this).attr('id');

        console.log(uid);
        $.ajax({
            async: false,
            url: '/item-interested',
            type: 'get',
            data:{"id": uid},
            dataType: 'json'
        }).success(function(data, textStatus, jqXHR){
          console.log("HELLO");
          console.log(data);
          console.log(textStatus);
        }).fail(function(xhr, status, error){
            alert(status);
        });
       });


    // Begin: tab control
    $(".switch-BuySell, .switch-Roadside, .switch-MyItems").on("click", function(){
        var label = $(this).attr("class").replace("switch-", "");
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
    // END: tab control

    // open add Item Modal in MyItem tab
    $("#openItemModal").on("click", function(){
        $("#addItem").addClass("is-active");
    });
    // close add Item Modal when clicking close button
    $("#closeAddItemModal").on("click", function(){
       $("#addItem").removeClass("is-active");
    });
    // close add Item Modal when clicking outside of the modal
    $("#addItem .modal-background").on("click", function(event){
        if(!$(event.target).closest('.addItemModalCard').length) {
            $("#addItem").removeClass("is-active");
        }
    });


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

    // item save
    $(".item-save").on("click", function(){
        var itemId = $(this).parent().find(".itemID").text();
        var $item = $(this);
        $.ajax({
            async: false,
            url: '/item-save',
            type: 'post',
            data:{"id": itemId},
            dataType: 'json'
        }).done(function(res){
            window.location.href = "/";
        }).fail(function(xhr, status, error){
            alert(status);
        });
    });

    // item delete
    $(".item-delete").on("click", function(){
        var itemId = $(this).parent().find(".itemID").text();
        var $item = $(this);
        $.ajax({
            async:false,
            url:'/item-delete',
            type: 'post',
            data:{"id": itemId},
            dataType: 'json'
        }).done(function(res){
            window.location.href = "/";
        }).fail(function(xhr, status, error){
           alert(status);
        });
    });

    // add saved item card to myItem tab page.
    $(".switch-MyItems").on("click", function(){
        var cardColumnList = [];
        $(".cardColumn").each(function(){
            var $cardHasItemSaveClass = $(this).find(".item-save");
            if($cardHasItemSaveClass){
                if($cardHasItemSaveClass.text().indexOf("Saved") != -1){
                    cardColumnList.push($(this)[0].outerHTML);
                }
            }
        });
        $(".savedCards").html(cardColumnList.join(" "));
        $(".savedCards").find(".cardColumn").each(function(){
            $(this).removeClass("cardColumn").removeClass("is-one-quarter").addClass("is-half");
        });
    });
});
