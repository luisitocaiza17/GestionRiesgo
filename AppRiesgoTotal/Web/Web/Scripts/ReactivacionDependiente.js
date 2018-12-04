var cambioList;
var FechaCarencia;
head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    var persona;
    var listCob;
    var listTarifas;
    var proceso;
    var personaActivacion;
    var indiceCOR;
    $("#btn_Buscar_Cliente_Cambio").kendoButton();
    $("#btn_Siguiente_Activacion").kendoButton();
    $("#btn_Cancelar_Activacion").kendoButton();
    $("#btn_regresar_activacion").kendoButton();
    $("#btn_guardar_activacion").kendoButton();
    $("#btn_Buscar_Beneficiario_Cambio").kendoButton();
    $("#btn_Buscar_Dependiente_Nuevamente").kendoButton();
    $('#beneficiarioDatos').hide();
    $('#busquedaBeneficiario').show();
    $('#inp_cedula_cambio').val('');
    $('#inp_nombre_cambio').val('');
    if ($('#gridUsuariosCambio').data().kendoGrid) {
        $('#gridUsuariosCambio').data().kendoGrid.destroy();
        $('#gridUsuariosCambio').empty();
    }
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        },
        select: onSelect
    });
    //desavilito los tab strip iniciales
    var tabstrip = $("#tabstrip").data("kendoTabStrip");
    var items = tabstrip.items();
    tabstrip.disable(items[1]); //deshabilito opcion 2 
    tabstrip.disable(items[2]); //deshabilito opcion 3
    function onSelect(e) {
        var index = $(e.item).index();
        if (index === 0) {
            tabstrip.enable(items[0]); //deshabilito opcion 1 
            tabstrip.disable(items[1]); //deshabilito opcion 2 
            tabstrip.disable(items[2]); //deshabilito opcion 3
        }
        if (index === 1) {
            tabstrip.enable(items[0]); //deshabilito opcion 1 
            tabstrip.enable(items[1]); //deshabilito opcion 2 
            tabstrip.disable(items[2]); //deshabilito opcion 3
        }
    }
    $('#btn_back').click(function () {
        var local = $(location).attr('href');
        local = local.replace('ReactivacionDependiente.html', 'MenuMovimientos.html');
        window.location.replace(local);
    });
    //Datos 
    listTarifas = [];
    listCob = [];
    Loading_Hide();
    $('#btn_Buscar_Cliente_Cambio').click(function () {
        var cedulaCambio = $('#inp_cedula_cambio').val();
        var nombreCambio = $('#inp_nombre_cambio').val();
        if (cedulaCambio.trim() === '' && nombreCambio.trim() === '') {
            alert('No ingreso criterios de busqueda.');
            return false;
        }
        var lstPersonas = [];
        //carga inf desde el servicio
        $('#gridUsuariosCambio').show();
        proceso = 'reactivacion';
        var Esactivo = 1;
        if (cedulaCambio.trim() !== '') {
            var idEmpresa = UsuarioLogueado.IdEmpresa;
            get$portalcorporativo$ObtenerClientesEmpresaIdentificacion(idEmpresa, cedulaCambio.trim(), Esactivo, function (result) {
                //console.log(result);
                if (result != null) {
                    lstPersonas = result;
                    if (lstPersonas.length > 0) {
                        $('#gridUsuariosCambio').kendoGrid({
                            dataSource: {
                                data: lstPersonas,
                                pageSize: 10,
                            },
                            height: 200,
                            scrollable: true,
                            sortable: true,
                            groupable: false,
                            persistSelection: true,
                            filterable: true,
                            pageable: false,
                            columns: [
                                { field: "Cedula", title: "Identificación", width: "200px", filterable: { multi: true, search: true } },
                                { field: "Nombres", title: "Nombres", width: "200px", filterable: { multi: true, search: true } },
                                { field: "Apellidos", title: "Apellidos", width: "200px", filterable: { multi: true, search: true } },
                                { command: { text: "Opción", click: verUsuarioCambio }, title: "SELECCIONAR", width: "200px" }
                            ]
                        });
                    }
                    else {
                        //poner un label dicienddo que no hay datos
                        alert("No se encontró clientes basado en los datos de búsqueda.");
                    }
                }
            }, function () { });
        }
        if (nombreCambio.trim() !== '') {
            var idEmpresa = UsuarioLogueado.IdEmpresa;
            post$portalcorporativo$ObtenerClientesEmpresa(idEmpresa, nombreCambio.trim(), Esactivo, function (result) {
                console.log(result);
                if (result != null) {
                    lstPersonas = result;
                    if (lstPersonas.length > 0) {
                        $('#gridUsuariosCambio').kendoGrid({
                            dataSource: {
                                data: lstPersonas,
                                pageSize: 10,
                            },
                            height: 200,
                            scrollable: true,
                            sortable: true,
                            groupable: false,
                            persistSelection: true,
                            filterable: true,
                            pageable: false,
                            columns: [
                                { field: "Cedula", title: "Identificación", width: "200px", filterable: { multi: true, search: true } },
                                { field: "Nombres", title: "Nombres", width: "200px", filterable: { multi: true, search: true } },
                                { field: "Apellidos", title: "Apellidos", width: "200px", filterable: { multi: true, search: true } },
                                { command: { text: "SELECCIONAR", click: verUsuarioCambio }, title: "SELECCIONAR", width: "200px" }
                            ]
                        });
                    }
                    else {
                        //menaje  no hay datos
                        alert("No se encontró clientes basado en los datos de búsqueda.");
                    }
                }
            }, function () { });
        }
        // PROCESO INDIVIDUAL DE CARGA DE INFORMACION POR CLIENTE P
        function verUsuarioCambio(e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            personaActivacion = dataItem;
            console.log(dataItem);
            tabstrip.enable(items[0]); //deshabilito opcion 1 
            tabstrip.enable(items[1]); //deshabilito opcion 2 
            tabstrip.disable(items[2]); //deshabilito opcion 3
            tabstrip.select(1);
            //llena los datos del colaborador
            $('#cedula_cliente_cambio').html(dataItem.Cedula);
            $('#nombre_cliente_cambio').html(dataItem.Nombres);
            $('#apellido_cliente_cambio').html(dataItem.Apellidos);
            $('#inp_cedula_Beneficiario').val('');
            var coberturas = '';
            coberturasT = dataItem.provincia.split(';');
            planesT = dataItem.ciudad.split(';');
            contratosT = dataItem.Apellido1.split(';');
            sucursalesT = dataItem.Apellido2.split(';');
            var i;
            //voy a buscar el contrato COR 
            indiceCOR = planesT.indexOf('COR');
        }
    });
    $("#btn_Buscar_Beneficiario_Cambio").click(function () {
        //necesito un servicio que busque el dependiente en base al titular y a mas verifique si esta activo o no
        // lo dejo por el momento con datos dummy
        //deberia llenarse el objecto Persona con datos del dependiente
        var cedulaDependiente = $('#inp_cedula_Beneficiario').val();
        $("#cedula_dependiente_activacion").text('123456789');
        $("#nombre_dependiente_activacion").text('dummy');
        $("#apellido_dependiente_activacion").text('dummy 2');
        $('#beneficiarioDatos').show();
        $('#busquedaBeneficiario').hide();
    });
    $("#btn_Buscar_Dependiente_Nuevamente").click(function () {
        $('#inp_cedula_Beneficiario').val('');
        $('#beneficiarioDatos').hide();
        $('#busquedaBeneficiario').show();
    });
    $("#btn_Siguiente_Activacion").click(function () {
        var contratoCOR = contratosT[indiceCOR];
        //post$portalcorporativo$ReactivarContrato(
        //    reactivaciones, function (result) {
        //        if (result == null || result == undefined || result == false) {
        //            alert('Tuvimos un problema con el servidor, por favor espere un momento e intentelo de nuevo, si su problema persiste comuniqueselo al administrador');
        //        } else {
        //            alert('Reactivación Correcta!!');
        //            regresarReactivacion();
        //        }
        //    },
        //    function () { });
        //te dejo el objeto persona por si lo necesitas
        //personaActivacion;
        tabstrip.enable(items[0]); //deshabilito opcion 1 
        tabstrip.enable(items[1]); //deshabilito opcion 2 
        tabstrip.enable(items[2]); //deshabilito opcion 3
        tabstrip.select(2);
    });
    $('#btn_Cancelar_Activacion').click(function () {
        regresarReactivacion();
    });
    $('#btn_regresar_activacion').click(function () {
        tabstrip.enable(items[0]); //deshabilito opcion 1 
        tabstrip.enable(items[1]); //deshabilito opcion 2 
        tabstrip.disable(items[2]); //deshabilito opcion 3
        tabstrip.select(1);
    });
    $('#btn_guardar_activacion').click(function () {
        var conf = confirm('Desea Confirmar el cambio de plan?');
        if (conf) {
            regresarReactivacion();
        }
    });
    function regresarReactivacion() {
        $('#inp_cedula_cambio').val('');
        $('#inp_nombre_cambio').val('');
        if ($('#gridUsuariosCambio').data().kendoGrid) {
            $('#gridUsuariosCambio').data().kendoGrid.destroy();
            $('#gridUsuariosCambio').empty();
        }
        $('#beneficiarioDatos').hide();
        $('#busquedaBeneficiario').show();
        tabstrip.enable(items[0]); //deshabilito opcion 1 
        tabstrip.disable(items[1]); //deshabilito opcion 2 
        tabstrip.disable(items[2]); //deshabilito opcion 3
        tabstrip.select(0);
    }
});
//# sourceMappingURL=ReactivacionDependiente.js.map