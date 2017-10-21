$(function(){
    $("#itemFormSubmit").on("click", function(){
        console.log("detect submit button click");
        // TODO: form valiadtion
        $("#itemForm").submit();
    });

});