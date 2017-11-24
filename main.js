$(function() {
  var mediumScreen = '1100px';
  var smallScreen = '700px';

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

    var isSmallScreen = false;
    if (window.matchMedia(`(max-width: ${smallScreen})`).matches) {
      isSmallScreen = true;
		}

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

    if (isSmallScreen || top >= offsetAfterHeaderFx) {
      // Small screen or scrolled to the middle of screen: use final attributes.
      header.css('background-color', `rgba(${headerColor}, 1.0)`);
      header.css('height', `${minHeaderHeight}px`);
      links.css('color', `#ffffff`);
      links.css('border-color', `#ffffff`);
      annaIstominaLink.css('color', `#ffffff`);
    } else {
      if (top < offsetBeforeHeaderFx) {
        // Top of the page: use translucent header style.
        header.css('height', `${maxHeaderHeight}px`);
        header.css('background-color', '');
        links.css('color', '');
        links.css('border-color', '');
        annaIstominaLink.css('color', ``);
      } else {
        var tween = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
        var colorStrength = (255 * tween) | 0;
        header.css('height', `${tween * minHeaderHeight + (1.0 - tween) * maxHeaderHeight}px`);
        header.css('background-color', `rgba(${headerColor}, ${tween})`);
        links.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
        links.css('border-color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
        annaIstominaLink.css('color', `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`);
      }
    }

    if (top < offsetBeforeHeaderFx) {
      logo.css('opacity', `0`);
      annaIstomina.css('opacity', '1.0');
      annaIstomina.css('margin-left', `0`);
    } else if (top >= offsetBeforeHeaderFx && top < offsetAfterHeaderFx) {
      var tween = (top - offsetBeforeHeaderFx) / (offsetAfterHeaderFx - offsetBeforeHeaderFx);
      logo.css('opacity', `${tween}`);
      logo.css('left', `${tween * 40}px`);
      if (isSmallScreen) {
        annaIstomina.css('opacity', `${1.0 - tween}`);
      }
      annaIstomina.css('margin-left', `${tween * 40}px`);
    } else {
      logo.css('opacity', `1.0`);
      logo.css('left', `40px`);

      if (isSmallScreen) {
        annaIstomina.css('opacity', '0');
      }
      annaIstomina.css('margin-left', `40px`);
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
  $("html, body").animate({ scrollTop: $(document).height() - $('footer').height() - $('header').height() }, 1000);
}
