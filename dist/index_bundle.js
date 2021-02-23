(() => {
  let t;
  let e;
  const r = {
    222: (t, e, r) => {
      function n(t, e, r) {
        const n = "<table border=1>".concat(
          e
            .map((t, e) =>
              "<tr>".concat(
                t
                  .map((t, r) =>
                    t === 1
                      ? "<td \n        data-x="
                          .concat(r, "\n        data-y=")
                          .concat(
                            e,
                            '\n        class="cell alive" \n        style="background-color:#FA58D0; height:10px; width:10px;"></td>'
                          )
                      : "<td \n      data-x="
                          .concat(r, "\n      data-y=")
                          .concat(
                            e,
                            '\n      class="cell dead" \n      style="background-color:#FFFFFF; height:10px; width:10px;"></td>'
                          )
                  )
                  .join(""),
                "</tr>"
              )
            )
            .join(""),
          "</table>"
        );
        (t.innerHTML = n),
          t.querySelector("table").addEventListener("click", (t) => {
            const e = t.target;
            const n = e.getAttribute("data-x");
            const a = e.getAttribute("data-y");
            n >= 0 && a >= 0 && r(Number(n), Number(a));
          });
      }
      function a(t, e, r) {
        const n = t[r];
        if (void 0 === n) return 0;
        const a = n[e];
        return void 0 === a ? 0 : a;
      }
      function o(t, e, r) {
        let o;
        let c = !1;
        r.innerHTML = '<div class="field-wrapper"></div><button>Start</button>';
        const i = r.querySelector(".field-wrapper");
        const u = r.querySelector("button");
        let l = Array.from({ length: e }).map(() =>
          Array.from({ length: t }).fill(0)
        );
        const d = function t(e, r) {
          (l[r][e] = l[r][e] === 0 ? 1 : 0), n(i, l, t);
        };
        function f() {
          (c = !1), (u.innerHTML = "Start"), clearInterval(o);
        }
        n(i, l, d),
          u.addEventListener("click", () => {
            c
              ? f()
              : ((c = !0),
                (u.innerHTML = "Stop"),
                (o = setInterval(() => {
                  (l = (function (t) {
                    return t.map((e, r) =>
                      e.map((e, n) => {
                        let o;
                        const c = (function (t, e, r) {
                          for (var n = 0, o = t - 1; o <= t + 1; o += 1)
                            n += Number(a(r, o, e - 1));
                          for (let c = t - 1; c <= t + 1; c += 1)
                            n += Number(a(r, c, e + 1));
                          return (
                            (n += Number(a(r, t - 1, e))) +
                            Number(a(r, t + 1, e))
                          );
                        })(n, r, t);
                        const i = a(t, n, r);
                        return (o = c) === 3
                          ? 1
                          : o > 3 || o < 2
                          ? 0
                          : o === 2 && i === 1
                          ? 1
                          : 0;
                      })
                    );
                  })(l)),
                    n(i, l, d),
                    (function (t) {
                      for (let e = 0; e < t.length; e += 1)
                        for (let r = t[e], n = 0; n < r.length; n += 1)
                          if (r[n]) return !0;
                      return !1;
                    })(l) || (alert("Death on the block"), f());
                }, 1e3)));
          });
      }
      r.r(e), r.d(e, { createGameOfLife: () => o });
    },
  };
  const n = {};
  function a(t) {
    if (n[t]) return n[t].exports;
    const e = (n[t] = { exports: {} });
    return r[t](e, e.exports, a), e.exports;
  }
  (a.d = (t, e) => {
    for (const r in e)
      a.o(e, r) &&
        !a.o(t, r) &&
        Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
  }),
    (a.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (a.r = (t) => {
      typeof Symbol !== "undefined" &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (t = a(222).createGameOfLife),
    (e = document.createElement("div")),
    document.body.appendChild(e),
    t(10, 10, e);
})();
