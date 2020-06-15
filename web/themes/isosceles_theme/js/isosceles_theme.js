(function ($, Drupal) {

  function displayTopPageArrow () {
    var displayArrowAtPixels = 300,
        smoothScrollDuration = 700,
        $back_to_top = $('.top-page-arrow');

    $(window).scroll(function(){
      ( $(this).scrollTop() > displayArrowAtPixels ) ? $back_to_top.addClass('top-page-arrow-is-visible') : $back_to_top.removeClass('top-page-arrow-is-visible top-page-arrow-fade-out');
    });

    $back_to_top.once().on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
        }, smoothScrollDuration
      );
    });
  }

  //Display search nav bar and close search nav bar icon
  $(".main-menu-search .main-menu .search-ico").click(function() {
    $(".search").fadeIn();
    $(".close-search-ico").fadeIn();
  });

  //Remove search nav bar and close search nav bar icon
  $(".main-menu-search .main-menu .close-search-ico").click(function() {
    $(".search").fadeOut();
    $(".close-search-ico").fadeOut();
  });

  //Shrink and expand main nav bar
  $(".menu-ico").click(function() {
    if ($(".main-menu-search").is(':visible')) {
      $(".main-menu-search").removeClass("show-menu");
      $(".main-menu-search").addClass("hide-menu");
    }
    else {
      $(".main-menu-search").removeClass("hide-menu");
      $(".main-menu-search").addClass("show-menu");
    }
  });

  //Shrink and expand sub nav bar
  $(".ion-plus-round, .ion-minus-round").click(function() {
    if ($(this).parents('li.parent').find("ul").is(':visible')) {
      $(this).parents('li.parent').find("ul").removeClass("show-menu");
      $(this).parents('li.parent').find("ul").addClass("hide-menu");
      $(this).parents('li.parent').find(".ion-plus-round").removeClass("hide-plus-icon");
      $(this).parents('li.parent').find(".ion-plus-round").addClass("show-plus-icon");
      $(this).parents('li.parent').find(".ion-minus-round").removeClass("show-minus-icon");
      $(this).parents('li.parent').find(".ion-minus-round").addClass("hide-minus-icon");
    }
    else {
      $(this).parents('li.parent').find("ul").removeClass("hide-menu");
      $(this).parents('li.parent').find("ul").addClass("show-menu");
      $(this).parents('li.parent').find(".ion-plus-round").removeClass("show-plus-icon");
      $(this).parents('li.parent').find(".ion-plus-round").addClass("hide-plus-icon");
      $(this).parents('li.parent').find(".ion-minus-round").removeClass("hide-minus-icon");
      $(this).parents('li.parent').find(".ion-minus-round").addClass("show-minus-icon");
    }
  });
      
  $(".main-menu-search .main-menu .parent span").click(function(element){
    if(!$(element.target).closest("a").length){
      $(".main-menu-search .main-menu .ion-plus-round").click();
    }
  });

  $(".main-menu-search .main-menu .ion-plus-round").click(function(event) {
    event.stopPropagation();
  });

  jQuery(document).ready(function($){
  	displayTopPageArrow();
  });

  Drupal.behaviors.isosceles_theme = {
    attach: function (context) {

    }
  };
})(jQuery, Drupal);
