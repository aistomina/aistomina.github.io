$(function() {
  var header = $('header');
  var links = $('header > #links > a');
  var scrollHint = $('.scroll-hint');
  var headerColor = '51,51,50';
  var logo = $('#logo');
  var annaIstomina = $('.anna-istomina');
  var annaIstominaLink = $('.anna-istomina > a');

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

    if (top >= offsetBeforeHeaderFx && top < offsetAfterHeaderFx) {
      var opacity = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
    }

    if (top < offsetBeforeHeaderFx) {
      header.css('height', `${maxHeaderHeight}px`);
      header.css('background-color', '');
      annaIstominaLink.css('color', '');

      links.css('color', '');
      links.css('border-color', '');
      logo.css('opacity', `0`);
      annaIstomina.css('margin-left', `0`);
    } else if (top >= offsetBeforeHeaderFx && top < offsetAfterHeaderFx) {
      var opacity = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
      var colorStrength = (255 * opacity) | 0;
      header.css('background-color', `rgba(${headerColor}, ${opacity})`);
      header.css('height', `${opacity * minHeaderHeight + (1.0 - opacity) * maxHeaderHeight}px`);

      logo.css('opacity', `${opacity}`);
      logo.css('left', `${opacity * 40}px`);
      annaIstomina.css('margin-left', `${opacity * 40}px`);
      annaIstominaLink.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);

      links.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
      links.css('border-color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
    } else {
      header.css('background-color', `rgba(${headerColor}, 1.0)`);
      header.css('height', `${minHeaderHeight}px`);

      logo.css('opacity', `1.0`);
      logo.css('left', `40px`);
      annaIstomina.css('margin-left', `40px`);
      annaIstominaLink.css('color', `rgba(255, 255, 255, 1.0)`);

      links.css('color', `rgba(255, 255, 255, 1.0)`);
      links.css('border-color', `rgba(255, 255, 255, 1.0)`);
    }
  }

  recomputeHeader();
  $(window).scroll(recomputeHeader);
  $(window).resize(recomputeHeader);

  $('.accordion').accordion({
    heightStyle: "content",
    collapsible: true,
    active: false,
  });
});

function scrollToContact() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
}
