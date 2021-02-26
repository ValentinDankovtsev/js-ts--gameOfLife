(() => {
  "use strict";
  function t(t, n, r) {
    var e = "<table border=1>".concat(
      n
        .map(function (t, n) {
          return "<tr>".concat(
            t
              .map(function (t, r) {
                return 1 === t
                  ? "<td \n        data-x="
                      .concat(r, "\n        data-y=")
                      .concat(
                        n,
                        '\n        class="cell alive" \n        style="background-color:#FA58D0; height:10px; width:10px;"></td>'
                      )
                  : "<td \n      data-x="
                      .concat(r, "\n      data-y=")
                      .concat(
                        n,
                        '\n      class="cell dead" \n      style="background-color:#FFFFFF; height:10px; width:10px;"></td>'
                      );
              })
              .join(""),
            "</tr>"
          );
        })
        .join(""),
      "</table>"
    );
    t.innerHTML = e;
    var a = t.querySelector("table");
    a &&
      a.addEventListener("click", function (t) {
        var n = t.target,
          e = n.getAttribute("data-x"),
          a = n.getAttribute("data-y");
        Number(e) >= 0 && Number(a) >= 0 && r(Number(e), Number(a));
      });
  }
  function n(t, n, r) {
    var e = t[r];
    if (void 0 === e) return 0;
    var a = e[n];
    return void 0 === a ? 0 : a;
  }
  function r(r, e, a) {
    var o,
      c = !1;
    a.innerHTML = '<div class="field-wrapper"></div><button>Start</button>';
    var u = a.querySelector(".field-wrapper"),
      i = a.querySelector("button"),
      d = Array.from({ length: e }).map(function () {
        return Array.from({ length: r }).fill(0);
      }),
      l = function n(r, e) {
        (d[e][r] = 0 === d[e][r] ? 1 : 0), t(u, d, n);
      };
    function f() {
      (c = !1), (i.innerHTML = "Start"), clearInterval(o);
    }
    t(u, d, l),
      i.addEventListener("click", function () {
        c
          ? f()
          : ((c = !0),
            (i.innerHTML = "Stop"),
            (o = setInterval(function () {
              (d = (function (t) {
                return t.map(function (r, e) {
                  return r.map(function (r, a) {
                    var o,
                      c = (function (t, r, e) {
                        for (var a = 0, o = t - 1; o <= t + 1; o += 1)
                          a += Number(n(e, o, r - 1));
                        for (var c = t - 1; c <= t + 1; c += 1)
                          a += Number(n(e, c, r + 1));
                        return (
                          (a += Number(n(e, t - 1, r))) + Number(n(e, t + 1, r))
                        );
                      })(a, e, t),
                      u = n(t, a, e);
                    return 3 === (o = c)
                      ? 1
                      : o > 3 || o < 2
                      ? 0
                      : 2 === o && 1 === u
                      ? 1
                      : 0;
                  });
                });
              })(d)),
                t(u, d, l),
                (function (t) {
                  for (var n = 0; n < t.length; n += 1)
                    for (var r = t[n], e = 0; e < r.length; e += 1)
                      if (r[e]) return !0;
                  return !1;
                })(d) || (alert("Death on the block"), f());
            }, 1e3)));
      });
  }
  var e = document.createElement("div"),
    a = document.createElement("div");
  document.body.appendChild(e),
    document.body.appendChild(a),
    r(3, 3, e),
    r(10, 10, a);
})();
