$(function(){
    console.log("form control");
    $("#itemFormSubmit").on("click", function(){
        console.log("detect submit button click");
        if(!$(".price-notification").hasClass("is-hidden")){
            !$(".price-notification").addClass("is-hidden");
        }
        if(!$(".name-notification").hasClass("is-hidden")){
            !$(".name-notification").addClass("is-hidden");
        }
        // function formValidate
        function isBlank(jQuerySelector){
            console.log("isBlank"+$(jQuerySelector).val());
            var result = false;
            if($(jQuerySelector).val() != ""){
                result = true;
            }
            return result;
        }

        // function formValidate
        function isNum(jQuerySelector){
            console.log("isNum"+$(jQuerySelector).val());
            var result = false;
            if(/^([1-9]\d*|0)(\.\d+)?$/.test($(jQuerySelector).val())){
                result = true;
            }
            return result;
        }

        function putNotification(jQuerySelector, message){
            $(jQuerySelector).html('<div class="notification is-danger">' +
                message +
                '</div>').removeClass("is-hidden");
        }

        var validationFlg = true;
        if(!isBlank("#itemName")){
            validationFlg = false;
            putNotification(".name-notification", "this value could not blank!");
        }
        if(!isBlank("#itemPrice")){
            validationFlg = false;
            var message = "This item could not blank ";
            if(!isNum("#itemPrice")){
                validationFlg = false;
                message += "and need valid number";
            }
            putNotification(".price-notification", message);
        }else{
            if(!isNum("#itemPrice")){
                validationFlg = false;
                putNotification(".price-notification", "Put the valid number");
            }
        }


        if(validationFlg){
            //$("#itemForm").submit();
        }
    });
});