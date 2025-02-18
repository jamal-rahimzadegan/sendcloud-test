/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function () {
  "use strict";
  var e = document.createElement("i");
  if (
    (e.style.setProperty("--x", "y"),
    "y" !== e.style.getPropertyValue("--x") && e.msMatchesSelector)
  ) {
    Element.prototype.matches ||
      (Element.prototype.matches = Element.prototype.msMatchesSelector);
    var t,
      r = [],
      n = document,
      o = !1;
    document.addEventListener("DOMContentLoaded", function () {
      o = !0;
    }),
      "classList" in Element.prototype ||
        H("classList", HTMLElement.prototype, Element.prototype),
      "innerHTML" in Element.prototype ||
        H("innerHTML", HTMLElement.prototype, Element.prototype),
      "runtimeStyle" in Element.prototype ||
        H("runtimeStyle", HTMLElement.prototype, Element.prototype),
      "sheet" in SVGStyleElement.prototype ||
        Object.defineProperty(SVGStyleElement.prototype, "sheet", {
          get: function () {
            for (var e, t = document.styleSheets, r = 0; (e = t[r++]); )
              if (e.ownerNode === this) return e;
          },
        });
    var i = {},
      s = new Set(),
      c = !1,
      l = !1,
      a =
        /([\s{;])(--([A-Za-z0-9-_]*)\s*:([^;!}{]+)(!important)?)(?=\s*([;}]|$))/g,
      u =
        /([{;]\s*)([A-Za-z0-9-_]+\s*:[^;}{]*var\([^!;}{]+)(!important)?(?=\s*([;}$]|$))/g,
      f = /-ieVar-([^:]+):/g,
      p = /-ie-([^};]+)/g,
      d =
        /:(hover|active|focus|target|visited|link|:before|:after|:first-letter|:first-line)/;
    M("style", q),
      M('link[rel="stylesheet"]', q),
      M("[ie-style]", function (e) {
        var t = B("{" + e.getAttribute("ie-style")).substr(1);
        e.style.cssText += ";" + t;
        var r = R(e.style);
        r.getters && N(e, r.getters, "%styleAttr"),
          r.setters && G(e, r.setters);
      });
    var m = {
        hover: { on: "mouseenter", off: "mouseleave" },
        focus: { on: "focusin", off: "focusout" },
        active: { on: "CSSActivate", off: "CSSDeactivate" },
      },
      y = null;
    document.addEventListener("mousedown", function (e) {
      setTimeout(function () {
        if (e.target === document.activeElement) {
          var t = document.createEvent("Event");
          t.initEvent("CSSActivate", !0, !0), (y = e.target).dispatchEvent(t);
        }
      });
    }),
      document.addEventListener("mouseup", function () {
        if (y) {
          var e = document.createEvent("Event");
          e.initEvent("CSSDeactivate", !0, !0), y.dispatchEvent(e), (y = null);
        }
      });
    var v = 0,
      h = new MutationObserver(function (e) {
        if (!l)
          for (var t, r = 0; (t = e[r++]); )
            "iecp-needed" !== t.attributeName && J(t.target);
      });
    setTimeout(function () {
      h.observe(document, { attributes: !0, subtree: !0 });
    });
    var S = location.hash;
    addEventListener("hashchange", function (e) {
      var t = document.getElementById(location.hash.substr(1));
      if (t) {
        var r = document.getElementById(S.substr(1));
        J(t), J(r);
      } else J(document);
      S = location.hash;
    });
    var E = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "style"),
      P = E.get;
    (E.get = function () {
      const e = P.call(this);
      return (e.owningElement = this), e;
    }),
      Object.defineProperty(HTMLElement.prototype, "style", E);
    var C = getComputedStyle;
    window.getComputedStyle = function (e) {
      var t = C.apply(this, arguments);
      return (t.computedFor = e), t;
    };
    var g = CSSStyleDeclaration.prototype,
      b = g.getPropertyValue;
    g.getPropertyValue = function (e) {
      if (
        ((this.lastPropertyServedBy = !1),
        "-" !== (e = e.trim())[0] || "-" !== e[1])
      )
        return b.apply(this, arguments);
      const t = e.substr(2),
        r = "-ie-" + t,
        n = "-ie-❗" + t;
      let o = D(this[n] || this[r]);
      if (this.computedFor) {
        if (void 0 === o || T[o]) {
          if (T[o] || !_[e] || _[e].inherits) {
            let t = this.computedFor.parentNode;
            for (; 1 === t.nodeType; ) {
              if (t.ieCP_setters && t.ieCP_setters[e]) {
                var i = getComputedStyle(t),
                  s = D(i[n] || i[r]);
                if (void 0 !== s) {
                  (o = Q(this, s)), (this.lastPropertyServedBy = t);
                  break;
                }
              }
              t = t.parentNode;
            }
          }
        } else (o = Q(this, o)), (this.lastPropertyServedBy = this.computedFor);
        if ("initial" === o) return "";
      }
      return (
        void 0 === o && _[e] && (o = _[e].initialValue), void 0 === o ? "" : o
      );
    };
    var T = { inherit: 1, revert: 1, unset: 1 },
      L = g.setProperty;
    (g.setProperty = function (e, t, r) {
      if ("-" !== e[0] || "-" !== e[1]) return L.apply(this, arguments);
      const n = this.owningElement;
      n && (n.ieCP_setters || (n.ieCP_setters = {}), (n.ieCP_setters[e] = 1)),
        (e = "-ie-" + ("important" === r ? "❗" : "") + e.substr(2)),
        (this.cssText += "; " + e + ":" + k(t) + ";"),
        n && J(n);
    }),
      window.CSS || (window.CSS = {});
    var _ = {};
    CSS.registerProperty = function (e) {
      _[e.name] = e;
    };
  }
  function w(e, t) {
    try {
      return e.querySelectorAll(t);
    } catch (e) {
      return [];
    }
  }
  function M(e, o) {
    for (
      var i,
        s = { selector: e, callback: o, elements: new WeakMap() },
        c = w(n, s.selector),
        l = 0;
      (i = c[l++]);

    )
      s.elements.set(i, !0), s.callback.call(i, i);
    r.push(s),
      t ||
        (t = new MutationObserver(O)).observe(n, {
          childList: !0,
          subtree: !0,
        }),
      A(s);
  }
  function A(e, t) {
    var r,
      i = 0,
      s = [];
    try {
      t && t.matches(e.selector) && s.push(t);
    } catch (e) {}
    for (
      o && Array.prototype.push.apply(s, w(t || n, e.selector));
      (r = s[i++]);

    )
      e.elements.has(r) || (e.elements.set(r, !0), e.callback.call(r, r));
  }
  function V(e) {
    for (var t, n = 0; (t = r[n++]); ) A(t, e);
  }
  function O(e) {
    for (var t, r, n, o, i = 0; (r = e[i++]); )
      for (n = r.addedNodes, t = 0; (o = n[t++]); ) 1 === o.nodeType && V(o);
  }
  function H(e, t, r) {
    var n = Object.getOwnPropertyDescriptor(t, e);
    Object.defineProperty(r, e, n);
  }
  function q(e) {
    if (!e.ieCP_polyfilled && !e.ieCP_elementSheet && e.sheet) {
      if (e.href)
        return (
          (t = e.href),
          (r = function (t) {
            var r = B(t);
            t !== r && j(e, r);
          }),
          (n = new XMLHttpRequest()).open("GET", t),
          n.overrideMimeType("text/css"),
          (n.onload = function () {
            n.status >= 200 && n.status < 400 && r(n.responseText);
          }),
          void n.send()
        );
      var t,
        r,
        n,
        o = e.innerHTML,
        i = B(o);
      o !== i && j(e, i);
    }
  }
  function B(e) {
    return e
      .replace(a, function (e, t, r, n, o, i) {
        return t + "-ie-" + (i ? "❗" : "") + n + ":" + k(o);
      })
      .replace(u, function (e, t, r, n) {
        return t + "-ieVar-" + (n ? "❗" : "") + r + "; " + r;
      });
  }
  function k(e) {
    return e;
  }
  function D(e) {
    return e;
  }
  function R(e) {
    e["z-index"] === e && x();
    const t = e.cssText;
    var r,
      n,
      o = t.match(f);
    if (o) {
      var s = [];
      for (r = 0; (n = o[r++]); ) {
        let t = n.slice(7, -1);
        "❗" === t[0] && (t = t.substr(1)),
          s.push(t),
          i[t] || (i[t] = []),
          i[t].push(e);
      }
    }
    var c = t.match(p);
    if (c) {
      var l = {};
      for (r = 0; (n = c[r++]); ) {
        let e = n.substr(4).split(":"),
          t = e[0],
          r = e[1];
        "❗" === t[0] && (t = t.substr(1)), (l[t] = r);
      }
    }
    return { getters: s, setters: l };
  }
  function j(e, t) {
    (e.sheet.cssText = t), (e.ieCP_polyfilled = !0);
    for (var r, n = e.sheet.rules, o = 0; (r = n[o++]); ) {
      const e = R(r.style);
      e.getters && F(r.selectorText, e.getters),
        e.setters && z(r.selectorText, e.setters);
      const t =
        r.parentRule && r.parentRule.media && r.parentRule.media.mediaText;
      t &&
        (e.getters || e.setters) &&
        matchMedia(t).addListener(function () {
          J(document.documentElement);
        });
    }
    $();
  }
  function F(e, t) {
    I(e),
      M(Z(e), function (r) {
        N(r, t, e), W(r);
      });
  }
  function N(e, t, r) {
    var n,
      o,
      i = 0;
    const s = r.split(",");
    for (
      e.setAttribute("iecp-needed", !0),
        e.ieCPSelectors || (e.ieCPSelectors = {});
      (n = t[i++]);

    )
      for (o = 0; (r = s[o++]); ) {
        const t = r.trim().split("::");
        e.ieCPSelectors[n] || (e.ieCPSelectors[n] = []),
          e.ieCPSelectors[n].push({
            selector: t[0],
            pseudo: t[1] ? "::" + t[1] : "",
          });
      }
  }
  function z(e, t) {
    I(e),
      M(Z(e), function (e) {
        G(e, t);
      });
  }
  function G(e, t) {
    for (var r in (e.ieCP_setters || (e.ieCP_setters = {}), t))
      e.ieCP_setters["--" + r] = 1;
    J(e);
  }
  function $() {
    for (var e in i) {
      let o = i[e];
      for (var t, r = 0; (t = o[r++]); )
        if (!t.owningElement) {
          var n = t["-ieVar-" + e];
          if (
            n &&
            "" !== (n = Q(getComputedStyle(document.documentElement), n))
          )
            try {
              t[e] = n;
            } catch (e) {}
        }
    }
  }
  function I(e) {
    for (var t in ((e = e.split(",")[0]), m)) {
      var r = e.split(":" + t);
      if (r.length > 1) {
        var n = r[1].match(/^[^\s]*/);
        let e = Z(r[0] + n);
        const o = m[t];
        M(e, function (e) {
          e.addEventListener(o.on, K), e.addEventListener(o.off, K);
        });
      }
    }
  }
  function Z(e) {
    return e.replace(d, "").replace(":not()", "");
  }
  function W(e) {
    s.add(e),
      c ||
        ((c = !0),
        requestAnimationFrame(function () {
          (c = !1),
            (l = !0),
            s.forEach(X),
            s.clear(),
            setTimeout(function () {
              l = !1;
            });
        }));
  }
  function X(e) {
    e.ieCP_unique ||
      ((e.ieCP_unique = ++v), e.classList.add("iecp-u" + e.ieCP_unique));
    var t = getComputedStyle(e);
    let r = "";
    for (var n in ((e.runtimeStyle.cssText = ""), e.ieCPSelectors)) {
      var o = t["-ieVar-❗" + n];
      let a = o || t["-ieVar-" + n];
      if (a) {
        var i = {},
          s = Q(t, a, i);
        o && (s += " !important");
        for (var c, l = 0; (c = e.ieCPSelectors[n][l++]); )
          "%styleAttr" === c.selector && (e.style[n] = s),
            (o || !1 === i.allByRoot) &&
              (c.pseudo
                ? (r +=
                    c.selector +
                    ".iecp-u" +
                    e.ieCP_unique +
                    c.pseudo +
                    "{" +
                    n +
                    ":" +
                    s +
                    "}\n")
                : (e.runtimeStyle[n] = s));
      }
    }
    !(function (e, t) {
      if (!e.ieCP_styleEl && t) {
        const t = document.createElement("style");
        (t.ieCP_elementSheet = 1),
          document.head.appendChild(t),
          (e.ieCP_styleEl = t);
      }
      e.ieCP_styleEl && (e.ieCP_styleEl.innerHTML = t);
    })(e, r);
  }
  function J(e) {
    if (e) {
      e === document.documentElement && $();
      var t = e.querySelectorAll("[iecp-needed]");
      e.hasAttribute && e.hasAttribute("iecp-needed") && W(e);
      for (var r, n = 0; (r = t[n++]); ) W(r);
    }
  }
  function K(e) {
    J(e.target);
  }
  function Q(e, t, r) {
    return (function (e, t) {
      let r,
        n,
        o = 0,
        i = null,
        s = 0,
        c = "",
        l = 0;
      for (; (r = e[l++]); ) {
        if (
          ("(" === r &&
            (++o,
            null === i &&
              e[l - 4] + e[l - 3] + e[l - 2] === "var" &&
              ((i = o), (c += e.substring(s, l - 4)), (s = l)),
            e[l - 5] + e[l - 4] + e[l - 3] + e[l - 2] === "calc" && (n = o)),
          ")" === r && i === o)
        ) {
          let r,
            o = e.substring(s, l - 1).trim(),
            a = o.indexOf(",");
          -1 !== a && ((r = o.slice(a + 1)), (o = o.slice(0, a))),
            (c += t(o, r, n)),
            (s = l),
            (i = null);
        }
        ")" === r && n === --o && (n = null);
      }
      return (c += e.substring(s));
    })(t, function (t, n, o) {
      var i = e.getPropertyValue(t);
      return (
        o && (i = i.replace(/^calc\(/, "(")),
        r &&
          e.lastPropertyServedBy !== document.documentElement &&
          (r.allByRoot = !1),
        "" === i && n && (i = Q(e, n, r)),
        i
      );
    });
  }
})();
//# sourceMappingURL=/sm/0d31c8eaba1cbe6281431a1768c1714c7071e7ded57ebaeec897ba2017ae561d.map
