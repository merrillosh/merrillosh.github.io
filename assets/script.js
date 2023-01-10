(function () {
  var container, button, menu, links, i, len;
  container = document.getElementById("site-navigation");
  if (!container) {
      return;
  }
  button = container.getElementsByTagName("button")[0];
  if ("undefined" === typeof button) {
      return;
  }
  menu = container.getElementsByTagName("ul")[0];
  if ("undefined" === typeof menu) {
      button.style.display = "none";
      return;
  }
  menu.setAttribute("aria-expanded", "false");
  if (-1 === menu.className.indexOf("nav-menu")) {
      menu.className += " nav-menu";
  }
  button.onclick = function () {
      if (-1 !== container.className.indexOf("toggled")) {
          container.className = container.className.replace(" toggled", "");
          button.setAttribute("aria-expanded", "false");
          menu.setAttribute("aria-expanded", "false");
      } else {
          container.className += " toggled";
          button.setAttribute("aria-expanded", "true");
          menu.setAttribute("aria-expanded", "true");
      }
  };
  links = menu.getElementsByTagName("a");
  for (i = 0, len = links.length; i < len; i++) {
      links[i].addEventListener("focus", toggleFocus, true);
      links[i].addEventListener("blur", toggleFocus, true);
  }
  function toggleFocus() {
      var self = this;
      while (-1 === self.className.indexOf("nav-menu")) {
          if ("li" === self.tagName.toLowerCase()) {
              if (-1 !== self.className.indexOf("focus")) {
                  self.className = self.className.replace(" focus", "");
              } else {
                  self.className += " focus";
              }
          }
          self = self.parentElement;
      }
  }
  (function (container) {
      var touchStartFn,
          i,
          parentLink = container.querySelectorAll(".menu-item-has-children > a, .page_item_has_children > a");
      if ("ontouchstart" in window) {
          touchStartFn = function (e) {
              var menuItem = this.parentNode,
                  i;
              if (!menuItem.classList.contains("focus")) {
                  e.preventDefault();
                  for (i = 0; i < menuItem.parentNode.children.length; ++i) {
                      if (menuItem === menuItem.parentNode.children[i]) {
                          continue;
                      }
                      menuItem.parentNode.children[i].classList.remove("focus");
                  }
                  menuItem.classList.add("focus");
              } else {
                  menuItem.classList.remove("focus");
              }
          };
          for (i = 0; i < parentLink.length; ++i) {
              parentLink[i].addEventListener("touchstart", touchStartFn, false);
          }
      }
  })(container);
})();
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);
  if (isIe && document.getElementById && window.addEventListener) {
      window.addEventListener(
          "hashchange",
          function () {
              var id = location.hash.substring(1),
                  element;
              if (!/^[A-z0-9_-]+$/.test(id)) {
                  return;
              }
              element = document.getElementById(id);
              if (element) {
                  if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                      element.tabIndex = -1;
                  }
                  element.focus();
              }
          },
          false
      );
  }
})();
function initializeTheme() {
  function t() {
      $(window).width() > 768
          ? $(".parent-div").each(function () {
                var t = $(this).find(".first").height(),
                    e = $(this).find(".second").height();
                t > e
                    ? $(this)
                          .find(".second")
                          .css("height", t + "px")
                    : $(this)
                          .find(".first")
                          .css("height", e + "px");
            })
          : ($(".first").css("height", "auto"), $(".second").css("height", "auto"));
  }
  function e() {
      $(".site-content .homepage-content").css("opacity", 0),
          TweenMax.to($("#introduction .slide-1"), 0.75, { width: "0px", ease: Circ.easeInOut }, "-=1"),
          TweenMax.to($("#introduction"), 0.75, { height: "0%", ease: Circ.easeInOut, delay: 0.85 }, "-=1"),
          TweenMax.to($(".site-content .homepage-content"), 0.75, { delay: 1.25, autoAlpha: 1 }, "-=1"),
          $("body").removeClass("scrollStop");
  }
  function i() {
      $("#menu").hasClass("active") ? $("#menu").find("span").text("") : $("#menu").find("span").text(""),
          TweenMax.to($(this).find(".menu-circle"), 0.5, { ease: Elastic.easeOut.config(1, 0.5), width: 40, height: 40 }),
          TweenMax.to($(this).find("span"), 0.3, { ease: Power1.easeOut, opacity: 1, delay: 0.1 });
  }
  function n() {
      TweenMax.to($(this).find(".menu-circle"), 0.3, { ease: Elastic.easeOut.config(1, 0.5), width: 25, height: 25, delay: 0.1 }), TweenMax.to($(this).find("span"), 0.3, { ease: Circ.easeInOut, opacity: 0 });
  }
  function r() {
      $("#overlay-navigation").hasClass("active") ? o() : s();
  }
  function s() {
      TweenMax.to($("#overlay-navigation"), 1, { ease: Circ.easeInOut, y: "0%" }, "-=1"),
          TweenMax.to($("#overlay-navigation .inner, #overlay-navigation .socials"), 0.5, { ease: Power1.easeOut, css: { marginTop: 0, opacity: 1 }, delay: 1 }, "-=1"),
          $("#overlay-navigation, #menu").addClass("active"),
          setTimeout(function () {
              $("body").addClass("scrollStop");
          }, 500);
  }
  function o() {
      TweenMax.to($("#overlay-navigation"), 0.75, { y: "-100%", ease: Circ.easeInOut, delay: 0.5 }, "-=1"),
          TweenMax.to($("#overlay-navigation .inner,  #overlay-navigation .socials"), 0.5, { ease: Power1.easeOut, css: { marginTop: 0, opacity: 0 }, delay: 0 }, "-=1"),
          $("#overlay-navigation, #menu").removeClass("active"),
          $("body").removeClass("scrollStop");
  }
  function a() {
      $("#scrolling-wrapper").hasClass("mobile-view") &&
          $(window).scroll(function () {
              ($position = $(window).scrollTop()),
                  ($nearBottom = $(document).height() - ($(window).height() + 200)),
                  ($startScrolling = 100),
                  l($position > $startScrolling ? !0 : !1),
                  $position > $nearBottom ? $(".loader").hasClass("loading") || ($(".loader").addClass("loading"), h()) : (c(), $(".loader").hasClass("loading") && $(".loader").removeClass("loading"));
          });
  }
  function l(t) {
      t
          ? ($("#scrolling-wrapper .scroll-marker").removeClass("delay-200"), $("#scrolling-wrapper .scroll-marker").hasClass("fade-out") || $("#scrolling-wrapper .scroll-marker").addClass("fade-out"))
          : $("#scrolling-wrapper .scroll-marker").hasClass("fade-out") && $("#scrolling-wrapper .scroll-marker").removeClass("fade-out");
  }
  function h() {
      (p = setInterval(function () {
          m < 5 ? m++ : ($(".next-project-link").click(), c());
      }, 500)),
          d.push(p);
  }
  function c() {
      d.forEach(clearInterval), clearInterval(p), (clearInterval.length = 0), (m = 1);
  }
  function u() {
      ($wrapper = $("#page.site")),
          $wrapper.hasClass("is-animating") ||
              ($wrapper.addClass("is-animating"),
              (g = setInterval(function () {
                  ($active = $(".animatingWrapper .visible")), ($next = $active.next()), $active.removeClass("visible"), $next[0] ? $next.addClass("visible") : $(".animatingWrapper .word").first().addClass("visible");
              }, 1500)));
  }
  $(document).ready(function () {
      setTimeout(function () {
          e(), a();
      }, 500),
          t(),
          $(".fade-in-element").addClass("fade-in");
  }),
      $(window).resize(function () {
          t();
      }),
      $("#mc-subscribe").submit(function (t) {
          var e = $(this);
          return (
              $.ajax({
                  type: "GET",
                  url: "https://tdcreativeagency.us11.list-manage.com/subscribe/post-json?u=fa21028c00db83f71e4ce49e0&amp;id=ae32099ca2&c=?",
                  data: e.serialize(),
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  error: function (t) {
                      alert("Could not connect to the registration server.");
                  },
                  success: function (t) {
                      "success" != t.result
                          ? ($("#mc-subscribe .signup-internal").html('<h2 class="message">There was an issue with your subscription. Please contact us at holla@archiebolden.com</h2>'), console.log("Subscription Did not work"))
                          : $("#mc-subscribe .signup-internal").html('<h2 class="message">Thanks for joining!</h2>');
                  },
              }),
              !1
          );
      }),
      $(".fire-popup").click(function (t) {
          t.preventDefault(), $("#popup-container").fadeIn();
      }),
      $(".close-popup").click(function () {
          $("#popup-container").fadeOut();
      }),
      $(".home-carousel").owlCarousel({ loop: !0, autoplay: !0, items: 1, pagination: !1, lazyLoad: !0, nav: !1, mouseDrag: !1, touchDrag: !1, animateOut: "fadeOut", animateIn: "fadeIn" });
  var f = new WOW({ boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: function (t) {}, scrollContainer: null, resetAnimation: !0 });
  f.init();
  new LazyLoad({
      elements_selector: ".lazy",
      threshold: 300,
      callback_enter: function (t) {
          $(t).addClass("in-view");
      },
  });
  $("#menu").hover(i, n),
      $("#menu").click(function () {
          r();
      }),
      $("#overlay-navigation .navWrapper a").click(function () {
          o();
      }),
      $("#overlay-navigation .close-button").click(function () {
          $("#overlay-navigation").removeClass("active");
      }),
      document.getElementById("scrolling-container") ? ($(".site-footer").hide(), $("body").addClass("no-margin")) : ($(".site-footer").show(), $("body").removeClass("no-margin")),
      $(window).width() < 768 &&
          ($("#scrolling-wrapper").removeClass("selector"),
          $("#scrolling-wrapper").addClass("mobile-view"),
          $(".project-content .more-information").addClass("mobile-view"),
          $(".article-container .filter-projects .inner").addClass("mobile-filter")),
      $(".more-info-link").click(function () {
          $(".more-information ").toggle();
      }),
      $(".more-information.mobile-view").click(function () {
          $(".more-information ").hide();
      }),
      $(".selector").mousewheel(function (t, e) {
          (this.scrollLeft -= 40 * e),
              ($scrollWidth = document.getElementById("scrolling-wrapper").scrollWidth - $(window).width()),
              ($scrollPosition = this.scrollLeft),
              ($progress = ($scrollPosition / $scrollWidth) * 100),
              l($scrollPosition > 100 ? !0 : !1),
              $progress > 95 ? $(".loader").hasClass("loading") || ($(".loader").addClass("loading"), h()) : (p && c(), $(".loader").hasClass("loading") && $(".loader").removeClass("loading")),
              ($tracker = $progress.toString() + "%"),
              $(".fixed-progress-bar .progressBar .tracker").width($tracker),
              t.preventDefault();
      }),
      $(".filter-projects .mobile-filter").click(function () {
          $("#mobile-filter").fadeIn();
      }),
      $("#mobile-filter .close-popup").click(function () {
          $("#mobile-filter").fadeOut();
      }),
      clearInterval(p);
  var p,
      d = [],
      m = 1;
  $(".next-project-link").click(function () {
      c();
  }),
      document.getElementById("fixed-footer") &&
          (($win = $(window)),
          $win
              .on("scroll", function () {
                  ($scroll = $(this).scrollTop()),
                      ($windowHeight = $win.height()),
                      ($bottomScroll = $scroll + $windowHeight),
                      $("#projects").length &&
                          $("#mobile-projects").length &&
                          ($win.width() > 768 ? ($projects = $("#projects").offset().top - $windowHeight) : ($projects = $("#mobile-projects").offset().top - $windowHeight),
                          ($project1 = $("#project-1").offset().top + 100),
                          ($project2 = $("#project-2").offset().top + 100),
                          ($project3 = $("#project-3").offset().top + 100),
                          ($project4 = $("#project-4").offset().top + 100),
                          ($project5 = $("#project-5").offset().top + 100),
                          ($project6 = $("#project-6").offset().top + 100),
                          $scroll > $projects ? $("#fixed-footer").addClass("hidden-element") : $("#fixed-footer").removeClass("hidden-element"),
                          $bottomScroll > $project1
                              ? ($("#fixed-footer .scroll .scrolling, #fixed-footer .landing-read-more").removeClass("visible"), $("#fixed-footer .scroll .view, #fixed-footer .navigation").addClass("visible"))
                              : ($("#fixed-footer .scroll .scrolling, #fixed-footer .landing-read-more").addClass("visible"), $("#fixed-footer .scroll .view, #fixed-footer .navigation").removeClass("visible")),
                          $bottomScroll > $project1 && $bottomScroll < $project2 && ($("#fixed-footer .navigation").text("1/6"), $("#fixed-footer .view").attr("href", $("#title-1").attr("data-link"))),
                          $bottomScroll > $project2 && $bottomScroll < $project3 && ($("#fixed-footer .navigation").text("2/6"), $("#fixed-footer .view").attr("href", $("#title-2").attr("data-link"))),
                          $bottomScroll > $project3 && $bottomScroll < $project4 && ($("#fixed-footer .navigation").text("3/6"), $("#fixed-footer .view").attr("href", $("#title-3").attr("data-link"))),
                          $bottomScroll > $project4 && $bottomScroll < $project5 && ($("#fixed-footer .navigation").text("4/6"), $("#fixed-footer .view").attr("href", $("#title-4").attr("data-link"))),
                          $bottomScroll > $project5 && $bottomScroll < $project6 && ($("#fixed-footer .navigation").text("5/6"), $("#fixed-footer .view").attr("href", $("#title-5").attr("data-link"))),
                          $bottomScroll > $project6 && ($("#fixed-footer .navigation").text("6/6"), $("#fixed-footer .view").attr("href", $("#title-6").attr("data-link"))));
              })
              .on("resize", function () {
                  $windowHeight = $(this).height();
              })),
      $(".navWrapper, .animatingWrapper").addClass("ready"),
      $(".navWrapper a, .animatingWrapper .word").each(function () {
          var t = $(this).text().split("");
          ($this = $(this)),
              $this.empty(),
              $.each(t, function (t, e) {
                  " " == e && (e = "&nbsp;"), $this.append("<span>" + e + "</span");
              });
      });
  var g,
      _ = [];
  $(".animatingWrapper").length && 0 == _ && u();
}
!(function (t, e) {
  "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = t.document
            ? e(t, !0)
            : function (t) {
                  if (!t.document) throw new Error("jQuery requires a window with a document");
                  return e(t);
              })
      : e(t);
})("undefined" != typeof window ? window : this, function (t, e) {
  function i(t) {
      var e = t.length,
          i = rt.type(t);
      return "function" !== i && !rt.isWindow(t) && (!(1 !== t.nodeType || !e) || "array" === i || 0 === e || ("number" == typeof e && e > 0 && e - 1 in t));
  }
  function n(t, e, i) {
      if (rt.isFunction(e))
          return rt.grep(t, function (t, n) {
              return !!e.call(t, n, t) !== i;
          });
      if (e.nodeType)
          return rt.grep(t, function (t) {
              return (t === e) !== i;
          });
      if ("string" == typeof e) {
          if (ft.test(e)) return rt.filter(e, t, i);
          e = rt.filter(e, t);
      }
      return rt.grep(t, function (t) {
          return rt.inArray(t, e) >= 0 !== i;
      });
  }
  function r(t, e) {
      do t = t[e];
      while (t && 1 !== t.nodeType);
      return t;
  }
  function s(t) {
      var e = (wt[t] = {});
      return (
          rt.each(t.match(yt) || [], function (t, i) {
              e[i] = !0;
          }),
          e
      );
  }
  function o() {
      dt.addEventListener ? (dt.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (dt.detachEvent("onreadystatechange", a), t.detachEvent("onload", a));
  }
  function a() {
      (dt.addEventListener || "load" === event.type || "complete" === dt.readyState) && (o(), rt.ready());
  }
  function l(t, e, i) {
      if (void 0 === i && 1 === t.nodeType) {
          var n = "data-" + e.replace(St, "-$1").toLowerCase();
          if (((i = t.getAttribute(n)), "string" == typeof i)) {
              try {
                  i = "true" === i || ("false" !== i && ("null" === i ? null : +i + "" === i ? +i : Ct.test(i) ? rt.parseJSON(i) : i));
              } catch (r) {}
              rt.data(t, e, i);
          } else i = void 0;
      }
      return i;
  }
  function h(t) {
      var e;
      for (e in t) if (("data" !== e || !rt.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
      return !0;
  }
  function c(t, e, i, n) {
      if (rt.acceptData(t)) {
          var r,
              s,
              o = rt.expando,
              a = t.nodeType,
              l = a ? rt.cache : t,
              h = a ? t[o] : t[o] && o;
          if ((h && l[h] && (n || l[h].data)) || void 0 !== i || "string" != typeof e)
              return (
                  h || (h = a ? (t[o] = V.pop() || rt.guid++) : o),
                  l[h] || (l[h] = a ? {} : { toJSON: rt.noop }),
                  ("object" == typeof e || "function" == typeof e) && (n ? (l[h] = rt.extend(l[h], e)) : (l[h].data = rt.extend(l[h].data, e))),
                  (s = l[h]),
                  n || (s.data || (s.data = {}), (s = s.data)),
                  void 0 !== i && (s[rt.camelCase(e)] = i),
                  "string" == typeof e ? ((r = s[e]), null == r && (r = s[rt.camelCase(e)])) : (r = s),
                  r
              );
      }
  }
  function u(t, e, i) {
      if (rt.acceptData(t)) {
          var n,
              r,
              s = t.nodeType,
              o = s ? rt.cache : t,
              a = s ? t[rt.expando] : rt.expando;
          if (o[a]) {
              if (e && (n = i ? o[a] : o[a].data)) {
                  rt.isArray(e) ? (e = e.concat(rt.map(e, rt.camelCase))) : e in n ? (e = [e]) : ((e = rt.camelCase(e)), (e = e in n ? [e] : e.split(" "))), (r = e.length);
                  for (; r--; ) delete n[e[r]];
                  if (i ? !h(n) : !rt.isEmptyObject(n)) return;
              }
              (i || (delete o[a].data, h(o[a]))) && (s ? rt.cleanData([t], !0) : it.deleteExpando || o != o.window ? delete o[a] : (o[a] = null));
          }
      }
  }
  function f() {
      return !0;
  }
  function p() {
      return !1;
  }
  function d() {
      try {
          return dt.activeElement;
      } catch (t) {}
  }
  function m(t) {
      var e = Lt.split("|"),
          i = t.createDocumentFragment();
      if (i.createElement) for (; e.length; ) i.createElement(e.pop());
      return i;
  }
  function g(t, e) {
      var i,
          n,
          r = 0,
          s = typeof t.getElementsByTagName !== Tt ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== Tt ? t.querySelectorAll(e || "*") : void 0;
      if (!s) for (s = [], i = t.childNodes || t; null != (n = i[r]); r++) !e || rt.nodeName(n, e) ? s.push(n) : rt.merge(s, g(n, e));
      return void 0 === e || (e && rt.nodeName(t, e)) ? rt.merge([t], s) : s;
  }
  function _(t) {
      Ot.test(t.type) && (t.defaultChecked = t.checked);
  }
  function v(t, e) {
      return rt.nodeName(t, "table") && rt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t;
  }
  function y(t) {
      return (t.type = (null !== rt.find.attr(t, "type")) + "/" + t.type), t;
  }
  function w(t) {
      var e = Ut.exec(t.type);
      return e ? (t.type = e[1]) : t.removeAttribute("type"), t;
  }
  function x(t, e) {
      for (var i, n = 0; null != (i = t[n]); n++) rt._data(i, "globalEval", !e || rt._data(e[n], "globalEval"));
  }
  function b(t, e) {
      if (1 === e.nodeType && rt.hasData(t)) {
          var i,
              n,
              r,
              s = rt._data(t),
              o = rt._data(e, s),
              a = s.events;
          if (a) {
              delete o.handle, (o.events = {});
              for (i in a) for (n = 0, r = a[i].length; r > n; n++) rt.event.add(e, i, a[i][n]);
          }
          o.data && (o.data = rt.extend({}, o.data));
      }
  }
  function T(t, e) {
      var i, n, r;
      if (1 === e.nodeType) {
          if (((i = e.nodeName.toLowerCase()), !it.noCloneEvent && e[rt.expando])) {
              r = rt._data(e);
              for (n in r.events) rt.removeEvent(e, n, r.handle);
              e.removeAttribute(rt.expando);
          }
          "script" === i && e.text !== t.text
              ? ((y(e).text = t.text), w(e))
              : "object" === i
              ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !rt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML))
              : "input" === i && Ot.test(t.type)
              ? ((e.defaultChecked = e.checked = t.checked), e.value !== t.value && (e.value = t.value))
              : "option" === i
              ? (e.defaultSelected = e.selected = t.defaultSelected)
              : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue);
      }
  }
  function C(e, i) {
      var n,
          r = rt(i.createElement(e)).appendTo(i.body),
          s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(r[0])) ? n.display : rt.css(r[0], "display");
      return r.detach(), s;
  }
  function S(t) {
      var e = dt,
          i = Kt[t];
      return (
          i ||
              ((i = C(t, e)),
              ("none" !== i && i) ||
                  ((Jt = (Jt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement)), (e = (Jt[0].contentWindow || Jt[0].contentDocument).document), e.write(), e.close(), (i = C(t, e)), Jt.detach()),
              (Kt[t] = i)),
          i
      );
  }
  function k(t, e) {
      return {
          get: function () {
              var i = t();
              if (null != i) return i ? void delete this.get : (this.get = e).apply(this, arguments);
          },
      };
  }
  function P(t, e) {
      if (e in t) return e;
      for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, r = fe.length; r--; ) if (((e = fe[r] + i), e in t)) return e;
      return n;
  }
  function E(t, e) {
      for (var i, n, r, s = [], o = 0, a = t.length; a > o; o++)
          (n = t[o]),
              n.style &&
                  ((s[o] = rt._data(n, "olddisplay")),
                  (i = n.style.display),
                  e
                      ? (s[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && Et(n) && (s[o] = rt._data(n, "olddisplay", S(n.nodeName))))
                      : ((r = Et(n)), ((i && "none" !== i) || !r) && rt._data(n, "olddisplay", r ? i : rt.css(n, "display"))));
      for (o = 0; a > o; o++) (n = t[o]), n.style && ((e && "none" !== n.style.display && "" !== n.style.display) || (n.style.display = e ? s[o] || "" : "none"));
      return t;
  }
  function A(t, e, i) {
      var n = le.exec(e);
      return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e;
  }
  function O(t, e, i, n, r) {
      for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > s; s += 2)
          "margin" === i && (o += rt.css(t, i + Pt[s], !0, r)),
              n
                  ? ("content" === i && (o -= rt.css(t, "padding" + Pt[s], !0, r)), "margin" !== i && (o -= rt.css(t, "border" + Pt[s] + "Width", !0, r)))
                  : ((o += rt.css(t, "padding" + Pt[s], !0, r)), "padding" !== i && (o += rt.css(t, "border" + Pt[s] + "Width", !0, r)));
      return o;
  }
  function $(t, e, i) {
      var n = !0,
          r = "width" === e ? t.offsetWidth : t.offsetHeight,
          s = te(t),
          o = it.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, s);
      if (0 >= r || null == r) {
          if (((r = ee(t, e, s)), (0 > r || null == r) && (r = t.style[e]), ne.test(r))) return r;
          (n = o && (it.boxSizingReliable() || r === t.style[e])), (r = parseFloat(r) || 0);
      }
      return r + O(t, e, i || (o ? "border" : "content"), n, s) + "px";
  }
  function D(t, e, i, n, r) {
      return new D.prototype.init(t, e, i, n, r);
  }
  function N() {
      return (
          setTimeout(function () {
              pe = void 0;
          }),
          (pe = rt.now())
      );
  }
  function R(t, e) {
      var i,
          n = { height: t },
          r = 0;
      for (e = e ? 1 : 0; 4 > r; r += 2 - e) (i = Pt[r]), (n["margin" + i] = n["padding" + i] = t);
      return e && (n.opacity = n.width = t), n;
  }
  function M(t, e, i) {
      for (var n, r = (ye[e] || []).concat(ye["*"]), s = 0, o = r.length; o > s; s++) if ((n = r[s].call(i, e, t))) return n;
  }
  function L(t, e, i) {
      var n,
          r,
          s,
          o,
          a,
          l,
          h,
          c,
          u = this,
          f = {},
          p = t.style,
          d = t.nodeType && Et(t),
          m = rt._data(t, "fxshow");
      i.queue ||
          ((a = rt._queueHooks(t, "fx")),
          null == a.unqueued &&
              ((a.unqueued = 0),
              (l = a.empty.fire),
              (a.empty.fire = function () {
                  a.unqueued || l();
              })),
          a.unqueued++,
          u.always(function () {
              u.always(function () {
                  a.unqueued--, rt.queue(t, "fx").length || a.empty.fire();
              });
          })),
          1 === t.nodeType &&
              ("height" in e || "width" in e) &&
              ((i.overflow = [p.overflow, p.overflowX, p.overflowY]),
              (h = rt.css(t, "display")),
              (c = "none" === h ? rt._data(t, "olddisplay") || S(t.nodeName) : h),
              "inline" === c && "none" === rt.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== S(t.nodeName) ? (p.zoom = 1) : (p.display = "inline-block"))),
          i.overflow &&
              ((p.overflow = "hidden"),
              it.shrinkWrapBlocks() ||
                  u.always(function () {
                      (p.overflow = i.overflow[0]), (p.overflowX = i.overflow[1]), (p.overflowY = i.overflow[2]);
                  }));
      for (n in e)
          if (((r = e[n]), me.exec(r))) {
              if ((delete e[n], (s = s || "toggle" === r), r === (d ? "hide" : "show"))) {
                  if ("show" !== r || !m || void 0 === m[n]) continue;
                  d = !0;
              }
              f[n] = (m && m[n]) || rt.style(t, n);
          } else h = void 0;
      if (rt.isEmptyObject(f)) "inline" === ("none" === h ? S(t.nodeName) : h) && (p.display = h);
      else {
          m ? "hidden" in m && (d = m.hidden) : (m = rt._data(t, "fxshow", {})),
              s && (m.hidden = !d),
              d
                  ? rt(t).show()
                  : u.done(function () {
                        rt(t).hide();
                    }),
              u.done(function () {
                  var e;
                  rt._removeData(t, "fxshow");
                  for (e in f) rt.style(t, e, f[e]);
              });
          for (n in f) (o = M(d ? m[n] : 0, n, u)), n in m || ((m[n] = o.start), d && ((o.end = o.start), (o.start = "width" === n || "height" === n ? 1 : 0)));
      }
  }
  function z(t, e) {
      var i, n, r, s, o;
      for (i in t)
          if (((n = rt.camelCase(i)), (r = e[n]), (s = t[i]), rt.isArray(s) && ((r = s[1]), (s = t[i] = s[0])), i !== n && ((t[n] = s), delete t[i]), (o = rt.cssHooks[n]), o && "expand" in o)) {
              (s = o.expand(s)), delete t[n];
              for (i in s) i in t || ((t[i] = s[i]), (e[i] = r));
          } else e[n] = r;
  }
  function j(t, e, i) {
      var n,
          r,
          s = 0,
          o = ve.length,
          a = rt.Deferred().always(function () {
              delete l.elem;
          }),
          l = function () {
              if (r) return !1;
              for (var e = pe || N(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, s = 1 - n, o = 0, l = h.tweens.length; l > o; o++) h.tweens[o].run(s);
              return a.notifyWith(t, [h, s, i]), 1 > s && l ? i : (a.resolveWith(t, [h]), !1);
          },
          h = a.promise({
              elem: t,
              props: rt.extend({}, e),
              opts: rt.extend(!0, { specialEasing: {} }, i),
              originalProperties: e,
              originalOptions: i,
              startTime: pe || N(),
              duration: i.duration,
              tweens: [],
              createTween: function (e, i) {
                  var n = rt.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                  return h.tweens.push(n), n;
              },
              stop: function (e) {
                  var i = 0,
                      n = e ? h.tweens.length : 0;
                  if (r) return this;
                  for (r = !0; n > i; i++) h.tweens[i].run(1);
                  return e ? a.resolveWith(t, [h, e]) : a.rejectWith(t, [h, e]), this;
              },
          }),
          c = h.props;
      for (z(c, h.opts.specialEasing); o > s; s++) if ((n = ve[s].call(h, t, c, h.opts))) return n;
      return (
          rt.map(c, M, h),
          rt.isFunction(h.opts.start) && h.opts.start.call(t, h),
          rt.fx.timer(rt.extend(l, { elem: t, anim: h, queue: h.opts.queue })),
          h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
      );
  }
  function F(t) {
      return function (e, i) {
          "string" != typeof e && ((i = e), (e = "*"));
          var n,
              r = 0,
              s = e.toLowerCase().match(yt) || [];
          if (rt.isFunction(i)) for (; (n = s[r++]); ) "+" === n.charAt(0) ? ((n = n.slice(1) || "*"), (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i);
      };
  }
  function I(t, e, i, n) {
      function r(a) {
          var l;
          return (
              (s[a] = !0),
              rt.each(t[a] || [], function (t, a) {
                  var h = a(e, i, n);
                  return "string" != typeof h || o || s[h] ? (o ? !(l = h) : void 0) : (e.dataTypes.unshift(h), r(h), !1);
              }),
              l
          );
      }
      var s = {},
          o = t === qe;
      return r(e.dataTypes[0]) || (!s["*"] && r("*"));
  }
  function H(t, e) {
      var i,
          n,
          r = rt.ajaxSettings.flatOptions || {};
      for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
      return i && rt.extend(!0, t, i), t;
  }
  function B(t, e, i) {
      for (var n, r, s, o, a = t.contents, l = t.dataTypes; "*" === l[0]; ) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
      if (r)
          for (o in a)
              if (a[o] && a[o].test(r)) {
                  l.unshift(o);
                  break;
              }
      if (l[0] in i) s = l[0];
      else {
          for (o in i) {
              if (!l[0] || t.converters[o + " " + l[0]]) {
                  s = o;
                  break;
              }
              n || (n = o);
          }
          s = s || n;
      }
      return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0;
  }
  function q(t, e, i, n) {
      var r,
          s,
          o,
          a,
          l,
          h = {},
          c = t.dataTypes.slice();
      if (c[1]) for (o in t.converters) h[o.toLowerCase()] = t.converters[o];
      for (s = c.shift(); s; )
          if ((t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), (l = s), (s = c.shift())))
              if ("*" === s) s = l;
              else if ("*" !== l && l !== s) {
                  if (((o = h[l + " " + s] || h["* " + s]), !o))
                      for (r in h)
                          if (((a = r.split(" ")), a[1] === s && (o = h[l + " " + a[0]] || h["* " + a[0]]))) {
                              o === !0 ? (o = h[r]) : h[r] !== !0 && ((s = a[0]), c.unshift(a[1]));
                              break;
                          }
                  if (o !== !0)
                      if (o && t["throws"]) e = o(e);
                      else
                          try {
                              e = o(e);
                          } catch (u) {
                              return { state: "parsererror", error: o ? u : "No conversion from " + l + " to " + s };
                          }
              }
      return { state: "success", data: e };
  }
  function W(t, e, i, n) {
      var r;
      if (rt.isArray(e))
          rt.each(e, function (e, r) {
              i || Ue.test(t) ? n(t, r) : W(t + "[" + ("object" == typeof r ? e : "") + "]", r, i, n);
          });
      else if (i || "object" !== rt.type(e)) n(t, e);
      else for (r in e) W(t + "[" + r + "]", e[r], i, n);
  }
  function X() {
      try {
          return new t.XMLHttpRequest();
      } catch (e) {}
  }
  function Y() {
      try {
          return new t.ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
  }
  function U(t) {
      return rt.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow);
  }
  var V = [],
      G = V.slice,
      Q = V.concat,
      Z = V.push,
      J = V.indexOf,
      K = {},
      tt = K.toString,
      et = K.hasOwnProperty,
      it = {},
      nt = "1.11.1",
      rt = function (t, e) {
          return new rt.fn.init(t, e);
      },
      st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      ot = /^-ms-/,
      at = /-([\da-z])/gi,
      lt = function (t, e) {
          return e.toUpperCase();
      };
  (rt.fn = rt.prototype = {
      jquery: nt,
      constructor: rt,
      selector: "",
      length: 0,
      toArray: function () {
          return G.call(this);
      },
      get: function (t) {
          return null != t ? (0 > t ? this[t + this.length] : this[t]) : G.call(this);
      },
      pushStack: function (t) {
          var e = rt.merge(this.constructor(), t);
          return (e.prevObject = this), (e.context = this.context), e;
      },
      each: function (t, e) {
          return rt.each(this, t, e);
      },
      map: function (t) {
          return this.pushStack(
              rt.map(this, function (e, i) {
                  return t.call(e, i, e);
              })
          );
      },
      slice: function () {
          return this.pushStack(G.apply(this, arguments));
      },
      first: function () {
          return this.eq(0);
      },
      last: function () {
          return this.eq(-1);
      },
      eq: function (t) {
          var e = this.length,
              i = +t + (0 > t ? e : 0);
          return this.pushStack(i >= 0 && e > i ? [this[i]] : []);
      },
      end: function () {
          return this.prevObject || this.constructor(null);
      },
      push: Z,
      sort: V.sort,
      splice: V.splice,
  }),
      (rt.extend = rt.fn.extend = function () {
          var t,
              e,
              i,
              n,
              r,
              s,
              o = arguments[0] || {},
              a = 1,
              l = arguments.length,
              h = !1;
          for ("boolean" == typeof o && ((h = o), (o = arguments[a] || {}), a++), "object" == typeof o || rt.isFunction(o) || (o = {}), a === l && ((o = this), a--); l > a; a++)
              if (null != (r = arguments[a]))
                  for (n in r)
                      (t = o[n]),
                          (i = r[n]),
                          o !== i &&
                              (h && i && (rt.isPlainObject(i) || (e = rt.isArray(i)))
                                  ? (e ? ((e = !1), (s = t && rt.isArray(t) ? t : [])) : (s = t && rt.isPlainObject(t) ? t : {}), (o[n] = rt.extend(h, s, i)))
                                  : void 0 !== i && (o[n] = i));
          return o;
      }),
      rt.extend({
          expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
          isReady: !0,
          error: function (t) {
              throw new Error(t);
          },
          noop: function () {},
          isFunction: function (t) {
              return "function" === rt.type(t);
          },
          isArray:
              Array.isArray ||
              function (t) {
                  return "array" === rt.type(t);
              },
          isWindow: function (t) {
              return null != t && t == t.window;
          },
          isNumeric: function (t) {
              return !rt.isArray(t) && t - parseFloat(t) >= 0;
          },
          isEmptyObject: function (t) {
              var e;
              for (e in t) return !1;
              return !0;
          },
          isPlainObject: function (t) {
              var e;
              if (!t || "object" !== rt.type(t) || t.nodeType || rt.isWindow(t)) return !1;
              try {
                  if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1;
              } catch (i) {
                  return !1;
              }
              if (it.ownLast) for (e in t) return et.call(t, e);
              for (e in t);
              return void 0 === e || et.call(t, e);
          },
          type: function (t) {
              return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? K[tt.call(t)] || "object" : typeof t;
          },
          globalEval: function (e) {
              e &&
                  rt.trim(e) &&
                  (
                      t.execScript ||
                      function (e) {
                          t.eval.call(t, e);
                      }
                  )(e);
          },
          camelCase: function (t) {
              return t.replace(ot, "ms-").replace(at, lt);
          },
          nodeName: function (t, e) {
              return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
          },
          each: function (t, e, n) {
              var r,
                  s = 0,
                  o = t.length,
                  a = i(t);
              if (n) {
                  if (a) for (; o > s && ((r = e.apply(t[s], n)), r !== !1); s++);
                  else for (s in t) if (((r = e.apply(t[s], n)), r === !1)) break;
              } else if (a) for (; o > s && ((r = e.call(t[s], s, t[s])), r !== !1); s++);
              else for (s in t) if (((r = e.call(t[s], s, t[s])), r === !1)) break;
              return t;
          },
          trim: function (t) {
              return null == t ? "" : (t + "").replace(st, "");
          },
          makeArray: function (t, e) {
              var n = e || [];
              return null != t && (i(Object(t)) ? rt.merge(n, "string" == typeof t ? [t] : t) : Z.call(n, t)), n;
          },
          inArray: function (t, e, i) {
              var n;
              if (e) {
                  if (J) return J.call(e, t, i);
                  for (n = e.length, i = i ? (0 > i ? Math.max(0, n + i) : i) : 0; n > i; i++) if (i in e && e[i] === t) return i;
              }
              return -1;
          },
          merge: function (t, e) {
              for (var i = +e.length, n = 0, r = t.length; i > n; ) t[r++] = e[n++];
              if (i !== i) for (; void 0 !== e[n]; ) t[r++] = e[n++];
              return (t.length = r), t;
          },
          grep: function (t, e, i) {
              for (var n, r = [], s = 0, o = t.length, a = !i; o > s; s++) (n = !e(t[s], s)), n !== a && r.push(t[s]);
              return r;
          },
          map: function (t, e, n) {
              var r,
                  s = 0,
                  o = t.length,
                  a = i(t),
                  l = [];
              if (a) for (; o > s; s++) (r = e(t[s], s, n)), null != r && l.push(r);
              else for (s in t) (r = e(t[s], s, n)), null != r && l.push(r);
              return Q.apply([], l);
          },
          guid: 1,
          proxy: function (t, e) {
              var i, n, r;
              return (
                  "string" == typeof e && ((r = t[e]), (e = t), (t = r)),
                  rt.isFunction(t)
                      ? ((i = G.call(arguments, 2)),
                        (n = function () {
                            return t.apply(e || this, i.concat(G.call(arguments)));
                        }),
                        (n.guid = t.guid = t.guid || rt.guid++),
                        n)
                      : void 0
              );
          },
          now: function () {
              return +new Date();
          },
          support: it,
      }),
      rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
          K["[object " + e + "]"] = e.toLowerCase();
      });
  var ht = (function (t) {
      function e(t, e, i, n) {
          var r, s, o, a, l, h, u, p, d, m;
          if (((e ? e.ownerDocument || e : I) !== D && $(e), (e = e || D), (i = i || []), !t || "string" != typeof t)) return i;
          if (1 !== (a = e.nodeType) && 9 !== a) return [];
          if (R && !n) {
              if ((r = vt.exec(t)))
                  if ((o = r[1])) {
                      if (9 === a) {
                          if (((s = e.getElementById(o)), !s || !s.parentNode)) return i;
                          if (s.id === o) return i.push(s), i;
                      } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(o)) && j(e, s) && s.id === o) return i.push(s), i;
                  } else {
                      if (r[2]) return K.apply(i, e.getElementsByTagName(t)), i;
                      if ((o = r[3]) && x.getElementsByClassName && e.getElementsByClassName) return K.apply(i, e.getElementsByClassName(o)), i;
                  }
              if (x.qsa && (!M || !M.test(t))) {
                  if (((p = u = F), (d = e), (m = 9 === a && t), 1 === a && "object" !== e.nodeName.toLowerCase())) {
                      for (h = S(t), (u = e.getAttribute("id")) ? (p = u.replace(wt, "\\$&")) : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = h.length; l--; ) h[l] = p + f(h[l]);
                      (d = (yt.test(t) && c(e.parentNode)) || e), (m = h.join(","));
                  }
                  if (m)
                      try {
                          return K.apply(i, d.querySelectorAll(m)), i;
                      } catch (g) {
                      } finally {
                          u || e.removeAttribute("id");
                      }
              }
          }
          return P(t.replace(lt, "$1"), e, i, n);
      }
      function i() {
          function t(i, n) {
              return e.push(i + " ") > b.cacheLength && delete t[e.shift()], (t[i + " "] = n);
          }
          var e = [];
          return t;
      }
      function n(t) {
          return (t[F] = !0), t;
      }
      function r(t) {
          var e = D.createElement("div");
          try {
              return !!t(e);
          } catch (i) {
              return !1;
          } finally {
              e.parentNode && e.parentNode.removeChild(e), (e = null);
          }
      }
      function s(t, e) {
          for (var i = t.split("|"), n = t.length; n--; ) b.attrHandle[i[n]] = e;
      }
      function o(t, e) {
          var i = e && t,
              n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
          if (n) return n;
          if (i) for (; (i = i.nextSibling); ) if (i === e) return -1;
          return t ? 1 : -1;
      }
      function a(t) {
          return function (e) {
              var i = e.nodeName.toLowerCase();
              return "input" === i && e.type === t;
          };
      }
      function l(t) {
          return function (e) {
              var i = e.nodeName.toLowerCase();
              return ("input" === i || "button" === i) && e.type === t;
          };
      }
      function h(t) {
          return n(function (e) {
              return (
                  (e = +e),
                  n(function (i, n) {
                      for (var r, s = t([], i.length, e), o = s.length; o--; ) i[(r = s[o])] && (i[r] = !(n[r] = i[r]));
                  })
              );
          });
      }
      function c(t) {
          return t && typeof t.getElementsByTagName !== U && t;
      }
      function u() {}
      function f(t) {
          for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
          return n;
      }
      function p(t, e, i) {
          var n = e.dir,
              r = i && "parentNode" === n,
              s = B++;
          return e.first
              ? function (e, i, s) {
                    for (; (e = e[n]); ) if (1 === e.nodeType || r) return t(e, i, s);
                }
              : function (e, i, o) {
                    var a,
                        l,
                        h = [H, s];
                    if (o) {
                        for (; (e = e[n]); ) if ((1 === e.nodeType || r) && t(e, i, o)) return !0;
                    } else
                        for (; (e = e[n]); )
                            if (1 === e.nodeType || r) {
                                if (((l = e[F] || (e[F] = {})), (a = l[n]) && a[0] === H && a[1] === s)) return (h[2] = a[2]);
                                if (((l[n] = h), (h[2] = t(e, i, o)))) return !0;
                            }
                };
      }
      function d(t) {
          return t.length > 1
              ? function (e, i, n) {
                    for (var r = t.length; r--; ) if (!t[r](e, i, n)) return !1;
                    return !0;
                }
              : t[0];
      }
      function m(t, i, n) {
          for (var r = 0, s = i.length; s > r; r++) e(t, i[r], n);
          return n;
      }
      function g(t, e, i, n, r) {
          for (var s, o = [], a = 0, l = t.length, h = null != e; l > a; a++) (s = t[a]) && (!i || i(s, n, r)) && (o.push(s), h && e.push(a));
          return o;
      }
      function _(t, e, i, r, s, o) {
          return (
              r && !r[F] && (r = _(r)),
              s && !s[F] && (s = _(s, o)),
              n(function (n, o, a, l) {
                  var h,
                      c,
                      u,
                      f = [],
                      p = [],
                      d = o.length,
                      _ = n || m(e || "*", a.nodeType ? [a] : a, []),
                      v = !t || (!n && e) ? _ : g(_, f, t, a, l),
                      y = i ? (s || (n ? t : d || r) ? [] : o) : v;
                  if ((i && i(v, y, a, l), r)) for (h = g(y, p), r(h, [], a, l), c = h.length; c--; ) (u = h[c]) && (y[p[c]] = !(v[p[c]] = u));
                  if (n) {
                      if (s || t) {
                          if (s) {
                              for (h = [], c = y.length; c--; ) (u = y[c]) && h.push((v[c] = u));
                              s(null, (y = []), h, l);
                          }
                          for (c = y.length; c--; ) (u = y[c]) && (h = s ? et.call(n, u) : f[c]) > -1 && (n[h] = !(o[h] = u));
                      }
                  } else (y = g(y === o ? y.splice(d, y.length) : y)), s ? s(null, o, y, l) : K.apply(o, y);
              })
          );
      }
      function v(t) {
          for (
              var e,
                  i,
                  n,
                  r = t.length,
                  s = b.relative[t[0].type],
                  o = s || b.relative[" "],
                  a = s ? 1 : 0,
                  l = p(
                      function (t) {
                          return t === e;
                      },
                      o,
                      !0
                  ),
                  h = p(
                      function (t) {
                          return et.call(e, t) > -1;
                      },
                      o,
                      !0
                  ),
                  c = [
                      function (t, i, n) {
                          return (!s && (n || i !== E)) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n));
                      },
                  ];
              r > a;
              a++
          )
              if ((i = b.relative[t[a].type])) c = [p(d(c), i)];
              else {
                  if (((i = b.filter[t[a].type].apply(null, t[a].matches)), i[F])) {
                      for (n = ++a; r > n && !b.relative[t[n].type]; n++);
                      return _(a > 1 && d(c), a > 1 && f(t.slice(0, a - 1).concat({ value: " " === t[a - 2].type ? "*" : "" })).replace(lt, "$1"), i, n > a && v(t.slice(a, n)), r > n && v((t = t.slice(n))), r > n && f(t));
                  }
                  c.push(i);
              }
          return d(c);
      }
      function y(t, i) {
          var r = i.length > 0,
              s = t.length > 0,
              o = function (n, o, a, l, h) {
                  var c,
                      u,
                      f,
                      p = 0,
                      d = "0",
                      m = n && [],
                      _ = [],
                      v = E,
                      y = n || (s && b.find.TAG("*", h)),
                      w = (H += null == v ? 1 : Math.random() || 0.1),
                      x = y.length;
                  for (h && (E = o !== D && o); d !== x && null != (c = y[d]); d++) {
                      if (s && c) {
                          for (u = 0; (f = t[u++]); )
                              if (f(c, o, a)) {
                                  l.push(c);
                                  break;
                              }
                          h && (H = w);
                      }
                      r && ((c = !f && c) && p--, n && m.push(c));
                  }
                  if (((p += d), r && d !== p)) {
                      for (u = 0; (f = i[u++]); ) f(m, _, o, a);
                      if (n) {
                          if (p > 0) for (; d--; ) m[d] || _[d] || (_[d] = Z.call(l));
                          _ = g(_);
                      }
                      K.apply(l, _), h && !n && _.length > 0 && p + i.length > 1 && e.uniqueSort(l);
                  }
                  return h && ((H = w), (E = v)), m;
              };
          return r ? n(o) : o;
      }
      var w,
          x,
          b,
          T,
          C,
          S,
          k,
          P,
          E,
          A,
          O,
          $,
          D,
          N,
          R,
          M,
          L,
          z,
          j,
          F = "sizzle" + -new Date(),
          I = t.document,
          H = 0,
          B = 0,
          q = i(),
          W = i(),
          X = i(),
          Y = function (t, e) {
              return t === e && (O = !0), 0;
          },
          U = "undefined",
          V = 1 << 31,
          G = {}.hasOwnProperty,
          Q = [],
          Z = Q.pop,
          J = Q.push,
          K = Q.push,
          tt = Q.slice,
          et =
              Q.indexOf ||
              function (t) {
                  for (var e = 0, i = this.length; i > e; e++) if (this[e] === t) return e;
                  return -1;
              },
          it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          nt = "[\\x20\\t\\r\\n\\f]",
          rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
          st = rt.replace("w", "w#"),
          ot = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + st + "))|)" + nt + "*\\]",
          at = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
          lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
          ht = new RegExp("^" + nt + "*," + nt + "*"),
          ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
          ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
          ft = new RegExp(at),
          pt = new RegExp("^" + st + "$"),
          dt = {
              ID: new RegExp("^#(" + rt + ")"),
              CLASS: new RegExp("^\\.(" + rt + ")"),
              TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
              ATTR: new RegExp("^" + ot),
              PSEUDO: new RegExp("^" + at),
              CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
              bool: new RegExp("^(?:" + it + ")$", "i"),
              needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i"),
          },
          mt = /^(?:input|select|textarea|button)$/i,
          gt = /^h\d$/i,
          _t = /^[^{]+\{\s*\[native \w/,
          vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          yt = /[+~]/,
          wt = /'|\\/g,
          xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
          bt = function (t, e, i) {
              var n = "0x" + e - 65536;
              return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
          };
      try {
          K.apply((Q = tt.call(I.childNodes)), I.childNodes), Q[I.childNodes.length].nodeType;
      } catch (Tt) {
          K = {
              apply: Q.length
                  ? function (t, e) {
                        J.apply(t, tt.call(e));
                    }
                  : function (t, e) {
                        for (var i = t.length, n = 0; (t[i++] = e[n++]); );
                        t.length = i - 1;
                    },
          };
      }
      (x = e.support = {}),
          (C = e.isXML = function (t) {
              var e = t && (t.ownerDocument || t).documentElement;
              return !!e && "HTML" !== e.nodeName;
          }),
          ($ = e.setDocument = function (t) {
              var e,
                  i = t ? t.ownerDocument || t : I,
                  n = i.defaultView;
              return i !== D && 9 === i.nodeType && i.documentElement
                  ? ((D = i),
                    (N = i.documentElement),
                    (R = !C(i)),
                    n &&
                        n !== n.top &&
                        (n.addEventListener
                            ? n.addEventListener(
                                  "unload",
                                  function () {
                                      $();
                                  },
                                  !1
                              )
                            : n.attachEvent &&
                              n.attachEvent("onunload", function () {
                                  $();
                              })),
                    (x.attributes = r(function (t) {
                        return (t.className = "i"), !t.getAttribute("className");
                    })),
                    (x.getElementsByTagName = r(function (t) {
                        return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length;
                    })),
                    (x.getElementsByClassName =
                        _t.test(i.getElementsByClassName) &&
                        r(function (t) {
                            return (t.innerHTML = "<div class='a'></div><div class='a i'></div>"), (t.firstChild.className = "i"), 2 === t.getElementsByClassName("i").length;
                        })),
                    (x.getById = r(function (t) {
                        return (N.appendChild(t).id = F), !i.getElementsByName || !i.getElementsByName(F).length;
                    })),
                    x.getById
                        ? ((b.find.ID = function (t, e) {
                              if (typeof e.getElementById !== U && R) {
                                  var i = e.getElementById(t);
                                  return i && i.parentNode ? [i] : [];
                              }
                          }),
                          (b.filter.ID = function (t) {
                              var e = t.replace(xt, bt);
                              return function (t) {
                                  return t.getAttribute("id") === e;
                              };
                          }))
                        : (delete b.find.ID,
                          (b.filter.ID = function (t) {
                              var e = t.replace(xt, bt);
                              return function (t) {
                                  var i = typeof t.getAttributeNode !== U && t.getAttributeNode("id");
                                  return i && i.value === e;
                              };
                          })),
                    (b.find.TAG = x.getElementsByTagName
                        ? function (t, e) {
                              return typeof e.getElementsByTagName !== U ? e.getElementsByTagName(t) : void 0;
                          }
                        : function (t, e) {
                              var i,
                                  n = [],
                                  r = 0,
                                  s = e.getElementsByTagName(t);
                              if ("*" === t) {
                                  for (; (i = s[r++]); ) 1 === i.nodeType && n.push(i);
                                  return n;
                              }
                              return s;
                          }),
                    (b.find.CLASS =
                        x.getElementsByClassName &&
                        function (t, e) {
                            return typeof e.getElementsByClassName !== U && R ? e.getElementsByClassName(t) : void 0;
                        }),
                    (L = []),
                    (M = []),
                    (x.qsa = _t.test(i.querySelectorAll)) &&
                        (r(function (t) {
                            (t.innerHTML = "<select msallowclip=''><option selected=''></option></select>"),
                                t.querySelectorAll("[msallowclip^='']").length && M.push("[*^$]=" + nt + "*(?:''|\"\")"),
                                t.querySelectorAll("[selected]").length || M.push("\\[" + nt + "*(?:value|" + it + ")"),
                                t.querySelectorAll(":checked").length || M.push(":checked");
                        }),
                        r(function (t) {
                            var e = i.createElement("input");
                            e.setAttribute("type", "hidden"),
                                t.appendChild(e).setAttribute("name", "D"),
                                t.querySelectorAll("[name=d]").length && M.push("name" + nt + "*[*^$|!~]?="),
                                t.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"),
                                t.querySelectorAll("*,:x"),
                                M.push(",.*:");
                        })),
                    (x.matchesSelector = _t.test((z = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector))) &&
                        r(function (t) {
                            (x.disconnectedMatch = z.call(t, "div")), z.call(t, "[s!='']:x"), L.push("!=", at);
                        }),
                    (M = M.length && new RegExp(M.join("|"))),
                    (L = L.length && new RegExp(L.join("|"))),
                    (e = _t.test(N.compareDocumentPosition)),
                    (j =
                        e || _t.test(N.contains)
                            ? function (t, e) {
                                  var i = 9 === t.nodeType ? t.documentElement : t,
                                      n = e && e.parentNode;
                                  return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)));
                              }
                            : function (t, e) {
                                  if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                                  return !1;
                              }),
                    (Y = e
                        ? function (t, e) {
                              if (t === e) return (O = !0), 0;
                              var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                              return n
                                  ? n
                                  : ((n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1),
                                    1 & n || (!x.sortDetached && e.compareDocumentPosition(t) === n)
                                        ? t === i || (t.ownerDocument === I && j(I, t))
                                            ? -1
                                            : e === i || (e.ownerDocument === I && j(I, e))
                                            ? 1
                                            : A
                                            ? et.call(A, t) - et.call(A, e)
                                            : 0
                                        : 4 & n
                                        ? -1
                                        : 1);
                          }
                        : function (t, e) {
                              if (t === e) return (O = !0), 0;
                              var n,
                                  r = 0,
                                  s = t.parentNode,
                                  a = e.parentNode,
                                  l = [t],
                                  h = [e];
                              if (!s || !a) return t === i ? -1 : e === i ? 1 : s ? -1 : a ? 1 : A ? et.call(A, t) - et.call(A, e) : 0;
                              if (s === a) return o(t, e);
                              for (n = t; (n = n.parentNode); ) l.unshift(n);
                              for (n = e; (n = n.parentNode); ) h.unshift(n);
                              for (; l[r] === h[r]; ) r++;
                              return r ? o(l[r], h[r]) : l[r] === I ? -1 : h[r] === I ? 1 : 0;
                          }),
                    i)
                  : D;
          }),
          (e.matches = function (t, i) {
              return e(t, null, null, i);
          }),
          (e.matchesSelector = function (t, i) {
              if (((t.ownerDocument || t) !== D && $(t), (i = i.replace(ut, "='$1']")), !(!x.matchesSelector || !R || (L && L.test(i)) || (M && M.test(i)))))
                  try {
                      var n = z.call(t, i);
                      if (n || x.disconnectedMatch || (t.document && 11 !== t.document.nodeType)) return n;
                  } catch (r) {}
              return e(i, D, null, [t]).length > 0;
          }),
          (e.contains = function (t, e) {
              return (t.ownerDocument || t) !== D && $(t), j(t, e);
          }),
          (e.attr = function (t, e) {
              (t.ownerDocument || t) !== D && $(t);
              var i = b.attrHandle[e.toLowerCase()],
                  n = i && G.call(b.attrHandle, e.toLowerCase()) ? i(t, e, !R) : void 0;
              return void 0 !== n ? n : x.attributes || !R ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
          }),
          (e.error = function (t) {
              throw new Error("Syntax error, unrecognized expression: " + t);
          }),
          (e.uniqueSort = function (t) {
              var e,
                  i = [],
                  n = 0,
                  r = 0;
              if (((O = !x.detectDuplicates), (A = !x.sortStable && t.slice(0)), t.sort(Y), O)) {
                  for (; (e = t[r++]); ) e === t[r] && (n = i.push(r));
                  for (; n--; ) t.splice(i[n], 1);
              }
              return (A = null), t;
          }),
          (T = e.getText = function (t) {
              var e,
                  i = "",
                  n = 0,
                  r = t.nodeType;
              if (r) {
                  if (1 === r || 9 === r || 11 === r) {
                      if ("string" == typeof t.textContent) return t.textContent;
                      for (t = t.firstChild; t; t = t.nextSibling) i += T(t);
                  } else if (3 === r || 4 === r) return t.nodeValue;
              } else for (; (e = t[n++]); ) i += T(e);
              return i;
          }),
          (b = e.selectors = {
              cacheLength: 50,
              createPseudo: n,
              match: dt,
              attrHandle: {},
              find: {},
              relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
              preFilter: {
                  ATTR: function (t) {
                      return (t[1] = t[1].replace(xt, bt)), (t[3] = (t[3] || t[4] || t[5] || "").replace(xt, bt)), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
                  },
                  CHILD: function (t) {
                      return (
                          (t[1] = t[1].toLowerCase()),
                          "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3]))), (t[5] = +(t[7] + t[8] || "odd" === t[3]))) : t[3] && e.error(t[0]),
                          t
                      );
                  },
                  PSEUDO: function (t) {
                      var e,
                          i = !t[6] && t[2];
                      return dt.CHILD.test(t[0])
                          ? null
                          : (t[3] ? (t[2] = t[4] || t[5] || "") : i && ft.test(i) && (e = S(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))), t.slice(0, 3));
                  },
              },
              filter: {
                  TAG: function (t) {
                      var e = t.replace(xt, bt).toLowerCase();
                      return "*" === t
                          ? function () {
                                return !0;
                            }
                          : function (t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e;
                            };
                  },
                  CLASS: function (t) {
                      var e = q[t + " "];
                      return (
                          e ||
                          ((e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) &&
                              q(t, function (t) {
                                  return e.test(("string" == typeof t.className && t.className) || (typeof t.getAttribute !== U && t.getAttribute("class")) || "");
                              }))
                      );
                  },
                  ATTR: function (t, i, n) {
                      return function (r) {
                          var s = e.attr(r, t);
                          return null == s
                              ? "!=" === i
                              : !i ||
                                    ((s += ""),
                                    "=" === i
                                        ? s === n
                                        : "!=" === i
                                        ? s !== n
                                        : "^=" === i
                                        ? n && 0 === s.indexOf(n)
                                        : "*=" === i
                                        ? n && s.indexOf(n) > -1
                                        : "$=" === i
                                        ? n && s.slice(-n.length) === n
                                        : "~=" === i
                                        ? (" " + s + " ").indexOf(n) > -1
                                        : "|=" === i && (s === n || s.slice(0, n.length + 1) === n + "-"));
                      };
                  },
                  CHILD: function (t, e, i, n, r) {
                      var s = "nth" !== t.slice(0, 3),
                          o = "last" !== t.slice(-4),
                          a = "of-type" === e;
                      return 1 === n && 0 === r
                          ? function (t) {
                                return !!t.parentNode;
                            }
                          : function (e, i, l) {
                                var h,
                                    c,
                                    u,
                                    f,
                                    p,
                                    d,
                                    m = s !== o ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    _ = a && e.nodeName.toLowerCase(),
                                    v = !l && !a;
                                if (g) {
                                    if (s) {
                                        for (; m; ) {
                                            for (u = e; (u = u[m]); ) if (a ? u.nodeName.toLowerCase() === _ : 1 === u.nodeType) return !1;
                                            d = m = "only" === t && !d && "nextSibling";
                                        }
                                        return !0;
                                    }
                                    if (((d = [o ? g.firstChild : g.lastChild]), o && v)) {
                                        for (c = g[F] || (g[F] = {}), h = c[t] || [], p = h[0] === H && h[1], f = h[0] === H && h[2], u = p && g.childNodes[p]; (u = (++p && u && u[m]) || (f = p = 0) || d.pop()); )
                                            if (1 === u.nodeType && ++f && u === e) {
                                                c[t] = [H, p, f];
                                                break;
                                            }
                                    } else if (v && (h = (e[F] || (e[F] = {}))[t]) && h[0] === H) f = h[1];
                                    else for (; (u = (++p && u && u[m]) || (f = p = 0) || d.pop()) && ((a ? u.nodeName.toLowerCase() !== _ : 1 !== u.nodeType) || !++f || (v && ((u[F] || (u[F] = {}))[t] = [H, f]), u !== e)); );
                                    return (f -= r), f === n || (f % n === 0 && f / n >= 0);
                                }
                            };
                  },
                  PSEUDO: function (t, i) {
                      var r,
                          s = b.pseudos[t] || b.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                      return s[F]
                          ? s(i)
                          : s.length > 1
                          ? ((r = [t, t, "", i]),
                            b.setFilters.hasOwnProperty(t.toLowerCase())
                                ? n(function (t, e) {
                                      for (var n, r = s(t, i), o = r.length; o--; ) (n = et.call(t, r[o])), (t[n] = !(e[n] = r[o]));
                                  })
                                : function (t) {
                                      return s(t, 0, r);
                                  })
                          : s;
                  },
              },
              pseudos: {
                  not: n(function (t) {
                      var e = [],
                          i = [],
                          r = k(t.replace(lt, "$1"));
                      return r[F]
                          ? n(function (t, e, i, n) {
                                for (var s, o = r(t, null, n, []), a = t.length; a--; ) (s = o[a]) && (t[a] = !(e[a] = s));
                            })
                          : function (t, n, s) {
                                return (e[0] = t), r(e, null, s, i), !i.pop();
                            };
                  }),
                  has: n(function (t) {
                      return function (i) {
                          return e(t, i).length > 0;
                      };
                  }),
                  contains: n(function (t) {
                      return function (e) {
                          return (e.textContent || e.innerText || T(e)).indexOf(t) > -1;
                      };
                  }),
                  lang: n(function (t) {
                      return (
                          pt.test(t || "") || e.error("unsupported lang: " + t),
                          (t = t.replace(xt, bt).toLowerCase()),
                          function (e) {
                              var i;
                              do if ((i = R ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (i = i.toLowerCase()), i === t || 0 === i.indexOf(t + "-");
                              while ((e = e.parentNode) && 1 === e.nodeType);
                              return !1;
                          }
                      );
                  }),
                  target: function (e) {
                      var i = t.location && t.location.hash;
                      return i && i.slice(1) === e.id;
                  },
                  root: function (t) {
                      return t === N;
                  },
                  focus: function (t) {
                      return t === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
                  },
                  enabled: function (t) {
                      return t.disabled === !1;
                  },
                  disabled: function (t) {
                      return t.disabled === !0;
                  },
                  checked: function (t) {
                      var e = t.nodeName.toLowerCase();
                      return ("input" === e && !!t.checked) || ("option" === e && !!t.selected);
                  },
                  selected: function (t) {
                      return t.parentNode && t.parentNode.selectedIndex, t.selected === !0;
                  },
                  empty: function (t) {
                      for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                      return !0;
                  },
                  parent: function (t) {
                      return !b.pseudos.empty(t);
                  },
                  header: function (t) {
                      return gt.test(t.nodeName);
                  },
                  input: function (t) {
                      return mt.test(t.nodeName);
                  },
                  button: function (t) {
                      var e = t.nodeName.toLowerCase();
                      return ("input" === e && "button" === t.type) || "button" === e;
                  },
                  text: function (t) {
                      var e;
                      return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
                  },
                  first: h(function () {
                      return [0];
                  }),
                  last: h(function (t, e) {
                      return [e - 1];
                  }),
                  eq: h(function (t, e, i) {
                      return [0 > i ? i + e : i];
                  }),
                  even: h(function (t, e) {
                      for (var i = 0; e > i; i += 2) t.push(i);
                      return t;
                  }),
                  odd: h(function (t, e) {
                      for (var i = 1; e > i; i += 2) t.push(i);
                      return t;
                  }),
                  lt: h(function (t, e, i) {
                      for (var n = 0 > i ? i + e : i; --n >= 0; ) t.push(n);
                      return t;
                  }),
                  gt: h(function (t, e, i) {
                      for (var n = 0 > i ? i + e : i; ++n < e; ) t.push(n);
                      return t;
                  }),
              },
          }),
          (b.pseudos.nth = b.pseudos.eq);
      for (w in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) b.pseudos[w] = a(w);
      for (w in { submit: !0, reset: !0 }) b.pseudos[w] = l(w);
      return (
          (u.prototype = b.filters = b.pseudos),
          (b.setFilters = new u()),
          (S = e.tokenize = function (t, i) {
              var n,
                  r,
                  s,
                  o,
                  a,
                  l,
                  h,
                  c = W[t + " "];
              if (c) return i ? 0 : c.slice(0);
              for (a = t, l = [], h = b.preFilter; a; ) {
                  (!n || (r = ht.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push((s = []))), (n = !1), (r = ct.exec(a)) && ((n = r.shift()), s.push({ value: n, type: r[0].replace(lt, " ") }), (a = a.slice(n.length)));
                  for (o in b.filter) !(r = dt[o].exec(a)) || (h[o] && !(r = h[o](r))) || ((n = r.shift()), s.push({ value: n, type: o, matches: r }), (a = a.slice(n.length)));
                  if (!n) break;
              }
              return i ? a.length : a ? e.error(t) : W(t, l).slice(0);
          }),
          (k = e.compile = function (t, e) {
              var i,
                  n = [],
                  r = [],
                  s = X[t + " "];
              if (!s) {
                  for (e || (e = S(t)), i = e.length; i--; ) (s = v(e[i])), s[F] ? n.push(s) : r.push(s);
                  (s = X(t, y(r, n))), (s.selector = t);
              }
              return s;
          }),
          (P = e.select = function (t, e, i, n) {
              var r,
                  s,
                  o,
                  a,
                  l,
                  h = "function" == typeof t && t,
                  u = !n && S((t = h.selector || t));
              if (((i = i || []), 1 === u.length)) {
                  if (((s = u[0] = u[0].slice(0)), s.length > 2 && "ID" === (o = s[0]).type && x.getById && 9 === e.nodeType && R && b.relative[s[1].type])) {
                      if (((e = (b.find.ID(o.matches[0].replace(xt, bt), e) || [])[0]), !e)) return i;
                      h && (e = e.parentNode), (t = t.slice(s.shift().value.length));
                  }
                  for (r = dt.needsContext.test(t) ? 0 : s.length; r-- && ((o = s[r]), !b.relative[(a = o.type)]); )
                      if ((l = b.find[a]) && (n = l(o.matches[0].replace(xt, bt), (yt.test(s[0].type) && c(e.parentNode)) || e))) {
                          if ((s.splice(r, 1), (t = n.length && f(s)), !t)) return K.apply(i, n), i;
                          break;
                      }
              }
              return (h || k(t, u))(n, e, !R, i, (yt.test(t) && c(e.parentNode)) || e), i;
          }),
          (x.sortStable = F.split("").sort(Y).join("") === F),
          (x.detectDuplicates = !!O),
          $(),
          (x.sortDetached = r(function (t) {
              return 1 & t.compareDocumentPosition(D.createElement("div"));
          })),
          r(function (t) {
              return (t.innerHTML = "<a href='#'></a>"), "#" === t.firstChild.getAttribute("href");
          }) ||
              s("type|href|height|width", function (t, e, i) {
                  return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
              }),
          (x.attributes &&
              r(function (t) {
                  return (t.innerHTML = "<input/>"), t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
              })) ||
              s("value", function (t, e, i) {
                  return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue;
              }),
          r(function (t) {
              return null == t.getAttribute("disabled");
          }) ||
              s(it, function (t, e, i) {
                  var n;
                  return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
              }),
          e
      );
  })(t);
  (rt.find = ht), (rt.expr = ht.selectors), (rt.expr[":"] = rt.expr.pseudos), (rt.unique = ht.uniqueSort), (rt.text = ht.getText), (rt.isXMLDoc = ht.isXML), (rt.contains = ht.contains);
  var ct = rt.expr.match.needsContext,
      ut = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      ft = /^.[^:#\[\.,]*$/;
  (rt.filter = function (t, e, i) {
      var n = e[0];
      return (
          i && (t = ":not(" + t + ")"),
          1 === e.length && 1 === n.nodeType
              ? rt.find.matchesSelector(n, t)
                  ? [n]
                  : []
              : rt.find.matches(
                    t,
                    rt.grep(e, function (t) {
                        return 1 === t.nodeType;
                    })
                )
      );
  }),
      rt.fn.extend({
          find: function (t) {
              var e,
                  i = [],
                  n = this,
                  r = n.length;
              if ("string" != typeof t)
                  return this.pushStack(
                      rt(t).filter(function () {
                          for (e = 0; r > e; e++) if (rt.contains(n[e], this)) return !0;
                      })
                  );
              for (e = 0; r > e; e++) rt.find(t, n[e], i);
              return (i = this.pushStack(r > 1 ? rt.unique(i) : i)), (i.selector = this.selector ? this.selector + " " + t : t), i;
          },
          filter: function (t) {
              return this.pushStack(n(this, t || [], !1));
          },
          not: function (t) {
              return this.pushStack(n(this, t || [], !0));
          },
          is: function (t) {
              return !!n(this, "string" == typeof t && ct.test(t) ? rt(t) : t || [], !1).length;
          },
      });
  var pt,
      dt = t.document,
      mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      gt = (rt.fn.init = function (t, e) {
          var i, n;
          if (!t) return this;
          if ("string" == typeof t) {
              if (((i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t)), !i || (!i[1] && e))) return !e || e.jquery ? (e || pt).find(t) : this.constructor(e).find(t);
              if (i[1]) {
                  if (((e = e instanceof rt ? e[0] : e), rt.merge(this, rt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : dt, !0)), ut.test(i[1]) && rt.isPlainObject(e)))
                      for (i in e) rt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                  return this;
              }
              if (((n = dt.getElementById(i[2])), n && n.parentNode)) {
                  if (n.id !== i[2]) return pt.find(t);
                  (this.length = 1), (this[0] = n);
              }
              return (this.context = dt), (this.selector = t), this;
          }
          return t.nodeType
              ? ((this.context = this[0] = t), (this.length = 1), this)
              : rt.isFunction(t)
              ? "undefined" != typeof pt.ready
                  ? pt.ready(t)
                  : t(rt)
              : (void 0 !== t.selector && ((this.selector = t.selector), (this.context = t.context)), rt.makeArray(t, this));
      });
  (gt.prototype = rt.fn), (pt = rt(dt));
  var _t = /^(?:parents|prev(?:Until|All))/,
      vt = { children: !0, contents: !0, next: !0, prev: !0 };
  rt.extend({
      dir: function (t, e, i) {
          for (var n = [], r = t[e]; r && 9 !== r.nodeType && (void 0 === i || 1 !== r.nodeType || !rt(r).is(i)); ) 1 === r.nodeType && n.push(r), (r = r[e]);
          return n;
      },
      sibling: function (t, e) {
          for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
          return i;
      },
  }),
      rt.fn.extend({
          has: function (t) {
              var e,
                  i = rt(t, this),
                  n = i.length;
              return this.filter(function () {
                  for (e = 0; n > e; e++) if (rt.contains(this, i[e])) return !0;
              });
          },
          closest: function (t, e) {
              for (var i, n = 0, r = this.length, s = [], o = ct.test(t) || "string" != typeof t ? rt(t, e || this.context) : 0; r > n; n++)
                  for (i = this[n]; i && i !== e; i = i.parentNode)
                      if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && rt.find.matchesSelector(i, t))) {
                          s.push(i);
                          break;
                      }
              return this.pushStack(s.length > 1 ? rt.unique(s) : s);
          },
          index: function (t) {
              return t ? ("string" == typeof t ? rt.inArray(this[0], rt(t)) : rt.inArray(t.jquery ? t[0] : t, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          },
          add: function (t, e) {
              return this.pushStack(rt.unique(rt.merge(this.get(), rt(t, e))));
          },
          addBack: function (t) {
              return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
          },
      }),
      rt.each(
          {
              parent: function (t) {
                  var e = t.parentNode;
                  return e && 11 !== e.nodeType ? e : null;
              },
              parents: function (t) {
                  return rt.dir(t, "parentNode");
              },
              parentsUntil: function (t, e, i) {
                  return rt.dir(t, "parentNode", i);
              },
              next: function (t) {
                  return r(t, "nextSibling");
              },
              prev: function (t) {
                  return r(t, "previousSibling");
              },
              nextAll: function (t) {
                  return rt.dir(t, "nextSibling");
              },
              prevAll: function (t) {
                  return rt.dir(t, "previousSibling");
              },
              nextUntil: function (t, e, i) {
                  return rt.dir(t, "nextSibling", i);
              },
              prevUntil: function (t, e, i) {
                  return rt.dir(t, "previousSibling", i);
              },
              siblings: function (t) {
                  return rt.sibling((t.parentNode || {}).firstChild, t);
              },
              children: function (t) {
                  return rt.sibling(t.firstChild);
              },
              contents: function (t) {
                  return rt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : rt.merge([], t.childNodes);
              },
          },
          function (t, e) {
              rt.fn[t] = function (i, n) {
                  var r = rt.map(this, e, i);
                  return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = rt.filter(n, r)), this.length > 1 && (vt[t] || (r = rt.unique(r)), _t.test(t) && (r = r.reverse())), this.pushStack(r);
              };
          }
      );
  var yt = /\S+/g,
      wt = {};
  (rt.Callbacks = function (t) {
      t = "string" == typeof t ? wt[t] || s(t) : rt.extend({}, t);
      var e,
          i,
          n,
          r,
          o,
          a,
          l = [],
          h = !t.once && [],
          c = function (s) {
              for (i = t.memory && s, n = !0, o = a || 0, a = 0, r = l.length, e = !0; l && r > o; o++)
                  if (l[o].apply(s[0], s[1]) === !1 && t.stopOnFalse) {
                      i = !1;
                      break;
                  }
              (e = !1), l && (h ? h.length && c(h.shift()) : i ? (l = []) : u.disable());
          },
          u = {
              add: function () {
                  if (l) {
                      var n = l.length;
                      !(function s(e) {
                          rt.each(e, function (e, i) {
                              var n = rt.type(i);
                              "function" === n ? (t.unique && u.has(i)) || l.push(i) : i && i.length && "string" !== n && s(i);
                          });
                      })(arguments),
                          e ? (r = l.length) : i && ((a = n), c(i));
                  }
                  return this;
              },
              remove: function () {
                  return (
                      l &&
                          rt.each(arguments, function (t, i) {
                              for (var n; (n = rt.inArray(i, l, n)) > -1; ) l.splice(n, 1), e && (r >= n && r--, o >= n && o--);
                          }),
                      this
                  );
              },
              has: function (t) {
                  return t ? rt.inArray(t, l) > -1 : !(!l || !l.length);
              },
              empty: function () {
                  return (l = []), (r = 0), this;
              },
              disable: function () {
                  return (l = h = i = void 0), this;
              },
              disabled: function () {
                  return !l;
              },
              lock: function () {
                  return (h = void 0), i || u.disable(), this;
              },
              locked: function () {
                  return !h;
              },
              fireWith: function (t, i) {
                  return !l || (n && !h) || ((i = i || []), (i = [t, i.slice ? i.slice() : i]), e ? h.push(i) : c(i)), this;
              },
              fire: function () {
                  return u.fireWith(this, arguments), this;
              },
              fired: function () {
                  return !!n;
              },
          };
      return u;
  }),
      rt.extend({
          Deferred: function (t) {
              var e = [
                      ["resolve", "done", rt.Callbacks("once memory"), "resolved"],
                      ["reject", "fail", rt.Callbacks("once memory"), "rejected"],
                      ["notify", "progress", rt.Callbacks("memory")],
                  ],
                  i = "pending",
                  n = {
                      state: function () {
                          return i;
                      },
                      always: function () {
                          return r.done(arguments).fail(arguments), this;
                      },
                      then: function () {
                          var t = arguments;
                          return rt
                              .Deferred(function (i) {
                                  rt.each(e, function (e, s) {
                                      var o = rt.isFunction(t[e]) && t[e];
                                      r[s[1]](function () {
                                          var t = o && o.apply(this, arguments);
                                          t && rt.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, o ? [t] : arguments);
                                      });
                                  }),
                                      (t = null);
                              })
                              .promise();
                      },
                      promise: function (t) {
                          return null != t ? rt.extend(t, n) : n;
                      },
                  },
                  r = {};
              return (
                  (n.pipe = n.then),
                  rt.each(e, function (t, s) {
                      var o = s[2],
                          a = s[3];
                      (n[s[1]] = o.add),
                          a &&
                              o.add(
                                  function () {
                                      i = a;
                                  },
                                  e[1 ^ t][2].disable,
                                  e[2][2].lock
                              ),
                          (r[s[0]] = function () {
                              return r[s[0] + "With"](this === r ? n : this, arguments), this;
                          }),
                          (r[s[0] + "With"] = o.fireWith);
                  }),
                  n.promise(r),
                  t && t.call(r, r),
                  r
              );
          },
          when: function (t) {
              var e,
                  i,
                  n,
                  r = 0,
                  s = G.call(arguments),
                  o = s.length,
                  a = 1 !== o || (t && rt.isFunction(t.promise)) ? o : 0,
                  l = 1 === a ? t : rt.Deferred(),
                  h = function (t, i, n) {
                      return function (r) {
                          (i[t] = this), (n[t] = arguments.length > 1 ? G.call(arguments) : r), n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n);
                      };
                  };
              if (o > 1) for (e = new Array(o), i = new Array(o), n = new Array(o); o > r; r++) s[r] && rt.isFunction(s[r].promise) ? s[r].promise().done(h(r, n, s)).fail(l.reject).progress(h(r, i, e)) : --a;
              return a || l.resolveWith(n, s), l.promise();
          },
      });
  var xt;
  (rt.fn.ready = function (t) {
      return rt.ready.promise().done(t), this;
  }),
      rt.extend({
          isReady: !1,
          readyWait: 1,
          holdReady: function (t) {
              t ? rt.readyWait++ : rt.ready(!0);
          },
          ready: function (t) {
              if (t === !0 ? !--rt.readyWait : !rt.isReady) {
                  if (!dt.body) return setTimeout(rt.ready);
                  (rt.isReady = !0), (t !== !0 && --rt.readyWait > 0) || (xt.resolveWith(dt, [rt]), rt.fn.triggerHandler && (rt(dt).triggerHandler("ready"), rt(dt).off("ready")));
              }
          },
      }),
      (rt.ready.promise = function (e) {
          if (!xt)
              if (((xt = rt.Deferred()), "complete" === dt.readyState)) setTimeout(rt.ready);
              else if (dt.addEventListener) dt.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
              else {
                  dt.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
                  var i = !1;
                  try {
                      i = null == t.frameElement && dt.documentElement;
                  } catch (n) {}
                  i &&
                      i.doScroll &&
                      !(function r() {
                          if (!rt.isReady) {
                              try {
                                  i.doScroll("left");
                              } catch (t) {
                                  return setTimeout(r, 50);
                              }
                              o(), rt.ready();
                          }
                      })();
              }
          return xt.promise(e);
      });
  var bt,
      Tt = "undefined";
  for (bt in rt(it)) break;
  (it.ownLast = "0" !== bt),
      (it.inlineBlockNeedsLayout = !1),
      rt(function () {
          var t, e, i, n;
          (i = dt.getElementsByTagName("body")[0]),
              i &&
                  i.style &&
                  ((e = dt.createElement("div")),
                  (n = dt.createElement("div")),
                  (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                  i.appendChild(n).appendChild(e),
                  typeof e.style.zoom !== Tt && ((e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth), t && (i.style.zoom = 1)),
                  i.removeChild(n));
      }),
      (function () {
          var t = dt.createElement("div");
          if (null == it.deleteExpando) {
              it.deleteExpando = !0;
              try {
                  delete t.test;
              } catch (e) {
                  it.deleteExpando = !1;
              }
          }
          t = null;
      })(),
      (rt.acceptData = function (t) {
          var e = rt.noData[(t.nodeName + " ").toLowerCase()],
              i = +t.nodeType || 1;
          return (1 === i || 9 === i) && (!e || (e !== !0 && t.getAttribute("classid") === e));
      });
  var Ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      St = /([A-Z])/g;
  rt.extend({
      cache: {},
      noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
      hasData: function (t) {
          return (t = t.nodeType ? rt.cache[t[rt.expando]] : t[rt.expando]), !!t && !h(t);
      },
      data: function (t, e, i) {
          return c(t, e, i);
      },
      removeData: function (t, e) {
          return u(t, e);
      },
      _data: function (t, e, i) {
          return c(t, e, i, !0);
      },
      _removeData: function (t, e) {
          return u(t, e, !0);
      },
  }),
      rt.fn.extend({
          data: function (t, e) {
              var i,
                  n,
                  r,
                  s = this[0],
                  o = s && s.attributes;
              if (void 0 === t) {
                  if (this.length && ((r = rt.data(s)), 1 === s.nodeType && !rt._data(s, "parsedAttrs"))) {
                      for (i = o.length; i--; ) o[i] && ((n = o[i].name), 0 === n.indexOf("data-") && ((n = rt.camelCase(n.slice(5))), l(s, n, r[n])));
                      rt._data(s, "parsedAttrs", !0);
                  }
                  return r;
              }
              return "object" == typeof t
                  ? this.each(function () {
                        rt.data(this, t);
                    })
                  : arguments.length > 1
                  ? this.each(function () {
                        rt.data(this, t, e);
                    })
                  : s
                  ? l(s, t, rt.data(s, t))
                  : void 0;
          },
          removeData: function (t) {
              return this.each(function () {
                  rt.removeData(this, t);
              });
          },
      }),
      rt.extend({
          queue: function (t, e, i) {
              var n;
              return t ? ((e = (e || "fx") + "queue"), (n = rt._data(t, e)), i && (!n || rt.isArray(i) ? (n = rt._data(t, e, rt.makeArray(i))) : n.push(i)), n || []) : void 0;
          },
          dequeue: function (t, e) {
              e = e || "fx";
              var i = rt.queue(t, e),
                  n = i.length,
                  r = i.shift(),
                  s = rt._queueHooks(t, e),
                  o = function () {
                      rt.dequeue(t, e);
                  };
              "inprogress" === r && ((r = i.shift()), n--), r && ("fx" === e && i.unshift("inprogress"), delete s.stop, r.call(t, o, s)), !n && s && s.empty.fire();
          },
          _queueHooks: function (t, e) {
              var i = e + "queueHooks";
              return (
                  rt._data(t, i) ||
                  rt._data(t, i, {
                      empty: rt.Callbacks("once memory").add(function () {
                          rt._removeData(t, e + "queue"), rt._removeData(t, i);
                      }),
                  })
              );
          },
      }),
      rt.fn.extend({
          queue: function (t, e) {
              var i = 2;
              return (
                  "string" != typeof t && ((e = t), (t = "fx"), i--),
                  arguments.length < i
                      ? rt.queue(this[0], t)
                      : void 0 === e
                      ? this
                      : this.each(function () {
                            var i = rt.queue(this, t, e);
                            rt._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && rt.dequeue(this, t);
                        })
              );
          },
          dequeue: function (t) {
              return this.each(function () {
                  rt.dequeue(this, t);
              });
          },
          clearQueue: function (t) {
              return this.queue(t || "fx", []);
          },
          promise: function (t, e) {
              var i,
                  n = 1,
                  r = rt.Deferred(),
                  s = this,
                  o = this.length,
                  a = function () {
                      --n || r.resolveWith(s, [s]);
                  };
              for ("string" != typeof t && ((e = t), (t = void 0)), t = t || "fx"; o--; ) (i = rt._data(s[o], t + "queueHooks")), i && i.empty && (n++, i.empty.add(a));
              return a(), r.promise(e);
          },
      });
  var kt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      Pt = ["Top", "Right", "Bottom", "Left"],
      Et = function (t, e) {
          return (t = e || t), "none" === rt.css(t, "display") || !rt.contains(t.ownerDocument, t);
      },
      At = (rt.access = function (t, e, i, n, r, s, o) {
          var a = 0,
              l = t.length,
              h = null == i;
          if ("object" === rt.type(i)) {
              r = !0;
              for (a in i) rt.access(t, e, a, i[a], !0, s, o);
          } else if (
              void 0 !== n &&
              ((r = !0),
              rt.isFunction(n) || (o = !0),
              h &&
                  (o
                      ? (e.call(t, n), (e = null))
                      : ((h = e),
                        (e = function (t, e, i) {
                            return h.call(rt(t), i);
                        }))),
              e)
          )
              for (; l > a; a++) e(t[a], i, o ? n : n.call(t[a], a, e(t[a], i)));
          return r ? t : h ? e.call(t) : l ? e(t[0], i) : s;
      }),
      Ot = /^(?:checkbox|radio)$/i;
  !(function () {
      var t = dt.createElement("input"),
          e = dt.createElement("div"),
          i = dt.createDocumentFragment();
      if (
          ((e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (it.leadingWhitespace = 3 === e.firstChild.nodeType),
          (it.tbody = !e.getElementsByTagName("tbody").length),
          (it.htmlSerialize = !!e.getElementsByTagName("link").length),
          (it.html5Clone = "<:nav></:nav>" !== dt.createElement("nav").cloneNode(!0).outerHTML),
          (t.type = "checkbox"),
          (t.checked = !0),
          i.appendChild(t),
          (it.appendChecked = t.checked),
          (e.innerHTML = "<textarea>x</textarea>"),
          (it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue),
          i.appendChild(e),
          (e.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
          (it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (it.noCloneEvent = !0),
          e.attachEvent &&
              (e.attachEvent("onclick", function () {
                  it.noCloneEvent = !1;
              }),
              e.cloneNode(!0).click()),
          null == it.deleteExpando)
      ) {
          it.deleteExpando = !0;
          try {
              delete e.test;
          } catch (n) {
              it.deleteExpando = !1;
          }
      }
  })(),
      (function () {
          var e,
              i,
              n = dt.createElement("div");
          for (e in { submit: !0, change: !0, focusin: !0 }) (i = "on" + e), (it[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), (it[e + "Bubbles"] = n.attributes[i].expando === !1));
          n = null;
      })();
  var $t = /^(?:input|select|textarea)$/i,
      Dt = /^key/,
      Nt = /^(?:mouse|pointer|contextmenu)|click/,
      Rt = /^(?:focusinfocus|focusoutblur)$/,
      Mt = /^([^.]*)(?:\.(.+)|)$/;
  (rt.event = {
      global: {},
      add: function (t, e, i, n, r) {
          var s,
              o,
              a,
              l,
              h,
              c,
              u,
              f,
              p,
              d,
              m,
              g = rt._data(t);
          if (g) {
              for (
                  i.handler && ((l = i), (i = l.handler), (r = l.selector)),
                      i.guid || (i.guid = rt.guid++),
                      (o = g.events) || (o = g.events = {}),
                      (c = g.handle) ||
                          ((c = g.handle = function (t) {
                              return typeof rt === Tt || (t && rt.event.triggered === t.type) ? void 0 : rt.event.dispatch.apply(c.elem, arguments);
                          }),
                          (c.elem = t)),
                      e = (e || "").match(yt) || [""],
                      a = e.length;
                  a--;

              )
                  (s = Mt.exec(e[a]) || []),
                      (p = m = s[1]),
                      (d = (s[2] || "").split(".").sort()),
                      p &&
                          ((h = rt.event.special[p] || {}),
                          (p = (r ? h.delegateType : h.bindType) || p),
                          (h = rt.event.special[p] || {}),
                          (u = rt.extend({ type: p, origType: m, data: n, handler: i, guid: i.guid, selector: r, needsContext: r && rt.expr.match.needsContext.test(r), namespace: d.join(".") }, l)),
                          (f = o[p]) || ((f = o[p] = []), (f.delegateCount = 0), (h.setup && h.setup.call(t, n, d, c) !== !1) || (t.addEventListener ? t.addEventListener(p, c, !1) : t.attachEvent && t.attachEvent("on" + p, c))),
                          h.add && (h.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)),
                          r ? f.splice(f.delegateCount++, 0, u) : f.push(u),
                          (rt.event.global[p] = !0));
              t = null;
          }
      },
      remove: function (t, e, i, n, r) {
          var s,
              o,
              a,
              l,
              h,
              c,
              u,
              f,
              p,
              d,
              m,
              g = rt.hasData(t) && rt._data(t);
          if (g && (c = g.events)) {
              for (e = (e || "").match(yt) || [""], h = e.length; h--; )
                  if (((a = Mt.exec(e[h]) || []), (p = m = a[1]), (d = (a[2] || "").split(".").sort()), p)) {
                      for (u = rt.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, f = c[p] || [], a = a[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = f.length; s--; )
                          (o = f[s]),
                              (!r && m !== o.origType) ||
                                  (i && i.guid !== o.guid) ||
                                  (a && !a.test(o.namespace)) ||
                                  (n && n !== o.selector && ("**" !== n || !o.selector)) ||
                                  (f.splice(s, 1), o.selector && f.delegateCount--, u.remove && u.remove.call(t, o));
                      l && !f.length && ((u.teardown && u.teardown.call(t, d, g.handle) !== !1) || rt.removeEvent(t, p, g.handle), delete c[p]);
                  } else for (p in c) rt.event.remove(t, p + e[h], i, n, !0);
              rt.isEmptyObject(c) && (delete g.handle, rt._removeData(t, "events"));
          }
      },
      trigger: function (e, i, n, r) {
          var s,
              o,
              a,
              l,
              h,
              c,
              u,
              f = [n || dt],
              p = et.call(e, "type") ? e.type : e,
              d = et.call(e, "namespace") ? e.namespace.split(".") : [];
          if (
              ((a = c = n = n || dt),
              3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !Rt.test(p + rt.event.triggered) &&
                  (p.indexOf(".") >= 0 && ((d = p.split(".")), (p = d.shift()), d.sort()),
                  (o = p.indexOf(":") < 0 && "on" + p),
                  (e = e[rt.expando] ? e : new rt.Event(p, "object" == typeof e && e)),
                  (e.isTrigger = r ? 2 : 3),
                  (e.namespace = d.join(".")),
                  (e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                  (e.result = void 0),
                  e.target || (e.target = n),
                  (i = null == i ? [e] : rt.makeArray(i, [e])),
                  (h = rt.event.special[p] || {}),
                  r || !h.trigger || h.trigger.apply(n, i) !== !1))
          ) {
              if (!r && !h.noBubble && !rt.isWindow(n)) {
                  for (l = h.delegateType || p, Rt.test(l + p) || (a = a.parentNode); a; a = a.parentNode) f.push(a), (c = a);
                  c === (n.ownerDocument || dt) && f.push(c.defaultView || c.parentWindow || t);
              }
              for (u = 0; (a = f[u++]) && !e.isPropagationStopped(); )
                  (e.type = u > 1 ? l : h.bindType || p),
                      (s = (rt._data(a, "events") || {})[e.type] && rt._data(a, "handle")),
                      s && s.apply(a, i),
                      (s = o && a[o]),
                      s && s.apply && rt.acceptData(a) && ((e.result = s.apply(a, i)), e.result === !1 && e.preventDefault());
              if (((e.type = p), !r && !e.isDefaultPrevented() && (!h._default || h._default.apply(f.pop(), i) === !1) && rt.acceptData(n) && o && n[p] && !rt.isWindow(n))) {
                  (c = n[o]), c && (n[o] = null), (rt.event.triggered = p);
                  try {
                      n[p]();
                  } catch (m) {}
                  (rt.event.triggered = void 0), c && (n[o] = c);
              }
              return e.result;
          }
      },
      dispatch: function (t) {
          t = rt.event.fix(t);
          var e,
              i,
              n,
              r,
              s,
              o = [],
              a = G.call(arguments),
              l = (rt._data(this, "events") || {})[t.type] || [],
              h = rt.event.special[t.type] || {};
          if (((a[0] = t), (t.delegateTarget = this), !h.preDispatch || h.preDispatch.call(this, t) !== !1)) {
              for (o = rt.event.handlers.call(this, t, l), e = 0; (r = o[e++]) && !t.isPropagationStopped(); )
                  for (t.currentTarget = r.elem, s = 0; (n = r.handlers[s++]) && !t.isImmediatePropagationStopped(); )
                      (!t.namespace_re || t.namespace_re.test(n.namespace)) &&
                          ((t.handleObj = n), (t.data = n.data), (i = ((rt.event.special[n.origType] || {}).handle || n.handler).apply(r.elem, a)), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
              return h.postDispatch && h.postDispatch.call(this, t), t.result;
          }
      },
      handlers: function (t, e) {
          var i,
              n,
              r,
              s,
              o = [],
              a = e.delegateCount,
              l = t.target;
          if (a && l.nodeType && (!t.button || "click" !== t.type))
              for (; l != this; l = l.parentNode || this)
                  if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                      for (r = [], s = 0; a > s; s++) (n = e[s]), (i = n.selector + " "), void 0 === r[i] && (r[i] = n.needsContext ? rt(i, this).index(l) >= 0 : rt.find(i, this, null, [l]).length), r[i] && r.push(n);
                      r.length && o.push({ elem: l, handlers: r });
                  }
          return a < e.length && o.push({ elem: this, handlers: e.slice(a) }), o;
      },
      fix: function (t) {
          if (t[rt.expando]) return t;
          var e,
              i,
              n,
              r = t.type,
              s = t,
              o = this.fixHooks[r];
          for (o || (this.fixHooks[r] = o = Nt.test(r) ? this.mouseHooks : Dt.test(r) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, t = new rt.Event(s), e = n.length; e--; ) (i = n[e]), (t[i] = s[i]);
          return t.target || (t.target = s.srcElement || dt), 3 === t.target.nodeType && (t.target = t.target.parentNode), (t.metaKey = !!t.metaKey), o.filter ? o.filter(t, s) : t;
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
          props: "char charCode key keyCode".split(" "),
          filter: function (t, e) {
              return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t;
          },
      },
      mouseHooks: {
          props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
          filter: function (t, e) {
              var i,
                  n,
                  r,
                  s = e.button,
                  o = e.fromElement;
              return (
                  null == t.pageX &&
                      null != e.clientX &&
                      ((n = t.target.ownerDocument || dt),
                      (r = n.documentElement),
                      (i = n.body),
                      (t.pageX = e.clientX + ((r && r.scrollLeft) || (i && i.scrollLeft) || 0) - ((r && r.clientLeft) || (i && i.clientLeft) || 0)),
                      (t.pageY = e.clientY + ((r && r.scrollTop) || (i && i.scrollTop) || 0) - ((r && r.clientTop) || (i && i.clientTop) || 0))),
                  !t.relatedTarget && o && (t.relatedTarget = o === t.target ? e.toElement : o),
                  t.which || void 0 === s || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
                  t
              );
          },
      },
      special: {
          load: { noBubble: !0 },
          focus: {
              trigger: function () {
                  if (this !== d() && this.focus)
                      try {
                          return this.focus(), !1;
                      } catch (t) {}
              },
              delegateType: "focusin",
          },
          blur: {
              trigger: function () {
                  return this === d() && this.blur ? (this.blur(), !1) : void 0;
              },
              delegateType: "focusout",
          },
          click: {
              trigger: function () {
                  return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
              },
              _default: function (t) {
                  return rt.nodeName(t.target, "a");
              },
          },
          beforeunload: {
              postDispatch: function (t) {
                  void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
              },
          },
      },
      simulate: function (t, e, i, n) {
          var r = rt.extend(new rt.Event(), i, { type: t, isSimulated: !0, originalEvent: {} });
          n ? rt.event.trigger(r, null, e) : rt.event.dispatch.call(e, r), r.isDefaultPrevented() && i.preventDefault();
      },
  }),
      (rt.removeEvent = dt.removeEventListener
          ? function (t, e, i) {
                t.removeEventListener && t.removeEventListener(e, i, !1);
            }
          : function (t, e, i) {
                var n = "on" + e;
                t.detachEvent && (typeof t[n] === Tt && (t[n] = null), t.detachEvent(n, i));
            }),
      (rt.Event = function (t, e) {
          return this instanceof rt.Event
              ? (t && t.type ? ((this.originalEvent = t), (this.type = t.type), (this.isDefaultPrevented = t.defaultPrevented || (void 0 === t.defaultPrevented && t.returnValue === !1) ? f : p)) : (this.type = t),
                e && rt.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || rt.now()),
                void (this[rt.expando] = !0))
              : new rt.Event(t, e);
      }),
      (rt.Event.prototype = {
          isDefaultPrevented: p,
          isPropagationStopped: p,
          isImmediatePropagationStopped: p,
          preventDefault: function () {
              var t = this.originalEvent;
              (this.isDefaultPrevented = f), t && (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
          },
          stopPropagation: function () {
              var t = this.originalEvent;
              (this.isPropagationStopped = f), t && (t.stopPropagation && t.stopPropagation(), (t.cancelBubble = !0));
          },
          stopImmediatePropagation: function () {
              var t = this.originalEvent;
              (this.isImmediatePropagationStopped = f), t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation();
          },
      }),
      rt.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (t, e) {
          rt.event.special[t] = {
              delegateType: e,
              bindType: e,
              handle: function (t) {
                  var i,
                      n = this,
                      r = t.relatedTarget,
                      s = t.handleObj;
                  return (!r || (r !== n && !rt.contains(n, r))) && ((t.type = s.origType), (i = s.handler.apply(this, arguments)), (t.type = e)), i;
              },
          };
      }),
      it.submitBubbles ||
          (rt.event.special.submit = {
              setup: function () {
                  return (
                      !rt.nodeName(this, "form") &&
                      void rt.event.add(this, "click._submit keypress._submit", function (t) {
                          var e = t.target,
                              i = rt.nodeName(e, "input") || rt.nodeName(e, "button") ? e.form : void 0;
                          i &&
                              !rt._data(i, "submitBubbles") &&
                              (rt.event.add(i, "submit._submit", function (t) {
                                  t._submit_bubble = !0;
                              }),
                              rt._data(i, "submitBubbles", !0));
                      })
                  );
              },
              postDispatch: function (t) {
                  t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && rt.event.simulate("submit", this.parentNode, t, !0));
              },
              teardown: function () {
                  return !rt.nodeName(this, "form") && void rt.event.remove(this, "._submit");
              },
          }),
      it.changeBubbles ||
          (rt.event.special.change = {
              setup: function () {
                  return $t.test(this.nodeName)
                      ? (("checkbox" === this.type || "radio" === this.type) &&
                            (rt.event.add(this, "propertychange._change", function (t) {
                                "checked" === t.originalEvent.propertyName && (this._just_changed = !0);
                            }),
                            rt.event.add(this, "click._change", function (t) {
                                this._just_changed && !t.isTrigger && (this._just_changed = !1), rt.event.simulate("change", this, t, !0);
                            })),
                        !1)
                      : void rt.event.add(this, "beforeactivate._change", function (t) {
                            var e = t.target;
                            $t.test(e.nodeName) &&
                                !rt._data(e, "changeBubbles") &&
                                (rt.event.add(e, "change._change", function (t) {
                                    !this.parentNode || t.isSimulated || t.isTrigger || rt.event.simulate("change", this.parentNode, t, !0);
                                }),
                                rt._data(e, "changeBubbles", !0));
                        });
              },
              handle: function (t) {
                  var e = t.target;
                  return this !== e || t.isSimulated || t.isTrigger || ("radio" !== e.type && "checkbox" !== e.type) ? t.handleObj.handler.apply(this, arguments) : void 0;
              },
              teardown: function () {
                  return rt.event.remove(this, "._change"), !$t.test(this.nodeName);
              },
          }),
      it.focusinBubbles ||
          rt.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
              var i = function (t) {
                  rt.event.simulate(e, t.target, rt.event.fix(t), !0);
              };
              rt.event.special[e] = {
                  setup: function () {
                      var n = this.ownerDocument || this,
                          r = rt._data(n, e);
                      r || n.addEventListener(t, i, !0), rt._data(n, e, (r || 0) + 1);
                  },
                  teardown: function () {
                      var n = this.ownerDocument || this,
                          r = rt._data(n, e) - 1;
                      r ? rt._data(n, e, r) : (n.removeEventListener(t, i, !0), rt._removeData(n, e));
                  },
              };
          }),
      rt.fn.extend({
          on: function (t, e, i, n, r) {
              var s, o;
              if ("object" == typeof t) {
                  "string" != typeof e && ((i = i || e), (e = void 0));
                  for (s in t) this.on(s, e, i, t[s], r);
                  return this;
              }
              if ((null == i && null == n ? ((n = e), (i = e = void 0)) : null == n && ("string" == typeof e ? ((n = i), (i = void 0)) : ((n = i), (i = e), (e = void 0))), n === !1)) n = p;
              else if (!n) return this;
              return (
                  1 === r &&
                      ((o = n),
                      (n = function (t) {
                          return rt().off(t), o.apply(this, arguments);
                      }),
                      (n.guid = o.guid || (o.guid = rt.guid++))),
                  this.each(function () {
                      rt.event.add(this, t, n, i, e);
                  })
              );
          },
          one: function (t, e, i, n) {
              return this.on(t, e, i, n, 1);
          },
          off: function (t, e, i) {
              var n, r;
              if (t && t.preventDefault && t.handleObj) return (n = t.handleObj), rt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
              if ("object" == typeof t) {
                  for (r in t) this.off(r, e, t[r]);
                  return this;
              }
              return (
                  (e === !1 || "function" == typeof e) && ((i = e), (e = void 0)),
                  i === !1 && (i = p),
                  this.each(function () {
                      rt.event.remove(this, t, i, e);
                  })
              );
          },
          trigger: function (t, e) {
              return this.each(function () {
                  rt.event.trigger(t, e, this);
              });
          },
          triggerHandler: function (t, e) {
              var i = this[0];
              return i ? rt.event.trigger(t, e, i, !0) : void 0;
          },
      });
  var Lt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      zt = / jQuery\d+="(?:null|\d+)"/g,
      jt = new RegExp("<(?:" + Lt + ")[\\s/>]", "i"),
      Ft = /^\s+/,
      It = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Ht = /<([\w:]+)/,
      Bt = /<tbody/i,
      qt = /<|&#?\w+;/,
      Wt = /<(?:script|style|link)/i,
      Xt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Yt = /^$|\/(?:java|ecma)script/i,
      Ut = /^true\/(.*)/,
      Vt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      Gt = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          legend: [1, "<fieldset>", "</fieldset>"],
          area: [1, "<map>", "</map>"],
          param: [1, "<object>", "</object>"],
          thead: [1, "<table>", "</table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
      },
      Qt = m(dt),
      Zt = Qt.appendChild(dt.createElement("div"));
  (Gt.optgroup = Gt.option),
      (Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead),
      (Gt.th = Gt.td),
      rt.extend({
          clone: function (t, e, i) {
              var n,
                  r,
                  s,
                  o,
                  a,
                  l = rt.contains(t.ownerDocument, t);
              if (
                  (it.html5Clone || rt.isXMLDoc(t) || !jt.test("<" + t.nodeName + ">") ? (s = t.cloneNode(!0)) : ((Zt.innerHTML = t.outerHTML), Zt.removeChild((s = Zt.firstChild))),
                  !((it.noCloneEvent && it.noCloneChecked) || (1 !== t.nodeType && 11 !== t.nodeType) || rt.isXMLDoc(t)))
              )
                  for (n = g(s), a = g(t), o = 0; null != (r = a[o]); ++o) n[o] && T(r, n[o]);
              if (e)
                  if (i) for (a = a || g(t), n = n || g(s), o = 0; null != (r = a[o]); o++) b(r, n[o]);
                  else b(t, s);
              return (n = g(s, "script")), n.length > 0 && x(n, !l && g(t, "script")), (n = a = r = null), s;
          },
          buildFragment: function (t, e, i, n) {
              for (var r, s, o, a, l, h, c, u = t.length, f = m(e), p = [], d = 0; u > d; d++)
                  if (((s = t[d]), s || 0 === s))
                      if ("object" === rt.type(s)) rt.merge(p, s.nodeType ? [s] : s);
                      else if (qt.test(s)) {
                          for (a = a || f.appendChild(e.createElement("div")), l = (Ht.exec(s) || ["", ""])[1].toLowerCase(), c = Gt[l] || Gt._default, a.innerHTML = c[1] + s.replace(It, "<$1></$2>") + c[2], r = c[0]; r--; )
                              a = a.lastChild;
                          if ((!it.leadingWhitespace && Ft.test(s) && p.push(e.createTextNode(Ft.exec(s)[0])), !it.tbody))
                              for (s = "table" !== l || Bt.test(s) ? ("<table>" !== c[1] || Bt.test(s) ? 0 : a) : a.firstChild, r = s && s.childNodes.length; r--; )
                                  rt.nodeName((h = s.childNodes[r]), "tbody") && !h.childNodes.length && s.removeChild(h);
                          for (rt.merge(p, a.childNodes), a.textContent = ""; a.firstChild; ) a.removeChild(a.firstChild);
                          a = f.lastChild;
                      } else p.push(e.createTextNode(s));
              for (a && f.removeChild(a), it.appendChecked || rt.grep(g(p, "input"), _), d = 0; (s = p[d++]); )
                  if ((!n || -1 === rt.inArray(s, n)) && ((o = rt.contains(s.ownerDocument, s)), (a = g(f.appendChild(s), "script")), o && x(a), i)) for (r = 0; (s = a[r++]); ) Yt.test(s.type || "") && i.push(s);
              return (a = null), f;
          },
          cleanData: function (t, e) {
              for (var i, n, r, s, o = 0, a = rt.expando, l = rt.cache, h = it.deleteExpando, c = rt.event.special; null != (i = t[o]); o++)
                  if ((e || rt.acceptData(i)) && ((r = i[a]), (s = r && l[r]))) {
                      if (s.events) for (n in s.events) c[n] ? rt.event.remove(i, n) : rt.removeEvent(i, n, s.handle);
                      l[r] && (delete l[r], h ? delete i[a] : typeof i.removeAttribute !== Tt ? i.removeAttribute(a) : (i[a] = null), V.push(r));
                  }
          },
      }),
      rt.fn.extend({
          text: function (t) {
              return At(
                  this,
                  function (t) {
                      return void 0 === t ? rt.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || dt).createTextNode(t));
                  },
                  null,
                  t,
                  arguments.length
              );
          },
          append: function () {
              return this.domManip(arguments, function (t) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                      var e = v(this, t);
                      e.appendChild(t);
                  }
              });
          },
          prepend: function () {
              return this.domManip(arguments, function (t) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                      var e = v(this, t);
                      e.insertBefore(t, e.firstChild);
                  }
              });
          },
          before: function () {
              return this.domManip(arguments, function (t) {
                  this.parentNode && this.parentNode.insertBefore(t, this);
              });
          },
          after: function () {
              return this.domManip(arguments, function (t) {
                  this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
              });
          },
          remove: function (t, e) {
              for (var i, n = t ? rt.filter(t, this) : this, r = 0; null != (i = n[r]); r++)
                  e || 1 !== i.nodeType || rt.cleanData(g(i)), i.parentNode && (e && rt.contains(i.ownerDocument, i) && x(g(i, "script")), i.parentNode.removeChild(i));
              return this;
          },
          empty: function () {
              for (var t, e = 0; null != (t = this[e]); e++) {
                  for (1 === t.nodeType && rt.cleanData(g(t, !1)); t.firstChild; ) t.removeChild(t.firstChild);
                  t.options && rt.nodeName(t, "select") && (t.options.length = 0);
              }
              return this;
          },
          clone: function (t, e) {
              return (
                  (t = null != t && t),
                  (e = null == e ? t : e),
                  this.map(function () {
                      return rt.clone(this, t, e);
                  })
              );
          },
          html: function (t) {
              return At(
                  this,
                  function (t) {
                      var e = this[0] || {},
                          i = 0,
                          n = this.length;
                      if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(zt, "") : void 0;
                      if (!("string" != typeof t || Wt.test(t) || (!it.htmlSerialize && jt.test(t)) || (!it.leadingWhitespace && Ft.test(t)) || Gt[(Ht.exec(t) || ["", ""])[1].toLowerCase()])) {
                          t = t.replace(It, "<$1></$2>");
                          try {
                              for (; n > i; i++) (e = this[i] || {}), 1 === e.nodeType && (rt.cleanData(g(e, !1)), (e.innerHTML = t));
                              e = 0;
                          } catch (r) {}
                      }
                      e && this.empty().append(t);
                  },
                  null,
                  t,
                  arguments.length
              );
          },
          replaceWith: function () {
              var t = arguments[0];
              return (
                  this.domManip(arguments, function (e) {
                      (t = this.parentNode), rt.cleanData(g(this)), t && t.replaceChild(e, this);
                  }),
                  t && (t.length || t.nodeType) ? this : this.remove()
              );
          },
          detach: function (t) {
              return this.remove(t, !0);
          },
          domManip: function (t, e) {
              t = Q.apply([], t);
              var i,
                  n,
                  r,
                  s,
                  o,
                  a,
                  l = 0,
                  h = this.length,
                  c = this,
                  u = h - 1,
                  f = t[0],
                  p = rt.isFunction(f);
              if (p || (h > 1 && "string" == typeof f && !it.checkClone && Xt.test(f)))
                  return this.each(function (i) {
                      var n = c.eq(i);
                      p && (t[0] = f.call(this, i, n.html())), n.domManip(t, e);
                  });
              if (h && ((a = rt.buildFragment(t, this[0].ownerDocument, !1, this)), (i = a.firstChild), 1 === a.childNodes.length && (a = i), i)) {
                  for (s = rt.map(g(a, "script"), y), r = s.length; h > l; l++) (n = a), l !== u && ((n = rt.clone(n, !0, !0)), r && rt.merge(s, g(n, "script"))), e.call(this[l], n, l);
                  if (r)
                      for (o = s[s.length - 1].ownerDocument, rt.map(s, w), l = 0; r > l; l++)
                          (n = s[l]), Yt.test(n.type || "") && !rt._data(n, "globalEval") && rt.contains(o, n) && (n.src ? rt._evalUrl && rt._evalUrl(n.src) : rt.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Vt, "")));
                  a = i = null;
              }
              return this;
          },
      }),
      rt.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, e) {
          rt.fn[t] = function (t) {
              for (var i, n = 0, r = [], s = rt(t), o = s.length - 1; o >= n; n++) (i = n === o ? this : this.clone(!0)), rt(s[n])[e](i), Z.apply(r, i.get());
              return this.pushStack(r);
          };
      });
  var Jt,
      Kt = {};
  !(function () {
      var t;
      it.shrinkWrapBlocks = function () {
          if (null != t) return t;
          t = !1;
          var e, i, n;
          return (
              (i = dt.getElementsByTagName("body")[0]),
              i && i.style
                  ? ((e = dt.createElement("div")),
                    (n = dt.createElement("div")),
                    (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    i.appendChild(n).appendChild(e),
                    typeof e.style.zoom !== Tt &&
                        ((e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                        (e.appendChild(dt.createElement("div")).style.width = "5px"),
                        (t = 3 !== e.offsetWidth)),
                    i.removeChild(n),
                    t)
                  : void 0
          );
      };
  })();
  var te,
      ee,
      ie = /^margin/,
      ne = new RegExp("^(" + kt + ")(?!px)[a-z%]+$", "i"),
      re = /^(top|right|bottom|left)$/;
  t.getComputedStyle
      ? ((te = function (t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null);
        }),
        (ee = function (t, e, i) {
            var n,
                r,
                s,
                o,
                a = t.style;
            return (
                (i = i || te(t)),
                (o = i ? i.getPropertyValue(e) || i[e] : void 0),
                i &&
                    ("" !== o || rt.contains(t.ownerDocument, t) || (o = rt.style(t, e)),
                    ne.test(o) && ie.test(e) && ((n = a.width), (r = a.minWidth), (s = a.maxWidth), (a.minWidth = a.maxWidth = a.width = o), (o = i.width), (a.width = n), (a.minWidth = r), (a.maxWidth = s))),
                void 0 === o ? o : o + ""
            );
        }))
      : dt.documentElement.currentStyle &&
        ((te = function (t) {
            return t.currentStyle;
        }),
        (ee = function (t, e, i) {
            var n,
                r,
                s,
                o,
                a = t.style;
            return (
                (i = i || te(t)),
                (o = i ? i[e] : void 0),
                null == o && a && a[e] && (o = a[e]),
                ne.test(o) && !re.test(e) && ((n = a.left), (r = t.runtimeStyle), (s = r && r.left), s && (r.left = t.currentStyle.left), (a.left = "fontSize" === e ? "1em" : o), (o = a.pixelLeft + "px"), (a.left = n), s && (r.left = s)),
                void 0 === o ? o : o + "" || "auto"
            );
        })),
      !(function () {
          function e() {
              var e, i, n, r;
              (i = dt.getElementsByTagName("body")[0]),
                  i &&
                      i.style &&
                      ((e = dt.createElement("div")),
                      (n = dt.createElement("div")),
                      (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                      i.appendChild(n).appendChild(e),
                      (e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                      (s = o = !1),
                      (l = !0),
                      t.getComputedStyle &&
                          ((s = "1%" !== (t.getComputedStyle(e, null) || {}).top),
                          (o = "4px" === (t.getComputedStyle(e, null) || { width: "4px" }).width),
                          (r = e.appendChild(dt.createElement("div"))),
                          (r.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                          (r.style.marginRight = r.style.width = "0"),
                          (e.style.width = "1px"),
                          (l = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight))),
                      (e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                      (r = e.getElementsByTagName("td")),
                      (r[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                      (a = 0 === r[0].offsetHeight),
                      a && ((r[0].style.display = ""), (r[1].style.display = "none"), (a = 0 === r[0].offsetHeight)),
                      i.removeChild(n));
          }
          var i, n, r, s, o, a, l;
          (i = dt.createElement("div")),
              (i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
              (r = i.getElementsByTagName("a")[0]),
              (n = r && r.style) &&
                  ((n.cssText = "float:left;opacity:.5"),
                  (it.opacity = "0.5" === n.opacity),
                  (it.cssFloat = !!n.cssFloat),
                  (i.style.backgroundClip = "content-box"),
                  (i.cloneNode(!0).style.backgroundClip = ""),
                  (it.clearCloneStyle = "content-box" === i.style.backgroundClip),
                  (it.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing),
                  rt.extend(it, {
                      reliableHiddenOffsets: function () {
                          return null == a && e(), a;
                      },
                      boxSizingReliable: function () {
                          return null == o && e(), o;
                      },
                      pixelPosition: function () {
                          return null == s && e(), s;
                      },
                      reliableMarginRight: function () {
                          return null == l && e(), l;
                      },
                  }));
      })(),
      (rt.swap = function (t, e, i, n) {
          var r,
              s,
              o = {};
          for (s in e) (o[s] = t.style[s]), (t.style[s] = e[s]);
          r = i.apply(t, n || []);
          for (s in e) t.style[s] = o[s];
          return r;
      });
  var se = /alpha\([^)]*\)/i,
      oe = /opacity\s*=\s*([^)]*)/,
      ae = /^(none|table(?!-c[ea]).+)/,
      le = new RegExp("^(" + kt + ")(.*)$", "i"),
      he = new RegExp("^([+-])=(" + kt + ")", "i"),
      ce = { position: "absolute", visibility: "hidden", display: "block" },
      ue = { letterSpacing: "0", fontWeight: "400" },
      fe = ["Webkit", "O", "Moz", "ms"];
  rt.extend({
      cssHooks: {
          opacity: {
              get: function (t, e) {
                  if (e) {
                      var i = ee(t, "opacity");
                      return "" === i ? "1" : i;
                  }
              },
          },
      },
      cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
      cssProps: { float: it.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (t, e, i, n) {
          if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
              var r,
                  s,
                  o,
                  a = rt.camelCase(e),
                  l = t.style;
              if (((e = rt.cssProps[a] || (rt.cssProps[a] = P(l, a))), (o = rt.cssHooks[e] || rt.cssHooks[a]), void 0 === i)) return o && "get" in o && void 0 !== (r = o.get(t, !1, n)) ? r : l[e];
              if (
                  ((s = typeof i),
                  "string" === s && (r = he.exec(i)) && ((i = (r[1] + 1) * r[2] + parseFloat(rt.css(t, e))), (s = "number")),
                  null != i && i === i && ("number" !== s || rt.cssNumber[a] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(o && "set" in o && void 0 === (i = o.set(t, i, n)))))
              )
                  try {
                      l[e] = i;
                  } catch (h) {}
          }
      },
      css: function (t, e, i, n) {
          var r,
              s,
              o,
              a = rt.camelCase(e);
          return (
              (e = rt.cssProps[a] || (rt.cssProps[a] = P(t.style, a))),
              (o = rt.cssHooks[e] || rt.cssHooks[a]),
              o && "get" in o && (s = o.get(t, !0, i)),
              void 0 === s && (s = ee(t, e, n)),
              "normal" === s && e in ue && (s = ue[e]),
              "" === i || i ? ((r = parseFloat(s)), i === !0 || rt.isNumeric(r) ? r || 0 : s) : s
          );
      },
  }),
      rt.each(["height", "width"], function (t, e) {
          rt.cssHooks[e] = {
              get: function (t, i, n) {
                  return i
                      ? ae.test(rt.css(t, "display")) && 0 === t.offsetWidth
                          ? rt.swap(t, ce, function () {
                                return $(t, e, n);
                            })
                          : $(t, e, n)
                      : void 0;
              },
              set: function (t, i, n) {
                  var r = n && te(t);
                  return A(t, i, n ? O(t, e, n, it.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, r), r) : 0);
              },
          };
      }),
      it.opacity ||
          (rt.cssHooks.opacity = {
              get: function (t, e) {
                  return oe.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : e ? "1" : "";
              },
              set: function (t, e) {
                  var i = t.style,
                      n = t.currentStyle,
                      r = rt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                      s = (n && n.filter) || i.filter || "";
                  (i.zoom = 1), ((e >= 1 || "" === e) && "" === rt.trim(s.replace(se, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || (n && !n.filter))) || (i.filter = se.test(s) ? s.replace(se, r) : s + " " + r);
              },
          }),
      (rt.cssHooks.marginRight = k(it.reliableMarginRight, function (t, e) {
          return e ? rt.swap(t, { display: "inline-block" }, ee, [t, "marginRight"]) : void 0;
      })),
      rt.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
          (rt.cssHooks[t + e] = {
              expand: function (i) {
                  for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[t + Pt[n] + e] = s[n] || s[n - 2] || s[0];
                  return r;
              },
          }),
              ie.test(t) || (rt.cssHooks[t + e].set = A);
      }),
      rt.fn.extend({
          css: function (t, e) {
              return At(
                  this,
                  function (t, e, i) {
                      var n,
                          r,
                          s = {},
                          o = 0;
                      if (rt.isArray(e)) {
                          for (n = te(t), r = e.length; r > o; o++) s[e[o]] = rt.css(t, e[o], !1, n);
                          return s;
                      }
                      return void 0 !== i ? rt.style(t, e, i) : rt.css(t, e);
                  },
                  t,
                  e,
                  arguments.length > 1
              );
          },
          show: function () {
              return E(this, !0);
          },
          hide: function () {
              return E(this);
          },
          toggle: function (t) {
              return "boolean" == typeof t
                  ? t
                      ? this.show()
                      : this.hide()
                  : this.each(function () {
                        Et(this) ? rt(this).show() : rt(this).hide();
                    });
          },
      }),
      (rt.Tween = D),
      (D.prototype = {
          constructor: D,
          init: function (t, e, i, n, r, s) {
              (this.elem = t), (this.prop = i), (this.easing = r || "swing"), (this.options = e), (this.start = this.now = this.cur()), (this.end = n), (this.unit = s || (rt.cssNumber[i] ? "" : "px"));
          },
          cur: function () {
              var t = D.propHooks[this.prop];
              return t && t.get ? t.get(this) : D.propHooks._default.get(this);
          },
          run: function (t) {
              var e,
                  i = D.propHooks[this.prop];
              return (
                  (this.pos = e = this.options.duration ? rt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t),
                  (this.now = (this.end - this.start) * e + this.start),
                  this.options.step && this.options.step.call(this.elem, this.now, this),
                  i && i.set ? i.set(this) : D.propHooks._default.set(this),
                  this
              );
          },
      }),
      (D.prototype.init.prototype = D.prototype),
      (D.propHooks = {
          _default: {
              get: function (t) {
                  var e;
                  return null == t.elem[t.prop] || (t.elem.style && null != t.elem.style[t.prop]) ? ((e = rt.css(t.elem, t.prop, "")), e && "auto" !== e ? e : 0) : t.elem[t.prop];
              },
              set: function (t) {
                  rt.fx.step[t.prop] ? rt.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[rt.cssProps[t.prop]] || rt.cssHooks[t.prop]) ? rt.style(t.elem, t.prop, t.now + t.unit) : (t.elem[t.prop] = t.now);
              },
          },
      }),
      (D.propHooks.scrollTop = D.propHooks.scrollLeft = {
          set: function (t) {
              t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
          },
      }),
      (rt.easing = {
          linear: function (t) {
              return t;
          },
          swing: function (t) {
              return 0.5 - Math.cos(t * Math.PI) / 2;
          },
      }),
      (rt.fx = D.prototype.init),
      (rt.fx.step = {});
  var pe,
      de,
      me = /^(?:toggle|show|hide)$/,
      ge = new RegExp("^(?:([+-])=|)(" + kt + ")([a-z%]*)$", "i"),
      _e = /queueHooks$/,
      ve = [L],
      ye = {
          "*": [
              function (t, e) {
                  var i = this.createTween(t, e),
                      n = i.cur(),
                      r = ge.exec(e),
                      s = (r && r[3]) || (rt.cssNumber[t] ? "" : "px"),
                      o = (rt.cssNumber[t] || ("px" !== s && +n)) && ge.exec(rt.css(i.elem, t)),
                      a = 1,
                      l = 20;
                  if (o && o[3] !== s) {
                      (s = s || o[3]), (r = r || []), (o = +n || 1);
                      do (a = a || ".5"), (o /= a), rt.style(i.elem, t, o + s);
                      while (a !== (a = i.cur() / n) && 1 !== a && --l);
                  }
                  return r && ((o = i.start = +o || +n || 0), (i.unit = s), (i.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2])), i;
              },
          ],
      };
  (rt.Animation = rt.extend(j, {
      tweener: function (t, e) {
          rt.isFunction(t) ? ((e = t), (t = ["*"])) : (t = t.split(" "));
          for (var i, n = 0, r = t.length; r > n; n++) (i = t[n]), (ye[i] = ye[i] || []), ye[i].unshift(e);
      },
      prefilter: function (t, e) {
          e ? ve.unshift(t) : ve.push(t);
      },
  })),
      (rt.speed = function (t, e, i) {
          var n = t && "object" == typeof t ? rt.extend({}, t) : { complete: i || (!i && e) || (rt.isFunction(t) && t), duration: t, easing: (i && e) || (e && !rt.isFunction(e) && e) };
          return (
              (n.duration = rt.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in rt.fx.speeds ? rt.fx.speeds[n.duration] : rt.fx.speeds._default),
              (null == n.queue || n.queue === !0) && (n.queue = "fx"),
              (n.old = n.complete),
              (n.complete = function () {
                  rt.isFunction(n.old) && n.old.call(this), n.queue && rt.dequeue(this, n.queue);
              }),
              n
          );
      }),
      rt.fn.extend({
          fadeTo: function (t, e, i, n) {
              return this.filter(Et).css("opacity", 0).show().end().animate({ opacity: e }, t, i, n);
          },
          animate: function (t, e, i, n) {
              var r = rt.isEmptyObject(t),
                  s = rt.speed(e, i, n),
                  o = function () {
                      var e = j(this, rt.extend({}, t), s);
                      (r || rt._data(this, "finish")) && e.stop(!0);
                  };
              return (o.finish = o), r || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
          },
          stop: function (t, e, i) {
              var n = function (t) {
                  var e = t.stop;
                  delete t.stop, e(i);
              };
              return (
                  "string" != typeof t && ((i = e), (e = t), (t = void 0)),
                  e && t !== !1 && this.queue(t || "fx", []),
                  this.each(function () {
                      var e = !0,
                          r = null != t && t + "queueHooks",
                          s = rt.timers,
                          o = rt._data(this);
                      if (r) o[r] && o[r].stop && n(o[r]);
                      else for (r in o) o[r] && o[r].stop && _e.test(r) && n(o[r]);
                      for (r = s.length; r--; ) s[r].elem !== this || (null != t && s[r].queue !== t) || (s[r].anim.stop(i), (e = !1), s.splice(r, 1));
                      (e || !i) && rt.dequeue(this, t);
                  })
              );
          },
          finish: function (t) {
              return (
                  t !== !1 && (t = t || "fx"),
                  this.each(function () {
                      var e,
                          i = rt._data(this),
                          n = i[t + "queue"],
                          r = i[t + "queueHooks"],
                          s = rt.timers,
                          o = n ? n.length : 0;
                      for (i.finish = !0, rt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--; ) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                      for (e = 0; o > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                      delete i.finish;
                  })
              );
          },
      }),
      rt.each(["toggle", "show", "hide"], function (t, e) {
          var i = rt.fn[e];
          rt.fn[e] = function (t, n, r) {
              return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(R(e, !0), t, n, r);
          };
      }),
      rt.each({ slideDown: R("show"), slideUp: R("hide"), slideToggle: R("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, e) {
          rt.fn[t] = function (t, i, n) {
              return this.animate(e, t, i, n);
          };
      }),
      (rt.timers = []),
      (rt.fx.tick = function () {
          var t,
              e = rt.timers,
              i = 0;
          for (pe = rt.now(); i < e.length; i++) (t = e[i]), t() || e[i] !== t || e.splice(i--, 1);
          e.length || rt.fx.stop(), (pe = void 0);
      }),
      (rt.fx.timer = function (t) {
          rt.timers.push(t), t() ? rt.fx.start() : rt.timers.pop();
      }),
      (rt.fx.interval = 13),
      (rt.fx.start = function () {
          de || (de = setInterval(rt.fx.tick, rt.fx.interval));
      }),
      (rt.fx.stop = function () {
          clearInterval(de), (de = null);
      }),
      (rt.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (rt.fn.delay = function (t, e) {
          return (
              (t = rt.fx ? rt.fx.speeds[t] || t : t),
              (e = e || "fx"),
              this.queue(e, function (e, i) {
                  var n = setTimeout(e, t);
                  i.stop = function () {
                      clearTimeout(n);
                  };
              })
          );
      }),
      (function () {
          var t, e, i, n, r;
          (e = dt.createElement("div")),
              e.setAttribute("className", "t"),
              (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
              (n = e.getElementsByTagName("a")[0]),
              (i = dt.createElement("select")),
              (r = i.appendChild(dt.createElement("option"))),
              (t = e.getElementsByTagName("input")[0]),
              (n.style.cssText = "top:1px"),
              (it.getSetAttribute = "t" !== e.className),
              (it.style = /top/.test(n.getAttribute("style"))),
              (it.hrefNormalized = "/a" === n.getAttribute("href")),
              (it.checkOn = !!t.value),
              (it.optSelected = r.selected),
              (it.enctype = !!dt.createElement("form").enctype),
              (i.disabled = !0),
              (it.optDisabled = !r.disabled),
              (t = dt.createElement("input")),
              t.setAttribute("value", ""),
              (it.input = "" === t.getAttribute("value")),
              (t.value = "t"),
              t.setAttribute("type", "radio"),
              (it.radioValue = "t" === t.value);
      })();
  var we = /\r/g;
  rt.fn.extend({
      val: function (t) {
          var e,
              i,
              n,
              r = this[0];
          return arguments.length
              ? ((n = rt.isFunction(t)),
                this.each(function (i) {
                    var r;
                    1 === this.nodeType &&
                        ((r = n ? t.call(this, i, rt(this).val()) : t),
                        null == r
                            ? (r = "")
                            : "number" == typeof r
                            ? (r += "")
                            : rt.isArray(r) &&
                              (r = rt.map(r, function (t) {
                                  return null == t ? "" : t + "";
                              })),
                        (e = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()]),
                        (e && "set" in e && void 0 !== e.set(this, r, "value")) || (this.value = r));
                }))
              : r
              ? ((e = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()]), e && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : ((i = r.value), "string" == typeof i ? i.replace(we, "") : null == i ? "" : i))
              : void 0;
      },
  }),
      rt.extend({
          valHooks: {
              option: {
                  get: function (t) {
                      var e = rt.find.attr(t, "value");
                      return null != e ? e : rt.trim(rt.text(t));
                  },
              },
              select: {
                  get: function (t) {
                      for (var e, i, n = t.options, r = t.selectedIndex, s = "select-one" === t.type || 0 > r, o = s ? null : [], a = s ? r + 1 : n.length, l = 0 > r ? a : s ? r : 0; a > l; l++)
                          if (((i = n[l]), !((!i.selected && l !== r) || (it.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || (i.parentNode.disabled && rt.nodeName(i.parentNode, "optgroup"))))) {
                              if (((e = rt(i).val()), s)) return e;
                              o.push(e);
                          }
                      return o;
                  },
                  set: function (t, e) {
                      for (var i, n, r = t.options, s = rt.makeArray(e), o = r.length; o--; )
                          if (((n = r[o]), rt.inArray(rt.valHooks.option.get(n), s) >= 0))
                              try {
                                  n.selected = i = !0;
                              } catch (a) {
                                  n.scrollHeight;
                              }
                          else n.selected = !1;
                      return i || (t.selectedIndex = -1), r;
                  },
              },
          },
      }),
      rt.each(["radio", "checkbox"], function () {
          (rt.valHooks[this] = {
              set: function (t, e) {
                  return rt.isArray(e) ? (t.checked = rt.inArray(rt(t).val(), e) >= 0) : void 0;
              },
          }),
              it.checkOn ||
                  (rt.valHooks[this].get = function (t) {
                      return null === t.getAttribute("value") ? "on" : t.value;
                  });
      });
  var xe,
      be,
      Te = rt.expr.attrHandle,
      Ce = /^(?:checked|selected)$/i,
      Se = it.getSetAttribute,
      ke = it.input;
  rt.fn.extend({
      attr: function (t, e) {
          return At(this, rt.attr, t, e, arguments.length > 1);
      },
      removeAttr: function (t) {
          return this.each(function () {
              rt.removeAttr(this, t);
          });
      },
  }),
      rt.extend({
          attr: function (t, e, i) {
              var n,
                  r,
                  s = t.nodeType;
              if (t && 3 !== s && 8 !== s && 2 !== s)
                  return typeof t.getAttribute === Tt
                      ? rt.prop(t, e, i)
                      : ((1 === s && rt.isXMLDoc(t)) || ((e = e.toLowerCase()), (n = rt.attrHooks[e] || (rt.expr.match.bool.test(e) ? be : xe))),
                        void 0 === i
                            ? n && "get" in n && null !== (r = n.get(t, e))
                                ? r
                                : ((r = rt.find.attr(t, e)), null == r ? void 0 : r)
                            : null !== i
                            ? n && "set" in n && void 0 !== (r = n.set(t, i, e))
                                ? r
                                : (t.setAttribute(e, i + ""), i)
                            : void rt.removeAttr(t, e));
          },
          removeAttr: function (t, e) {
              var i,
                  n,
                  r = 0,
                  s = e && e.match(yt);
              if (s && 1 === t.nodeType)
                  for (; (i = s[r++]); ) (n = rt.propFix[i] || i), rt.expr.match.bool.test(i) ? ((ke && Se) || !Ce.test(i) ? (t[n] = !1) : (t[rt.camelCase("default-" + i)] = t[n] = !1)) : rt.attr(t, i, ""), t.removeAttribute(Se ? i : n);
          },
          attrHooks: {
              type: {
                  set: function (t, e) {
                      if (!it.radioValue && "radio" === e && rt.nodeName(t, "input")) {
                          var i = t.value;
                          return t.setAttribute("type", e), i && (t.value = i), e;
                      }
                  },
              },
          },
      }),
      (be = {
          set: function (t, e, i) {
              return e === !1 ? rt.removeAttr(t, i) : (ke && Se) || !Ce.test(i) ? t.setAttribute((!Se && rt.propFix[i]) || i, i) : (t[rt.camelCase("default-" + i)] = t[i] = !0), i;
          },
      }),
      rt.each(rt.expr.match.bool.source.match(/\w+/g), function (t, e) {
          var i = Te[e] || rt.find.attr;
          Te[e] =
              (ke && Se) || !Ce.test(e)
                  ? function (t, e, n) {
                        var r, s;
                        return n || ((s = Te[e]), (Te[e] = r), (r = null != i(t, e, n) ? e.toLowerCase() : null), (Te[e] = s)), r;
                    }
                  : function (t, e, i) {
                        return i ? void 0 : t[rt.camelCase("default-" + e)] ? e.toLowerCase() : null;
                    };
      }),
      (ke && Se) ||
          (rt.attrHooks.value = {
              set: function (t, e, i) {
                  return rt.nodeName(t, "input") ? void (t.defaultValue = e) : xe && xe.set(t, e, i);
              },
          }),
      Se ||
          ((xe = {
              set: function (t, e, i) {
                  var n = t.getAttributeNode(i);
                  return n || t.setAttributeNode((n = t.ownerDocument.createAttribute(i))), (n.value = e += ""), "value" === i || e === t.getAttribute(i) ? e : void 0;
              },
          }),
          (Te.id = Te.name = Te.coords = function (t, e, i) {
              var n;
              return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null;
          }),
          (rt.valHooks.button = {
              get: function (t, e) {
                  var i = t.getAttributeNode(e);
                  return i && i.specified ? i.value : void 0;
              },
              set: xe.set,
          }),
          (rt.attrHooks.contenteditable = {
              set: function (t, e, i) {
                  xe.set(t, "" !== e && e, i);
              },
          }),
          rt.each(["width", "height"], function (t, e) {
              rt.attrHooks[e] = {
                  set: function (t, i) {
                      return "" === i ? (t.setAttribute(e, "auto"), i) : void 0;
                  },
              };
          })),
      it.style ||
          (rt.attrHooks.style = {
              get: function (t) {
                  return t.style.cssText || void 0;
              },
              set: function (t, e) {
                  return (t.style.cssText = e + "");
              },
          });
  var Pe = /^(?:input|select|textarea|button|object)$/i,
      Ee = /^(?:a|area)$/i;
  rt.fn.extend({
      prop: function (t, e) {
          return At(this, rt.prop, t, e, arguments.length > 1);
      },
      removeProp: function (t) {
          return (
              (t = rt.propFix[t] || t),
              this.each(function () {
                  try {
                      (this[t] = void 0), delete this[t];
                  } catch (e) {}
              })
          );
      },
  }),
      rt.extend({
          propFix: { for: "htmlFor", class: "className" },
          prop: function (t, e, i) {
              var n,
                  r,
                  s,
                  o = t.nodeType;
              if (t && 3 !== o && 8 !== o && 2 !== o)
                  return (
                      (s = 1 !== o || !rt.isXMLDoc(t)),
                      s && ((e = rt.propFix[e] || e), (r = rt.propHooks[e])),
                      void 0 !== i ? (r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : (t[e] = i)) : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
                  );
          },
          propHooks: {
              tabIndex: {
                  get: function (t) {
                      var e = rt.find.attr(t, "tabindex");
                      return e ? parseInt(e, 10) : Pe.test(t.nodeName) || (Ee.test(t.nodeName) && t.href) ? 0 : -1;
                  },
              },
          },
      }),
      it.hrefNormalized ||
          rt.each(["href", "src"], function (t, e) {
              rt.propHooks[e] = {
                  get: function (t) {
                      return t.getAttribute(e, 4);
                  },
              };
          }),
      it.optSelected ||
          (rt.propHooks.selected = {
              get: function (t) {
                  var e = t.parentNode;
                  return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null;
              },
          }),
      rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
          rt.propFix[this.toLowerCase()] = this;
      }),
      it.enctype || (rt.propFix.enctype = "encoding");
  var Ae = /[\t\r\n\f]/g;
  rt.fn.extend({
      addClass: function (t) {
          var e,
              i,
              n,
              r,
              s,
              o,
              a = 0,
              l = this.length,
              h = "string" == typeof t && t;
          if (rt.isFunction(t))
              return this.each(function (e) {
                  rt(this).addClass(t.call(this, e, this.className));
              });
          if (h)
              for (e = (t || "").match(yt) || []; l > a; a++)
                  if (((i = this[a]), (n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ae, " ") : " ")))) {
                      for (s = 0; (r = e[s++]); ) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                      (o = rt.trim(n)), i.className !== o && (i.className = o);
                  }
          return this;
      },
      removeClass: function (t) {
          var e,
              i,
              n,
              r,
              s,
              o,
              a = 0,
              l = this.length,
              h = 0 === arguments.length || ("string" == typeof t && t);
          if (rt.isFunction(t))
              return this.each(function (e) {
                  rt(this).removeClass(t.call(this, e, this.className));
              });
          if (h)
              for (e = (t || "").match(yt) || []; l > a; a++)
                  if (((i = this[a]), (n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ae, " ") : "")))) {
                      for (s = 0; (r = e[s++]); ) for (; n.indexOf(" " + r + " ") >= 0; ) n = n.replace(" " + r + " ", " ");
                      (o = t ? rt.trim(n) : ""), i.className !== o && (i.className = o);
                  }
          return this;
      },
      toggleClass: function (t, e) {
          var i = typeof t;
          return "boolean" == typeof e && "string" === i
              ? e
                  ? this.addClass(t)
                  : this.removeClass(t)
              : this.each(
                    rt.isFunction(t)
                        ? function (i) {
                              rt(this).toggleClass(t.call(this, i, this.className, e), e);
                          }
                        : function () {
                              if ("string" === i) for (var e, n = 0, r = rt(this), s = t.match(yt) || []; (e = s[n++]); ) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                              else (i === Tt || "boolean" === i) && (this.className && rt._data(this, "__className__", this.className), (this.className = this.className || t === !1 ? "" : rt._data(this, "__className__") || ""));
                          }
                );
      },
      hasClass: function (t) {
          for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Ae, " ").indexOf(e) >= 0) return !0;
          return !1;
      },
  }),
      rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (
          t,
          e
      ) {
          rt.fn[e] = function (t, i) {
              return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e);
          };
      }),
      rt.fn.extend({
          hover: function (t, e) {
              return this.mouseenter(t).mouseleave(e || t);
          },
          bind: function (t, e, i) {
              return this.on(t, null, e, i);
          },
          unbind: function (t, e) {
              return this.off(t, null, e);
          },
          delegate: function (t, e, i, n) {
              return this.on(e, t, i, n);
          },
          undelegate: function (t, e, i) {
              return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i);
          },
      });
  var Oe = rt.now(),
      $e = /\?/,
      De = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (rt.parseJSON = function (e) {
      if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
      var i,
          n = null,
          r = rt.trim(e + "");
      return r &&
          !rt.trim(
              r.replace(De, function (t, e, r, s) {
                  return i && e && (n = 0), 0 === n ? t : ((i = r || e), (n += !s - !r), "");
              })
          )
          ? Function("return " + r)()
          : rt.error("Invalid JSON: " + e);
  }),
      (rt.parseXML = function (e) {
          var i, n;
          if (!e || "string" != typeof e) return null;
          try {
              t.DOMParser ? ((n = new DOMParser()), (i = n.parseFromString(e, "text/xml"))) : ((i = new ActiveXObject("Microsoft.XMLDOM")), (i.async = "false"), i.loadXML(e));
          } catch (r) {
              i = void 0;
          }
          return (i && i.documentElement && !i.getElementsByTagName("parsererror").length) || rt.error("Invalid XML: " + e), i;
      });
  var Ne,
      Re,
      Me = /#.*$/,
      Le = /([?&])_=[^&]*/,
      ze = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      je = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Fe = /^(?:GET|HEAD)$/,
      Ie = /^\/\//,
      He = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      Be = {},
      qe = {},
      We = "*/".concat("*");
  try {
      Re = location.href;
  } catch (Xe) {
      (Re = dt.createElement("a")), (Re.href = ""), (Re = Re.href);
  }
  (Ne = He.exec(Re.toLowerCase()) || []),
      rt.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
              url: Re,
              type: "GET",
              isLocal: je.test(Ne[1]),
              global: !0,
              processData: !0,
              async: !0,
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              accepts: { "*": We, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
              contents: { xml: /xml/, html: /html/, json: /json/ },
              responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
              converters: { "* text": String, "text html": !0, "text json": rt.parseJSON, "text xml": rt.parseXML },
              flatOptions: { url: !0, context: !0 },
          },
          ajaxSetup: function (t, e) {
              return e ? H(H(t, rt.ajaxSettings), e) : H(rt.ajaxSettings, t);
          },
          ajaxPrefilter: F(Be),
          ajaxTransport: F(qe),
          ajax: function (t, e) {
              function i(t, e, i, n) {
                  var r,
                      c,
                      _,
                      v,
                      w,
                      b = e;
                  2 !== y &&
                      ((y = 2),
                      a && clearTimeout(a),
                      (h = void 0),
                      (o = n || ""),
                      (x.readyState = t > 0 ? 4 : 0),
                      (r = (t >= 200 && 300 > t) || 304 === t),
                      i && (v = B(u, x, i)),
                      (v = q(u, v, x, r)),
                      r
                          ? (u.ifModified && ((w = x.getResponseHeader("Last-Modified")), w && (rt.lastModified[s] = w), (w = x.getResponseHeader("etag")), w && (rt.etag[s] = w)),
                            204 === t || "HEAD" === u.type ? (b = "nocontent") : 304 === t ? (b = "notmodified") : ((b = v.state), (c = v.data), (_ = v.error), (r = !_)))
                          : ((_ = b), (t || !b) && ((b = "error"), 0 > t && (t = 0))),
                      (x.status = t),
                      (x.statusText = (e || b) + ""),
                      r ? d.resolveWith(f, [c, b, x]) : d.rejectWith(f, [x, b, _]),
                      x.statusCode(g),
                      (g = void 0),
                      l && p.trigger(r ? "ajaxSuccess" : "ajaxError", [x, u, r ? c : _]),
                      m.fireWith(f, [x, b]),
                      l && (p.trigger("ajaxComplete", [x, u]), --rt.active || rt.event.trigger("ajaxStop")));
              }
              "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
              var n,
                  r,
                  s,
                  o,
                  a,
                  l,
                  h,
                  c,
                  u = rt.ajaxSetup({}, e),
                  f = u.context || u,
                  p = u.context && (f.nodeType || f.jquery) ? rt(f) : rt.event,
                  d = rt.Deferred(),
                  m = rt.Callbacks("once memory"),
                  g = u.statusCode || {},
                  _ = {},
                  v = {},
                  y = 0,
                  w = "canceled",
                  x = {
                      readyState: 0,
                      getResponseHeader: function (t) {
                          var e;
                          if (2 === y) {
                              if (!c) for (c = {}; (e = ze.exec(o)); ) c[e[1].toLowerCase()] = e[2];
                              e = c[t.toLowerCase()];
                          }
                          return null == e ? null : e;
                      },
                      getAllResponseHeaders: function () {
                          return 2 === y ? o : null;
                      },
                      setRequestHeader: function (t, e) {
                          var i = t.toLowerCase();
                          return y || ((t = v[i] = v[i] || t), (_[t] = e)), this;
                      },
                      overrideMimeType: function (t) {
                          return y || (u.mimeType = t), this;
                      },
                      statusCode: function (t) {
                          var e;
                          if (t)
                              if (2 > y) for (e in t) g[e] = [g[e], t[e]];
                              else x.always(t[x.status]);
                          return this;
                      },
                      abort: function (t) {
                          var e = t || w;
                          return h && h.abort(e), i(0, e), this;
                      },
                  };
              if (
                  ((d.promise(x).complete = m.add),
                  (x.success = x.done),
                  (x.error = x.fail),
                  (u.url = ((t || u.url || Re) + "").replace(Me, "").replace(Ie, Ne[1] + "//")),
                  (u.type = e.method || e.type || u.method || u.type),
                  (u.dataTypes = rt
                      .trim(u.dataType || "*")
                      .toLowerCase()
                      .match(yt) || [""]),
                  null == u.crossDomain &&
                      ((n = He.exec(u.url.toLowerCase())), (u.crossDomain = !(!n || (n[1] === Ne[1] && n[2] === Ne[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Ne[3] || ("http:" === Ne[1] ? "80" : "443")))))),
                  u.data && u.processData && "string" != typeof u.data && (u.data = rt.param(u.data, u.traditional)),
                  I(Be, u, e, x),
                  2 === y)
              )
                  return x;
              (l = u.global),
                  l && 0 === rt.active++ && rt.event.trigger("ajaxStart"),
                  (u.type = u.type.toUpperCase()),
                  (u.hasContent = !Fe.test(u.type)),
                  (s = u.url),
                  u.hasContent || (u.data && ((s = u.url += ($e.test(s) ? "&" : "?") + u.data), delete u.data), u.cache === !1 && (u.url = Le.test(s) ? s.replace(Le, "$1_=" + Oe++) : s + ($e.test(s) ? "&" : "?") + "_=" + Oe++)),
                  u.ifModified && (rt.lastModified[s] && x.setRequestHeader("If-Modified-Since", rt.lastModified[s]), rt.etag[s] && x.setRequestHeader("If-None-Match", rt.etag[s])),
                  ((u.data && u.hasContent && u.contentType !== !1) || e.contentType) && x.setRequestHeader("Content-Type", u.contentType),
                  x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + We + "; q=0.01" : "") : u.accepts["*"]);
              for (r in u.headers) x.setRequestHeader(r, u.headers[r]);
              if (u.beforeSend && (u.beforeSend.call(f, x, u) === !1 || 2 === y)) return x.abort();
              w = "abort";
              for (r in { success: 1, error: 1, complete: 1 }) x[r](u[r]);
              if ((h = I(qe, u, e, x))) {
                  (x.readyState = 1),
                      l && p.trigger("ajaxSend", [x, u]),
                      u.async &&
                          u.timeout > 0 &&
                          (a = setTimeout(function () {
                              x.abort("timeout");
                          }, u.timeout));
                  try {
                      (y = 1), h.send(_, i);
                  } catch (b) {
                      if (!(2 > y)) throw b;
                      i(-1, b);
                  }
              } else i(-1, "No Transport");
              return x;
          },
          getJSON: function (t, e, i) {
              return rt.get(t, e, i, "json");
          },
          getScript: function (t, e) {
              return rt.get(t, void 0, e, "script");
          },
      }),
      rt.each(["get", "post"], function (t, e) {
          rt[e] = function (t, i, n, r) {
              return rt.isFunction(i) && ((r = r || n), (n = i), (i = void 0)), rt.ajax({ url: t, type: e, dataType: r, data: i, success: n });
          };
      }),
      rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
          rt.fn[e] = function (t) {
              return this.on(e, t);
          };
      }),
      (rt._evalUrl = function (t) {
          return rt.ajax({ url: t, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
      }),
      rt.fn.extend({
          wrapAll: function (t) {
              if (rt.isFunction(t))
                  return this.each(function (e) {
                      rt(this).wrapAll(t.call(this, e));
                  });
              if (this[0]) {
                  var e = rt(t, this[0].ownerDocument).eq(0).clone(!0);
                  this[0].parentNode && e.insertBefore(this[0]),
                      e
                          .map(function () {
                              for (var t = this; t.firstChild && 1 === t.firstChild.nodeType; ) t = t.firstChild;
                              return t;
                          })
                          .append(this);
              }
              return this;
          },
          wrapInner: function (t) {
              return this.each(
                  rt.isFunction(t)
                      ? function (e) {
                            rt(this).wrapInner(t.call(this, e));
                        }
                      : function () {
                            var e = rt(this),
                                i = e.contents();
                            i.length ? i.wrapAll(t) : e.append(t);
                        }
              );
          },
          wrap: function (t) {
              var e = rt.isFunction(t);
              return this.each(function (i) {
                  rt(this).wrapAll(e ? t.call(this, i) : t);
              });
          },
          unwrap: function () {
              return this.parent()
                  .each(function () {
                      rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes);
                  })
                  .end();
          },
      }),
      (rt.expr.filters.hidden = function (t) {
          return (t.offsetWidth <= 0 && t.offsetHeight <= 0) || (!it.reliableHiddenOffsets() && "none" === ((t.style && t.style.display) || rt.css(t, "display")));
      }),
      (rt.expr.filters.visible = function (t) {
          return !rt.expr.filters.hidden(t);
      });
  var Ye = /%20/g,
      Ue = /\[\]$/,
      Ve = /\r?\n/g,
      Ge = /^(?:submit|button|image|reset|file)$/i,
      Qe = /^(?:input|select|textarea|keygen)/i;
  (rt.param = function (t, e) {
      var i,
          n = [],
          r = function (t, e) {
              (e = rt.isFunction(e) ? e() : null == e ? "" : e), (n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e));
          };
      if ((void 0 === e && (e = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(t) || (t.jquery && !rt.isPlainObject(t))))
          rt.each(t, function () {
              r(this.name, this.value);
          });
      else for (i in t) W(i, t[i], e, r);
      return n.join("&").replace(Ye, "+");
  }),
      rt.fn.extend({
          serialize: function () {
              return rt.param(this.serializeArray());
          },
          serializeArray: function () {
              return this.map(function () {
                  var t = rt.prop(this, "elements");
                  return t ? rt.makeArray(t) : this;
              })
                  .filter(function () {
                      var t = this.type;
                      return this.name && !rt(this).is(":disabled") && Qe.test(this.nodeName) && !Ge.test(t) && (this.checked || !Ot.test(t));
                  })
                  .map(function (t, e) {
                      var i = rt(this).val();
                      return null == i
                          ? null
                          : rt.isArray(i)
                          ? rt.map(i, function (t) {
                                return { name: e.name, value: t.replace(Ve, "\r\n") };
                            })
                          : { name: e.name, value: i.replace(Ve, "\r\n") };
                  })
                  .get();
          },
      }),
      (rt.ajaxSettings.xhr =
          void 0 !== t.ActiveXObject
              ? function () {
                    return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X()) || Y();
                }
              : X);
  var Ze = 0,
      Je = {},
      Ke = rt.ajaxSettings.xhr();
  t.ActiveXObject &&
      rt(t).on("unload", function () {
          for (var t in Je) Je[t](void 0, !0);
      }),
      (it.cors = !!Ke && "withCredentials" in Ke),
      (Ke = it.ajax = !!Ke),
      Ke &&
          rt.ajaxTransport(function (t) {
              if (!t.crossDomain || it.cors) {
                  var e;
                  return {
                      send: function (i, n) {
                          var r,
                              s = t.xhr(),
                              o = ++Ze;
                          if ((s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)) for (r in t.xhrFields) s[r] = t.xhrFields[r];
                          t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                          for (r in i) void 0 !== i[r] && s.setRequestHeader(r, i[r] + "");
                          s.send((t.hasContent && t.data) || null),
                              (e = function (i, r) {
                                  var a, l, h;
                                  if (e && (r || 4 === s.readyState))
                                      if ((delete Je[o], (e = void 0), (s.onreadystatechange = rt.noop), r)) 4 !== s.readyState && s.abort();
                                      else {
                                          (h = {}), (a = s.status), "string" == typeof s.responseText && (h.text = s.responseText);
                                          try {
                                              l = s.statusText;
                                          } catch (c) {
                                              l = "";
                                          }
                                          a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : (a = h.text ? 200 : 404);
                                      }
                                  h && n(a, l, h, s.getAllResponseHeaders());
                              }),
                              t.async ? (4 === s.readyState ? setTimeout(e) : (s.onreadystatechange = Je[o] = e)) : e();
                      },
                      abort: function () {
                          e && e(void 0, !0);
                      },
                  };
              }
          }),
      rt.ajaxSetup({
          accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
          contents: { script: /(?:java|ecma)script/ },
          converters: {
              "text script": function (t) {
                  return rt.globalEval(t), t;
              },
          },
      }),
      rt.ajaxPrefilter("script", function (t) {
          void 0 === t.cache && (t.cache = !1), t.crossDomain && ((t.type = "GET"), (t.global = !1));
      }),
      rt.ajaxTransport("script", function (t) {
          if (t.crossDomain) {
              var e,
                  i = dt.head || rt("head")[0] || dt.documentElement;
              return {
                  send: function (n, r) {
                      (e = dt.createElement("script")),
                          (e.async = !0),
                          t.scriptCharset && (e.charset = t.scriptCharset),
                          (e.src = t.url),
                          (e.onload = e.onreadystatechange = function (t, i) {
                              (i || !e.readyState || /loaded|complete/.test(e.readyState)) && ((e.onload = e.onreadystatechange = null), e.parentNode && e.parentNode.removeChild(e), (e = null), i || r(200, "success"));
                          }),
                          i.insertBefore(e, i.firstChild);
                  },
                  abort: function () {
                      e && e.onload(void 0, !0);
                  },
              };
          }
      });
  var ti = [],
      ei = /(=)\?(?=&|$)|\?\?/;
  rt.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
          var t = ti.pop() || rt.expando + "_" + Oe++;
          return (this[t] = !0), t;
      },
  }),
      rt.ajaxPrefilter("json jsonp", function (e, i, n) {
          var r,
              s,
              o,
              a = e.jsonp !== !1 && (ei.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ei.test(e.data) && "data");
          return a || "jsonp" === e.dataTypes[0]
              ? ((r = e.jsonpCallback = rt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                a ? (e[a] = e[a].replace(ei, "$1" + r)) : e.jsonp !== !1 && (e.url += ($e.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                (e.converters["script json"] = function () {
                    return o || rt.error(r + " was not called"), o[0];
                }),
                (e.dataTypes[0] = "json"),
                (s = t[r]),
                (t[r] = function () {
                    o = arguments;
                }),
                n.always(function () {
                    (t[r] = s), e[r] && ((e.jsonpCallback = i.jsonpCallback), ti.push(r)), o && rt.isFunction(s) && s(o[0]), (o = s = void 0);
                }),
                "script")
              : void 0;
      }),
      (rt.parseHTML = function (t, e, i) {
          if (!t || "string" != typeof t) return null;
          "boolean" == typeof e && ((i = e), (e = !1)), (e = e || dt);
          var n = ut.exec(t),
              r = !i && [];
          return n ? [e.createElement(n[1])] : ((n = rt.buildFragment([t], e, r)), r && r.length && rt(r).remove(), rt.merge([], n.childNodes));
      });
  var ii = rt.fn.load;
  (rt.fn.load = function (t, e, i) {
      if ("string" != typeof t && ii) return ii.apply(this, arguments);
      var n,
          r,
          s,
          o = this,
          a = t.indexOf(" ");
      return (
          a >= 0 && ((n = rt.trim(t.slice(a, t.length))), (t = t.slice(0, a))),
          rt.isFunction(e) ? ((i = e), (e = void 0)) : e && "object" == typeof e && (s = "POST"),
          o.length > 0 &&
              rt
                  .ajax({ url: t, type: s, dataType: "html", data: e })
                  .done(function (t) {
                      (r = arguments), o.html(n ? rt("<div>").append(rt.parseHTML(t)).find(n) : t);
                  })
                  .complete(
                      i &&
                          function (t, e) {
                              o.each(i, r || [t.responseText, e, t]);
                          }
                  ),
          this
      );
  }),
      (rt.expr.filters.animated = function (t) {
          return rt.grep(rt.timers, function (e) {
              return t === e.elem;
          }).length;
      });
  var ni = t.document.documentElement;
  (rt.offset = {
      setOffset: function (t, e, i) {
          var n,
              r,
              s,
              o,
              a,
              l,
              h,
              c = rt.css(t, "position"),
              u = rt(t),
              f = {};
          "static" === c && (t.style.position = "relative"),
              (a = u.offset()),
              (s = rt.css(t, "top")),
              (l = rt.css(t, "left")),
              (h = ("absolute" === c || "fixed" === c) && rt.inArray("auto", [s, l]) > -1),
              h ? ((n = u.position()), (o = n.top), (r = n.left)) : ((o = parseFloat(s) || 0), (r = parseFloat(l) || 0)),
              rt.isFunction(e) && (e = e.call(t, i, a)),
              null != e.top && (f.top = e.top - a.top + o),
              null != e.left && (f.left = e.left - a.left + r),
              "using" in e ? e.using.call(t, f) : u.css(f);
      },
  }),
      rt.fn.extend({
          offset: function (t) {
              if (arguments.length)
                  return void 0 === t
                      ? this
                      : this.each(function (e) {
                            rt.offset.setOffset(this, t, e);
                        });
              var e,
                  i,
                  n = { top: 0, left: 0 },
                  r = this[0],
                  s = r && r.ownerDocument;
              return s
                  ? ((e = s.documentElement),
                    rt.contains(e, r)
                        ? (typeof r.getBoundingClientRect !== Tt && (n = r.getBoundingClientRect()),
                          (i = U(s)),
                          { top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0) })
                        : n)
                  : void 0;
          },
          position: function () {
              if (this[0]) {
                  var t,
                      e,
                      i = { top: 0, left: 0 },
                      n = this[0];
                  return (
                      "fixed" === rt.css(n, "position")
                          ? (e = n.getBoundingClientRect())
                          : ((t = this.offsetParent()), (e = this.offset()), rt.nodeName(t[0], "html") || (i = t.offset()), (i.top += rt.css(t[0], "borderTopWidth", !0)), (i.left += rt.css(t[0], "borderLeftWidth", !0))),
                      { top: e.top - i.top - rt.css(n, "marginTop", !0), left: e.left - i.left - rt.css(n, "marginLeft", !0) }
                  );
              }
          },
          offsetParent: function () {
              return this.map(function () {
                  for (var t = this.offsetParent || ni; t && !rt.nodeName(t, "html") && "static" === rt.css(t, "position"); ) t = t.offsetParent;
                  return t || ni;
              });
          },
      }),
      rt.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, e) {
          var i = /Y/.test(e);
          rt.fn[t] = function (n) {
              return At(
                  this,
                  function (t, n, r) {
                      var s = U(t);
                      return void 0 === r ? (s ? (e in s ? s[e] : s.document.documentElement[n]) : t[n]) : void (s ? s.scrollTo(i ? rt(s).scrollLeft() : r, i ? r : rt(s).scrollTop()) : (t[n] = r));
                  },
                  t,
                  n,
                  arguments.length,
                  null
              );
          };
      }),
      rt.each(["top", "left"], function (t, e) {
          rt.cssHooks[e] = k(it.pixelPosition, function (t, i) {
              return i ? ((i = ee(t, e)), ne.test(i) ? rt(t).position()[e] + "px" : i) : void 0;
          });
      }),
      rt.each({ Height: "height", Width: "width" }, function (t, e) {
          rt.each({ padding: "inner" + t, content: e, "": "outer" + t }, function (i, n) {
              rt.fn[n] = function (n, r) {
                  var s = arguments.length && (i || "boolean" != typeof n),
                      o = i || (n === !0 || r === !0 ? "margin" : "border");
                  return At(
                      this,
                      function (e, i, n) {
                          var r;
                          return rt.isWindow(e)
                              ? e.document.documentElement["client" + t]
                              : 9 === e.nodeType
                              ? ((r = e.documentElement), Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t]))
                              : void 0 === n
                              ? rt.css(e, i, o)
                              : rt.style(e, i, n, o);
                      },
                      e,
                      s ? n : void 0,
                      s,
                      null
                  );
              };
          });
      }),
      (rt.fn.size = function () {
          return this.length;
      }),
      (rt.fn.andSelf = rt.fn.addBack),
      "function" == typeof define &&
          define.amd &&
          define("jquery", [], function () {
              return rt;
          });
  var ri = t.jQuery,
      si = t.$;
  return (
      (rt.noConflict = function (e) {
          return t.$ === rt && (t.$ = si), e && t.jQuery === rt && (t.jQuery = ri), rt;
      }),
      typeof e === Tt && (t.jQuery = t.$ = rt),
      rt
  );
});
var _extends =
      Object.assign ||
      function (t) {
          for (var e = 1; e < arguments.length; e++) {
              var i = arguments[e];
              for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
          }
          return t;
      },
  _typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
                return typeof t;
            }
          : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            };
!(function (t, e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : (t.LazyLoad = e());
})(this, function () {
  "use strict";
  var t = !("onscroll" in window) || /glebot/.test(navigator.userAgent),
      e = function (t, e) {
          t && t(e);
      },
      i = function (t) {
          return t.getBoundingClientRect().top + window.pageYOffset - t.ownerDocument.documentElement.clientTop;
      },
      n = function (t, e, n) {
          return (e === window ? window.innerHeight + window.pageYOffset : i(e) + e.offsetHeight) <= i(t) - n;
      },
      r = function (t) {
          return t.getBoundingClientRect().left + window.pageXOffset - t.ownerDocument.documentElement.clientLeft;
      },
      s = function (t, e, i) {
          var n = window.innerWidth;
          return (e === window ? n + window.pageXOffset : r(e) + n) <= r(t) - i;
      },
      o = function (t, e, n) {
          return (e === window ? window.pageYOffset : i(e)) >= i(t) + n + t.offsetHeight;
      },
      a = function (t, e, i) {
          return (e === window ? window.pageXOffset : r(e)) >= r(t) + i + t.offsetWidth;
      },
      l = function (t, e) {
          var i,
              n = "LazyLoad::Initialized",
              r = new t(e);
          try {
              i = new CustomEvent(n, { detail: { instance: r } });
          } catch (t) {
              (i = document.createEvent("CustomEvent")).initCustomEvent(n, !1, !1, { instance: r });
          }
          window.dispatchEvent(i);
      },
      h = "data-",
      c = function (t, e) {
          return t.getAttribute(h + e);
      },
      u = function (t, e, i) {
          for (var n, r = 0; (n = t.children[r]); r += 1)
              if ("SOURCE" === n.tagName) {
                  var s = c(n, i);
                  s && n.setAttribute(e, s);
              }
      },
      f = function (t, e, i) {
          i && t.setAttribute(e, i);
      },
      p = "undefined" != typeof window,
      d = p && "classList" in document.createElement("p"),
      m = function (t, e) {
          d ? t.classList.add(e) : (t.className += (t.className ? " " : "") + e);
      },
      g = function (t, e) {
          d
              ? t.classList.remove(e)
              : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
      },
      _ = function (t) {
          (this._settings = _extends(
              {},
              {
                  elements_selector: "img",
                  container: window,
                  threshold: 300,
                  throttle: 150,
                  data_src: "src",
                  data_srcset: "srcset",
                  data_sizes: "sizes",
                  class_loading: "loading",
                  class_loaded: "loaded",
                  class_error: "error",
                  class_initial: "initial",
                  skip_invisible: !0,
                  callback_load: null,
                  callback_error: null,
                  callback_set: null,
                  callback_processed: null,
                  callback_enter: null,
              },
              t
          )),
              (this._queryOriginNode = this._settings.container === window ? document : this._settings.container),
              (this._previousLoopTime = 0),
              (this._loopTimeout = null),
              (this._boundHandleScroll = this.handleScroll.bind(this)),
              (this._isFirstLoop = !0),
              window.addEventListener("resize", this._boundHandleScroll),
              this.update();
      };
  _.prototype = {
      _reveal: function (t) {
          var i = this._settings,
              n = function s() {
                  i && (t.removeEventListener("load", r), t.removeEventListener("error", s), g(t, i.class_loading), m(t, i.class_error), e(i.callback_error, t));
              },
              r = function o() {
                  i && (g(t, i.class_loading), m(t, i.class_loaded), t.removeEventListener("load", o), t.removeEventListener("error", n), e(i.callback_load, t));
              };
          e(i.callback_enter, t),
              -1 < ["IMG", "IFRAME", "VIDEO"].indexOf(t.tagName) && (t.addEventListener("load", r), t.addEventListener("error", n), m(t, i.class_loading)),
              (function (t, e) {
                  var i = e.data_sizes,
                      n = e.data_srcset,
                      r = e.data_src,
                      s = c(t, r),
                      o = t.tagName;
                  if ("IMG" === o) {
                      var a = t.parentNode;
                      a && "PICTURE" === a.tagName && u(a, "srcset", n);
                      var l = c(t, i);
                      f(t, "sizes", l);
                      var h = c(t, n);
                      return f(t, "srcset", h), f(t, "src", s);
                  }
                  return "IFRAME" !== o ? ("VIDEO" === o ? (u(t, "src", r), f(t, "src", s)) : s && (t.style.backgroundImage = 'url("' + s + '")')) : void f(t, "src", s);
              })(t, i),
              e(i.callback_set, t);
      },
      _loopThroughElements: function (i) {
          var r,
              l,
              c,
              u,
              f,
              p = this._settings,
              d = this._elements,
              g = d ? d.length : 0,
              _ = void 0,
              v = [],
              y = this._isFirstLoop;
          for (_ = 0; _ < g; _++) {
              var w = d[_];
              (p.skip_invisible && null === w.offsetParent) ||
                  (!t && !i && ((c = w), (u = p.container), (f = p.threshold), n(c, u, f) || o(c, u, f) || s(c, u, f) || a(c, u, f))) ||
                  (y && m(w, p.class_initial), this._reveal(w), v.push(_), (r = "was-processed"), (l = !0), w.setAttribute(h + r, l));
          }
          for (; v.length; ) d.splice(v.pop(), 1), e(p.callback_processed, d.length);
          0 === g && this._stopScrollHandler(), y && (this._isFirstLoop = !1);
      },
      _purgeElements: function () {
          var t = this._elements,
              e = t.length,
              i = void 0,
              n = [];
          for (i = 0; i < e; i++) {
              var r = t[i];
              c(r, "was-processed") && n.push(i);
          }
          for (; 0 < n.length; ) t.splice(n.pop(), 1);
      },
      _startScrollHandler: function () {
          this._isHandlingScroll || ((this._isHandlingScroll = !0), this._settings.container.addEventListener("scroll", this._boundHandleScroll));
      },
      _stopScrollHandler: function () {
          this._isHandlingScroll && ((this._isHandlingScroll = !1), this._settings.container.removeEventListener("scroll", this._boundHandleScroll));
      },
      handleScroll: function () {
          var t = this._settings.throttle;
          if (0 !== t) {
              var e = Date.now(),
                  i = t - (e - this._previousLoopTime);
              i <= 0 || t < i
                  ? (this._loopTimeout && (clearTimeout(this._loopTimeout), (this._loopTimeout = null)), (this._previousLoopTime = e), this._loopThroughElements())
                  : this._loopTimeout ||
                    (this._loopTimeout = setTimeout(
                        function () {
                            (this._previousLoopTime = Date.now()), (this._loopTimeout = null), this._loopThroughElements();
                        }.bind(this),
                        i
                    ));
          } else this._loopThroughElements();
      },
      loadAll: function () {
          this._loopThroughElements(!0);
      },
      update: function () {
          (this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector))), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler();
      },
      destroy: function () {
          window.removeEventListener("resize", this._boundHandleScroll),
              this._loopTimeout && (clearTimeout(this._loopTimeout), (this._loopTimeout = null)),
              this._stopScrollHandler(),
              (this._elements = null),
              (this._queryOriginNode = null),
              (this._settings = null);
      },
  };
  var v = window.lazyLoadOptions;
  return (
      p &&
          v &&
          (function (t, e) {
              var i = e.length;
              if (i) for (var n = 0; n < i; n++) l(t, e[n]);
              else l(t, e);
          })(_, v),
      _
  );
}),
  (function (t, e) {
      if ("function" == typeof define && define.amd) define(["module", "exports"], e);
      else if ("undefined" != typeof exports) e(module, exports);
      else {
          var i = { exports: {} };
          e(i, i.exports), (t.WOW = i.exports);
      }
  })(this, function (t, e) {
      "use strict";
      function i(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function n(t, e) {
          return e.indexOf(t) >= 0;
      }
      function r(t, e) {
          for (var i in e)
              if (null == t[i]) {
                  var n = e[i];
                  t[i] = n;
              }
          return t;
      }
      function s(t) {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t);
      }
      function o(t) {
          var e = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
              i = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
              n = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
              r = void 0;
          return (
              null != document.createEvent ? ((r = document.createEvent("CustomEvent")), r.initCustomEvent(t, e, i, n)) : null != document.createEventObject ? ((r = document.createEventObject()), (r.eventType = t)) : (r.eventName = t), r
          );
      }
      function a(t, e) {
          null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) && t["on" + e]();
      }
      function l(t, e, i) {
          null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : (t[e] = i);
      }
      function h(t, e, i) {
          null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e];
      }
      function c() {
          return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
      }
      Object.defineProperty(e, "__esModule", { value: !0 });
      var u,
          f,
          p = (function () {
              function t(t, e) {
                  for (var i = 0; i < e.length; i++) {
                      var n = e[i];
                      (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                  }
              }
              return function (e, i, n) {
                  return i && t(e.prototype, i), n && t(e, n), e;
              };
          })(),
          d =
              window.WeakMap ||
              window.MozWeakMap ||
              (function () {
                  function t() {
                      i(this, t), (this.keys = []), (this.values = []);
                  }
                  return (
                      p(t, [
                          {
                              key: "get",
                              value: function (t) {
                                  for (var e = 0; e < this.keys.length; e++) {
                                      var i = this.keys[e];
                                      if (i === t) return this.values[e];
                                  }
                              },
                          },
                          {
                              key: "set",
                              value: function (t, e) {
                                  for (var i = 0; i < this.keys.length; i++) {
                                      var n = this.keys[i];
                                      if (n === t) return (this.values[i] = e), this;
                                  }
                                  return this.keys.push(t), this.values.push(e), this;
                              },
                          },
                      ]),
                      t
                  );
              })(),
          m =
              window.MutationObserver ||
              window.WebkitMutationObserver ||
              window.MozMutationObserver ||
              ((f = u = (function () {
                  function t() {
                      i(this, t),
                          "undefined" != typeof console &&
                              null !== console &&
                              (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."));
                  }
                  return p(t, [{ key: "observe", value: function () {} }]), t;
              })()),
              (u.notSupported = !0),
              f),
          g =
              window.getComputedStyle ||
              function (t) {
                  var e = /(\-([a-z]){1})/g;
                  return {
                      getPropertyValue: function (i) {
                          "float" === i && (i = "styleFloat"),
                              e.test(i) &&
                                  i.replace(e, function (t, e) {
                                      return e.toUpperCase();
                                  });
                          var n = t.currentStyle;
                          return (null != n ? n[i] : void 0) || null;
                      },
                  };
              },
          _ = (function () {
              function t() {
                  var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                  i(this, t),
                      (this.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null, scrollContainer: null, resetAnimation: !0 }),
                      (this.animate = (function () {
                          return "requestAnimationFrame" in window
                              ? function (t) {
                                    return window.requestAnimationFrame(t);
                                }
                              : function (t) {
                                    return t();
                                };
                      })()),
                      (this.vendors = ["moz", "webkit"]),
                      (this.start = this.start.bind(this)),
                      (this.resetAnimation = this.resetAnimation.bind(this)),
                      (this.scrollHandler = this.scrollHandler.bind(this)),
                      (this.scrollCallback = this.scrollCallback.bind(this)),
                      (this.scrolled = !0),
                      (this.config = r(e, this.defaults)),
                      null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)),
                      (this.animationNameCache = new d()),
                      (this.wowEvent = o(this.config.boxClass));
              }
              return (
                  p(t, [
                      {
                          key: "init",
                          value: function () {
                              (this.element = window.document.documentElement), n(document.readyState, ["interactive", "complete"]) ? this.start() : l(document, "DOMContentLoaded", this.start), (this.finished = []);
                          },
                      },
                      {
                          key: "start",
                          value: function () {
                              var t = this;
                              if (((this.stopped = !1), (this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass))), (this.all = this.boxes.slice(0)), this.boxes.length))
                                  if (this.disabled()) this.resetStyle();
                                  else
                                      for (var e = 0; e < this.boxes.length; e++) {
                                          var i = this.boxes[e];
                                          this.applyStyle(i, !0);
                                      }
                              if (
                                  (this.disabled() || (l(this.config.scrollContainer || window, "scroll", this.scrollHandler), l(window, "resize", this.scrollHandler), (this.interval = setInterval(this.scrollCallback, 50))),
                                  this.config.live)
                              ) {
                                  var n = new m(function (e) {
                                      for (var i = 0; i < e.length; i++)
                                          for (var n = e[i], r = 0; r < n.addedNodes.length; r++) {
                                              var s = n.addedNodes[r];
                                              t.doSync(s);
                                          }
                                  });
                                  n.observe(document.body, { childList: !0, subtree: !0 });
                              }
                          },
                      },
                      {
                          key: "stop",
                          value: function () {
                              (this.stopped = !0), h(this.config.scrollContainer || window, "scroll", this.scrollHandler), h(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval);
                          },
                      },
                      {
                          key: "sync",
                          value: function () {
                              m.notSupported && this.doSync(this.element);
                          },
                      },
                      {
                          key: "doSync",
                          value: function (t) {
                              if ((("undefined" != typeof t && null !== t) || (t = this.element), 1 === t.nodeType)) {
                                  t = t.parentNode || t;
                                  for (var e = t.querySelectorAll("." + this.config.boxClass), i = 0; i < e.length; i++) {
                                      var r = e[i];
                                      n(r, this.all) || (this.boxes.push(r), this.all.push(r), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(r, !0), (this.scrolled = !0));
                                  }
                              }
                          },
                      },
                      {
                          key: "show",
                          value: function (t) {
                              return (
                                  this.applyStyle(t),
                                  (t.className = t.className + " " + this.config.animateClass),
                                  null != this.config.callback && this.config.callback(t),
                                  a(t, this.wowEvent),
                                  this.config.resetAnimation &&
                                      (l(t, "animationend", this.resetAnimation), l(t, "oanimationend", this.resetAnimation), l(t, "webkitAnimationEnd", this.resetAnimation), l(t, "MSAnimationEnd", this.resetAnimation)),
                                  t
                              );
                          },
                      },
                      {
                          key: "applyStyle",
                          value: function (t, e) {
                              var i = this,
                                  n = t.getAttribute("data-wow-duration"),
                                  r = t.getAttribute("data-wow-delay"),
                                  s = t.getAttribute("data-wow-iteration");
                              return this.animate(function () {
                                  return i.customStyle(t, e, n, r, s);
                              });
                          },
                      },
                      {
                          key: "resetStyle",
                          value: function () {
                              for (var t = 0; t < this.boxes.length; t++) {
                                  var e = this.boxes[t];
                                  e.style.visibility = "visible";
                              }
                          },
                      },
                      {
                          key: "resetAnimation",
                          value: function (t) {
                              if (t.type.toLowerCase().indexOf("animationend") >= 0) {
                                  var e = t.target || t.srcElement;
                                  e.className = e.className.replace(this.config.animateClass, "").trim();
                              }
                          },
                      },
                      {
                          key: "customStyle",
                          value: function (t, e, i, n, r) {
                              return (
                                  e && this.cacheAnimationName(t),
                                  (t.style.visibility = e ? "hidden" : "visible"),
                                  i && this.vendorSet(t.style, { animationDuration: i }),
                                  n && this.vendorSet(t.style, { animationDelay: n }),
                                  r && this.vendorSet(t.style, { animationIterationCount: r }),
                                  this.vendorSet(t.style, { animationName: e ? "none" : this.cachedAnimationName(t) }),
                                  t
                              );
                          },
                      },
                      {
                          key: "vendorSet",
                          value: function (t, e) {
                              for (var i in e)
                                  if (e.hasOwnProperty(i)) {
                                      var n = e[i];
                                      t["" + i] = n;
                                      for (var r = 0; r < this.vendors.length; r++) {
                                          var s = this.vendors[r];
                                          t["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = n;
                                      }
                                  }
                          },
                      },
                      {
                          key: "vendorCSS",
                          value: function (t, e) {
                              for (var i = g(t), n = i.getPropertyCSSValue(e), r = 0; r < this.vendors.length; r++) {
                                  var s = this.vendors[r];
                                  n = n || i.getPropertyCSSValue("-" + s + "-" + e);
                              }
                              return n;
                          },
                      },
                      {
                          key: "animationName",
                          value: function (t) {
                              var e = void 0;
                              try {
                                  e = this.vendorCSS(t, "animation-name").cssText;
                              } catch (i) {
                                  e = g(t).getPropertyValue("animation-name");
                              }
                              return "none" === e ? "" : e;
                          },
                      },
                      {
                          key: "cacheAnimationName",
                          value: function (t) {
                              return this.animationNameCache.set(t, this.animationName(t));
                          },
                      },
                      {
                          key: "cachedAnimationName",
                          value: function (t) {
                              return this.animationNameCache.get(t);
                          },
                      },
                      {
                          key: "scrollHandler",
                          value: function () {
                              this.scrolled = !0;
                          },
                      },
                      {
                          key: "scrollCallback",
                          value: function () {
                              if (this.scrolled) {
                                  this.scrolled = !1;
                                  for (var t = [], e = 0; e < this.boxes.length; e++) {
                                      var i = this.boxes[e];
                                      if (i) {
                                          if (this.isVisible(i)) {
                                              this.show(i);
                                              continue;
                                          }
                                          t.push(i);
                                      }
                                  }
                                  (this.boxes = t), this.boxes.length || this.config.live || this.stop();
                              }
                          },
                      },
                      {
                          key: "offsetTop",
                          value: function (t) {
                              for (; void 0 === t.offsetTop; ) t = t.parentNode;
                              for (var e = t.offsetTop; t.offsetParent; ) (t = t.offsetParent), (e += t.offsetTop);
                              return e;
                          },
                      },
                      {
                          key: "isVisible",
                          value: function (t) {
                              var e = t.getAttribute("data-wow-offset") || this.config.offset,
                                  i = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset,
                                  n = i + Math.min(this.element.clientHeight, c()) - e,
                                  r = this.offsetTop(t),
                                  s = r + t.clientHeight;
                              return r <= n && s >= i;
                          },
                      },
                      {
                          key: "disabled",
                          value: function () {
                              return !this.config.mobile && s(navigator.userAgent);
                          },
                      },
                  ]),
                  t
              );
          })();
      (e["default"] = _), (t.exports = e["default"]);
  }),
  (function (t, e, i, n) {
      function r(e, i) {
          (this.settings = null),
              (this.options = t.extend({}, r.Defaults, i)),
              (this.$element = t(e)),
              (this._handlers = {}),
              (this._plugins = {}),
              (this._supress = {}),
              (this._current = null),
              (this._speed = null),
              (this._coordinates = []),
              (this._breakpoint = null),
              (this._width = null),
              (this._items = []),
              (this._clones = []),
              (this._mergers = []),
              (this._widths = []),
              (this._invalidated = {}),
              (this._pipe = []),
              (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
              (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
              t.each(
                  ["onResize", "onThrottledResize"],
                  t.proxy(function (e, i) {
                      this._handlers[i] = t.proxy(this[i], this);
                  }, this)
              ),
              t.each(
                  r.Plugins,
                  t.proxy(function (t, e) {
                      this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
                  }, this)
              ),
              t.each(
                  r.Workers,
                  t.proxy(function (e, i) {
                      this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
                  }, this)
              ),
              this.setup(),
              this.initialize();
      }
      (r.Defaults = {
          items: 3,
          loop: !1,
          center: !1,
          rewind: !1,
          mouseDrag: !0,
          touchDrag: !0,
          pullDrag: !0,
          freeDrag: !1,
          margin: 0,
          stagePadding: 0,
          merge: !1,
          mergeFit: !0,
          autoWidth: !1,
          startPosition: 0,
          rtl: !1,
          smartSpeed: 250,
          fluidSpeed: !1,
          dragEndSpeed: !1,
          responsive: {},
          responsiveRefreshRate: 200,
          responsiveBaseElement: e,
          fallbackEasing: "swing",
          info: !1,
          nestedItemSelector: !1,
          itemElement: "div",
          stageElement: "div",
          refreshClass: "owl-refresh",
          loadedClass: "owl-loaded",
          loadingClass: "owl-loading",
          rtlClass: "owl-rtl",
          responsiveClass: "owl-responsive",
          dragClass: "owl-drag",
          itemClass: "owl-item",
          stageClass: "owl-stage",
          stageOuterClass: "owl-stage-outer",
          grabClass: "owl-grab",
      }),
          (r.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
          (r.Type = { Event: "event", State: "state" }),
          (r.Plugins = {}),
          (r.Workers = [
              {
                  filter: ["width", "settings"],
                  run: function () {
                      this._width = this.$element.width();
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function (t) {
                      t.current = this._items && this._items[this.relative(this._current)];
                  },
              },
              {
                  filter: ["items", "settings"],
                  run: function () {
                      this.$stage.children(".cloned").remove();
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function (t) {
                      var e = this.settings.margin || "",
                          i = !this.settings.autoWidth,
                          n = this.settings.rtl,
                          r = { width: "auto", "margin-left": n ? e : "", "margin-right": n ? "" : e };
                      !i && this.$stage.children().css(r), (t.css = r);
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function (t) {
                      var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                          i = null,
                          n = this._items.length,
                          r = !this.settings.autoWidth,
                          s = [];
                      for (t.items = { merge: !1, width: e }; n--; )
                          (i = this._mergers[n]), (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i), (t.items.merge = i > 1 || t.items.merge), (s[n] = r ? e * i : this._items[n].width());
                      this._widths = s;
                  },
              },
              {
                  filter: ["items", "settings"],
                  run: function () {
                      var e = [],
                          i = this._items,
                          n = this.settings,
                          r = Math.max(2 * n.items, 4),
                          s = 2 * Math.ceil(i.length / 2),
                          o = n.loop && i.length ? (n.rewind ? r : Math.max(r, s)) : 0,
                          a = "",
                          l = "";
                      for (o /= 2; o--; ) e.push(this.normalize(e.length / 2, !0)), (a += i[e[e.length - 1]][0].outerHTML), e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), (l = i[e[e.length - 1]][0].outerHTML + l);
                      (this._clones = e), t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage);
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function () {
                      for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, r = 0, s = []; ++i < e; )
                          (n = s[i - 1] || 0), (r = this._widths[this.relative(i)] + this.settings.margin), s.push(n + r * t);
                      this._coordinates = s;
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function () {
                      var t = this.settings.stagePadding,
                          e = this._coordinates,
                          i = { width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t, "padding-left": t || "", "padding-right": t || "" };
                      this.$stage.css(i);
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function (t) {
                      var e = this._coordinates.length,
                          i = !this.settings.autoWidth,
                          n = this.$stage.children();
                      if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), n.eq(e).css(t.css);
                      else i && ((t.css.width = t.items.width), n.css(t.css));
                  },
              },
              {
                  filter: ["items"],
                  run: function () {
                      this._coordinates.length < 1 && this.$stage.removeAttr("style");
                  },
              },
              {
                  filter: ["width", "items", "settings"],
                  run: function (t) {
                      (t.current = t.current ? this.$stage.children().index(t.current) : 0), (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))), this.reset(t.current);
                  },
              },
              {
                  filter: ["position"],
                  run: function () {
                      this.animate(this.coordinates(this._current));
                  },
              },
              {
                  filter: ["width", "position", "items", "settings"],
                  run: function () {
                      var t,
                          e,
                          i,
                          n,
                          r = this.settings.rtl ? 1 : -1,
                          s = 2 * this.settings.stagePadding,
                          o = this.coordinates(this.current()) + s,
                          a = o + this.width() * r,
                          l = [];
                      for (i = 0, n = this._coordinates.length; i < n; i++)
                          (t = this._coordinates[i - 1] || 0), (e = Math.abs(this._coordinates[i]) + s * r), ((this.op(t, "<=", o) && this.op(t, ">", a)) || (this.op(e, "<", o) && this.op(e, ">", a))) && l.push(i);
                      this.$stage.children(".active").removeClass("active"),
                          this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"),
                          this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"));
                  },
              },
          ]),
          (r.prototype.initialize = function () {
              if ((this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading"))) {
                  var e, i, r;
                  (e = this.$element.find("img")), (i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n), (r = this.$element.children(i).width()), e.length && r <= 0 && this.preloadAutoWidthImages(e);
              }
              this.$element.addClass(this.options.loadingClass),
                  (this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
                  this.$element.append(this.$stage.parent()),
                  this.replace(this.$element.children().not(this.$stage.parent())),
                  this.$element.is(":visible") ? this.refresh() : this.invalidate("width"),
                  this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),
                  this.registerEventHandlers(),
                  this.leave("initializing"),
                  this.trigger("initialized");
          }),
          (r.prototype.setup = function () {
              var e = this.viewport(),
                  i = this.options.responsive,
                  n = -1,
                  r = null;
              i
                  ? (t.each(i, function (t) {
                        t <= e && t > n && (n = Number(t));
                    }),
                    (r = t.extend({}, this.options, i[n])),
                    "function" == typeof r.stagePadding && (r.stagePadding = r.stagePadding()),
                    delete r.responsive,
                    r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n)))
                  : (r = t.extend({}, this.options)),
                  this.trigger("change", { property: { name: "settings", value: r } }),
                  (this._breakpoint = n),
                  (this.settings = r),
                  this.invalidate("settings"),
                  this.trigger("changed", { property: { name: "settings", value: this.settings } });
          }),
          (r.prototype.optionsLogic = function () {
              this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
          }),
          (r.prototype.prepare = function (e) {
              var i = this.trigger("prepare", { content: e });
              return (
                  i.data ||
                      (i.data = t("<" + this.settings.itemElement + "/>")
                          .addClass(this.options.itemClass)
                          .append(e)),
                  this.trigger("prepared", { content: i.data }),
                  i.data
              );
          }),
          (r.prototype.update = function () {
              for (
                  var e = 0,
                      i = this._pipe.length,
                      n = t.proxy(function (t) {
                          return this[t];
                      }, this._invalidated),
                      r = {};
                  e < i;

              )
                  (this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(r), e++;
              (this._invalidated = {}), !this.is("valid") && this.enter("valid");
          }),
          (r.prototype.width = function (t) {
              switch ((t = t || r.Width.Default)) {
                  case r.Width.Inner:
                  case r.Width.Outer:
                      return this._width;
                  default:
                      return this._width - 2 * this.settings.stagePadding + this.settings.margin;
              }
          }),
          (r.prototype.refresh = function () {
              this.enter("refreshing"),
                  this.trigger("refresh"),
                  this.setup(),
                  this.optionsLogic(),
                  this.$element.addClass(this.options.refreshClass),
                  this.update(),
                  this.$element.removeClass(this.options.refreshClass),
                  this.leave("refreshing"),
                  this.trigger("refreshed");
          }),
          (r.prototype.onThrottledResize = function () {
              e.clearTimeout(this.resizeTimer), (this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
          }),
          (r.prototype.onResize = function () {
              return (
                  !!this._items.length &&
                  this._width !== this.$element.width() &&
                  !!this.$element.is(":visible") &&
                  (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
              );
          }),
          (r.prototype.registerEventHandlers = function () {
              t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)),
                  this.settings.responsive !== !1 && this.on(e, "resize", this._handlers.onThrottledResize),
                  this.settings.mouseDrag &&
                      (this.$element.addClass(this.options.dragClass),
                      this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)),
                      this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                          return !1;
                      })),
                  this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)));
          }),
          (r.prototype.onDragStart = function (e) {
              var n = null;
              3 !== e.which &&
                  (t.support.transform
                      ? ((n = this.$stage
                            .css("transform")
                            .replace(/.*\(|\)| /g, "")
                            .split(",")),
                        (n = { x: n[16 === n.length ? 12 : 4], y: n[16 === n.length ? 13 : 5] }))
                      : ((n = this.$stage.position()), (n = { x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left, y: n.top })),
                  this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")),
                  this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type),
                  this.speed(0),
                  (this._drag.time = new Date().getTime()),
                  (this._drag.target = t(e.target)),
                  (this._drag.stage.start = n),
                  (this._drag.stage.current = n),
                  (this._drag.pointer = this.pointer(e)),
                  t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)),
                  t(i).one(
                      "mousemove.owl.core touchmove.owl.core",
                      t.proxy(function (e) {
                          var n = this.difference(this._drag.pointer, this.pointer(e));
                          t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), (Math.abs(n.x) < Math.abs(n.y) && this.is("valid")) || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                      }, this)
                  ));
          }),
          (r.prototype.onDragMove = function (t) {
              var e = null,
                  i = null,
                  n = null,
                  r = this.difference(this._drag.pointer, this.pointer(t)),
                  s = this.difference(this._drag.stage.start, r);
              this.is("dragging") &&
                  (t.preventDefault(),
                  this.settings.loop
                      ? ((e = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - e), (s.x = ((((s.x - e) % i) + i) % i) + e))
                      : ((e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                        (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                        (n = this.settings.pullDrag ? (-1 * r.x) / 5 : 0),
                        (s.x = Math.max(Math.min(s.x, e + n), i + n))),
                  (this._drag.stage.current = s),
                  this.animate(s.x));
          }),
          (r.prototype.onDragEnd = function (e) {
              var n = this.difference(this._drag.pointer, this.pointer(e)),
                  r = this._drag.stage.current,
                  s = (n.x > 0) ^ this.settings.rtl ? "left" : "right";
              t(i).off(".owl.core"),
                  this.$element.removeClass(this.options.grabClass),
                  ((0 !== n.x && this.is("dragging")) || !this.is("valid")) &&
                      (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                      this.current(this.closest(r.x, 0 !== n.x ? s : this._drag.direction)),
                      this.invalidate("position"),
                      this.update(),
                      (this._drag.direction = s),
                      (Math.abs(n.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
                          this._drag.target.one("click.owl.core", function () {
                              return !1;
                          })),
                  this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
          }),
          (r.prototype.closest = function (e, i) {
              var n = -1,
                  r = 30,
                  s = this.width(),
                  o = this.coordinates();
              return (
                  this.settings.freeDrag ||
                      t.each(
                          o,
                          t.proxy(function (t, a) {
                              return (
                                  "left" === i && e > a - r && e < a + r
                                      ? (n = t)
                                      : "right" === i && e > a - s - r && e < a - s + r
                                      ? (n = t + 1)
                                      : this.op(e, "<", a) && this.op(e, ">", o[t + 1] || a - s) && (n = "left" === i ? t + 1 : t),
                                  n === -1
                              );
                          }, this)
                      ),
                  this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? (n = e = this.minimum()) : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())),
                  n
              );
          }),
          (r.prototype.animate = function (e) {
              var i = this.speed() > 0;
              this.is("animating") && this.onTransitionEnd(),
                  i && (this.enter("animating"), this.trigger("translate")),
                  t.support.transform3d && t.support.transition
                      ? this.$stage.css({ transform: "translate3d(" + e + "px,0px,0px)", transition: this.speed() / 1e3 + "s" })
                      : i
                      ? this.$stage.animate({ left: e + "px" }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this))
                      : this.$stage.css({ left: e + "px" });
          }),
          (r.prototype.is = function (t) {
              return this._states.current[t] && this._states.current[t] > 0;
          }),
          (r.prototype.current = function (t) {
              if (t === n) return this._current;
              if (0 === this._items.length) return n;
              if (((t = this.normalize(t)), this._current !== t)) {
                  var e = this.trigger("change", { property: { name: "position", value: t } });
                  e.data !== n && (t = this.normalize(e.data)), (this._current = t), this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
              }
              return this._current;
          }),
          (r.prototype.invalidate = function (e) {
              return (
                  "string" === t.type(e) && ((this._invalidated[e] = !0), this.is("valid") && this.leave("valid")),
                  t.map(this._invalidated, function (t, e) {
                      return e;
                  })
              );
          }),
          (r.prototype.reset = function (t) {
              (t = this.normalize(t)), t !== n && ((this._speed = 0), (this._current = t), this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]));
          }),
          (r.prototype.normalize = function (t, e) {
              var i = this._items.length,
                  r = e ? 0 : this._clones.length;
              return !this.isNumeric(t) || i < 1 ? (t = n) : (t < 0 || t >= i + r) && (t = ((((t - r / 2) % i) + i) % i) + r / 2), t;
          }),
          (r.prototype.relative = function (t) {
              return (t -= this._clones.length / 2), this.normalize(t, !0);
          }),
          (r.prototype.maximum = function (t) {
              var e,
                  i,
                  n,
                  r = this.settings,
                  s = this._coordinates.length;
              if (r.loop) s = this._clones.length / 2 + this._items.length - 1;
              else if (r.autoWidth || r.merge) {
                  for (e = this._items.length, i = this._items[--e].width(), n = this.$element.width(); e-- && ((i += this._items[e].width() + this.settings.margin), !(i > n)); );
                  s = e + 1;
              } else s = r.center ? this._items.length - 1 : this._items.length - r.items;
              return t && (s -= this._clones.length / 2), Math.max(s, 0);
          }),
          (r.prototype.minimum = function (t) {
              return t ? 0 : this._clones.length / 2;
          }),
          (r.prototype.items = function (t) {
              return t === n ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t]);
          }),
          (r.prototype.mergers = function (t) {
              return t === n ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t]);
          }),
          (r.prototype.clones = function (e) {
              var i = this._clones.length / 2,
                  r = i + this._items.length,
                  s = function (t) {
                      return t % 2 === 0 ? r + t / 2 : i - (t + 1) / 2;
                  };
              return e === n
                  ? t.map(this._clones, function (t, e) {
                        return s(e);
                    })
                  : t.map(this._clones, function (t, i) {
                        return t === e ? s(i) : null;
                    });
          }),
          (r.prototype.speed = function (t) {
              return t !== n && (this._speed = t), this._speed;
          }),
          (r.prototype.coordinates = function (e) {
              var i,
                  r = 1,
                  s = e - 1;
              return e === n
                  ? t.map(
                        this._coordinates,
                        t.proxy(function (t, e) {
                            return this.coordinates(e);
                        }, this)
                    )
                  : (this.settings.center ? (this.settings.rtl && ((r = -1), (s = e + 1)), (i = this._coordinates[e]), (i += ((this.width() - i + (this._coordinates[s] || 0)) / 2) * r)) : (i = this._coordinates[s] || 0),
                    (i = Math.ceil(i)));
          }),
          (r.prototype.duration = function (t, e, i) {
              return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
          }),
          (r.prototype.to = function (t, e) {
              var i = this.current(),
                  n = null,
                  r = t - this.relative(i),
                  s = (r > 0) - (r < 0),
                  o = this._items.length,
                  a = this.minimum(),
                  l = this.maximum();
              this.settings.loop
                  ? (!this.settings.rewind && Math.abs(r) > o / 2 && (r += s * -1 * o), (t = i + r), (n = ((((t - a) % o) + o) % o) + a), n !== t && n - r <= l && n - r > 0 && ((i = n - r), (t = n), this.reset(i)))
                  : this.settings.rewind
                  ? ((l += 1), (t = ((t % l) + l) % l))
                  : (t = Math.max(a, Math.min(l, t))),
                  this.speed(this.duration(i, t, e)),
                  this.current(t),
                  this.$element.is(":visible") && this.update();
          }),
          (r.prototype.next = function (t) {
              (t = t || !1), this.to(this.relative(this.current()) + 1, t);
          }),
          (r.prototype.prev = function (t) {
              (t = t || !1), this.to(this.relative(this.current()) - 1, t);
          }),
          (r.prototype.onTransitionEnd = function (t) {
              return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"));
          }),
          (r.prototype.viewport = function () {
              var n;
              if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
              else if (e.innerWidth) n = e.innerWidth;
              else {
                  if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
                  n = i.documentElement.clientWidth;
              }
              return n;
          }),
          (r.prototype.replace = function (e) {
              this.$stage.empty(),
                  (this._items = []),
                  e && (e = e instanceof jQuery ? e : t(e)),
                  this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)),
                  e
                      .filter(function () {
                          return 1 === this.nodeType;
                      })
                      .each(
                          t.proxy(function (t, e) {
                              (e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                          }, this)
                      ),
                  this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                  this.invalidate("items");
          }),
          (r.prototype.add = function (e, i) {
              var r = this.relative(this._current);
              (i = i === n ? this._items.length : this.normalize(i, !0)),
                  (e = e instanceof jQuery ? e : t(e)),
                  this.trigger("add", { content: e, position: i }),
                  (e = this.prepare(e)),
                  0 === this._items.length || i === this._items.length
                      ? (0 === this._items.length && this.$stage.append(e),
                        0 !== this._items.length && this._items[i - 1].after(e),
                        this._items.push(e),
                        this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                      : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                  this._items[r] && this.reset(this._items[r].index()),
                  this.invalidate("items"),
                  this.trigger("added", { content: e, position: i });
          }),
          (r.prototype.remove = function (t) {
              (t = this.normalize(t, !0)),
                  t !== n &&
                      (this.trigger("remove", { content: this._items[t], position: t }),
                      this._items[t].remove(),
                      this._items.splice(t, 1),
                      this._mergers.splice(t, 1),
                      this.invalidate("items"),
                      this.trigger("removed", { content: null, position: t }));
          }),
          (r.prototype.preloadAutoWidthImages = function (e) {
              e.each(
                  t.proxy(function (e, i) {
                      this.enter("pre-loading"),
                          (i = t(i)),
                          t(new Image())
                              .one(
                                  "load",
                                  t.proxy(function (t) {
                                      i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                                  }, this)
                              )
                              .attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"));
                  }, this)
              );
          }),
          (r.prototype.destroy = function () {
              this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), this.settings.responsive !== !1 && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
              for (var n in this._plugins) this._plugins[n].destroy();
              this.$stage.children(".cloned").remove(),
                  this.$stage.unwrap(),
                  this.$stage.children().contents().unwrap(),
                  this.$stage.children().unwrap(),
                  this.$element
                      .removeClass(this.options.refreshClass)
                      .removeClass(this.options.loadingClass)
                      .removeClass(this.options.loadedClass)
                      .removeClass(this.options.rtlClass)
                      .removeClass(this.options.dragClass)
                      .removeClass(this.options.grabClass)
                      .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                      .removeData("owl.carousel");
          }),
          (r.prototype.op = function (t, e, i) {
              var n = this.settings.rtl;
              switch (e) {
                  case "<":
                      return n ? t > i : t < i;
                  case ">":
                      return n ? t < i : t > i;
                  case ">=":
                      return n ? t <= i : t >= i;
                  case "<=":
                      return n ? t >= i : t <= i;
              }
          }),
          (r.prototype.on = function (t, e, i, n) {
              t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i);
          }),
          (r.prototype.off = function (t, e, i, n) {
              t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i);
          }),
          (r.prototype.trigger = function (e, i, n, s, o) {
              var a = { item: { count: this._items.length, index: this.current() } },
                  l = t.camelCase(
                      t
                          .grep(["on", e, n], function (t) {
                              return t;
                          })
                          .join("-")
                          .toLowerCase()
                  ),
                  h = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({ relatedTarget: this }, a, i));
              return (
                  this._supress[e] ||
                      (t.each(this._plugins, function (t, e) {
                          e.onTrigger && e.onTrigger(h);
                      }),
                      this.register({ type: r.Type.Event, name: e }),
                      this.$element.trigger(h),
                      this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, h)),
                  h
              );
          }),
          (r.prototype.enter = function (e) {
              t.each(
                  [e].concat(this._states.tags[e] || []),
                  t.proxy(function (t, e) {
                      this._states.current[e] === n && (this._states.current[e] = 0), this._states.current[e]++;
                  }, this)
              );
          }),
          (r.prototype.leave = function (e) {
              t.each(
                  [e].concat(this._states.tags[e] || []),
                  t.proxy(function (t, e) {
                      this._states.current[e]--;
                  }, this)
              );
          }),
          (r.prototype.register = function (e) {
              if (e.type === r.Type.Event) {
                  if ((t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl)) {
                      var i = t.event.special[e.name]._default;
                      (t.event.special[e.name]._default = function (t) {
                          return !i || !i.apply || (t.namespace && t.namespace.indexOf("owl") !== -1) ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments);
                      }),
                          (t.event.special[e.name].owl = !0);
                  }
              } else
                  e.type === r.Type.State &&
                      (this._states.tags[e.name] ? (this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags)) : (this._states.tags[e.name] = e.tags),
                      (this._states.tags[e.name] = t.grep(
                          this._states.tags[e.name],
                          t.proxy(function (i, n) {
                              return t.inArray(i, this._states.tags[e.name]) === n;
                          }, this)
                      )));
          }),
          (r.prototype.suppress = function (e) {
              t.each(
                  e,
                  t.proxy(function (t, e) {
                      this._supress[e] = !0;
                  }, this)
              );
          }),
          (r.prototype.release = function (e) {
              t.each(
                  e,
                  t.proxy(function (t, e) {
                      delete this._supress[e];
                  }, this)
              );
          }),
          (r.prototype.pointer = function (t) {
              var i = { x: null, y: null };
              return (
                  (t = t.originalEvent || t || e.event),
                  (t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t),
                  t.pageX ? ((i.x = t.pageX), (i.y = t.pageY)) : ((i.x = t.clientX), (i.y = t.clientY)),
                  i
              );
          }),
          (r.prototype.isNumeric = function (t) {
              return !isNaN(parseFloat(t));
          }),
          (r.prototype.difference = function (t, e) {
              return { x: t.x - e.x, y: t.y - e.y };
          }),
          (t.fn.owlCarousel = function (e) {
              var i = Array.prototype.slice.call(arguments, 1);
              return this.each(function () {
                  var n = t(this),
                      s = n.data("owl.carousel");
                  s ||
                      ((s = new r(this, "object" == typeof e && e)),
                      n.data("owl.carousel", s),
                      t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
                          s.register({ type: r.Type.Event, name: i }),
                              s.$element.on(
                                  i + ".owl.carousel.core",
                                  t.proxy(function (t) {
                                      t.namespace && t.relatedTarget !== this && (this.suppress([i]), s[i].apply(this, [].slice.call(arguments, 1)), this.release([i]));
                                  }, s)
                              );
                      })),
                      "string" == typeof e && "_" !== e.charAt(0) && s[e].apply(s, i);
              });
          }),
          (t.fn.owlCarousel.Constructor = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this._core = e),
              (this._interval = null),
              (this._visible = null),
              (this._handlers = {
                  "initialized.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.autoRefresh && this.watch();
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this._core.$element.on(this._handlers);
      };
      (r.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
          (r.prototype.watch = function () {
              this._interval || ((this._visible = this._core.$element.is(":visible")), (this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
          }),
          (r.prototype.refresh = function () {
              this._core.$element.is(":visible") !== this._visible &&
                  ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
          }),
          (r.prototype.destroy = function () {
              var t, i;
              e.clearInterval(this._interval);
              for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
              for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this._core = e),
              (this._loaded = []),
              (this._handlers = {
                  "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
                      if (e.namespace && this._core.settings && this._core.settings.lazyLoad && ((e.property && "position" == e.property.name) || "initialized" == e.type))
                          for (
                              var i = this._core.settings,
                                  r = (i.center && Math.ceil(i.items / 2)) || i.items,
                                  s = (i.center && r * -1) || 0,
                                  o = (e.property && e.property.value !== n ? e.property.value : this._core.current()) + s,
                                  a = this._core.clones().length,
                                  l = t.proxy(function (t, e) {
                                      this.load(e);
                                  }, this);
                              s++ < r;

                          )
                              this.load(a / 2 + this._core.relative(o)), a && t.each(this._core.clones(this._core.relative(o)), l), o++;
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this._core.$element.on(this._handlers);
      };
      (r.Defaults = { lazyLoad: !1 }),
          (r.prototype.load = function (i) {
              var n = this._core.$stage.children().eq(i),
                  r = n && n.find(".owl-lazy");
              !r ||
                  t.inArray(n.get(0), this._loaded) > -1 ||
                  (r.each(
                      t.proxy(function (i, n) {
                          var r,
                              s = t(n),
                              o = (e.devicePixelRatio > 1 && s.attr("data-src-retina")) || s.attr("data-src");
                          this._core.trigger("load", { element: s, url: o }, "lazy"),
                              s.is("img")
                                  ? s
                                        .one(
                                            "load.owl.lazy",
                                            t.proxy(function () {
                                                s.css("opacity", 1), this._core.trigger("loaded", { element: s, url: o }, "lazy");
                                            }, this)
                                        )
                                        .attr("src", o)
                                  : ((r = new Image()),
                                    (r.onload = t.proxy(function () {
                                        s.css({ "background-image": "url(" + o + ")", opacity: "1" }), this._core.trigger("loaded", { element: s, url: o }, "lazy");
                                    }, this)),
                                    (r.src = o));
                      }, this)
                  ),
                  this._loaded.push(n.get(0)));
          }),
          (r.prototype.destroy = function () {
              var t, e;
              for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
              for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.Lazy = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this._core = e),
              (this._handlers = {
                  "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.autoHeight && this.update();
                  }, this),
                  "changed.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update();
                  }, this),
                  "loaded.owl.lazy": t.proxy(function (t) {
                      t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this._core.$element.on(this._handlers);
      };
      (r.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
          (r.prototype.update = function () {
              var e = this._core._current,
                  i = e + this._core.settings.items,
                  n = this._core.$stage.children().toArray().slice(e, i),
                  r = [],
                  s = 0;
              t.each(n, function (e, i) {
                  r.push(t(i).height());
              }),
                  (s = Math.max.apply(null, r)),
                  this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass);
          }),
          (r.prototype.destroy = function () {
              var t, e;
              for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
              for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this._core = e),
              (this._videos = {}),
              (this._playing = null),
              (this._handlers = {
                  "initialized.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                  }, this),
                  "resize.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                  }, this),
                  "refreshed.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                  }, this),
                  "changed.owl.carousel": t.proxy(function (t) {
                      t.namespace && "position" === t.property.name && this._playing && this.stop();
                  }, this),
                  "prepared.owl.carousel": t.proxy(function (e) {
                      if (e.namespace) {
                          var i = t(e.content).find(".owl-video");
                          i.length && (i.css("display", "none"), this.fetch(i, t(e.content)));
                      }
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this._core.$element.on(this._handlers),
              this._core.$element.on(
                  "click.owl.video",
                  ".owl-video-play-icon",
                  t.proxy(function (t) {
                      this.play(t);
                  }, this)
              );
      };
      (r.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
          (r.prototype.fetch = function (t, e) {
              var i = (function () {
                      return t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube";
                  })(),
                  n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                  r = t.attr("data-width") || this._core.settings.videoWidth,
                  s = t.attr("data-height") || this._core.settings.videoHeight,
                  o = t.attr("href");
              if (!o) throw new Error("Missing video URL.");
              if (
                  ((n = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/)),
                  n[3].indexOf("youtu") > -1)
              )
                  i = "youtube";
              else if (n[3].indexOf("vimeo") > -1) i = "vimeo";
              else {
                  if (!(n[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                  i = "vzaar";
              }
              (n = n[6]), (this._videos[o] = { type: i, id: n, width: r, height: s }), e.attr("data-video", o), this.thumbnail(t, this._videos[o]);
          }),
          (r.prototype.thumbnail = function (e, i) {
              var n,
                  r,
                  s,
                  o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                  a = e.find("img"),
                  l = "src",
                  h = "",
                  c = this._core.settings,
                  u = function (t) {
                      (r = '<div class="owl-video-play-icon"></div>'),
                          (n = c.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>'),
                          e.after(n),
                          e.after(r);
                  };
              return (
                  e.wrap('<div class="owl-video-wrapper"' + o + "></div>"),
                  this._core.settings.lazyLoad && ((l = "data-src"), (h = "owl-lazy")),
                  a.length
                      ? (u(a.attr(l)), a.remove(), !1)
                      : void ("youtube" === i.type
                            ? ((s = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"), u(s))
                            : "vimeo" === i.type
                            ? t.ajax({
                                  type: "GET",
                                  url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                                  jsonp: "callback",
                                  dataType: "jsonp",
                                  success: function (t) {
                                      (s = t[0].thumbnail_large), u(s);
                                  },
                              })
                            : "vzaar" === i.type &&
                              t.ajax({
                                  type: "GET",
                                  url: "//vzaar.com/api/videos/" + i.id + ".json",
                                  jsonp: "callback",
                                  dataType: "jsonp",
                                  success: function (t) {
                                      (s = t.framegrab_url), u(s);
                                  },
                              }))
              );
          }),
          (r.prototype.stop = function () {
              this._core.trigger("stop", null, "video"),
                  this._playing.find(".owl-video-frame").remove(),
                  this._playing.removeClass("owl-video-playing"),
                  (this._playing = null),
                  this._core.leave("playing"),
                  this._core.trigger("stopped", null, "video");
          }),
          (r.prototype.play = function (e) {
              var i,
                  n = t(e.target),
                  r = n.closest("." + this._core.settings.itemClass),
                  s = this._videos[r.attr("data-video")],
                  o = s.width || "100%",
                  a = s.height || this._core.$stage.height();
              this._playing ||
                  (this._core.enter("playing"),
                  this._core.trigger("play", null, "video"),
                  (r = this._core.items(this._core.relative(r.index()))),
                  this._core.reset(r.index()),
                  "youtube" === s.type
                      ? (i = '<iframe width="' + o + '" height="' + a + '" src="//www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>')
                      : "vimeo" === s.type
                      ? (i = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + o + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                      : "vzaar" === s.type && (i = '<iframe frameborder="0"height="' + a + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'),
                  t('<div class="owl-video-frame">' + i + "</div>").insertAfter(r.find(".owl-video")),
                  (this._playing = r.addClass("owl-video-playing")));
          }),
          (r.prototype.isInFullScreen = function () {
              var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
              return e && t(e).parent().hasClass("owl-video-frame");
          }),
          (r.prototype.destroy = function () {
              var t, e;
              this._core.$element.off("click.owl.video");
              for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
              for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.Video = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this.core = e),
              (this.core.options = t.extend({}, r.Defaults, this.core.options)),
              (this.swapping = !0),
              (this.previous = n),
              (this.next = n),
              (this.handlers = {
                  "change.owl.carousel": t.proxy(function (t) {
                      t.namespace && "position" == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value));
                  }, this),
                  "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                      t.namespace && (this.swapping = "translated" == t.type);
                  }, this),
                  "translate.owl.carousel": t.proxy(function (t) {
                      t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                  }, this),
              }),
              this.core.$element.on(this.handlers);
      };
      (r.Defaults = { animateOut: !1, animateIn: !1 }),
          (r.prototype.swap = function () {
              if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                  this.core.speed(0);
                  var e,
                      i = t.proxy(this.clear, this),
                      n = this.core.$stage.children().eq(this.previous),
                      r = this.core.$stage.children().eq(this.next),
                      s = this.core.settings.animateIn,
                      o = this.core.settings.animateOut;
                  this.core.current() !== this.previous &&
                      (o &&
                          ((e = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                          n
                              .one(t.support.animation.end, i)
                              .css({ left: e + "px" })
                              .addClass("animated owl-animated-out")
                              .addClass(o)),
                      s && r.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(s));
              }
          }),
          (r.prototype.clear = function (e) {
              t(e.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
          }),
          (r.prototype.destroy = function () {
              var t, e;
              for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
              for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.Animate = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      var r = function (e) {
          (this._core = e),
              (this._timeout = null),
              (this._paused = !1),
              (this._handlers = {
                  "changed.owl.carousel": t.proxy(function (t) {
                      t.namespace && "settings" === t.property.name
                          ? this._core.settings.autoplay
                              ? this.play()
                              : this.stop()
                          : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval();
                  }, this),
                  "initialized.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.autoplay && this.play();
                  }, this),
                  "play.owl.autoplay": t.proxy(function (t, e, i) {
                      t.namespace && this.play(e, i);
                  }, this),
                  "stop.owl.autoplay": t.proxy(function (t) {
                      t.namespace && this.stop();
                  }, this),
                  "mouseover.owl.autoplay": t.proxy(function () {
                      this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                  }, this),
                  "mouseleave.owl.autoplay": t.proxy(function () {
                      this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                  }, this),
                  "touchstart.owl.core": t.proxy(function () {
                      this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                  }, this),
                  "touchend.owl.core": t.proxy(function () {
                      this._core.settings.autoplayHoverPause && this.play();
                  }, this),
              }),
              this._core.$element.on(this._handlers),
              (this._core.options = t.extend({}, r.Defaults, this._core.options));
      };
      (r.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
          (r.prototype.play = function (t, e) {
              (this._paused = !1), this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval());
          }),
          (r.prototype._getNextTimeout = function (n, r) {
              return (
                  this._timeout && e.clearTimeout(this._timeout),
                  e.setTimeout(
                      t.proxy(function () {
                          this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(r || this._core.settings.autoplaySpeed);
                      }, this),
                      n || this._core.settings.autoplayTimeout
                  )
              );
          }),
          (r.prototype._setAutoPlayInterval = function () {
              this._timeout = this._getNextTimeout();
          }),
          (r.prototype.stop = function () {
              this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"));
          }),
          (r.prototype.pause = function () {
              this._core.is("rotating") && (this._paused = !0);
          }),
          (r.prototype.destroy = function () {
              var t, e;
              this.stop();
              for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
              for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.autoplay = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      "use strict";
      var r = function (e) {
          (this._core = e),
              (this._initialized = !1),
              (this._pages = []),
              (this._controls = {}),
              (this._templates = []),
              (this.$element = this._core.$element),
              (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
              (this._handlers = {
                  "prepared.owl.carousel": t.proxy(function (e) {
                      e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                  }, this),
                  "added.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                  }, this),
                  "remove.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                  }, this),
                  "changed.owl.carousel": t.proxy(function (t) {
                      t.namespace && "position" == t.property.name && this.draw();
                  }, this),
                  "initialized.owl.carousel": t.proxy(function (t) {
                      t.namespace &&
                          !this._initialized &&
                          (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                  }, this),
                  "refreshed.owl.carousel": t.proxy(function (t) {
                      t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this.$element.on(this._handlers);
      };
      (r.Defaults = {
          nav: !1,
          navText: ["prev", "next"],
          navSpeed: !1,
          navElement: "div",
          navContainer: !1,
          navContainerClass: "owl-nav",
          navClass: ["owl-prev", "owl-next"],
          slideBy: 1,
          dotClass: "owl-dot",
          dotsClass: "owl-dots",
          dots: !0,
          dotsEach: !1,
          dotsData: !1,
          dotsSpeed: !1,
          dotsContainer: !1,
      }),
          (r.prototype.initialize = function () {
              var e,
                  i = this._core.settings;
              (this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                  (this._controls.$previous = t("<" + i.navElement + ">")
                      .addClass(i.navClass[0])
                      .html(i.navText[0])
                      .prependTo(this._controls.$relative)
                      .on(
                          "click",
                          t.proxy(function (t) {
                              this.prev(i.navSpeed);
                          }, this)
                      )),
                  (this._controls.$next = t("<" + i.navElement + ">")
                      .addClass(i.navClass[1])
                      .html(i.navText[1])
                      .appendTo(this._controls.$relative)
                      .on(
                          "click",
                          t.proxy(function (t) {
                              this.next(i.navSpeed);
                          }, this)
                      )),
                  i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]),
                  (this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled")),
                  this._controls.$absolute.on(
                      "click",
                      "div",
                      t.proxy(function (e) {
                          var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                          e.preventDefault(), this.to(n, i.dotsSpeed);
                      }, this)
                  );
              for (e in this._overrides) this._core[e] = t.proxy(this[e], this);
          }),
          (r.prototype.destroy = function () {
              var t, e, i, n;
              for (t in this._handlers) this.$element.off(t, this._handlers[t]);
              for (e in this._controls) this._controls[e].remove();
              for (n in this.overides) this._core[n] = this._overrides[n];
              for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
          }),
          (r.prototype.update = function () {
              var t,
                  e,
                  i,
                  n = this._core.clones().length / 2,
                  r = n + this._core.items().length,
                  s = this._core.maximum(!0),
                  o = this._core.settings,
                  a = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
              if (("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy))
                  for (this._pages = [], t = n, e = 0, i = 0; t < r; t++) {
                      if (e >= a || 0 === e) {
                          if ((this._pages.push({ start: Math.min(s, t - n), end: t - n + a - 1 }), Math.min(s, t - n) === s)) break;
                          (e = 0), ++i;
                      }
                      e += this._core.mergers(this._core.relative(t));
                  }
          }),
          (r.prototype.draw = function () {
              var e,
                  i = this._core.settings,
                  n = this._core.items().length <= i.items,
                  r = this._core.relative(this._core.current()),
                  s = i.loop || i.rewind;
              this._controls.$relative.toggleClass("disabled", !i.nav || n),
                  i.nav && (this._controls.$previous.toggleClass("disabled", !s && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !s && r >= this._core.maximum(!0))),
                  this._controls.$absolute.toggleClass("disabled", !i.dots || n),
                  i.dots &&
                      ((e = this._pages.length - this._controls.$absolute.children().length),
                      i.dotsData && 0 !== e
                          ? this._controls.$absolute.html(this._templates.join(""))
                          : e > 0
                          ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0]))
                          : e < 0 && this._controls.$absolute.children().slice(e).remove(),
                      this._controls.$absolute.find(".active").removeClass("active"),
                      this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"));
          }),
          (r.prototype.onTrigger = function (e) {
              var i = this._core.settings;
              e.page = { index: t.inArray(this.current(), this._pages), count: this._pages.length, size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items) };
          }),
          (r.prototype.current = function () {
              var e = this._core.relative(this._core.current());
              return t
                  .grep(
                      this._pages,
                      t.proxy(function (t, i) {
                          return t.start <= e && t.end >= e;
                      }, this)
                  )
                  .pop();
          }),
          (r.prototype.getPosition = function (e) {
              var i,
                  n,
                  r = this._core.settings;
              return (
                  "page" == r.slideBy
                      ? ((i = t.inArray(this.current(), this._pages)), (n = this._pages.length), e ? ++i : --i, (i = this._pages[((i % n) + n) % n].start))
                      : ((i = this._core.relative(this._core.current())), (n = this._core.items().length), e ? (i += r.slideBy) : (i -= r.slideBy)),
                  i
              );
          }),
          (r.prototype.next = function (e) {
              t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
          }),
          (r.prototype.prev = function (e) {
              t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
          }),
          (r.prototype.to = function (e, i, n) {
              var r;
              !n && this._pages.length ? ((r = this._pages.length), t.proxy(this._overrides.to, this._core)(this._pages[((e % r) + r) % r].start, i)) : t.proxy(this._overrides.to, this._core)(e, i);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.Navigation = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      "use strict";
      var r = function (i) {
          (this._core = i),
              (this._hashes = {}),
              (this.$element = this._core.$element),
              (this._handlers = {
                  "initialized.owl.carousel": t.proxy(function (i) {
                      i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation");
                  }, this),
                  "prepared.owl.carousel": t.proxy(function (e) {
                      if (e.namespace) {
                          var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                          if (!i) return;
                          this._hashes[i] = e.content;
                      }
                  }, this),
                  "changed.owl.carousel": t.proxy(function (i) {
                      if (i.namespace && "position" === i.property.name) {
                          var n = this._core.items(this._core.relative(this._core.current())),
                              r = t
                                  .map(this._hashes, function (t, e) {
                                      return t === n ? e : null;
                                  })
                                  .join();
                          if (!r || e.location.hash.slice(1) === r) return;
                          e.location.hash = r;
                      }
                  }, this),
              }),
              (this._core.options = t.extend({}, r.Defaults, this._core.options)),
              this.$element.on(this._handlers),
              t(e).on(
                  "hashchange.owl.navigation",
                  t.proxy(function (t) {
                      var i = e.location.hash.substring(1),
                          r = this._core.$stage.children(),
                          s = this._hashes[i] && r.index(this._hashes[i]);
                      s !== n && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0);
                  }, this)
              );
      };
      (r.Defaults = { URLhashListener: !1 }),
          (r.prototype.destroy = function () {
              var i, n;
              t(e).off("hashchange.owl.navigation");
              for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
              for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null);
          }),
          (t.fn.owlCarousel.Constructor.Plugins.Hash = r);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
      function r(e, i) {
          var r = !1,
              s = e.charAt(0).toUpperCase() + e.slice(1);
          return (
              t.each((e + " " + a.join(s + " ") + s).split(" "), function (t, e) {
                  if (o[e] !== n) return (r = !i || e), !1;
              }),
              r
          );
      }
      function s(t) {
          return r(t, !0);
      }
      var o = t("<support>").get(0).style,
          a = "Webkit Moz O ms".split(" "),
          l = {
              transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
              animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
          },
          h = {
              csstransforms: function () {
                  return !!r("transform");
              },
              csstransforms3d: function () {
                  return !!r("perspective");
              },
              csstransitions: function () {
                  return !!r("transition");
              },
              cssanimations: function () {
                  return !!r("animation");
              },
          };
      h.csstransitions() && ((t.support.transition = new String(s("transition"))), (t.support.transition.end = l.transition.end[t.support.transition])),
          h.cssanimations() && ((t.support.animation = new String(s("animation"))), (t.support.animation.end = l.animation.end[t.support.animation])),
          h.csstransforms() && ((t.support.transform = new String(s("transform"))), (t.support.transform3d = h.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document),
  (function (t) {
      function e(e) {
          var i = e || window.event,
              n = [].slice.call(arguments, 1),
              r = 0,
              s = 0,
              o = 0;
          return (
              (e = t.event.fix(i)),
              (e.type = "mousewheel"),
              i.wheelDelta && (r = i.wheelDelta / 120),
              i.detail && (r = -i.detail / 3),
              (o = r),
              void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && ((o = 0), (s = -1 * r)),
              void 0 !== i.wheelDeltaY && (o = i.wheelDeltaY / 120),
              void 0 !== i.wheelDeltaX && (s = (-1 * i.wheelDeltaX) / 120),
              n.unshift(e, r, s, o),
              (t.event.dispatch || t.event.handle).apply(this, n)
          );
      }
      var i = ["DOMMouseScroll", "mousewheel"];
      if (t.event.fixHooks) for (var n = i.length; n; ) t.event.fixHooks[i[--n]] = t.event.mouseHooks;
      (t.event.special.mousewheel = {
          setup: function () {
              if (this.addEventListener) for (var t = i.length; t; ) this.addEventListener(i[--t], e, !1);
              else this.onmousewheel = e;
          },
          teardown: function () {
              if (this.removeEventListener) for (var t = i.length; t; ) this.removeEventListener(i[--t], e, !1);
              else this.onmousewheel = null;
          },
      }),
          t.fn.extend({
              mousewheel: function (t) {
                  return t ? this.bind("mousewheel", t) : this.trigger("mousewheel");
              },
              unmousewheel: function (t) {
                  return this.unbind("mousewheel", t);
              },
          });
  })(jQuery),
  (function (t) {
      "use strict";
      "object" == typeof module && "object" == typeof module.exports ? t(require("jquery"), window, document) : t(jQuery, window, document);
  })(function (t, e, i, n) {
      "use strict";
      if (!e.history.pushState)
          return (
              (t.fn.smoothState = function () {
                  return this;
              }),
              void (t.fn.smoothState.options = {})
          );
      if (!t.fn.smoothState) {
          var r = t("html, body"),
              s = e.console,
              o = {
                  debug: !1,
                  anchors: "a",
                  hrefRegex: "",
                  forms: "form",
                  allowFormCaching: !1,
                  repeatDelay: 500,
                  blacklist: ".no-smoothState",
                  prefetch: !1,
                  prefetchOn: "mouseover touchstart",
                  prefetchBlacklist: ".no-prefetch",
                  locationHeader: "X-SmoothState-Location",
                  cacheLength: 0,
                  loadingClass: "is-loading",
                  scroll: !0,
                  alterRequest: function (t) {
                      return t;
                  },
                  alterChangeState: function (t, e, i) {
                      return t;
                  },
                  onBefore: function (t, e) {},
                  onStart: { duration: 0, render: function (t) {} },
                  onProgress: { duration: 0, render: function (t) {} },
                  onReady: {
                      duration: 0,
                      render: function (t, e) {
                          t.html(e);
                      },
                  },
                  onAfter: function (t, e) {},
              },
              a = {
                  isExternal: function (t) {
                      var i = t.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                      return (
                          ("string" == typeof i[1] && i[1].length > 0 && i[1].toLowerCase() !== e.location.protocol) ||
                          ("string" == typeof i[2] && i[2].length > 0 && i[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[e.location.protocol] + ")?$"), "") !== e.location.host)
                      );
                  },
                  stripHash: function (t) {
                      return t.replace(/#.*/, "");
                  },
                  isHash: function (t, i) {
                      i = i || e.location.href;
                      var n = t.indexOf("#") > -1,
                          r = a.stripHash(t) === a.stripHash(i);
                      return n && r;
                  },
                  translate: function (e) {
                      var i = { dataType: "html", type: "GET" };
                      return (e = "string" == typeof e ? t.extend({}, i, { url: e }) : t.extend({}, i, e));
                  },
                  shouldLoadAnchor: function (t, e, i) {
                      var r = t.prop("href");
                      return !(a.isExternal(r) || a.isHash(r) || t.is(e) || t.prop("target") || (typeof i !== n && "" !== i && t.prop("href").search(i) === -1));
                  },
                  clearIfOverCapacity: function (t, e) {
                      return (
                          Object.keys ||
                              (Object.keys = function (t) {
                                  var e,
                                      i = [];
                                  for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(e);
                                  return i;
                              }),
                          Object.keys(t).length > e && (t = {}),
                          t
                      );
                  },
                  storePageIn: function (e, i, n, r, s, o) {
                      var a = t("<html></html>").append(t(n));
                      return "undefined" == typeof s && (s = {}), "undefined" == typeof o && (o = i), (e[i] = { status: "loaded", title: a.find("title").first().text(), html: a.find("#" + r), doc: n, state: s, destUrl: o }), e;
                  },
                  triggerAllAnimationEndEvent: function (e, i) {
                      i = " " + i || "";
                      var n = 0,
                          r = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
                          s = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                          o = "allanimationend",
                          l = function (i) {
                              t(i.delegateTarget).is(e) && (i.stopPropagation(), n++);
                          },
                          h = function (i) {
                              t(i.delegateTarget).is(e) && (i.stopPropagation(), n--, 0 === n && e.trigger(o));
                          };
                      e.on(r, l),
                          e.on(s, h),
                          e.on("allanimationend" + i, function () {
                              (n = 0), a.redraw(e);
                          });
                  },
                  redraw: function (t) {
                      t.height();
                  },
              },
              l = function (i) {
                  if (null !== i.state) {
                      var n = e.location.href,
                          r = t("#" + i.state.id),
                          s = r.data("smoothState"),
                          o = s.href !== n && !a.isHash(n, s.href),
                          l = i.state !== s.cache[s.href].state;
                      (o || l) && (l && s.clear(s.href), s.load(n, !1));
                  }
              },
              h = function (o, l) {
                  var h = t(o),
                      c = h.prop("id"),
                      u = null,
                      f = !1,
                      p = {},
                      d = {},
                      m = e.location.href,
                      g = function (t) {
                          (t = t || !1), t && p.hasOwnProperty(t) ? delete p[t] : (p = {}), (h.data("smoothState").cache = p);
                      },
                      _ = function (e, i) {
                          i = i || t.noop;
                          var n = a.translate(e);
                          if (((p = a.clearIfOverCapacity(p, l.cacheLength)), !p.hasOwnProperty(n.url) || "undefined" != typeof n.data)) {
                              p[n.url] = { status: "fetching" };
                              var r = t.ajax(n);
                              r.done(function (t) {
                                  a.storePageIn(p, n.url, t, c), (h.data("smoothState").cache = p);
                              }),
                                  r.fail(function () {
                                      p[n.url].status = "error";
                                  }),
                                  l.locationHeader &&
                                      r.always(function (t, e, i) {
                                          var r = t.statusCode ? t : i,
                                              s = r.getResponseHeader(l.locationHeader);
                                          s && (p[n.url].destUrl = s);
                                      }),
                                  i && r.always(i);
                          }
                      },
                      v = function () {
                          if (u) {
                              var e = t(u, h);
                              if (e.length) {
                                  var i = e.offset().top;
                                  r.scrollTop(i);
                              }
                              u = null;
                          }
                      },
                      y = function (n) {
                          var o = "#" + c,
                              a = p[n] ? t(p[n].html.html()) : null;
                          a.length
                              ? ((i.title = p[n].title),
                                (h.data("smoothState").href = n),
                                l.loadingClass && r.removeClass(l.loadingClass),
                                l.onReady.render(h, a),
                                h.one("ss.onReadyEnd", function () {
                                    (f = !1), l.onAfter(h, a), l.scroll && v(), P(h);
                                }),
                                e.setTimeout(function () {
                                    h.trigger("ss.onReadyEnd");
                                }, l.onReady.duration))
                              : !a && l.debug && s
                              ? s.warn("No element with an id of " + o + " in response from " + n + " in " + p)
                              : (e.location = n);
                      },
                      w = function (t, i, n) {
                          var o = a.translate(t);
                          "undefined" == typeof i && (i = !0), "undefined" == typeof n && (n = !0);
                          var u = !1,
                              f = !1,
                              m = {
                                  loaded: function () {
                                      var t = u ? "ss.onProgressEnd" : "ss.onStartEnd";
                                      if (
                                          (f && u
                                              ? f && y(o.url)
                                              : h.one(t, function () {
                                                    y(o.url), n || g(o.url);
                                                }),
                                          i)
                                      ) {
                                          var r = p[o.url].destUrl;
                                          (d = l.alterChangeState({ id: c }, p[o.url].title, r)), (p[o.url].state = d), e.history.pushState(d, p[o.url].title, r);
                                      }
                                      f && !n && g(o.url);
                                  },
                                  fetching: function () {
                                      u ||
                                          ((u = !0),
                                          h.one("ss.onStartEnd", function () {
                                              l.loadingClass && r.addClass(l.loadingClass),
                                                  l.onProgress.render(h),
                                                  e.setTimeout(function () {
                                                      h.trigger("ss.onProgressEnd"), (f = !0);
                                                  }, l.onProgress.duration);
                                          })),
                                          e.setTimeout(function () {
                                              p.hasOwnProperty(o.url) && m[p[o.url].status]();
                                          }, 10);
                                  },
                                  error: function () {
                                      l.debug && s ? s.log("There was an error loading: " + o.url) : (e.location = o.url);
                                  },
                              };
                          p.hasOwnProperty(o.url) || _(o),
                              l.onStart.render(h),
                              e.setTimeout(function () {
                                  l.scroll && r.scrollTop(0), h.trigger("ss.onStartEnd");
                              }, l.onStart.duration),
                              m[p[o.url].status]();
                      },
                      x = function (e) {
                          var i,
                              n = t(e.currentTarget);
                          a.shouldLoadAnchor(n, l.blacklist, l.hrefRegex) && !f && (e.stopPropagation(), (i = a.translate(n.prop("href"))), (i = l.alterRequest(i)), _(i));
                      },
                      b = function (e) {
                          var i = t(e.currentTarget);
                          if (!e.metaKey && !e.ctrlKey && a.shouldLoadAnchor(i, l.blacklist, l.hrefRegex) && (e.stopPropagation(), e.preventDefault(), !S())) {
                              k();
                              var n = a.translate(i.prop("href"));
                              (f = !0), (u = i.prop("hash")), (n = l.alterRequest(n)), l.onBefore(i, h), w(n);
                          }
                      },
                      T = function (e) {
                          var i = t(e.currentTarget);
                          if (!i.is(l.blacklist) && (e.preventDefault(), e.stopPropagation(), !S())) {
                              k();
                              var r = { url: i.prop("action"), data: i.serialize(), type: i.prop("method") };
                              (f = !0), (r = l.alterRequest(r)), "get" === r.type.toLowerCase() && (r.url = r.url + "?" + r.data), l.onBefore(i, h), w(r, n, l.allowFormCaching);
                          }
                      },
                      C = 0,
                      S = function () {
                          var t = null === l.repeatDelay,
                              e = parseInt(Date.now()) > C;
                          return !(t || e);
                      },
                      k = function () {
                          C = parseInt(Date.now()) + parseInt(l.repeatDelay);
                      },
                      P = function (t) {
                          l.anchors && l.prefetch && t.find(l.anchors).not(l.prefetchBlacklist).on(l.prefetchOn, null, x);
                      },
                      E = function (t) {
                          l.anchors && (t.on("click", l.anchors, b), P(t)), l.forms && t.on("submit", l.forms, T);
                      },
                      A = function () {
                          var t = h.prop("class");
                          h.removeClass(t), a.redraw(h), h.addClass(t);
                      };
                  return (
                      (l = t.extend({}, t.fn.smoothState.options, l)),
                      null === e.history.state ? ((d = l.alterChangeState({ id: c }, i.title, m)), e.history.replaceState(d, i.title, m)) : (d = {}),
                      a.storePageIn(p, m, i.documentElement.outerHTML, c, d),
                      a.triggerAllAnimationEndEvent(h, "ss.onStartEnd ss.onProgressEnd ss.onEndEnd"),
                      E(h),
                      { href: m, cache: p, clear: g, load: w, fetch: _, restartCSSAnimations: A }
                  );
              },
              c = function (e) {
                  return this.each(function () {
                      var i = this.tagName.toLowerCase();
                      this.id && "body" !== i && "html" !== i && !t.data(this, "smoothState")
                          ? t.data(this, "smoothState", new h(this, e))
                          : !this.id && s
                          ? s.warn("Every smoothState container needs an id but the following one does not have one:", this)
                          : ("body" !== i && "html" !== i) || !s || s.warn("The smoothstate container cannot be the " + this.tagName + " tag");
                  });
              };
          (e.onpopstate = l), (t.smoothStateUtility = a), (t.fn.smoothState = c), (t.fn.smoothState.options = o);
      }
  });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
      "TweenMax",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
          var n = function (t) {
                  var e,
                      i = [],
                      n = t.length;
                  for (e = 0; e !== n; i.push(t[e++]));
                  return i;
              },
              r = function (t, e, i) {
                  var n,
                      r,
                      s = t.cycle;
                  for (n in s) (r = s[n]), (t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length]);
                  delete t.cycle;
              },
              s = function (t, e, n) {
                  i.call(this, t, e, n),
                      (this._cycle = 0),
                      (this._yoyo = this.vars.yoyo === !0),
                      (this._repeat = this.vars.repeat || 0),
                      (this._repeatDelay = this.vars.repeatDelay || 0),
                      (this._dirty = !0),
                      (this.render = s.prototype.render);
              },
              o = 1e-10,
              a = i._internals,
              l = a.isSelector,
              h = a.isArray,
              c = (s.prototype = i.to({}, 0.1, {})),
              u = [];
          (s.version = "1.19.1"),
              (c.constructor = s),
              (c.kill()._gc = !1),
              (s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf),
              (s.getTweensOf = i.getTweensOf),
              (s.lagSmoothing = i.lagSmoothing),
              (s.ticker = i.ticker),
              (s.render = i.render),
              (c.invalidate = function () {
                  return (this._yoyo = this.vars.yoyo === !0), (this._repeat = this.vars.repeat || 0), (this._repeatDelay = this.vars.repeatDelay || 0), this._uncache(!0), i.prototype.invalidate.call(this);
              }),
              (c.updateTo = function (t, e) {
                  var n,
                      r = this.ratio,
                      s = this.vars.immediateRender || t.immediateRender;
                  e && this._startTime < this._timeline._time && ((this._startTime = this._timeline._time), this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                  for (n in t) this.vars[n] = t[n];
                  if (this._initted || s)
                      if (e) (this._initted = !1), s && this.render(0, !0, !0);
                      else if ((this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > 0.998)) {
                          var o = this._totalTime;
                          this.render(0, !0, !1), (this._initted = !1), this.render(o, !0, !1);
                      } else if (((this._initted = !1), this._init(), this._time > 0 || s)) for (var a, l = 1 / (1 - r), h = this._firstPT; h; ) (a = h.s + h.c), (h.c *= l), (h.s = a - h.c), (h = h._next);
                  return this;
              }),
              (c.render = function (t, e, i) {
                  this._initted || (0 === this._duration && this.vars.repeat && this.invalidate());
                  var n,
                      r,
                      s,
                      l,
                      h,
                      c,
                      u,
                      f,
                      p = this._dirty ? this.totalDuration() : this._totalDuration,
                      d = this._time,
                      m = this._totalTime,
                      g = this._cycle,
                      _ = this._duration,
                      v = this._rawPrevTime;
                  if (
                      (t >= p - 1e-7 && t >= 0
                          ? ((this._totalTime = p),
                            (this._cycle = this._repeat),
                            this._yoyo && 0 !== (1 & this._cycle) ? ((this._time = 0), (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0)) : ((this._time = _), (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1)),
                            this._reversed || ((n = !0), (r = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                            0 === _ &&
                                (this._initted || !this.vars.lazy || i) &&
                                (this._startTime === this._timeline._duration && (t = 0),
                                (0 > v || (0 >= t && t >= -1e-7) || (v === o && "isPause" !== this.data)) && v !== t && ((i = !0), v > o && (r = "onReverseComplete")),
                                (this._rawPrevTime = f = !e || t || v === t ? t : o)))
                          : 1e-7 > t
                          ? ((this._totalTime = this._time = this._cycle = 0),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                            (0 !== m || (0 === _ && v > 0)) && ((r = "onReverseComplete"), (n = this._reversed)),
                            0 > t && ((this._active = !1), 0 === _ && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), (this._rawPrevTime = f = !e || t || v === t ? t : o))),
                            this._initted || (i = !0))
                          : ((this._totalTime = this._time = t),
                            0 !== this._repeat &&
                                ((l = _ + this._repeatDelay),
                                (this._cycle = (this._totalTime / l) >> 0),
                                0 !== this._cycle && this._cycle === this._totalTime / l && t >= m && this._cycle--,
                                (this._time = this._totalTime - this._cycle * l),
                                this._yoyo && 0 !== (1 & this._cycle) && (this._time = _ - this._time),
                                this._time > _ ? (this._time = _) : this._time < 0 && (this._time = 0)),
                            this._easeType
                                ? ((h = this._time / _),
                                  (c = this._easeType),
                                  (u = this._easePower),
                                  (1 === c || (3 === c && h >= 0.5)) && (h = 1 - h),
                                  3 === c && (h *= 2),
                                  1 === u ? (h *= h) : 2 === u ? (h *= h * h) : 3 === u ? (h *= h * h * h) : 4 === u && (h *= h * h * h * h),
                                  1 === c ? (this.ratio = 1 - h) : 2 === c ? (this.ratio = h) : this._time / _ < 0.5 ? (this.ratio = h / 2) : (this.ratio = 1 - h / 2))
                                : (this.ratio = this._ease.getRatio(this._time / _))),
                      d === this._time && !i && g === this._cycle)
                  )
                      return void (m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                  if (!this._initted) {
                      if ((this._init(), !this._initted || this._gc)) return;
                      if (!i && this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)))
                          return (this._time = d), (this._totalTime = m), (this._rawPrevTime = v), (this._cycle = g), a.lazyTweens.push(this), void (this._lazy = [t, e]);
                      this._time && !n ? (this.ratio = this._ease.getRatio(this._time / _)) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                  }
                  for (
                      this._lazy !== !1 && (this._lazy = !1),
                          this._active || (!this._paused && this._time !== d && t >= 0 && (this._active = !0)),
                          0 === m &&
                              (2 === this._initted && t > 0 && this._init(),
                              this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")),
                              this.vars.onStart && (0 !== this._totalTime || 0 === _) && (e || this._callback("onStart"))),
                          s = this._firstPT;
                      s;

                  )
                      s.f ? s.t[s.p](s.c * this.ratio + s.s) : (s.t[s.p] = s.c * this.ratio + s.s), (s = s._next);
                  this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || ((this._totalTime !== m || r) && this._callback("onUpdate"))),
                      this._cycle !== g && (e || this._gc || (this.vars.onRepeat && this._callback("onRepeat"))),
                      r &&
                          (!this._gc || i) &&
                          (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i),
                          n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                          !e && this.vars[r] && this._callback(r),
                          0 === _ && this._rawPrevTime === o && f !== o && (this._rawPrevTime = 0));
              }),
              (s.to = function (t, e, i) {
                  return new s(t, e, i);
              }),
              (s.from = function (t, e, i) {
                  return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new s(t, e, i);
              }),
              (s.fromTo = function (t, e, i, n) {
                  return (n.startAt = i), (n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender), new s(t, e, n);
              }),
              (s.staggerTo = s.allTo = function (t, e, o, a, c, f, p) {
                  a = a || 0;
                  var d,
                      m,
                      g,
                      _,
                      v = 0,
                      y = [],
                      w = function () {
                          o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), c.apply(p || o.callbackScope || this, f || u);
                      },
                      x = o.cycle,
                      b = o.startAt && o.startAt.cycle;
                  for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], 0 > a && ((t = n(t)), t.reverse(), (a *= -1)), d = t.length - 1, g = 0; d >= g; g++) {
                      m = {};
                      for (_ in o) m[_] = o[_];
                      if ((x && (r(m, t, g), null != m.duration && ((e = m.duration), delete m.duration)), b)) {
                          b = m.startAt = {};
                          for (_ in o.startAt) b[_] = o.startAt[_];
                          r(m.startAt, t, g);
                      }
                      (m.delay = v + (m.delay || 0)), g === d && c && (m.onComplete = w), (y[g] = new s(t[g], e, m)), (v += a);
                  }
                  return y;
              }),
              (s.staggerFrom = s.allFrom = function (t, e, i, n, r, o, a) {
                  return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), s.staggerTo(t, e, i, n, r, o, a);
              }),
              (s.staggerFromTo = s.allFromTo = function (t, e, i, n, r, o, a, l) {
                  return (n.startAt = i), (n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender), s.staggerTo(t, e, n, r, o, a, l);
              }),
              (s.delayedCall = function (t, e, i, n, r) {
                  return new s(e, 0, { delay: t, onComplete: e, onCompleteParams: i, callbackScope: n, onReverseComplete: e, onReverseCompleteParams: i, immediateRender: !1, useFrames: r, overwrite: 0 });
              }),
              (s.set = function (t, e) {
                  return new s(t, 0, e);
              }),
              (s.isTweening = function (t) {
                  return i.getTweensOf(t, !0).length > 0;
              });
          var f = function (t, e) {
                  for (var n = [], r = 0, s = t._first; s; ) s instanceof i ? (n[r++] = s) : (e && (n[r++] = s), (n = n.concat(f(s, e))), (r = n.length)), (s = s._next);
                  return n;
              },
              p = (s.getAllTweens = function (e) {
                  return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e));
              });
          (s.killAll = function (t, i, n, r) {
              null == i && (i = !0), null == n && (n = !0);
              var s,
                  o,
                  a,
                  l = p(0 != r),
                  h = l.length,
                  c = i && n && r;
              for (a = 0; h > a; a++) (o = l[a]), (c || o instanceof e || ((s = o.target === o.vars.onComplete) && n) || (i && !s)) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1));
          }),
              (s.killChildTweensOf = function (t, e) {
                  if (null != t) {
                      var r,
                          o,
                          c,
                          u,
                          f,
                          p = a.tweenLookup;
                      if (("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t))) for (u = t.length; --u > -1; ) s.killChildTweensOf(t[u], e);
                      else {
                          r = [];
                          for (c in p) for (o = p[c].target.parentNode; o; ) o === t && (r = r.concat(p[c].tweens)), (o = o.parentNode);
                          for (f = r.length, u = 0; f > u; u++) e && r[u].totalTime(r[u].totalDuration()), r[u]._enabled(!1, !1);
                      }
                  }
              });
          var d = function (t, i, n, r) {
              (i = i !== !1), (n = n !== !1), (r = r !== !1);
              for (var s, o, a = p(r), l = i && n && r, h = a.length; --h > -1; ) (o = a[h]), (l || o instanceof e || ((s = o.target === o.vars.onComplete) && n) || (i && !s)) && o.paused(t);
          };
          return (
              (s.pauseAll = function (t, e, i) {
                  d(!0, t, e, i);
              }),
              (s.resumeAll = function (t, e, i) {
                  d(!1, t, e, i);
              }),
              (s.globalTimeScale = function (e) {
                  var n = t._rootTimeline,
                      r = i.ticker.time;
                  return arguments.length
                      ? ((e = e || o),
                        (n._startTime = r - ((r - n._startTime) * n._timeScale) / e),
                        (n = t._rootFramesTimeline),
                        (r = i.ticker.frame),
                        (n._startTime = r - ((r - n._startTime) * n._timeScale) / e),
                        (n._timeScale = t._rootTimeline._timeScale = e),
                        e)
                      : n._timeScale;
              }),
              (c.progress = function (t, e) {
                  return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration();
              }),
              (c.totalProgress = function (t, e) {
                  return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration();
              }),
              (c.time = function (t, e) {
                  return arguments.length
                      ? (this._dirty && this.totalDuration(),
                        t > this._duration && (t = this._duration),
                        this._yoyo && 0 !== (1 & this._cycle) ? (t = this._duration - t + this._cycle * (this._duration + this._repeatDelay)) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                        this.totalTime(t, e))
                      : this._time;
              }),
              (c.duration = function (e) {
                  return arguments.length ? t.prototype.duration.call(this, e) : this._duration;
              }),
              (c.totalDuration = function (t) {
                  return arguments.length
                      ? -1 === this._repeat
                          ? this
                          : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1))
                      : (this._dirty && ((this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), (this._dirty = !1)), this._totalDuration);
              }),
              (c.repeat = function (t) {
                  return arguments.length ? ((this._repeat = t), this._uncache(!0)) : this._repeat;
              }),
              (c.repeatDelay = function (t) {
                  return arguments.length ? ((this._repeatDelay = t), this._uncache(!0)) : this._repeatDelay;
              }),
              (c.yoyo = function (t) {
                  return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
              }),
              s
          );
      },
      !0
  ),
      _gsScope._gsDefine(
          "TimelineLite",
          ["core.Animation", "core.SimpleTimeline", "TweenLite"],
          function (t, e, i) {
              var n = function (t) {
                      e.call(this, t),
                          (this._labels = {}),
                          (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
                          (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
                          (this._sortChildren = !0),
                          (this._onUpdate = this.vars.onUpdate);
                      var i,
                          n,
                          r = this.vars;
                      for (n in r) (i = r[n]), l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                      l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
                  },
                  r = 1e-10,
                  s = i._internals,
                  o = (n._internals = {}),
                  a = s.isSelector,
                  l = s.isArray,
                  h = s.lazyTweens,
                  c = s.lazyRender,
                  u = _gsScope._gsDefine.globals,
                  f = function (t) {
                      var e,
                          i = {};
                      for (e in t) i[e] = t[e];
                      return i;
                  },
                  p = function (t, e, i) {
                      var n,
                          r,
                          s = t.cycle;
                      for (n in s) (r = s[n]), (t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length]);
                      delete t.cycle;
                  },
                  d = (o.pauseCallback = function () {}),
                  m = function (t) {
                      var e,
                          i = [],
                          n = t.length;
                      for (e = 0; e !== n; i.push(t[e++]));
                      return i;
                  },
                  g = (n.prototype = new e());
              return (
                  (n.version = "1.19.1"),
                  (g.constructor = n),
                  (g.kill()._gc = g._forcingPlayhead = g._hasPause = !1),
                  (g.to = function (t, e, n, r) {
                      var s = (n.repeat && u.TweenMax) || i;
                      return e ? this.add(new s(t, e, n), r) : this.set(t, n, r);
                  }),
                  (g.from = function (t, e, n, r) {
                      return this.add(((n.repeat && u.TweenMax) || i).from(t, e, n), r);
                  }),
                  (g.fromTo = function (t, e, n, r, s) {
                      var o = (r.repeat && u.TweenMax) || i;
                      return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s);
                  }),
                  (g.staggerTo = function (t, e, r, s, o, l, h, c) {
                      var u,
                          d,
                          g = new n({ onComplete: l, onCompleteParams: h, callbackScope: c, smoothChildTiming: this.smoothChildTiming }),
                          _ = r.cycle;
                      for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, 0 > s && ((t = m(t)), t.reverse(), (s *= -1)), d = 0; d < t.length; d++)
                          (u = f(r)), u.startAt && ((u.startAt = f(u.startAt)), u.startAt.cycle && p(u.startAt, t, d)), _ && (p(u, t, d), null != u.duration && ((e = u.duration), delete u.duration)), g.to(t[d], e, u, d * s);
                      return this.add(g, o);
                  }),
                  (g.staggerFrom = function (t, e, i, n, r, s, o, a) {
                      return (i.immediateRender = 0 != i.immediateRender), (i.runBackwards = !0), this.staggerTo(t, e, i, n, r, s, o, a);
                  }),
                  (g.staggerFromTo = function (t, e, i, n, r, s, o, a, l) {
                      return (n.startAt = i), (n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender), this.staggerTo(t, e, n, r, s, o, a, l);
                  }),
                  (g.call = function (t, e, n, r) {
                      return this.add(i.delayedCall(0, t, e, n), r);
                  }),
                  (g.set = function (t, e, n) {
                      return (n = this._parseTimeOrLabel(n, 0, !0)), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n);
                  }),
                  (n.exportRoot = function (t, e) {
                      (t = t || {}), null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                      var r,
                          s,
                          o = new n(t),
                          a = o._timeline;
                      for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r; )
                          (s = r._next), (e && r instanceof i && r.target === r.vars.onComplete) || o.add(r, r._startTime - r._delay), (r = s);
                      return a.add(o, 0), o;
                  }),
                  (g.add = function (r, s, o, a) {
                      var h, c, u, f, p, d;
                      if (("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t))) {
                          if (r instanceof Array || (r && r.push && l(r))) {
                              for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; c > u; u++)
                                  l((f = r[u])) && (f = new n({ tweens: f })),
                                      this.add(f, h),
                                      "string" != typeof f && "function" != typeof f && ("sequence" === o ? (h = f._startTime + f.totalDuration() / f._timeScale) : "start" === o && (f._startTime -= f.delay())),
                                      (h += a);
                              return this._uncache(!0);
                          }
                          if ("string" == typeof r) return this.addLabel(r, s);
                          if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                          r = i.delayedCall(0, r);
                      }
                      if ((e.prototype.add.call(this, r, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()))
                          for (p = this, d = p.rawTime() > r._startTime; p._timeline; ) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), (p = p._timeline);
                      return this;
                  }),
                  (g.remove = function (e) {
                      if (e instanceof t) {
                          this._remove(e, !1);
                          var i = (e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline);
                          return (e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale), this;
                      }
                      if (e instanceof Array || (e && e.push && l(e))) {
                          for (var n = e.length; --n > -1; ) this.remove(e[n]);
                          return this;
                      }
                      return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
                  }),
                  (g._remove = function (t, i) {
                      e.prototype._remove.call(this, t, i);
                      var n = this._last;
                      return n ? this._time > this.duration() && ((this._time = this._duration), (this._totalTime = this._totalDuration)) : (this._time = this._totalTime = this._duration = this._totalDuration = 0), this;
                  }),
                  (g.append = function (t, e) {
                      return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
                  }),
                  (g.insert = g.insertMultiple = function (t, e, i, n) {
                      return this.add(t, e || 0, i, n);
                  }),
                  (g.appendMultiple = function (t, e, i, n) {
                      return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n);
                  }),
                  (g.addLabel = function (t, e) {
                      return (this._labels[t] = this._parseTimeOrLabel(e)), this;
                  }),
                  (g.addPause = function (t, e, n, r) {
                      var s = i.delayedCall(0, d, n, r || this);
                      return (s.vars.onComplete = s.vars.onReverseComplete = e), (s.data = "isPause"), (this._hasPause = !0), this.add(s, t);
                  }),
                  (g.removeLabel = function (t) {
                      return delete this._labels[t], this;
                  }),
                  (g.getLabelTime = function (t) {
                      return null != this._labels[t] ? this._labels[t] : -1;
                  }),
                  (g._parseTimeOrLabel = function (e, i, n, r) {
                      var s;
                      if (r instanceof t && r.timeline === this) this.remove(r);
                      else if (r && (r instanceof Array || (r.push && l(r)))) for (s = r.length; --s > -1; ) r[s] instanceof t && r[s].timeline === this && this.remove(r[s]);
                      if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                      if (((i = i || 0), "string" != typeof e || (!isNaN(e) && null == this._labels[e]))) null == e && (e = this.duration());
                      else {
                          if (((s = e.indexOf("=")), -1 === s)) return null == this._labels[e] ? (n ? (this._labels[e] = this.duration() + i) : i) : this._labels[e] + i;
                          (i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1))), (e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, n) : this.duration());
                      }
                      return Number(e) + i;
                  }),
                  (g.seek = function (t, e) {
                      return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
                  }),
                  (g.stop = function () {
                      return this.paused(!0);
                  }),
                  (g.gotoAndPlay = function (t, e) {
                      return this.play(t, e);
                  }),
                  (g.gotoAndStop = function (t, e) {
                      return this.pause(t, e);
                  }),
                  (g.render = function (t, e, i) {
                      this._gc && this._enabled(!0, !1);
                      var n,
                          s,
                          o,
                          a,
                          l,
                          u,
                          f,
                          p = this._dirty ? this.totalDuration() : this._totalDuration,
                          d = this._time,
                          m = this._startTime,
                          g = this._timeScale,
                          _ = this._paused;
                      if (t >= p - 1e-7 && t >= 0)
                          (this._totalTime = this._time = p),
                              this._reversed ||
                                  this._hasPausedChild() ||
                                  ((s = !0),
                                  (a = "onComplete"),
                                  (l = !!this._timeline.autoRemoveChildren),
                                  0 === this._duration &&
                                      ((0 >= t && t >= -1e-7) || this._rawPrevTime < 0 || this._rawPrevTime === r) &&
                                      this._rawPrevTime !== t &&
                                      this._first &&
                                      ((l = !0), this._rawPrevTime > r && (a = "onReverseComplete"))),
                              (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                              (t = p + 1e-4);
                      else if (1e-7 > t)
                          if (
                              ((this._totalTime = this._time = 0),
                              (0 !== d || (0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || (0 > t && this._rawPrevTime >= 0)))) && ((a = "onReverseComplete"), (s = this._reversed)),
                              0 > t)
                          )
                              (this._active = !1), this._timeline.autoRemoveChildren && this._reversed ? ((l = s = !0), (a = "onReverseComplete")) : this._rawPrevTime >= 0 && this._first && (l = !0), (this._rawPrevTime = t);
                          else {
                              if (((this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r), 0 === t && s)) for (n = this._first; n && 0 === n._startTime; ) n._duration || (s = !1), (n = n._next);
                              (t = 0), this._initted || (l = !0);
                          }
                      else {
                          if (this._hasPause && !this._forcingPlayhead && !e) {
                              if (t >= d) for (n = this._first; n && n._startTime <= t && !u; ) n._duration || "isPause" !== n.data || n.ratio || (0 === n._startTime && 0 === this._rawPrevTime) || (u = n), (n = n._next);
                              else for (n = this._last; n && n._startTime >= t && !u; ) n._duration || ("isPause" === n.data && n._rawPrevTime > 0 && (u = n)), (n = n._prev);
                              u && ((this._time = t = u._startTime), (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                          }
                          this._totalTime = this._time = this._rawPrevTime = t;
                      }
                      if ((this._time !== d && this._first) || i || l || u) {
                          if (
                              (this._initted || (this._initted = !0),
                              this._active || (!this._paused && this._time !== d && t > 0 && (this._active = !0)),
                              0 === d && this.vars.onStart && ((0 === this._time && this._duration) || e || this._callback("onStart")),
                              (f = this._time),
                              f >= d)
                          )
                              for (n = this._first; n && ((o = n._next), f === this._time && (!this._paused || _)); )
                                  (n._active || (n._startTime <= f && !n._paused && !n._gc)) &&
                                      (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                                      (n = o);
                          else
                              for (n = this._last; n && ((o = n._prev), f === this._time && (!this._paused || _)); ) {
                                  if (n._active || (n._startTime <= d && !n._paused && !n._gc)) {
                                      if (u === n) {
                                          for (u = n._prev; u && u.endTime() > this._time; ) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), (u = u._prev);
                                          (u = null), this.pause();
                                      }
                                      n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i);
                                  }
                                  n = o;
                              }
                          this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))),
                              a &&
                                  (this._gc ||
                                      ((m === this._startTime || g !== this._timeScale) &&
                                          (0 === this._time || p >= this.totalDuration()) &&
                                          (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)), !e && this.vars[a] && this._callback(a))));
                      }
                  }),
                  (g._hasPausedChild = function () {
                      for (var t = this._first; t; ) {
                          if (t._paused || (t instanceof n && t._hasPausedChild())) return !0;
                          t = t._next;
                      }
                      return !1;
                  }),
                  (g.getChildren = function (t, e, n, r) {
                      r = r || -9999999999;
                      for (var s = [], o = this._first, a = 0; o; )
                          o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), t !== !1 && ((s = s.concat(o.getChildren(!0, e, n))), (a = s.length)))), (o = o._next);
                      return s;
                  }),
                  (g.getTweensOf = function (t, e) {
                      var n,
                          r,
                          s = this._gc,
                          o = [],
                          a = 0;
                      for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1; ) (n[r].timeline === this || (e && this._contains(n[r]))) && (o[a++] = n[r]);
                      return s && this._enabled(!1, !0), o;
                  }),
                  (g.recent = function () {
                      return this._recent;
                  }),
                  (g._contains = function (t) {
                      for (var e = t.timeline; e; ) {
                          if (e === this) return !0;
                          e = e.timeline;
                      }
                      return !1;
                  }),
                  (g.shiftChildren = function (t, e, i) {
                      i = i || 0;
                      for (var n, r = this._first, s = this._labels; r; ) r._startTime >= i && (r._startTime += t), (r = r._next);
                      if (e) for (n in s) s[n] >= i && (s[n] += t);
                      return this._uncache(!0);
                  }),
                  (g._kill = function (t, e) {
                      if (!t && !e) return this._enabled(!1, !1);
                      for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1; ) i[n]._kill(t, e) && (r = !0);
                      return r;
                  }),
                  (g.clear = function (t) {
                      var e = this.getChildren(!1, !0, !0),
                          i = e.length;
                      for (this._time = this._totalTime = 0; --i > -1; ) e[i]._enabled(!1, !1);
                      return t !== !1 && (this._labels = {}), this._uncache(!0);
                  }),
                  (g.invalidate = function () {
                      for (var e = this._first; e; ) e.invalidate(), (e = e._next);
                      return t.prototype.invalidate.call(this);
                  }),
                  (g._enabled = function (t, i) {
                      if (t === this._gc) for (var n = this._first; n; ) n._enabled(t, !0), (n = n._next);
                      return e.prototype._enabled.call(this, t, i);
                  }),
                  (g.totalTime = function (e, i, n) {
                      this._forcingPlayhead = !0;
                      var r = t.prototype.totalTime.apply(this, arguments);
                      return (this._forcingPlayhead = !1), r;
                  }),
                  (g.duration = function (t) {
                      return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration);
                  }),
                  (g.totalDuration = function (t) {
                      if (!arguments.length) {
                          if (this._dirty) {
                              for (var e, i, n = 0, r = this._last, s = 999999999999; r; )
                                  (e = r._prev),
                                      r._dirty && r.totalDuration(),
                                      r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : (s = r._startTime),
                                      r._startTime < 0 &&
                                          !r._paused &&
                                          ((n -= r._startTime), this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), (s = 0)),
                                      (i = r._startTime + r._totalDuration / r._timeScale),
                                      i > n && (n = i),
                                      (r = e);
                              (this._duration = this._totalDuration = n), (this._dirty = !1);
                          }
                          return this._totalDuration;
                      }
                      return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this;
                  }),
                  (g.paused = function (e) {
                      if (!e) for (var i = this._first, n = this._time; i; ) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), (i = i._next);
                      return t.prototype.paused.apply(this, arguments);
                  }),
                  (g.usesFrames = function () {
                      for (var e = this._timeline; e._timeline; ) e = e._timeline;
                      return e === t._rootFramesTimeline;
                  }),
                  (g.rawTime = function (t) {
                      return t && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))
                          ? this._totalTime % (this._duration + this._repeatDelay)
                          : this._paused
                          ? this._totalTime
                          : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
                  }),
                  n
              );
          },
          !0
      ),
      _gsScope._gsDefine(
          "TimelineMax",
          ["TimelineLite", "TweenLite", "easing.Ease"],
          function (t, e, i) {
              var n = function (e) {
                      t.call(this, e), (this._repeat = this.vars.repeat || 0), (this._repeatDelay = this.vars.repeatDelay || 0), (this._cycle = 0), (this._yoyo = this.vars.yoyo === !0), (this._dirty = !0);
                  },
                  r = 1e-10,
                  s = e._internals,
                  o = s.lazyTweens,
                  a = s.lazyRender,
                  l = _gsScope._gsDefine.globals,
                  h = new i(null, null, 1, 0),
                  c = (n.prototype = new t());
              return (
                  (c.constructor = n),
                  (c.kill()._gc = !1),
                  (n.version = "1.19.1"),
                  (c.invalidate = function () {
                      return (this._yoyo = this.vars.yoyo === !0), (this._repeat = this.vars.repeat || 0), (this._repeatDelay = this.vars.repeatDelay || 0), this._uncache(!0), t.prototype.invalidate.call(this);
                  }),
                  (c.addCallback = function (t, i, n, r) {
                      return this.add(e.delayedCall(0, t, n, r), i);
                  }),
                  (c.removeCallback = function (t, e) {
                      if (t)
                          if (null == e) this._kill(null, t);
                          else for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1; ) i[n]._startTime === r && i[n]._enabled(!1, !1);
                      return this;
                  }),
                  (c.removePause = function (e) {
                      return this.removeCallback(t._internals.pauseCallback, e);
                  }),
                  (c.tweenTo = function (t, i) {
                      i = i || {};
                      var n,
                          r,
                          s,
                          o = { ease: h, useFrames: this.usesFrames(), immediateRender: !1 },
                          a = (i.repeat && l.TweenMax) || e;
                      for (r in i) o[r] = i[r];
                      return (
                          (o.time = this._parseTimeOrLabel(t)),
                          (n = Math.abs(Number(o.time) - this._time) / this._timeScale || 0.001),
                          (s = new a(this, n, o)),
                          (o.onStart = function () {
                              s.target.paused(!0),
                                  s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                                  i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || []);
                          }),
                          s
                      );
                  }),
                  (c.tweenFromTo = function (t, e, i) {
                      (i = i || {}), (t = this._parseTimeOrLabel(t)), (i.startAt = { onComplete: this.seek, onCompleteParams: [t], callbackScope: this }), (i.immediateRender = i.immediateRender !== !1);
                      var n = this.tweenTo(e, i);
                      return n.duration(Math.abs(n.vars.time - t) / this._timeScale || 0.001);
                  }),
                  (c.render = function (t, e, i) {
                      this._gc && this._enabled(!0, !1);
                      var n,
                          s,
                          l,
                          h,
                          c,
                          u,
                          f,
                          p,
                          d = this._dirty ? this.totalDuration() : this._totalDuration,
                          m = this._duration,
                          g = this._time,
                          _ = this._totalTime,
                          v = this._startTime,
                          y = this._timeScale,
                          w = this._rawPrevTime,
                          x = this._paused,
                          b = this._cycle;
                      if (t >= d - 1e-7 && t >= 0)
                          this._locked || ((this._totalTime = d), (this._cycle = this._repeat)),
                              this._reversed ||
                                  this._hasPausedChild() ||
                                  ((s = !0),
                                  (h = "onComplete"),
                                  (c = !!this._timeline.autoRemoveChildren),
                                  0 === this._duration && ((0 >= t && t >= -1e-7) || 0 > w || w === r) && w !== t && this._first && ((c = !0), w > r && (h = "onReverseComplete"))),
                              (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                              this._yoyo && 0 !== (1 & this._cycle) ? (this._time = t = 0) : ((this._time = m), (t = m + 1e-4));
                      else if (1e-7 > t)
                          if (
                              (this._locked || (this._totalTime = this._cycle = 0),
                              (this._time = 0),
                              (0 !== g || (0 === m && w !== r && (w > 0 || (0 > t && w >= 0)) && !this._locked)) && ((h = "onReverseComplete"), (s = this._reversed)),
                              0 > t)
                          )
                              (this._active = !1), this._timeline.autoRemoveChildren && this._reversed ? ((c = s = !0), (h = "onReverseComplete")) : w >= 0 && this._first && (c = !0), (this._rawPrevTime = t);
                          else {
                              if (((this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r), 0 === t && s)) for (n = this._first; n && 0 === n._startTime; ) n._duration || (s = !1), (n = n._next);
                              (t = 0), this._initted || (c = !0);
                          }
                      else if (
                          (0 === m && 0 > w && (c = !0),
                          (this._time = this._rawPrevTime = t),
                          this._locked ||
                              ((this._totalTime = t),
                              0 !== this._repeat &&
                                  ((u = m + this._repeatDelay),
                                  (this._cycle = (this._totalTime / u) >> 0),
                                  0 !== this._cycle && this._cycle === this._totalTime / u && t >= _ && this._cycle--,
                                  (this._time = this._totalTime - this._cycle * u),
                                  this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
                                  this._time > m ? ((this._time = m), (t = m + 1e-4)) : this._time < 0 ? (this._time = t = 0) : (t = this._time))),
                          this._hasPause && !this._forcingPlayhead && !e && m > t)
                      ) {
                          if (((t = this._time), t >= g || (this._repeat && b !== this._cycle)))
                              for (n = this._first; n && n._startTime <= t && !f; ) n._duration || "isPause" !== n.data || n.ratio || (0 === n._startTime && 0 === this._rawPrevTime) || (f = n), (n = n._next);
                          else for (n = this._last; n && n._startTime >= t && !f; ) n._duration || ("isPause" === n.data && n._rawPrevTime > 0 && (f = n)), (n = n._prev);
                          f && ((this._time = t = f._startTime), (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                      }
                      if (this._cycle !== b && !this._locked) {
                          var T = this._yoyo && 0 !== (1 & b),
                              C = T === (this._yoyo && 0 !== (1 & this._cycle)),
                              S = this._totalTime,
                              k = this._cycle,
                              P = this._rawPrevTime,
                              E = this._time;
                          if (
                              ((this._totalTime = b * m),
                              this._cycle < b ? (T = !T) : (this._totalTime += m),
                              (this._time = g),
                              (this._rawPrevTime = 0 === m ? w - 1e-4 : w),
                              (this._cycle = b),
                              (this._locked = !0),
                              (g = T ? 0 : m),
                              this.render(g, e, 0 === m),
                              e || this._gc || (this.vars.onRepeat && ((this._cycle = k), (this._locked = !1), this._callback("onRepeat"))),
                              g !== this._time)
                          )
                              return;
                          if ((C && ((this._cycle = b), (this._locked = !0), (g = T ? m + 1e-4 : -1e-4), this.render(g, !0, !1)), (this._locked = !1), this._paused && !x)) return;
                          (this._time = E), (this._totalTime = S), (this._cycle = k), (this._rawPrevTime = P);
                      }
                      if (!((this._time !== g && this._first) || i || c || f)) return void (_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                      if (
                          (this._initted || (this._initted = !0),
                          this._active || (!this._paused && this._totalTime !== _ && t > 0 && (this._active = !0)),
                          0 === _ && this.vars.onStart && ((0 === this._totalTime && this._totalDuration) || e || this._callback("onStart")),
                          (p = this._time),
                          p >= g)
                      )
                          for (n = this._first; n && ((l = n._next), p === this._time && (!this._paused || x)); )
                              (n._active || (n._startTime <= this._time && !n._paused && !n._gc)) &&
                                  (f === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                                  (n = l);
                      else
                          for (n = this._last; n && ((l = n._prev), p === this._time && (!this._paused || x)); ) {
                              if (n._active || (n._startTime <= g && !n._paused && !n._gc)) {
                                  if (f === n) {
                                      for (f = n._prev; f && f.endTime() > this._time; ) f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i), (f = f._prev);
                                      (f = null), this.pause();
                                  }
                                  n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i);
                              }
                              n = l;
                          }
                      this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))),
                          h &&
                              (this._locked ||
                                  this._gc ||
                                  ((v === this._startTime || y !== this._timeScale) &&
                                      (0 === this._time || d >= this.totalDuration()) &&
                                      (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)), !e && this.vars[h] && this._callback(h))));
                  }),
                  (c.getActive = function (t, e, i) {
                      null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                      var n,
                          r,
                          s = [],
                          o = this.getChildren(t, e, i),
                          a = 0,
                          l = o.length;
                      for (n = 0; l > n; n++) (r = o[n]), r.isActive() && (s[a++] = r);
                      return s;
                  }),
                  (c.getLabelAfter = function (t) {
                      t || (0 !== t && (t = this._time));
                      var e,
                          i = this.getLabelsArray(),
                          n = i.length;
                      for (e = 0; n > e; e++) if (i[e].time > t) return i[e].name;
                      return null;
                  }),
                  (c.getLabelBefore = function (t) {
                      null == t && (t = this._time);
                      for (var e = this.getLabelsArray(), i = e.length; --i > -1; ) if (e[i].time < t) return e[i].name;
                      return null;
                  }),
                  (c.getLabelsArray = function () {
                      var t,
                          e = [],
                          i = 0;
                      for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
                      return (
                          e.sort(function (t, e) {
                              return t.time - e.time;
                          }),
                          e
                      );
                  }),
                  (c.invalidate = function () {
                      return (this._locked = !1), t.prototype.invalidate.call(this);
                  }),
                  (c.progress = function (t, e) {
                      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration();
                  }),
                  (c.totalProgress = function (t, e) {
                      return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration();
                  }),
                  (c.totalDuration = function (e) {
                      return arguments.length
                          ? -1 !== this._repeat && e
                              ? this.timeScale(this.totalDuration() / e)
                              : this
                          : (this._dirty && (t.prototype.totalDuration.call(this), (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat)), this._totalDuration);
                  }),
                  (c.time = function (t, e) {
                      return arguments.length
                          ? (this._dirty && this.totalDuration(),
                            t > this._duration && (t = this._duration),
                            this._yoyo && 0 !== (1 & this._cycle) ? (t = this._duration - t + this._cycle * (this._duration + this._repeatDelay)) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                            this.totalTime(t, e))
                          : this._time;
                  }),
                  (c.repeat = function (t) {
                      return arguments.length ? ((this._repeat = t), this._uncache(!0)) : this._repeat;
                  }),
                  (c.repeatDelay = function (t) {
                      return arguments.length ? ((this._repeatDelay = t), this._uncache(!0)) : this._repeatDelay;
                  }),
                  (c.yoyo = function (t) {
                      return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                  }),
                  (c.currentLabel = function (t) {
                      return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
                  }),
                  n
              );
          },
          !0
      ),
      (function () {
          var t = 180 / Math.PI,
              e = [],
              i = [],
              n = [],
              r = {},
              s = _gsScope._gsDefine.globals,
              o = function (t, e, i, n) {
                  i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), (this.a = t), (this.b = e), (this.c = i), (this.d = n), (this.da = n - t), (this.ca = i - t), (this.ba = e - t);
              },
              a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
              l = function (t, e, i, n) {
                  var r = { a: t },
                      s = {},
                      o = {},
                      a = { c: n },
                      l = (t + e) / 2,
                      h = (e + i) / 2,
                      c = (i + n) / 2,
                      u = (l + h) / 2,
                      f = (h + c) / 2,
                      p = (f - u) / 8;
                  return (r.b = l + (t - l) / 4), (s.b = u + p), (r.c = s.a = (r.b + s.b) / 2), (s.c = o.a = (u + f) / 2), (o.b = f - p), (a.b = c + (n - c) / 4), (o.c = a.a = (o.b + a.b) / 2), [r, s, o, a];
              },
              h = function (t, r, s, o, a) {
                  var h,
                      c,
                      u,
                      f,
                      p,
                      d,
                      m,
                      g,
                      _,
                      v,
                      y,
                      w,
                      x,
                      b = t.length - 1,
                      T = 0,
                      C = t[0].a;
                  for (h = 0; b > h; h++)
                      (p = t[T]),
                          (c = p.a),
                          (u = p.d),
                          (f = t[T + 1].d),
                          a
                              ? ((y = e[h]),
                                (w = i[h]),
                                (x = ((w + y) * r * 0.25) / (o ? 0.5 : n[h] || 0.5)),
                                (d = u - (u - c) * (o ? 0.5 * r : 0 !== y ? x / y : 0)),
                                (m = u + (f - u) * (o ? 0.5 * r : 0 !== w ? x / w : 0)),
                                (g = u - (d + (((m - d) * ((3 * y) / (y + w) + 0.5)) / 4 || 0))))
                              : ((d = u - (u - c) * r * 0.5), (m = u + (f - u) * r * 0.5), (g = u - (d + m) / 2)),
                          (d += g),
                          (m += g),
                          (p.c = _ = d),
                          0 !== h ? (p.b = C) : (p.b = C = p.a + 0.6 * (p.c - p.a)),
                          (p.da = u - c),
                          (p.ca = _ - c),
                          (p.ba = C - c),
                          s ? ((v = l(c, C, _, u)), t.splice(T, 1, v[0], v[1], v[2], v[3]), (T += 4)) : T++,
                          (C = m);
                  (p = t[T]), (p.b = C), (p.c = C + 0.4 * (p.d - C)), (p.da = p.d - p.a), (p.ca = p.c - p.a), (p.ba = C - p.a), s && ((v = l(p.a, C, p.c, p.d)), t.splice(T, 1, v[0], v[1], v[2], v[3]));
              },
              c = function (t, n, r, s) {
                  var a,
                      l,
                      h,
                      c,
                      u,
                      f,
                      p = [];
                  if (s) for (t = [s].concat(t), l = t.length; --l > -1; ) "string" == typeof (f = t[l][n]) && "=" === f.charAt(1) && (t[l][n] = s[n] + Number(f.charAt(0) + f.substr(2)));
                  if (((a = t.length - 2), 0 > a)) return (p[0] = new o(t[0][n], 0, 0, t[-1 > a ? 0 : 1][n])), p;
                  for (l = 0; a > l; l++) (h = t[l][n]), (c = t[l + 1][n]), (p[l] = new o(h, 0, 0, c)), r && ((u = t[l + 2][n]), (e[l] = (e[l] || 0) + (c - h) * (c - h)), (i[l] = (i[l] || 0) + (u - c) * (u - c)));
                  return (p[l] = new o(t[l][n], 0, 0, t[l + 1][n])), p;
              },
              u = function (t, s, o, l, u, f) {
                  var p,
                      d,
                      m,
                      g,
                      _,
                      v,
                      y,
                      w,
                      x = {},
                      b = [],
                      T = f || t[0];
                  (u = "string" == typeof u ? "," + u + "," : a), null == s && (s = 1);
                  for (d in t[0]) b.push(d);
                  if (t.length > 1) {
                      for (w = t[t.length - 1], y = !0, p = b.length; --p > -1; )
                          if (((d = b[p]), Math.abs(T[d] - w[d]) > 0.05)) {
                              y = !1;
                              break;
                          }
                      y && ((t = t.concat()), f && t.unshift(f), t.push(t[1]), (f = t[t.length - 3]));
                  }
                  for (e.length = i.length = n.length = 0, p = b.length; --p > -1; ) (d = b[p]), (r[d] = -1 !== u.indexOf("," + d + ",")), (x[d] = c(t, d, r[d], f));
                  for (p = e.length; --p > -1; ) (e[p] = Math.sqrt(e[p])), (i[p] = Math.sqrt(i[p]));
                  if (!l) {
                      for (p = b.length; --p > -1; ) if (r[d]) for (m = x[b[p]], v = m.length - 1, g = 0; v > g; g++) (_ = m[g + 1].da / i[g] + m[g].da / e[g] || 0), (n[g] = (n[g] || 0) + _ * _);
                      for (p = n.length; --p > -1; ) n[p] = Math.sqrt(n[p]);
                  }
                  for (p = b.length, g = o ? 4 : 1; --p > -1; ) (d = b[p]), (m = x[d]), h(m, s, o, l, r[d]), y && (m.splice(0, g), m.splice(m.length - g, g));
                  return x;
              },
              f = function (t, e, i) {
                  e = e || "soft";
                  var n,
                      r,
                      s,
                      a,
                      l,
                      h,
                      c,
                      u,
                      f,
                      p,
                      d,
                      m = {},
                      g = "cubic" === e ? 3 : 2,
                      _ = "soft" === e,
                      v = [];
                  if ((_ && i && (t = [i].concat(t)), null == t || t.length < g + 1)) throw "invalid Bezier data";
                  for (f in t[0]) v.push(f);
                  for (h = v.length; --h > -1; ) {
                      for (f = v[h], m[f] = l = [], p = 0, u = t.length, c = 0; u > c; c++)
                          (n = null == i ? t[c][f] : "string" == typeof (d = t[c][f]) && "=" === d.charAt(1) ? i[f] + Number(d.charAt(0) + d.substr(2)) : Number(d)), _ && c > 1 && u - 1 > c && (l[p++] = (n + l[p - 2]) / 2), (l[p++] = n);
                      for (u = p - g + 1, p = 0, c = 0; u > c; c += g) (n = l[c]), (r = l[c + 1]), (s = l[c + 2]), (a = 2 === g ? 0 : l[c + 3]), (l[p++] = d = 3 === g ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s));
                      l.length = p;
                  }
                  return m;
              },
              p = function (t, e, i) {
                  for (var n, r, s, o, a, l, h, c, u, f, p, d = 1 / i, m = t.length; --m > -1; )
                      for (f = t[m], s = f.a, o = f.d - s, a = f.c - s, l = f.b - s, n = r = 0, c = 1; i >= c; c++)
                          (h = d * c), (u = 1 - h), (n = r - (r = (h * h * o + 3 * u * (h * a + u * l)) * h)), (p = m * i + c - 1), (e[p] = (e[p] || 0) + n * n);
              },
              d = function (t, e) {
                  e = e >> 0 || 6;
                  var i,
                      n,
                      r,
                      s,
                      o = [],
                      a = [],
                      l = 0,
                      h = 0,
                      c = e - 1,
                      u = [],
                      f = [];
                  for (i in t) p(t[i], o, e);
                  for (r = o.length, n = 0; r > n; n++) (l += Math.sqrt(o[n])), (s = n % e), (f[s] = l), s === c && ((h += l), (s = (n / e) >> 0), (u[s] = f), (a[s] = h), (l = 0), (f = []));
                  return { length: h, lengths: a, segments: u };
              },
              m = _gsScope._gsDefine.plugin({
                  propName: "bezier",
                  priority: -1,
                  version: "1.3.7",
                  API: 2,
                  global: !0,
                  init: function (t, e, i) {
                      (this._target = t), e instanceof Array && (e = { values: e }), (this._func = {}), (this._mod = {}), (this._props = []), (this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
                      var n,
                          r,
                          s,
                          o,
                          a,
                          l = e.values || [],
                          h = {},
                          c = l[0],
                          p = e.autoRotate || i.vars.orientToBezier;
                      this._autoRotate = p ? (p instanceof Array ? p : [["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]]) : null;
                      for (n in c) this._props.push(n);
                      for (s = this._props.length; --s > -1; )
                          (n = this._props[s]),
                              this._overwriteProps.push(n),
                              (r = this._func[n] = "function" == typeof t[n]),
                              (h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n])),
                              a || (h[n] !== l[0][n] && (a = h));
                      if (
                          ((this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : f(l, e.type, h)),
                          (this._segCount = this._beziers[n].length),
                          this._timeRes)
                      ) {
                          var m = d(this._beziers, this._timeRes);
                          (this._length = m.length),
                              (this._lengths = m.lengths),
                              (this._segments = m.segments),
                              (this._l1 = this._li = this._s1 = this._si = 0),
                              (this._l2 = this._lengths[0]),
                              (this._curSeg = this._segments[0]),
                              (this._s2 = this._curSeg[0]),
                              (this._prec = 1 / this._curSeg.length);
                      }
                      if ((p = this._autoRotate))
                          for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1; ) {
                              for (o = 0; 3 > o; o++) (n = p[s][o]), (this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]);
                              (n = p[s][2]), (this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0), this._overwriteProps.push(n);
                          }
                      return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
                  },
                  set: function (e) {
                      var i,
                          n,
                          r,
                          s,
                          o,
                          a,
                          l,
                          h,
                          c,
                          u,
                          f = this._segCount,
                          p = this._func,
                          d = this._target,
                          m = e !== this._startRatio;
                      if (this._timeRes) {
                          if (((c = this._lengths), (u = this._curSeg), (e *= this._length), (r = this._li), e > this._l2 && f - 1 > r)) {
                              for (h = f - 1; h > r && (this._l2 = c[++r]) <= e; );
                              (this._l1 = c[r - 1]), (this._li = r), (this._curSeg = u = this._segments[r]), (this._s2 = u[(this._s1 = this._si = 0)]);
                          } else if (e < this._l1 && r > 0) {
                              for (; r > 0 && (this._l1 = c[--r]) >= e; );
                              0 === r && e < this._l1 ? (this._l1 = 0) : r++, (this._l2 = c[r]), (this._li = r), (this._curSeg = u = this._segments[r]), (this._s1 = u[(this._si = u.length - 1) - 1] || 0), (this._s2 = u[this._si]);
                          }
                          if (((i = r), (e -= this._l1), (r = this._si), e > this._s2 && r < u.length - 1)) {
                              for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= e; );
                              (this._s1 = u[r - 1]), (this._si = r);
                          } else if (e < this._s1 && r > 0) {
                              for (; r > 0 && (this._s1 = u[--r]) >= e; );
                              0 === r && e < this._s1 ? (this._s1 = 0) : r++, (this._s2 = u[r]), (this._si = r);
                          }
                          a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
                      } else (i = 0 > e ? 0 : e >= 1 ? f - 1 : (f * e) >> 0), (a = (e - i * (1 / f)) * f);
                      for (n = 1 - a, r = this._props.length; --r > -1; )
                          (s = this._props[r]), (o = this._beziers[s][i]), (l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a), this._mod[s] && (l = this._mod[s](l, d)), p[s] ? d[s](l) : (d[s] = l);
                      if (this._autoRotate) {
                          var g,
                              _,
                              v,
                              y,
                              w,
                              x,
                              b,
                              T = this._autoRotate;
                          for (r = T.length; --r > -1; )
                              (s = T[r][2]),
                                  (x = T[r][3] || 0),
                                  (b = T[r][4] === !0 ? 1 : t),
                                  (o = this._beziers[T[r][0]]),
                                  (g = this._beziers[T[r][1]]),
                                  o &&
                                      g &&
                                      ((o = o[i]),
                                      (g = g[i]),
                                      (_ = o.a + (o.b - o.a) * a),
                                      (y = o.b + (o.c - o.b) * a),
                                      (_ += (y - _) * a),
                                      (y += (o.c + (o.d - o.c) * a - y) * a),
                                      (v = g.a + (g.b - g.a) * a),
                                      (w = g.b + (g.c - g.b) * a),
                                      (v += (w - v) * a),
                                      (w += (g.c + (g.d - g.c) * a - w) * a),
                                      (l = m ? Math.atan2(w - v, y - _) * b + x : this._initialRotations[r]),
                                      this._mod[s] && (l = this._mod[s](l, d)),
                                      p[s] ? d[s](l) : (d[s] = l));
                      }
                  },
              }),
              g = m.prototype;
          (m.bezierThrough = u),
              (m.cubicToQuadratic = l),
              (m._autoCSS = !0),
              (m.quadraticToCubic = function (t, e, i) {
                  return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
              }),
              (m._cssRegister = function () {
                  var t = s.CSSPlugin;
                  if (t) {
                      var e = t._internals,
                          i = e._parseToProxy,
                          n = e._setPluginRatio,
                          r = e.CSSPropTween;
                      e._registerComplexSpecialProp("bezier", {
                          parser: function (t, e, s, o, a, l) {
                              e instanceof Array && (e = { values: e }), (l = new m());
                              var h,
                                  c,
                                  u,
                                  f = e.values,
                                  p = f.length - 1,
                                  d = [],
                                  g = {};
                              if (0 > p) return a;
                              for (h = 0; p >= h; h++) (u = i(t, f[h], o, a, l, p !== h)), (d[h] = u.end);
                              for (c in e) g[c] = e[c];
                              return (
                                  (g.values = d),
                                  (a = new r(t, "bezier", 0, 0, u.pt, 2)),
                                  (a.data = u),
                                  (a.plugin = l),
                                  (a.setRatio = n),
                                  0 === g.autoRotate && (g.autoRotate = !0),
                                  !g.autoRotate ||
                                      g.autoRotate instanceof Array ||
                                      ((h = g.autoRotate === !0 ? 0 : Number(g.autoRotate)), (g.autoRotate = null != u.end.left ? [["left", "top", "rotation", h, !1]] : null != u.end.x && [["x", "y", "rotation", h, !1]])),
                                  g.autoRotate && (o._transform || o._enableTransforms(!1), (u.autoRotate = o._target._gsTransform), (u.proxy.rotation = u.autoRotate.rotation || 0), o._overwriteProps.push("rotation")),
                                  l._onInitTween(u.proxy, g, o._tween),
                                  a
                              );
                          },
                      });
                  }
              }),
              (g._mod = function (t) {
                  for (var e, i = this._overwriteProps, n = i.length; --n > -1; ) (e = t[i[n]]), e && "function" == typeof e && (this._mod[i[n]] = e);
              }),
              (g._kill = function (t) {
                  var e,
                      i,
                      n = this._props;
                  for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1; ) n[i] === e && n.splice(i, 1);
                  if ((n = this._autoRotate)) for (i = n.length; --i > -1; ) t[n[i][2]] && n.splice(i, 1);
                  return this._super._kill.call(this, t);
              });
      })(),
      _gsScope._gsDefine(
          "plugins.CSSPlugin",
          ["plugins.TweenPlugin", "TweenLite"],
          function (t, e) {
              var i,
                  n,
                  r,
                  s,
                  o = function () {
                      t.call(this, "css"), (this._overwriteProps.length = 0), (this.setRatio = o.prototype.setRatio);
                  },
                  a = _gsScope._gsDefine.globals,
                  l = {},
                  h = (o.prototype = new t("css"));
              (h.constructor = o),
                  (o.version = "1.19.1"),
                  (o.API = 2),
                  (o.defaultTransformPerspective = 0),
                  (o.defaultSkewType = "compensated"),
                  (o.defaultSmoothOrigin = !0),
                  (h = "px"),
                  (o.suffixMap = { top: h, right: h, bottom: h, left: h, width: h, height: h, fontSize: h, padding: h, margin: h, perspective: h, lineHeight: "" });
              var c,
                  u,
                  f,
                  p,
                  d,
                  m,
                  g,
                  _,
                  v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                  y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                  w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                  x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                  b = /(?:\d|\-|\+|=|#|\.)*/g,
                  T = /opacity *= *([^)]*)/i,
                  C = /opacity:([^;]*)/i,
                  S = /alpha\(opacity *=.+?\)/i,
                  k = /^(rgb|hsl)/,
                  P = /([A-Z])/g,
                  E = /-([a-z])/gi,
                  A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                  O = function (t, e) {
                      return e.toUpperCase();
                  },
                  $ = /(?:Left|Right|Width)/i,
                  D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                  N = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                  R = /,(?=[^\)]*(?:\(|$))/gi,
                  M = /[\s,\(]/i,
                  L = Math.PI / 180,
                  z = 180 / Math.PI,
                  j = {},
                  F = { style: {} },
                  I = _gsScope.document || {
                      createElement: function () {
                          return F;
                      },
                  },
                  H = function (t, e) {
                      return I.createElementNS ? I.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : I.createElement(t);
                  },
                  B = H("div"),
                  q = H("img"),
                  W = (o._internals = { _specialProps: l }),
                  X = (_gsScope.navigator || {}).userAgent || "",
                  Y = (function () {
                      var t = X.indexOf("Android"),
                          e = H("a");
                      return (
                          (f = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === t || parseFloat(X.substr(t + 8, 2)) > 3)),
                          (d = f && parseFloat(X.substr(X.indexOf("Version/") + 8, 2)) < 6),
                          (p = -1 !== X.indexOf("Firefox")),
                          (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (m = parseFloat(RegExp.$1)),
                          !!e && ((e.style.cssText = "top:1px;opacity:.55;"), /^0.55/.test(e.style.opacity))
                      );
                  })(),
                  U = function (t) {
                      return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
                  },
                  V = function (t) {
                      _gsScope.console && console.log(t);
                  },
                  G = "",
                  Q = "",
                  Z = function (t, e) {
                      e = e || B;
                      var i,
                          n,
                          r = e.style;
                      if (void 0 !== r[t]) return t;
                      for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t]; );
                      return n >= 0 ? ((Q = 3 === n ? "ms" : i[n]), (G = "-" + Q.toLowerCase() + "-"), Q + t) : null;
                  },
                  J = I.defaultView ? I.defaultView.getComputedStyle : function () {},
                  K = (o.getStyle = function (t, e, i, n, r) {
                      var s;
                      return Y || "opacity" !== e
                          ? (!n && t.style[e] ? (s = t.style[e]) : (i = i || J(t)) ? (s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase())) : t.currentStyle && (s = t.currentStyle[e]),
                            null == r || (s && "none" !== s && "auto" !== s && "auto auto" !== s) ? s : r)
                          : U(t);
                  }),
                  tt = (W.convertToPixels = function (t, i, n, r, s) {
                      if ("px" === r || !r) return n;
                      if ("auto" === r || !n) return 0;
                      var a,
                          l,
                          h,
                          c = $.test(i),
                          u = t,
                          f = B.style,
                          p = 0 > n,
                          d = 1 === n;
                      if ((p && (n = -n), d && (n *= 100), "%" === r && -1 !== i.indexOf("border"))) a = (n / 100) * (c ? t.clientWidth : t.clientHeight);
                      else {
                          if (((f.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;"), "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r)) f[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                          else {
                              if (((u = t.parentNode || I.body), (l = u._gsCache), (h = e.ticker.frame), l && c && l.time === h)) return (l.width * n) / 100;
                              f[c ? "width" : "height"] = n + r;
                          }
                          u.appendChild(B),
                              (a = parseFloat(B[c ? "offsetWidth" : "offsetHeight"])),
                              u.removeChild(B),
                              c && "%" === r && o.cacheWidths !== !1 && ((l = u._gsCache = u._gsCache || {}), (l.time = h), (l.width = (a / n) * 100)),
                              0 !== a || s || (a = tt(t, i, n, r, !0));
                      }
                      return d && (a /= 100), p ? -a : a;
                  }),
                  et = (W.calculateOffset = function (t, e, i) {
                      if ("absolute" !== K(t, "position", i)) return 0;
                      var n = "left" === e ? "Left" : "Top",
                          r = K(t, "margin" + n, i);
                      return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(b, "")) || 0);
                  }),
                  it = function (t, e) {
                      var i,
                          n,
                          r,
                          s = {};
                      if ((e = e || J(t, null)))
                          if ((i = e.length)) for (; --i > -1; ) (r = e[i]), (-1 === r.indexOf("-transform") || At === r) && (s[r.replace(E, O)] = e.getPropertyValue(r));
                          else for (i in e) (-1 === i.indexOf("Transform") || Et === i) && (s[i] = e[i]);
                      else if ((e = t.currentStyle || t.style)) for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(E, O)] = e[i]);
                      return (
                          Y || (s.opacity = U(t)),
                          (n = qt(t, e, !1)),
                          (s.rotation = n.rotation),
                          (s.skewX = n.skewX),
                          (s.scaleX = n.scaleX),
                          (s.scaleY = n.scaleY),
                          (s.x = n.x),
                          (s.y = n.y),
                          $t && ((s.z = n.z), (s.rotationX = n.rotationX), (s.rotationY = n.rotationY), (s.scaleZ = n.scaleZ)),
                          s.filters && delete s.filters,
                          s
                      );
                  },
                  nt = function (t, e, i, n, r) {
                      var s,
                          o,
                          a,
                          l = {},
                          h = t.style;
                      for (o in i)
                          "cssText" !== o &&
                              "length" !== o &&
                              isNaN(o) &&
                              (e[o] !== (s = i[o]) || (r && r[o])) &&
                              -1 === o.indexOf("Origin") &&
                              ("number" == typeof s || "string" == typeof s) &&
                              ((l[o] = "auto" !== s || ("left" !== o && "top" !== o) ? (("" !== s && "auto" !== s && "none" !== s) || "string" != typeof e[o] || "" === e[o].replace(x, "") ? s : 0) : et(t, o)),
                              void 0 !== h[o] && (a = new vt(h, o, h[o], a)));
                      if (n) for (o in n) "className" !== o && (l[o] = n[o]);
                      return { difs: l, firstMPT: a };
                  },
                  rt = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
                  st = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                  ot = function (t, e, i) {
                      if ("svg" === (t.nodeName + "").toLowerCase()) return (i || J(t))[e] || 0;
                      if (t.getCTM && It(t)) return t.getBBox()[e] || 0;
                      var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                          r = rt[e],
                          s = r.length;
                      for (i = i || J(t, null); --s > -1; ) (n -= parseFloat(K(t, "padding" + r[s], i, !0)) || 0), (n -= parseFloat(K(t, "border" + r[s] + "Width", i, !0)) || 0);
                      return n;
                  },
                  at = function (t, e) {
                      if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                      (null == t || "" === t) && (t = "0 0");
                      var i,
                          n = t.split(" "),
                          r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                          s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                      if (n.length > 3 && !e) {
                          for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(at(n[i]));
                          return t.join(",");
                      }
                      return (
                          null == s ? (s = "center" === r ? "50%" : "0") : "center" === s && (s = "50%"),
                          ("center" === r || (isNaN(parseFloat(r)) && -1 === (r + "").indexOf("="))) && (r = "50%"),
                          (t = r + " " + s + (n.length > 2 ? " " + n[2] : "")),
                          e &&
                              ((e.oxp = -1 !== r.indexOf("%")),
                              (e.oyp = -1 !== s.indexOf("%")),
                              (e.oxr = "=" === r.charAt(1)),
                              (e.oyr = "=" === s.charAt(1)),
                              (e.ox = parseFloat(r.replace(x, ""))),
                              (e.oy = parseFloat(s.replace(x, ""))),
                              (e.v = t)),
                          e || t
                      );
                  },
                  lt = function (t, e) {
                      return "function" == typeof t && (t = t(_, g)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0;
                  },
                  ht = function (t, e) {
                      return "function" == typeof t && (t = t(_, g)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0;
                  },
                  ct = function (t, e, i, n) {
                      var r,
                          s,
                          o,
                          a,
                          l,
                          h = 1e-6;
                      return (
                          "function" == typeof t && (t = t(_, g)),
                          null == t
                              ? (a = e)
                              : "number" == typeof t
                              ? (a = t)
                              : ((r = 360),
                                (s = t.split("_")),
                                (l = "=" === t.charAt(1)),
                                (o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : z) - (l ? 0 : e)),
                                s.length &&
                                    (n && (n[i] = e + o),
                                    -1 !== t.indexOf("short") && ((o %= r), o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)),
                                    -1 !== t.indexOf("_cw") && 0 > o ? (o = ((o + 9999999999 * r) % r) - ((o / r) | 0) * r) : -1 !== t.indexOf("ccw") && o > 0 && (o = ((o - 9999999999 * r) % r) - ((o / r) | 0) * r)),
                                (a = e + o)),
                          h > a && a > -h && (a = 0),
                          a
                      );
                  },
                  ut = {
                      aqua: [0, 255, 255],
                      lime: [0, 255, 0],
                      silver: [192, 192, 192],
                      black: [0, 0, 0],
                      maroon: [128, 0, 0],
                      teal: [0, 128, 128],
                      blue: [0, 0, 255],
                      navy: [0, 0, 128],
                      white: [255, 255, 255],
                      fuchsia: [255, 0, 255],
                      olive: [128, 128, 0],
                      yellow: [255, 255, 0],
                      orange: [255, 165, 0],
                      gray: [128, 128, 128],
                      purple: [128, 0, 128],
                      green: [0, 128, 0],
                      red: [255, 0, 0],
                      pink: [255, 192, 203],
                      cyan: [0, 255, 255],
                      transparent: [255, 255, 255, 0],
                  },
                  ft = function (t, e, i) {
                      return (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t), (255 * (1 > 6 * t ? e + (i - e) * t * 6 : 0.5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + 0.5) | 0;
                  },
                  pt = (o.parseColor = function (t, e) {
                      var i, n, r, s, o, a, l, h, c, u, f;
                      if (t)
                          if ("number" == typeof t) i = [t >> 16, (t >> 8) & 255, 255 & t];
                          else {
                              if (("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t])) i = ut[t];
                              else if ("#" === t.charAt(0))
                                  4 === t.length && ((n = t.charAt(1)), (r = t.charAt(2)), (s = t.charAt(3)), (t = "#" + n + n + r + r + s + s)), (t = parseInt(t.substr(1), 16)), (i = [t >> 16, (t >> 8) & 255, 255 & t]);
                              else if ("hsl" === t.substr(0, 3))
                                  if (((i = f = t.match(v)), e)) {
                                      if (-1 !== t.indexOf("=")) return t.match(y);
                                  } else
                                      (o = (Number(i[0]) % 360) / 360),
                                          (a = Number(i[1]) / 100),
                                          (l = Number(i[2]) / 100),
                                          (r = 0.5 >= l ? l * (a + 1) : l + a - l * a),
                                          (n = 2 * l - r),
                                          i.length > 3 && (i[3] = Number(t[3])),
                                          (i[0] = ft(o + 1 / 3, n, r)),
                                          (i[1] = ft(o, n, r)),
                                          (i[2] = ft(o - 1 / 3, n, r));
                              else i = t.match(v) || ut.transparent;
                              (i[0] = Number(i[0])), (i[1] = Number(i[1])), (i[2] = Number(i[2])), i.length > 3 && (i[3] = Number(i[3]));
                          }
                      else i = ut.black;
                      return (
                          e &&
                              !f &&
                              ((n = i[0] / 255),
                              (r = i[1] / 255),
                              (s = i[2] / 255),
                              (h = Math.max(n, r, s)),
                              (c = Math.min(n, r, s)),
                              (l = (h + c) / 2),
                              h === c ? (o = a = 0) : ((u = h - c), (a = l > 0.5 ? u / (2 - h - c) : u / (h + c)), (o = h === n ? (r - s) / u + (s > r ? 6 : 0) : h === r ? (s - n) / u + 2 : (n - r) / u + 4), (o *= 60)),
                              (i[0] = (o + 0.5) | 0),
                              (i[1] = (100 * a + 0.5) | 0),
                              (i[2] = (100 * l + 0.5) | 0)),
                          i
                      );
                  }),
                  dt = function (t, e) {
                      var i,
                          n,
                          r,
                          s = t.match(mt) || [],
                          o = 0,
                          a = s.length ? "" : t;
                      for (i = 0; i < s.length; i++)
                          (n = s[i]),
                              (r = t.substr(o, t.indexOf(n, o) - o)),
                              (o += r.length + n.length),
                              (n = pt(n, e)),
                              3 === n.length && n.push(1),
                              (a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")");
                      return a + t.substr(o);
                  },
                  mt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
              for (h in ut) mt += "|" + h + "\\b";
              (mt = new RegExp(mt + ")", "gi")),
                  (o.colorStringFilter = function (t) {
                      var e,
                          i = t[0] + t[1];
                      mt.test(i) && ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")), (t[0] = dt(t[0], e)), (t[1] = dt(t[1], e))), (mt.lastIndex = 0);
                  }),
                  e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
              var gt = function (t, e, i, n) {
                      if (null == t)
                          return function (t) {
                              return t;
                          };
                      var r,
                          s = e ? (t.match(mt) || [""])[0] : "",
                          o = t.split(s).join("").match(w) || [],
                          a = t.substr(0, t.indexOf(o[0])),
                          l = ")" === t.charAt(t.length - 1) ? ")" : "",
                          h = -1 !== t.indexOf(" ") ? " " : ",",
                          c = o.length,
                          u = c > 0 ? o[0].replace(v, "") : "";
                      return c
                          ? (r = e
                                ? function (t) {
                                      var e, f, p, d;
                                      if ("number" == typeof t) t += u;
                                      else if (n && R.test(t)) {
                                          for (d = t.replace(R, "|").split("|"), p = 0; p < d.length; p++) d[p] = r(d[p]);
                                          return d.join(",");
                                      }
                                      if (((e = (t.match(mt) || [s])[0]), (f = t.split(e).join("").match(w) || []), (p = f.length), c > p--)) for (; ++p < c; ) f[p] = i ? f[((p - 1) / 2) | 0] : o[p];
                                      return a + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "");
                                  }
                                : function (t) {
                                      var e, s, f;
                                      if ("number" == typeof t) t += u;
                                      else if (n && R.test(t)) {
                                          for (s = t.replace(R, "|").split("|"), f = 0; f < s.length; f++) s[f] = r(s[f]);
                                          return s.join(",");
                                      }
                                      if (((e = t.match(w) || []), (f = e.length), c > f--)) for (; ++f < c; ) e[f] = i ? e[((f - 1) / 2) | 0] : o[f];
                                      return a + e.join(h) + l;
                                  })
                          : function (t) {
                                return t;
                            };
                  },
                  _t = function (t) {
                      return (
                          (t = t.split(",")),
                          function (e, i, n, r, s, o, a) {
                              var l,
                                  h = (i + "").split(" ");
                              for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                              return r.parse(e, a, s, o);
                          }
                      );
                  },
                  vt =
                      ((W._setPluginRatio = function (t) {
                          this.plugin.setRatio(t);
                          for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l; ) (e = a[l.v]), l.r ? (e = Math.round(e)) : h > e && e > -h && (e = 0), (l.t[l.p] = e), (l = l._next);
                          if ((o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === t || 0 === t))
                              for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l; ) {
                                  if (((i = l.t), i.type)) {
                                      if (1 === i.type) {
                                          for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                          i[s] = r;
                                      }
                                  } else i[s] = i.s + i.xs0;
                                  l = l._next;
                              }
                      }),
                      function (t, e, i, n, r) {
                          (this.t = t), (this.p = e), (this.v = i), (this.r = r), n && ((n._prev = this), (this._next = n));
                      }),
                  yt =
                      ((W._parseToProxy = function (t, e, i, n, r, s) {
                          var o,
                              a,
                              l,
                              h,
                              c,
                              u = n,
                              f = {},
                              p = {},
                              d = i._transform,
                              m = j;
                          for (i._transform = null, j = e, n = c = i.parse(t, e, n, r), j = m, s && ((i._transform = d), u && ((u._prev = null), u._prev && (u._prev._next = null))); n && n !== u; ) {
                              if (n.type <= 1 && ((a = n.p), (p[a] = n.s + n.c), (f[a] = n.s), s || ((h = new vt(n, "s", a, h, n.r)), (n.c = 0)), 1 === n.type))
                                  for (o = n.l; --o > 0; ) (l = "xn" + o), (a = n.p + "_" + l), (p[a] = n.data[l]), (f[a] = n[l]), s || (h = new vt(n, l, a, h, n.rxp[l]));
                              n = n._next;
                          }
                          return { proxy: f, end: p, firstMPT: h, pt: c };
                      }),
                      (W.CSSPropTween = function (t, e, n, r, o, a, l, h, c, u, f) {
                          (this.t = t),
                              (this.p = e),
                              (this.s = n),
                              (this.c = r),
                              (this.n = l || e),
                              t instanceof yt || s.push(this.n),
                              (this.r = h),
                              (this.type = a || 0),
                              c && ((this.pr = c), (i = !0)),
                              (this.b = void 0 === u ? n : u),
                              (this.e = void 0 === f ? n + r : f),
                              o && ((this._next = o), (o._prev = this));
                      })),
                  wt = function (t, e, i, n, r, s) {
                      var o = new yt(t, e, i, n - i, r, -1, s);
                      return (o.b = i), (o.e = o.xs0 = n), o;
                  },
                  xt = (o.parseComplex = function (t, e, i, n, r, s, a, l, h, u) {
                      (i = i || s || ""),
                          "function" == typeof n && (n = n(_, g)),
                          (a = new yt(t, e, 0, 0, a, u ? 2 : 1, null, !1, l, i, n)),
                          (n += ""),
                          r && mt.test(n + i) && ((n = [i, n]), o.colorStringFilter(n), (i = n[0]), (n = n[1]));
                      var f,
                          p,
                          d,
                          m,
                          w,
                          x,
                          b,
                          T,
                          C,
                          S,
                          k,
                          P,
                          E,
                          A = i.split(", ").join(",").split(" "),
                          O = n.split(", ").join(",").split(" "),
                          $ = A.length,
                          D = c !== !1;
                      for (
                          (-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && ((A = A.join(" ").replace(R, ", ").split(" ")), (O = O.join(" ").replace(R, ", ").split(" ")), ($ = A.length)),
                              $ !== O.length && ((A = (s || "").split(" ")), ($ = A.length)),
                              a.plugin = h,
                              a.setRatio = u,
                              mt.lastIndex = 0,
                              f = 0;
                          $ > f;
                          f++
                      )
                          if (((m = A[f]), (w = O[f]), (T = parseFloat(m)), T || 0 === T)) a.appendXtra("", T, lt(w, T), w.replace(y, ""), D && -1 !== w.indexOf("px"), !0);
                          else if (r && mt.test(m))
                              (P = w.indexOf(")") + 1),
                                  (P = ")" + (P ? w.substr(P) : "")),
                                  (E = -1 !== w.indexOf("hsl") && Y),
                                  (m = pt(m, E)),
                                  (w = pt(w, E)),
                                  (C = m.length + w.length > 6),
                                  C && !Y && 0 === w[3]
                                      ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"), (a.e = a.e.split(O[f]).join("transparent")))
                                      : (Y || (C = !1),
                                        E
                                            ? a
                                                  .appendXtra(C ? "hsla(" : "hsl(", m[0], lt(w[0], m[0]), ",", !1, !0)
                                                  .appendXtra("", m[1], lt(w[1], m[1]), "%,", !1)
                                                  .appendXtra("", m[2], lt(w[2], m[2]), C ? "%," : "%" + P, !1)
                                            : a
                                                  .appendXtra(C ? "rgba(" : "rgb(", m[0], w[0] - m[0], ",", !0, !0)
                                                  .appendXtra("", m[1], w[1] - m[1], ",", !0)
                                                  .appendXtra("", m[2], w[2] - m[2], C ? "," : P, !0),
                                        C && ((m = m.length < 4 ? 1 : m[3]), a.appendXtra("", m, (w.length < 4 ? 1 : w[3]) - m, P, !1))),
                                  (mt.lastIndex = 0);
                          else if ((x = m.match(v))) {
                              if (((b = w.match(y)), !b || b.length !== x.length)) return a;
                              for (d = 0, p = 0; p < x.length; p++) (k = x[p]), (S = m.indexOf(k, d)), a.appendXtra(m.substr(d, S - d), Number(k), lt(b[p], k), "", D && "px" === m.substr(S + k.length, 2), 0 === p), (d = S + k.length);
                              a["xs" + a.l] += m.substr(d);
                          } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + w : w;
                      if (-1 !== n.indexOf("=") && a.data) {
                          for (P = a.xs0 + a.data.s, f = 1; f < a.l; f++) P += a["xs" + f] + a.data["xn" + f];
                          a.e = P + a["xs" + f];
                      }
                      return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
                  }),
                  bt = 9;
              for (h = yt.prototype, h.l = h.pr = 0; --bt > 0; ) (h["xn" + bt] = 0), (h["xs" + bt] = "");
              (h.xs0 = ""),
                  (h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null),
                  (h.appendXtra = function (t, e, i, n, r, s) {
                      var o = this,
                          a = o.l;
                      return (
                          (o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || ""),
                          i || 0 === a || o.plugin
                              ? (o.l++,
                                (o.type = o.setRatio ? 2 : 1),
                                (o["xs" + o.l] = n || ""),
                                a > 0
                                    ? ((o.data["xn" + a] = e + i), (o.rxp["xn" + a] = r), (o["xn" + a] = e), o.plugin || ((o.xfirst = new yt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr)), (o.xfirst.xs0 = 0)), o)
                                    : ((o.data = { s: e + i }), (o.rxp = {}), (o.s = e), (o.c = i), (o.r = r), o))
                              : ((o["xs" + a] += e + (n || "")), o)
                      );
                  });
              var Tt = function (t, e) {
                      (e = e || {}),
                          (this.p = e.prefix ? Z(t) || t : t),
                          (l[t] = l[this.p] = this),
                          (this.format = e.formatter || gt(e.defaultValue, e.color, e.collapsible, e.multi)),
                          e.parser && (this.parse = e.parser),
                          (this.clrs = e.color),
                          (this.multi = e.multi),
                          (this.keyword = e.keyword),
                          (this.dflt = e.defaultValue),
                          (this.pr = e.priority || 0);
                  },
                  Ct = (W._registerComplexSpecialProp = function (t, e, i) {
                      "object" != typeof e && (e = { parser: i });
                      var n,
                          r,
                          s = t.split(","),
                          o = e.defaultValue;
                      for (i = i || [o], n = 0; n < s.length; n++) (e.prefix = 0 === n && e.prefix), (e.defaultValue = i[n] || o), (r = new Tt(s[n], e));
                  }),
                  St = (W._registerPluginProp = function (t) {
                      if (!l[t]) {
                          var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                          Ct(t, {
                              parser: function (t, i, n, r, s, o, h) {
                                  var c = a.com.greensock.plugins[e];
                                  return c ? (c._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (V("Error: " + e + " js file not loaded."), s);
                              },
                          });
                      }
                  });
              (h = Tt.prototype),
                  (h.parseComplex = function (t, e, i, n, r, s) {
                      var o,
                          a,
                          l,
                          h,
                          c,
                          u,
                          f = this.keyword;
                      if ((this.multi && (R.test(i) || R.test(e) ? ((a = e.replace(R, "|").split("|")), (l = i.replace(R, "|").split("|"))) : f && ((a = [e]), (l = [i]))), l)) {
                          for (h = l.length > a.length ? l.length : a.length, o = 0; h > o; o++)
                              (e = a[o] = a[o] || this.dflt), (i = l[o] = l[o] || this.dflt), f && ((c = e.indexOf(f)), (u = i.indexOf(f)), c !== u && (-1 === u ? (a[o] = a[o].split(f).join("")) : -1 === c && (a[o] += " " + f)));
                          (e = a.join(", ")), (i = l.join(", "));
                      }
                      return xt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s);
                  }),
                  (h.parse = function (t, e, i, n, s, o, a) {
                      return this.parseComplex(t.style, this.format(K(t, this.p, r, !1, this.dflt)), this.format(e), s, o);
                  }),
                  (o.registerSpecialProp = function (t, e, i) {
                      Ct(t, {
                          parser: function (t, n, r, s, o, a, l) {
                              var h = new yt(t, r, 0, 0, o, 2, r, !1, i);
                              return (h.plugin = a), (h.setRatio = e(t, n, s._tween, r)), h;
                          },
                          priority: i,
                      });
                  }),
                  (o.useSVGTransformAttr = !0);
              var kt,
                  Pt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                  Et = Z("transform"),
                  At = G + "transform",
                  Ot = Z("transformOrigin"),
                  $t = null !== Z("perspective"),
                  Dt = (W.Transform = function () {
                      (this.perspective = parseFloat(o.defaultTransformPerspective) || 0), (this.force3D = !(o.defaultForce3D === !1 || !$t) && (o.defaultForce3D || "auto"));
                  }),
                  Nt = _gsScope.SVGElement,
                  Rt = function (t, e, i) {
                      var n,
                          r = I.createElementNS("http://www.w3.org/2000/svg", t),
                          s = /([a-z])([A-Z])/g;
                      for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                      return e.appendChild(r), r;
                  },
                  Mt = I.documentElement || {},
                  Lt = (function () {
                      var t,
                          e,
                          i,
                          n = m || (/Android/i.test(X) && !_gsScope.chrome);
                      return (
                          I.createElementNS &&
                              !n &&
                              ((t = Rt("svg", Mt)),
                              (e = Rt("rect", t, { width: 100, height: 50, x: 100 })),
                              (i = e.getBoundingClientRect().width),
                              (e.style[Ot] = "50% 50%"),
                              (e.style[Et] = "scaleX(0.5)"),
                              (n = i === e.getBoundingClientRect().width && !(p && $t)),
                              Mt.removeChild(t)),
                          n
                      );
                  })(),
                  zt = function (t, e, i, n, r, s) {
                      var a,
                          l,
                          h,
                          c,
                          u,
                          f,
                          p,
                          d,
                          m,
                          g,
                          _,
                          v,
                          y,
                          w,
                          x = t._gsTransform,
                          b = Bt(t, !0);
                      x && ((y = x.xOrigin), (w = x.yOrigin)),
                          (!n || (a = n.split(" ")).length < 2) &&
                              ((p = t.getBBox()),
                              0 === p.x &&
                                  0 === p.y &&
                                  p.width + p.height === 0 &&
                                  (p = {
                                      x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                                      y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                                      width: 0,
                                      height: 0,
                                  }),
                              (e = at(e).split(" ")),
                              (a = [(-1 !== e[0].indexOf("%") ? (parseFloat(e[0]) / 100) * p.width : parseFloat(e[0])) + p.x, (-1 !== e[1].indexOf("%") ? (parseFloat(e[1]) / 100) * p.height : parseFloat(e[1])) + p.y])),
                          (i.xOrigin = c = parseFloat(a[0])),
                          (i.yOrigin = u = parseFloat(a[1])),
                          n &&
                              b !== Ht &&
                              ((f = b[0]),
                              (p = b[1]),
                              (d = b[2]),
                              (m = b[3]),
                              (g = b[4]),
                              (_ = b[5]),
                              (v = f * m - p * d),
                              v && ((l = c * (m / v) + u * (-d / v) + (d * _ - m * g) / v), (h = c * (-p / v) + u * (f / v) - (f * _ - p * g) / v), (c = i.xOrigin = a[0] = l), (u = i.yOrigin = a[1] = h))),
                          x &&
                              (s && ((i.xOffset = x.xOffset), (i.yOffset = x.yOffset), (x = i)),
                              r || (r !== !1 && o.defaultSmoothOrigin !== !1) ? ((l = c - y), (h = u - w), (x.xOffset += l * b[0] + h * b[2] - l), (x.yOffset += l * b[1] + h * b[3] - h)) : (x.xOffset = x.yOffset = 0)),
                          s || t.setAttribute("data-svg-origin", a.join(" "));
                  },
                  jt = function (t) {
                      var e,
                          i = H("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                          n = this.parentNode,
                          r = this.nextSibling,
                          s = this.style.cssText;
                      if ((Mt.appendChild(i), i.appendChild(this), (this.style.display = "block"), t))
                          try {
                              (e = this.getBBox()), (this._originalGetBBox = this.getBBox), (this.getBBox = jt);
                          } catch (o) {}
                      else this._originalGetBBox && (e = this._originalGetBBox());
                      return r ? n.insertBefore(this, r) : n.appendChild(this), Mt.removeChild(i), (this.style.cssText = s), e;
                  },
                  Ft = function (t) {
                      try {
                          return t.getBBox();
                      } catch (e) {
                          return jt.call(t, !0);
                      }
                  },
                  It = function (t) {
                      return !(!(Nt && t.getCTM && Ft(t)) || (t.parentNode && !t.ownerSVGElement));
                  },
                  Ht = [1, 0, 0, 1, 0, 0],
                  Bt = function (t, e) {
                      var i,
                          n,
                          r,
                          s,
                          o,
                          a,
                          l = t._gsTransform || new Dt(),
                          h = 1e5,
                          c = t.style;
                      if (
                          (Et
                              ? (n = K(t, At, null, !0))
                              : t.currentStyle && ((n = t.currentStyle.filter.match(D)), (n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : "")),
                          (i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n),
                          i &&
                              Et &&
                              ((a = "none" === J(t).display) || !t.parentNode) &&
                              (a && ((s = c.display), (c.display = "block")),
                              t.parentNode || ((o = 1), Mt.appendChild(t)),
                              (n = K(t, At, null, !0)),
                              (i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n),
                              s ? (c.display = s) : a && Ut(c, "display"),
                              o && Mt.removeChild(t)),
                          (l.svg || (t.getCTM && It(t))) &&
                              (i && -1 !== (c[Et] + "").indexOf("matrix") && ((n = c[Et]), (i = 0)),
                              (r = t.getAttribute("transform")),
                              i && r && (-1 !== r.indexOf("matrix") ? ((n = r), (i = 0)) : -1 !== r.indexOf("translate") && ((n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")"), (i = 0)))),
                          i)
                      )
                          return Ht;
                      for (r = (n || "").match(v) || [], bt = r.length; --bt > -1; ) (s = Number(r[bt])), (r[bt] = (o = s - (s |= 0)) ? ((o * h + (0 > o ? -0.5 : 0.5)) | 0) / h + s : s);
                      return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r;
                  },
                  qt = (W.getTransform = function (t, i, n, r) {
                      if (t._gsTransform && n && !r) return t._gsTransform;
                      var s,
                          a,
                          l,
                          h,
                          c,
                          u,
                          f = n ? t._gsTransform || new Dt() : new Dt(),
                          p = f.scaleX < 0,
                          d = 2e-5,
                          m = 1e5,
                          g = $t ? parseFloat(K(t, Ot, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
                          _ = parseFloat(o.defaultTransformPerspective) || 0;
                      if (((f.svg = !(!t.getCTM || !It(t))), f.svg && (zt(t, K(t, Ot, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), (kt = o.useSVGTransformAttr || Lt)), (s = Bt(t)), s !== Ht)) {
                          if (16 === s.length) {
                              var v,
                                  y,
                                  w,
                                  x,
                                  b,
                                  T = s[0],
                                  C = s[1],
                                  S = s[2],
                                  k = s[3],
                                  P = s[4],
                                  E = s[5],
                                  A = s[6],
                                  O = s[7],
                                  $ = s[8],
                                  D = s[9],
                                  N = s[10],
                                  R = s[12],
                                  M = s[13],
                                  L = s[14],
                                  j = s[11],
                                  F = Math.atan2(A, N);
                              f.zOrigin && ((L = -f.zOrigin), (R = $ * L - s[12]), (M = D * L - s[13]), (L = N * L + f.zOrigin - s[14])),
                                  (f.rotationX = F * z),
                                  F &&
                                      ((x = Math.cos(-F)),
                                      (b = Math.sin(-F)),
                                      (v = P * x + $ * b),
                                      (y = E * x + D * b),
                                      (w = A * x + N * b),
                                      ($ = P * -b + $ * x),
                                      (D = E * -b + D * x),
                                      (N = A * -b + N * x),
                                      (j = O * -b + j * x),
                                      (P = v),
                                      (E = y),
                                      (A = w)),
                                  (F = Math.atan2(-S, N)),
                                  (f.rotationY = F * z),
                                  F && ((x = Math.cos(-F)), (b = Math.sin(-F)), (v = T * x - $ * b), (y = C * x - D * b), (w = S * x - N * b), (D = C * b + D * x), (N = S * b + N * x), (j = k * b + j * x), (T = v), (C = y), (S = w)),
                                  (F = Math.atan2(C, T)),
                                  (f.rotation = F * z),
                                  F && ((x = Math.cos(-F)), (b = Math.sin(-F)), (T = T * x + P * b), (y = C * x + E * b), (E = C * -b + E * x), (A = S * -b + A * x), (C = y)),
                                  f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && ((f.rotationX = f.rotation = 0), (f.rotationY = 180 - f.rotationY)),
                                  (f.scaleX = ((Math.sqrt(T * T + C * C) * m + 0.5) | 0) / m),
                                  (f.scaleY = ((Math.sqrt(E * E + D * D) * m + 0.5) | 0) / m),
                                  (f.scaleZ = ((Math.sqrt(A * A + N * N) * m + 0.5) | 0) / m),
                                  f.rotationX || f.rotationY
                                      ? (f.skewX = 0)
                                      : ((f.skewX = P || E ? Math.atan2(P, E) * z + f.rotation : f.skewX || 0),
                                        Math.abs(f.skewX) > 90 &&
                                            Math.abs(f.skewX) < 270 &&
                                            (p ? ((f.scaleX *= -1), (f.skewX += f.rotation <= 0 ? 180 : -180), (f.rotation += f.rotation <= 0 ? 180 : -180)) : ((f.scaleY *= -1), (f.skewX += f.skewX <= 0 ? 180 : -180)))),
                                  (f.perspective = j ? 1 / (0 > j ? -j : j) : 0),
                                  (f.x = R),
                                  (f.y = M),
                                  (f.z = L),
                                  f.svg && ((f.x -= f.xOrigin - (f.xOrigin * T - f.yOrigin * P)), (f.y -= f.yOrigin - (f.yOrigin * C - f.xOrigin * E)));
                          } else if (!$t || r || !s.length || f.x !== s[4] || f.y !== s[5] || (!f.rotationX && !f.rotationY)) {
                              var I = s.length >= 6,
                                  H = I ? s[0] : 1,
                                  B = s[1] || 0,
                                  q = s[2] || 0,
                                  W = I ? s[3] : 1;
                              (f.x = s[4] || 0),
                                  (f.y = s[5] || 0),
                                  (l = Math.sqrt(H * H + B * B)),
                                  (h = Math.sqrt(W * W + q * q)),
                                  (c = H || B ? Math.atan2(B, H) * z : f.rotation || 0),
                                  (u = q || W ? Math.atan2(q, W) * z + c : f.skewX || 0),
                                  Math.abs(u) > 90 && Math.abs(u) < 270 && (p ? ((l *= -1), (u += 0 >= c ? 180 : -180), (c += 0 >= c ? 180 : -180)) : ((h *= -1), (u += 0 >= u ? 180 : -180))),
                                  (f.scaleX = l),
                                  (f.scaleY = h),
                                  (f.rotation = c),
                                  (f.skewX = u),
                                  $t && ((f.rotationX = f.rotationY = f.z = 0), (f.perspective = _), (f.scaleZ = 1)),
                                  f.svg && ((f.x -= f.xOrigin - (f.xOrigin * H + f.yOrigin * q)), (f.y -= f.yOrigin - (f.xOrigin * B + f.yOrigin * W)));
                          }
                          f.zOrigin = g;
                          for (a in f) f[a] < d && f[a] > -d && (f[a] = 0);
                      }
                      return (
                          n &&
                              ((t._gsTransform = f),
                              f.svg &&
                                  (kt && t.style[Et]
                                      ? e.delayedCall(0.001, function () {
                                            Ut(t.style, Et);
                                        })
                                      : !kt &&
                                        t.getAttribute("transform") &&
                                        e.delayedCall(0.001, function () {
                                            t.removeAttribute("transform");
                                        }))),
                          f
                      );
                  }),
                  Wt = function (t) {
                      var e,
                          i,
                          n = this.data,
                          r = -n.rotation * L,
                          s = r + n.skewX * L,
                          o = 1e5,
                          a = ((Math.cos(r) * n.scaleX * o) | 0) / o,
                          l = ((Math.sin(r) * n.scaleX * o) | 0) / o,
                          h = ((Math.sin(s) * -n.scaleY * o) | 0) / o,
                          c = ((Math.cos(s) * n.scaleY * o) | 0) / o,
                          u = this.t.style,
                          f = this.t.currentStyle;
                      if (f) {
                          (i = l), (l = -h), (h = -i), (e = f.filter), (u.filter = "");
                          var p,
                              d,
                              g = this.t.offsetWidth,
                              _ = this.t.offsetHeight,
                              v = "absolute" !== f.position,
                              y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c,
                              w = n.x + (g * n.xPercent) / 100,
                              x = n.y + (_ * n.yPercent) / 100;
                          if (
                              (null != n.ox && ((p = (n.oxp ? g * n.ox * 0.01 : n.ox) - g / 2), (d = (n.oyp ? _ * n.oy * 0.01 : n.oy) - _ / 2), (w += p - (p * a + d * l)), (x += d - (p * h + d * c))),
                              v ? ((p = g / 2), (d = _ / 2), (y += ", Dx=" + (p - (p * a + d * l) + w) + ", Dy=" + (d - (p * h + d * c) + x) + ")")) : (y += ", sizingMethod='auto expand')"),
                              -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? (u.filter = e.replace(N, y)) : (u.filter = y + " " + e),
                              (0 === t || 1 === t) &&
                                  1 === a &&
                                  0 === l &&
                                  0 === h &&
                                  1 === c &&
                                  ((v && -1 === y.indexOf("Dx=0, Dy=0")) || (T.test(e) && 100 !== parseFloat(RegExp.$1)) || (-1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter"))),
                              !v)
                          ) {
                              var C,
                                  S,
                                  k,
                                  P = 8 > m ? 1 : -1;
                              for (
                                  p = n.ieOffsetX || 0,
                                      d = n.ieOffsetY || 0,
                                      n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * _)) / 2 + w),
                                      n.ieOffsetY = Math.round((_ - ((0 > c ? -c : c) * _ + (0 > h ? -h : h) * g)) / 2 + x),
                                      bt = 0;
                                  4 > bt;
                                  bt++
                              )
                                  (S = st[bt]),
                                      (C = f[S]),
                                      (i = -1 !== C.indexOf("px") ? parseFloat(C) : tt(this.t, S, parseFloat(C), C.replace(b, "")) || 0),
                                      (k = i !== n[S] ? (2 > bt ? -n.ieOffsetX : -n.ieOffsetY) : 2 > bt ? p - n.ieOffsetX : d - n.ieOffsetY),
                                      (u[S] = (n[S] = Math.round(i - k * (0 === bt || 2 === bt ? 1 : P))) + "px");
                          }
                      }
                  },
                  Xt = (W.set3DTransformRatio = W.setTransformRatio = function (t) {
                      var e,
                          i,
                          n,
                          r,
                          s,
                          o,
                          a,
                          l,
                          h,
                          c,
                          u,
                          f,
                          d,
                          m,
                          g,
                          _,
                          v,
                          y,
                          w,
                          x,
                          b,
                          T,
                          C,
                          S = this.data,
                          k = this.t.style,
                          P = S.rotation,
                          E = S.rotationX,
                          A = S.rotationY,
                          O = S.scaleX,
                          $ = S.scaleY,
                          D = S.scaleZ,
                          N = S.x,
                          R = S.y,
                          M = S.z,
                          z = S.svg,
                          j = S.perspective,
                          F = S.force3D,
                          I = S.skewY,
                          H = S.skewX;
                      if (
                          (I && ((H += I), (P += I)),
                          ((((1 === t || 0 === t) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !F) && !M && !j && !A && !E && 1 === D) || (kt && z) || !$t)
                      )
                          return void (P || H || z
                              ? ((P *= L),
                                (T = H * L),
                                (C = 1e5),
                                (i = Math.cos(P) * O),
                                (s = Math.sin(P) * O),
                                (n = Math.sin(P - T) * -$),
                                (o = Math.cos(P - T) * $),
                                T && "simple" === S.skewType && ((e = Math.tan(T - I * L)), (e = Math.sqrt(1 + e * e)), (n *= e), (o *= e), I && ((e = Math.tan(I * L)), (e = Math.sqrt(1 + e * e)), (i *= e), (s *= e))),
                                z &&
                                    ((N += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset),
                                    (R += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset),
                                    kt && (S.xPercent || S.yPercent) && ((g = this.t.getBBox()), (N += 0.01 * S.xPercent * g.width), (R += 0.01 * S.yPercent * g.height)),
                                    (g = 1e-6),
                                    g > N && N > -g && (N = 0),
                                    g > R && R > -g && (R = 0)),
                                (w = ((i * C) | 0) / C + "," + ((s * C) | 0) / C + "," + ((n * C) | 0) / C + "," + ((o * C) | 0) / C + "," + N + "," + R + ")"),
                                z && kt ? this.t.setAttribute("transform", "matrix(" + w) : (k[Et] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + w))
                              : (k[Et] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + $ + "," + N + "," + R + ")"));
                      if ((p && ((g = 1e-4), g > O && O > -g && (O = D = 2e-5), g > $ && $ > -g && ($ = D = 2e-5), !j || S.z || S.rotationX || S.rotationY || (j = 0)), P || H))
                          (P *= L),
                              (_ = i = Math.cos(P)),
                              (v = s = Math.sin(P)),
                              H &&
                                  ((P -= H * L),
                                  (_ = Math.cos(P)),
                                  (v = Math.sin(P)),
                                  "simple" === S.skewType && ((e = Math.tan((H - I) * L)), (e = Math.sqrt(1 + e * e)), (_ *= e), (v *= e), S.skewY && ((e = Math.tan(I * L)), (e = Math.sqrt(1 + e * e)), (i *= e), (s *= e)))),
                              (n = -v),
                              (o = _);
                      else {
                          if (!(A || E || 1 !== D || j || z))
                              return void (k[Et] =
                                  (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") +
                                  N +
                                  "px," +
                                  R +
                                  "px," +
                                  M +
                                  "px)" +
                                  (1 !== O || 1 !== $ ? " scale(" + O + "," + $ + ")" : ""));
                          (i = o = 1), (n = s = 0);
                      }
                      (c = 1),
                          (r = a = l = h = u = f = 0),
                          (d = j ? -1 / j : 0),
                          (m = S.zOrigin),
                          (g = 1e-6),
                          (x = ","),
                          (b = "0"),
                          (P = A * L),
                          P && ((_ = Math.cos(P)), (v = Math.sin(P)), (l = -v), (u = d * -v), (r = i * v), (a = s * v), (c = _), (d *= _), (i *= _), (s *= _)),
                          (P = E * L),
                          P && ((_ = Math.cos(P)), (v = Math.sin(P)), (e = n * _ + r * v), (y = o * _ + a * v), (h = c * v), (f = d * v), (r = n * -v + r * _), (a = o * -v + a * _), (c *= _), (d *= _), (n = e), (o = y)),
                          1 !== D && ((r *= D), (a *= D), (c *= D), (d *= D)),
                          1 !== $ && ((n *= $), (o *= $), (h *= $), (f *= $)),
                          1 !== O && ((i *= O), (s *= O), (l *= O), (u *= O)),
                          (m || z) &&
                              (m && ((N += r * -m), (R += a * -m), (M += c * -m + m)),
                              z && ((N += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset), (R += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset)),
                              g > N && N > -g && (N = b),
                              g > R && R > -g && (R = b),
                              g > M && M > -g && (M = 0)),
                          (w = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d("),
                          (w += (g > i && i > -g ? b : i) + x + (g > s && s > -g ? b : s) + x + (g > l && l > -g ? b : l)),
                          (w += x + (g > u && u > -g ? b : u) + x + (g > n && n > -g ? b : n) + x + (g > o && o > -g ? b : o)),
                          E || A || 1 !== D
                              ? ((w += x + (g > h && h > -g ? b : h) + x + (g > f && f > -g ? b : f) + x + (g > r && r > -g ? b : r)),
                                (w += x + (g > a && a > -g ? b : a) + x + (g > c && c > -g ? b : c) + x + (g > d && d > -g ? b : d) + x))
                              : (w += ",0,0,0,0,1,0,"),
                          (w += N + x + R + x + M + x + (j ? 1 + -M / j : 1) + ")"),
                          (k[Et] = w);
                  });
              (h = Dt.prototype),
                  (h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0),
                  (h.scaleX = h.scaleY = h.scaleZ = 1),
                  Ct(
                      "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
                      {
                          parser: function (t, e, i, n, s, a, l) {
                              if (n._lastParsedTransform === l) return s;
                              n._lastParsedTransform = l;
                              var h,
                                  c = l.scale && "function" == typeof l.scale ? l.scale : 0;
                              "function" == typeof l[i] && ((h = l[i]), (l[i] = e)), c && (l.scale = c(_, t));
                              var u,
                                  f,
                                  p,
                                  d,
                                  m,
                                  v,
                                  y,
                                  w,
                                  x,
                                  b = t._gsTransform,
                                  T = t.style,
                                  C = 1e-6,
                                  S = Pt.length,
                                  k = l,
                                  P = {},
                                  E = "transformOrigin",
                                  A = qt(t, r, !0, k.parseTransform),
                                  O = k.transform && ("function" == typeof k.transform ? k.transform(_, g) : k.transform);
                              if (((n._transform = A), O && "string" == typeof O && Et))
                                  (f = B.style),
                                      (f[Et] = O),
                                      (f.display = "block"),
                                      (f.position = "absolute"),
                                      I.body.appendChild(B),
                                      (u = qt(B, null, !1)),
                                      A.svg &&
                                          ((v = A.xOrigin),
                                          (y = A.yOrigin),
                                          (u.x -= A.xOffset),
                                          (u.y -= A.yOffset),
                                          (k.transformOrigin || k.svgOrigin) &&
                                              ((O = {}), zt(t, at(k.transformOrigin), O, k.svgOrigin, k.smoothOrigin, !0), (v = O.xOrigin), (y = O.yOrigin), (u.x -= O.xOffset - A.xOffset), (u.y -= O.yOffset - A.yOffset)),
                                          (v || y) && ((w = Bt(B, !0)), (u.x -= v - (v * w[0] + y * w[2])), (u.y -= y - (v * w[1] + y * w[3])))),
                                      I.body.removeChild(B),
                                      u.perspective || (u.perspective = A.perspective),
                                      null != k.xPercent && (u.xPercent = ht(k.xPercent, A.xPercent)),
                                      null != k.yPercent && (u.yPercent = ht(k.yPercent, A.yPercent));
                              else if ("object" == typeof k) {
                                  if (
                                      ((u = {
                                          scaleX: ht(null != k.scaleX ? k.scaleX : k.scale, A.scaleX),
                                          scaleY: ht(null != k.scaleY ? k.scaleY : k.scale, A.scaleY),
                                          scaleZ: ht(k.scaleZ, A.scaleZ),
                                          x: ht(k.x, A.x),
                                          y: ht(k.y, A.y),
                                          z: ht(k.z, A.z),
                                          xPercent: ht(k.xPercent, A.xPercent),
                                          yPercent: ht(k.yPercent, A.yPercent),
                                          perspective: ht(k.transformPerspective, A.perspective),
                                      }),
                                      (m = k.directionalRotation),
                                      null != m)
                                  )
                                      if ("object" == typeof m) for (f in m) k[f] = m[f];
                                      else k.rotation = m;
                                  "string" == typeof k.x && -1 !== k.x.indexOf("%") && ((u.x = 0), (u.xPercent = ht(k.x, A.xPercent))),
                                      "string" == typeof k.y && -1 !== k.y.indexOf("%") && ((u.y = 0), (u.yPercent = ht(k.y, A.yPercent))),
                                      (u.rotation = ct("rotation" in k ? k.rotation : "shortRotation" in k ? k.shortRotation + "_short" : "rotationZ" in k ? k.rotationZ : A.rotation, A.rotation, "rotation", P)),
                                      $t &&
                                          ((u.rotationX = ct("rotationX" in k ? k.rotationX : "shortRotationX" in k ? k.shortRotationX + "_short" : A.rotationX || 0, A.rotationX, "rotationX", P)),
                                          (u.rotationY = ct("rotationY" in k ? k.rotationY : "shortRotationY" in k ? k.shortRotationY + "_short" : A.rotationY || 0, A.rotationY, "rotationY", P))),
                                      (u.skewX = ct(k.skewX, A.skewX)),
                                      (u.skewY = ct(k.skewY, A.skewY));
                              }
                              for (
                                  $t && null != k.force3D && ((A.force3D = k.force3D), (d = !0)),
                                      A.skewType = k.skewType || A.skewType || o.defaultSkewType,
                                      p = A.force3D || A.z || A.rotationX || A.rotationY || u.z || u.rotationX || u.rotationY || u.perspective,
                                      p || null == k.scale || (u.scaleZ = 1);
                                  --S > -1;

                              )
                                  (x = Pt[S]),
                                      (O = u[x] - A[x]),
                                      (O > C || -C > O || null != k[x] || null != j[x]) && ((d = !0), (s = new yt(A, x, A[x], O, s)), x in P && (s.e = P[x]), (s.xs0 = 0), (s.plugin = a), n._overwriteProps.push(s.n));
                              return (
                                  (O = k.transformOrigin),
                                  A.svg &&
                                      (O || k.svgOrigin) &&
                                      ((v = A.xOffset),
                                      (y = A.yOffset),
                                      zt(t, at(O), u, k.svgOrigin, k.smoothOrigin),
                                      (s = wt(A, "xOrigin", (b ? A : u).xOrigin, u.xOrigin, s, E)),
                                      (s = wt(A, "yOrigin", (b ? A : u).yOrigin, u.yOrigin, s, E)),
                                      (v !== A.xOffset || y !== A.yOffset) && ((s = wt(A, "xOffset", b ? v : A.xOffset, A.xOffset, s, E)), (s = wt(A, "yOffset", b ? y : A.yOffset, A.yOffset, s, E))),
                                      (O = "0px 0px")),
                                  (O || ($t && p && A.zOrigin)) &&
                                      (Et
                                          ? ((d = !0),
                                            (x = Ot),
                                            (O = (O || K(t, x, r, !1, "50% 50%")) + ""),
                                            (s = new yt(T, x, 0, 0, s, -1, E)),
                                            (s.b = T[x]),
                                            (s.plugin = a),
                                            $t
                                                ? ((f = A.zOrigin),
                                                  (O = O.split(" ")),
                                                  (A.zOrigin = (O.length > 2 && (0 === f || "0px" !== O[2]) ? parseFloat(O[2]) : f) || 0),
                                                  (s.xs0 = s.e = O[0] + " " + (O[1] || "50%") + " 0px"),
                                                  (s = new yt(A, "zOrigin", 0, 0, s, -1, s.n)),
                                                  (s.b = f),
                                                  (s.xs0 = s.e = A.zOrigin))
                                                : (s.xs0 = s.e = O))
                                          : at(O + "", A)),
                                  d && (n._transformType = (A.svg && kt) || (!p && 3 !== this._transformType) ? 2 : 3),
                                  h && (l[i] = h),
                                  c && (l.scale = c),
                                  s
                              );
                          },
                          prefix: !0,
                      }
                  ),
                  Ct("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }),
                  Ct("borderRadius", {
                      defaultValue: "0px",
                      parser: function (t, e, i, s, o, a) {
                          e = this.format(e);
                          var l,
                              h,
                              c,
                              u,
                              f,
                              p,
                              d,
                              m,
                              g,
                              _,
                              v,
                              y,
                              w,
                              x,
                              b,
                              T,
                              C = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                              S = t.style;
                          for (g = parseFloat(t.offsetWidth), _ = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < C.length; h++)
                              this.p.indexOf("border") && (C[h] = Z(C[h])),
                                  (f = u = K(t, C[h], r, !1, "0px")),
                                  -1 !== f.indexOf(" ") && ((u = f.split(" ")), (f = u[0]), (u = u[1])),
                                  (p = c = l[h]),
                                  (d = parseFloat(f)),
                                  (y = f.substr((d + "").length)),
                                  (w = "=" === p.charAt(1)),
                                  w ? ((m = parseInt(p.charAt(0) + "1", 10)), (p = p.substr(2)), (m *= parseFloat(p)), (v = p.substr((m + "").length - (0 > m ? 1 : 0)) || "")) : ((m = parseFloat(p)), (v = p.substr((m + "").length))),
                                  "" === v && (v = n[i] || y),
                                  v !== y &&
                                      ((x = tt(t, "borderLeft", d, y)),
                                      (b = tt(t, "borderTop", d, y)),
                                      "%" === v ? ((f = (x / g) * 100 + "%"), (u = (b / _) * 100 + "%")) : "em" === v ? ((T = tt(t, "borderLeft", 1, "em")), (f = x / T + "em"), (u = b / T + "em")) : ((f = x + "px"), (u = b + "px")),
                                      w && ((p = parseFloat(f) + m + v), (c = parseFloat(u) + m + v))),
                                  (o = xt(S, C[h], f + " " + u, p + " " + c, !1, "0px", o));
                          return o;
                      },
                      prefix: !0,
                      formatter: gt("0px 0px 0px 0px", !1, !0),
                  }),
                  Ct("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                      defaultValue: "0px",
                      parser: function (t, e, i, n, s, o) {
                          return xt(t.style, i, this.format(K(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s);
                      },
                      prefix: !0,
                      formatter: gt("0px 0px", !1, !0),
                  }),
                  Ct("backgroundPosition", {
                      defaultValue: "0 0",
                      parser: function (t, e, i, n, s, o) {
                          var a,
                              l,
                              h,
                              c,
                              u,
                              f,
                              p = "background-position",
                              d = r || J(t, null),
                              g = this.format((d ? (m ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p)) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                              _ = this.format(e);
                          if ((-1 !== g.indexOf("%")) != (-1 !== _.indexOf("%")) && _.split(",").length < 2 && ((f = K(t, "backgroundImage").replace(A, "")), f && "none" !== f)) {
                              for (a = g.split(" "), l = _.split(" "), q.setAttribute("src", f), h = 2; --h > -1; )
                                  (g = a[h]),
                                      (c = -1 !== g.indexOf("%")),
                                      c !== (-1 !== l[h].indexOf("%")) && ((u = 0 === h ? t.offsetWidth - q.width : t.offsetHeight - q.height), (a[h] = c ? (parseFloat(g) / 100) * u + "px" : (parseFloat(g) / u) * 100 + "%"));
                              g = a.join(" ");
                          }
                          return this.parseComplex(t.style, g, _, s, o);
                      },
                      formatter: at,
                  }),
                  Ct("backgroundSize", {
                      defaultValue: "0 0",
                      formatter: function (t) {
                          return (t += ""), at(-1 === t.indexOf(" ") ? t + " " + t : t);
                      },
                  }),
                  Ct("perspective", { defaultValue: "0px", prefix: !0 }),
                  Ct("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
                  Ct("transformStyle", { prefix: !0 }),
                  Ct("backfaceVisibility", { prefix: !0 }),
                  Ct("userSelect", { prefix: !0 }),
                  Ct("margin", { parser: _t("marginTop,marginRight,marginBottom,marginLeft") }),
                  Ct("padding", { parser: _t("paddingTop,paddingRight,paddingBottom,paddingLeft") }),
                  Ct("clip", {
                      defaultValue: "rect(0px,0px,0px,0px)",
                      parser: function (t, e, i, n, s, o) {
                          var a, l, h;
                          return (
                              9 > m
                                  ? ((l = t.currentStyle), (h = 8 > m ? " " : ","), (a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")"), (e = this.format(e).split(",").join(h)))
                                  : ((a = this.format(K(t, this.p, r, !1, this.dflt))), (e = this.format(e))),
                              this.parseComplex(t.style, a, e, s, o)
                          );
                      },
                  }),
                  Ct("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }),
                  Ct("autoRound,strictUnits", {
                      parser: function (t, e, i, n, r) {
                          return r;
                      },
                  }),
                  Ct("border", {
                      defaultValue: "0px solid #000",
                      parser: function (t, e, i, n, s, o) {
                          var a = K(t, "borderTopWidth", r, !1, "0px"),
                              l = this.format(e).split(" "),
                              h = l[0].replace(b, "");
                          return (
                              "px" !== h && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, h) + h),
                              this.parseComplex(t.style, this.format(a + " " + K(t, "borderTopStyle", r, !1, "solid") + " " + K(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                          );
                      },
                      color: !0,
                      formatter: function (t) {
                          var e = t.split(" ");
                          return e[0] + " " + (e[1] || "solid") + " " + (t.match(mt) || ["#000"])[0];
                      },
                  }),
                  Ct("borderWidth", { parser: _t("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }),
                  Ct("float,cssFloat,styleFloat", {
                      parser: function (t, e, i, n, r, s) {
                          var o = t.style,
                              a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                          return new yt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e);
                      },
                  });
              var Yt = function (t) {
                  var e,
                      i = this.t,
                      n = i.filter || K(this.data, "filter") || "",
                      r = (this.s + this.c * t) | 0;
                  100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), (e = !K(this.data, "filter"))) : ((i.filter = n.replace(S, "")), (e = !0))),
                      e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? (0 === r && this.xn1) || (i.filter = n + " alpha(opacity=" + r + ")") : (i.filter = n.replace(T, "opacity=" + r)));
              };
              Ct("opacity,alpha,autoAlpha", {
                  defaultValue: "1",
                  parser: function (t, e, i, n, s, o) {
                      var a = parseFloat(K(t, "opacity", r, !1, "1")),
                          l = t.style,
                          h = "autoAlpha" === i;
                      return (
                          "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a),
                          h && 1 === a && "hidden" === K(t, "visibility", r) && 0 !== e && (a = 0),
                          Y
                              ? (s = new yt(l, "opacity", a, e - a, s))
                              : ((s = new yt(l, "opacity", 100 * a, 100 * (e - a), s)),
                                (s.xn1 = h ? 1 : 0),
                                (l.zoom = 1),
                                (s.type = 2),
                                (s.b = "alpha(opacity=" + s.s + ")"),
                                (s.e = "alpha(opacity=" + (s.s + s.c) + ")"),
                                (s.data = t),
                                (s.plugin = o),
                                (s.setRatio = Yt)),
                          h && ((s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit")), (s.xs0 = "inherit"), n._overwriteProps.push(s.n), n._overwriteProps.push(i)),
                          s
                      );
                  },
              });
              var Ut = function (t, e) {
                      e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e));
                  },
                  Vt = function (t) {
                      if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
                          this.t.setAttribute("class", 0 === t ? this.b : this.e);
                          for (var e = this.data, i = this.t.style; e; ) e.v ? (i[e.p] = e.v) : Ut(i, e.p), (e = e._next);
                          1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
                      } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
                  };
              Ct("className", {
                  parser: function (t, e, n, s, o, a, l) {
                      var h,
                          c,
                          u,
                          f,
                          p,
                          d = t.getAttribute("class") || "",
                          m = t.style.cssText;
                      if (((o = s._classNamePT = new yt(t, n, 0, 0, o, 2)), (o.setRatio = Vt), (o.pr = -11), (i = !0), (o.b = d), (c = it(t, r)), (u = t._gsClassPT))) {
                          for (f = {}, p = u.data; p; ) (f[p.p] = 1), (p = p._next);
                          u.setRatio(1);
                      }
                      return (
                          (t._gsClassPT = o),
                          (o.e = "=" !== e.charAt(1) ? e : d.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
                          t.setAttribute("class", o.e),
                          (h = nt(t, c, it(t), l, f)),
                          t.setAttribute("class", d),
                          (o.data = h.firstMPT),
                          (t.style.cssText = m),
                          (o = o.xfirst = s.parse(t, h.difs, o, a))
                      );
                  },
              });
              var Gt = function (t) {
                  if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                      var e,
                          i,
                          n,
                          r,
                          s,
                          o = this.t.style,
                          a = l.transform.parse;
                      if ("all" === this.e) (o.cssText = ""), (r = !0);
                      else for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1; ) (i = e[n]), l[i] && (l[i].parse === a ? (r = !0) : (i = "transformOrigin" === i ? Ot : l[i].p)), Ut(o, i);
                      r && (Ut(o, Et), (s = this.t._gsTransform), s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform));
                  }
              };
              for (
                  Ct("clearProps", {
                      parser: function (t, e, n, r, s) {
                          return (s = new yt(t, n, 0, 0, s, 2)), (s.setRatio = Gt), (s.e = e), (s.pr = -10), (s.data = r._tween), (i = !0), s;
                      },
                  }),
                      h = "bezier,throwProps,physicsProps,physics2D".split(","),
                      bt = h.length;
                  bt--;

              )
                  St(h[bt]);
              (h = o.prototype),
                  (h._firstPT = h._lastParsedTransform = h._transform = null),
                  (h._onInitTween = function (t, e, a, h) {
                      if (!t.nodeType) return !1;
                      (this._target = g = t), (this._tween = a), (this._vars = e), (_ = h), (c = e.autoRound), (i = !1), (n = e.suffixMap || o.suffixMap), (r = J(t, "")), (s = this._overwriteProps);
                      var p,
                          m,
                          v,
                          y,
                          w,
                          x,
                          b,
                          T,
                          S,
                          k = t.style;
                      if (
                          (u && "" === k.zIndex && ((p = K(t, "zIndex", r)), ("auto" === p || "" === p) && this._addLazySet(k, "zIndex", 0)),
                          "string" == typeof e && ((y = k.cssText), (p = it(t, r)), (k.cssText = y + ";" + e), (p = nt(t, p, it(t)).difs), !Y && C.test(e) && (p.opacity = parseFloat(RegExp.$1)), (e = p), (k.cssText = y)),
                          e.className ? (this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e)) : (this._firstPT = m = this.parse(t, e, null)),
                          this._transformType)
                      ) {
                          for (
                              S = 3 === this._transformType,
                                  Et
                                      ? f &&
                                        ((u = !0),
                                        "" === k.zIndex && ((b = K(t, "zIndex", r)), ("auto" === b || "" === b) && this._addLazySet(k, "zIndex", 0)),
                                        d && this._addLazySet(k, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden")))
                                      : (k.zoom = 1),
                                  v = m;
                              v && v._next;

                          )
                              v = v._next;
                          (T = new yt(t, "transform", 0, 0, null, 2)), this._linkCSSP(T, null, v), (T.setRatio = Et ? Xt : Wt), (T.data = this._transform || qt(t, r, !0)), (T.tween = a), (T.pr = -1), s.pop();
                      }
                      if (i) {
                          for (; m; ) {
                              for (x = m._next, v = y; v && v.pr > m.pr; ) v = v._next;
                              (m._prev = v ? v._prev : w) ? (m._prev._next = m) : (y = m), (m._next = v) ? (v._prev = m) : (w = m), (m = x);
                          }
                          this._firstPT = y;
                      }
                      return !0;
                  }),
                  (h.parse = function (t, e, i, s) {
                      var o,
                          a,
                          h,
                          u,
                          f,
                          p,
                          d,
                          m,
                          v,
                          y,
                          w = t.style;
                      for (o in e)
                          (p = e[o]),
                              "function" == typeof p && (p = p(_, g)),
                              (a = l[o]),
                              a
                                  ? (i = a.parse(t, p, o, this, i, s, e))
                                  : ((f = K(t, o, r) + ""),
                                    (v = "string" == typeof p),
                                    "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || (v && k.test(p))
                                        ? (v || ((p = pt(p)), (p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")")), (i = xt(w, o, f, p, !0, "transparent", i, 0, s)))
                                        : v && M.test(p)
                                        ? (i = xt(w, o, f, p, !0, null, i, 0, s))
                                        : ((h = parseFloat(f)),
                                          (d = h || 0 === h ? f.substr((h + "").length) : ""),
                                          ("" === f || "auto" === f) &&
                                              ("width" === o || "height" === o ? ((h = ot(t, o, r)), (d = "px")) : "left" === o || "top" === o ? ((h = et(t, o, r)), (d = "px")) : ((h = "opacity" !== o ? 0 : 1), (d = ""))),
                                          (y = v && "=" === p.charAt(1)),
                                          y ? ((u = parseInt(p.charAt(0) + "1", 10)), (p = p.substr(2)), (u *= parseFloat(p)), (m = p.replace(b, ""))) : ((u = parseFloat(p)), (m = v ? p.replace(b, "") : "")),
                                          "" === m && (m = o in n ? n[o] : d),
                                          (p = u || 0 === u ? (y ? u + h : u) + m : e[o]),
                                          d !== m &&
                                              "" !== m &&
                                              (u || 0 === u) &&
                                              h &&
                                              ((h = tt(t, o, h, d)),
                                              "%" === m
                                                  ? ((h /= tt(t, o, 100, "%") / 100), e.strictUnits !== !0 && (f = h + "%"))
                                                  : "em" === m || "rem" === m || "vw" === m || "vh" === m
                                                  ? (h /= tt(t, o, 1, m))
                                                  : "px" !== m && ((u = tt(t, o, u, m)), (m = "px")),
                                              y && (u || 0 === u) && (p = u + h + m)),
                                          y && (u += h),
                                          (!h && 0 !== h) || (!u && 0 !== u)
                                              ? void 0 !== w[o] && (p || (p + "" != "NaN" && null != p))
                                                  ? ((i = new yt(w, o, u || h || 0, 0, i, -1, o, !1, 0, f, p)), (i.xs0 = "none" !== p || ("display" !== o && -1 === o.indexOf("Style")) ? p : f))
                                                  : V("invalid " + o + " tween value: " + e[o])
                                              : ((i = new yt(w, o, h, u - h, i, 0, o, c !== !1 && ("px" === m || "zIndex" === o), 0, f, p)), (i.xs0 = m)))),
                              s && i && !i.plugin && (i.plugin = s);
                      return i;
                  }),
                  (h.setRatio = function (t) {
                      var e,
                          i,
                          n,
                          r = this._firstPT,
                          s = 1e-6;
                      if (1 !== t || (this._tween._time !== this._tween._duration && 0 !== this._tween._time))
                          if (t || (this._tween._time !== this._tween._duration && 0 !== this._tween._time) || this._tween._rawPrevTime === -1e-6)
                              for (; r; ) {
                                  if (((e = r.c * t + r.s), r.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0), r.type))
                                      if (1 === r.type)
                                          if (((n = r.l), 2 === n)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                          else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                          else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                          else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                          else {
                                              for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                              r.t[r.p] = i;
                                          }
                                      else -1 === r.type ? (r.t[r.p] = r.xs0) : r.setRatio && r.setRatio(t);
                                  else r.t[r.p] = e + r.xs0;
                                  r = r._next;
                              }
                          else for (; r; ) 2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t), (r = r._next);
                      else
                          for (; r; ) {
                              if (2 !== r.type)
                                  if (r.r && -1 !== r.type)
                                      if (((e = Math.round(r.s + r.c)), r.type)) {
                                          if (1 === r.type) {
                                              for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                              r.t[r.p] = i;
                                          }
                                      } else r.t[r.p] = e + r.xs0;
                                  else r.t[r.p] = r.e;
                              else r.setRatio(t);
                              r = r._next;
                          }
                  }),
                  (h._enableTransforms = function (t) {
                      (this._transform = this._transform || qt(this._target, r, !0)), (this._transformType = (this._transform.svg && kt) || (!t && 3 !== this._transformType) ? 2 : 3);
                  });
              var Qt = function (t) {
                  (this.t[this.p] = this.e), this.data._linkCSSP(this, this._next, null, !0);
              };
              (h._addLazySet = function (t, e, i) {
                  var n = (this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2));
                  (n.e = i), (n.setRatio = Qt), (n.data = this);
              }),
                  (h._linkCSSP = function (t, e, i, n) {
                      return (
                          t &&
                              (e && (e._prev = t),
                              t._next && (t._next._prev = t._prev),
                              t._prev ? (t._prev._next = t._next) : this._firstPT === t && ((this._firstPT = t._next), (n = !0)),
                              i ? (i._next = t) : n || null !== this._firstPT || (this._firstPT = t),
                              (t._next = e),
                              (t._prev = i)),
                          t
                      );
                  }),
                  (h._mod = function (t) {
                      for (var e = this._firstPT; e; ) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), (e = e._next);
                  }),
                  (h._kill = function (e) {
                      var i,
                          n,
                          r,
                          s = e;
                      if (e.autoAlpha || e.alpha) {
                          s = {};
                          for (n in e) s[n] = e[n];
                          (s.opacity = 1), s.autoAlpha && (s.visibility = 1);
                      }
                      for (
                          e.className &&
                              (i = this._classNamePT) &&
                              ((r = i.xfirst),
                              r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next),
                              i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                              (this._classNamePT = null)),
                              i = this._firstPT;
                          i;

                      )
                          i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), (n = i.plugin)), (i = i._next);
                      return t.prototype._kill.call(this, s);
                  });
              var Zt = function (t, e, i) {
                  var n, r, s, o;
                  if (t.slice) for (r = t.length; --r > -1; ) Zt(t[r], e, i);
                  else for (n = t.childNodes, r = n.length; --r > -1; ) (s = n[r]), (o = s.type), s.style && (e.push(it(s)), i && i.push(s)), (1 !== o && 9 !== o && 11 !== o) || !s.childNodes.length || Zt(s, e, i);
              };
              return (
                  (o.cascadeTo = function (t, i, n) {
                      var r,
                          s,
                          o,
                          a,
                          l = e.to(t, i, n),
                          h = [l],
                          c = [],
                          u = [],
                          f = [],
                          p = e._internals.reservedProps;
                      for (t = l._targets || l.target, Zt(t, c, f), l.render(i, !0, !0), Zt(t, u), l.render(0, !0, !0), l._enabled(!0), r = f.length; --r > -1; )
                          if (((s = nt(f[r], c[r], u[r])), s.firstMPT)) {
                              s = s.difs;
                              for (o in n) p[o] && (s[o] = n[o]);
                              a = {};
                              for (o in s) a[o] = c[r][o];
                              h.push(e.fromTo(f[r], i, a, s));
                          }
                      return h;
                  }),
                  t.activate([o]),
                  o
              );
          },
          !0
      ),
      (function () {
          var t = _gsScope._gsDefine.plugin({
                  propName: "roundProps",
                  version: "1.6.0",
                  priority: -1,
                  API: 2,
                  init: function (t, e, i) {
                      return (this._tween = i), !0;
                  },
              }),
              e = function (t) {
                  for (; t; ) t.f || t.blob || (t.m = Math.round), (t = t._next);
              },
              i = t.prototype;
          (i._onInitAllProps = function () {
              for (var t, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, l = r._propLookup.roundProps; --o > -1; ) a[s[o]] = Math.round;
              for (o = s.length; --o > -1; )
                  for (t = s[o], i = r._firstPT; i; )
                      (n = i._next),
                          i.pg
                              ? i.t._mod(a)
                              : i.n === t &&
                                (2 === i.f && i.t
                                    ? e(i.t._firstPT)
                                    : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? (i._prev._next = n) : r._firstPT === i && (r._firstPT = n), (i._next = i._prev = null), (r._propLookup[t] = l))),
                          (i = n);
              return !1;
          }),
              (i._add = function (t, e, i, n) {
                  this._addTween(t, e, i, i + n, e, Math.round), this._overwriteProps.push(e);
              });
      })(),
      (function () {
          _gsScope._gsDefine.plugin({
              propName: "attr",
              API: 2,
              version: "0.6.0",
              init: function (t, e, i, n) {
                  var r, s;
                  if ("function" != typeof t.setAttribute) return !1;
                  for (r in e) (s = e[r]), "function" == typeof s && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
                  return !0;
              },
          });
      })(),
      (_gsScope._gsDefine.plugin({
          propName: "directionalRotation",
          version: "0.3.0",
          API: 2,
          init: function (t, e, i, n) {
              "object" != typeof e && (e = { rotation: e }), (this.finals = {});
              var r,
                  s,
                  o,
                  a,
                  l,
                  h,
                  c = e.useRadians === !0 ? 2 * Math.PI : 360,
                  u = 1e-6;
              for (r in e)
                  "useRadians" !== r &&
                      ((a = e[r]),
                      "function" == typeof a && (a = a(n, t)),
                      (h = (a + "").split("_")),
                      (s = h[0]),
                      (o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]())),
                      (a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0),
                      (l = a - o),
                      h.length &&
                          ((s = h.join("_")),
                          -1 !== s.indexOf("short") && ((l %= c), l !== l % (c / 2) && (l = 0 > l ? l + c : l - c)),
                          -1 !== s.indexOf("_cw") && 0 > l ? (l = ((l + 9999999999 * c) % c) - ((l / c) | 0) * c) : -1 !== s.indexOf("ccw") && l > 0 && (l = ((l - 9999999999 * c) % c) - ((l / c) | 0) * c)),
                      (l > u || -u > l) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));
              return !0;
          },
          set: function (t) {
              var e;
              if (1 !== t) this._super.setRatio.call(this, t);
              else for (e = this._firstPT; e; ) e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]), (e = e._next);
          },
      })._autoCSS = !0),
      _gsScope._gsDefine(
          "easing.Back",
          ["easing.Ease"],
          function (t) {
              var e,
                  i,
                  n,
                  r = _gsScope.GreenSockGlobals || _gsScope,
                  s = r.com.greensock,
                  o = 2 * Math.PI,
                  a = Math.PI / 2,
                  l = s._class,
                  h = function (e, i) {
                      var n = l("easing." + e, function () {}, !0),
                          r = (n.prototype = new t());
                      return (r.constructor = n), (r.getRatio = i), n;
                  },
                  c = t.register || function () {},
                  u = function (t, e, i, n, r) {
                      var s = l("easing." + t, { easeOut: new e(), easeIn: new i(), easeInOut: new n() }, !0);
                      return c(s, t), s;
                  },
                  f = function (t, e, i) {
                      (this.t = t), (this.v = e), i && ((this.next = i), (i.prev = this), (this.c = i.v - e), (this.gap = i.t - t));
                  },
                  p = function (e, i) {
                      var n = l(
                              "easing." + e,
                              function (t) {
                                  (this._p1 = t || 0 === t ? t : 1.70158), (this._p2 = 1.525 * this._p1);
                              },
                              !0
                          ),
                          r = (n.prototype = new t());
                      return (
                          (r.constructor = n),
                          (r.getRatio = i),
                          (r.config = function (t) {
                              return new n(t);
                          }),
                          n
                      );
                  },
                  d = u(
                      "Back",
                      p("BackOut", function (t) {
                          return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
                      }),
                      p("BackIn", function (t) {
                          return t * t * ((this._p1 + 1) * t - this._p1);
                      }),
                      p("BackInOut", function (t) {
                          return (t *= 2) < 1 ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2) : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
                      })
                  ),
                  m = l(
                      "easing.SlowMo",
                      function (t, e, i) {
                          (e = e || 0 === e ? e : 0.7), null == t ? (t = 0.7) : t > 1 && (t = 1), (this._p = 1 !== t ? e : 0), (this._p1 = (1 - t) / 2), (this._p2 = t), (this._p3 = this._p1 + this._p2), (this._calcEnd = i === !0);
                      },
                      !0
                  ),
                  g = (m.prototype = new t());
              return (
                  (g.constructor = m),
                  (g.getRatio = function (t) {
                      var e = t + (0.5 - t) * this._p;
                      return t < this._p1
                          ? this._calcEnd
                              ? 1 - (t = 1 - t / this._p1) * t
                              : e - (t = 1 - t / this._p1) * t * t * t * e
                          : t > this._p3
                          ? this._calcEnd
                              ? 1 - (t = (t - this._p3) / this._p1) * t
                              : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                          : this._calcEnd
                          ? 1
                          : e;
                  }),
                  (m.ease = new m(0.7, 0.7)),
                  (g.config = m.config = function (t, e, i) {
                      return new m(t, e, i);
                  }),
                  (e = l(
                      "easing.SteppedEase",
                      function (t) {
                          (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
                      },
                      !0
                  )),
                  (g = e.prototype = new t()),
                  (g.constructor = e),
                  (g.getRatio = function (t) {
                      return 0 > t ? (t = 0) : t >= 1 && (t = 0.999999999), ((this._p2 * t) >> 0) * this._p1;
                  }),
                  (g.config = e.config = function (t) {
                      return new e(t);
                  }),
                  (i = l(
                      "easing.RoughEase",
                      function (e) {
                          e = e || {};
                          for (
                              var i,
                                  n,
                                  r,
                                  s,
                                  o,
                                  a,
                                  l = e.taper || "none",
                                  h = [],
                                  c = 0,
                                  u = 0 | (e.points || 20),
                                  p = u,
                                  d = e.randomize !== !1,
                                  m = e.clamp === !0,
                                  g = e.template instanceof t ? e.template : null,
                                  _ = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                              --p > -1;

                          )
                              (i = d ? Math.random() : (1 / u) * p),
                                  (n = g ? g.getRatio(i) : i),
                                  "none" === l ? (r = _) : "out" === l ? ((s = 1 - i), (r = s * s * _)) : "in" === l ? (r = i * i * _) : 0.5 > i ? ((s = 2 * i), (r = s * s * 0.5 * _)) : ((s = 2 * (1 - i)), (r = s * s * 0.5 * _)),
                                  d ? (n += Math.random() * r - 0.5 * r) : p % 2 ? (n += 0.5 * r) : (n -= 0.5 * r),
                                  m && (n > 1 ? (n = 1) : 0 > n && (n = 0)),
                                  (h[c++] = { x: i, y: n });
                          for (
                              h.sort(function (t, e) {
                                  return t.x - e.x;
                              }),
                                  a = new f(1, 1, null),
                                  p = u;
                              --p > -1;

                          )
                              (o = h[p]), (a = new f(o.x, o.y, a));
                          this._prev = new f(0, 0, 0 !== a.t ? a : a.next);
                      },
                      !0
                  )),
                  (g = i.prototype = new t()),
                  (g.constructor = i),
                  (g.getRatio = function (t) {
                      var e = this._prev;
                      if (t > e.t) {
                          for (; e.next && t >= e.t; ) e = e.next;
                          e = e.prev;
                      } else for (; e.prev && t <= e.t; ) e = e.prev;
                      return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
                  }),
                  (g.config = function (t) {
                      return new i(t);
                  }),
                  (i.ease = new i()),
                  u(
                      "Bounce",
                      h("BounceOut", function (t) {
                          return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                      }),
                      h("BounceIn", function (t) {
                          return (t = 1 - t) < 1 / 2.75
                              ? 1 - 7.5625 * t * t
                              : 2 / 2.75 > t
                              ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                              : 2.5 / 2.75 > t
                              ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                              : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                      }),
                      h("BounceInOut", function (t) {
                          var e = 0.5 > t;
                          return (
                              (t = e ? 1 - 2 * t : 2 * t - 1),
                              (t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                              e ? 0.5 * (1 - t) : 0.5 * t + 0.5
                          );
                      })
                  ),
                  u(
                      "Circ",
                      h("CircOut", function (t) {
                          return Math.sqrt(1 - (t -= 1) * t);
                      }),
                      h("CircIn", function (t) {
                          return -(Math.sqrt(1 - t * t) - 1);
                      }),
                      h("CircInOut", function (t) {
                          return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                      })
                  ),
                  (n = function (e, i, n) {
                      var r = l(
                              "easing." + e,
                              function (t, e) {
                                  (this._p1 = t >= 1 ? t : 1), (this._p2 = (e || n) / (1 > t ? t : 1)), (this._p3 = (this._p2 / o) * (Math.asin(1 / this._p1) || 0)), (this._p2 = o / this._p2);
                              },
                              !0
                          ),
                          s = (r.prototype = new t());
                      return (
                          (s.constructor = r),
                          (s.getRatio = i),
                          (s.config = function (t, e) {
                              return new r(t, e);
                          }),
                          r
                      );
                  }),
                  u(
                      "Elastic",
                      n(
                          "ElasticOut",
                          function (t) {
                              return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1;
                          },
                          0.3
                      ),
                      n(
                          "ElasticIn",
                          function (t) {
                              return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2));
                          },
                          0.3
                      ),
                      n(
                          "ElasticInOut",
                          function (t) {
                              return (t *= 2) < 1 ? -0.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * 0.5 + 1;
                          },
                          0.45
                      )
                  ),
                  u(
                      "Expo",
                      h("ExpoOut", function (t) {
                          return 1 - Math.pow(2, -10 * t);
                      }),
                      h("ExpoIn", function (t) {
                          return Math.pow(2, 10 * (t - 1)) - 0.001;
                      }),
                      h("ExpoInOut", function (t) {
                          return (t *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
                      })
                  ),
                  u(
                      "Sine",
                      h("SineOut", function (t) {
                          return Math.sin(t * a);
                      }),
                      h("SineIn", function (t) {
                          return -Math.cos(t * a) + 1;
                      }),
                      h("SineInOut", function (t) {
                          return -0.5 * (Math.cos(Math.PI * t) - 1);
                      })
                  ),
                  l(
                      "easing.EaseLookup",
                      {
                          find: function (e) {
                              return t.map[e];
                          },
                      },
                      !0
                  ),
                  c(r.SlowMo, "SlowMo", "ease,"),
                  c(i, "RoughEase", "ease,"),
                  c(e, "SteppedEase", "ease,"),
                  d
              );
          },
          !0
      );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t, e) {
      "use strict";
      var i = {},
          n = t.document,
          r = (t.GreenSockGlobals = t.GreenSockGlobals || t);
      if (!r.TweenLite) {
          var s,
              o,
              a,
              l,
              h,
              c = function (t) {
                  var e,
                      i = t.split("."),
                      n = r;
                  for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                  return n;
              },
              u = c("com.greensock"),
              f = 1e-10,
              p = function (t) {
                  var e,
                      i = [],
                      n = t.length;
                  for (e = 0; e !== n; i.push(t[e++]));
                  return i;
              },
              d = function () {},
              m = (function () {
                  var t = Object.prototype.toString,
                      e = t.call([]);
                  return function (i) {
                      return null != i && (i instanceof Array || ("object" == typeof i && !!i.push && t.call(i) === e));
                  };
              })(),
              g = {},
              _ = function (n, s, o, a) {
                  (this.sc = g[n] ? g[n].sc : []), (g[n] = this), (this.gsClass = null), (this.func = o);
                  var l = [];
                  (this.check = function (h) {
                      for (var u, f, p, d, m, v = s.length, y = v; --v > -1; ) (u = g[s[v]] || new _(s[v], [])).gsClass ? ((l[v] = u.gsClass), y--) : h && u.sc.push(this);
                      if (0 === y && o) {
                          if (((f = ("com.greensock." + n).split(".")), (p = f.pop()), (d = c(f.join("."))[p] = this.gsClass = o.apply(o, l)), a))
                              if (((r[p] = i[p] = d), (m = "undefined" != typeof module && module.exports), !m && "function" == typeof define && define.amd))
                                  define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function () {
                                      return d;
                                  });
                              else if (m)
                                  if (n === e) {
                                      module.exports = i[e] = d;
                                      for (v in i) d[v] = i[v];
                                  } else i[e] && (i[e][p] = d);
                          for (v = 0; v < this.sc.length; v++) this.sc[v].check();
                      }
                  }),
                      this.check(!0);
              },
              v = (t._gsDefine = function (t, e, i, n) {
                  return new _(t, e, i, n);
              }),
              y = (u._class = function (t, e, i) {
                  return (
                      (e = e || function () {}),
                      v(
                          t,
                          [],
                          function () {
                              return e;
                          },
                          i
                      ),
                      e
                  );
              });
          v.globals = r;
          var w = [0, 0, 1, 1],
              x = y(
                  "easing.Ease",
                  function (t, e, i, n) {
                      (this._func = t), (this._type = i || 0), (this._power = n || 0), (this._params = e ? w.concat(e) : w);
                  },
                  !0
              ),
              b = (x.map = {}),
              T = (x.register = function (t, e, i, n) {
                  for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1; )
                      for (s = l[h], r = n ? y("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1; ) (a = c[o]), (b[s + "." + a] = b[a + s] = r[a] = t.getRatio ? t : t[a] || new t());
              });
          for (
              a = x.prototype,
                  a._calcEnd = !1,
                  a.getRatio = function (t) {
                      if (this._func) return (this._params[0] = t), this._func.apply(null, this._params);
                      var e = this._type,
                          i = this._power,
                          n = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
                      return 1 === i ? (n *= n) : 2 === i ? (n *= n * n) : 3 === i ? (n *= n * n * n) : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : 0.5 > t ? n / 2 : 1 - n / 2;
                  },
                  s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
                  o = s.length;
              --o > -1;

          )
              (a = s[o] + ",Power" + o), T(new x(null, null, 1, o), a, "easeOut", !0), T(new x(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new x(null, null, 3, o), a, "easeInOut");
          (b.linear = u.easing.Linear.easeIn), (b.swing = u.easing.Quad.easeInOut);
          var C = y("events.EventDispatcher", function (t) {
              (this._listeners = {}), (this._eventTarget = t || this);
          });
          (a = C.prototype),
              (a.addEventListener = function (t, e, i, n, r) {
                  r = r || 0;
                  var s,
                      o,
                      a = this._listeners[t],
                      c = 0;
                  for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1; ) (s = a[o]), s.c === e && s.s === i ? a.splice(o, 1) : 0 === c && s.pr < r && (c = o + 1);
                  a.splice(c, 0, { c: e, s: i, up: n, pr: r });
              }),
              (a.removeEventListener = function (t, e) {
                  var i,
                      n = this._listeners[t];
                  if (n) for (i = n.length; --i > -1; ) if (n[i].c === e) return void n.splice(i, 1);
              }),
              (a.dispatchEvent = function (t) {
                  var e,
                      i,
                      n,
                      r = this._listeners[t];
                  if (r) for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1; ) (n = r[e]), n && (n.up ? n.c.call(n.s || i, { type: t, target: i }) : n.c.call(n.s || i));
              });
          var S = t.requestAnimationFrame,
              k = t.cancelAnimationFrame,
              P =
                  Date.now ||
                  function () {
                      return new Date().getTime();
                  },
              E = P();
          for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !S; ) (S = t[s[o] + "RequestAnimationFrame"]), (k = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"]);
          y("Ticker", function (t, e) {
              var i,
                  r,
                  s,
                  o,
                  a,
                  c = this,
                  u = P(),
                  p = !(e === !1 || !S) && "auto",
                  m = 500,
                  g = 33,
                  _ = "tick",
                  v = function (t) {
                      var e,
                          n,
                          l = P() - E;
                      l > m && (u += l - g), (E += l), (c.time = (E - u) / 1e3), (e = c.time - a), (!i || e > 0 || t === !0) && (c.frame++, (a += e + (e >= o ? 0.004 : o - e)), (n = !0)), t !== !0 && (s = r(v)), n && c.dispatchEvent(_);
                  };
              C.call(c),
                  (c.time = c.frame = 0),
                  (c.tick = function () {
                      v(!0);
                  }),
                  (c.lagSmoothing = function (t, e) {
                      (m = t || 1 / f), (g = Math.min(e, m, 0));
                  }),
                  (c.sleep = function () {
                      null != s && (p && k ? k(s) : clearTimeout(s), (r = d), (s = null), c === l && (h = !1));
                  }),
                  (c.wake = function (t) {
                      null !== s ? c.sleep() : t ? (u += -E + (E = P())) : c.frame > 10 && (E = P() - m + 5),
                          (r =
                              0 === i
                                  ? d
                                  : p && S
                                  ? S
                                  : function (t) {
                                        return setTimeout(t, (1e3 * (a - c.time) + 1) | 0);
                                    }),
                          c === l && (h = !0),
                          v(2);
                  }),
                  (c.fps = function (t) {
                      return arguments.length ? ((i = t), (o = 1 / (i || 60)), (a = this.time + o), void c.wake()) : i;
                  }),
                  (c.useRAF = function (t) {
                      return arguments.length ? (c.sleep(), (p = t), void c.fps(i)) : p;
                  }),
                  c.fps(t),
                  setTimeout(function () {
                      "auto" === p && c.frame < 5 && "hidden" !== n.visibilityState && c.useRAF(!1);
                  }, 1500);
          }),
              (a = u.Ticker.prototype = new u.events.EventDispatcher()),
              (a.constructor = u.Ticker);
          var A = y("core.Animation", function (t, e) {
              if (
                  ((this.vars = e = e || {}),
                  (this._duration = this._totalDuration = t || 0),
                  (this._delay = Number(e.delay) || 0),
                  (this._timeScale = 1),
                  (this._active = e.immediateRender === !0),
                  (this.data = e.data),
                  (this._reversed = e.reversed === !0),
                  V)
              ) {
                  h || l.wake();
                  var i = this.vars.useFrames ? U : V;
                  i.add(this, i._time), this.vars.paused && this.paused(!0);
              }
          });
          (l = A.ticker = new u.Ticker()),
              (a = A.prototype),
              (a._dirty = a._gc = a._initted = a._paused = !1),
              (a._totalTime = a._time = 0),
              (a._rawPrevTime = -1),
              (a._next = a._last = a._onUpdate = a._timeline = a.timeline = null),
              (a._paused = !1);
          var O = function () {
              h && P() - E > 2e3 && l.wake(), setTimeout(O, 2e3);
          };
          O(),
              (a.play = function (t, e) {
                  return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
              }),
              (a.pause = function (t, e) {
                  return null != t && this.seek(t, e), this.paused(!0);
              }),
              (a.resume = function (t, e) {
                  return null != t && this.seek(t, e), this.paused(!1);
              }),
              (a.seek = function (t, e) {
                  return this.totalTime(Number(t), e !== !1);
              }),
              (a.restart = function (t, e) {
                  return this.reversed(!1)
                      .paused(!1)
                      .totalTime(t ? -this._delay : 0, e !== !1, !0);
              }),
              (a.reverse = function (t, e) {
                  return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
              }),
              (a.render = function (t, e, i) {}),
              (a.invalidate = function () {
                  return (this._time = this._totalTime = 0), (this._initted = this._gc = !1), (this._rawPrevTime = -1), (this._gc || !this.timeline) && this._enabled(!0), this;
              }),
              (a.isActive = function () {
                  var t,
                      e = this._timeline,
                      i = this._startTime;
                  return !e || (!this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale);
              }),
              (a._enabled = function (t, e) {
                  return (
                      h || l.wake(),
                      (this._gc = !t),
                      (this._active = this.isActive()),
                      e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
                      !1
                  );
              }),
              (a._kill = function (t, e) {
                  return this._enabled(!1, !1);
              }),
              (a.kill = function (t, e) {
                  return this._kill(t, e), this;
              }),
              (a._uncache = function (t) {
                  for (var e = t ? this : this.timeline; e; ) (e._dirty = !0), (e = e.timeline);
                  return this;
              }),
              (a._swapSelfInParams = function (t) {
                  for (var e = t.length, i = t.concat(); --e > -1; ) "{self}" === t[e] && (i[e] = this);
                  return i;
              }),
              (a._callback = function (t) {
                  var e = this.vars,
                      i = e[t],
                      n = e[t + "Params"],
                      r = e[t + "Scope"] || e.callbackScope || this,
                      s = n ? n.length : 0;
                  switch (s) {
                      case 0:
                          i.call(r);
                          break;
                      case 1:
                          i.call(r, n[0]);
                          break;
                      case 2:
                          i.call(r, n[0], n[1]);
                          break;
                      default:
                          i.apply(r, n);
                  }
              }),
              (a.eventCallback = function (t, e, i, n) {
                  if ("on" === (t || "").substr(0, 2)) {
                      var r = this.vars;
                      if (1 === arguments.length) return r[t];
                      null == e ? delete r[t] : ((r[t] = e), (r[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i), (r[t + "Scope"] = n)), "onUpdate" === t && (this._onUpdate = e);
                  }
                  return this;
              }),
              (a.delay = function (t) {
                  return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), (this._delay = t), this) : this._delay;
              }),
              (a.duration = function (t) {
                  return arguments.length
                      ? ((this._duration = this._totalDuration = t),
                        this._uncache(!0),
                        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
                        this)
                      : ((this._dirty = !1), this._duration);
              }),
              (a.totalDuration = function (t) {
                  return (this._dirty = !1), arguments.length ? this.duration(t) : this._totalDuration;
              }),
              (a.time = function (t, e) {
                  return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
              }),
              (a.totalTime = function (t, e, i) {
                  if ((h || l.wake(), !arguments.length)) return this._totalTime;
                  if (this._timeline) {
                      if ((0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming)) {
                          this._dirty && this.totalDuration();
                          var n = this._totalDuration,
                              r = this._timeline;
                          if ((t > n && !i && (t = n), (this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale), r._dirty || this._uncache(!1), r._timeline))
                              for (; r._timeline; ) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), (r = r._timeline);
                      }
                      this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (M.length && Q(), this.render(t, e, !1), M.length && Q());
                  }
                  return this;
              }),
              (a.progress = a.totalProgress = function (t, e) {
                  var i = this.duration();
                  return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio;
              }),
              (a.startTime = function (t) {
                  return arguments.length ? (t !== this._startTime && ((this._startTime = t), this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime;
              }),
              (a.endTime = function (t) {
                  return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale;
              }),
              (a.timeScale = function (t) {
                  if (!arguments.length) return this._timeScale;
                  if (((t = t || f), this._timeline && this._timeline.smoothChildTiming)) {
                      var e = this._pauseTime,
                          i = e || 0 === e ? e : this._timeline.totalTime();
                      this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
                  }
                  return (this._timeScale = t), this._uncache(!1);
              }),
              (a.reversed = function (t) {
                  return arguments.length
                      ? (t != this._reversed && ((this._reversed = t), this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this)
                      : this._reversed;
              }),
              (a.paused = function (t) {
                  if (!arguments.length) return this._paused;
                  var e,
                      i,
                      n = this._timeline;
                  return (
                      t != this._paused &&
                          n &&
                          (h || t || l.wake(),
                          (e = n.rawTime()),
                          (i = e - this._pauseTime),
                          !t && n.smoothChildTiming && ((this._startTime += i), this._uncache(!1)),
                          (this._pauseTime = t ? e : null),
                          (this._paused = t),
                          (this._active = this.isActive()),
                          !t && 0 !== i && this._initted && this.duration() && ((e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale), this.render(e, e === this._totalTime, !0))),
                      this._gc && !t && this._enabled(!0, !1),
                      this
                  );
              });
          var $ = y("core.SimpleTimeline", function (t) {
              A.call(this, 0, t), (this.autoRemoveChildren = this.smoothChildTiming = !0);
          });
          (a = $.prototype = new A()),
              (a.constructor = $),
              (a.kill()._gc = !1),
              (a._first = a._last = a._recent = null),
              (a._sortChildren = !1),
              (a.add = a.insert = function (t, e, i, n) {
                  var r, s;
                  if (
                      ((t._startTime = Number(e || 0) + t._delay),
                      t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
                      t.timeline && t.timeline._remove(t, !0),
                      (t.timeline = t._timeline = this),
                      t._gc && t._enabled(!0, !0),
                      (r = this._last),
                      this._sortChildren)
                  )
                      for (s = t._startTime; r && r._startTime > s; ) r = r._prev;
                  return (
                      r ? ((t._next = r._next), (r._next = t)) : ((t._next = this._first), (this._first = t)), t._next ? (t._next._prev = t) : (this._last = t), (t._prev = r), (this._recent = t), this._timeline && this._uncache(!0), this
                  );
              }),
              (a._remove = function (t, e) {
                  return (
                      t.timeline === this &&
                          (e || t._enabled(!1, !0),
                          t._prev ? (t._prev._next = t._next) : this._first === t && (this._first = t._next),
                          t._next ? (t._next._prev = t._prev) : this._last === t && (this._last = t._prev),
                          (t._next = t._prev = t.timeline = null),
                          t === this._recent && (this._recent = this._last),
                          this._timeline && this._uncache(!0)),
                      this
                  );
              }),
              (a.render = function (t, e, i) {
                  var n,
                      r = this._first;
                  for (this._totalTime = this._time = this._rawPrevTime = t; r; )
                      (n = r._next),
                          (r._active || (t >= r._startTime && !r._paused)) &&
                              (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                          (r = n);
              }),
              (a.rawTime = function () {
                  return h || l.wake(), this._totalTime;
              });
          var D = y(
                  "TweenLite",
                  function (e, i, n) {
                      if ((A.call(this, i, n), (this.render = D.prototype.render), null == e)) throw "Cannot tween a null target.";
                      this.target = e = "string" != typeof e ? e : D.selector(e) || e;
                      var r,
                          s,
                          o,
                          a = e.jquery || (e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
                          l = this.vars.overwrite;
                      if (((this._overwrite = l = null == l ? Y[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : Y[l]), (a || e instanceof Array || (e.push && m(e))) && "number" != typeof e[0]))
                          for (this._targets = o = p(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++)
                              (s = o[r]),
                                  s
                                      ? "string" != typeof s
                                          ? s.length && s !== t && s[0] && (s[0] === t || (s[0].nodeType && s[0].style && !s.nodeType))
                                              ? (o.splice(r--, 1), (this._targets = o = o.concat(p(s))))
                                              : ((this._siblings[r] = Z(s, this, !1)), 1 === l && this._siblings[r].length > 1 && K(s, this, null, 1, this._siblings[r]))
                                          : ((s = o[r--] = D.selector(s)), "string" == typeof s && o.splice(r + 1, 1))
                                      : o.splice(r--, 1);
                      else (this._propLookup = {}), (this._siblings = Z(e, this, !1)), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
                      (this.vars.immediateRender || (0 === i && 0 === this._delay && this.vars.immediateRender !== !1)) && ((this._time = -f), this.render(Math.min(0, -this._delay)));
                  },
                  !0
              ),
              N = function (e) {
                  return e && e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType));
              },
              R = function (t, e) {
                  var i,
                      n = {};
                  for (i in t)
                      X[i] || (i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i) || !(!B[i] || (B[i] && B[i]._autoCSS)) || ((n[i] = t[i]), delete t[i]);
                  t.css = n;
              };
          (a = D.prototype = new A()),
              (a.constructor = D),
              (a.kill()._gc = !1),
              (a.ratio = 0),
              (a._firstPT = a._targets = a._overwrittenProps = a._startAt = null),
              (a._notifyPluginsOfEnabled = a._lazy = !1),
              (D.version = "1.19.1"),
              (D.defaultEase = a._ease = new x(null, null, 1, 1)),
              (D.defaultOverwrite = "auto"),
              (D.ticker = l),
              (D.autoSleep = 120),
              (D.lagSmoothing = function (t, e) {
                  l.lagSmoothing(t, e);
              }),
              (D.selector =
                  t.$ ||
                  t.jQuery ||
                  function (e) {
                      var i = t.$ || t.jQuery;
                      return i ? ((D.selector = i), i(e)) : "undefined" == typeof n ? e : n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
                  });
          var M = [],
              L = {},
              z = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
              j = function (t) {
                  for (var e, i = this._firstPT, n = 1e-6; i; )
                      (e = i.blob ? (1 === t ? this.end : t ? this.join("") : this.start) : i.c * t + i.s),
                          i.m ? (e = i.m(e, this._target || i.t)) : n > e && e > -n && !i.blob && (e = 0),
                          i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
                          (i = i._next);
              },
              F = function (t, e, i, n) {
                  var r,
                      s,
                      o,
                      a,
                      l,
                      h,
                      c,
                      u = [],
                      f = 0,
                      p = "",
                      d = 0;
                  for (
                      u.start = t,
                          u.end = e,
                          t = u[0] = t + "",
                          e = u[1] = e + "",
                          i && (i(u), (t = u[0]), (e = u[1])),
                          u.length = 0,
                          r = t.match(z) || [],
                          s = e.match(z) || [],
                          n && ((n._next = null), (n.blob = 1), (u._firstPT = u._applyPT = n)),
                          l = s.length,
                          a = 0;
                      l > a;
                      a++
                  )
                      (c = s[a]),
                          (h = e.substr(f, e.indexOf(c, f) - f)),
                          (p += h || !a ? h : ","),
                          (f += h.length),
                          d ? (d = (d + 1) % 5) : "rgba(" === h.substr(-5) && (d = 1),
                          c === r[a] || r.length <= a
                              ? (p += c)
                              : (p && (u.push(p), (p = "")),
                                (o = parseFloat(r[a])),
                                u.push(o),
                                (u._firstPT = {
                                    _next: u._firstPT,
                                    t: u,
                                    p: u.length - 1,
                                    s: o,
                                    c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                                    f: 0,
                                    m: d && 4 > d ? Math.round : 0,
                                })),
                          (f += c.length);
                  return (p += e.substr(f)), p && u.push(p), (u.setRatio = j), u;
              },
              I = function (t, e, i, n, r, s, o, a, l) {
                  "function" == typeof n && (n = n(l || 0, t));
                  var h,
                      c = typeof t[e],
                      u = "function" !== c ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                      f = "get" !== i ? i : u ? (o ? t[u](o) : t[u]()) : t[e],
                      p = "string" == typeof n && "=" === n.charAt(1),
                      d = { t: t, p: e, s: f, f: "function" === c, pg: 0, n: r || e, m: s ? ("function" == typeof s ? s : Math.round) : 0, pr: 0, c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - f || 0 };
                  return (
                      ("number" != typeof f || ("number" != typeof n && !p)) &&
                          (o || isNaN(f) || (!p && isNaN(n)) || "boolean" == typeof f || "boolean" == typeof n
                              ? ((d.fp = o), (h = F(f, p ? d.s + d.c : n, a || D.defaultStringFilter, d)), (d = { t: h, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: r || e, pr: 0, m: 0 }))
                              : ((d.s = parseFloat(f)), p || (d.c = parseFloat(n) - d.s || 0))),
                      d.c ? ((d._next = this._firstPT) && (d._next._prev = d), (this._firstPT = d), d) : void 0
                  );
              },
              H = (D._internals = { isArray: m, isSelector: N, lazyTweens: M, blobDif: F }),
              B = (D._plugins = {}),
              q = (H.tweenLookup = {}),
              W = 0,
              X = (H.reservedProps = {
                  ease: 1,
                  delay: 1,
                  overwrite: 1,
                  onComplete: 1,
                  onCompleteParams: 1,
                  onCompleteScope: 1,
                  useFrames: 1,
                  runBackwards: 1,
                  startAt: 1,
                  onUpdate: 1,
                  onUpdateParams: 1,
                  onUpdateScope: 1,
                  onStart: 1,
                  onStartParams: 1,
                  onStartScope: 1,
                  onReverseComplete: 1,
                  onReverseCompleteParams: 1,
                  onReverseCompleteScope: 1,
                  onRepeat: 1,
                  onRepeatParams: 1,
                  onRepeatScope: 1,
                  easeParams: 1,
                  yoyo: 1,
                  immediateRender: 1,
                  repeat: 1,
                  repeatDelay: 1,
                  data: 1,
                  paused: 1,
                  reversed: 1,
                  autoCSS: 1,
                  lazy: 1,
                  onOverwrite: 1,
                  callbackScope: 1,
                  stringFilter: 1,
                  id: 1,
              }),
              Y = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
              U = (A._rootFramesTimeline = new $()),
              V = (A._rootTimeline = new $()),
              G = 30,
              Q = (H.lazyRender = function () {
                  var t,
                      e = M.length;
                  for (L = {}; --e > -1; ) (t = M[e]), t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
                  M.length = 0;
              });
          (V._startTime = l.time),
              (U._startTime = l.frame),
              (V._active = U._active = !0),
              setTimeout(Q, 1),
              (A._updateRoot = D.render = function () {
                  var t, e, i;
                  if ((M.length && Q(), V.render((l.time - V._startTime) * V._timeScale, !1, !1), U.render((l.frame - U._startTime) * U._timeScale, !1, !1), M.length && Q(), l.frame >= G)) {
                      G = l.frame + (parseInt(D.autoSleep, 10) || 120);
                      for (i in q) {
                          for (e = q[i].tweens, t = e.length; --t > -1; ) e[t]._gc && e.splice(t, 1);
                          0 === e.length && delete q[i];
                      }
                      if (((i = V._first), (!i || i._paused) && D.autoSleep && !U._first && 1 === l._listeners.tick.length)) {
                          for (; i && i._paused; ) i = i._next;
                          i || l.sleep();
                      }
                  }
              }),
              l.addEventListener("tick", A._updateRoot);
          var Z = function (t, e, i) {
                  var n,
                      r,
                      s = t._gsTweenID;
                  if ((q[s || (t._gsTweenID = s = "t" + W++)] || (q[s] = { target: t, tweens: [] }), e && ((n = q[s].tweens), (n[(r = n.length)] = e), i))) for (; --r > -1; ) n[r] === e && n.splice(r, 1);
                  return q[s].tweens;
              },
              J = function (t, e, i, n) {
                  var r,
                      s,
                      o = t.vars.onOverwrite;
                  return o && (r = o(t, e, i, n)), (o = D.onOverwrite), o && (s = o(t, e, i, n)), r !== !1 && s !== !1;
              },
              K = function (t, e, i, n, r) {
                  var s, o, a, l;
                  if (1 === n || n >= 4) {
                      for (l = r.length, s = 0; l > s; s++)
                          if ((a = r[s]) !== e) a._gc || (a._kill(null, t, e) && (o = !0));
                          else if (5 === n) break;
                      return o;
                  }
                  var h,
                      c = e._startTime + f,
                      u = [],
                      p = 0,
                      d = 0 === e._duration;
                  for (s = r.length; --s > -1; )
                      (a = r[s]) === e ||
                          a._gc ||
                          a._paused ||
                          (a._timeline !== e._timeline
                              ? ((h = h || tt(e, 0, d)), 0 === tt(a, h, d) && (u[p++] = a))
                              : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && (((d || !a._initted) && c - a._startTime <= 2e-10) || (u[p++] = a)));
                  for (s = p; --s > -1; )
                      if (((a = u[s]), 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || (!a._firstPT && a._initted))) {
                          if (2 !== n && !J(a, e)) continue;
                          a._enabled(!1, !1) && (o = !0);
                      }
                  return o;
              },
              tt = function (t, e, i) {
                  for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline; ) {
                      if (((s += n._startTime), (r *= n._timeScale), n._paused)) return -100;
                      n = n._timeline;
                  }
                  return (s /= r), s > e ? s - e : (i && s === e) || (!t._initted && 2 * f > s - e) ? f : (s += t.totalDuration() / t._timeScale / r) > e + f ? 0 : s - e - f;
              };
          (a._init = function () {
              var t,
                  e,
                  i,
                  n,
                  r,
                  s,
                  o = this.vars,
                  a = this._overwrittenProps,
                  l = this._duration,
                  h = !!o.immediateRender,
                  c = o.ease;
              if (o.startAt) {
                  this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), (r = {});
                  for (n in o.startAt) r[n] = o.startAt[n];
                  if (((r.overwrite = !1), (r.immediateRender = !0), (r.lazy = h && o.lazy !== !1), (r.startAt = r.delay = null), (this._startAt = D.to(this.target, 0, r)), h))
                      if (this._time > 0) this._startAt = null;
                      else if (0 !== l) return;
              } else if (o.runBackwards && 0 !== l)
                  if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), (this._startAt = null);
                  else {
                      0 !== this._time && (h = !1), (i = {});
                      for (n in o) (X[n] && "autoCSS" !== n) || (i[n] = o[n]);
                      if (((i.overwrite = 0), (i.data = "isFromStart"), (i.lazy = h && o.lazy !== !1), (i.immediateRender = h), (this._startAt = D.to(this.target, 0, i)), h)) {
                          if (0 === this._time) return;
                      } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
                  }
              if (
                  ((this._ease = c = c ? (c instanceof x ? c : "function" == typeof c ? new x(c, o.easeParams) : b[c] || D.defaultEase) : D.defaultEase),
                  o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)),
                  (this._easeType = this._ease._type),
                  (this._easePower = this._ease._power),
                  (this._firstPT = null),
                  this._targets)
              )
                  for (s = this._targets.length, t = 0; s > t; t++) this._initProps(this._targets[t], (this._propLookup[t] = {}), this._siblings[t], a ? a[t] : null, t) && (e = !0);
              else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
              if ((e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || ("function" != typeof this.target && this._enabled(!1, !1))), o.runBackwards))
                  for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
              (this._onUpdate = o.onUpdate), (this._initted = !0);
          }),
              (a._initProps = function (e, i, n, r, s) {
                  var o, a, l, h, c, u;
                  if (null == e) return !1;
                  L[e._gsTweenID] && Q(), this.vars.css || (e.style && e !== t && e.nodeType && B.css && this.vars.autoCSS !== !1 && R(this.vars, e));
                  for (o in this.vars)
                      if (((u = this.vars[o]), X[o])) u && (u instanceof Array || (u.push && m(u))) && -1 !== u.join("").indexOf("{self}") && (this.vars[o] = u = this._swapSelfInParams(u, this));
                      else if (B[o] && (h = new B[o]())._onInitTween(e, this.vars[o], this, s)) {
                          for (this._firstPT = c = { _next: this._firstPT, t: h, p: "setRatio", s: 0, c: 1, f: 1, n: o, pg: 1, pr: h._priority, m: 0 }, a = h._overwriteProps.length; --a > -1; ) i[h._overwriteProps[a]] = this._firstPT;
                          (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c);
                      } else i[o] = I.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
                  return r && this._kill(r, e)
                      ? this._initProps(e, i, n, r, s)
                      : this._overwrite > 1 && this._firstPT && n.length > 1 && K(e, this, i, this._overwrite, n)
                      ? (this._kill(i, e), this._initProps(e, i, n, r, s))
                      : (this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)) && (L[e._gsTweenID] = !0), l);
              }),
              (a.render = function (t, e, i) {
                  var n,
                      r,
                      s,
                      o,
                      a = this._time,
                      l = this._duration,
                      h = this._rawPrevTime;
                  if (t >= l - 1e-7 && t >= 0)
                      (this._totalTime = this._time = l),
                          (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
                          this._reversed || ((n = !0), (r = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                          0 === l &&
                              (this._initted || !this.vars.lazy || i) &&
                              (this._startTime === this._timeline._duration && (t = 0),
                              (0 > h || (0 >= t && t >= -1e-7) || (h === f && "isPause" !== this.data)) && h !== t && ((i = !0), h > f && (r = "onReverseComplete")),
                              (this._rawPrevTime = o = !e || t || h === t ? t : f));
                  else if (1e-7 > t)
                      (this._totalTime = this._time = 0),
                          (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                          (0 !== a || (0 === l && h > 0)) && ((r = "onReverseComplete"), (n = this._reversed)),
                          0 > t && ((this._active = !1), 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== f || "isPause" !== this.data) && (i = !0), (this._rawPrevTime = o = !e || t || h === t ? t : f))),
                          this._initted || (i = !0);
                  else if (((this._totalTime = this._time = t), this._easeType)) {
                      var c = t / l,
                          u = this._easeType,
                          p = this._easePower;
                      (1 === u || (3 === u && c >= 0.5)) && (c = 1 - c),
                          3 === u && (c *= 2),
                          1 === p ? (c *= c) : 2 === p ? (c *= c * c) : 3 === p ? (c *= c * c * c) : 4 === p && (c *= c * c * c * c),
                          1 === u ? (this.ratio = 1 - c) : 2 === u ? (this.ratio = c) : 0.5 > t / l ? (this.ratio = c / 2) : (this.ratio = 1 - c / 2);
                  } else this.ratio = this._ease.getRatio(t / l);
                  if (this._time !== a || i) {
                      if (!this._initted) {
                          if ((this._init(), !this._initted || this._gc)) return;
                          if (!i && this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)))
                              return (this._time = this._totalTime = a), (this._rawPrevTime = h), M.push(this), void (this._lazy = [t, e]);
                          this._time && !n ? (this.ratio = this._ease.getRatio(this._time / l)) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                      }
                      for (
                          this._lazy !== !1 && (this._lazy = !1),
                              this._active || (!this._paused && this._time !== a && t >= 0 && (this._active = !0)),
                              0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))),
                              s = this._firstPT;
                          s;

                      )
                          s.f ? s.t[s.p](s.c * this.ratio + s.s) : (s.t[s.p] = s.c * this.ratio + s.s), (s = s._next);
                      this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || ((this._time !== a || n || i) && this._callback("onUpdate"))),
                          r &&
                              (!this._gc || i) &&
                              (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i),
                              n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                              !e && this.vars[r] && this._callback(r),
                              0 === l && this._rawPrevTime === f && o !== f && (this._rawPrevTime = 0));
                  }
              }),
              (a._kill = function (t, e, i) {
                  if (("all" === t && (t = null), null == t && (null == e || e === this.target))) return (this._lazy = !1), this._enabled(!1, !1);
                  e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
                  var n,
                      r,
                      s,
                      o,
                      a,
                      l,
                      h,
                      c,
                      u,
                      f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                  if ((m(e) || N(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1; ) this._kill(t, e[n], i) && (l = !0);
                  else {
                      if (this._targets) {
                          for (n = this._targets.length; --n > -1; )
                              if (e === this._targets[n]) {
                                  (a = this._propLookup[n] || {}), (this._overwrittenProps = this._overwrittenProps || []), (r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all");
                                  break;
                              }
                      } else {
                          if (e !== this.target) return !1;
                          (a = this._propLookup), (r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all");
                      }
                      if (a) {
                          if (((h = t || a), (c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill)), i && (D.onOverwrite || this.vars.onOverwrite))) {
                              for (s in h) a[s] && (u || (u = []), u.push(s));
                              if ((u || !t) && !J(this, i, e, u)) return !1;
                          }
                          for (s in h)
                              (o = a[s]) &&
                                  (f && (o.f ? o.t[o.p](o.s) : (o.t[o.p] = o.s), (l = !0)),
                                  o.pg && o.t._kill(h) && (l = !0),
                                  (o.pg && 0 !== o.t._overwriteProps.length) || (o._prev ? (o._prev._next = o._next) : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), (o._next = o._prev = null)),
                                  delete a[s]),
                                  c && (r[s] = 1);
                          !this._firstPT && this._initted && this._enabled(!1, !1);
                      }
                  }
                  return l;
              }),
              (a.invalidate = function () {
                  return (
                      this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this),
                      (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                      (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                      (this._propLookup = this._targets ? {} : []),
                      A.prototype.invalidate.call(this),
                      this.vars.immediateRender && ((this._time = -f), this.render(Math.min(0, -this._delay))),
                      this
                  );
              }),
              (a._enabled = function (t, e) {
                  if ((h || l.wake(), t && this._gc)) {
                      var i,
                          n = this._targets;
                      if (n) for (i = n.length; --i > -1; ) this._siblings[i] = Z(n[i], this, !0);
                      else this._siblings = Z(this.target, this, !0);
                  }
                  return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && D._onPluginEvent(t ? "_onEnable" : "_onDisable", this);
              }),
              (D.to = function (t, e, i) {
                  return new D(t, e, i);
              }),
              (D.from = function (t, e, i) {
                  return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new D(t, e, i);
              }),
              (D.fromTo = function (t, e, i, n) {
                  return (n.startAt = i), (n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender), new D(t, e, n);
              }),
              (D.delayedCall = function (t, e, i, n, r) {
                  return new D(e, 0, { delay: t, onComplete: e, onCompleteParams: i, callbackScope: n, onReverseComplete: e, onReverseCompleteParams: i, immediateRender: !1, lazy: !1, useFrames: r, overwrite: 0 });
              }),
              (D.set = function (t, e) {
                  return new D(t, 0, e);
              }),
              (D.getTweensOf = function (t, e) {
                  if (null == t) return [];
                  t = "string" != typeof t ? t : D.selector(t) || t;
                  var i, n, r, s;
                  if ((m(t) || N(t)) && "number" != typeof t[0]) {
                      for (i = t.length, n = []; --i > -1; ) n = n.concat(D.getTweensOf(t[i], e));
                      for (i = n.length; --i > -1; ) for (s = n[i], r = i; --r > -1; ) s === n[r] && n.splice(i, 1);
                  } else for (n = Z(t).concat(), i = n.length; --i > -1; ) (n[i]._gc || (e && !n[i].isActive())) && n.splice(i, 1);
                  return n;
              }),
              (D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
                  "object" == typeof e && ((i = e), (e = !1));
                  for (var n = D.getTweensOf(t, e), r = n.length; --r > -1; ) n[r]._kill(i, t);
              });
          var et = y(
              "plugins.TweenPlugin",
              function (t, e) {
                  (this._overwriteProps = (t || "").split(",")), (this._propName = this._overwriteProps[0]), (this._priority = e || 0), (this._super = et.prototype);
              },
              !0
          );
          if (
              ((a = et.prototype),
              (et.version = "1.19.0"),
              (et.API = 2),
              (a._firstPT = null),
              (a._addTween = I),
              (a.setRatio = j),
              (a._kill = function (t) {
                  var e,
                      i = this._overwriteProps,
                      n = this._firstPT;
                  if (null != t[this._propName]) this._overwriteProps = [];
                  else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
                  for (; n; ) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? ((n._prev._next = n._next), (n._prev = null)) : this._firstPT === n && (this._firstPT = n._next)), (n = n._next);
                  return !1;
              }),
              (a._mod = a._roundProps = function (t) {
                  for (var e, i = this._firstPT; i; ) (e = t[this._propName] || (null != i.n && t[i.n.split(this._propName + "_").join("")])), e && "function" == typeof e && (2 === i.f ? (i.t._applyPT.m = e) : (i.m = e)), (i = i._next);
              }),
              (D._onPluginEvent = function (t, e) {
                  var i,
                      n,
                      r,
                      s,
                      o,
                      a = e._firstPT;
                  if ("_onInitAllProps" === t) {
                      for (; a; ) {
                          for (o = a._next, n = r; n && n.pr > a.pr; ) n = n._next;
                          (a._prev = n ? n._prev : s) ? (a._prev._next = a) : (r = a), (a._next = n) ? (n._prev = a) : (s = a), (a = o);
                      }
                      a = e._firstPT = r;
                  }
                  for (; a; ) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), (a = a._next);
                  return i;
              }),
              (et.activate = function (t) {
                  for (var e = t.length; --e > -1; ) t[e].API === et.API && (B[new t[e]()._propName] = t[e]);
                  return !0;
              }),
              (v.plugin = function (t) {
                  if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                  var e,
                      i = t.propName,
                      n = t.priority || 0,
                      r = t.overwriteProps,
                      s = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" },
                      o = y(
                          "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
                          function () {
                              et.call(this, i, n), (this._overwriteProps = r || []);
                          },
                          t.global === !0
                      ),
                      a = (o.prototype = new et(i));
                  (a.constructor = o), (o.API = t.API);
                  for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                  return (o.version = t.version), et.activate([o]), o;
              }),
              (s = t._gsQueue))
          ) {
              for (o = 0; o < s.length; o++) s[o]();
              for (a in g) g[a].func || t.console.log("GSAP encountered missing dependency: " + a);
          }
          h = !1;
      }
  })("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine.plugin({
      propName: "attr",
      API: 2,
      version: "0.5.0",
      init: function (t, e) {
          var i;
          if ("function" != typeof t.setAttribute) return !1;
          for (i in e) this._addTween(t, "setAttribute", t.getAttribute(i) + "", e[i] + "", i, !1, i), this._overwriteProps.push(i);
          return !0;
      },
  });
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  !(function (t, e) {
      "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? (module.exports = e()) : (t.ScrollMagic = e());
  })(this, function () {
      "use strict";
      var t = function () {};
      (t.version = "2.0.6"), window.addEventListener("mousewheel", function () {});
      var e = "data-scrollmagic-pin-spacer";
      t.Controller = function (n) {
          var s,
              o,
              a = "ScrollMagic.Controller",
              l = "FORWARD",
              h = "REVERSE",
              c = "PAUSED",
              u = i.defaults,
              f = this,
              p = r.extend({}, u, n),
              d = [],
              m = !1,
              g = 0,
              _ = c,
              v = !0,
              y = 0,
              w = !0,
              x = function () {
                  for (var t in p) u.hasOwnProperty(t) || delete p[t];
                  if (((p.container = r.get.elements(p.container)[0]), !p.container)) throw a + " init failed.";
                  (v = p.container === window || p.container === document.body || !document.body.contains(p.container)),
                      v && (p.container = window),
                      (y = C()),
                      p.container.addEventListener("resize", E),
                      p.container.addEventListener("scroll", E);
                  var e = parseInt(p.refreshInterval, 10);
                  (p.refreshInterval = r.type.Number(e) ? e : u.refreshInterval), b();
              },
              b = function () {
                  p.refreshInterval > 0 && (o = window.setTimeout(A, p.refreshInterval));
              },
              T = function () {
                  return p.vertical ? r.get.scrollTop(p.container) : r.get.scrollLeft(p.container);
              },
              C = function () {
                  return p.vertical ? r.get.height(p.container) : r.get.width(p.container);
              },
              S = (this._setScrollPos = function (t) {
                  p.vertical ? (v ? window.scrollTo(r.get.scrollLeft(), t) : (p.container.scrollTop = t)) : v ? window.scrollTo(t, r.get.scrollTop()) : (p.container.scrollLeft = t);
              }),
              k = function () {
                  if (w && m) {
                      var t = r.type.Array(m) ? m : d.slice(0);
                      m = !1;
                      var e = g;
                      g = f.scrollPos();
                      var i = g - e;
                      0 !== i && (_ = i > 0 ? l : h),
                          _ === h && t.reverse(),
                          t.forEach(function (t) {
                              t.update(!0);
                          });
                  }
              },
              P = function () {
                  s = r.rAF(k);
              },
              E = function (t) {
                  "resize" == t.type && ((y = C()), (_ = c)), m !== !0 && ((m = !0), P());
              },
              A = function () {
                  if (!v && y != C()) {
                      var t;
                      try {
                          t = new Event("resize", { bubbles: !1, cancelable: !1 });
                      } catch (e) {
                          (t = document.createEvent("Event")), t.initEvent("resize", !1, !1);
                      }
                      p.container.dispatchEvent(t);
                  }
                  d.forEach(function (t) {
                      t.refresh();
                  }),
                      b();
              };
          this._options = p;
          var O = function (t) {
              if (t.length <= 1) return t;
              var e = t.slice(0);
              return (
                  e.sort(function (t, e) {
                      return t.scrollOffset() > e.scrollOffset() ? 1 : -1;
                  }),
                  e
              );
          };
          return (
              (this.addScene = function (e) {
                  if (r.type.Array(e))
                      e.forEach(function (t) {
                          f.addScene(t);
                      });
                  else if (e instanceof t.Scene)
                      if (e.controller() !== f) e.addTo(f);
                      else if (d.indexOf(e) < 0) {
                          d.push(e),
                              (d = O(d)),
                              e.on("shift.controller_sort", function () {
                                  d = O(d);
                              });
                          for (var i in p.globalSceneOptions) e[i] && e[i].call(e, p.globalSceneOptions[i]);
                      }
                  return f;
              }),
              (this.removeScene = function (t) {
                  if (r.type.Array(t))
                      t.forEach(function (t) {
                          f.removeScene(t);
                      });
                  else {
                      var e = d.indexOf(t);
                      e > -1 && (t.off("shift.controller_sort"), d.splice(e, 1), t.remove());
                  }
                  return f;
              }),
              (this.updateScene = function (e, i) {
                  return (
                      r.type.Array(e)
                          ? e.forEach(function (t) {
                                f.updateScene(t, i);
                            })
                          : i
                          ? e.update(!0)
                          : m !== !0 && e instanceof t.Scene && ((m = m || []), -1 == m.indexOf(e) && m.push(e), (m = O(m)), P()),
                      f
                  );
              }),
              (this.update = function (t) {
                  return E({ type: "resize" }), t && k(), f;
              }),
              (this.scrollTo = function (i, n) {
                  if (r.type.Number(i)) S.call(p.container, i, n);
                  else if (i instanceof t.Scene) i.controller() === f && f.scrollTo(i.scrollOffset(), n);
                  else if (r.type.Function(i)) S = i;
                  else {
                      var s = r.get.elements(i)[0];
                      if (s) {
                          for (; s.parentNode.hasAttribute(e); ) s = s.parentNode;
                          var o = p.vertical ? "top" : "left",
                              a = r.get.offset(p.container),
                              l = r.get.offset(s);
                          v || (a[o] -= f.scrollPos()), f.scrollTo(l[o] - a[o], n);
                      }
                  }
                  return f;
              }),
              (this.scrollPos = function (t) {
                  return arguments.length ? (r.type.Function(t) && (T = t), f) : T.call(f);
              }),
              (this.info = function (t) {
                  var e = { size: y, vertical: p.vertical, scrollPos: g, scrollDirection: _, container: p.container, isDocument: v };
                  return arguments.length ? (void 0 !== e[t] ? e[t] : void 0) : e;
              }),
              (this.loglevel = function () {
                  return f;
              }),
              (this.enabled = function (t) {
                  return arguments.length ? (w != t && ((w = !!t), f.updateScene(d, !0)), f) : w;
              }),
              (this.destroy = function (t) {
                  window.clearTimeout(o);
                  for (var e = d.length; e--; ) d[e].destroy(t);
                  return p.container.removeEventListener("resize", E), p.container.removeEventListener("scroll", E), r.cAF(s), null;
              }),
              x(),
              f
          );
      };
      var i = { defaults: { container: window, vertical: !0, globalSceneOptions: {}, loglevel: 2, refreshInterval: 100 } };
      (t.Controller.addOption = function (t, e) {
          i.defaults[t] = e;
      }),
          (t.Controller.extend = function (e) {
              var i = this;
              (t.Controller = function () {
                  return i.apply(this, arguments), (this.$super = r.extend({}, this)), e.apply(this, arguments) || this;
              }),
                  r.extend(t.Controller, i),
                  (t.Controller.prototype = i.prototype),
                  (t.Controller.prototype.constructor = t.Controller);
          }),
          (t.Scene = function (i) {
              var s,
                  o,
                  a = "BEFORE",
                  l = "DURING",
                  h = "AFTER",
                  c = n.defaults,
                  u = this,
                  f = r.extend({}, c, i),
                  p = a,
                  d = 0,
                  m = { start: 0, end: 0 },
                  g = 0,
                  _ = !0,
                  v = function () {
                      for (var t in f) c.hasOwnProperty(t) || delete f[t];
                      for (var e in c) P(e);
                      S();
                  },
                  y = {};
              (this.on = function (t, e) {
                  return (
                      r.type.Function(e) &&
                          ((t = t.trim().split(" ")),
                          t.forEach(function (t) {
                              var i = t.split("."),
                                  n = i[0],
                                  r = i[1];
                              "*" != n && (y[n] || (y[n] = []), y[n].push({ namespace: r || "", callback: e }));
                          })),
                      u
                  );
              }),
                  (this.off = function (t, e) {
                      return t
                          ? ((t = t.trim().split(" ")),
                            t.forEach(function (t) {
                                var i = t.split("."),
                                    n = i[0],
                                    r = i[1] || "",
                                    s = "*" === n ? Object.keys(y) : [n];
                                s.forEach(function (t) {
                                    for (var i = y[t] || [], n = i.length; n--; ) {
                                        var s = i[n];
                                        !s || (r !== s.namespace && "*" !== r) || (e && e != s.callback) || i.splice(n, 1);
                                    }
                                    i.length || delete y[t];
                                });
                            }),
                            u)
                          : u;
                  }),
                  (this.trigger = function (e, i) {
                      if (e) {
                          var n = e.trim().split("."),
                              r = n[0],
                              s = n[1],
                              o = y[r];
                          o &&
                              o.forEach(function (e) {
                                  (s && s !== e.namespace) || e.callback.call(u, new t.Event(r, e.namespace, u, i));
                              });
                      }
                      return u;
                  }),
                  u
                      .on("change.internal", function (t) {
                          "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? b() : "reverse" === t.what && u.update());
                      })
                      .on("shift.internal", function () {
                          w(), u.update();
                      }),
                  (this.addTo = function (e) {
                      return (
                          e instanceof t.Controller && o != e && (o && o.removeScene(u), (o = e), S(), x(!0), b(!0), w(), o.info("container").addEventListener("resize", T), e.addScene(u), u.trigger("add", { controller: o }), u.update()),
                          u
                      );
                  }),
                  (this.enabled = function (t) {
                      return arguments.length ? (_ != t && ((_ = !!t), u.update(!0)), u) : _;
                  }),
                  (this.remove = function () {
                      if (o) {
                          o.info("container").removeEventListener("resize", T);
                          var t = o;
                          (o = void 0), t.removeScene(u), u.trigger("remove");
                      }
                      return u;
                  }),
                  (this.destroy = function (t) {
                      return u.trigger("destroy", { reset: t }), u.remove(), u.off("*.*"), null;
                  }),
                  (this.update = function (t) {
                      if (o)
                          if (t)
                              if (o.enabled() && _) {
                                  var e,
                                      i = o.info("scrollPos");
                                  (e = f.duration > 0 ? (i - m.start) / (m.end - m.start) : i >= m.start ? 1 : 0), u.trigger("update", { startPos: m.start, endPos: m.end, scrollPos: i }), u.progress(e);
                              } else E && p === l && O(!0);
                          else o.updateScene(u, !1);
                      return u;
                  }),
                  (this.refresh = function () {
                      return x(), b(), u;
                  }),
                  (this.progress = function (t) {
                      if (arguments.length) {
                          var e = !1,
                              i = p,
                              n = o ? o.info("scrollDirection") : "PAUSED",
                              r = f.reverse || t >= d;
                          if (
                              (0 === f.duration
                                  ? ((e = d != t), (d = 1 > t && r ? 0 : 1), (p = 0 === d ? a : l))
                                  : 0 > t && p !== a && r
                                  ? ((d = 0), (p = a), (e = !0))
                                  : t >= 0 && 1 > t && r
                                  ? ((d = t), (p = l), (e = !0))
                                  : t >= 1 && p !== h
                                  ? ((d = 1), (p = h), (e = !0))
                                  : p !== l || r || O(),
                              e)
                          ) {
                              var s = { progress: d, state: p, scrollDirection: n },
                                  c = p != i,
                                  m = function (t) {
                                      u.trigger(t, s);
                                  };
                              c && i !== l && (m("enter"), m(i === a ? "start" : "end")), m("progress"), c && p !== l && (m(p === a ? "start" : "end"), m("leave"));
                          }
                          return u;
                      }
                      return d;
                  });
              var w = function () {
                      (m = { start: g + f.offset }), o && f.triggerElement && (m.start -= o.info("size") * f.triggerHook), (m.end = m.start + f.duration);
                  },
                  x = function (t) {
                      if (s) {
                          var e = "duration";
                          k(e, s.call(u)) && !t && (u.trigger("change", { what: e, newval: f[e] }), u.trigger("shift", { reason: e }));
                      }
                  },
                  b = function (t) {
                      var i = 0,
                          n = f.triggerElement;
                      if (o && (n || g > 0)) {
                          if (n)
                              if (n.parentNode) {
                                  for (var s = o.info(), a = r.get.offset(s.container), l = s.vertical ? "top" : "left"; n.parentNode.hasAttribute(e); ) n = n.parentNode;
                                  var h = r.get.offset(n);
                                  s.isDocument || (a[l] -= o.scrollPos()), (i = h[l] - a[l]);
                              } else u.triggerElement(void 0);
                          var c = i != g;
                          (g = i), c && !t && u.trigger("shift", { reason: "triggerElementPosition" });
                      }
                  },
                  T = function () {
                      f.triggerHook > 0 && u.trigger("shift", { reason: "containerResize" });
                  },
                  C = r.extend(n.validate, {
                      duration: function (t) {
                          if (r.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                              var e = parseFloat(t) / 100;
                              t = function () {
                                  return o ? o.info("size") * e : 0;
                              };
                          }
                          if (r.type.Function(t)) {
                              s = t;
                              try {
                                  t = parseFloat(s());
                              } catch (i) {
                                  t = -1;
                              }
                          }
                          if (((t = parseFloat(t)), !r.type.Number(t) || 0 > t)) throw s ? ((s = void 0), 0) : 0;
                          return t;
                      },
                  }),
                  S = function (t) {
                      (t = arguments.length ? [t] : Object.keys(C)),
                          t.forEach(function (t) {
                              var e;
                              if (C[t])
                                  try {
                                      e = C[t](f[t]);
                                  } catch (i) {
                                      e = c[t];
                                  } finally {
                                      f[t] = e;
                                  }
                          });
                  },
                  k = function (t, e) {
                      var i = !1,
                          n = f[t];
                      return f[t] != e && ((f[t] = e), S(t), (i = n != f[t])), i;
                  },
                  P = function (t) {
                      u[t] ||
                          (u[t] = function (e) {
                              return arguments.length ? ("duration" === t && (s = void 0), k(t, e) && (u.trigger("change", { what: t, newval: f[t] }), n.shifts.indexOf(t) > -1 && u.trigger("shift", { reason: t })), u) : f[t];
                          });
                  };
              (this.controller = function () {
                  return o;
              }),
                  (this.state = function () {
                      return p;
                  }),
                  (this.scrollOffset = function () {
                      return m.start;
                  }),
                  (this.triggerPosition = function () {
                      var t = f.offset;
                      return o && (t += f.triggerElement ? g : o.info("size") * u.triggerHook()), t;
                  });
              var E, A;
              u.on("shift.internal", function (t) {
                  var e = "duration" === t.reason;
                  ((p === h && e) || (p === l && 0 === f.duration)) && O(), e && $();
              })
                  .on("progress.internal", function () {
                      O();
                  })
                  .on("add.internal", function () {
                      $();
                  })
                  .on("destroy.internal", function (t) {
                      u.removePin(t.reset);
                  });
              var O = function (t) {
                      if (E && o) {
                          var e = o.info(),
                              i = A.spacer.firstChild;
                          if (t || p !== l) {
                              var n = { position: A.inFlow ? "relative" : "absolute", top: 0, left: 0 },
                                  s = r.css(i, "position") != n.position;
                              A.pushFollowers
                                  ? f.duration > 0 && (p === h && 0 === parseFloat(r.css(A.spacer, "padding-top")) ? (s = !0) : p === a && 0 === parseFloat(r.css(A.spacer, "padding-bottom")) && (s = !0))
                                  : (n[e.vertical ? "top" : "left"] = f.duration * d),
                                  r.css(i, n),
                                  s && $();
                          } else {
                              "fixed" != r.css(i, "position") && (r.css(i, { position: "fixed" }), $());
                              var c = r.get.offset(A.spacer, !0),
                                  u = f.reverse || 0 === f.duration ? e.scrollPos - m.start : Math.round(d * f.duration * 10) / 10;
                              (c[e.vertical ? "top" : "left"] += u), r.css(A.spacer.firstChild, { top: c.top, left: c.left });
                          }
                      }
                  },
                  $ = function () {
                      if (E && o && A.inFlow) {
                          var t = p === l,
                              e = o.info("vertical"),
                              i = A.spacer.firstChild,
                              n = r.isMarginCollapseType(r.css(A.spacer, "display")),
                              s = {};
                          A.relSize.width || A.relSize.autoFullWidth
                              ? t
                                  ? r.css(E, { width: r.get.width(A.spacer) })
                                  : r.css(E, { width: "100%" })
                              : ((s["min-width"] = r.get.width(e ? E : i, !0, !0)), (s.width = t ? s["min-width"] : "auto")),
                              A.relSize.height
                                  ? t
                                      ? r.css(E, { height: r.get.height(A.spacer) - (A.pushFollowers ? f.duration : 0) })
                                      : r.css(E, { height: "100%" })
                                  : ((s["min-height"] = r.get.height(e ? i : E, !0, !n)), (s.height = t ? s["min-height"] : "auto")),
                              A.pushFollowers && ((s["padding" + (e ? "Top" : "Left")] = f.duration * d), (s["padding" + (e ? "Bottom" : "Right")] = f.duration * (1 - d))),
                              r.css(A.spacer, s);
                      }
                  },
                  D = function () {
                      o && E && p === l && !o.info("isDocument") && O();
                  },
                  N = function () {
                      o &&
                          E &&
                          p === l &&
                          (((A.relSize.width || A.relSize.autoFullWidth) && r.get.width(window) != r.get.width(A.spacer.parentNode)) || (A.relSize.height && r.get.height(window) != r.get.height(A.spacer.parentNode))) &&
                          $();
                  },
                  R = function (t) {
                      o && E && p === l && !o.info("isDocument") && (t.preventDefault(), o._setScrollPos(o.info("scrollPos") - ((t.wheelDelta || t[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)));
                  };
              (this.setPin = function (t, i) {
                  var n = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" };
                  if (((i = r.extend({}, n, i)), (t = r.get.elements(t)[0]), !t)) return u;
                  if ("fixed" === r.css(t, "position")) return u;
                  if (E) {
                      if (E === t) return u;
                      u.removePin();
                  }
                  E = t;
                  var s = E.parentNode.style.display,
                      o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                  E.parentNode.style.display = "none";
                  var a = "absolute" != r.css(E, "position"),
                      l = r.css(E, o.concat(["display"])),
                      h = r.css(E, ["width", "height"]);
                  (E.parentNode.style.display = s), !a && i.pushFollowers && (i.pushFollowers = !1);
                  var c = E.parentNode.insertBefore(document.createElement("div"), E),
                      f = r.extend(l, { position: a ? "relative" : "absolute", boxSizing: "content-box", mozBoxSizing: "content-box", webkitBoxSizing: "content-box" });
                  if (
                      (a || r.extend(f, r.css(E, ["width", "height"])),
                      r.css(c, f),
                      c.setAttribute(e, ""),
                      r.addClass(c, i.spacerClass),
                      (A = {
                          spacer: c,
                          relSize: { width: "%" === h.width.slice(-1), height: "%" === h.height.slice(-1), autoFullWidth: "auto" === h.width && a && r.isMarginCollapseType(l.display) },
                          pushFollowers: i.pushFollowers,
                          inFlow: a,
                      }),
                      !E.___origStyle)
                  ) {
                      E.___origStyle = {};
                      var p = E.style,
                          d = o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                      d.forEach(function (t) {
                          E.___origStyle[t] = p[t] || "";
                      });
                  }
                  return (
                      A.relSize.width && r.css(c, { width: h.width }),
                      A.relSize.height && r.css(c, { height: h.height }),
                      c.appendChild(E),
                      r.css(E, { position: a ? "relative" : "absolute", margin: "auto", top: "auto", left: "auto", bottom: "auto", right: "auto" }),
                      (A.relSize.width || A.relSize.autoFullWidth) && r.css(E, { boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box" }),
                      window.addEventListener("scroll", D),
                      window.addEventListener("resize", D),
                      window.addEventListener("resize", N),
                      E.addEventListener("mousewheel", R),
                      E.addEventListener("DOMMouseScroll", R),
                      O(),
                      u
                  );
              }),
                  (this.removePin = function (t) {
                      if (E) {
                          if ((p === l && O(!0), t || !o)) {
                              var i = A.spacer.firstChild;
                              if (i.hasAttribute(e)) {
                                  var n = A.spacer.style,
                                      s = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"],
                                      a = {};
                                  s.forEach(function (t) {
                                      a[t] = n[t] || "";
                                  }),
                                      r.css(i, a);
                              }
                              A.spacer.parentNode.insertBefore(i, A.spacer), A.spacer.parentNode.removeChild(A.spacer), E.parentNode.hasAttribute(e) || (r.css(E, E.___origStyle), delete E.___origStyle);
                          }
                          window.removeEventListener("scroll", D),
                              window.removeEventListener("resize", D),
                              window.removeEventListener("resize", N),
                              E.removeEventListener("mousewheel", R),
                              E.removeEventListener("DOMMouseScroll", R),
                              (E = void 0);
                      }
                      return u;
                  });
              var M,
                  L = [];
              return (
                  u.on("destroy.internal", function (t) {
                      u.removeClassToggle(t.reset);
                  }),
                  (this.setClassToggle = function (t, e) {
                      var i = r.get.elements(t);
                      return 0 !== i.length && r.type.String(e)
                          ? (L.length > 0 && u.removeClassToggle(),
                            (M = e),
                            (L = i),
                            u.on("enter.internal_class leave.internal_class", function (t) {
                                var e = "enter" === t.type ? r.addClass : r.removeClass;
                                L.forEach(function (t) {
                                    e(t, M);
                                });
                            }),
                            u)
                          : u;
                  }),
                  (this.removeClassToggle = function (t) {
                      return (
                          t &&
                              L.forEach(function (t) {
                                  r.removeClass(t, M);
                              }),
                          u.off("start.internal_class end.internal_class"),
                          (M = void 0),
                          (L = []),
                          u
                      );
                  }),
                  v(),
                  u
              );
          });
      var n = {
          defaults: { duration: 0, offset: 0, triggerElement: void 0, triggerHook: 0.5, reverse: !0, loglevel: 2 },
          validate: {
              offset: function (t) {
                  if (((t = parseFloat(t)), !r.type.Number(t))) throw 0;
                  return t;
              },
              triggerElement: function (t) {
                  if ((t = t || void 0)) {
                      var e = r.get.elements(t)[0];
                      if (!e || !e.parentNode) throw 0;
                      t = e;
                  }
                  return t;
              },
              triggerHook: function (t) {
                  var e = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
                  if (r.type.Number(t)) t = Math.max(0, Math.min(parseFloat(t), 1));
                  else {
                      if (!(t in e)) throw 0;
                      t = e[t];
                  }
                  return t;
              },
              reverse: function (t) {
                  return !!t;
              },
          },
          shifts: ["duration", "offset", "triggerHook"],
      };
      (t.Scene.addOption = function (t, e, i, r) {
          t in n.defaults || ((n.defaults[t] = e), (n.validate[t] = i), r && n.shifts.push(t));
      }),
          (t.Scene.extend = function (e) {
              var i = this;
              (t.Scene = function () {
                  return i.apply(this, arguments), (this.$super = r.extend({}, this)), e.apply(this, arguments) || this;
              }),
                  r.extend(t.Scene, i),
                  (t.Scene.prototype = i.prototype),
                  (t.Scene.prototype.constructor = t.Scene);
          }),
          (t.Event = function (t, e, i, n) {
              n = n || {};
              for (var r in n) this[r] = n[r];
              return (this.type = t), (this.target = this.currentTarget = i), (this.namespace = e || ""), (this.timeStamp = this.timestamp = Date.now()), this;
          });
      var r = (t._util = (function (t) {
          var e,
              i = {},
              n = function (t) {
                  return parseFloat(t) || 0;
              },
              r = function (e) {
                  return e.currentStyle ? e.currentStyle : t.getComputedStyle(e);
              },
              s = function (e, i, s, o) {
                  if (((i = i === document ? t : i), i === t)) o = !1;
                  else if (!u.DomElement(i)) return 0;
                  e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                  var a = (s ? i["offset" + e] || i["outer" + e] : i["client" + e] || i["inner" + e]) || 0;
                  if (s && o) {
                      var l = r(i);
                      a += "Height" === e ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight);
                  }
                  return a;
              },
              o = function (t) {
                  return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (t) {
                      return t[1].toUpperCase();
                  });
              };
          (i.extend = function (t) {
              for (t = t || {}, e = 1; e < arguments.length; e++) if (arguments[e]) for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
              return t;
          }),
              (i.isMarginCollapseType = function (t) {
                  return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1;
              });
          var a = 0,
              l = ["ms", "moz", "webkit", "o"],
              h = t.requestAnimationFrame,
              c = t.cancelAnimationFrame;
          for (e = 0; !h && e < l.length; ++e) (h = t[l[e] + "RequestAnimationFrame"]), (c = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"]);
          h ||
              (h = function (e) {
                  var i = new Date().getTime(),
                      n = Math.max(0, 16 - (i - a)),
                      r = t.setTimeout(function () {
                          e(i + n);
                      }, n);
                  return (a = i + n), r;
              }),
              c ||
                  (c = function (e) {
                      t.clearTimeout(e);
                  }),
              (i.rAF = h.bind(t)),
              (i.cAF = c.bind(t));
          var u = (i.type = function (t) {
              return Object.prototype.toString
                  .call(t)
                  .replace(/^\[object (.+)\]$/, "$1")
                  .toLowerCase();
          });
          (u.String = function (t) {
              return "string" === u(t);
          }),
              (u.Function = function (t) {
                  return "function" === u(t);
              }),
              (u.Array = function (t) {
                  return Array.isArray(t);
              }),
              (u.Number = function (t) {
                  return !u.Array(t) && t - parseFloat(t) + 1 >= 0;
              }),
              (u.DomElement = function (t) {
                  return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName;
              });
          var f = (i.get = {});
          return (
              (f.elements = function (e) {
                  var i = [];
                  if (u.String(e))
                      try {
                          e = document.querySelectorAll(e);
                      } catch (n) {
                          return i;
                      }
                  if ("nodelist" === u(e) || u.Array(e))
                      for (var r = 0, s = (i.length = e.length); s > r; r++) {
                          var o = e[r];
                          i[r] = u.DomElement(o) ? o : f.elements(o);
                      }
                  else (u.DomElement(e) || e === document || e === t) && (i = [e]);
                  return i;
              }),
              (f.scrollTop = function (e) {
                  return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0;
              }),
              (f.scrollLeft = function (e) {
                  return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0;
              }),
              (f.width = function (t, e, i) {
                  return s("width", t, e, i);
              }),
              (f.height = function (t, e, i) {
                  return s("height", t, e, i);
              }),
              (f.offset = function (t, e) {
                  var i = { top: 0, left: 0 };
                  if (t && t.getBoundingClientRect) {
                      var n = t.getBoundingClientRect();
                      (i.top = n.top), (i.left = n.left), e || ((i.top += f.scrollTop()), (i.left += f.scrollLeft()));
                  }
                  return i;
              }),
              (i.addClass = function (t, e) {
                  e && (t.classList ? t.classList.add(e) : (t.className += " " + e));
              }),
              (i.removeClass = function (t, e) {
                  e && (t.classList ? t.classList.remove(e) : (t.className = t.className.replace(RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")));
              }),
              (i.css = function (t, e) {
                  if (u.String(e)) return r(t)[o(e)];
                  if (u.Array(e)) {
                      var i = {},
                          n = r(t);
                      return (
                          e.forEach(function (t) {
                              i[t] = n[o(t)];
                          }),
                          i
                      );
                  }
                  for (var s in e) {
                      var a = e[s];
                      a == parseFloat(a) && (a += "px"), (t.style[o(s)] = a);
                  }
              }),
              i
          );
      })(window || {}));
      return t;
  }),
  (function (t, e) {
      "function" == typeof define && define.amd
          ? define(["ScrollMagic", "TweenMax", "TimelineMax"], e)
          : "object" == typeof exports
          ? (require("gsap"), e(require("scrollmagic"), TweenMax, TimelineMax))
          : e(t.ScrollMagic || (t.jQuery && t.jQuery.ScrollMagic), t.TweenMax || t.TweenLite, t.TimelineMax || t.TimelineLite);
  })(this, function (t, e, i) {
      "use strict";
      var n = "animation.gsap",
          r = window.console || {},
          s = Function.prototype.bind.call(r.error || r.log || function () {}, r);
      t || s("(" + n + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."),
          e || s("(" + n + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs."),
          t.Scene.addOption("tweenChanges", !1, function (t) {
              return !!t;
          }),
          t.Scene.extend(function () {
              var t,
                  r = this,
                  s = function () {
                      r._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + n + ")", "->"), r._log.apply(this, arguments));
                  };
              r.on("progress.plugin_gsap", function () {
                  o();
              }),
                  r.on("destroy.plugin_gsap", function (t) {
                      r.removeTween(t.reset);
                  });
              var o = function () {
                  if (t) {
                      var e = r.progress(),
                          i = r.state();
                      t.repeat && t.repeat() === -1
                          ? "DURING" === i && t.paused()
                              ? t.play()
                              : "DURING" === i || t.paused() || t.pause()
                          : e != t.progress() && (0 === r.duration() ? (e > 0 ? t.play() : t.reverse()) : r.tweenChanges() && t.tweenTo ? t.tweenTo(e * t.duration()) : t.progress(e).pause());
                  }
              };
              (r.setTween = function (n, a, l) {
                  var h;
                  arguments.length > 1 && (arguments.length < 3 && ((l = a), (a = 1)), (n = e.to(n, a, l)));
                  try {
                      (h = i ? new i({ smoothChildTiming: !0 }).add(n) : n), h.pause();
                  } catch (c) {
                      return s(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject"), r;
                  }
                  if (
                      (t && r.removeTween(),
                      (t = h),
                      n.repeat && n.repeat() === -1 && (t.repeat(-1), t.yoyo(n.yoyo())),
                      r.tweenChanges() && !t.tweenTo && s(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic."),
                      t && r.controller() && r.triggerElement() && r.loglevel() >= 2)
                  ) {
                      var u = e.getTweensOf(r.triggerElement()),
                          f = r.controller().info("vertical");
                      u.forEach(function (t, e) {
                          var i = t.vars.css || t.vars,
                              n = f ? void 0 !== i.top || void 0 !== i.bottom : void 0 !== i.left || void 0 !== i.right;
                          if (n) return s(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"), !1;
                      });
                  }
                  if (parseFloat(TweenLite.version) >= 1.14)
                      for (
                          var p,
                              d,
                              m = t.getChildren ? t.getChildren(!0, !0, !1) : [t],
                              g = function () {
                                  s(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
                              },
                              _ = 0;
                          _ < m.length;
                          _++
                      )
                          (p = m[_]),
                              d !== g &&
                                  ((d = p.vars.onOverwrite),
                                  (p.vars.onOverwrite = function () {
                                      d && d.apply(this, arguments), g.apply(this, arguments);
                                  }));
                  return s(3, "added tween"), o(), r;
              }),
                  (r.removeTween = function (e) {
                      return t && (e && t.progress(0).pause(), t.kill(), (t = void 0), s(3, "removed tween (reset: " + (e ? "true" : "false") + ")")), r;
                  });
          });
  }),
  initializeTheme(),
  (function (t) {
      function e() {
          t("a").each(function () {
            this.href.indexOf("/wp-admin/")===-1&&this.href.indexOf("/wp-login.php")===-1||t(this).addClass("wp-link")})}
            t(function(){e();var i={
                anchors:"a",
                blacklist:".wp-link",
                onStart: {
                  duration: 280,
                  render: function (t) {
                      t.addClass("slide-out");
                  },
              },
              onAfter: function (i) {
                  e();
                  var n = t(window.location.hash);
                  if (0 !== n.length) {
                      var r = n.offset().top;
                      t("body, html").animate({ scrollTop: r - 60 }, { duration: 280 });
                  }
                  i.removeClass("slide-out"), initializeTheme();
              },
          };
          t("#page").smoothState(i);
      });
  })(jQuery);
