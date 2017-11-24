$(function() {
  var header = $('header');
  var links = $('header > #links > a');
  var scrollHint = $('.scroll-hint');
  var headerColor = '51,51,50';

  function recomputeHeader() {
    var top = $(window).scrollTop();
    var minHeaderHeight = 100;
    var maxHeaderHeight = Math.max($(document).width() / 12, minHeaderHeight);
    var offsetBeforeHeaderFx = 50;
    var offsetAfterHeaderFx = offsetBeforeHeaderFx * 7;

    if (top > 0) {
      header.addClass('header-with-shadow');
      scrollHint.fadeOut();
    } else {
      header.removeClass('header-with-shadow');
      scrollHint.fadeIn();
    }

    if (top < offsetBeforeHeaderFx) {
      header.css('height', `${maxHeaderHeight}px`);
      header.css('background-color', '');
      header.css('color', '');

      links.css('color', '');
      links.css('border-color', '');
    } else if (top >= offsetBeforeHeaderFx && top < offsetAfterHeaderFx) {
      var opacity = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
      var colorStrength = (255 * opacity) | 0;
      header.css('background-color', `rgba(${headerColor}, ${opacity})`);
      header.css('height', `${opacity * minHeaderHeight + (1.0 - opacity) * maxHeaderHeight}px`);
      header.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);

      links.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
      links.css('border-color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
    } else {
      header.css('background-color', `rgba(${headerColor}, 1.0)`);
      header.css('height', `${minHeaderHeight}px`);
      header.css('color', `rgba(255, 255, 255, 1.0)`);

      links.css('color', `rgba(255, 255, 255, 1.0)`);
      links.css('border-color', `rgba(255, 255, 255, 1.0)`);
    }
  }

  recomputeHeader();
  $(window).scroll(recomputeHeader);
  $(window).resize(recomputeHeader);

  $('.accordion').accordion({
    heightStyle: "content"
  });
});

function scrollToContact() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
}
