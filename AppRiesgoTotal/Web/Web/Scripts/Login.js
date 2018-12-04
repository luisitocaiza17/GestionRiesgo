/// <reference path="../Scripts/Init.ts" />
head.ready(function () {
    // Inicializaciones
    $('#btn_Ingresar').kendoButton();
    $('#btn_Recuperar').kendoButton();
    $('#btn_IngresarAdmin').kendoButton();
    $('#btn_DescargarTerminos').kendoButton();
    $('#btn_AceptarTC').kendoButton();
    $('#btn_NoAceptarTC').kendoButton();
    $('#btn_Continuar').kendoButton();
    $('#btn_Regresar').kendoButton();
    $('#seccionBroker').hide();
    $('#txt_username').on("keypress", function (e) {
        if (e.keyCode == 13) {
            // Cancel the default action on keypress event
            e.preventDefault();
            Ingresar();
        }
    });
    $('#txt_password').on("keypress", function (e) {
        if (e.keyCode == 13) {
            // Cancel the default action on keypress event
            e.preventDefault();
            Ingresar();
        }
    });
    // Eventos
    $('#btn_Continuar').click(function () {
        var ruc = $('#txt_identificacion').val();
        if (ruc == undefined || ruc == null || ruc === '') {
            return alert('Debe ingresar el ruc del Broker');
        }
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorRuc(ruc, function (res) {
            var lstRes = res.Datos;
            $('#OpcionesBusquedaCorredor').kendoDropDownList({
                dataTextField: "RazonSocialBroker",
                dataValueField: "Codigo",
                dataSource: lstRes
            });
            $('#seccionBroker').show();
            $('#txt_nombreUsuario').val('');
        }, function (error) {
        });
    });
    //Regresar
    $('#btn_Ingresar').click(function () {
        Ingresar();
    });
    var UsuarioLogueado = null;
    function Ingresar() {
        var usr = new PC_UsuarioRol_Result();
        usr.NombreUsuario = $('#txt_username').val().toString();
        usr.Contrasena = $('#txt_password').val().toString();
        post$usuario$CorredoresObtenerUsuarioPorNombreyClave(usr, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            UsuarioLogueado = result.Datos;
            //verificacion de usuario administrador
            if (UsuarioLogueado.IdCorredor == 1) {
                get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaListSQL(function (res) {
                    var lst = res.Datos;
                    $("#cmb_Corredor").kendoDropDownList({
                        filter: "startswith",
                        dataTextField: "nombre_agente_venta",
                        dataValueField: "codigo_agente_venta",
                        dataSource: lst,
                        optionLabel: "Seleccione...",
                        index: -1,
                        change: CambioBroker
                    });
                    $("#ventana_admin").kendoWindow({
                        width: "600px",
                        height: "250px",
                        title: "Selección de Broker",
                        modal: true,
                        close: RecuperacionClose
                    }).data("kendoWindow").center().open();
                }, function () { });
            }
            else {
                CompletarIngreso();
            }
        }, function (error) {
            //// almacena variables de sesión
            //sessionStorage.setItem("logged", "1");
            //// redirección a la ventana interna
            //window.location = 'Home.html';
        });
    }
    function CambioBroker() {
        var IdCorredor = parseInt($("#cmb_Corredor").data('kendoDropDownList').value().toString());
        get$usuario$CorredoresObtenerUsuariosPorCorredorList(IdCorredor, function (res) {
            var data = res.Datos;
            $("#cmb_usuario").kendoDropDownList({
                filter: "startswith",
                dataTextField: "NombreApellido",
                dataValueField: "Id",
                dataSource: data,
                optionLabel: "Seleccione...",
                index: -1,
            });
        }, function () { });
    }
    $('#btn_IngresarAdmin').click(function () {
        var dataItem = $("#cmb_usuario").data("kendoDropDownList").dataItem();
        UsuarioLogueado = dataItem;
        CompletarIngreso();
    });
    var TerminosCondicionesIDActual = 0;
    function CompletarIngreso() {
        get$terminoscondiciones$CorredoresTerminosCondicionesIdActual(function (res) {
            TerminosCondicionesIDActual = res.Datos;
            // si no ha aceptado ningun términos y condiciones
            if (UsuarioLogueado.TerminosCondicionesAprobado == null || UsuarioLogueado.TerminosCondicionesAprobado == undefined ||
                UsuarioLogueado.TerminosCondicionesAprobado < TerminosCondicionesIDActual) {
                // presenta la ventana para pedirle que acepte las ultimas condiciones
                get$terminoscondiciones$CorredoresTerminosCondicionesPorID(TerminosCondicionesIDActual, function (res) {
                    var tc = res.Datos;
                    $('#DescripcionCortaTC').html(tc.DescripcionCorta); // coloca el contenido guardado de los términos y condiciones ultimo
                    $('#ResumenTC').html(tc.ResumenCambios); // coloca el contenido guardado de los términos y condiciones ultimo
                    $('#ContenidoTC').html(tc.ContenidoCompleto); // coloca el contenido guardado de los términos y condiciones ultimo
                    // Abre la ventana para aceptación
                    $("#ventana_TerminosCondiciones").kendoWindow({
                        width: "850px",
                        height: "570px",
                        title: "Aceptación de Términos y Condiciones",
                    }).data("kendoWindow").center().open();
                }, function () { });
            }
            else {
                TerminarInicioSesion();
            }
        }, function () {
        });
    }
    function TerminarInicioSesion() {
        // Carga los permisos
        get$usuario$CorredoresObtenerPermisosUsuarioPorID(UsuarioLogueado.Id, function (res) {
            var permisos = res.Datos;
            // serializa los datos del usuario y lo coloca en sesión.
            sessionStorage.setItem("user", Encrypt(JSON.stringify(UsuarioLogueado)));
            sessionStorage.setItem("access", Encrypt(JSON.stringify(permisos)));
            // almacena variables de sesión
            sessionStorage.setItem("logged", "1");
            var r = getParameterByName("r");
            if (r == null || r == '') {
                // redirección a la ventana interna
                window.location.assign('Home.html');
            }
            else {
                if (r == "estadistica") {
                    // redirección a la ventana interna
                    window.location.assign('Estadistica.html');
                }
            }
        }, function () { });
    }
    $('#btn_Regresar').click(function () {
        $('#pnl_Recuperar').hide();
        $('#pnl_Exito').hide();
        $('#pnl_Fracaso').hide();
        $('#seccionBroker').hide();
        $('#txt_nombreUsuario').val('');
        $("#OpcionesBusquedaCorredor").data('kendoDropDownList').value(null);
        $('#txt_identificacion').val('');
        $("#ventana_Recuperar").data("kendoWindow").close();
    });
    $('#btn_Recuperar').click(function () {
        var brokerId = $("#OpcionesBusquedaCorredor").data("kendoDropDownList").value();
        if (brokerId == undefined || brokerId == null
            || brokerId === '') {
            return alert('Debe seleccionar un borker');
        }
        if ($('#txt_nombreUsuario').val() == undefined || $('#txt_nombreUsuario').val() == null ||
            $('#txt_nombreUsuario').val() === '') {
            return alert('Debe llenar su usuario');
        }
        get$usuario$CorredoresResetearClaveCorredores(Number(brokerId), $('#txt_nombreUsuario').val(), function (result) {
            if (result.Datos === true) {
                $('#pnl_Recuperar').hide();
                $('#pnl_Exito').show();
                $('#pnl_Fracaso').hide();
                $('#seccionBroker').hide();
            }
            else {
                $('#pnl_Recuperar').hide();
                $('#pnl_Exito').hide();
                $('#pnl_Fracaso').show();
                $('#seccionBroker').hide();
            }
        }, function () {
        });
    });
    $('#btn_DescargarTerminos').click(function () {
        get$terminoscondiciones$CorredoresTerminosCondicionesPDFContenido(TerminosCondicionesIDActual, function (res) {
            if (res.Datos == undefined || res.Datos == '')
                return alert('El archivo no se encuentra disponible en este momento.');
            // convert base64 string to byte array
            var byteCharacters = atob(res.Datos);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            // now that we have the byte array, construct the blob from it
            var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
            var fileName1 = "SmartPlan_TerminosCondiciones.pdf";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    });
    $('#btn_AceptarTC').click(function () {
        // Actualiza al usuario los últimos términos y condiciones, para que la siguiente ya no le pida.
        get$terminoscondiciones$CorredoresTerminosCondicionesAceptado(TerminosCondicionesIDActual, UsuarioLogueado.Id, function (res) {
            if (res.Datos == true) {
                $("#ventana_TerminosCondiciones").data("kendoWindow").close();
                TerminarInicioSesion();
            }
        }, function () { });
    });
    $('#btn_NoAceptarTC').click(function () {
        alert('Si usted no acepta los términos y condiciones establecidos, no podrá ingresar al portal. Por favor póngase en contacto con su ejecutivo de cuenta para obtener una asesoría personalizada.');
        $("#ventana_TerminosCondiciones").data("kendoWindow").close();
        UsuarioLogueado = null;
    });
    Loading_Hide();
});
function abrirRecuperacion() {
    $("#ventana_Recuperar").kendoWindow({
        width: "615px",
        height: "450px",
        title: "Recuperación de Clave",
        close: RecuperacionClose
    }).data("kendoWindow").center().open();
}
function RecuperacionClose() {
    $('#txt_identificacion').val('');
    $('#txt_nombreUsuario').val('');
    $('#pnl_Recuperar').show();
    $('#pnl_Exito').hide();
    $('#pnl_Fracaso').hide();
}
//# sourceMappingURL=Login.js.map