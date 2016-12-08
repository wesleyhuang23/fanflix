$(document).ready(function(){
  // $(this).scrollTop(0);
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
      console.log('clicked home click');
      $('.search-wrapper').hide();
    } else {
        $('.search-wrapper').show();
      }
  });

  $('#left-now-playing').click(function(){
    console.log('left button clicked!');
    $('#now-playing').css({'margin-left' : '-1590px'});
  });
  $('#right-now-playing').click(function() {
    console.log('right button clicked!');
    $('#now-playing').removeAttr('style');
  })


});
