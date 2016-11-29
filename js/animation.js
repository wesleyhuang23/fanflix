$(document).ready(function(){

  var poster = document.getElementsByClassName('poster');
  console.log(poster);

  $('.overview-wrapper').click(function(){
    console.log('clicked');
  });

  $('.slick-next').click(function(){
    console.log('clicked');
    $('#now-playing').animate({marginLeft: '500px'});
  });

});
