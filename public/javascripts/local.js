$(function () {
    console.log('local.js ready');
    $("#popUpFormRS").addClass("hideMap");
    $('#popUpFormRS').removeClass('showMap');
    //delete function for myitems
    $('.deleteFunction').click(function () {
        console.log("Del Item Reached");
        var uid = $(this).attr('id').substring(7);
        console.log(uid);
        $.post("/item-delete", {
            id: uid
        }, function (data) {
            console.log(data);
            location.reload(true);
        });
    });


    // Begin: tab control
    $(".switch-BuySell, .switch-Roadside, .switch-MyItems").on("click", function () {
        var label = $(this).attr("class").replace("switch-", "");
        $(".tabs").find(".is-active").each(function () {
            $(this).removeClass("is-active");
        });
        $(this).parent().addClass("is-active");
        $("article>section").each(function () {
            if (!$(this).hasClass("is-hidden")) {
                $(this).addClass("is-hidden");
            }
        });
        $("#section-" + label).removeClass("is-hidden");
    }); // end: $(".switch-BuySell, .switch-Roadside, .switch-MyItems").on("click", function(){


    // open add Item Modal in MyItem tab
    $("#openItemModal").on("click", function () {
        $("#addItem").addClass("is-active");
    });


    // close add Item Modal when clicking close button
    $("#closeAddItemModal").on("click", function () {
        $("#addItem").removeClass("is-active");
    });
    // close add Item Modal when clicking outside of the modal
    $("#addItem .modal-background").on("click", function (event) {
        if (!$(event.target).closest('.addItemModalCard').length) {
            $("#addItem").removeClass("is-active");
        }
    });


    // item save
    $(".item-save").on("click", function () {
        var itemId = $(this).parent().find(".itemID").text();
        var $item = $(this);
        $.ajax({
            async: false
            , url: '/item-save'
            , type: 'post'
            , data: {
                "id": itemId
            }
            , dataType: 'json'
        }).done(function (res) {
            window.location.href = "/";
        }).fail(function (xhr, status, error) {
            alert(status);
        });
    });


    // item delete
    $(".item-delete").on("click", function () {
        var itemId = $(this).parent().find(".itemID").text();
        var isRoadside = false;
        var $item = $(this);

        if(!$("section-Roadside").hasClass("is-hidden")){
            isRoadside = true;
        }
        $.ajax({
            async: false
            , url: '/item-delete'
            , type: 'post'
            , data: {
                "id": itemId,
                "isRoadside": isRoadside
            }
            , dataType: 'json'
        }).done(function (res) {
            window.location.href = "/";
        }).fail(function (xhr, status, error) {
            alert(status);
        });
    });


    // add saved item card to myItem tab page.
    $(".switch-MyItems").on("click", function () {
        var cardColumnList = [];
        $(".cardColumn").each(function () {
            var $cardHasItemSaveClass = $(this).find(".item-save");
            if ($cardHasItemSaveClass) {
                if ($cardHasItemSaveClass.text().indexOf("Saved") != -1) {
                    cardColumnList.push($(this)[0].outerHTML);
                }
            }
        });
        $(".savedCards").html(cardColumnList.join(" "));
        $(".savedCards").find(".cardColumn").each(function () {
            $(this).removeClass("cardColumn").removeClass("is-one-quarter").addClass("is-half");
        });
    });


    // add Item form photo button wrapping
    $(".photoButton").on("click", function () {
        $("#photo").trigger("click");
    });


    // myitem customer showing modal
    $(".my-item-card-customer-button").on("click", function(){
        var $parent = $(this).parent();
        var userList = $parent.find(".save-customer-list").html();
        $(".user-list").html(userList);
        $("#popUpFormV").addClass("is-active");
    });


    // close add Item Modal when clicking close button
    $(".close-modal").on("click", function () {
        $("#popUpFormV").removeClass("is-active");
    });
    // close add Item Modal when clicking outside of the modal
    $("#popUpFormV .modal-background").on("click", function (event) {
        if (!$(event.target).closest('.addItemModalCard').length) {
            $("#popUpFormV").removeClass("is-active");
        }
    });

});