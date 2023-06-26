var nombre, empresa, telefono, email, comentario, total_peso, no_total_cortes, orientacion = "Horizontal";
function acomoda(a, e, o, t) {
    var r = $("#corte_ancho").val()
        , c = $("#corte_largo").val()
        , l = 1
        , s = 1
        , n = 1
        , i = 1;
    "V" === t ? (n = Math.min(a, e),
        i = Math.max(a, e)) : "H" === t ? (n = Math.max(a, e),
            i = Math.min(a, e)) : (n = a,
                i = e),
        "H" === o ? (l = Math.max(r, c),
            s = Math.min(r, c)) : "V" === o ? (l = Math.min(r, c),
                s = Math.max(r, c)) : (l = r,
                    s = c);
    var m = parseInt(n / l) * parseInt(i / s)
        , u = parseInt(n / l)
        , d = parseInt(i / s);
    return {
        cortesT: m,
        cortesB: u,
        cortesH: d,
        sobranteB: parseFloat((n - u * l).toFixed(2)),
        sobranteH: parseFloat((i - d * s).toFixed(2)),
        areaUtilizada: parseFloat((l * s * parseInt(n / l) * parseInt(i / s)).toFixed(2))
    }
}
function calcular(a, e, o, t, r, c, l) {
    var s = $("#papel_gramaje").val()
        , n = $("#cortes_deseados").val()
        , i = 1
        , m = 0;
    0 === (m = "H" === l ? Math.ceil(n / c) : "V" === l ? Math.ceil(n / c) : Math.ceil(n / r)) || isNaN(m) ? isNaN(m) && (m = 0) : i = m,
        total_peso = (i * (a / 100 * (e / 100) * s / 1e3)).toFixed(4),
        imprimirResultados(r, m, no_total_cortes = r * m, t, o, total_peso, c)
}
function clearCanvas() {
    var a = document.getElementById("micanvas");
    a.getContext("2d").clearRect(0, 0, a.width, a.height)
}
function calcularArea(a, e, o, t, r) {
    var c = (100 * (r * (o * t)) / (a * e)).toFixed(2)
        , l = (100 - c).toFixed(2);
    $("#area_utilizada").text(c),
        $("#area_inutilizada").text(l)
}
function imprimirResultados(a, e, o, t, r, c, l) {
    $("#cortes_pliego").text(a),
        $("#cortes_utilizables").text(l),
        $("#pliegos").text(e),
        $("#numero_cortes").text(o),
        $("#numero_cortes_vertical").text(r),
        $("#numero_cortes_horizontal").text(t),
        $("#peso").text(c)
}
function validarForma() {
    var a = 1;
    return "" === $("#papel_ancho").val() && (a = 0),
        "" === $("#papel_largo").val() && (a = 0),
        "" === $("#corte_largo").val() && (a = 0),
        "" === $("#corte_ancho").val() && (a = 0),
        ($("#papel_ancho").val() > 125 || $("#papel_largo").val() > 125) && (a = 0,
            alert("O valor máximo para largura e/ou comprimento é de 125 cm.")),
        a
}
function reset() {
    $("#papel_ancho").val(""),
        $("#papel_largo").val(""),
        $("#papel_gramaje").val(""),
        $("#corte_ancho").val(""),
        $("#corte_largo").val(""),
        $("#cortes_deseados").val("")
}
function dibujaCuadricula(a, e, o, t, r, c, l, s) {
    s = "R" === s ? "#d9534f" : "#6dab3c",
        s = "white";
    var n = document.getElementById("micanvas").getContext("2d")
        , i = c
        , m = r;
    o *= l,
        t *= l;
    let u = 0
        , d = 0
        , v = 0
        , p = 0;
    for (x = 1; x <= a; x++) {
        for (c = i,
            y = 1; y <= e; y++)
            1 == x && 1 == y && 0 == r && 0 == c && (o > t ? (v = Math.max($("#corte_ancho").val(), $("#corte_largo").val()),
                p = Math.min($("#corte_ancho").val(), $("#corte_largo").val())) : (v = Math.min($("#corte_ancho").val(), $("#corte_largo").val()),
                    p = Math.max($("#corte_ancho").val(), $("#corte_largo").val())),
                u = o,
                d = t),
                n.beginPath(),
                n.fillStyle = s,
                n.rect(r, c, o, t),
                n.fill(),
                n.lineWidth = .5,
                n.strokeStyle = "black",
                n.stroke(),
                c = t * y + i;
        r = o * x + m,
            escreveAltura(u, d, p),
            escreveLargura(u, d, v)
    }
}
function escreveLargura(a, e, o) {
    var t = document.getElementById("micanvas").getContext("2d");
    t.beginPath(),
        t.font = "12px Arial",
        t.fillStyle = "black",
        t.fillText(o, a / 2, e - 1),
        t.closePath()
}
function escreveAltura(a, e, o) {
    var t = document.getElementById("micanvas").getContext("2d");
    t.beginPath(),
        t.font = "12px Arial",
        t.fillStyle = "black",
        t.fillText(o, a + 1, e / 2),
        t.closePath()
}
function isInt(a) {
    return a % 1 == 0
}
function validarEnvioMail() {
    var a = !0;
    return nombre = $("#nombre").val(),
        empresa = $("#empresa").val(),
        telefono = $("#telefono").val(),
        email = $("#email").val(),
        comentario = $("#comentario").text(),
        "" === nombre && (a = !1),
        "" === email && (a = !1),
        a
}
function sendEmail() {
    nombre = $("#nombre").val(),
        empresa = $("#empresa").val(),
        telefono = $("#telefono").val(),
        email = $("#email").val(),
        comentario = $("#comentario").text(),
        papel_ancho = $("#papel_ancho").val(),
        papel_largo = $("#papel_largo").val(),
        papel_gramaje = $("#papel_gramaje").val(),
        corte_ancho = $("#corte_ancho").val(),
        corte_largo = $("#corte_largo").val(),
        cortes_deseados = $("#cortes_deseados").val();
    var a = $("#area_utilizada").text()
        , e = $("#area_inutilizada").text()
        , o = $("#cortes_pliego").text()
        , t = $("#cortes_utilizables").text()
        , r = $("#numero_cortes_horizontal").text()
        , c = $("#numero_cortes_vertical").text()
        , l = $("#pliegos").text()
        , s = $("#numero_cortes").text()
        , n = $("#peso").text()
        , i = document.getElementById("micanvas")
        , m = new Image;
    m.src = i.toDataURL("image/png", 1),
        src_cortes = m.src,
        $.ajax({
            type: "POST",
            url: "SendEmail.php",
            data: {
                src_cortes: src_cortes,
                nombre: nombre,
                empresa: empresa,
                telefono: telefono,
                email: email,
                comentario: comentario,
                papel_ancho: papel_ancho,
                papel_largo: papel_largo,
                papel_gramaje: papel_gramaje,
                corte_ancho: corte_ancho,
                corte_largo: corte_largo,
                cortes_deseados: cortes_deseados,
                cortes_pliegos: o,
                cortes_utilizables: t,
                numero_cortes_horizontal: r,
                numero_cortes_vertical: c,
                pliegos: l,
                numero_cortes: s,
                peso: n,
                area_utilizada: a,
                area_inutilizada: e,
                orientacion: orientacion
            },
            dataType: "json",
            complete: function () {
                $("#enviar_correo").button("reset"),
                    $("#alert_success").fadeIn()
            },
            success: function (a) {
                console.log(a)
            }
        })
}
$(document).ready(function () {
    $("#orientacion_v").click(function (a) {
        if (a.preventDefault(),
            1 === validarForma()) {
            orientacion = "Vertical";
            var e, o, t, r, c = Math.max($("#papel_ancho").val(), $("#papel_largo").val()), l = Math.min($("#papel_ancho").val(), $("#papel_largo").val()), s = $("#corte_ancho").val(), n = $("#corte_largo").val(), i = 250 / c, m = 0;
            clearCanvas(),
                $("#micanvas").attr({
                    width: l * i,
                    height: c * i,
                    style: "background-color: #ddd;"
                }),
                t = (e = acomoda(c, l, "N", "V")).cortesT,
                dibujaCuadricula(e.cortesB, e.cortesH, s, n, 0, 0, i),
                e.sobranteB >= n ? (t += (o = acomoda(e.sobranteB, c, "H", "H")).cortesT,
                    dibujaCuadricula(o.cortesH, o.cortesB, n, s, e.cortesB * s * i, 0, i, "R")) : e.sobranteH >= s ? (t += (o = acomoda(e.sobranteH, l, "H", "H")).cortesT,
                        dibujaCuadricula(o.cortesB, o.cortesH, n, s, 0, e.cortesH * n * i, i, "R")) : o = {
                            cortesT: 0,
                            cortesB: 0,
                            cortesH: 0,
                            sobranteB: 0,
                            sobranteH: 0,
                            areaUtilizada: 0
                        },
                $(this).addClass("disabled"),
                $("#orientacion_h").removeClass("disabled"),
                parseInt(s) < parseInt(n) ? (r = e.cortesT,
                    m = o.cortesT) : (r = o.cortesT,
                        m = e.cortesT),
                calcularArea(c, l, s, n, t),
                calcular(c, l, r, m, t, e.cortesT, "V"),
                escreveAltura(s * i, n * i, $("#corte_largo").val()),
                escreveLargura(s * i, n * i, $("#corte_ancho").val())
        }
    }),
    $("#orientacion_h").click(function (a) {
            if (a.preventDefault(),
                1 === validarForma()) {
                orientacion = "Horizontal";
                var e, o, t, r, c = Math.max($("#papel_ancho").val(), $("#papel_largo").val()), l = Math.min($("#papel_ancho").val(), $("#papel_largo").val()), s = $("#corte_ancho").val(), n = $("#corte_largo").val(), i = 250 / c, m = 0;
                clearCanvas(),
                    $("#micanvas").attr({
                        width: c * i,
                        height: l * i,
                        style: "background-color: #ddd;"
                    }),
                    t = (e = acomoda(c, l, "N", "H")).cortesT,
                    dibujaCuadricula(e.cortesB, e.cortesH, s, n, 0, 0, i),
                    e.sobranteB >= n ? (t += (o = acomoda(e.sobranteB, l, "H", "H")).cortesT,
                        dibujaCuadricula(o.cortesH, o.cortesB, n, s, e.cortesB * s * i, 0, i, "R")) : e.sobranteH >= s ? (t += (o = acomoda(e.sobranteH, c, "H", "H")).cortesT,
                            dibujaCuadricula(o.cortesB, o.cortesH, n, s, 0, e.cortesH * n * i, i, "R")) : o = {
                                cortesT: 0,
                                cortesB: 0,
                                cortesH: 0,
                                sobranteB: 0,
                                sobranteH: 0,
                                areaUtilizada: 0
                            },
                    $(this).addClass("disabled"),
                    $("#orientacion_v").removeClass("disabled"),
                    parseInt(s) < parseInt(n) ? (r = e.cortesT,
                        m = o.cortesT) : (r = o.cortesT,
                            m = e.cortesT),
                    calcularArea(c, l, s, n, t),
                    calcular(c, l, r, m, t, e.cortesT, "H"),
                    escreveAltura(s * i, n * i, $("#corte_largo").val()),
                    escreveLargura(s * i, n * i, $("#corte_ancho").val())
            }
        }),
    $("#maximo").click(function (a) {
            if (a.preventDefault(),
                1 === validarForma()) {
                orientacion = "Maximo";
                var e, o, t, r, c, l, s = Math.max($("#papel_ancho").val(), $("#papel_largo").val()), n = Math.min($("#papel_ancho").val(), $("#papel_largo").val()), i = Math.max($("#corte_ancho").val(), $("#corte_largo").val()), m = Math.min($("#corte_ancho").val(), $("#corte_largo").val()), u = 250 / s, d = n, v = s, p = 0, _ = {
                    a1b: "",
                    a2b: "",
                    a1h: "",
                    a2h: "",
                    sumaCortes: ""
                };
                clearCanvas(),
                    $("#micanvas").attr({
                        width: s * u,
                        height: n * u,
                        style: "background-color: #ddd;"
                    }),
                    $("#orientacion_v").removeClass("disabled"),
                    $("#orientacion_h").removeClass("disabled");
                var h = acomoda(s, n, "H", "M");
                for (l = {
                    a1b: s,
                    a2b: s,
                    a1h: n,
                    a2h: 0,
                    sumaCortes: c = h.cortesT,
                    cortesH1: h.cortesH,
                    cortesB1: h.cortesB,
                    cortesT1: h.cortesT,
                    cortesH2: 0,
                    cortesB2: 0,
                    cortesT2: 0
                },
                    x = 0; x <= h.cortesH; x++)
                    o = s,
                        e = parseFloat((m * x + h.sobranteH).toFixed(2)),
                        t = acomoda(v, d = parseFloat((n - e).toFixed(2)), "H", "N"),
                        r = acomoda(o, e, "V", "N"),
                        (p = t.cortesT + r.cortesT) > c && (l = {
                            a1b: v,
                            a2b: o,
                            a1h: d,
                            a2h: e,
                            sumaCortes: c = p,
                            cortesH1: t.cortesH,
                            cortesB1: t.cortesB,
                            cortesT1: t.cortesT,
                            cortesH2: r.cortesH,
                            cortesB2: r.cortesB,
                            cortesT2: r.cortesT
                        });
                for (_ = {
                    a1b: s,
                    a2b: 0,
                    a1h: n,
                    a2h: n,
                    sumaCortes: c = h.cortesT,
                    cortesH: c,
                    cortesV: 0
                },
                    x = 0; x <= h.cortesB; x++)
                    d = n,
                        o = parseFloat((i * x + h.sobranteB).toFixed(2)),
                        t = acomoda(v = parseFloat((s - o).toFixed(2)), d, "H", "N"),
                        r = acomoda(o, e, "V", "N"),
                        (p = t.cortesT + r.cortesT) > c && (_ = {
                            a1b: v,
                            a2b: o,
                            a1h: d,
                            a2h: e,
                            sumaCortes: c = p,
                            cortesH1: t.cortesH,
                            cortesB1: t.cortesB,
                            cortesT1: t.cortesT,
                            cortesH2: r.cortesH,
                            cortesB2: r.cortesB,
                            cortesT2: r.cortesT
                        });
                _.sumaCortes > l.sumaCortes ? (calcularArea(s, n, i, m, _.sumaCortes),
                    calcular(s, n, _.cortesT2, _.cortesT1, parseInt(_.sumaCortes), _.sumaCortes, "M"),
                    dibujaCuadricula(_.cortesB1, _.cortesH1, i, m, 0, 0, u),
                    dibujaCuadricula(_.cortesB2, _.cortesH2, m, i, _.cortesB1 * i * u, 0, u)) : (calcularArea(s, n, i, m, l.sumaCortes),
                        calcular(s, n, l.cortesT2, l.cortesT1, l.sumaCortes, parseInt(l.sumaCortes), "M"),
                        dibujaCuadricula(l.cortesB1, l.cortesH1, i, m, 0, 0, u),
                        dibujaCuadricula(l.cortesB2, l.cortesH2, m, i, 0, l.cortesH1 * m * u, u))
            }
        }),
        $("#reset").click(function (a) {
            a.preventDefault(),
                clearCanvas(),
                reset()
        }),
        $("#form_calc input").keypress(function (a) {
            return function (a, e) {
                if (key = a.keyCode ? a.keyCode : a.which,
                    8 === key || 9 === key)
                    return !0;
                if (key > 47 && key < 58)
                    return "cortes_deseados" != $(e).attr("id") ? "" === e.value || (regexp = /.[0-9]{2}$/,
                        !regexp.test(e.value)) : "" === e.value || (regexp = /.[0-9]{5}$/,
                            !regexp.test(e.value));
                if (46 === key)
                    return "" !== e.value && (regexp = /^[0-9]+$/,
                        regexp.test(e.value));
                return !1
            }(a, this)
        }),
        $("#imprimir").click(function () {
            var a = document.getElementById("micanvas")
                , e = new Image;
            e.src = a.toDataURL(),
                $("#dibujo").append(e),
                $("#micanvas").hide(),
                $("div.PrintArea").printArea(),
                $("#dibujo > img").remove(),
                $("#micanvas").show()
        }),
        $("#enviar_correo").on("click", function (a) {
            a.preventDefault(),
                validarEnvioMail() ? ($(this).button("loading"),
                    sendEmail()) : alert("Os campos de nome e email são obrigatórios.")
        })
});