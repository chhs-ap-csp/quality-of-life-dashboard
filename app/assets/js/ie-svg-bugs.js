// fix svg problems in IE 11

if (navigator.userAgent.indexOf('Trident') > 0) {
  setTimeout(function() {
    // fix disappearing icons
    var elems = document.querySelectorAll('svg.icon use');
    for (var i = 0; i < elems.length; i++) {
      var link = elems[i].getAttributeNS(
          'https://www.w3.org/1999/xlink',
          'href'
      );
      elems[i].setAttributeNS('https://www.w3.org/1999/xlink', 'href', link);
    }

    // fix toc legend click makes it disappear
    // document.querySelector('#maplegend').style.pointerEvents = 'none';
  }, 5000);
}
