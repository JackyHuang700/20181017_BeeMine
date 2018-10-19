// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.
// This file is used for javascript code
// necessary for some pages to work properly.
"use strict";

function getWidth(a) {
  // Return the integer value of the computed width of a DOM node.
  // Ex. getWidth(node);
  var w = getStyle(a, 'width');
  if (w.indexOf('px') !== -1) return parseInt(w.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];

  for (var i = 0; i < 4; i++) {
    p[i] = p[i].indexOf('px') !== -1 ? parseInt(p[i]) : 0;
  }

  return Math.max(0, a.offsetWidth - p[1] - p[3]);
}

function getHeight(a) {
  // Return the integer value of the computed height of a DOM node.
  // Ex. getHeight(node);
  var h = getStyle(a, 'height');
  if (h.indexOf('px') !== -1) return parseInt(h.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];

  for (var i = 0; i < 4; i++) {
    p[i] = p[i].indexOf('px') !== -1 ? parseInt(p[i]) : 0;
  }

  return Math.max(0, a.offsetHeight - p[0] - p[2]);
}

function getLeft(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getLeft(node);
  var b = a.offsetLeft;

  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetLeft;
  }

  return b;
}

function getTop(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getTop(node);
  var b = a.offsetTop;

  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetTop;
  }

  return b;
}

function getPageYOffset() {
  // Return the integer value for the vertical position of the scroll bar.
  return window.pageYOffset || document.documentElement.scrollTop;
}

function getPageXOffset() {
  // Return the integer value for the horizontal position of the scroll bar.
  return window.pageXOffset || document.documentElement.scrollLeft;
}

function getWindowY() {
  // Return the integer value for the browser window height.
  return window.innerHeight || document.documentElement.clientHeight;
}

function getWindowX() {
  // Return the integer value for the browser window width.
  return window.innerWidth || document.documentElement.clientWidth;
}

function isMobile() {
  // Return true if the mobile CSS stylesheet is used.
  if (getStyle(document.getElementById('detectmobile'), 'display') !== 'none') return true;
  return false;
}

function scrollToNode(t) {
  // Scroll to any node on the page.
  var status = document.body.getAttribute('data-scrollstatus');

  if (status !== null && status !== '') {
    clearInterval(document.body.getAttribute('data-scrollstatus'));
    document.body.removeAttribute('data-scrollstatus');
  }

  var delay = 800;
  var py = getPageYOffset();
  var fy = getTop(t);
  var dy = fy - py;
  var x = getPageXOffset();
  var oti = new Date().getTime();
  document.body.setAttribute('data-scrollstatus', setInterval(function () {
    var nti = new Date().getTime() - oti;

    if (nti >= delay) {
      window.scrollTo(x, fy);
      clearInterval(document.body.getAttribute('data-scrollstatus'));
      document.body.removeAttribute('data-scrollstatus');
      return;
    }

    var p = nti / delay;
    p = p * (1 + 0.5 * (1 - p));
    window.scrollTo(x, (py + dy * p).toFixed(0));
  }, 10));
}

function supportCSS(id) {
  // Return true if the browser supports given CSS feature.
  var domPrefixes = 'Webkit Moz ms O'.split(' ');
  var nd = document.createElement('DIV');
  id = id.toLowerCase();
  if (nd.style[id] !== undefined) return true;
  var idc = id.charAt(0).toUpperCase() + id.substr(1);

  for (var i = 0, n = domPrefixes.length; i < n; i++) {
    if (nd.style[domPrefixes[i] + idc] !== undefined) return true;
  }

  return false;
}

function loadYoutubeVideo(e) {
  var open = document.querySelector(".mainvideo-btn-open");
  var close = document.querySelector(".mainvideo-btn-close");
  var modal = document.querySelector(".modal");
  var video = document.querySelector(".modal-video");
  var modalOverlay = document.querySelector(".modal-overlay");

  if (e.target === open) {
    modal.classList.remove("closed");
    video.src = open.getAttribute("data-youtubeurl");
    modalOverlay.classList.remove("closed");
  } else if (e.target === close) {
    modal.classList.add("closed");
    video.src = "";
    modalOverlay.classList.add("closed");
  }
}

function expandBox(t) {
  // Expand or shrink box.
  t.style.transition = t.style.MozTransition = t.style.WebkitTransition = 'all 0s ease 0s';
  if (t.className.indexOf('expanded') === -1) addClass(t, 'expanded');else removeClass(t, 'expanded');
  setTimeout(function () {
    t.style.transition = t.style.MozTransition = t.style.WebkitTransition = '';
  }, 20);
}

function boxShow(e) {
  function init(e) {
    var t = getEvent(e, 'target');

    while (t.nodeName !== 'DIV') {
      t = t.parentNode;
    }

    expandBox(t);
    cancelEvent(e);
  }

  document.querySelectorAll(".boxexpand > h1:first-child").forEach(function (accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
  document.querySelectorAll(".boxexpand > h2:first-child").forEach(function (accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
  document.querySelectorAll(".boxexpand > h3:first-child").forEach(function (accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
}

function faqShow(e) {
  // Display the content of a question in the FAQ at user request.
  function init(e) {
    var t = getEvent(e, 'target');

    while (t.nodeType !== 1 || t.nodeName !== 'DIV') {
      t = t.nextSibling;
    }

    expandBox(t);
    cancelEvent(e);
  }

  onTouchClick(e, init);
}

function materialShow(e) {
  // Display more materials on the "Press center" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
        p = t;

    while (p.nodeType !== 1 || p.nodeName !== 'DIV') {
      p = p.parentNode;
    }

    expandBox(p);
    cancelEvent(e);
  }

  onTouchClick(e, init);
}

function librariesShow(e) {
  // Display more open source projects on the "Development" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
        p = t;

    while (p.nodeType !== 1 || p.nodeName !== 'UL') {
      p = p.parentNode;
    }

    expandBox(p);
    cancelEvent(e);
  }

  onTouchClick(e, init);
}

function freenodeShow(e) {
  // Display freenode chat window on the "Development" page at user request.
  document.getElementById('chatbox').innerHTML = '<iframe style=width:98%;min-width:400px;height:600px src="http://webchat.freenode.net/?channels=bitcoin-dev" />';
  cancelEvent(e);
}

function updateToc() {
  // Update table of content active entry and browser url on scroll.
  var pageoffset;
  var windowy;
  var toc;
  var fallback;
  var first;
  var last;
  var closer;

  function init() {
    setenv();
    updatehistory();
    updatetoc();
  } // Set variables.


  function setenv() {
    pageoffset = getPageYOffset();
    windowy = getWindowY();
    toc = document.getElementById('toc');
    fallback = document.getElementsByTagName("H2")[0] || document.getElementsByTagName("H3")[0];
    first = [fallback, getTop(fallback)];
    last = [fallback, getTop(fallback)];
    closer = [fallback, getTop(fallback)]; // Find all titles in toc.

    var nodes = [];
    var tags = ['H2', 'H3', 'H4', 'H5', 'H6'];

    for (var i = 0, n = tags.length; i < n; i++) {
      for (var ii = 0, t = document.getElementsByTagName(tags[i]), nn = t.length; ii < nn; ii++) {
        if (t[ii].className.indexOf('no_toc') !== -1) continue;
        nodes.push(t[ii]);
      }
    } // Find first title, last title and closer title.


    for (var i = 0, n = nodes.length; i < n; i++) {
      if (!nodes[i].id) continue;
      var top = getTop(nodes[i]);
      if (top < first[1]) first = [nodes[i], top];
      if (top > last[1]) last = [nodes[i], top];
      if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
    } // Set closer title to first or last title if at the top or bottom of the page.


    if (pageoffset < first[1]) closer = [first[0], first[1]];
    if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]];
  } // Update toc position and set active toc entry.


  function updatetoc() {
    // Set bottom and top to fit within window and not overflow its parent node.
    var div = toc.getElementsByTagName('DIV')[0];
    var sidebarHeight = document.querySelector(".sidebar").offsetHeight;
    var footerTop = document.querySelector(".footer").offsetTop;

    if (window.scrollY >= getTop(toc) - 20 && window.scrollY + sidebarHeight + 20 <= footerTop) {
      addClass(div, "scroll");
    } else {
      removeClass(div, "scroll");
    } // Remove .active class from toc and find new active toc entry.


    var a = false;

    for (var i = 0, t = toc.getElementsByTagName('*'), n = t.length; i < n; i++) {
      removeClass(t[i], 'active');

      if (t[i].nodeName === 'A' && t[i].getAttribute('href') === '#' + closer[0].id && closer[0].parentNode.classList.contains("expanded")) {
        a = t[i];
      }
    }

    if (a === false) return; // Set .active class on new active toc entry.

    var nd = a;

    while (nd.parentNode.nodeName === 'LI' || nd.parentNode.nodeName === 'UL') {
      addClass(nd, 'active');
      nd = nd.parentNode;
    } // Auto-scroll in toc to keep active toc entry visible.


    var nd = a;
    var otop = nd.offsetTop;

    while (nd.offsetParent !== div && nd.offsetParent) {
      nd = nd.offsetParent;
      otop += nd.offsetTop;
    }

    var bdiff = getHeight(a) + otop - div.scrollTop - getHeight(div);
    var tdiff = getHeight(a) - otop + div.scrollTop;
    if (tdiff > 0 || bdiff > 0) div.scrollTop -= tdiff;
  } // Update browser url.


  function updatehistory() {
    // Don't call window.history if not supported.
    if (!window.history || !window.history.replaceState) return; // Don't update window url when it doesn't need to be updated.

    if (new RegExp('#' + closer[0].id + '$').test(window.location.href.toString())) return; // Don't update window url when the window is over the first title in the page.

    if (pageoffset < first[1]) return; // Don't update window url when page is not loaded, or user just clicked a url.

    if (!toc.hasAttribute('data-timestamp') || toc.getAttribute('data-timestamp') > new Date().getTime() - 1000) return;
    window.history.replaceState(null, null, '#' + closer[0].id);
  } // Reset timestamp on page load and each time the user clicks a url.


  function evtimestamp() {
    toc = document.getElementById('toc');
    document.getElementById('toc').setAttribute('data-timestamp', new Date().getTime());
  }

  addEvent(window, 'scroll', init);
  addEvent(window, 'popstate', evtimestamp);
  addEvent(window, 'load', evtimestamp);
}

function updateIssue(e) {
  // Update GitHub issue link pre-filled with current page location.
  var t = getEvent(e, 'target');
  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?body=' + encodeURIComponent('Location: ' + window.location.href.toString() + "\n\n");
}

function updateSource(e) {
  // Update GitHub source file link pre-filled with current page location.
  if (!document.getElementsByClassName) return;
  var t = getEvent(e, 'target'),
      nodes = document.getElementsByClassName('sourcefile'),
      pageoffset = Math.max(0, getPageYOffset() + 100),
      windowy = getWindowY(),
      fallback = nodes[0],
      first = [fallback, getTop(fallback)],
      last = [fallback, getTop(fallback)],
      closer = [fallback, getTop(fallback)]; // Find first, last and closer node.

  for (var i = 0, n = nodes.length; i < n; i++) {
    var top = getTop(nodes[i]);
    if (top < first[1]) first = [nodes[i], top];
    if (top > last[1]) last = [nodes[i], top];
    if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
  } // Set closer title to first or last title if at the top or bottom of the page.


  if (pageoffset < first[1]) closer = [first[0], first[1]];
  if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]]; // Set updated url to source file.

  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/' + closer[0].getAttribute('data-sourcefile');
}

function disclaimerClose(e) {
  // Auto close temporary disclaimer in devel-docs.
  if (e) cancelEvent(e);
  var t = document.getElementById('develdocdisclaimer');
  t.parentNode.removeChild(t);
  if (typeof Storage === 'undefined') return;
  sessionStorage.setItem('develdocdisclaimerclose', '1');
}

function disclaimerAutoClose() {
  // Auto close temporary disclaimer in devel-docs if session says so.
  if (typeof Storage === 'undefined') return;
  if (sessionStorage.getItem('develdocdisclaimerclose') === '1') disclaimerClose();
}

function walletRotate() {
  // Rotate wallets once a day.
  var ar = {
    1: [],
    2: [],
    3: [],
    4: []
  };

  for (var i = 0, nds = document.getElementById('wallets').childNodes, n = nds.length; i < n; i++) {
    if (nds[i].nodeType !== 1) continue;
    ar[parseInt(nds[i].getAttribute('data-walletlevel'))].push(nds[i]);
  }

  var sum = Math.floor(new Date() / 86400000);

  for (var k in ar) {
    if (!ar.hasOwnProperty(k)) continue;
    if (ar[k].length === 0) continue;
    var pre = ar[k][ar[k].length - 1].nextSibling;

    for (i = 0, n = sum % ar[k].length; i < n; i++) {
      ar[k][i].parentNode.insertBefore(ar[k][i], pre);
    }
  }
}

function walletScoreListener(e) {
  // Listen for events on wallet scores and display them on tap.
  var init = function init(e) {
    var t = getEvent(e, 'target');

    while (!t.parentNode.parentNode.parentNode.id) {
      t = t.parentNode;
    }

    t.className.indexOf('hover') === -1 ? addClass(t, 'hover') : removeClass(t, 'hover');
  };

  onTouchClick(e, init);
}

function makeEditable(e) {
  // An easter egg that makes the page editable when user click on the page and hold their mouse button for one second.
  // This trick allows translators and writers to preview their work.
  e = e || window.event;

  switch (getEvent(e, 'type')) {
    case 'mousedown':
      if (e.which && e.which === 3 || e.button && e.button === 2) return;
      var t = getEvent(e, 'target');

      while (t.parentNode) {
        if (getStyle(t, 'overflow') === 'auto' || getStyle(t, 'overflow-y') === 'auto' || getStyle(t, 'overflow-x') === 'auto') return;
        t = t.parentNode;
      }

      addEvent(document.body, 'mouseup', makeEditable);
      addEvent(document.body, 'mousemove', makeEditable);
      document.body.setAttribute('timeoutEdit', setTimeout(function () {
        removeEvent(document.body, 'mouseup', makeEditable);
        removeEvent(document.body, 'mousemove', makeEditable);
        var c = document.getElementById('content');
        c.contentEditable = true;
        c.style.borderColor = '#bfbfbf';
        setTimeout(function () {
          c.style.borderColor = '';
        }, 200);
      }, 1000));
      break;

    case 'mouseup':
    case 'mousemove':
      removeEvent(document.body, 'mouseup', makeEditable);
      removeEvent(document.body, 'mousemove', makeEditable);
      clearTimeout(document.body.getAttribute('timeoutEdit'));
      break;
  }
} // Add makeEditable event listener


var xint = setInterval(function () {
  if (!document.body) return;
  addEvent(document.body, 'mousedown', makeEditable);
  clearInterval(xint);
}, 200);

function generateDonationUrl(address, amountBtc, message) {
  var result = [address];
  amountBtc = parseFloat(amountBtc);

  if (!isNaN(amountBtc)) {
    result.push('?amount=' + amountBtc);
  }

  if (message !== '') {
    message = encodeURIComponent(message);
    result.push(result.length === 1 ? '?' : '&');
    result.push('message=' + message);
  }

  return result.join('');
}

function generateDonationQrCode() {
  var qrcodeContainer = $('#donation-qr-code');
  qrcodeContainer.empty();
  var address = qrcodeContainer.data('address');
  var amount = $('#donation-input-amount-btc').val();
  var message = $('#donation-input-message').val();
  var text = 'bitcoin:' + generateDonationUrl(address, amount, message);
  $('#donation-qr-code').qrcode({
    width: 150,
    height: 150,
    text: text
  });
}

function loadTickerPrices() {
  $.ajax('https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=USD').then(function (data) {
    var rate = data.BTCUSD.last;

    function usdToBtc(amount) {
      var amountUsd = parseFloat(amount);

      if (isNaN(amountUsd)) {
        return 0;
      }

      var amountBtc = amountUsd / rate;
      return amountBtc.toFixed(8);
    }

    function btcToUsd(amount) {
      var amountBtc = parseFloat(amount);

      if (isNaN(amountBtc)) {
        return 0;
      }

      var amountUsd = amountBtc * rate;
      return amountUsd.toFixed(2);
    }

    $('#donation-input-amount-usd').on('input', function () {
      var amount = $(this).val();
      $('#donation-input-amount-btc').val(usdToBtc(amount));
      generateDonationQrCode();
    });
    $('#donation-input-amount-btc').on('input', function () {
      var amount = $(this).val();
      $('#donation-input-amount-usd').val(btcToUsd(amount));
      generateDonationQrCode();
    });
    $('#donation-input-message').on('input', function () {
      generateDonationQrCode();
    });
    $('[data-amount-usd]').each(function () {
      var amountUsd = $(this).data('amount-usd');
      var amountBtc = usdToBtc(amountUsd);
      $('div', this).text('(' + amountBtc + ' BTC)');
      $(this).on('click', function () {
        $('#donation-input-amount-btc').val(amountBtc);
        $('#donation-input-amount-usd').val(amountUsd);
        generateDonationQrCode();
      });
    });
  });
}

function openDonationModal() {
  var drop = $('<div class="modal-drop" />');
  var body = $('body');
  var modal = $('#donation-modal');
  body.append(drop);
  body.css('overflow', 'hidden');
  modal.css('display', 'block');
  drop.on('click', closeDonationModal); // postpone opacity update

  setTimeout(function () {
    drop.css('opacity', 1);
    modal.removeClass('hidden');
    modal.addClass('open');
  }, 0);
  loadTickerPrices();
  generateDonationQrCode();
}

function closeDonationModal() {
  var drop = $('.modal-drop');
  var body = $('body');
  var modal = $('#donation-modal');
  drop.css('opacity', 0);
  body.css('overflow', 'auto');
  setTimeout(function () {
    drop.remove();
    modal.addClass('hidden');
    modal.removeClass('open');
    modal.css('display', 'none');
  }, 120);
}

function toggleDonationBanner() {
  var banner = $('.donation-text');
  var open = $('.donation-visibility-toggle');
  open.addClass("active");
  banner.addClass("expanded");
}

function closeDonationBanner() {
  var banner = $(".donation-text");
  var open = $(".donation-visibility-toggle");
  open.removeClass("active");
  banner.removeClass("expanded");
}

function accordion() {
  $(document).ready(function ($) {
    $('.accordion-toggle').click(function () {
      //Expand or collapse this panel
      $(this).next().slideToggle('fast');
      $(this).toggleClass("active"); //Hide the other panels

      $(".accordion-content").not($(this).next()).slideUp("fast");
      $(".accordion-toggle").not($(this)).removeClass("active");
    });
  });
}

function onScrollButton() {
  var button = document.querySelector(".mob-sidebar-open");
  var buttonTop = button.offsetTop;
  var buttonHeight = button.offsetHeight;
  var sidebar = document.querySelector(".sidebar");
  var closeButton = document.querySelector(".mob-sidebar-close");
  var sidebarLinks = document.querySelectorAll(".sidebar-inner ul li");

  function stickyButton() {
    if (document.documentElement.clientWidth <= 640) {
      if (buttonTop === 0) {
        buttonTop = button.offsetTop;
      }

      var footerTop = document.querySelector(".footer").offsetTop; // Fixed menu

      if (window.scrollY >= buttonTop && window.scrollY + buttonHeight <= footerTop) {
        button.classList.add("is-fixed");
        document.body.style.paddingTop = buttonHeight + 25 + "px";
      } else {
        button.classList.remove("is-fixed");
        document.body.style.paddingTop = "";
      }
    }
  }

  function showSidebar() {
    sidebar.classList.add("is-open");
    button.classList.add("hide");
  }

  function hideSidebar() {
    sidebar.classList.remove("is-open");
    button.classList.remove("hide");
  }

  window.addEventListener("scroll", stickyButton);
  button.addEventListener("click", showSidebar);
  closeButton.addEventListener("click", hideSidebar);

  for (var i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener("click", function (event) {
      console.log('good');

      if (document.documentElement.clientWidth <= 640) {
        closeButton.click();
      }
    });
  }
}

function walletMenuAccordion() {
  var tabs = document.querySelectorAll(".js-tab");

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      this.classList.toggle("is-expanded");

      for (var index = 0; index < tabs.length; index++) {
        if (this !== tabs[index]) {
          tabs[index].classList.remove("is-expanded");
        }
      }
    });
  }
}

function showNextMobileAccordion() {
  var platformItems = document.querySelectorAll(".js-platform");
  var tabs = document.querySelectorAll(".accordion-tab");
  var platformTab = document.querySelector(".accordion-tab-1");
  var osAccordion = document.querySelectorAll(".accordion-os");
  var walletAccordion = document.querySelector(".accordion-wallets");

  for (var i = 0; i < platformItems.length; i++) {
    platformItems[i].addEventListener("click", function (e) {
      for (var num = 0; num < tabs.length; num++) {
        tabs[num].classList.remove("is-selected");
        tabs[num].querySelector(".selected-item").textContent = "";
      }

      var selectedPlatform = e.target;
      var platformName = selectedPlatform.dataset.platformName;
      document.querySelector(".selected-platform").textContent = selectedPlatform.textContent; // Display next accordion and hide not selected accordion

      for (var a = 0; a < osAccordion.length; a++) {
        if (platformName === osAccordion[a].dataset.os) {
          osAccordion[a].classList.add("is-visible");
          osAccordion[a].querySelector('.accordion-tab-2').classList.add('is-expanded');
          platformTab.classList.add("is-selected");
        } else {
          osAccordion[a].classList.remove("is-visible");
        }
      } // Close accordion after selection


      platformTab.classList.remove("is-expanded"); // Hide wallet accordion if user want to change platform

      walletAccordion.classList.remove("is-visible");
    });
  }
} // This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.
// This file should be used only for javascript code
// necessary for all pages to work properly.


"use strict";

function addEvent(a, b, c) {
  // Attach event to a DOM node.
  // Ex. addEvent(node,'click',function);
  return a.addEventListener ? a.addEventListener(b, c, false) : a.attachEvent ? a.attachEvent('on' + b, c) : false;
}

function removeEvent(a, b, c) {
  // Detach event from a DOM node.
  // Ex. removeEvent(node,'click',function);
  return a.removeEventListener ? a.removeEventListener(b, c, false) : a.detachEvent ? a.detachEvent('on' + b, c) : false;
}

function cancelEvent(e) {
  // Cancel current event.
  // Ex. cancelEvent(event);
  e = e || window.event;
  e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

function getEvent(e, a) {
  // Return requested event property.
  // Ex. var target = getEvent(event, 'target');
  e = e ? e : window.event;

  switch (a) {
    case 'type':
      return e.type;

    case 'target':
      return e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target ? e.target : e.srcElement;
  }
}

function getStyle(a, b) {
  // Return the value of the computed style on a DOM node.
  // Ex. getStyle(node,'padding-bottom');
  if (window.getComputedStyle) return document.defaultView.getComputedStyle(a, null).getPropertyValue(b);
  var n = b.indexOf('-');
  if (n !== -1) b = b.substr(0, n) + b.substr(n + 1, 1).toUpperCase() + b.substr(n + 2);
  return a.currentStyle[b];
}

function addClass(node, data) {
  // Add class to node.
  var cl = node.className.split(' ');

  for (var i = 0, n = cl.length; i < n; i++) {
    if (cl[i] === data) return;
  }

  cl.push(data);
  node.className = cl.join(' ');
}

function removeClass(node, data) {
  // Remove class from node.
  var ocl = node.className.split(' ');
  var ncl = [];

  for (var i = 0, n = ocl.length; i < n; i++) {
    if (ocl[i] !== data) ncl.push(ocl[i]);
  }

  node.className = ncl.join(' ');
}

function supportsSVG() {
  // Return true if the browser supports SVG.
  // Ex. if(!supportsSVG()){..apply png fallback..}
  // Old FF 3.5 and Safari 3 versions have svg support, but a very poor one
  // http://www.w3.org/TR/SVG11/feature#Image Defeat FF 3.5 only
  // http://www.w3.org/TR/SVG11/feature#Animation Defeat Saf 3 but also returns false in IE9
  // http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute Defeat Saf 3 but also returns false in Chrome and safari4
  // http://www.w3.org/TR/SVG11/feature#Text Defeat Saf 3 but also returns false in FF and safari4
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return false;
  if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) return false;
  if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute", "1.1") && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Animation", "1.1") && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Text", "1.1")) return false;
  return true;
}

function fallbackSVG() {
  // Replace all images extensions from .svg to .png if browser doesn't support SVG files.
  if (supportsSVG()) return;

  for (var i = 0, nd = document.getElementsByTagName('*'), n = nd.length; i < n; i++) {
    if (nd[i].nodeName === 'IMG' && /.*\.svg$/.test(nd[i].src)) nd[i].src = nd[i].src.slice(0, -3) + 'png';
    if (/\.svg/.test(getStyle(nd[i], 'background-image'))) nd[i].style.backgroundImage = getStyle(nd[i], 'background-image').replace('.svg', '.png');
    if (/\.svg/.test(getStyle(nd[i], 'background'))) nd[i].style.background = getStyle(nd[i], 'background').replace('.svg', '.png');
  }
}

function onTouchClick(e, callback, callbackClick) {
  // Detect and handle clicks using click and touch events while preventing accidental or ghost clicks.
  var timeout = 1000,
      srcEvent = e,
      touchEndListener = function touchEndListener(e) {
    // Call callback if touch events match the patterns of a click.
    removeEvent(t, 'touchend', touchEndListener);
    setClickTimeout();
    if (Math.abs(e.changedTouches[0].pageX - x) > 20 || Math.abs(e.changedTouches[0].pageY - y) > 20) return;
    callback(srcEvent);
  },
      wrongClickListener = function wrongClickListener(e) {
    // Cancel click events on different targets within timeframe.
    // This avoids accidental clicks when the page is scrolled or updated due to the 300ms click event delay on mobiles.
    removeEvent(document.body, 'click', wrongClickListener);
    if (!clickReady() && getEvent(e, 'target') !== t) cancelEvent(e);
  },
      setClickTimeout = function setClickTimeout() {
    // Update timeout during which click events will be blocked.
    document.body.setAttribute('data-touchtimeout', new Date().getTime() + timeout);
  },
      clickReady = function clickReady() {
    // Check if timeout during click events are blocked has expired.
    var ti = document.body.getAttribute('data-touchtimeout');
    return ti === null || ti === '' || parseInt(ti, 10) < new Date().getTime();
  };

  if (callbackClick === undefined) callbackClick = function callbackClick() {}; // Apply appropriate actions according to each event type.

  switch (getEvent(e, 'type')) {
    case 'touchstart':
      // Save initial touchstart coordinates and listen for touchend events and accidental click events.
      var x = e.changedTouches[0].pageX,
          y = e.changedTouches[0].pageY,
          t = e.changedTouches[0].target;
      setClickTimeout();
      addEvent(t, 'touchend', touchEndListener);
      addEvent(document.body, 'click', wrongClickListener);
      setTimeout(function () {
        removeEvent(document.body, 'click', wrongClickListener);
      }, timeout);
      break;

    case 'click':
      // Call callback on click in the absence of a recent touchstart event to prevent ghost clicks.
      // Always call callbackClick to let it cancel click events on links.
      callbackClick(srcEvent);
      if (!clickReady()) return;
      callback(srcEvent);
      break;
  }
}

function mobileMenuShow(e) {
  // Show the mobile menu when the visitors touch the menu icon.
  var show = function show() {
    var mm = document.getElementById('menusimple');
    var ml = document.getElementById('langselect');
    mm.style.display = ml.style.display = mm.style.display === 'block' ? '' : 'block';
    addClass(mm, 'menutap');
    cancelEvent(e);
  };

  onTouchClick(e, show);
}

function mobileMenuHover(e) {
  // Prevent mobile menu to shrink on hover to prevent accidental clicks on other entries.
  var t = getEvent(e, 'target'),
      fn = t.parentNode.className.indexOf('hover') === -1 ? addClass : removeClass,
      initHover = function initHover() {
    if (t.nodeName !== 'A') return;
    if (fn === removeClass && !hasSubItems(t)) return;
    var p = t;

    while (p.parentNode.nodeName === 'UL' || p.parentNode.nodeName === 'LI') {
      p = p.parentNode;
    }

    for (var i = 0, nds = p.getElementsByTagName('LI'), n = nds.length; i < n; i++) {
      if (nds[i] === t.parentNode) continue;
      if (hasSubItems(nds[i])) continue;
      removeClass(nds[i], 'hover');
    }

    while (t !== p) {
      if (t.nodeName === 'LI') {
        fn(t, 'hover');
      }

      t = t.parentNode;
    }
  },
      hasSubItems = function hasSubItems(t) {
    while (t.nodeName !== 'LI') {
      t = t.parentNode;
    }

    return t.getElementsByTagName('UL').length > 0;
  },
      // Prevent clicks on parent element links in the menu.
  filterClick = function filterClick(e) {
    var t = getEvent(e, 'target');
    if (t.nodeName !== 'A') return;
    if (hasSubItems(t)) cancelEvent(e);
  };

  onTouchClick(e, initHover, filterClick);
}

function addAnchorLinks() {
  // Apply anchor links icon on each title displayed on CSS hover.
  var nodes = [];
  var tags = ['H2', 'H3', 'H4', 'H5', 'H6'];

  for (var i = 0, n = tags.length; i < n; i++) {
    for (var ii = 0, t = document.getElementsByTagName(tags[i]), nn = t.length; ii < nn; ii++) {
      nodes.push(t[ii]);
    }
  }

  for (var i = 0, n = nodes.length; i < n; i++) {
    if (!nodes[i].id) continue;
    if (nodes[i].getElementsByTagName('A').length > 0 && nodes[i].getElementsByTagName('A')[0].innerHTML === '') return;
    addClass(nodes[i], 'anchorAf');
    var anc = document.createElement('A');
    anc.href = '#' + nodes[i].id;
    nodes[i].insertBefore(anc, nodes[i].firstChild);
  }
}
/* jshint ignore:start */


function _gaLt(event) {
  /* If GA is blocked or not loaded, or not main|middle|touch click then don't track */
  if (!ga.hasOwnProperty("loaded") || ga.loaded != true || event.which != 1 && event.which != 2) {
    return;
  }

  var el = event.srcElement || event.target;
  /* Loop up the DOM tree through parent elements if clicked element is not a link (eg: an image inside a link) */

  while (el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)) {
    el = el.parentNode;
  }
  /* if a link with valid href has been clicked */


  if (el && el.href) {
    var link = el.href;
    /* Only if it is an external link */

    if (link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)) {
      /* Is actual target set and not _(self|parent|top)? */
      var target = el.target && !el.target.match(/^_(self|parent|top)$/i) ? el.target : false;
      /* Assume a target if Ctrl|shift|meta-click */

      if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
        target = "_blank";
      }

      var hbrun = false; // tracker has not yet run

      /* HitCallback to open link in same window after tracker */

      var hitBack = function hitBack() {
        /* run once only */
        if (hbrun) return;
        hbrun = true;
        window.location.href = link;
      };

      if (target) {
        /* If target opens a new window then just track */
        ga("send", "event", "Outgoing Links", link, document.location.pathname + document.location.search);
      } else {
        /* Prevent standard click, track then open */
        event.preventDefault ? event.preventDefault() : event.returnValue = !1;
        /* send event with callback */

        ga("send", "event", "Outgoing Links", link, document.location.pathname + document.location.search, {
          "hitCallback": hitBack
        });
        /* Run hitCallback again if GA takes longer than 1 second */

        setTimeout(hitBack, 1000);
      }
    }
  }
}

function trackOutgoingLinks() {
  if (navigator.doNotTrack != "yes" && navigator.doNotTrack != "1" && window.doNotTrack != "1" && navigator.msDoNotTrack != "1") {
    var _w = window;
    /* Use "click" if touchscreen device, else "mousedown" */

    var _gaLtEvt = "ontouchstart" in _w ? "click" : "mousedown";
    /* Attach the event to all clicks in the document after page has loaded */


    _w.addEventListener ? _w.addEventListener("load", function () {
      document.body.addEventListener(_gaLtEvt, _gaLt, !1);
    }, !1) : _w.attachEvent && _w.attachEvent("onload", function () {
      document.body.attachEvent("on" + _gaLtEvt, _gaLt);
    });
  }
}
/* jshint ignore:end */
//# sourceMappingURL=global.js.map