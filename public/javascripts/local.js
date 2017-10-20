$(function(){
    console.log('local.js ready');
    //interested items
      $('.delete').click(function(){
        console.log("Del Item Reached");
        var uid=$(this).attr('id').substring(7);
        console.log(uid);
        $.post("/item-delete", {id:uid},
        function(data){
          console.log(data);
          location.reload(true);
        }
      );
      });
    // Begin: tab control
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
            dataType: 'json',
        }).done(function(res){
            window.location.href = "/";
        }).fail(function(xhr, status, error){
           alert(status);
        });
    })
});
