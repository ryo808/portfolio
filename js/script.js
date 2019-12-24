// ---KV_particle---
stage = new createjs.Stage("kvCanvas");
particleSystem = new particlejs.ParticleSystem();
stage.addChild(particleSystem.container);
particleSystem.importFromJson(
  {
    "bgColor": "#00000",
    "width": 1920,
    "height": 617,
    "emitFrequency": 60,
    "startX": 501.791985428051,
    "startXVariance": 3000,
    "startY": 556.430472854641,
    "startYVariance": 617,
    "initialDirection": "270",
    "initialDirectionVariance": "360",
    "initialSpeed": "1",
    "initialSpeedVariance": "0",
    "friction": "0.071",
    "accelerationSpeed": "0.1045",
    "accelerationDirection": "270",
    "startScale": "0.5",
    "startScaleVariance": "1",
    "finishScale": "0",
    "finishScaleVariance": "0",
    "lifeSpan": "136",
    "lifeSpanVariance": "27",
    "startAlpha": "1",
    "startAlphaVariance": "0",
    "finishAlpha": "0.8",
    "finishAlphaVariance": "0",
    "shapeIdList": [
        "circle",
        "blur_circle"
    ],
    "startColor": {
        "hue": 184,
        "hueVariance": 360,
        "saturation": 34,
        "saturationVariance": "0",
        "luminance": "70",
        "luminanceVariance": "50"
    },
    "blendMode": true,
    "alphaCurveType": "1",
    "VERSION": "1.0.0"
}
);
createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", handleTick);
function handleTick() {
  particleSystem.update();
  stage.update();
}
// ---/KV_particle---

$(function(){
  // ---KV_canvas---
  var kvW = $('#kv').width();
  var kvH = $('#kv').height();
  $('#kvCanvas').attr('width', kvW);
  $('#kvCanvas').attr('height', kvH);
  // ---/KV_canvas---
  // ---nav_current---
  var currentPos = 500; //ウインドウ上部からどれぐらいの位置で変化させるか
  var boxTop = new Array;
  var current = -1;
  $('.position-now').each(function (i) {
    boxTop[i] = $(this).offset().top;
  });
  changeBox(0);
  $(window).scroll(function () {
    scrollPosition = $(window).scrollTop();
    for (var i = boxTop.length - 1; i >= 0; i--) {
      if ($(window).scrollTop() > boxTop[i] - currentPos) {
        changeBox(i);
        break;
      }
    };
  });
  //ナビの処理
  function changeBox(secNum) {
    if (secNum != current) {
      current = secNum;
      secNum2 = secNum + 1;
      $('.header-box nav ul li a').removeClass('link-current');
      if (current == 0) {
        $('#current00_js').addClass('link-current');
      } else if (current == 1) {
        $('#current01_js').addClass('link-current');
      } else if (current == 2) {
        $('#current02_js').addClass('link-current');
      }
      else if (current == 3) {
        $('#current03_js').addClass('link-current');
      }
      else if (current == 4) {
        $('#current04_js').addClass('link-current');
      }
    }
  };
  $('a[href^="#"]').click(function () {
    var adjust = -100;
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top + adjust;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
  // ---/nav_current---
  // ---drawer---
  $('.navbar_toggle').on('click', function () {
    $(this).toggleClass('open');
    $('.menu').toggleClass('open');
  });
  $('.menu li a').on('click', function () {
    $('.navbar_toggle').toggleClass('open');
    $('.menu').toggleClass('open');
  });
  // ---/drawer---
  // ---skill_animation---
  var wind = $(window);
  wind.on('scroll', function () {
    $(".skill-graph-bar span").each(function () {
      var bottom_of_object =
        $(this).offset().top + $(this).outerHeight();
      var bottom_of_window =
        $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-width');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
            width: myVal
        });
      }
    });
  });
  // ---/skill_animation---
});

$(window).scroll(function(){
  // ---KV_fixed---
  var kv = $('#kv'),
      header = $('header'),
      scroll = $(window).scrollTop(),
      height = kv.outerHeight();
  if ( scroll > height ) {
    header.addClass('fixed');
  } else {
    header.removeClass('fixed');
  }
  // ---/KV_fixed---
});

$(window).on("load", function () {
  // ---portfolio_filter---
  if ($(".portfolio-section").length) {
    var $elements = $(".portfolio-section");
    $elements.isotope();
    $(".portfolio-filter li").on("click", function () {
      $(".portfolio-filter li").removeClass("filter-item");
      $(this).addClass("filter-item");
      var selector = $(this).attr("data-filter");
      $(".portfolio-section").isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    });
  }
  // ---/portfolio_filter---
});