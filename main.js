$(function() {
  var header = $('header');
  var links = $('header > #links > a');
  var scrollHint = $('.scroll-hint');
  var offsetBeforeHeaderFx = 50;
  var offsetAfterHeaderFx = 350;
  var maxHeaderHeight = 200;
  var headerColor = '24, 26, 55';

  $(window).scroll(function() {
    var top = $(window).scrollTop();

    if (top > 0) {
      header.addClass('header-with-shadow');
      scrollHint.fadeOut();
    } else {
      header.removeClass('header-with-shadow');
      scrollHint.fadeIn();
    }

    if (top < offsetBeforeHeaderFx) {
      header.css('background-color', '');

      links.css('color', '');
      links.css('border-color', '');
    } else if (top >= offsetBeforeHeaderFx && top < offsetAfterHeaderFx) {
      var opacity = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
      var colorStrength = (255 * opacity) | 0;
      header.css('background-color', `rgba(${headerColor}, ${opacity})`);
      header.css('height', `${maxHeaderHeight * (1.0 - opacity / 2.0)}px`);

      links.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
      links.css('border-color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
    } else {
      header.css('background-color', `rgba(${headerColor}, 1.0)`);
      header.css('height', `${maxHeaderHeight / 2.0}px`);

      links.css('color', `rgba(255, 255, 255, 1.0)`);
      links.css('border-color', `rgba(255, 255, 255, 1.0)`);
    }
  });
});
