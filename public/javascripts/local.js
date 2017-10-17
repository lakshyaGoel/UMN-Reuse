$(function() {
  console.log('local.js ready');

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
  });


});
