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

  $('.search-container').on('click', function(){
    console.log('clicked');
    $('#input-search').val(0);
  });

  // if($('input').val().length === 0){
  //   $('.search-view').addClass(disapear);
  // }
});
