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

  window.onclick = function(event) {
      if (event.target == favModal) {
          favModal.style.display = "none";
      } else if (event.target == watchedModal) {
        watchedModal.style.display = "none";
    } else if(event.target == watchlistModal){
      watchlistModal.style.display = 'none';
    }
  }
var span = document.getElementsByClassName("close")[0];

//fav button
var favModal = document.getElementById('favorites-modal');
var favBtn = document.getElementById("fav");
favBtn.onclick = function() {
    favModal.style.display = "block";
    console.log(favModal);
}
span.onclick = function() {
    favModal.style.display = "none";
}
//watched button
var watchedModal = document.getElementById('watched-modal');
var watchedBtn = document.getElementById("watched");
watchedBtn.onclick = function() {
    watchedModal.style.display = "block";
    console.log(watchedModal);
}
span.onclick = function() {
    watchedModal.style.display = "none";
}
//watchlist button
var watchlistModal = document.getElementById('watchlist-modal');
var watchlistBtn = document.getElementById("list");
watchlistBtn.onclick = function() {
    watchlistModal.style.display = "block";
    console.log(watchlistModal);
}
span.onclick = function() {
    watchlistModal.style.display = "none";
}
});
