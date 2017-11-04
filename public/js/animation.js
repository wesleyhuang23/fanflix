$(document).ready(function(){
  // $(this).scrollTop(0);
  var poster = document.getElementsByClassName('poster');

  $('.overview-wrapper').click(function(){
  });

  $('.slick-next').click(function(){
    $('#now-playing').animate({marginLeft: "-=500px"}, "fast");
  });

  $('.search input').keyup(function(){
    $('.search img').click();
  });
  $('.search-mobile input').keyup(function(){
    $('.search-mobile img').click();
  });

  $('.search-content').on('click', function(){
    $('#input-search input[type="text"]').val(" ");
  });

  $('.search img').click(function(){
    if($('input').val().length === 0){
      $('.search-wrapper').hide();
    } else {
        $('.search-wrapper').show();
      }
  });

  $('#left-now-playing').click(function(){
    $('#now-playing').css({'margin-left' : '-1590px'});
  });
  $('#right-now-playing').click(function() {
    $('#now-playing').removeAttr('style');
  })
  $('.slick').slick();
});


