/// <reference path="../Scripts/typings/kendo-ui/kendo-ui.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/headjs/headjs.d.ts" />
/// <reference path="../Scripts/typings/filesaver/filesaver.d.ts" />
/// <reference path="../Scripts/typings/cryptojs/cryptojs.d.ts" />
/// <reference path="../Scripts/Proxy.ts" />
function Loading_Show() {
    Loading_MsgClear();
    $('#loading-container').show(null);
}
function Loading_Hide(p) {
    if (p == true) {
        if (!$('#principal').is(":visible"))
            $('#principal').fadeIn("slow");
    }
    else {
        $('#loading-container').hide(null);
        if (!$('#principal').is(":visible"))
            $('#principal').fadeIn("slow");
    }
}
function Loading_Msg(message) {
    $('#loading-msg').append('<br>' + message);
}
function Loading_MsgClear() {
    $('#loading-msg').html('');
}
function CerrarSesion() {
    sessionStorage.setItem("logged", "0");
    sessionStorage.setItem("user", "");
    window.location.assign('Login.html');
}
var idleTime = 0;
// primero cargo Jquery
head.load("../js/kendoui/js/jquery.min.js", "../Config.js", function () {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    // valida sesión
    if ((filename != 'Login.html' && filename != "RecuperarClave.htm" && filename != "ActivacionUsuario.html") &&
        (sessionStorage.getItem("logged") == undefined || sessionStorage.getItem("logged") == "0")) {
        window.location.assign('Login.html');
    }
    else {
        // Luego inicializo la cabecera y detalle del sitio
        if ($('#header').length > 0)
            $("#header").load("../Navigation/Header.html", function () {
            });
        if ($('#menu').length > 0) {
            $("#menu").load("../Navigation/Menu.html", function () {
            });
        }
        if ($('#footer').length > 0)
            $("#footer").load("../Navigation/Footer.html", function () {
                $('#year').html((new Date()).getFullYear().toString());
            });
        //["core", "enc-base64", "md5", "evpkdf", "cipher-core", "aes"]
        // Luego cargo Kendo UI y el Estilo principal del sitio
        head.load("../js/kendoui/js/kendo.all.min.js", "../js/kendoui/js/cultures/kendo.culture.es-EC.min.js", "../js/kendoui/js/messages/kendo.messages.es-EC.min.js", "../Scripts/Proxy.js", "../js/filesaver/FileSaver.js", "../js/cryptojs/src/core.js", "../js/cryptojs/src/enc-base64.js", "../js/cryptojs/src/md5.js", "../js/cryptojs/src/evpkdf.js", "../js/cryptojs/src/cipher-core.js", "../js/cryptojs/src/aes.js", 
        //"../js/tooltip/js/Tooltip.js",
        "../js/slick/slick/slick.min.js", "../Styles/Site.css", "../js/slick/slick/slick.css", "../js/slick/slick/slick-theme.css", '../js/kendoui/styles/kendo.common-material.min.css', '../js/kendoui/styles/kendo.material.min.css', '../js/kendoui/styles/kendo.material.mobile.min.css', '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 
        //'../js/kendoui/js/cultures/kendo.culture.es-EC.min.js',
        //'../js/kendoui/js/messages/kendo.messages.es-EC.min.js',
        "../js/kendoui/js/jszip.min.js", 
        //"../js/tooltip/css/Tooltip.css",
        //'../Scripts/Proxy.js',
        //'../js/kendoui/styles/kendo.dataviz.min.css',
        //'../js/kendoui/styles/kendo.dataviz.default.min.css',
        //'../js/kendoui/styles/kendo.dataviz.material.min.css',
        function () {
            // Luego cargo los archivos de js y css específicos de la pantalla
            head.load('../Scripts/' + filename.replace('.html', '.js'), '../Styles/' + filename.replace('.html', '.css'), function () {
                //verifico si esta utlizando IE y si es asi envio un mensaje a pantalla
                var browser = detectIE();
                if (browser)
                    alert('El aplicativo esta optimizado para ser usado con Firefox, Chrome, Opera y IE Edge por favor, use cualquiera de estos para aprovechar todas las caracteristicas de la app');
                //inicializar la cultura
                //console.log("es-EC " + kendo.getCulture().name);
                kendo.culture("es-EC");
                //console.log("es-EC " + kendo.getCulture().name);
                $('#mlinks').html($('#links>ul').clone());
                $('#links>ul').attr("id", "menuPrincipal");
                $('#mlinks>ul').attr("id", "mobileMenu");
                // Inicializo variables de cabecera y pie
                if ($("#menuPrincipal").length > 0) {
                    $("#menuPrincipal").kendoMenu();
                }
                if ($("#mobileMenu").length > 0) {
                    var treeView = $("#mobileMenu").kendoTreeView().data("kendoTreeView");
                    treeView.expand(".k-item");
                    $('#mobileMenu').hide();
                }
                if ($('#btn_mmenu').length > 0) {
                    $('#btn_mmenu').kendoButton();
                    $('#btn_mmenu').show();
                    $('#btn_mmenu').click(function () {
                        $('#mobileMenu').toggle();
                    });
                }
                if ($('#header').length > 0) {
                    if ($("#lbl_UsuarioLogueado").length > 0) {
                        var UsuarioLogueado = UsuarioSesion();
                        if (UsuarioLogueado != null) {
                            $("#lbl_UsuarioLogueado").html(UsuarioLogueado.NombreApellido);
                            get$usuario$CorredoresObtenerBrokerPorId(UsuarioLogueado.IdCorredor, function (result) {
                                if (result == undefined) {
                                    return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
                                }
                                var corredor = result.Datos;
                                $('#razonSocialCorredor').text(corredor.razon_social_broker);
                            }, function (error) {
                            });
                        }
                    }
                }
                if (filename != 'Login.html' && filename != "RecuperarClave.htm" && filename != "ActivacionUsuario.html") {
                    // Aplicación de Permisos de Menú
                    // 1 Resumen Ejecutivo
                    // 3 menu_AdministracionUsuarios
                    var lstPermisos = Permisos();
                    //Activamos Resumen Ejecutivo
                    if (lstPermisos.filter(p => p.IDPermiso == 1).length > 0)
                        $('[id="Resumen_Ejecutivo"]').show();
                    else
                        $('[id="Resumen_Ejecutivo"]').hide();
                    //Activamos menu_AdministracionUsuarios
                    if (lstPermisos.filter(p => p.IDPermiso == 3).length > 0)
                        $('[id="Menu_AdministracionUsuarios"]').show();
                    else
                        $('[id="Menu_AdministracionUsuarios"]').hide();
                    //Activamos Clientes
                    if (lstPermisos.filter(p => p.IDPermiso == 6).length > 0)
                        $('[id="Clientes"]').show();
                    else
                        $('[id="Clientes"]').hide();
                    //Activamos Formularios
                    if (lstPermisos.filter(p => p.IDPermiso == 7).length > 0)
                        $('[id="Formularios"]').show();
                    else
                        $('[id="Formularios"]').hide();
                    //Activamos Reportes
                    if (lstPermisos.filter(p => p.IDPermiso == 8).length > 0)
                        $('[id="menu_Reportes"]').show();
                    else
                        $('[id="menu_Reportes"]').hide();
                    //Activamos Politica Comisiones
                    if (lstPermisos.filter(p => p.IDPermiso == 9).length > 0)
                        $('[id="Politica_Comisiones"]').show();
                    else
                        $('[id="Politica_Comisiones"]').hide();
                }
                //Increment the idle time counter every minute.
                var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
                //Zero the idle timer on mouse movement.
                $(this).mousemove(function (e) {
                    idleTime = 0;
                });
                $(this).keypress(function (e) {
                    idleTime = 0;
                });
            });
        });
    }
});
//detecta browser
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        return true;
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        return true;
    }
    //var edge = ua.indexOf('Edge/');
    //if (edge > 0) {
    //    // Edge (IE 12+) => return version number
    //    //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    //    return true;
    //}
    // other browser
    return false;
}
function Callback(args, argsup, callDone, callFail, timeout) {
    Loading_Show();
    GetToken(function (token) {
        var partsOfFunctionName = argsup.callee.name.split('$');
        var argumentsArray = [].slice.apply(argsup);
        argumentsArray.pop(); // retiro
        // hago la llamada al servicio y obtengo el encriptado de retorno
        $.ajax({
            url: AddressServicioUsuarioCorporativo + partsOfFunctionName[1] + '/' + partsOfFunctionName[2],
            type: partsOfFunctionName[0].toString().toUpperCase(),
            dataType: 'text',
            data: args,
            contentType: 'application/json; charset=UTF-8',
            mimeType: 'application/json',
            crossDomain: false,
            cache: false,
            timeout: timeout == undefined ? 300000 : timeout,
            headers: {
                'Authorization': 'bearer ' + token,
                'CodigoAplicacion': '3',
                'DispositivoNavegador': 'Chrome',
                'DireccionIP': '1.1.1.1',
                'SistemaOperativo': 'Windows',
                'CodigoPlataforma': '7'
            },
        }).done(function (PostReturn) {
            if (!PostReturn) {
                throw ('No se ha recibido respuesta del servidor.');
            }
            var result = JSON.parse(PostReturn);
            // Si hay un error en el servidor
            if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                alert(result.Mensajes.join());
                Loading_Hide();
                //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
            }
            else if (typeof callDone === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                Loading_Hide();
                var ret = callDone(result);
                //Loading_Hide();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                if (jqXHR.statusText == "timeout") {
                    alert('Tiempo de espera de respuesta de servicio agotado.');
                }
                else if (jqXHR.responseText != undefined) {
                    try {
                        var result = JSON.parse(jqXHR.responseText);
                        // Si hay un error en el servidor
                        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                            alert(result.Mensajes.join());
                            //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
                        }
                    }
                    catch (ex) {
                        alert(jqXHR.responseText);
                    }
                }
                else {
                    alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
                }
            }
            else if (jqXHR.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
            }
            else {
                // something weird is happening
            }
            if (typeof callFail === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callFail(result);
            }
            Loading_Hide();
        }).always(function () {
            //Loading_Hide();
        });
    });
}
function Callback2(args, argsup, callDone, callFail) {
    Loading_Show();
    GetToken(function (token) {
        var partsOfFunctionName = argsup.callee.name.split('$');
        var argumentsArray = [].slice.apply(argsup);
        argumentsArray.pop(); // retiro
        // hago la llamada al servicio y obtengo el encriptado de retorno
        $.ajax({
            url: AddressServicioPasarela + partsOfFunctionName[1] + '/' + partsOfFunctionName[2],
            type: partsOfFunctionName[0].toString().toUpperCase(),
            dataType: 'text',
            data: args,
            contentType: 'application/json; charset=UTF-8',
            mimeType: 'application/json',
            crossDomain: false,
            cache: false,
            timeout: 60000,
            headers: {
                'Authorization': 'bearer ' + token,
                'CodigoAplicacion': '3',
                'DispositivoNavegador': 'Chrome',
                'DireccionIP': '1.1.1.1',
                'SistemaOperativo': 'Windows',
                'CodigoPlataforma': '7'
            },
        }).done(function (PostReturn) {
            if (!PostReturn) {
                throw ('No se ha recibido respuesta del servidor.');
            }
            var result = JSON.parse(PostReturn);
            // Si hay un error en el servidor
            if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                alert(result.Mensajes.join());
                Loading_Hide();
                //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
            }
            else if (typeof callDone === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                Loading_Hide();
                callDone(result);
                //Loading_Hide();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                if (jqXHR.statusText == "timeout") {
                    alert('Tiempo de espera de respuesta de servicio agotado.');
                }
                else if (jqXHR.responseText != undefined) {
                    try {
                        var result = JSON.parse(jqXHR.responseText);
                        // Si hay un error en el servidor
                        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                            alert(result.Mensajes.join());
                            //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
                        }
                    }
                    catch (ex) {
                        alert(jqXHR.responseText);
                    }
                }
                else {
                    alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
                }
            }
            else if (jqXHR.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
            }
            else {
                // something weird is happening
            }
            if (typeof callFail === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callFail(result);
            }
            Loading_Hide();
        }).always(function () {
            //Loading_Hide();
        });
    });
}
//http://localhost:5150/SC/api/portalcorporativo/ObtenerClientesEmpresaIdentificacion/43739/1719103820
function Callback3(args, argsbody, argsup, callDone, callFail) {
    Loading_Show();
    GetToken(function (token) {
        var partsOfFunctionName = argsup.callee.name.split('$');
        var argumentsArray = [].slice.apply(argsup);
        argumentsArray.pop(); // retiro
        // hago la llamada al servicio y obtengo el encriptado de retorno
        $.ajax({
            url: AddressServicioPasarela + partsOfFunctionName[1] + '/' + partsOfFunctionName[2] + args,
            type: partsOfFunctionName[0].toString().toUpperCase(),
            dataType: 'text',
            data: argsbody,
            contentType: 'application/json; charset=UTF-8',
            mimeType: 'application/json',
            crossDomain: false,
            cache: false,
            timeout: 60000,
            headers: {
                'Authorization': 'bearer ' + token,
                'CodigoAplicacion': '3',
                'DispositivoNavegador': 'Chrome',
                'DireccionIP': '1.1.1.1',
                'SistemaOperativo': 'Windows',
                'CodigoPlataforma': '7'
            },
        }).done(function (PostReturn) {
            if (!PostReturn) {
                throw ('No se ha recibido respuesta del servidor.');
            }
            var result = JSON.parse(PostReturn);
            // Si hay un error en el servidor
            if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                alert(result.Mensajes.join());
                Loading_Hide();
                //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
            }
            else if (typeof callDone === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callDone(result);
                Loading_Hide();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                if (jqXHR.statusText == "timeout") {
                    alert('Tiempo de espera de respuesta de servicio agotado.');
                }
                else if (jqXHR.responseText != undefined) {
                    try {
                        var result = JSON.parse(jqXHR.responseText);
                        // Si hay un error en el servidor
                        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                            alert(result.Mensajes.join());
                            //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
                        }
                    }
                    catch (ex) {
                        alert(jqXHR.responseText);
                    }
                }
                else {
                    alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
                }
            }
            else if (jqXHR.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
            }
            else {
                // something weird is happening
            }
            if (typeof callFail === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callFail(result);
            }
            Loading_Hide();
        }).always(function () {
            Loading_Hide();
        });
    });
}
function Callback4(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    GetToken(function (token) {
        var partsOfFunctionName = argsup.callee.name.split('$');
        var argumentsArray = [].slice.apply(argsup);
        argumentsArray.pop(); // retiro
        // hago la llamada al servicio y obtengo el encriptado de retorno
        $.ajax({
            url: Address + partsOfFunctionName[2] + (argsGET != null ? "?" + $.param(argsGET) : ""),
            type: partsOfFunctionName[0].toString().toUpperCase(),
            dataType: 'text',
            data: argsPOST,
            contentType: 'application/json; charset=UTF-8',
            mimeType: 'application/json',
            crossDomain: false,
            cache: false,
            timeout: 1200000,
            headers: {
                'Authorization': 'bearer ' + token,
                'CodigoAplicacion': '3',
                'DispositivoNavegador': 'Chrome',
                'DireccionIP': '1.1.1.1',
                'SistemaOperativo': 'Windows',
                'CodigoPlataforma': '7'
            },
        }).done(function (PostReturn) {
            if (!PostReturn) {
                throw ('No se ha recibido respuesta del servidor.');
            }
            var result = JSON.parse(PostReturn);
            // Si hay un error en el servidor
            if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                alert(result.Mensajes.join());
                Loading_Hide();
                //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
            }
            else if (typeof callDone === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callDone(result);
                Loading_Hide();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                if (jqXHR.statusText == "timeout") {
                    alert('Tiempo de espera de respuesta de servicio agotado.');
                }
                else if (jqXHR.responseText != undefined) {
                    try {
                        var result = JSON.parse(jqXHR.responseText);
                        // Si hay un error en el servidor
                        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                            alert(result.Mensajes.join());
                            //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
                        }
                    }
                    catch (ex) {
                        alert(jqXHR.responseText);
                    }
                }
                else {
                    alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
                }
            }
            else if (jqXHR.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
            }
            else {
                // something weird is happening
            }
            if (typeof callFail === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callFail(result);
            }
            Loading_Hide();
        }).always(function () {
            Loading_Hide();
        });
    });
}
function Callback5(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    GetToken(function (token) {
        var partsOfFunctionName = argsup.callee.name.split('$');
        var argumentsArray = [].slice.apply(argsup);
        argumentsArray.pop(); // retiro
        //setup ajax
        $.ajaxSetup({
            beforeSend: function (jqXHR, settings) {
                if (settings.dataType === 'binary') {
                    settings.xhr().responseType = 'arraybuffer';
                    settings.processData = false;
                }
            }
        });
        // hago la llamada al servicio y obtengo el encriptado de retorno
        $.ajax({
            url: Address + partsOfFunctionName[2] + (argsGET != null ? "?" + $.param(argsGET) : ""),
            type: partsOfFunctionName[0].toString().toUpperCase(),
            dataType: 'binary',
            processData: false,
            data: argsPOST,
            contentType: 'application/json; charset=UTF-8',
            mimeType: 'application/json',
            crossDomain: false,
            cache: false,
            timeout: 600000,
            headers: {
                'Authorization': 'bearer ' + token,
                'CodigoAplicacion': '3',
                'DispositivoNavegador': 'Chrome',
                'DireccionIP': '1.1.1.1',
                'SistemaOperativo': 'Windows',
                'CodigoPlataforma': '7',
                'X-Page-Number': '1',
                'X-Page-Size': '0'
            },
        }).done(function (PostReturn) {
            if (!PostReturn) {
                throw ('No se ha recibido respuesta del servidor.');
            }
            var result = PostReturn;
            callDone(result);
            Loading_Hide();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                if (jqXHR.statusText == "timeout") {
                    alert('Tiempo de espera de respuesta de servicio agotado.');
                }
                else if (jqXHR.responseText != undefined) {
                    try {
                        //var result = <Msg>JSON.parse(jqXHR.responseText);
                        var result = jqXHR.responseText;
                        // Si hay un error en el servidor
                        if (result == undefined || result == null) {
                            alert(result);
                            //throw ('Ha ocurrido un error en el procesamiento de su pedido. Por favor tome contacto con el administrador del sistema. Mensaje: ' + res.errorMessage);
                        }
                        else {
                            return result;
                        }
                    }
                    catch (ex) {
                        alert(jqXHR.responseText);
                    }
                }
                else {
                    alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
                }
            }
            else if (jqXHR.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
            }
            else {
                // something weird is happening
            }
            if (typeof callFail === "function") {
                // if (res.Results.length == 1) {
                //     callback(res.Results[0].ReturnObject);
                // }
                callFail(result);
            }
            Loading_Hide();
        }).always(function () {
            Loading_Hide();
        });
    });
}
function serializeGETpars(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > SessionTimeOut - 1) {
        // Cierra sesión
        CerrarSesion();
    }
}
function GetRawfromMasked(maskfieldName) {
    "use strict";
    var f = $('#' + maskfieldName).data('kendoMaskedTextBox');
    var lEmptyMask = f._emptyMask;
    var lValue = f.value();
    var i = lEmptyMask.length;
    while (i--) {
        if (lEmptyMask[i] === lValue[i]) {
            lValue = lValue.slice(0, i) + lValue.slice(i + 1);
        }
    }
    return lValue;
}
;
function GetToken(callDone) {
    if (sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null) {
        NewToken(callDone);
        return;
    }
    var token = JSON.parse(Decrypt(sessionStorage.getItem("token")));
    // verifico si ha expirado el token por caducidad, con un margen de 5 minutos, refresco el token
    if (Math.abs((Date.now() - token.token_retrieve) / 1000) > token.expires_in - (5 * 60)) {
        UpdateToken(callDone);
        return;
    }
    if (typeof callDone === "function") {
        // si el token anteriormente solicitado sigue vigente, devuelvo el que tengo en sesion
        return callDone(token.access_token);
    }
    return "";
}
// Obtener Token
//username=UsrServiciosSalud&password=UsrS3rv1c1os&grant_type=password&client_id=8a3e4d10b2b24d6b9c55c88a95fdc324
function NewToken(callDone) {
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: AddressServicioAutorizacion,
        type: 'POST',
        dataType: 'text',
        data: {
            "username": "UsrServiciosSalud",
            "password": "UsrS3rv1c1os",
            "grant_type": "password",
            "client_id": "8a3e4d10b2b24d6b9c55c88a95fdc324"
        },
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        cache: false,
        timeout: 60000 // 60 segundos
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result.error != undefined && result.error != null) {
            if (result.error_description != undefined && result.error_description != null)
                return alert(result.error + " - " + result.error_description);
            else
                return alert(result.error);
        }
        // establece la hora de arranque de control de la sesion
        result.token_retrieve = Date.now();
        sessionStorage.setItem("token", Encrypt(JSON.stringify(result)));
        // devuelvo el objeto de respuesta
        if (typeof callDone === "function") {
            callDone(result.access_token);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.statusText == "timeout") {
            alert('Tiempo de espera de respuesta de servicio agotado.');
        }
        else if (jqXHR.responseText != undefined) {
            var result = JSON.parse(jqXHR.responseText);
            // Si hay un error en el servidor
            if (result.error != undefined && result.error != null) {
                if (result.error_description != undefined && result.error_description != null)
                    alert(result.error + " - " + result.error_description);
                else
                    alert(result.error);
            }
        }
        else {
            alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
        }
        //if (typeof callFail === "function") {
        //    // if (res.Results.length == 1) {
        //    //     callback(res.Results[0].ReturnObject);
        //    // }
        //    callFail(result);
        //}
    }).always(function () {
    });
}
// Refrescar Token
//username=UsrServiciosSalud&password=UsrS3rv1c1os&grant_type=refresh_token&client_id=8a3e4d10b2b24d6b9c55c88a95fdc324&refresh_token=eb045fb612604003a1e5a9fdc3812f6c
function UpdateToken(callDone) {
    var token = JSON.parse(Decrypt(sessionStorage.getItem("token")));
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: AddressServicioAutorizacion,
        type: 'POST',
        dataType: 'text',
        data: {
            "username": "UsrServiciosSalud",
            "password": "UsrS3rv1c1os",
            "grant_type": "refresh_token",
            "client_id": "8a3e4d10b2b24d6b9c55c88a95fdc324",
            "refresh_token": token.refresh_token
        },
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        cache: false,
        timeout: 60000 // 60 segundos
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result.error != undefined && result.error != null) {
            if (result.error_description != undefined && result.error_description != null)
                alert(result.error + " - " + result.error_description);
            else
                alert(result.error);
        }
        // establece la hora de arranque de control de la sesion
        result.token_retrieve = Date.now();
        sessionStorage.setItem("token", Encrypt(JSON.stringify(result)));
        // devuelvo el objeto de respuesta
        if (typeof callDone === "function") {
            callDone(result);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.statusText == "timeout") {
            alert('Tiempo de espera de respuesta de servicio agotado.');
        }
        else if (jqXHR.responseText != undefined && jqXHR.responseText != "") {
            var result = JSON.parse(jqXHR.responseText);
            // Si hay un error en el servidor
            if (result.error != undefined && result.error != null) {
                if (result.error_description != undefined && result.error_description != null)
                    alert(result.error + " - " + result.error_description);
                else
                    alert(result.error);
            }
        }
        else {
            //alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
            NewToken(callDone);
        }
        //if (typeof callFail === "function") {
        //    // if (res.Results.length == 1) {
        //    //     callback(res.Results[0].ReturnObject);
        //    // }
        //    callFail(result);
        //}
    }).always(function () {
    });
}
//https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
//formato dd/MM/yyyy
function getFormattedDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date(date);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}
// funcion para  convertir date a formato YYYY-MM-dd
function getInternationalFomat(date) {
    return '' + date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
}
function getFormattedDateymd(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date(date);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day;
}
function Encrypt(data) {
    return CryptoJS.AES.encrypt(data, EncryptionPassword).toString();
}
function Decrypt(encrypted) {
    return CryptoJS.AES.decrypt(encrypted, EncryptionPassword).toString(CryptoJS.enc.Utf8);
}
function UsuarioSesion() {
    if (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined || sessionStorage.getItem("user") == "") {
        //document.location.assign('Login.html'); // Si no está logueado, cambia la página al login //Comentado mientras se espera integracion.... para pruebas.
        return null;
    }
    return JSON.parse(Decrypt(sessionStorage.getItem("user").toString()));
}
function Permisos() {
    if (sessionStorage.getItem("access") == null || sessionStorage.getItem("access") == undefined || sessionStorage.getItem("access") == "")
        return null;
    return JSON.parse(Decrypt(sessionStorage.getItem("access").toString()));
}
// https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
var _validFileExtensions = [".xlsx"];
function ValidateSingleInput(oInput) {
    if (oInput.type == "file") {
        var sFileName = oInput.value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
            if (!blnValid) {
                //alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    return true;
}
function rainbow() {
    var size = 12;
    var rainbow = new Array(size);
    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3, size); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3, size); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3, size); // 240 deg
        rainbow[i] = "#" + red + green + blue;
    }
    return rainbow;
}
function sin_to_hex(i, phase, size) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
/**

 * Esta función calcula la edad de una persona y los meses

 * La fecha la tiene que tener el formato yyyy-mm-dd que es

 * metodo que por defecto lo devuelve el <input type="date">

 */
function calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = Number(values[2]);
    var mes = Number(values[1]);
    var ano = Number(values[0]);
    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getUTCMonth() + 1;
    var ahora_dia = fecha_hoy.getUTCDate();
    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }
    // calculamos los meses
    var meses = 0;
    if (ahora_mes > mes)
        meses = ahora_mes - mes;
    if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;
    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    return edad;
    //document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y " + dias + " días";
}
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//funcion generica para ordenar array de objetos por  paramettra y asc o desc
//const bands = [
//    { genre: 'Rap', band: 'Migos', albums: 2 },
//    { genre: 'Pop', band: 'Coldplay', albums: 4 },
//    {
//        genre: 'Rock', band: 'Breaking Benjamins',
//        albums: 1
//    }
//];
//function compareValues(key, order = 'asc') {
//    return function (a, b) {
//        if (!a.hasOwnProperty(key) ||
//            !b.hasOwnProperty(key)) {
//            return 0;
//        }
//        const varA = (typeof a[key] === 'string') ?
//            a[key].toUpperCase() : a[key];
//        const varB = (typeof b[key] === 'string') ?
//            b[key].toUpperCase() : b[key];
//        let comparison = 0;
//        if (varA > varB) {
//            comparison = 1;
//        } else if (varA < varB) {
//            comparison = -1;
//        }
//        return (
//            (order == 'desc') ?
//                (comparison * -1) : comparison
//        );
//    };
//}
//console.log(
//    bands.sort(compareValues('albums', 'asc'))
//); 
function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        }
        else if (varA < varB) {
            comparison = -1;
        }
        return ((order == 'desc') ?
            (comparison * -1) : comparison);
    };
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function Confirmation(text, fOk, fCancel) {
    ConfirmationConf("", text, "Aceptar", "Cancelar", fOk, fCancel);
}
function ConfirmationConf(header, text, OkText, CancelText, fOk, fCancel) {
    var nid = makeid();
    $('body').append('<div id="' + nid + '"></div>');
    $('#' + nid).kendoConfirm({
        content: text,
        messages: {
            okText: OkText,
            cancel: CancelText
        }
    }).data("kendoConfirm").result.done(fOk).fail(fCancel);
}
//function ShowChatMessage() {
//    $('#window_ChatMessage').data("kendoWindow").center().open();
//}
//ESTADISTICA DE NAVEGACION
function RegistroEstadistica(idPermiso) {
    var UsuarioLogueado = UsuarioSesion();
    //Objeto EstadisticaNavegacion
    var estadistica = new PC_EstadisticaNavegacion();
    if (UsuarioLogueado == undefined || UsuarioLogueado == null)
        return false;
    if (UsuarioLogueado.IdCorredor == 0 || UsuarioLogueado.Id == 0 || idPermiso == 0 ||
        UsuarioLogueado.NombreUsuario == '')
        return false;
    estadistica.IdCorredor = UsuarioLogueado.IdCorredor;
    estadistica.IdUsuario = UsuarioLogueado.Id;
    estadistica.IdPermiso = idPermiso;
    estadistica.NombreUsuario = UsuarioLogueado.NombreApellido;
    post$Estadistica$CorredoresEstadisticaNavegacionCrearActualizar(estadistica, function (res) {
        var data = res.Datos;
    }, function () { });
}
function calcularFechas(fecha) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = Number(values[2]);
    var mes = Number(values[1]);
    var ano = Number(values[0]);
    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getUTCMonth() + 1;
    var ahora_dia = fecha_hoy.getUTCDate();
    // realizamos el calculo
    var edad = ahora_ano - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }
    // calculamos los meses
    var meses = 0;
    if (ahora_mes > mes)
        meses = ahora_mes - mes;
    if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;
    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    return edad + ' años -' + meses + ' meses';
    //document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y " + dias + " días";
}
//validar solo numeros en inputs
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    }
    else if (key < 48 || key > 57) {
        return false;
    }
    else {
        return true;
    }
}
;
//# sourceMappingURL=Init.js.map