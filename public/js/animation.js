$(document).ready(function(){

  var poster = document.getElementsByClassName('poster');
  // console.log(poster);

  $('.overview-wrapper').click(function(){
    console.log('clicked');
  });

  $('.slick-next').click(function(){
    console.log('clicked');
    $('#now-playing').animate({marginLeft: "-=500px"}, "fast");
  });

  // $('.search img').on('click', function(){
  //   $('input').val("");
  // });

  $('.search input').keyup(function(){
    $('.search img').click();
  });

  $('.search-content').on('click', function(){
    console.log('search-content clicked');
    $('#input-search input[type="text"]').val(" ");
  });

  $('.search img').click(function(){
    console.log('input length', $('input').val().length);
    if($('input').val().length === 0){
      $('.search-wrapper').hide();
    } else {
        $('.search-wrapper').show();
      }
  });


  //
  // $('.btn').click(function(){
  //   console.log('clicked btn');
  //   $('.btn').css({transform: "scale(1)"});
  // });
  // if($('input').val().length === 0){
  //   $('.search-view').addClass(disapear);
  // }
});
