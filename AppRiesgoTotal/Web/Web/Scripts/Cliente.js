/// <reference path="../Scripts/Init.ts" />
var funcionDetalle;
var funcionDetalleEmpresa;
head.ready(function () {
    //Registro estadistiva
    var UsuarioLogueado = UsuarioSesion();
    RegistroEstadistica(6);
    var IDEmpresa = 0;
    var IDSucursal = 0;
    var IDProducto = '';
    var IDNumeroContratoAfiliado = 0;
    var yoAfiliado;
    var BeneficiariosIndividuales = Array();
    //inicializacion
    $('#btn_back').kendoButton();
    $('#btn_Buscar_Afiliado').kendoButton();
    $('#btn_Buscar_Empresa').kendoButton();
    $('#btn_Ver_Afiliado').kendoButton();
    $('#btn_Buscar_Reclamo').kendoButton();
    $('#btn_Buscar_autorizacioniesAf').kendoButton();
    $('#btn_Buscar_Carta').kendoButton();
    $('#btn_Buscar_Factura').kendoButton();
    $('#btn_CerrarCuota').kendoButton();
    //seccion de reporte de movimientos
    var respGeneral;
    //variable para almacenar los listas seleccinadas
    var listasSeleccion;
    var generalListas;
    //muestra formato de reporte de movimientos
    $("#rb_formato").kendoButtonGroup({
        index: 0
    });
    //muestra button groups Reporte Movimientos
    $("#rb_formato3").kendoButtonGroup({
        index: 0
    });
    //muestra button groups Reporte Liquidaciones
    $("#rb_formato2").kendoButtonGroup({
        index: 0
    });
    //muestra button groups reportes
    $("#rb_Reportes").kendoButtonGroup({
        index: 0
    });
    //muestra button groups reportes
    $("#rb_formatoCopagos").kendoButtonGroup({
        index: 0
    });
    //muestra button groups reportes
    $("#rb_formatoAutorizacionesR").kendoButtonGroup({
        index: 0
    });
    $("#rb_ReportesAfiliados").kendoButtonGroup({
        index: 0
    });
    //muestra button para seleccionar descargable en productos individuales
    $("#rb_formatoProducto").kendoButtonGroup({
        index: 0
    });
    //coultamos hasta que este seccion de asignacion de corredor    
    $('#asignacionCorredorLabels').hide();
    $('#asignacionCorredorLabelsEmpresa').hide();
    $('#btn_GenerarReporte').kendoButton();
    $('#dt_Desde').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_Hasta').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_SelectListas').kendoButton();
    $('#btn_AceptarFiltro').kendoButton();
    //seccion de facturacion
    $('#inp_desde_facturar').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#inp_hasta_facturar').kendoDatePicker({ format: 'dd-MM-yyyy' });
    //seccion de Pre-Autorizaciones
    $('#inp_desde_autorizacioniesAf').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#inp_hasta_autorizacioniesAf').kendoDatePicker({ format: 'dd-MM-yyyy' });
    //seccion reclamos
    $('#inp_desde_reclamo').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#inp_hasta_reclamo').kendoDatePicker({ format: 'dd-MM-yyyy' });
    //seccion  siniestralidad
    $('#inp_desde_Autorizaciones').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#inp_hasta_Autorizaciones').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#btn_Buscar_autorizaciones').kendoButton();
    //seccion de reportes de liquidaciones    
    $('#btn_GenerarReporteLiquidacion').kendoButton();
    $('#dt_DesdeLiquidacion').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_HastaLiquidacion').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_SelectListasLiquidacion').kendoButton();
    $('#btn_AceptarFiltroLiquidacion').kendoButton();
    //seccion de reporte de copagos
    $('#btn_GenerarReporteCopagos').kendoButton();
    $('#dt_DesdeCopagos').kendoDatePicker();
    $('#dt_HastaCopagos').kendoDatePicker();
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_SelectListasCopagos').kendoButton();
    $('#btn_AceptarFiltroCopagos').kendoButton();
    //Seccion de reporte de Pre-Autorizaciones
    $('#btn_GenerarReporteAutorizacionesR').kendoButton();
    $('#dt_DesdeAutorizacionesR').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_HastaAutorizacionesR').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_SelectListasAutorizacionesR').kendoButton();
    $('#btn_AceptarFiltroAutorizacionesR').kendoButton();
    //Seccion de reportes Siniestralidad
    $('#dt_DesdeSiniestralidad').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_HastaSiniestralidad').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_SelectListasSiniestralidad').kendoButton();
    $('#btn_AceptarFiltroSiniestralidad').kendoButton();
    $('#line_ResultadoSiniestralidad').hide();
    $('#mnu_Generar').kendoMenu({
        select: GenerarReporteSiniestralidad
    });
    //Elementos Globales
    var listAfiliadosGlobal = new Array();
    var listEmpresaGlobal = new Array();
    var EmpresaSeleccionada = new EmpresaList();
    var tipoProceso = '';
    var tipoReporteSiniestralidad = null;
    var esGrupo = false;
    //activamos la seccion de busquedas
    $('#criterioBusqueda').show();
    $('#VerPlanOpciones').hide();
    $('#BusquedaEspecifica').hide();
    $('#regresarOpc').hide();
    $('#seccionDetallesSeleccionados').hide();
    $('#seccionPlanContratadoLista').hide();
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        },
        select: onSelect
    });
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $('#btn_SeleccionarAgentes2').kendoButton();
    $('#btn_SeleccionarAgentes3').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Unidad",
        modal: true
    }).data("kendoWindow");
    $("#ventana_Cuota").kendoWindow({
        width: "350px",
        height: "350px",
        title: "Detalle Valor Cuota",
        modal: true
    }).data("kendoWindow");
    // Valido si es que el filtro por grupo de agentes, y selección de agentes debe mostrarse (esto aplica solamente si el usuario de la sesión tiene configurado un grupo de agentes diferente a "Ninguno")
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        $('#grupoBroker').hide();
        $('#grupoBroker2').hide();
        $('#grupoBroker3').hide();
        esGrupo = false;
    }
    else {
        esGrupo = true;
        $('#grupoBroker').show();
        $('#grupoBroker2').show();
        $('#grupoBroker3').show();
        // carga la grilla de agentes disponibles
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes, function (res) {
            var lst = res.Datos;
            generalListas = lst;
            $('#grid_GrupoAgentes').kendoGrid({
                dataSource: {
                    data: lst,
                    schema: {
                        model: {
                            id: "Codigo"
                        }
                    },
                    pageSize: 5,
                    sort: { field: "Nombre", dir: "asc" }
                    //group: [{ field: "NombreEmpresa" }]
                },
                height: 450,
                scrollable: true,
                sortable: true,
                groupable: false,
                persistSelection: true,
                filterable: true,
                pageable: true,
                columns: [
                    { selectable: true, width: "50px" },
                    { field: "Nombre", title: "Nombre", width: "300px", filterable: { multi: true, search: true } }
                ]
            });
        }, function () { });
    }
    $('#btn_AceptarGrupoAgentes').click(function () {
        $("#lbl_GrupoAgentes").text(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        $("#lbl_GrupoAgentes2").text(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.Codigo === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
        //fin proceso
        $("#ventana_GrupoAgentes").data('kendoWindow').close();
        // tal vez aquí mismo podría invocarse la llamada al servicio que filtre los datos presentados
    });
    $('#btn_CerrarCuota').click(function () {
        $("#ventana_Cuota").data('kendoWindow').close();
    });
    $('#btn_SeleccionarAgentes').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    $('#btn_SeleccionarAgentes2').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    $('#btn_SeleccionarAgentes3').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    function onSelect(e) {
        var index = $(e.item).index();
        //pestaña de detalles cuotas
        if (index === 0) {
            //regreso a la pestaña inicial reincion controles internos
            $("#rb_ReportesAfiliados").kendoButtonGroup({
                index: 0
            });
            $('#ReporteReclamosAf').show();
            $('#ReporteAutorizacionesAf').hide();
            $('#Cartas').hide();
            limpiarReclamosAfiliado();
        }
        if (index === 1) {
            if (tipoProceso === 'Independiente' || tipoProceso == 'Afiliado' || tipoProceso === 'Experience' || tipoProceso === 'Oncocare') {
                //en esta parte debemos presentar dependiendo de que tipo de contrato es si es tipo ind's o cor's
                $('#seccionFormasDePagos').show(); //muestro toda la seccion de detalles
                $('#formaPagoDebitoAfiliado').hide(); //ocultamos para no mostrar formas de pago debito
                if (yoAfiliado.CodigoProducto != 'COR' && yoAfiliado.CodigoProducto != 'SMAR'
                    && yoAfiliado.CodigoProducto != 'POOL') {
                    //llamo al servicio web que carga la informacion
                    $('#DetalleFacturacionAfiliado').show();
                    get$contrato$ConsultarDetalleCuotasXContrato(IDNumeroContratoAfiliado, function (res) {
                        var tipoPago = res.Datos;
                        $('#formaPagoIndependiente').show();
                        $('#formaPagoEmpresa').hide();
                        $('#BusquedaformaPagoIndependiente').show();
                        $('#BusquedaformaPagoEmpresa').hide();
                        $('#formaPagoEmpresa').hide();
                        //En este tap llamaria al servicio y cargario los datos de los labels
                        if (tipoPago.FacturarCedula != '' && tipoPago.FacturarCedula != undefined && tipoPago.FacturarCedula != null && (tipoPago.FacturarCedula.split("0").length - 1) <= 9) {
                            $('#factCedu').show();
                            $('#lblfacturarCedula').text(tipoPago.FacturarCedula);
                        }
                        else {
                            $('#factCedu').hide();
                        }
                        if (tipoPago.FacturarPasaporte != '' && tipoPago.FacturarPasaporte != undefined && tipoPago.FacturarPasaporte != null && (tipoPago.FacturarPasaporte.split("0").length - 1) <= 9) {
                            $('#factPasa').show();
                            $('#lblfacturarPasaporte').text(tipoPago.FacturarPasaporte);
                        }
                        else {
                            $('#factPasa').hide();
                        }
                        if (tipoPago.FacturarRUC != '' && tipoPago.FacturarRUC != undefined && tipoPago.FacturarRUC != null && (tipoPago.FacturarRUC.split("0").length - 1) <= 9) {
                            $('#factRuc').show();
                            $('#lblfacturarRuc').text(tipoPago.FacturarRUC);
                        }
                        else {
                            $('#factRuc').hide();
                        }
                        $('#lblfacturarBanco').text(tipoPago.BancoTarjeta);
                        $('#lblfacturarTipoCuenta').text(tipoPago.TipoCuentaDesc);
                        //Encriptamos numero de cuenta
                        var encript = '';
                        if (tipoPago.NumCuentaDebito != undefined && tipoPago.NumCuentaDebito != null && tipoPago.NumCuentaDebito != '') {
                            if (tipoPago.NumCuentaDebito.length > 3) {
                                for (i = 0; i <= tipoPago.NumCuentaDebito.length; i++) {
                                    if (i < tipoPago.NumCuentaDebito.length - 3) {
                                        encript = encript + 'x';
                                    }
                                    else {
                                        encript = encript + tipoPago.NumCuentaDebito.charAt(i);
                                    }
                                }
                            }
                            else {
                                encript = tipoPago.NumCuentaDebito;
                            }
                        }
                        $('#lblfacturarNumeroCuentaDebito').text(encript);
                        $('#lblfacturarFormaPago').text(tipoPago.FormaPagoDesc);
                        if (tipoPago.FechaFinTarjeta != null && tipoPago.FechaFinTarjeta != undefined) {
                            var fechaTarjeta = new Date(tipoPago.FechaFinTarjeta);
                            ;
                            $('#lblfechaFinTarjeta').text('' + fechaTarjeta.getUTCDate() + '/' + (fechaTarjeta.getUTCMonth() + 1) + '/' + fechaTarjeta.getFullYear());
                        }
                        else
                            $('#lblfechaFinTarjeta').text('');
                        //$('#lblfechaPago').text('01-01-2018');
                        $('#lblNombreDuenioTarjeta').text(tipoPago.NombreDuenioCuenta);
                        if (tipoPago.FormaPagoDesc.toLowerCase().includes('debito')) {
                            $('#formaPagoDebitoAfiliado').show();
                        }
                        else {
                            $('#formaPagoDebitoAfiliado').hide();
                        }
                    }, function () { });
                }
                else {
                    $('#formaPagoIndependiente').hide();
                    $('#formaPagoEmpresa').show();
                    $('#BusquedaformaPagoIndependiente').show();
                    $('#BusquedaformaPagoEmpresa').hide();
                    get$facturacion$ObtenerFormaPagoEmpresa(Number(yoAfiliado.NumeroEmpresa), Number(yoAfiliado.NumeroSucursal), function (res) {
                        var facturacion = res.Datos;
                        $('#lblfacturarRucEmpresa').text(facturacion.FacturarA);
                        $('#lblfacturarNombreEmpresa').text(facturacion.EmpresaNombre);
                        $('#lblfacturarBancoEmpresa').text(facturacion.NombreBanco);
                        $('#lblfacturarTipoCuentaEmpresa').text(facturacion.TipoCuenta);
                        var encript = '';
                        if (facturacion.numeroCuenta != undefined && facturacion.numeroCuenta != null && facturacion.numeroCuenta != '') {
                            if (facturacion.numeroCuenta.length > 3) {
                                for (i = 0; i <= facturacion.numeroCuenta.length; i++) {
                                    if (i < facturacion.numeroCuenta.length - 3) {
                                        encript = encript + 'x';
                                    }
                                    else {
                                        encript = encript + facturacion.numeroCuenta.charAt(i);
                                    }
                                }
                            }
                            else {
                                encript = facturacion.numeroCuenta;
                            }
                        }
                        $('#lblfacturarNumeroCuentaDebitoEmpresa').text(encript);
                        $('#lblfacturarFormaPagoEmpresa').text(facturacion.FormaPago);
                        $('#lblfacturarPeriodoPago').text(facturacion.periodoPago);
                        if (facturacion.FormaPago.toLowerCase().includes('debito')) {
                            $('#formaPagoDebito').show();
                        }
                        else {
                            $('#formaPagoDebito').hide();
                        }
                    }, function () { });
                }
                //limpio los controles de busqueda
                $('#inp_desde_facturar').data("kendoDatePicker").value(null);
                $('#inp_hasta_facturar').data("kendoDatePicker").value(null);
                $('#inp_numero_facturar').val('');
                if ($('#gridFacturacion').data().kendoGrid) {
                    $('#gridFacturacion').data().kendoGrid.destroy();
                    $('#gridFacturacion').empty();
                }
                $('#gridFacturacion').hide();
                $('#seccionEmpresaReporteMovimiento').hide();
            }
            else {
                $('#SeccionFacturacionEmpresas').show();
                $('#gridFormasPagosEmpresas').show();
                $('#formaPagoEmpresa').show(); //al inicio no muestro los detalles esto se motrara al seccionar una factura
                $('#seccionFormasDePagos').show(); // al inicio oculto todos los detalles para que se vea solo la grilla
                $('#formaPagoIndependiente').hide();
                $('#DetalleFacturacionAfiliado').hide();
                $('#seccionEmpresaReporteMovimiento').hide();
                $('#pnl_ResultadoWeb').hide();
                $('#pnl_ResultadoReporteador').hide();
                $("#rb_formato").kendoButtonGroup({
                    index: 0
                });
                //ahora cargo la grilla con los datos de las facturas
                if ($('#gridFormasPagosEmpresas').data().kendoGrid) {
                    $('#gridFormasPagosEmpresas').data().kendoGrid.destroy();
                    $('#gridFormasPagosEmpresas').empty();
                }
                get$facturacion$ObtenerFacturasCorpElectronicasXEmpresaSucursalBrokerLQ(IDEmpresa, IDSucursal, '', function (res) {
                    var lstFacturas = new Array();
                    lstFacturas = res.Datos;
                    for (let i in lstFacturas) {
                        lstFacturas[i].FechaMes = formatDate(lstFacturas[i].FechaEmision);
                    }
                    $("#gridFormasPagosEmpresas").show();
                    $("#gridFormasPagosEmpresas").kendoGrid({
                        dataSource: {
                            data: lstFacturas,
                            schema: {
                                model: {
                                    fields: {
                                        NumeroFactura: { type: "string" },
                                        SucursalNombre: { type: "string" },
                                        FechaEmision: { type: "Date" },
                                        ValorTotal: { type: "number" },
                                        Alias: { type: "string" },
                                        PeriodoFacturacion: { type: "string" }
                                    }
                                }
                            },
                            pageSize: 10,
                            sort: { field: "FechaEmision", dir: "desc" }
                        },
                        height: 500,
                        resizable: true,
                        pageable: {
                            input: true,
                            numeric: false
                        },
                        columns: [
                            { field: "NombreEmpresa", title: "Empresa", width: "150px", headerAttributes: { style: "white-space: normal" } },
                            { field: "NombreSucursal", title: "Sucursal", width: "150px", headerAttributes: { style: "white-space: normal" } },
                            { field: "NumeroFactura", title: "No-Factura", width: "150px", headerAttributes: { style: "white-space: normal" } },
                            { field: "PeriodoFacturacion", title: "Periodo de Facturación", width: "150px", headerAttributes: { style: "white-space: normal" } },
                            { field: "FechaMes", title: "Mes Emisión", width: "120px", headerAttributes: { style: "white-space: normal" } },
                            { field: "ValorTotal", title: "Valor Total", width: "100px", headerAttributes: { style: "white-space: normal" } },
                            { field: "Estado", title: "Estado", template: kendo.template($('#EstadosFacturacionEmpresa').html()), width: "150px", filterable: { multi: true, search: true } },
                            { command: { text: "RIDE", click: DescargarRIDE }, title: "Descarga", width: "100px" },
                            { command: { text: "XML", click: DescargarXML }, title: "Descarga", width: "100px" },
                            { command: { text: "PDF", click: DescargarSoportes }, title: "Soporte", width: "100px" },
                            { command: { text: "EXCEL", click: DescargarSoportesExcel }, title: "Soporte", width: "100px" }
                        ]
                    });
                }, function () { });
                //ahora cargo la informacion sobre facturacion
                get$facturacion$ObtenerFormaPagoEmpresa(IDEmpresa, IDSucursal, function (res) {
                    var facturacion = res.Datos;
                    $('#lblfacturarRucEmpresa').text(facturacion.FacturarA);
                    $('#lblfacturarNombreEmpresa').text(facturacion.EmpresaNombre);
                    $('#lblfacturarBancoEmpresa').text(facturacion.NombreBanco);
                    $('#lblfacturarTipoCuentaEmpresa').text(facturacion.TipoCuenta);
                    var encript = '';
                    if (facturacion.numeroCuenta != undefined && facturacion.numeroCuenta != null && facturacion.numeroCuenta != '') {
                        if (facturacion.numeroCuenta.length > 3) {
                            for (i = 0; i <= facturacion.numeroCuenta.length; i++) {
                                if (i < facturacion.numeroCuenta.length - 3) {
                                    encript = encript + 'x';
                                }
                                else {
                                    encript = encript + facturacion.numeroCuenta.charAt(i);
                                }
                            }
                        }
                        else {
                            encript = facturacion.numeroCuenta;
                        }
                    }
                    $('#lblfacturarNumeroCuentaDebitoEmpresa').text(encript);
                    $('#lblfacturarFormaPagoEmpresa').text(facturacion.FormaPago);
                    $('#lblfacturarPeriodoPago').text(facturacion.periodoPago);
                    if (facturacion.FormaPago.toLowerCase().includes('debito')) {
                        $('#formaPagoDebito').show();
                    }
                    else {
                        $('#formaPagoDebito').hide();
                    }
                }, function () { });
            }
        }
        //seccion de reclamos clientes
        if (index === 2) {
            if (tipoProceso === 'Independiente' || tipoProceso == 'Afiliado' || tipoProceso === 'Experience' || tipoProceso === 'Oncocare') {
                $('#ReporteAutorizacionesAf').hide();
                $('#Cartas').hide();
                //seccion de reclamos Afiliado
                $('#inp_desde_reclamo').data("kendoDatePicker").value(null);
                $('#inp_hasta_reclamo').data("kendoDatePicker").value(null);
                $('#inp_numero_liquidacion_reclamo').val('');
                $('#inp_numero_sobre_reclamo').val('');
                $('#seccionRAfiliado').show();
                $('#seccionBeneficiarioOpcion').hide();
                $('#seccionBeneficiarioOpcionCarta').hide();
                if (BeneficiariosIndividuales != undefined && BeneficiariosIndividuales.length != 0) {
                    $('#seccionBeneficiarioOpcion').show();
                    $('#OpcionesBusquedaBeneficiario').kendoDropDownList({
                        dataTextField: "NombreBeneficiario",
                        dataValueField: "IdBeneficiario",
                        dataSource: BeneficiariosIndividuales,
                        optionLabel: "TODOS"
                    });
                    $('#seccionBeneficiarioOpcionCarta').show();
                    $('#OpcionesBusquedaBeneficiarioCarta').kendoDropDownList({
                        dataTextField: "NombreBeneficiario",
                        dataValueField: "IdBeneficiario",
                        dataSource: BeneficiariosIndividuales,
                        optionLabel: "TODOS"
                    });
                }
                $('#seccionREmpresa').hide();
                if ($('#gridReclamos').data().kendoGrid) {
                    $('#gridReclamos').data().kendoGrid.destroy();
                    $('#gridReclamos').empty();
                }
                $('#gridReclamos').hide();
            }
            else {
                //seccion de reportes empresa
                $('#seccionRAfiliado').hide();
                $('#seccionREmpresa').show();
                //mostramos y ocultamos secciones
                $('#seccionReporteLiquidacion').show();
                $('#seccionReporteCopago').hide();
                $('#seccionReporteAutorizaicones').hide();
                //selecciono opcion 1
                $("#rb_Reportes").kendoButtonGroup({
                    index: 0
                });
                limpiarBusquedaReportes();
            }
        }
        //seccion de siniestralidad
        if (index === 3) {
            if (tipoProceso === 'Independiente' || tipoProceso == 'Afiliado' || tipoProceso === 'Experience' || tipoProceso === 'Oncocare') {
                //seccion de reclamos Afiliado
                //limpiamos siniestralidad
                $('#siniestralidadAfiliados').show();
                $('#siniestralidadEmpresas').hide();
                $('#inp_siniestralidad_periodo_vigente').val('');
                $('#inp_siniestralidad_periodo_vigente').prop("disabled", true);
                $('#inp_siniestralidad_bonificado_vigente').val('');
                $('#inp_siniestralidad_bonificado_vigente').prop("disabled", true);
                $('#inp_siniestralidad_facturado_vigente').val('');
                $('#inp_siniestralidad_facturado_vigente').prop("disabled", true);
                $('#inp_siniestralidad_vigente').val('');
                $('#inp_siniestralidad_vigente').prop("disabled", true);
                //llamo al servicio para 
                var filtro = new FiltroSiniestralidadActual();
                filtro.CodigoContrato = yoAfiliado.CodigoContrato;
                filtro.CodigoProducto = yoAfiliado.CodigoProducto;
                filtro.CodigoRegion = yoAfiliado.CodigoRegion;
                filtro.NumeroPersona = yoAfiliado.NumeroPersona;
                filtro.NumeroContrato = yoAfiliado.NumeroContrato;
                post$contrato$getOneByKey(filtro, function (res) {
                    var siniestralidadVigente = res;
                    $('#inp_siniestralidad_periodo_vigente').val(siniestralidadVigente.PeriodoPago);
                    $('#inp_siniestralidad_bonificado_vigente').val(siniestralidadVigente.TotalBonificadoVigente);
                    $('#inp_siniestralidad_facturado_vigente').val(siniestralidadVigente.TotalFacturadoVigente);
                    $('#inp_siniestralidad_vigente').val(siniestralidadVigente.PorcentajeSiniestralidadVigente);
                }, function (error) {
                });
            }
            else {
                $('#dt_DesdeSiniestralidad').data("kendoDatePicker").value(null);
                $('#dt_HastaSiniestralidad').data("kendoDatePicker").value(null);
                $('#txt_IdentificacionSiniestralidad').val('');
                $("#tipoReporteSiniestralida").data('kendoDropDownList').value(null);
                $('#siniestralidadAfiliados').hide();
                $('#siniestralidadEmpresas').show();
                $('#pnl_ResultadoReporteadorSiniestralidad').hide();
            }
        }
    }
    var tabstrip = $("#tabstrip").data("kendoTabStrip");
    $('#OpcionesBusqueda').kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione", value: null },
            { text: "Afiliado", value: "Afiliado" },
            { text: "Empresa", value: "Empresa" },
            { text: "Plan Contratado", value: "Plan_Contratado" }
        ],
        suggest: true,
        value: ["Seleccione"],
        change: SeleccionCriterio
    });
    //creo el  menu de opciones dinamicamente
    var listaOpciones = [];
    var planes = UsuarioLogueado.PermisoPlan;
    if (planes != null && planes.length > 0) {
        var listPlanes = planes.split(';');
        for (var i = 0; i < listPlanes.length - 1; i++) {
            var opcion = new Object();
            if (listPlanes[i] == 'IND') {
                opcion.text = 'Individual';
                opcion.value = 'Independiente';
                listaOpciones.push(opcion);
            }
            if (listPlanes[i] == 'XPR') {
                opcion.text = 'Experience';
                opcion.value = 'Experience';
                listaOpciones.push(opcion);
            }
            if (listPlanes[i] == 'SMAR') {
                opcion.text = 'SmartPlan';
                opcion.value = 'SmartPlan';
                listaOpciones.push(opcion);
            }
            if (listPlanes[i] == 'COR') {
                opcion.text = 'Corporativo';
                opcion.value = 'Corporativo';
                listaOpciones.push(opcion);
            }
            if (listPlanes[i] == 'POO') {
                opcion.text = 'Pool';
                opcion.value = 'Pool';
                listaOpciones.push(opcion);
            }
            if (listPlanes[i] == 'GRUPAL') {
                opcion.text = 'Grupal';
                opcion.value = 'Grupal';
                listaOpciones.push(opcion);
            }
        }
    }
    $('#PlanContratadoOpc').kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: listaOpciones,
        optionLabel: "Seleccione...",
        change: SeleccionTipoPlan
    });
    //seleccion de tipo de reporte de siniestralidad
    $('#tipoReporteSiniestralida').kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione", value: null },
            { text: "Detalle de Siniestralidad", value: "Siniestralida" },
            { text: "Detalle de Siniestralidad por Lista", value: "SiniestralidadLista" },
            { text: "Detalle de Siniestralidad (Hoja de Trabajo)", value: "SiniestralidadTrabajo" },
            { text: "Detalle de Siniestralidad por Lista (Hoja de Trabajo)", value: "SiniestralidadListaTrabajo" }
        ],
        suggest: true,
        value: ["Seleccione"],
        change: SeleccionCriterioSiniestralidad
    });
    //Seccion reporte de movimientos
    // opciones Movimientos
    $("#opcionesTipoMovimiento").kendoDropDownList({
        dataSource: {
            data: [
                { "id": 2, "value": "Exclusión" },
                { "id": 1, "value": "Inclusión" },
                { "id": 3, "value": "Termino Dependiente" },
                { "id": 10, "value": "Inclusión Beneficiario" },
                { "id": 8, "value": "Cambio de Tarifa" },
                { "id": 0, "value": "Todos" }
            ]
        },
        dataTextField: "value",
        dataValueField: "id",
        animation: false,
        maxSelectedItems: 1,
        value: [1]
    });
    //reporte de Movimientos
    $("#ventana_SelectLista").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Brokers",
        modal: true
    }).data("kendoWindow");
    $('#btn_SelectListas').click(function () {
        $("#ventana_SelectLista").data('kendoWindow').center().open();
    });
    //reporte de Liquidaciones
    $("#ventana_SelectListaLiquidacion").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Listas",
        modal: true
    }).data("kendoWindow");
    $('#btn_SelectListasLiquidacion').click(function () {
        $("#ventana_SelectListaLiquidacion").data('kendoWindow').center().open();
    });
    //reporte de copagos
    $("#opcionesEstadoFacturaCopagos").kendoDropDownList({
        dataSource: {
            data: [
                { "id": 3, "value": "Pendiente de Pago" },
                { "id": 26, "value": "Cobrado" },
                { "id": 2, "value": "Anulado" },
                { "id": 0, "value": "Todos" }
            ]
        },
        dataTextField: "value",
        dataValueField: "id",
        animation: false,
        maxSelectedItems: 1,
        value: [30]
    });
    $("#ventana_SelectListaCopagos").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Listas",
        modal: true
    }).data("kendoWindow");
    $('#btn_SelectListasCopagos').click(function () {
        $("#ventana_SelectListaCopagos").data('kendoWindow').center().open();
    });
    //reporte de Pre-Autorizaciones
    $("#ventana_SelectListaAutorizacionesR").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Listas",
        modal: true
    }).data("kendoWindow");
    $('#btn_SelectListasAutorizacionesR').click(function () {
        $("#ventana_SelectListaAutorizacionesR").data('kendoWindow').center().open();
    });
    //reportes de Siniestralidad
    $("#ventana_SelectListaSiniestralidad").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Listas",
        modal: true
    }).data("kendoWindow");
    $('#btn_SelectListasSiniestralidad').click(function () {
        $("#ventana_SelectListaSiniestralidad").data('kendoWindow').center().open();
    });
    //en caso de cambio o seleccion
    function SeleccionCriterio() {
        $('#seccionPlanContratadoLista').hide();
        var valorSeleccion = $('#OpcionesBusqueda').val();
        if (valorSeleccion === 'Plan_Contratado')
            $('#VerPlanOpciones').show();
        else {
            $('#VerPlanOpciones').hide();
            if (valorSeleccion != null) {
                if (valorSeleccion === 'Afiliado') {
                    tipoProceso = 'Afiliado';
                    $('#tituloBusquedaEspecifica').text('Busqueda Especifica Afiliado');
                    //activamos y descativamos controles propios de busqueda de afiliado
                    $('#seccionBusquedaAfiliado').show();
                    $('#seccionBusquedaEmpresa').hide();
                }
                else {
                    tipoProceso = 'Empresa';
                    $('#tituloBusquedaEspecifica').text('Busqueda Especifica Empresa');
                    //activamos y descativamos controles propios de busqueda de Empresa
                    $('#seccionBusquedaAfiliado').hide();
                    $('#seccionBusquedaEmpresa').show();
                }
                $('#BusquedaEspecifica').show();
                $('#criterioBusqueda').hide();
                $('#regresarOpc').show();
            }
        }
    }
    function SeleccionTipoPlan() {
        var valorSeleccion = $('#PlanContratadoOpc').val();
        tipoProceso = valorSeleccion;
        if (valorSeleccion != null) {
            $('#criterioBusqueda').hide();
            $('#regresarOpc').show();
            //llamada a parte espcifica de planes
            $('#seccionPlanContratadoLista').show();
            if ($('#gridPlanesR').data().kendoGrid) {
                $('#gridPlanesR').data().kendoGrid.destroy();
                $('#gridPlanesR').empty();
            }
            if (tipoProceso === 'Independiente' || tipoProceso === 'Experience' || tipoProceso === 'Oncocare') {
                var CodProducto = '';
                if (tipoProceso === 'Independiente') {
                    $('#tituloPlan').text('Plan Individual');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Individual</b>');
                    CodProducto = 'IND';
                }
                if (tipoProceso === 'Experience') {
                    $('#tituloPlan').text('Plan Experience');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Experience</b>');
                    CodProducto = 'XPR';
                }
                if (tipoProceso === 'Oncocare') {
                    $('#tituloPlan').text('Planes Oncocare');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Oncocare</b>');
                    CodProducto = 'ONC';
                }
                var filtro = new ContratoEntityFilter();
                var brokers = new Array();
                if (esGrupo) {
                    if (listasSeleccion == undefined || listasSeleccion.length == 0) {
                        alert('Debe selecccionar al menos un broker');
                        return false;
                    }
                    for (let item of listasSeleccion) {
                        brokers.push(item.Codigo);
                    }
                }
                else {
                    brokers.push(UsuarioLogueado.IdCorredor);
                }
                //transformo el producto para ser recibido por el servicio
                filtro.Brokers = brokers;
                filtro.lstProductos = [CodProducto];
                filtro.SoloActivos = true;
                post$contrato$ConsultarContratosIndividualesPorAgente(filtro, function (res) {
                    var lst = res.Datos;
                    if (lst.length == 0)
                        return alert('No existen contratos para el producto seleccionado.');
                    for (let o of lst) {
                        if (o.FechaVigenciaDate != null || o.FechaVigenciaDate != undefined) {
                            var fechaIni = new Date(o.FechaVigenciaDate);
                            o.FechaVigenciaDateDesc = fechaIni.getUTCDate() + '/' + (fechaIni.getUTCMonth() + 1) + '/' + fechaIni.getFullYear();
                        }
                    }
                    //dependiendo del tipo de reporte lo generamos como visual o como descargable
                    var TipoReporte = $("#rb_formatoProducto").data('kendoButtonGroup').current().index();
                    if (TipoReporte == 0) {
                        $('#gridPlanesR').show();
                        $('#pnl_ResultadoReporteadorProInd').hide();
                        $('#gridPlanesR').kendoGrid({
                            dataSource: {
                                data: lst,
                                pageSize: 10,
                            },
                            height: 650,
                            scrollable: true,
                            sortable: true,
                            groupable: false,
                            persistSelection: true,
                            pageable: true,
                            columns: [
                                { command: { text: "Seleccionar", click: seleccionarPlanInd }, title: "Seleccionar", width: "150px" },
                                { field: "NumeroContrato", title: "Contratos", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "NombresApellidos", title: "Nombres", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "PrecioBase", title: "Valor", width: "100px", headerAttributes: { style: "white-space: normal" } },
                                { field: "FechaVigenciaDateDesc", title: "Vigencia", width: "150px", headerAttributes: { style: "white-space: normal" } }
                            ]
                        });
                    }
                    else {
                        $('#gridPlanesR').hide();
                        $('#pnl_ResultadoReporteadorProInd').show();
                        // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
                        var pars = new ParametrosReporte();
                        pars.NombreReporte = "ReporteContrInd";
                        //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
                        pars.Estados = ""; // este reporte no tiene filtro por estados
                        pars.FechaInicio = new Date();
                        pars.FechaFin = new Date();
                        respGeneral = lst;
                        var serializado = JSON.stringify(pars);
                        var codificado = btoa(serializado);
                        var estados = new Array();
                        // cargo la ruta en el reporteador
                        $('#iframeReporteadoProdInd').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                        ReporteInvocadoProductoInd = false;
                    }
                }, function () { });
            }
            else {
                var CodProducto = '';
                if (tipoProceso === 'Pool') {
                    $('#tituloPlan').text('Plan Pool');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Pool</b>');
                    CodProducto = 'POO';
                }
                if (tipoProceso === 'Grupal') {
                    $('#tituloPlan').text('Plan Grupal');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Grupal</b>');
                    CodProducto = 'GRUPAL';
                }
                if (tipoProceso === 'Corporativo') {
                    $('#tituloPlan').text('Planes Corporativo');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b>plan Corporativo</b>');
                    CodProducto = 'COR';
                }
                if (tipoProceso === 'SmartPlan') {
                    $('#tituloPlan').text('Planes SmartPlan');
                    $('#txtTituloPlan').html('Listados de contraros pertenecientes al <b> SmartPlan</b>');
                    CodProducto = 'SMARTPLAN';
                }
                //pendiente empresa
                var filtroEmpres = new ContratosIndividualesEmpresasPorAgenteFilter();
                var brokers = new Array();
                if (esGrupo) {
                    if (listasSeleccion == undefined || listasSeleccion.length == 0) {
                        alert('Debe selecccionar al menos un broker');
                        return false;
                    }
                    for (let item of listasSeleccion) {
                        brokers.push(item.Codigo);
                    }
                }
                else {
                    brokers.push(UsuarioLogueado.IdCorredor);
                }
                //transformo el producto para ser recibido por el servicio
                filtroEmpres.Brokers = brokers;
                filtroEmpres.lstProductos = [CodProducto];
                filtroEmpres.SoloActivos = true;
                post$contrato$ConsultarContratosCorpPorAgente(filtroEmpres, function (res) {
                    var lst = res.Datos;
                    if (lst.length == 0)
                        return alert('No existen listas para el producto seleccionado.');
                    for (let o of lst) {
                        if (o.FechaFinSucursalDate != null || o.FechaFinSucursalDate != undefined) {
                            var fechaFin = new Date(o.FechaFinSucursalDate);
                            o.FechaFinSucursal = fechaFin.getUTCDate() + '/' + (fechaFin.getUTCMonth() + 1) + '/' + fechaFin.getFullYear();
                        }
                    }
                    var TipoReporte = $("#rb_formatoProducto").data('kendoButtonGroup').current().index();
                    if (TipoReporte == 0) {
                        $('#gridPlanesR').show();
                        $('#pnl_ResultadoReporteadorProInd').hide();
                        $('#gridPlanesR').kendoGrid({
                            dataSource: {
                                data: lst,
                                pageSize: 10,
                            },
                            height: 500,
                            scrollable: true,
                            sortable: true,
                            groupable: false,
                            persistSelection: true,
                            filterable: true,
                            pageable: false,
                            columns: [
                                { command: { text: "Seleccionar", click: seleccionarPlanEmp }, title: "Seleccionar", width: "150px" },
                                { field: "NumeroEmpresa", title: "Empresa", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "RazonSocial", title: "Nombre Empresa", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "NumeroSucursal", title: "Lista", width: "100px", headerAttributes: { style: "white-space: normal" } },
                                { field: "NombreSucursal", title: "Nombre Lista", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "FechaFinSucursal", title: "Vigencia", width: "150px", headerAttributes: { style: "white-space: normal" } }
                            ]
                        });
                    }
                    else {
                        $('#gridPlanesR').hide();
                        $('#pnl_ResultadoReporteadorProInd').show();
                        // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
                        var pars = new ParametrosReporte();
                        pars.NombreReporte = "ReporteContrCorp";
                        //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
                        pars.Estados = ""; // este reporte no tiene filtro por estados
                        pars.FechaInicio = new Date();
                        pars.FechaFin = new Date();
                        respGeneral = lst;
                        var serializado = JSON.stringify(pars);
                        var codificado = btoa(serializado);
                        var estados = new Array();
                        // cargo la ruta en el reporteador
                        $('#iframeReporteadoProdInd').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                        ReporteInvocadoProductoInd = false;
                    }
                }, function () { });
            }
        }
    }
    function SeleccionCriterioSiniestralidad() {
        tipoReporteSiniestralidad = $('#tipoReporteSiniestralida').val();
        if (tipoReporteSiniestralidad === null) {
            alert('Seleccione un tipo de reporte');
            return false;
        }
        GenerarReporteSiniestralidad();
    }
    //Escuchas
    $('#btn_back').click(function () {
        Reiniciar();
    });
    //seccion de reportes
    $('#butReporteLiquidacion').click(function () {
        $('#seccionReporteLiquidacion').show();
        $('#seccionReporteCopago').hide();
        $('#seccionReporteAutorizaicones').hide();
        limpiarBusquedaReportes();
    });
    $('#butReporteReclamosAfiliado').click(function () {
        $('#ReporteReclamosAf').show();
        $('#ReporteAutorizacionesAf').hide();
        $('#Cartas').hide();
        limpiarReclamosAfiliado();
    });
    $('#butReportePreAutorizacionesAfiliado').click(function () {
        $('#ReporteReclamosAf').hide();
        $('#ReporteAutorizacionesAf').show();
        $('#Cartas').hide();
        limpiarReclamosAfiliado();
    });
    $('#butCartas').click(function () {
        $('#ReporteReclamosAf').hide();
        $('#ReporteAutorizacionesAf').hide();
        $('#Cartas').show();
        limpiarCartas();
        var contratoCarta = yoAfiliado.NumeroContrato;
        if ($('#gridCartas').data().kendoGrid) {
            $('#gridCartas').data().kendoGrid.destroy();
            $('#gridCartas').empty();
        }
        var filtro = new FilterQpra();
        filtro.Contrato_Numero = Number(contratoCarta);
        var beneficiarios = new Array();
        if ($("#OpcionesBusquedaBeneficiarioCarta").val() != '' && $("#OpcionesBusquedaBeneficiarioCarta").val() != null) {
            filtro.beneficiarios = [Number($("#OpcionesBusquedaBeneficiarioCarta").data("kendoDropDownList").value())];
        }
        post$Qpra$CorredoresObtenerContratoQpra(filtro, function (res) {
            var lst = res.Datos;
            respGeneral = lst;
            $('#gridCartas').show();
            $('#gridCartas').kendoGrid({
                dataSource: {
                    data: lst,
                    pageSize: 20
                },
                height: 450,
                scrollable: true,
                sortable: true,
                persistSelection: true,
                pageable: true,
                columns: [
                    { field: "Num_Solicitud", title: "Número de Carta", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Reclamante_Nombre", title: "Beneficiario", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Relacion", title: "Relación", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Tipo_Tramite_Descripcion", title: "Tipo", width: "120px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { command: { text: "Descargar", click: DescargarSoporteCarta }, title: "SELECCIONAR", width: "120px" }
                ]
            });
        }, function () { });
    });
    $('#butReporteCopagos').click(function () {
        $('#seccionReporteLiquidacion').hide();
        $('#seccionReporteCopago').show();
        $('#seccionReporteAutorizaicones').hide();
        limpiarBusquedaReportes();
    });
    $('#butReporteAutorizaciones').click(function () {
        $('#seccionReporteLiquidacion').hide();
        $('#seccionReporteCopago').hide();
        $('#seccionReporteAutorizaicones').show();
        limpiarBusquedaReportes();
    });
    //busqueda de Afiliados pantalla principal
    $('#btn_Buscar_autorizacioniesAf').click(function () {
        var FiltroDesde = $('#inp_desde_autorizacioniesAf').data('kendoDatePicker').value();
        var FiltroHasta = $('#inp_hasta_autorizacioniesAf').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        //buscamos y cargamos la grilla :D
        var filtro = new PreautorizacionesFilter();
        filtro.IdBroker = [yoAfiliado.CodigoAgenteVenta];
        filtro.fechaInicio = FiltroDesde;
        filtro.fechaFin = FiltroHasta;
        filtro.productos = [yoAfiliado.CodigoProducto];
        filtro.numContrato = yoAfiliado.NumeroContrato;
        if ($('#gridautorizacioniesAf').data().kendoGrid) {
            $('#gridautorizacioniesAf').data().kendoGrid.destroy();
            $('#gridautorizacioniesAf').empty();
        }
        post$CorredoresAutorizacionController$ConsultaAutorizaciones(filtro, function (res) {
            var lst = res.Datos;
            respGeneral = lst;
            $('#gridautorizacioniesAf').show();
            $('#gridautorizacioniesAf').kendoGrid({
                dataSource: {
                    data: lst,
                    pageSize: 20
                },
                height: 450,
                scrollable: true,
                sortable: true,
                persistSelection: true,
                pageable: true,
                columns: [
                    { field: "CodigoProducto", title: "Código Cobertura", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Region", title: "Region", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "NombreEmpresa", title: "Razón Social/ Nombres Apellidos", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "ContratoNumero", title: "Contrato", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "NombreBeneficiario", title: "Paciente", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "NombreDiagnostico", title: "Diagnóstico", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "NombrePrestadorEmpresa", title: "Prestador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { command: { text: "Descargar", click: VerDetallesPr }, title: "Condiciones", width: "150px" }
                ]
            });
        }, function () { });
    });
    $('#btn_Buscar_Afiliado').click(function () {
        var productoList = new Array();
        //tomamos los productos
        var planes = UsuarioLogueado.PermisoPlan;
        if (planes != null && planes.length > 0) {
            var listPlanes = planes.split(';');
            for (var i = 0; i < listPlanes.length - 1; i++) {
                //llenamos los productos
                productoList.push(listPlanes[i].toUpperCase());
            }
        }
        //ahora recorro el listado de brokers
        var brokerList = new Array();
        if (esGrupo) {
            if (listasSeleccion == undefined || listasSeleccion.length == 0) {
                alert('Debe selecccionar al menos un broker');
                return false;
            }
            for (let item of listasSeleccion) {
                brokerList.push(item.Codigo);
            }
        }
        else {
            brokerList.push(UsuarioLogueado.IdCorredor);
        }
        var filtro = new ContratoEntityFilter();
        filtro.Brokers = brokerList;
        filtro.lstProductos = productoList;
        filtro.NumeroContrato = $('#inp_numero_contrato_busqueda').val();
        filtro.NombrePersona = $('#inp_nombre_busqueda').val();
        filtro.NumeroCedula = $('#inp_cedula_busqueda').val();
        filtro.SoloActivos = true;
        post$contrato$ConsultarContratosPorFiltroAfiliadoGeneral(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            if ($('#gridBusqueda').data().kendoGrid) {
                $('#gridBusqueda').data().kendoGrid.destroy();
                $('#gridBusqueda').empty();
            }
            $('#gridBusqueda').show();
            listAfiliadosGlobal = result.Datos;
            if (listAfiliadosGlobal.length == 0) {
                return alert('No se encontro el contraro o la persona asignada al Broker, verifique los parametros de búsqueda e intentelo de nuevo');
            }
            var listaGeneral = new Array();
            for (let o of listAfiliadosGlobal) {
                if (o.FechaInicioDate != null || o.FechaInicioDate != undefined) {
                    var fechaIni = new Date(o.FechaInicioDate);
                    o.FechaInicio = fechaIni.getUTCDate() + '/' + (fechaIni.getUTCMonth() + 1) + '/' + fechaIni.getFullYear();
                }
                if (o.FechaFinDate != null || o.FechaFinDate != undefined) {
                    var fechaFin = new Date(o.FechaFinDate);
                    o.FechaFin = fechaFin.getUTCDate() + '/' + (fechaFin.getUTCMonth() + 1) + '/' + fechaFin.getFullYear();
                }
                listaGeneral.push(o);
            }
            $('#gridBusqueda').kendoGrid({
                dataSource: {
                    data: listaGeneral,
                    pageSize: 10,
                },
                height: 650,
                scrollable: true,
                sortable: true,
                groupable: false,
                persistSelection: true,
                pageable: true,
                detailTemplate: kendo.template($("#template").html()),
                detailInit: detailInit,
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row"));
                },
                columns: [
                    { field: "CodigoRegion", title: "Región", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "CodigoProducto", title: "Producto", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "NumeroContrato", title: "Contrato", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "CodigoPlan", title: "Código Plan", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "ContratoCodigoEstado", title: "Estado", template: kendo.template($('#EstadosTemplate').html()), width: "100px", filterable: { multi: true, search: true } },
                    { field: "FechaInicio", title: "Fecha Inicio", width: "100px", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", filterable: { multi: true, search: true } },
                    { field: "FechaFin", title: "Fecha Fin", width: "100px", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", filterable: { multi: true, search: true } },
                ]
            });
        }, function (error) {
        });
    });
    //cartas
    $('#btn_Buscar_Carta').click(function () {
        //buscamos y cargamos la grilla :D
        var contratoCarta = yoAfiliado.NumeroContrato;
        if ($('#gridCartas').data().kendoGrid) {
            $('#gridCartas').data().kendoGrid.destroy();
            $('#gridCartas').empty();
        }
        var filtro = new FilterQpra();
        filtro.Contrato_Numero = Number(contratoCarta);
        var beneficiarios = new Array();
        if ($("#OpcionesBusquedaBeneficiarioCarta").val() != '' && $("#OpcionesBusquedaBeneficiarioCarta").val() != null) {
            filtro.beneficiarios = [Number($("#OpcionesBusquedaBeneficiarioCarta").data("kendoDropDownList").value())];
        }
        post$Qpra$CorredoresObtenerContratoQpra(filtro, function (res) {
            var lst = res.Datos;
            respGeneral = lst;
            $('#gridCartas').show();
            $('#gridCartas').kendoGrid({
                dataSource: {
                    data: lst,
                    pageSize: 20
                },
                height: 450,
                scrollable: true,
                sortable: true,
                persistSelection: true,
                pageable: true,
                columns: [
                    { field: "Contrato_Numero", title: "Contrato_Numero", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Reclamante_Identificacion", title: "Reclamante_Identificacion", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Reclamante_Nombre", title: "Reclamante_Nombre", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { field: "Contrato_Region", title: "Contrato_Region", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    { command: { text: "Descargar", click: DescargarSoporteCarta }, title: "SELECCIONAR", width: "100px" }
                ]
            });
        }, function () { });
    });
    //seccion de busqueda por empresa    
    $('#btn_Buscar_Empresa').click(function () {
        var listEmpresas = new Array();
        //llamo al servicio para obetenerlos los datos de las empresas
        var productoList = new Array();
        //tomamos los productos
        var planes = UsuarioLogueado.PermisoPlan;
        if (planes != null && planes.length > 0) {
            var listPlanes = planes.split(';');
            for (var i = 0; i < listPlanes.length - 1; i++) {
                //llenamos los productos
                productoList.push(listPlanes[i].toUpperCase());
            }
        }
        //ahora recorro el listado de brokers
        var brokerList = new Array();
        if (esGrupo) {
            if (listasSeleccion == undefined || listasSeleccion.length == 0) {
                alert('Debe selecccionar al menos un broker');
                return false;
            }
            for (let item of listasSeleccion) {
                brokerList.push(item.Codigo);
            }
        }
        else {
            brokerList.push(UsuarioLogueado.IdCorredor);
        }
        var filtro = new ContratosIndividualesEmpresasPorAgenteFilter();
        filtro.Brokers = brokerList;
        filtro.lstProductos = productoList;
        filtro.NumeroEmpresa = $('#inp_empresa_busqueda').val();
        filtro.NumeroSucursal = $('#inp_lista_busqueda').val();
        filtro.RazonSocial = $('#inp_RazonSocial_busqueda').val();
        filtro.RUCEmpresa = $('#inp_ruc_busqueda').val();
        filtro.SoloActivos = true;
        post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            if ($('#gridBusqueda').data().kendoGrid) {
                $('#gridBusqueda').data().kendoGrid.destroy();
                $('#gridBusqueda').empty();
            }
            $('#gridBusqueda').show();
            listEmpresaGlobal = result.Datos;
            if (listEmpresaGlobal.length == 0) {
                return alert('No se encontro la Empresa o Lista asignada al Broker, verifique los parametros de búsqueda e intentelo de nuevo');
            }
            $('#gridBusqueda').kendoGrid({
                dataSource: {
                    data: listEmpresaGlobal,
                    pageSize: 10,
                },
                height: 650,
                scrollable: true,
                sortable: true,
                groupable: false,
                persistSelection: true,
                pageable: true,
                detailTemplate: kendo.template($("#templateEmpresa").html()),
                detailInit: detailInit,
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row"));
                },
                columns: [
                    { field: "Region", title: "Región", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    //{ field: "NumeroContratos", title: "Contrato", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    { field: "NumeroSucursal", title: "Número Lista", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    { field: "NombreSucursal", title: "Nombre Lista", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    //{ field: "AliasSucursal", title: "Alias Lista", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    //{ field: "Grupo", title: "Grupo", width: "100px", headerAttributes: { style: "white-space: normal" } },
                    { field: "PendientePago", title: "Pendiente Pago", width: "100px", headerAttributes: { style: "white-space: normal" }, template: '# if (PendientePago == false) {#NO#} else  {#SI#} #' },
                    { field: "Bloqueado", title: "Bloqueado", width: "110px", headerAttributes: { style: "white-space: normal" }, template: '# if (Bloqueado == false) {#NO#} else  {#SI#} #' }
                ]
            });
        }, function (error) {
        });
    });
    //boton de cambio de seccion a facturacion y reporte
    $('#buttonReportesMovimientos').click(function () {
        //ocultamos toda la seccion de facturacion empresas.
        $('#SeccionFacturacionEmpresas').show();
        $('#gridFormasPagosEmpresas').hide();
        $('#formaPagoEmpresa').hide(); //al inicio no muestro los detalles esto se motrara al seccionar una factura
        $('#seccionFormasDePagos').hide(); // al inicio oculto todos los detalles para que se vea solo la grilla
        $('#DetalleFacturacionAfiliado').hide();
        $('#seccionEmpresaReporteMovimiento').show();
        $('#pnl_ResultadoWeb').hide();
        $('#pnl_ResultadoReporteador').hide();
    });
    //muestro seccion de facturacion
    $('#buttonFacturasEmpresas').click(function () {
        $('#SeccionFacturacionEmpresas').show();
        $('#gridFormasPagosEmpresas').show();
        $('#formaPagoEmpresa').hide(); //al inicio no muestro los detalles esto se motrara al seccionar una factura
        $('#seccionFormasDePagos').hide(); // al inicio oculto todos los detalles para que se vea solo la grilla
        $('#DetalleFacturacionAfiliado').hide();
        $('#seccionEmpresaReporteMovimiento').hide();
    });
    //seccion de facturacion
    $('#btn_Buscar_Factura').click(function () {
        if ($('#gridFacturacion').data().kendoGrid) {
            $('#gridFacturacion').data().kendoGrid.destroy();
            $('#gridFacturacion').empty();
        }
        var numFact = $("#inp_numero_facturar").val();
        var FiltroDesde = $('#inp_desde_facturar').data('kendoDatePicker').value();
        var FiltroHasta = $('#inp_hasta_facturar').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        if (yoAfiliado.CodigoProducto != 'COR' && yoAfiliado.CodigoProducto != 'SMAR'
            && yoAfiliado.CodigoProducto != 'POOL') {
            get$facturacion$ConsultarFacturacionIndividualXCliente(IDNumeroContratoAfiliado, numFact, FiltroDesde, FiltroHasta, function (res) {
                var lstRes = res.Datos;
                var facturas = new Array();
                for (let f of lstRes) {
                    if (f.FechaInicio != null && f.FechaInicio != undefined) {
                        var fechaIni = new Date(f.FechaInicio);
                        f.FechaInicioAdap = fechaIni.getUTCDate() + '/' + (fechaIni.getUTCMonth() + 1) + '/' + fechaIni.getFullYear();
                    }
                    if (f.FechaFin != null && f.FechaFin != undefined) {
                        var fechaFin = new Date(f.FechaInicio);
                        f.FechaFinAdap = fechaFin.getUTCDate() + '/' + (fechaFin.getUTCMonth() + 1) + '/' + fechaFin.getFullYear();
                    }
                    if (f.FechaEmision != null && f.FechaEmision != undefined) {
                        f.MesEmision = formatDate(f.FechaEmision);
                    }
                }
                $('#gridFacturacion').show();
                $('#gridFacturacion').kendoGrid({
                    dataSource: {
                        data: lstRes,
                        pageSize: 10,
                    },
                    height: 500,
                    scrollable: true,
                    sortable: true,
                    groupable: false,
                    persistSelection: true,
                    filterable: true,
                    pageable: false,
                    columns: [
                        { field: "NumeroFactura", title: "Factura", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "MesEmision", title: "Mes", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "FechaInicioAdap", title: "Facturado Desde", width: "120px", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}" },
                        { field: "FechaFinAdap", title: "Facturado Hasta", width: "120px", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}" },
                        { field: "ValorTotal", title: "Valor Cuota", width: "110px", headerAttributes: { style: "white-space: normal" } },
                        { field: "Estado", title: "Estado", template: kendo.template($('#EstadosFacturacion').html()), width: "110px", headerAttributes: { style: "white-space: normal" } },
                        { command: { text: "RIDE", click: DescargarRIDEIndividuales }, title: "Descarga", width: "100px" },
                        { command: { text: "XML", click: DescargarXMLIndv }, title: "Descarga", width: "100px" },
                        { command: { text: "Detalle Cuota", click: VerCuota }, title: "Detalle", width: "100px" }
                    ]
                });
            }, function () { });
        }
        else {
            get$facturacion$ObtenerFacturasCorpElectronicasXEmpresaSucursalBrokerLQ(yoAfiliado.NumeroEmpresa, yoAfiliado.NumeroSucursal, numFact, function (res) {
                var lstFacturas = new Array();
                lstFacturas = res.Datos;
                for (let i in lstFacturas) {
                    lstFacturas[i].FechaMes = formatDate(lstFacturas[i].FechaEmision);
                }
                $("#gridFacturacion").show();
                $("#gridFacturacion").kendoGrid({
                    dataSource: {
                        data: lstFacturas,
                        schema: {
                            model: {
                                fields: {
                                    NumeroFactura: { type: "string" },
                                    SucursalNombre: { type: "string" },
                                    FechaEmision: { type: "Date" },
                                    ValorTotal: { type: "number" },
                                    Alias: { type: "string" },
                                    PeriodoFacturacion: { type: "string" }
                                }
                            }
                        },
                        pageSize: 10,
                        sort: { field: "FechaEmision", dir: "desc" }
                    },
                    height: 500,
                    resizable: true,
                    pageable: {
                        input: true,
                        numeric: false
                    },
                    columns: [
                        { field: "NombreEmpresa", title: "Empresa", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "NombreSucursal", title: "Sucursal", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "NumeroFactura", title: "No-Factura", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "PeriodoFacturacion", title: "Periodo de Facturación", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "FechaMes", title: "Mes Emisión", width: "120px", headerAttributes: { style: "white-space: normal" } },
                        { field: "ValorTotal", title: "Valor Total", width: "100px", headerAttributes: { style: "white-space: normal" } },
                        { field: "Estado", title: "Estado", template: kendo.template($('#EstadosFacturacionEmpresa').html()), width: "150px", filterable: { multi: true, search: true } },
                        { command: { text: "RIDE", click: DescargarRIDE }, title: "Descarga", width: "100px" },
                        { command: { text: "XML", click: DescargarXML }, title: "Descarga", width: "100px" },
                        { command: { text: "PDF", click: DescargarSoportes }, title: "Soporte", width: "100px" },
                        { command: { text: "EXCEL", click: DescargarSoportesExcel }, title: "Soporte", width: "100px" }
                    ]
                });
            }, function () { });
        }
    });
    ///seccion de reclamos
    $('#btn_Buscar_Reclamo').click(function () {
        var FiltroDesde = $('#inp_desde_reclamo').data('kendoDatePicker').value();
        var FiltroHasta = $('#inp_hasta_reclamo').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        //Filtros
        var filtroReclamos = new ReclamoFilter();
        filtroReclamos.FechaInicio = FiltroDesde;
        filtroReclamos.FechaFin = FiltroHasta;
        filtroReclamos.Contrato = IDNumeroContratoAfiliado;
        if ($('#inp_numero_liquidacion_reclamo').val() != '' && $('#inp_numero_liquidacion_reclamo') != undefined) {
            filtroReclamos.NumeroReclamo = $('#inp_numero_liquidacion_reclamo').val();
        }
        //filtramos el numero de reclamo si existiese
        if ($('#inp_numero_sobre_reclamo').val() != '' && $('#inp_numero_sobre_reclamo') != undefined) {
            filtroReclamos.NumeroSobre = $('#inp_numero_sobre_reclamo').val();
        }
        if ($("#OpcionesBusquedaBeneficiario").val() != '' && $("#OpcionesBusquedaBeneficiario").val() != null) {
            filtroReclamos.Beneficiario = [Number($("#OpcionesBusquedaBeneficiario").data("kendoDropDownList").value())];
        }
        post$liquidacion$ObtenerLiquidacionesIndividuales(filtroReclamos, function (res) {
            var Reclamo = res.Datos;
            if ($('#gridReclamos').data().kendoGrid) {
                $('#gridReclamos').data().kendoGrid.destroy();
                $('#gridReclamos').empty();
            }
            for (let o of Reclamo) {
                if (o.FechaAtencion != null && o.FechaAtencion != undefined) {
                    var fechaRequerimiento = new Date(o.FechaAtencion);
                    o.FechaAtencionDesc = fechaRequerimiento.getUTCDate() + '/' + (fechaRequerimiento.getUTCMonth() + 1) + '/' + fechaRequerimiento.getFullYear();
                }
            }
            $('#gridReclamos').show();
            $('#gridReclamos').kendoGrid({
                dataSource: {
                    data: Reclamo,
                    pageSize: 10,
                },
                height: 500,
                scrollable: true,
                sortable: true,
                groupable: false,
                persistSelection: true,
                filterable: true,
                pageable: false,
                columns: [
                    { field: "ReclamoAlcance", title: "Reclamo", width: "150px", headerAttributes: { style: "white-space: normal" } },
                    { field: "NombreBeneficiario", title: "Beneficiario", width: "200px", headerAttributes: { style: "white-space: normal" } },
                    { field: "NombreTipoReclamo", title: "Tipo", width: "150px", headerAttributes: { style: "white-space: normal" } },
                    { field: "Sobre", title: "Sobre", width: "150px", headerAttributes: { style: "white-space: normal" } },
                    { field: "Diagnostico", title: "Diagnostico", width: "250px", headerAttributes: { style: "white-space: normal" } },
                    { field: "EstadoDesc", title: "Estado", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { field: "FechaAtencionDesc", title: "Fecha Atención", width: "140px", headerAttributes: { style: "white-space: normal" } },
                    { field: "FormaPago", title: "Forma Pago", width: "150px", headerAttributes: { style: "white-space: normal" } },
                    { field: "MontoCubierto", title: "Monto Cubierto", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { field: "MontoNoCubierto", title: "Monto No Cubierto", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { field: "MontoDeducible", title: "Monto Deducible", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { field: "MontoCopago", title: "Monto Copago", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { field: "MontoBonificado", title: "Monto Bonificado", width: "110px", headerAttributes: { style: "white-space: normal" } },
                    { command: { text: "Descargar Liquidación", click: detalleEventoClick2 }, title: "Descargar", width: "250px" }
                    //{ field: "MontoPagado", title: "Monto Pagado", width: "110px", headerAttributes: { style: "white-space: normal" } }
                ]
            });
        }, function () { });
    });
    function detalleEventoClick2(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        //llenamos el objto
        var filtrador = new ReclamoEntityFilter();
        filtrador.NumeroReclamo = Number(dataItem.Reclamo);
        filtrador.NumeroAlcance = Number(dataItem.Alcance);
        filtrador.CodigoContrato = Number(dataItem.CodigoContrato);
        filtrador.TipoReclamo = dataItem.NombreTipoReclamo;
        //llamamos al generador de reporteria
        post$reclamos$generarPdf64(filtrador, function (result) {
            var byteCharacters = atob(result);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            // now that we have the byte array, construct the blob from it
            var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
            var fileName1 = "Reclamo1.pdf";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    }
    // seccion de cartas
    //seccion de pre-autorizaciones
    $('#btn_Buscar_autorizaciones').click(function () {
        var listaAutorizaciones = new Array();
        var autorizaciones = new PreAutorizacionesDummy();
        autorizaciones.id = 123;
        autorizaciones.codigoProducto = '123-456';
        autorizaciones.autorizaciones = '888-66-77';
        autorizaciones.fechaCreacion = new Date();
        autorizaciones.fechaHospitalizacion = new Date();
        autorizaciones.fechaAutorizacion = new Date();
        autorizaciones.fechaAnulacion = new Date();
        autorizaciones.estado = 'Autorizado';
        autorizaciones.cobertura = 'Total';
        listaAutorizaciones.push(autorizaciones);
        listaAutorizaciones.push(autorizaciones);
        if ($('#gridAutorizaciones').data().kendoGrid) {
            $('#gridAutorizaciones').data().kendoGrid.destroy();
            $('#gridAutorizaciones').empty();
        }
        $('#gridAutorizaciones').show();
        $('#gridAutorizaciones').kendoGrid({
            dataSource: {
                data: listaAutorizaciones,
                pageSize: 10,
            },
            height: 500,
            scrollable: true,
            sortable: true,
            groupable: false,
            persistSelection: true,
            filterable: true,
            pageable: false,
            columns: [
                { command: { text: "Descargar", click: VerFactura }, title: "Descargar", width: "150px" },
                { field: "codigoProducto", title: "Código Producto", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "autorizaciones", title: "Autorización", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "fechaCreacion", title: "Fecha Creación", format: "{0:dd-MM-yyyy}", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "fechaHospitalizacion", title: "Fecha Hospitalización", format: "{0:dd-MM-yyyy}", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "fechaAutorizacion", title: "Fecha Autorización", format: "{0:dd-MM-yyyy}", width: "150px", filterable: { multi: true, search: true } },
                { field: "fechaAnulacion", title: "Fecha Anulación", format: "{0:dd-MM-yyyy}", width: "110px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "estado", title: "Estado", width: "110px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "cobertura", title: "Cobertura", width: "110px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
            ]
        });
    });
    //tooltip para los estados de la grilla Reclamo
    $("#gridReclamos").kendoTooltip({
        filter: "td:nth-child(6)",
        position: "right",
        content: function (e) {
            var dataItem = $("#gridReclamos").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = '';
            //var content = dataItem.Text;
            if (dataItem.EstadoDesc === 'Pagado') {
                content = 'El estado del reclamo es:<br/><b>PAGADO:</b>todos sus valores estan pagados.';
            }
            else {
                content = 'El estado del reclamo es:<br/><b>Pendiente:</b>todos sus valores estan Pendientes.';
            }
            //if (dataItem.EstadoDesc === '5') {
            //    content = 'El archivo ha sido  cargado exitosamente. Por favor proceder con la aprobación directamente. ';
            //}
            return content;
        }
    }).data("kendoTooltip");
    //tooltip para los estados de la grilla Reclamo
    $("#gridFacturacion").kendoTooltip({
        filter: "td:nth-child(6)",
        position: "right",
        content: function (e) {
            var dataItem = $("#gridFacturacion").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = '';
            //var content = dataItem.Text;
            if (dataItem.Estado == 26) {
                content = 'El estado de la factura es:<br/><b>COBRADO:</b>todos sus valores estan cobrados.';
            }
            if (dataItem.Estado == 29) {
                content = 'El estado de la factura es:<br/><b>MORA:</b>La factura se encuentra en mora.';
            }
            if (dataItem.Estado === '2') {
                content = 'El estado de la factura es:<br/><b>IMPRESA:</b>.';
            }
            return content;
        }
    }).data("kendoTooltip");
    //tooltip para los estados de la grilla Reclamo
    $("#gridFormasPagosEmpresas").kendoTooltip({
        filter: "td:nth-child(7)",
        position: "right",
        content: function (e) {
            var dataItem = $("#gridFormasPagosEmpresas").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = '';
            //var content = dataItem.Text;
            if (dataItem.Estado === 'Cobrado') {
                content = 'El estado de la factura es:<br/><b>COBRADO:</b>todos sus valores estan cobrados.';
            }
            if (dataItem.Estado === '1') {
                content = 'Para continuar con el proceso da click en<br/>“Detalles” que te indicará los pasos a seguir. ';
            }
            if (dataItem.Estado === '2') {
                content = 'En este momento está migrando la información<br/>al sistema central de Saludsa. ';
            }
            if (dataItem.Estado === '3') {
                content = 'Carga exitosa del archivo se registraron<br/>los colaboradores aprobados en nuestro sistema,<br/>a partir de esta fecha las modificaciones<br/>se podrán realizar en la opción movimientos. ';
            }
            if (dataItem.Estado === '4') {
                content = 'Existio un error en la cargar del archivo, por favor revise el detalle. ';
            }
            if (dataItem.Estado === '5') {
                content = 'El archivo ha sido  cargado exitosamente. Por favor proceder con la aprobación directamente. ';
            }
            return content;
        }
    }).data("kendoTooltip");
    //FUNCIONES
    //funciones seleccionar Plan Independiente
    function seleccionarPlanInd(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var PlanInd = dataItem;
        //deberia conectarme al servicio de busqueda de contrato afiliado
        var filtro = new ContratoEntityFilter();
        filtro.Brokers = [PlanInd.CodigoAgenteVenta];
        filtro.lstProductos = [PlanInd.CodigoProducto.toUpperCase()];
        filtro.NumeroContrato = PlanInd.NumeroContrato;
        filtro.SoloActivos = true;
        post$contrato$ConsultarContratosPorFiltroAfiliadoGeneral(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            listAfiliadosGlobal = result.Datos;
            VerDetalleAfiliado(PlanInd.CodigoContrato);
        }, function () { });
    }
    //funciones seleccionar Plan Empresa
    function seleccionarPlanEmp(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var EmpresaFilter = dataItem;
        //llamar al servicio web
        var filtro = new ContratosIndividualesEmpresasPorAgenteFilter();
        filtro.Brokers = [EmpresaFilter.CodigoAgenteVenta];
        filtro.lstProductos = [EmpresaFilter.CodigoProducto.toUpperCase()];
        filtro.NumeroEmpresa = '' + EmpresaFilter.NumeroEmpresa;
        filtro.NumeroSucursal = '' + EmpresaFilter.NumeroSucursal;
        filtro.SoloActivos = true;
        post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            listEmpresaGlobal = result.Datos;
            VerDetalleAfiliadoEmpresa(EmpresaFilter.NumeroSucursal);
        }, function (error) {
        });
    }
    //funcion detalle
    function detailInit(e) {
        var detailRow = e.detailRow;
    }
    //funcion que muestra el detalle de la factura
    function VerDetalleFactura(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var facturaSeleccionada = dataItem;
        console.log(facturaSeleccionada);
        $('#seccionFormasDePagos').show();
        $('#formaPagoEmpresa').show();
        $('#formaPagoIndependiente').hide();
        $('#lblfacturarRucEmpresa').text('1719103820');
        $('#lblfacturarNombreEmpresa').text('Smartw0rk S.A');
        $('#lblfacturarBancoEmpresa').text('Produbanco');
        $('#lblfacturarTipoCuentaEmpresa').text('Ahorros');
        $('#lblfacturarNumeroCuentaDebitoEmpresa').text('123-434-65656565');
        $('#lblfacturarFormaPagoEmpresa').text('Debito');
        $('#lblfacturarPeriodoPago').text('Julio');
    }
    //funcion ver detalle de los item seleccionados de la empresa
    funcionDetalleEmpresa = VerDetalleAfiliadoEmpresa;
    function VerDetalleAfiliadoEmpresa(id) {
        $('#txtPestaniaUno').text('Información Empresa');
        $('#txtPestaniaDos').text('Detalle de Facturación');
        $('#txtPestaniaTres').text('Gastos Médicos');
        $('#txtPestaniaCuatro').text('Siniestralidad');
        $('#seccionPlanContratadoLista').hide();
        tabstrip.select(0);
        //busco por id  en la lista que cargue inicialmente
        var yoEmpresa = listEmpresaGlobal.filter(x => x.NumeroSucursal == id);
        //llamada al servicio
        var filtro = new ContratosIndividualesEmpresasPorAgenteFilter();
        filtro.Brokers = [yoEmpresa[0].CodigoAgenteVenta];
        filtro.lstProductos = [yoEmpresa[0].CodigoProducto.toUpperCase()];
        filtro.NumeroEmpresa = '' + yoEmpresa[0].NumeroEmpresa;
        filtro.NumeroSucursal = '' + yoEmpresa[0].NumeroSucursal;
        filtro.SoloActivos = true;
        post$contrato$ConsultarEmpresasPorAgente(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            var listaEmp = result.Datos;
            yoEmpresa[0] = listaEmp[0];
            EmpresaSeleccionada = yoEmpresa[0];
            IDEmpresa = yoEmpresa[0].NumeroEmpresa;
            IDSucursal = yoEmpresa[0].NumeroSucursal;
            IDProducto = yoEmpresa[0].CodigoProducto;
            var pendienteP = new ConsultaFacturacionFilter();
            pendienteP.NumSucursal = yoEmpresa[0].NumeroSucursal;
            pendienteP.region = yoEmpresa[0].Region;
            //llamo al servico para consultar el estado
            post$facturacion$ConsultarFacturacionPendienteEmpresa(pendienteP, function (result) {
                if (result == undefined || result == null) {
                    $('#lblPendientePagoEmpresa').text('No');
                    return;
                }
                if (result.Datos == true) {
                    $('#lblPendientePagoEmpresa').text('Si');
                }
                else {
                    $('#lblPendientePagoEmpresa').text('No');
                }
            }, function (error) {
            });
            //textos ventanas internas
            if (yoEmpresa[0].AliasSucursal == '--Alias no Registrado--') {
                $('#lblMovimientosLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].NombreSucursal);
                $('#lblLiquidacionLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].NombreSucursal);
                $('#lblCopagosLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].NombreSucursal);
            }
            else {
                $('#lblMovimientosLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].AliasSucursal);
                $('#lblLiquidacionLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].AliasSucursal);
                $('#lblCopagosLista').text(yoEmpresa[0].RazonSocial + ' - ' + yoEmpresa[0].AliasSucursal);
            }
            $('#gridBusqueda').hide();
            $('#BusquedaEspecifica').hide();
            $('#criterioBusqueda').hide();
            $('#seccionBeneficiarios').hide();
            $('#informacionTitular').hide();
            $('#seccionDetallesSeleccionados').show();
            $('#informacionEmpresa').show();
            //damos valores a los textos 
            $('#lblEmpresaEmpresa').text(yoEmpresa[0].RazonSocial); //nombre empresa
            $('#lblFechaInicioVigenciaEmpresa').text(getFormattedDate(yoEmpresa[0].FechaInicioSucursalDate)); //Fecha Inicio Vigencia
            $('#lblFechaFinVigenciaEmpresa').text(getFormattedDate(yoEmpresa[0].FechaFinSucursalDate)); //Fecha Fin Vigencia
            $('#lblRucEmpresa').text(yoEmpresa[0].RUCEmpresa);
            $('#lblProductoEmpresa').text(yoEmpresa[0].CodigoProducto);
            $('#lblAsignacionCorredorEmpresa').text(''); //pendiente
            $('#lblRazonSocialEmpresa').text(yoEmpresa[0].RazonSocial);
            $('#lblNumeroNumeroSucursal').text(yoEmpresa[0].NumeroSucursal);
            $('#lblNombreNombreSucursal').text(yoEmpresa[0].NombreSucursal);
            $('#lblNombreAliasSucursal').text(yoEmpresa[0].AliasSucursal);
            //la antiguedad se halla de la fecha de inicio vigencia a fecha actual
            var fechaVigencia = new Date(yoEmpresa[0].FechaInicioSucursalDate);
            var Antiguedad = calcularFechas(fechaVigencia.getFullYear() + '-' + (fechaVigencia.getUTCMonth() + 1) + '-' + fechaVigencia.getUTCDate());
            $('#lblAntiguedadEmpresa').text(Antiguedad); //revisar
            $('#lblFechaInicioEmpresa').text(''); //pendiente
            $('#lblRegionEmpresa').text(yoEmpresa[0].Region);
            $('#lblEjecutivoCuentaEmpresa').text(yoEmpresa[0].EjecutivoVenta); //
            $('#lblFechaFinEmpresa').text(''); //pendiente
            $('#lblNumeroAfiliadosEmpresa').text(yoEmpresa[0].NumeroAfiliados);
            $('#lblNumeroBeneficiariosEmpresa').text(yoEmpresa[0].NumeroBeneficiarios);
            $('#lblTotalUsuariosEmpresa').text(yoEmpresa[0].TotalUsuarios);
            $('#lblNumeroNumeroEmpresa').text(yoEmpresa[0].NumeroEmpresa);
            $('#lblEstadoEmpresa').text(yoEmpresa[0].EstadoSucursal == 1 ? 'Activo' : 'Inactivo');
        }, function (error) {
        });
    }
    //function ver detalle del item selecccionado
    funcionDetalle = VerDetalleAfiliado;
    function VerDetalleAfiliado(id) {
        //Activamos la primera pestaña
        //colocamos el nombre a las pestañas de afiliado
        $("#rb_ReportesAfiliados").kendoButtonGroup({
            index: 0
        });
        $('#txtPestaniaUno').text('Información Contrato');
        $('#txtPestaniaDos').text('Detalle Cuotas');
        $('#txtPestaniaTres').text('Reclamos Clientes');
        $('#txtPestaniaCuatro').text('Siniestralidad');
        $('#seccionPlanContratadoLista').hide();
        tabstrip.select(0);
        //busco por id  en la lista que cargue inicialmente
        yoAfiliado = listAfiliadosGlobal.filter(x => x.CodigoContrato == id)[0];
        var filtro = new ContratoEntityFilter();
        filtro.Brokers = [yoAfiliado.CodigoAgenteVenta];
        filtro.lstProductos = [yoAfiliado.CodigoProducto.toUpperCase()];
        filtro.NumeroContrato = yoAfiliado.NumeroContrato;
        filtro.SoloActivos = true;
        post$contrato$ConsultarContratosPorFiltro(filtro, function (result) {
            if (result == undefined) {
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            }
            var listaAfiliado = result.Datos;
            yoAfiliado = listaAfiliado[0];
            IDNumeroContratoAfiliado = yoAfiliado.NumeroContrato;
            //verifico si esta pagado o pendiente
            var pendienteP = new ConsultaFacturacionFilter();
            pendienteP.NumContrato = yoAfiliado.NumeroContrato;
            pendienteP.region = yoAfiliado.CodigoRegion;
            pendienteP.lstProductos = [yoAfiliado.CodigoProducto];
            post$facturacion$ConsultarFacturacionPendienteAfiliado(pendienteP, function (result) {
                if (result == undefined || result == null) {
                    $('#lblPendientePago').text('No');
                    return;
                }
                if (result.Datos == true) {
                    $('#lblPendientePago').text('Si');
                }
                else {
                    $('#lblPendientePago').text('No');
                }
            }, function (error) {
            });
            $('#gridBusqueda').hide();
            $('#BusquedaEspecifica').hide();
            $('#criterioBusqueda').hide();
            $('#informacionTitular').show();
            $('#informacionEmpresa').hide();
            $('#SeccionFacturacionEmpresas').hide();
            $('#seccionDetallesSeleccionados').show();
            //comenzamos a llenar los labels
            $('#lblEstadoContrato').text(yoAfiliado.EstadoContrato);
            $('#lblRegion').text(yoAfiliado.CodigoRegion);
            $('#lblFinVigencia').text(getFormattedDate(yoAfiliado.FechaFinDate));
            $('#lblPlan').text(yoAfiliado.CodigoPlan);
            $('#lblInicioVigencia').text(getFormattedDate(yoAfiliado.FechaInicioDate));
            $('#lblAsignacionCorredor').text('');
            $('#lblProducto').text(yoAfiliado.CodigoProducto);
            $('#lblNumContrato').text(yoAfiliado.NumeroContrato);
            $('#lblTitularConBeneficios').text(yoAfiliado.TitularBeneficios == true ? 'Si' : 'No');
            $('#lblFechaDesde').text(''); //Fecha desde Asignacion de Corredor
            $('#lblAntiguedad').text(yoAfiliado.AntiguedadDesc);
            $('#lblEjecutivoCuenta').text(yoAfiliado.EjecutivoCuenta);
            $('#lblFechaHasta').text('');
            $('#lblCedula').text(yoAfiliado.Cedula);
            if (yoAfiliado.EdadDesc === undefined || yoAfiliado.EdadDesc === null) {
                $('#lblEdad').text('');
            }
            else {
                $('#lblEdad').text(yoAfiliado.EdadDesc);
            }
            $('#lblFechaNacimiento').text(yoAfiliado.FechaNacimientoDesc);
            $('#lblEstadoCivil').text(yoAfiliado.EstadoCivil);
            $('#seccionBeneficiarios').hide();
            $('#gridBeneficiarios').hide();
            //Depende del tipo de busqueda que se haga para que se carge la grilla
            //Beneficiario solo se presenta en IND/EXP porque no se cuenta con datos para los otros productos
            if (tipoProceso === 'Independiente' || tipoProceso === 'Afiliado' || tipoProceso === 'Experience' || tipoProceso === 'Oncocare') {
                //Verificamos si el afiliado tiene beneficiario
                //aqui se deberia llamar al servicio
                var numeroBeneficiario = 0;
                get$contrato$ObtenerBeneficiariosIndividuales(yoAfiliado.NumeroContrato, function (res) {
                    var numeroBeneficiario = res.Datos;
                    if (numeroBeneficiario.length > 0) {
                        $('#gridBeneficiarios').show();
                        $('#seccionBeneficiarios').show();
                        if ($('#gridBeneficiarios').data().kendoGrid) {
                            $('#gridBeneficiarios').data().kendoGrid.destroy();
                            $('#gridBeneficiarios').empty();
                        }
                        var beneficiarioCompleto = new Array();
                        for (let o of numeroBeneficiario) {
                            if (o.FechaInclusion != null && o.FechaInclusion != undefined) {
                                var fechaIn = new Date(o.FechaInclusion);
                                o.FechaIncl = fechaIn.getUTCDate() + '/' + (fechaIn.getUTCMonth() + 1) + '/' + fechaIn.getFullYear();
                            }
                            if (o.FechaExclusion != null && o.FechaExclusion != undefined) {
                                var fechaExcl = new Date(o.FechaExclusion);
                                o.FechaExcl = fechaExcl.getUTCDate() + '/' + (fechaExcl.getUTCMonth() + 1) + '/' + fechaExcl.getFullYear();
                            }
                        }
                        BeneficiariosIndividuales = numeroBeneficiario;
                        //tabla de beneficiarios
                        $('#gridBeneficiarios').kendoGrid({
                            dataSource: {
                                data: numeroBeneficiario,
                                pageSize: 10,
                            },
                            height: 400,
                            scrollable: true,
                            sortable: true,
                            groupable: false,
                            persistSelection: true,
                            filterable: true,
                            pageable: true,
                            columns: [
                                { field: "NombreBeneficiario", title: "Nombres", width: "200px", headerAttributes: { style: "white-space: normal" } },
                                { field: "RelacionDesc", title: "Relación", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "EstadoDesc", title: "Estado", width: "100px", headerAttributes: { style: "white-space: normal" } },
                                { field: "FechaIncl", title: "Fecha Inclusión", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "FechaExcl", title: "Fecha Exclusión", width: "150px", headerAttributes: { style: "white-space: normal" } },
                                { field: "PrecioBeneficiario", title: "Precio Beneficiario", width: "100px", headerAttributes: { style: "white-space: normal" } },
                                { field: "PrecioServicios", title: "Precio Servicios Adicionales", width: "100px", headerAttributes: { style: "white-space: normal" } },
                                { field: "Plan", title: "Plan", width: "150px", headerAttributes: { style: "white-space: normal" } }
                                //{ command: { text: "Continuar", click: VerDetalleAfiliado }, title: "SELECCIONAR", width: "100px" }
                            ]
                        });
                    }
                    else {
                        BeneficiariosIndividuales = new Array();
                    }
                }, function () { });
                //mostramos la grilla
            }
        }, function (error) {
        });
    }
    //fuction Reinciar{
    function Reiniciar() {
        $('#seccionPlanContratadoLista').hide();
        $('#criterioBusqueda').show();
        $('#VerPlanOpciones').hide();
        $('#OpcionesBusqueda').data('kendoDropDownList').value(null);
        $('#PlanContratadoOpc').data('kendoDropDownList').value(null);
        $("#rb_formatoProducto").kendoButtonGroup({
            index: 0
        });
        $('#BusquedaEspecifica').hide();
        $('#regresarOpc').hide();
        //seccion de busquedas especificas
        $('#seccionBusquedaAfiliado').hide();
        $('#seccionBusquedaEmpresa').hide();
        $('#seccionDetallesSeleccionados').hide();
        if ($('#gridBusqueda').data().kendoGrid) {
            $('#gridBusqueda').data().kendoGrid.destroy();
            $('#gridBusqueda').empty();
        }
        $('#seccionBeneficiarios').hide();
        if ($('#gridBeneficiarios').data().kendoGrid) {
            $('#gridBeneficiarios').data().kendoGrid.destroy();
            $('#gridBeneficiarios').empty();
        }
        $('#seccionBeneficiarios').hide();
        $('#formaPagoIndependiente').hide();
        $('#formaPagoEmpresa').hide();
        $('#BusquedaformaPagoIndependiente').hide();
        $('#BusquedaformaPagoEmpresa').hide();
        $('#gridFacturacion').hide();
        $('#gridBusqueda').hide();
        $('#informacionTitular').hide();
        $('#informacionEmpresa').hide();
        $('#SeccionFacturacionEmpresas').hide();
        $('#seccionFormasDePagos').hide();
        $('#DetalleFacturacionAfiliado').hide();
        $('#seccionRAfiliado').hide();
        $('#seccionREmpresa').hide();
        $('#siniestralidadAfiliados').hide();
        $('#siniestralidadEmpresas').hide();
        $('#seccionPlanContratadoLista').hide();
    }
    //Seccion reporte de movimientos
    $('#btn_AceptarFiltro').click(function () {
        LlenarFiltro();
        //fin proceso
        $("#ventana_SelectLista").data('kendoWindow').close();
    });
    $('#btn_AceptarFiltroMovimientosEmpresas').click(function () {
        GenerarReporte();
    });
    function LlenarFiltro() {
        $("#lbl_SelectListas").val(">>" + $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.IDSucursal === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
    }
    //Reporte de Movimientos
    $('#btn_GenerarReporte').click(function () {
        GenerarReporte();
    });
    //Reporte de Liquidaciones
    $('#btn_GenerarReporteLiquidacion').click(function () {
        GenerarReporteLiquidacion();
    });
    //Seccion reporte Liquidaciones    
    $('#btn_AceptarFiltroLiquidacion').click(function () {
        $("#lbl_SelectListasLiquidacion").val(">>" + $("#grid_SelectListaLiquidacion").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_SelectListaLiquidacion").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.IDSucursal === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
        //fin proceso
        $("#ventana_SelectListaLiquidacion").data('kendoWindow').close();
    });
    //Reporte Copagos
    $('#btn_GenerarReporteCopagos').click(function () {
        GenerarReporteCopago();
    });
    $('#btn_AceptarFiltroCopagos').click(function () {
        $("#lbl_SelectListasCopagos").val(">>" + $("#grid_SelectListaCopago").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_SelectListaCopago").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.IDSucursal === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
        //fin proceso
        $("#ventana_SelectListaCopago").data('kendoWindow').close();
    });
    //Reporte Pre-AutorizacionesR
    $('#btn_GenerarReporteAutorizacionesR').click(function () {
        GenerarReporteAutorizacionesR();
    });
    $('#btn_AceptarFiltroAutorizacionesR').click(function () {
        $("#lbl_SelectListasAutorizacionesR").val(">>" + $("#grid_SelectListaAutorizacionesR").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_SelectListaAutorizacionesR").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.IDSucursal === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
        //fin proceso
        $("#ventana_SelectListaAutorizacionesR").data('kendoWindow').close();
    });
    //Reportes de Siniestralidad    
    $('#btn_AceptarFiltroSiniestralidad').click(function () {
        //proceso de seleccion de listas
        var sl = $("#grid_SelectListaSiniestralidad").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.IDSucursal === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }
        //fin proceso
        $("#ventana_SelectListaSiniestralidad").data('kendoWindow').close();
    });
    function limpiarReclamosAfiliado() {
        if ($('#gridReclamos').data().kendoGrid) {
            $('#gridReclamos').data().kendoGrid.destroy();
            $('#gridReclamos').empty();
        }
        $('#gridReclamos').hide();
        $('#inp_desde_reclamo').data("kendoDatePicker").value(null);
        $('#inp_hasta_reclamo').data("kendoDatePicker").value(null);
        $('#inp_numero_liquidacion_reclamo').val('');
        $('#inp_numero_sobre_reclamo').val('');
    }
    function limpiarAutorizacinesAfiliado() {
        if ($('#gridautorizacioniesAf').data().kendoGrid) {
            $('#gridautorizacioniesAf').data().kendoGrid.destroy();
            $('#gridautorizacioniesAf').empty();
        }
        $('#gridautorizacioniesAf').hide();
        $('#inp_desde_autorizacioniesAf').data("kendoDatePicker").value(null);
        $('#inp_hasta_autorizacioniesAf').data("kendoDatePicker").value(null);
        $('#inp_cod_cobertura_autorizacioniesAf').val('');
    }
    function limpiarCartas() {
        if ($('#gridReclamos').data().kendoGrid) {
            $('#gridReclamos').data().kendoGrid.destroy();
            $('#gridReclamos').empty();
        }
        $('#gridReclamos').hide();
        if ($('#gridCartas').data().kendoGrid) {
            $('#gridCartas').data().kendoGrid.destroy();
            $('#gridCartas').empty();
        }
        $('#gridCartas').hide();
    }
    //limpiar reportes
    function limpiarBusquedaReportes() {
        //destruyo las grillas
        if ($('#grid_ResultadoLiquidacion').data().kendoGrid) {
            $('#grid_ResultadoLiquidacion').data().kendoGrid.destroy();
            $('#grid_ResultadoLiquidacion').empty();
        }
        if ($('#grid_ResultadoCopagos').data().kendoGrid) {
            $('#grid_ResultadoCopagos').data().kendoGrid.destroy();
            $('#grid_ResultadoCopagos').empty();
        }
        if ($('#grid_ResultadoAutorizacionesR').data().kendoGrid) {
            $('#grid_ResultadoAutorizacionesR').data().kendoGrid.destroy();
            $('#grid_ResultadoAutorizacionesR').empty();
        }
        //ocultamos resultados
        $('#grid_ResultadoLiquidacion').hide();
        $('#pnl_ResultadoReporteadorLiquidacion').hide();
        $('#grid_ResultadoCopagos').hide();
        $('#pnl_ResultadoReporteadorCopagos').hide();
        $('#grid_ResultadoAutorizacionesR').hide();
        $('#pnl_ResultadoReporteadorAutorizacionesR').hide();
        //limpiamos controles de busqueda
        $('#dt_DesdeLiquidacion').data("kendoDatePicker").value(null);
        $('#dt_HastaLiquidacion').data("kendoDatePicker").value(null);
        $('#txt_IdentificacionLiquidacion').val('');
        $('#dt_DesdeCopagos').data("kendoDatePicker").value(null);
        $('#dt_HastaCopagos').data("kendoDatePicker").value(null);
        $('#txt_IdentificacionCopagos').val('');
        $('#dt_DesdeAutorizacionesR').data("kendoDatePicker").value(null);
        $('#dt_HastaAutorizacionesR').data("kendoDatePicker").value(null);
        $('#txt_IdentificacionAutorizacionesR').val('');
        //textos de seleccion
        $('#lbl_SelectListasCopagos').text('');
        $('#lbl_SelectListas').text('');
        $('#lbl_SelectListasAutorizacionesR').text('');
    }
    //Reporte de Movimientos
    function GenerarReporte() {
        var FiltroDesde = $('#dt_Desde').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_Hasta').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        // Obtiene las listas seleccionadas para llenar el objeto que se irá al servicio
        var empresas = new Array();
        var listas = new Array();
        var productos = new Array();
        //datos de empresa
        empresas.push('' + IDEmpresa); //subo la empresa
        listas.push('' + IDSucursal); //subo la sucursal
        productos.push(IDProducto); //subo el cod de producto
        var uniqueItems = Array.from(new Set(productos));
        var TipoReporte = $("#rb_formato").data('kendoButtonGroup').current().index();
        // 0 = pantalla, 1 = exportable
        // estados
        var estados = new Array();
        var estadoFacturas = Number($("#opcionesTipoMovimiento").val());
        if (estadoFacturas === 0) {
            estados.push('2');
            estados.push('3');
            estados.push('1');
            estados.push('10');
            estados.push('8');
        }
        else {
            estados.push('' + estadoFacturas);
        }
        if (TipoReporte == 0) {
            // Muestro el panel de la grilla
            $('#pnl_ResultadoWeb').show();
            $('#pnl_ResultadoReporteador').hide();
            if ($('#grid_Resultado').data().kendoGrid) {
                $('#grid_Resultado').data().kendoGrid.destroy();
                $('#grid_Resultado').empty();
            }
            get$contrato$ObtenerMovimientosBeneficiariosEmpresas(empresas, listas, uniqueItems, FiltroDesde, FiltroHasta, estados, function (res) {
                var lst = res.Datos;
                respGeneral = lst;
                // Cargo la grilla con los datos.
                $("#grid_Resultado").kendoGrid({
                    dataSource: {
                        data: lst,
                        pageSize: 10,
                        group: [{ field: "EmpresaNumero" }, { field: "NumeroSucursal" }],
                        sort: { field: "FechaIncurrencia", dir: "desc" }
                    },
                    height: 400,
                    scrollable: {
                        virtual: true
                    },
                    sortable: true,
                    filterable: true,
                    pageable: {
                        input: true,
                        numeric: false
                    },
                    columns: [
                        { field: "EmpresaNumero", title: "Número de Empresa", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NumeroSucursal", title: "Número de Lista", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "FechaMovimiento", title: "Fecha Movimiento", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "FechaEfectoMovimiento", title: "Fecha Efecto", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "Movimiento", title: "Tipo de Movimiento", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Digitador", title: "Digitador", width: "250px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "RazonSocial", title: "Nombre Empresa", width: "250px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "SucursalNombre", title: "Nombre de la lista", width: "250px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ContratoNumero", title: "Código Colaborador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Persona", title: "Colaborador", width: "250px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ServicioAnterior", title: "Tipo Tarifa/ Lista Anterior", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ServicioActual", title: "Tipo Tarifa/ Lista Actual", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                    ]
                });
                $("#grid_Resultado").kendoTooltip({
                    filter: "td:nth-child(6)",
                    position: "right",
                    content: function (e) {
                        var dataItem = $("#grid_Resultado").data("kendoGrid").dataItem(e.target.closest("tr"));
                        var content = 'Fecha Efecto Corresponde a la fecha cuando <br/>se hace efectiva el movimiento, a partir<br/> de esta fecha se modifica el estado<br/> del usuario.';
                        return content;
                    }
                }).data("kendoTooltip");
            }, function () { });
        }
        // si es por medio del reporteador, se pasa los parámetros para que el reporteador corra la consulta y renderice el reporte
        if (TipoReporte == 1) {
            // muestro el panel del reporteador
            $('#pnl_ResultadoWeb').hide();
            $('#pnl_ResultadoReporteador').show();
            // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
            var pars = new ParametrosReporte();
            pars.NombreReporte = "ReporteMovimientos";
            pars.Estados = ""; // este reporte no tiene filtro por estados
            pars.FechaInicio = $('#dt_Desde').data('kendoDatePicker').value();
            pars.FechaFin = $('#dt_Hasta').data('kendoDatePicker').value();
            var serializado = JSON.stringify(pars);
            var codificado = btoa(serializado);
            get$contrato$ObtenerMovimientosBeneficiariosEmpresas(empresas, listas, uniqueItems, FiltroDesde, FiltroHasta, estados, function (res) {
                var lst = res.Datos;
                respGeneral = lst;
                // cargo la ruta en el reporteador
                $('#iframeReporteador').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoMovimiento = false;
            }, function () { });
        }
    }
    //Reporte de Liquidaciones
    function GenerarReporteLiquidacion() {
        var FiltroDesde = $('#dt_DesdeLiquidacion').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_HastaLiquidacion').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        // Obtiene las listas seleccionadas para llenar el objeto que se irá al servicio
        var empresas = new Array();
        var listas = new Array();
        var listasElejidas = new Array();
        empresas.push('' + IDEmpresa);
        listas.push('' + IDSucursal);
        var TipoReporte = $("#rb_formato2").data('kendoButtonGroup').current().index();
        // 0 = pantalla, 1 = exportable
        // ruteo del resultado del reporte según el tipo
        // si es por medio de pantalla, corre la consulta
        if (TipoReporte == 0) {
            $('#grid_ResultadoLiquidacion').show();
            if ($('#grid_ResultadoLiquidacion').data().kendoGrid) {
                $('#grid_ResultadoLiquidacion').data().kendoGrid.destroy();
                $('#grid_ResultadoLiquidacion').empty();
            }
            get$Liquidacion$ObtenerReclamosGrupoEmpresaListaBeneficiario(empresas, listas, FiltroDesde, FiltroHasta, $('#txt_IdentificacionLiquidacion').val(), function (res) {
                $('#pnl_ResultadoWebLiquidacion').show();
                $('#pnl_ResultadoReporteadorLiquidacion').hide();
                var lst = res.Datos;
                //PROCESO LOS RESULTADOS PARA OBTENER EL SEXO Y LA EDAD
                var finallst = new Array();
                for (let r of lst) {
                    var object = new ReclamoEmpresaLista();
                    object = r;
                    if (object.Sexo === "1")
                        object.sexoP = 'Maculino';
                    else
                        object.sexoP = 'Femenino';
                    //calculo la edad
                    if (object.FechaNacimiento === undefined || object.FechaNacimiento === null) {
                        object.edad = 0;
                    }
                    else {
                        object.edad = calcularEdad(object.FechaNacimiento.replace('T00:00:00', ''));
                    }
                    //fechas
                    if (object.FechaIncurrencia !== null) {
                        var fechaIncurrencia = new Date(object.FechaIncurrencia);
                        object.FechaIncurrencia = fechaIncurrencia.getUTCDate() + '/' + (fechaIncurrencia.getUTCMonth() + 1) + '/' + fechaIncurrencia.getFullYear();
                    }
                    if (object.FechaPago !== null) {
                        var fechaPago = new Date(object.FechaPago);
                        object.FechaPago = fechaPago.getUTCDate() + '/' + (fechaPago.getUTCMonth() + 1) + '/' + fechaPago.getFullYear();
                    }
                    object.NContrato_Alcance = object.NumeroReclamo + '-' + object.NumeroAlcance;
                    finallst.push(object);
                }
                respGeneral = finallst;
                // Cargo la grilla con los datos.
                $("#grid_ResultadoLiquidacion").kendoGrid({
                    dataSource: {
                        data: finallst,
                        pageSize: 20,
                        sort: { field: "FechaIncurrencia", dir: "desc" },
                        group: [{ field: "EmpresaNumero" }, { field: "NumeroSucursal" }]
                    },
                    height: 450,
                    scrollable: true,
                    sortable: true,
                    persistSelection: true,
                    pageable: true,
                    columns: [
                        { field: "EmpresaNumero", title: "Número de Empresa", hidden: true, width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NumeroSucursal", title: "Número de Lista", hidden: true, width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NContrato_Alcance", title: "No.Liquidación", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "FechaIncurrencia", title: "Fecha Incurrencia", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "FechaPago", title: "Fecha de Liquidación", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd-MM-yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "ContratoNumero", title: "Código Colaborador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Plan", title: "Tipo Tarifa", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "DocumentoTitular", title: "Cédula/ Pasaporte", headerAttributes: { style: "white-space: normal" }, width: "150px", filterable: { multi: true, search: true } },
                        { field: "Titular ", title: "Colaborador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Beneficiario", title: "Beneficiario", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Relacion", title: "Relación", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "sexoP", title: "Sexo", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "edad", title: "Edad", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Diagnostico", title: "Diagnóstico", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "CodigoDiagnostico", title: "Codigo Diag.", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "Prestador", title: "Prestador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "LugarAtencion", title: "Ciudad Prestación", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "MontoPresentado", title: "Monto Presentado", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true }, format: "{0:c}" },
                        { field: "MontoPagado", title: "Monto Pagado", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true }, format: "{0:c}" },
                        { field: "MontoDeducible", title: "Monto Deducible", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true }, format: "{0:c}" },
                        { field: "NombreTipoReclamo ", title: "Tipo de Reclamo", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true }, format: "{0:c}" },
                        { command: { text: "Descargar Liquidación", click: detalleEventoClick }, title: "Descargar", width: "250px" }
                        //{ field: "FechaCreacion", title: "Fecha", template: '#= kendo.toString(kendo.parseDate(FechaCreacion), "MM/dd/yyyy")#', width: "20%", filterable: { multi: true, search: true } },
                    ]
                });
                // Muestro el panel de la grilla
                function detalleEventoClick(e) {
                    e.preventDefault();
                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    //llenamos el objto
                    var filtrador = new ReclamoEntityFilter();
                    filtrador.NumeroReclamo = Number(dataItem.NumeroReclamo);
                    filtrador.NumeroAlcance = Number(dataItem.NumeroAlcance);
                    filtrador.CodigoContrato = Number(dataItem.ContratoNumero);
                    filtrador.TipoReclamo = dataItem.NombreTipoReclamo;
                    //llamamos al generador de reporteria
                    post$reclamos$generarPdf64(filtrador, function (result) {
                        var byteCharacters = atob(result);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        // now that we have the byte array, construct the blob from it
                        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
                        var fileName1 = "Reclamo1.pdf";
                        saveAs(blob1, fileName1);
                        // saving text file
                        //var blob2 = new Blob(["cool"], { type: "text/plain" });
                        //var fileName2 = "cool.txt";
                        //saveAs(blob2, fileName2);
                    }, function () { });
                }
            }, function () { });
        }
        // si es por medio del reporteador, se pasa los parámetros para que el reporteador corra la consulta y renderice el reporte
        if (TipoReporte == 1) {
            // muestro el panel del reporteador
            $('#pnl_ResultadoWebLiquidacion').hide();
            $('#pnl_ResultadoReporteadorLiquidacion').show();
            // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
            var pars = new ParametrosReporte();
            pars.NombreReporte = "ReporteReclamos";
            //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
            pars.Estados = ""; // este reporte no tiene filtro por estados
            pars.FechaInicio = $('#dt_DesdeLiquidacion').data('kendoDatePicker').value();
            pars.FechaFin = $('#dt_HastaLiquidacion').data('kendoDatePicker').value();
            pars.Identificacion = $('#txt_IdentificacionLiquidacion').val().toString();
            //pars.CodigosListas = listasElejidas;
            var serializado = JSON.stringify(pars);
            var codificado = btoa(serializado);
            //if (respGeneral === undefined || respGeneral === null || respGeneral === '') {
            get$Liquidacion$ObtenerReclamosGrupoEmpresaListaBeneficiario(empresas, listas, FiltroDesde, FiltroHasta, $('#txt_IdentificacionLiquidacion').val(), function (res) {
                var lst = res.Datos;
                //PROCESO LOS RESULTADOS PARA OBTENER EL SEXO Y LA EDAD
                var finallst = new Array();
                for (let r of lst) {
                    var object = new ReclamoEmpresaLista();
                    object = r;
                    if (object.Sexo === "1")
                        object.sexoP = 'Maculino';
                    else
                        object.sexoP = 'Femenino';
                    //calculo la edad
                    //calculo la edad
                    if (object.FechaNacimiento === undefined || object.FechaNacimiento === null) {
                        object.edad = 0;
                    }
                    else {
                        object.edad = calcularEdad(object.FechaNacimiento.replace('T00:00:00', ''));
                    }
                    //fechas
                    if (object.FechaIncurrencia !== null) {
                        var fechaIncurrencia = new Date(object.FechaIncurrencia);
                        object.FechaIncurrencia = fechaIncurrencia.getUTCDate() + '/' + (fechaIncurrencia.getUTCMonth() + 1) + '/' + fechaIncurrencia.getFullYear();
                    }
                    if (object.FechaPago !== null) {
                        var fechaPago = new Date(object.FechaPago);
                        object.FechaPago = fechaPago.getUTCDate() + '/' + (fechaPago.getUTCMonth() + 1) + '/' + fechaPago.getFullYear();
                    }
                    object.NContrato_Alcance = object.NumeroReclamo + '-' + object.NumeroAlcance;
                    finallst.push(object);
                }
                respGeneral = finallst;
                //Cargo el Load
                $('#iframeReporteadorLiquidacion').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoLiquidacion = false;
            }, function () { });
        }
    }
    //Reporte de Copagos
    function GenerarReporteCopago() {
        var FiltroDesde = $('#dt_DesdeCopagos').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_HastaCopagos').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        var empresas = new Array();
        var listas = new Array();
        var empresasn = new Array();
        var consolidado = new Array();
        var ConsolidadoFinal = new Array();
        var n1 = new numerosSucursalEmpresa();
        n1.NumeroEmpresa = IDEmpresa;
        n1.NumeroLista = IDSucursal;
        consolidado.push(n1);
        empresas.push('' + IDEmpresa);
        listas.push('' + IDSucursal);
        var TipoReporte = $("#rb_formatoCopagos").data('kendoButtonGroup').current().index();
        // 0 = pantalla, 1 = exportable
        // ruteo del resultado del reporte según el tipo
        // si es por medio de pantalla, corre la consulta
        if (TipoReporte == 0) {
            var estadoFacturas = $("#opcionesEstadoFacturaCopagos").val();
            if ($('#grid_ResultadoCopagos').data().kendoGrid) {
                $('#grid_ResultadoCopagos').data().kendoGrid.destroy();
                $('#grid_ResultadoCopagos').empty();
            }
            post$Copagos$ConsultaCopagos(1, consolidado, FiltroDesde, FiltroHasta, estadoFacturas, $('#txt_IdentificacionCopagos').val(), function (res) {
                // Muestro el panel de la grilla
                $('#pnl_ResultadoWebCopagos').show();
                $('#pnl_ResultadoReporteadorCopagos').hide();
                // una vez que traemos todos los datos vamos a filtrar cada resultado por el numero de listas seleccionadas
                var listaCompleta = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.SucursalEmpresa == Number(suc); });
                    for (let sucRest of filtrados) {
                        if (sucRest.AliasSucursal == undefined || sucRest.AliasSucursal == null || sucRest.AliasSucursal == '')
                            sucRest.AliasSucursal = EmpresaSeleccionada.NombreSucursal;
                        if (sucRest.FechaEmision !== null) {
                            var fechaEmision = new Date(sucRest.FechaEmision);
                            sucRest.FechaEmision = fechaEmision.getUTCDate() + '/' + (fechaEmision.getUTCMonth() + 1) + '/' + fechaEmision.getFullYear();
                        }
                        if (sucRest.FechaPago !== null) {
                            var fechaPago = new Date(sucRest.FechaPago);
                            sucRest.FechaPago = fechaPago.getUTCDate() + '/' + (fechaPago.getUTCMonth() + 1) + '/' + fechaPago.getFullYear();
                        }
                        if (sucRest.FechaPagoReclamo !== null) {
                            var fechaPagoReclamo = new Date(sucRest.FechaPagoReclamo);
                            sucRest.FechaPagoReclamo = fechaPagoReclamo.getUTCDate() + '/' + (fechaPagoReclamo.getUTCMonth() + 1) + '/' + fechaPagoReclamo.getFullYear();
                        }
                        sucRest.ReclamoAlcance = sucRest.NumeroReclamo + '-' + sucRest.NumeroAlcance;
                        listaCompleta.push(sucRest);
                    }
                }
                respGeneral = listaCompleta;
                // Cargo la grilla con los datos.
                $('#grid_ResultadoCopagos').show();
                $("#grid_ResultadoCopagos").kendoGrid({
                    dataSource: {
                        data: listaCompleta,
                        pageSize: 20,
                        sort: { field: "FechaIncurrencia", dir: "desc" },
                        group: [{ field: "NumeroEmpresa" }, { field: "SucursalEmpresa" }]
                    },
                    height: 450,
                    scrollable: true,
                    sortable: true,
                    persistSelection: true,
                    pageable: true,
                    columns: [
                        { field: "NumeroEmpresa", title: "Número de Empresa", hidden: true, width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "SucursalEmpresa", title: "Número de Lista", hidden: true, width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "AliasSucursal", title: "Nombre de Lista", width: "250px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ReclamoAlcance", title: "No. Liquidación", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NumeroCopago", title: "Número Copago", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "PersonaCedulaTitular", title: "Cédula/ Pasaporte", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NumeroContrato", title: "Código Colaborador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombresTitular", title: "Colaborador", width: "300px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombresBeneficiario", title: "Beneficiario", width: "300px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombreDiagnostico", title: "Diagnostico", width: "350px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "FechaEmision", title: "Fecha Emisión Copago", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "FechaPagoReclamo", title: "Fecha Pago Copago", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ValorPagado", title: "Valor Copago", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ValorCobrado", title: "Valor Cobrado", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "EstadoCopago", title: "Estado", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "DiasImpago", title: "Dias Pendientes", width: "100px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } }
                        //{ field: "FechaCreacion", title: "Fecha", template: '#= kendo.toString(kendo.parseDate(FechaCreacion), "MM/dd/yyyy")#', width: "200px", filterable: { multi: true, search: true } },
                    ]
                });
            }, function () { });
        }
        // si es por medio del reporteador, se pasa los parámetros para que el reporteador corra la consulta y renderice el reporte
        if (TipoReporte == 1) {
            // muestro el panel del reporteador
            $('#pnl_ResultadoWebCopagos').hide();
            $('#pnl_ResultadoReporteadorCopagos').show();
            // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
            var pars = new ParametrosReporte();
            pars.NombreReporte = "ReporteCopagos";
            pars.Estados = ""; // este reporte no tiene filtro por estados
            pars.FechaInicio = $('#dt_DesdeCopagos').data('kendoDatePicker').value();
            pars.FechaFin = $('#dt_HastaCopagos').data('kendoDatePicker').value();
            var serializado = JSON.stringify(pars);
            var codificado = btoa(serializado);
            var estadoFacturas = $("#opcionesEstadoFacturaCopagos").val();
            post$Copagos$ConsultaCopagos(1, consolidado, FiltroDesde, FiltroHasta, estadoFacturas, $('#txt_IdentificacionCopagos').val(), function (res) {
                // una vez que traemos todos los datos vamos a filtrar cada resultado por el numero de listas seleccionadas
                var listaCompleta = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.SucursalEmpresa == Number(suc); });
                    for (let sucRest of filtrados) {
                        if (sucRest.AliasSucursal == undefined || sucRest.AliasSucursal == null || sucRest.AliasSucursal == '')
                            sucRest.AliasSucursal = EmpresaSeleccionada.NombreSucursal;
                        if (sucRest.FechaEmision !== null) {
                            var fechaEmision = new Date(sucRest.FechaEmision);
                            sucRest.FechaEmision = fechaEmision.getUTCDate() + '/' + (fechaEmision.getUTCMonth() + 1) + '/' + fechaEmision.getFullYear();
                        }
                        if (sucRest.FechaPago !== null) {
                            var fechaPago = new Date(sucRest.FechaPago);
                            sucRest.FechaPago = fechaPago.getUTCDate() + '/' + (fechaPago.getUTCMonth() + 1) + '/' + fechaPago.getFullYear();
                        }
                        if (sucRest.FechaPagoReclamo !== null) {
                            var fechaPagoReclamo = new Date(sucRest.FechaPagoReclamo);
                            sucRest.FechaPagoReclamo = fechaPagoReclamo.getUTCDate() + '/' + (fechaPagoReclamo.getUTCMonth() + 1) + '/' + fechaPagoReclamo.getFullYear();
                        }
                        listaCompleta.push(sucRest);
                    }
                }
                respGeneral = listaCompleta;
                // cargo la ruta en el reporteador
                $('#iframeReporteadorCopagos').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoCopagos = false;
            }, function () { });
        }
    }
    //Reporte de Pre-AutorizacionesR
    function GenerarReporteAutorizacionesR() {
        var FiltroDesde = $('#dt_DesdeAutorizacionesR').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_HastaAutorizacionesR').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        var empresas = new Array();
        var listas = new Array();
        var empresasn = new Array();
        var consolidado = new Array();
        var ConsolidadoFinal = new Array();
        var n1 = new numerosSucursalEmpresa();
        n1.NumeroEmpresa = IDEmpresa;
        n1.NumeroLista = IDSucursal;
        consolidado.push(n1);
        empresas.push('' + IDEmpresa);
        listas.push('' + IDSucursal);
        //1) tomamos el listado de empresas y las filtramos para tener solo las empresas distintas
        var uniqueItems = Array.from(new Set(empresas));
        //2) verificamos cual de ellos tiene mas de un item
        for (let emp of uniqueItems) {
            var consolidadIndividual = new numerosSucursalEmpresa();
            var filtrados = consolidado.filter(function (s) { return s.NumeroEmpresa == Number(emp); });
            if (filtrados.length == 1) {
                consolidadIndividual.NumeroEmpresa = filtrados[0].NumeroEmpresa;
                consolidadIndividual.NumeroLista = filtrados[0].NumeroLista;
                ConsolidadoFinal.push(consolidadIndividual);
            }
            else {
                consolidadIndividual.NumeroEmpresa = filtrados[0].NumeroEmpresa;
                consolidadIndividual.NumeroLista = 0;
                ConsolidadoFinal.push(consolidadIndividual);
            }
        }
        var TipoReporte = $("#rb_formatoAutorizacionesR").data('kendoButtonGroup').current().index();
        // 0 = pantalla, 1 = exportable
        // ruteo del resultado del reporte según el tipo
        // si es por medio de pantalla, corre la consulta
        if (TipoReporte == 0) {
            if ($('#grid_ResultadoAutorizacionesR').data().kendoGrid) {
                $('#grid_ResultadoAutorizacionesR').data().kendoGrid.destroy();
                $('#grid_ResultadoAutorizacionesR').empty();
            }
            $('#grid_ResultadoAutorizacionesR').show();
            post$CorredoresAutorizacionController$ConsultaAutorizacionesEspecificas(1, ConsolidadoFinal, FiltroDesde, FiltroHasta, $('#txt_IdentificacionAutorizacionesR').val(), function (res) {
                // Muestro el panel de la grilla
                $('#pnl_ResultadoWebAutorizacionesR').show();
                $('#pnl_ResultadoReporteadorAutorizacionesR').hide();
                // una vez que traemos todos los datos vamos a filtrar cada resultado por el numero de listas seleccionadas
                var listaCompleta = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.SucursalEmpresa == Number(suc); });
                    for (let sucRest of filtrados) {
                        if (sucRest.FechaRequerimiento !== null) {
                            var fechaRequerimiento = new Date(sucRest.FechaRequerimiento);
                            sucRest.FechaRequerimiento = fechaRequerimiento.getUTCDate() + '/' + (fechaRequerimiento.getUTCMonth() + 1) + '/' + fechaRequerimiento.getFullYear();
                        }
                        if (sucRest.FechaAutorizacion !== null) {
                            var fechaAutorizacion = new Date(sucRest.FechaAutorizacion);
                            sucRest.FechaAutorizacion = fechaAutorizacion.getUTCDate() + '/' + (fechaAutorizacion.getUTCMonth() + 1) + '/' + fechaAutorizacion.getFullYear();
                        }
                        if (sucRest.FechaHospitalizacion !== null) {
                            var fechaHospitalizacion = new Date(sucRest.FechaHospitalizacion);
                            sucRest.FechaHospitalizacion = fechaHospitalizacion.getUTCDate() + '/' + (fechaHospitalizacion.getUTCMonth() + 1) + '/' + fechaHospitalizacion.getFullYear();
                        }
                        listaCompleta.push(sucRest);
                    }
                }
                respGeneral = listaCompleta;
                // Cargo la grilla con los datos.
                $("#grid_ResultadoAutorizacionesR").kendoGrid({
                    dataSource: {
                        data: listaCompleta,
                        pageSize: 20,
                        sort: { field: "FechaIncurrencia", dir: "desc" }
                    },
                    height: 450,
                    scrollable: true,
                    sortable: true,
                    persistSelection: true,
                    pageable: true,
                    columns: [
                        { field: "NumeroEmpresa", title: "Código Empresa", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombreEmpresa", title: "Nombre Empresa", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "SucursalEmpresa", title: "Número de Lista", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "ContratoNumero", title: "Código Colaborador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombreTitular", title: "Colaborador", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NombreBeneficiario", title: "Usuario", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "NumeroAutorizacion", title: "Nro.Autorización", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "EstadoCobertura", title: "Estado", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "CodigoDiagnostico", title: "Código Diagnóstico", headerAttributes: { style: "white-space: normal" }, width: "150px", filterable: { multi: true, search: true } },
                        { field: "FechaRequerimiento", title: "Fecha Creación", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd/MM/yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "FechaRequerimiento", title: "Fecha Autorización", type: "date", headerAttributes: { style: "white-space: normal" }, format: "{0:dd/MM/yyyy}", width: "150px", filterable: { multi: true, search: true } },
                        { field: "NombrePrestador", title: "Prestador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                        { field: "FechaHospitalizacion", title: "Fecha Hospitalización", width: "150px", headerAttributes: { style: "white-space: normal" }, type: "date", format: "{0:dd/MM/yyyy}", filterable: { multi: true, search: true } },
                        { field: "NombrePrestadorEmpresa", title: "Clínica", width: "150px", filterable: { multi: true, search: true } },
                        { command: { text: "Descargar", click: VerDetallesPr }, title: "Condiciones", width: "150px" }
                        //{ field: "FechaCreacion", title: "Fecha", template: '#= kendo.toString(kendo.parseDate(FechaCreacion), "MM/dd/yyyy")#', width: "200px", filterable: { multi: true, search: true } },
                    ]
                });
            }, function () { });
        }
        // si es por medio del reporteador, se pasa los parámetros para que el reporteador corra la consulta y renderice el reporte
        if (TipoReporte == 1) {
            // muestro el panel del reporteador
            $('#pnl_ResultadoWebAutorizacionesR').hide();
            $('#pnl_ResultadoReporteadorAutorizacionesR').show();
            // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
            var pars = new ParametrosReporte();
            pars.NombreReporte = "ReportePreAutorizaciones";
            //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
            pars.Estados = ""; // este reporte no tiene filtro por estados
            pars.FechaInicio = $('#dt_DesdeAutorizacionesR').data('kendoDatePicker').value();
            pars.FechaFin = $('#dt_HastaAutorizacionesR').data('kendoDatePicker').value();
            //pars.Identificacion = $('#txt_Identificacion').val().toString();
            var serializado = JSON.stringify(pars);
            var codificado = btoa(serializado);
            //if (respGeneral === undefined || respGeneral === null || respGeneral === '') {
            post$CorredoresAutorizacionController$ConsultaAutorizacionesEspecificas(1, ConsolidadoFinal, FiltroDesde, FiltroHasta, $('#txt_IdentificacionAutorizacionesR').val(), function (res) {
                var listaCompleta = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.SucursalEmpresa == Number(suc); });
                    for (let sucRest of filtrados) {
                        if (sucRest.FechaRequerimiento !== null) {
                            var fechaRequerimiento = new Date(sucRest.FechaRequerimiento);
                            sucRest.FechaRequerimiento = fechaRequerimiento.getUTCDate() + '/' + (fechaRequerimiento.getUTCMonth() + 1) + '/' + fechaRequerimiento.getFullYear();
                        }
                        if (sucRest.FechaAutorizacion !== null) {
                            var fechaAutorizacion = new Date(sucRest.FechaAutorizacion);
                            sucRest.FechaAutorizacion = fechaAutorizacion.getUTCDate() + '/' + (fechaAutorizacion.getUTCMonth() + 1) + '/' + fechaAutorizacion.getFullYear();
                        }
                        if (sucRest.FechaHospitalizacion !== null) {
                            var fechaHospitalizacion = new Date(sucRest.FechaHospitalizacion);
                            sucRest.FechaHospitalizacion = fechaHospitalizacion.getUTCDate() + '/' + (fechaHospitalizacion.getUTCMonth() + 1) + '/' + fechaHospitalizacion.getFullYear();
                        }
                        listaCompleta.push(sucRest);
                    }
                }
                respGeneral = listaCompleta;
                // cargo la ruta en el reporteador
                $('#iframeReporteadorAutorizacionesR').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoAutorizacionesR = false;
            }, function () { });
        }
    }
    //Reporte de Siniestralidad
    function GenerarReporteSiniestralidad() {
        var FiltroDesde = $('#dt_DesdeSiniestralidad').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_HastaSiniestralidad').data('kendoDatePicker').value();
        $('#pnl_ResultadoReporteadorSiniestralidad').hide();
        if (FiltroDesde == null || FiltroHasta == null) {
            $("#tipoReporteSiniestralida").data('kendoDropDownList').value(null);
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        // Obtiene las listas seleccionadas para llenar el objeto que se irá al servicio
        var empresas = new Array();
        var listas = new Array();
        var empresasn = new Array();
        var consolidado = new Array();
        var ConsolidadoFinal = new Array();
        var n1 = new numerosSucursalEmpresa();
        n1.NumeroEmpresa = IDEmpresa;
        n1.NumeroLista = IDSucursal;
        consolidado.push(n1);
        empresas.push('' + IDEmpresa);
        listas.push('' + IDSucursal);
        //verificamos el tipo de producto
        var codProducto = IDProducto;
        var tipoProducto = false;
        if (codProducto.toUpperCase() === 'COR' || codProducto.toUpperCase() === 'SMARTPLAN'
            || codProducto.toUpperCase() === 'SMART' || codProducto.toUpperCase() === 'CORPORATIVO') {
            tipoProducto = true;
        }
        //1) tomamos el listado de empresas y las filtramos para tener solo las empresas distintas
        var uniqueItems = Array.from(new Set(empresas));
        //2) verificamos cual de ellos tiene mas de un item
        for (let emp of uniqueItems) {
            var consolidadIndividual = new numerosSucursalEmpresa();
            var filtrados = consolidado.filter(function (s) { return s.NumeroEmpresa == Number(emp); });
            if (filtrados.length == 1) {
                consolidadIndividual.NumeroEmpresa = filtrados[0].NumeroEmpresa;
                consolidadIndividual.NumeroLista = filtrados[0].NumeroLista;
                ConsolidadoFinal.push(consolidadIndividual);
            }
            else {
                consolidadIndividual.NumeroEmpresa = filtrados[0].NumeroEmpresa;
                consolidadIndividual.NumeroLista = 0;
                ConsolidadoFinal.push(consolidadIndividual);
            }
        }
        $('#pnl_ResultadoReporteadorSiniestralidad').show();
        var pars = new ParametrosReporte();
        //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
        pars.Estados = ""; // este reporte no tiene filtro por estados
        pars.FechaInicio = $('#dt_DesdeSiniestralidad').data('kendoDatePicker').value();
        pars.FechaFin = $('#dt_HastaSiniestralidad').data('kendoDatePicker').value();
        //REPORTE DE SINIESTRALIDAD
        if (tipoReporteSiniestralidad == "Siniestralida") {
            pars.NombreReporte = "ReporteSiniestralidad";
            $('#pnl_ResultadoReporteadorSiniestralidad').show();
            consolidado = new Array();
            for (let emp of uniqueItems) {
                var empresaC = new numerosSucursalEmpresa();
                empresaC.NumeroEmpresa = Number(emp);
                empresaC.NumeroLista = 0;
                consolidado.push(empresaC);
            }
            post$siniestralidad$Mensualizada(FiltroDesde, FiltroHasta, consolidado, tipoProducto, function (res) {
                var listIDNR = new Array();
                var lstRes = res.Datos;
                var listas = new Array();
                for (let listaIndividual of lstRes) {
                    listas.push(listaIndividual.NumeroLista);
                }
                var unique = listas.filter(onlyUnique);
                for (let listaIndividual of unique) {
                    var filtrados = lstRes.filter(function (s) { return s.NumeroLista == Number(listaIndividual); });
                    let contadorMeses = 0; //el primer mes se multiplica por 0 
                    for (let sucRest of filtrados) {
                        sucRest.LiquidacionesSinIdnr = sucRest.Liquidaciones;
                        if (contadorMeses != 0)
                            sucRest.Liquidaciones = sucRest.Liquidaciones + (sucRest.Liquidaciones * (1 / 12 / 11) * contadorMeses);
                        contadorMeses++;
                        listIDNR.push(sucRest);
                    }
                }
                respGeneral = listIDNR;
                // cargo la ruta en el reporteador
                var serializado = JSON.stringify(pars);
                var codificado = btoa(serializado);
                $('#iframeReporteadorSiniestralidad').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoSiniestralidad = false;
            }, function () { });
        }
        //REPORTE DE SINIESTRALIDAD HOJAS DE TRABAJO
        if (tipoReporteSiniestralidad == "SiniestralidadTrabajo") {
            pars.NombreReporte = "ReporteSiniestralidad";
            $('#pnl_ResultadoReporteadorSiniestralidad').hide();
            consolidado = new Array();
            for (let emp of uniqueItems) {
                var empresaC = new numerosSucursalEmpresa();
                empresaC.NumeroEmpresa = Number(emp);
                empresaC.NumeroLista = 0;
                consolidado.push(empresaC);
            }
            post$siniestralidad$Mensualizada(FiltroDesde, FiltroHasta, consolidado, tipoProducto, function (res) {
                var listaCompleta = new Array();
                var listIDNR = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.NumeroLista == Number(suc); });
                    for (let sucRest of filtrados) {
                        listaCompleta.push(sucRest);
                    }
                }
                for (let listaIndividual of listas) {
                    var filtrados = listaCompleta.filter(function (s) { return s.NumeroLista == Number(listaIndividual); });
                    let contadorMeses = 0; //el primer mes se multiplica por 0 
                    for (let sucRest of filtrados) {
                        if (contadorMeses != 0)
                            sucRest.Liquidaciones = sucRest.Liquidaciones + (sucRest.Liquidaciones * (1 / 12 / 11) * contadorMeses);
                        contadorMeses++;
                        listIDNR.push(sucRest);
                    }
                }
                //respGeneral = listIDNR;
                post$facturacion$GenerarExportableSiniestralidadLista(listIDNR, function (res) {
                    // convert base64 string to byte array
                    var byteCharacters = atob(res.Datos);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    // now that we have the byte array, construct the blob from it
                    var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
                    var fileName1 = "DetalleSiniestralidad.xlsx";
                    saveAs(blob1, fileName1);
                    // saving text file
                    //var blob2 = new Blob(["cool"], { type: "text/plain" });
                    //var fileName2 = "cool.txt";
                    //saveAs(blob2, fileName2);
                }, function () { });
            }, function () { });
        }
        //REPORTE DE SINIESTRALIDAD LISTAS
        if (tipoReporteSiniestralidad == "SiniestralidadLista") {
            pars.NombreReporte = "ReporteSiniestralidadMensualizada";
            $('#pnl_ResultadoReporteadorSiniestralidad').show();
            post$siniestralidad$Mensualizada(FiltroDesde, FiltroHasta, ConsolidadoFinal, tipoProducto, function (res) {
                // una vez que traemos todos los datos vamos a filtrar cada resultado por el numero de listas seleccionadas
                var listaCompleta = new Array();
                var listIDNR = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.NumeroLista == Number(suc); });
                    for (let sucRest of filtrados) {
                        listaCompleta.push(sucRest);
                    }
                }
                for (let listaIndividual of listas) {
                    var filtrados = listaCompleta.filter(function (s) { return s.NumeroLista == Number(listaIndividual); });
                    let contadorMeses = 0; //el primer mes se multiplica por 0 
                    for (let sucRest of filtrados) {
                        sucRest.LiquidacionesSinIdnr = sucRest.Liquidaciones;
                        if (contadorMeses != 0)
                            sucRest.Liquidaciones = sucRest.Liquidaciones + (sucRest.Liquidaciones * (1 / 12 / 11) * contadorMeses);
                        contadorMeses++;
                        listIDNR.push(sucRest);
                    }
                }
                respGeneral = listIDNR;
                // cargo la ruta en el reporteador
                var serializado = JSON.stringify(pars);
                var codificado = btoa(serializado);
                $('#iframeReporteadorSiniestralidad').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocadoSiniestralidad = false;
            }, function () { });
        }
        //REPORTE DE SINIESTRALIDAD HOJAS DE TRABAJO LISTAS
        if (tipoReporteSiniestralidad == "SiniestralidadListaTrabajo") {
            pars.NombreReporte = "ReporteSiniestralidadMensualizada";
            $('#pnl_ResultadoReporteadorSiniestralidad').hide();
            post$siniestralidad$Mensualizada(FiltroDesde, FiltroHasta, ConsolidadoFinal, tipoProducto, function (res) {
                // una vez que traemos todos los datos vamos a filtrar cada resultado por el numero de listas seleccionadas
                var listaCompleta = new Array();
                var listIDNR = new Array();
                var lstRes = res.Datos;
                for (let suc of listas) {
                    var filtrados = lstRes.filter(function (s) { return s.NumeroLista == Number(suc); });
                    for (let sucRest of filtrados) {
                        listaCompleta.push(sucRest);
                    }
                }
                for (let listaIndividual of listas) {
                    var filtrados = listaCompleta.filter(function (s) { return s.NumeroLista == Number(listaIndividual); });
                    let contadorMeses = 0; //el primer mes se multiplica por 0 
                    for (let sucRest of filtrados) {
                        if (contadorMeses != 0)
                            sucRest.Liquidaciones = sucRest.Liquidaciones + (sucRest.Liquidaciones * (1 / 12 / 11) * contadorMeses);
                        contadorMeses++;
                        listIDNR.push(sucRest);
                    }
                }
                //respGeneral = listIDNR;
                post$facturacion$GenerarExportableSiniestralidadLista(listIDNR, function (res) {
                    // convert base64 string to byte array
                    var byteCharacters = atob(res.Datos);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    // now that we have the byte array, construct the blob from it
                    var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
                    var fileName1 = "DetalleSiniestralidadPorLista.xlsx";
                    saveAs(blob1, fileName1);
                    // saving text file
                    //var blob2 = new Blob(["cool"], { type: "text/plain" });
                    //var fileName2 = "cool.txt";
                    //saveAs(blob2, fileName2);
                }, function () { });
            }, function () { });
        }
    }
    //Reporte Movimientos
    var ReporteInvocadoMovimiento = false;
    $('#iframeReporteador').load(function () {
        if (ReporteInvocadoMovimiento == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteador').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteador').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoMovimiento = true;
        }
    });
    $('#grid_Resultado').kendoGrid();
    //Reporte de Liquidacion
    var ReporteInvocadoLiquidacion = false;
    $('#iframeReporteadorLiquidacion').load(function () {
        if (ReporteInvocadoLiquidacion == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadorLiquidacion').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadorLiquidacion').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoLiquidacion = true;
        }
    });
    $('#grid_ResultadoLiquidacion').kendoGrid();
    //Reporte de Copagos
    var ReporteInvocadoCopagos = false;
    $('#iframeReporteadorCopagos').load(function () {
        if (ReporteInvocadoCopagos == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadorCopagos').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadorCopagos').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoCopagos = true;
        }
    });
    $('#grid_ResultadoCopagos').kendoGrid();
    //Reporte Pre-Autorizaciones
    var ReporteInvocadoAutorizacionesR = false;
    $('#iframeReporteadorAutorizacionesR').load(function () {
        if (ReporteInvocadoAutorizacionesR == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadorAutorizacionesR').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadorAutorizacionesR').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoAutorizacionesR = true;
        }
    });
    $('#grid_ResultadoAutorizacionesR').kendoGrid();
    //Reportes de Siniestralidad
    var ReporteInvocadoSiniestralidad = false;
    $('#iframeReporteadorSiniestralidad').load(function () {
        if (ReporteInvocadoSiniestralidad == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadorSiniestralidad').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadorSiniestralidad').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoSiniestralidad = true;
        }
    });
    //reporte descargable de productos individuales
    var ReporteInvocadoProductoInd = false;
    $('#iframeReporteadoProdInd').load(function () {
        if (ReporteInvocadoProductoInd == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadoProdInd').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadoProdInd').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoProductoInd = true;
        }
    });
    //reporte descargable de productos Corporativos
    var ReporteInvocadoProductoCorp = false;
    $('#iframeReporteadoProdCorp').load(function () {
        if (ReporteInvocadoProductoCorp == false) {
            var myJsonString = JSON.stringify(respGeneral);
            $('#iframeReporteadoProdCorp').contents().find('#hdn_Data').val(myJsonString);
            $('#iframeReporteadoProdCorp').contents().find('#btn_Cargar').trigger("click");
            ReporteInvocadoProductoCorp = true;
        }
    });
    Loading_Hide(true);
});
//Descargable Pre-autorizaciones
function VerDetallesPr(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var estadoCob = "";
    //verificamos si es no cubierto
    if (dataItem.EstadoCobertura.toLowerCase().includes("no")) {
        estadoCob = dataItem.EstadoCobertura.replace(' ', '_');
    }
    else {
        estadoCob = dataItem.EstadoCobertura;
    }
    window.open(AddresServicioDescargaPreAutorizaciones + "" + dataItem.IdAutorizacion + "/" + estadoCob + "/");
}
function urlDowload(blob, fileName) {
    var url;
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName + ".xml");
        url = window.navigator.msSaveOrOpenBlob(blob);
    }
    else {
        //var objectUrl = URL.createObjectURL(blob);
        //url =window.open(objectUrl);
        url = window.URL.createObjectURL(blob);
    }
    return url;
}
;
var BASE64_MARKER = ';base64,';
function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}
function formatDate(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];
    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex] + ' - ' + year;
}
function DescargarXML(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    get$ebilling$ConsultaFacturaXml(dataItem.NumeroFactura, function (res) {
        //convert base64 string to byte array
        //var byteCharacters = atob(res.Datos);
        //var byteNumbers = new Array(byteCharacters.length);
        //for (var i = 0; i < byteCharacters.length; i++) {
        //    byteNumbers[i] = byteCharacters.charCodeAt(i);
        //}
        //var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        if (res == null)
            alert('La factura no se encuentra en el sistema principal');
        var blob1 = new Blob([res], { type: "text/xml" });
        var fileName1 = "Factura" + dataItem.NumeroFactura.replace("-", "_") + ".xml";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function VerCuota(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    $('#VC_numeroFactura').text('');
    $('#VC_valorCuota').text('');
    $('#VC_valorServiciosAdicionales').text('');
    $('#VC_valorGastosAdministrativos').text('');
    $('#VC_valorTarjetas').text('');
    $('#VC_valorSeguroCampesimo').text('');
    $('#VC_total').text('');
    //llenamos
    $('#VC_numeroFactura').text(dataItem.NumeroFactura);
    $('#VC_valorCuota').text(dataItem.ValorCouta);
    $('#VC_valorServiciosAdicionales').text(dataItem.ValorServiciosAdicionales);
    $('#VC_valorGastosAdministrativos').text(dataItem.ValorGastosAdministrativos);
    $('#VC_valorTarjetas').text(dataItem.ValorTarjeta);
    $('#VC_valorSeguroCampesimo').text(dataItem.ValorSeguroCampesino);
    $('#VC_total').text(dataItem.ValorTotal);
    //mostramos
    $("#ventana_Cuota").data('kendoWindow').center().open();
}
function DescargarXMLIndv(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //Pomenos 3 digitos xxx
    var CodigoSucursal = dataItem.CodigoSucursal;
    if (CodigoSucursal.length < 3) {
        for (let i = CodigoSucursal.length; i < 3; i++) {
            CodigoSucursal = '0' + CodigoSucursal;
        }
    }
    //Ponemos 3 digitos xxx
    var CodigoSerie = '' + dataItem.SerieFacturacion;
    if (CodigoSerie.length < 3) {
        for (let i = CodigoSerie.length; i < 3; i++) {
            CodigoSerie = '0' + CodigoSerie;
        }
    }
    //Ponemos en formato de 9 digitos
    var CodigoFactura = '' + dataItem.NumeroFactura;
    if (CodigoFactura.length < 9) {
        for (let i = CodigoFactura.length; i < 9; i++) {
            CodigoFactura = '0' + CodigoFactura;
        }
    }
    var facturaInd = CodigoSucursal + '-' + CodigoSerie + '-' + CodigoFactura;
    get$ebilling$ConsultaFacturaXml(facturaInd, function (res) {
        //convert base64 string to byte array
        //var byteCharacters = atob(res.Datos);
        //var byteNumbers = new Array(byteCharacters.length);
        //for (var i = 0; i < byteCharacters.length; i++) {
        //    byteNumbers[i] = byteCharacters.charCodeAt(i);
        //}
        //var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        if (res == null)
            alert('La factura no se encuentra en el sistema principal');
        var blob1 = new Blob([res], { type: "text/xml" });
        var fileName1 = "Factura" + dataItem.NumeroFactura.replace("-", "_") + ".xml";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function DescargarRIDE(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    get$ebilling$ConsultaFacturaPdf(dataItem.NumeroFactura, function (res) {
        var respuesta = res;
        if (respuesta.Detalle.includes("no ha sido")) {
            alert(respuesta.Detalle);
            return false;
        }
        //convert base64 string to byte array
        var byteCharacters = atob(respuesta.ArchivoPDF);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
        var fileName1 = "Factura" + dataItem.NumeroFactura.replace("-", "_") + ".pdf";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function DescargarRIDEIndividuales(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //Pomenos 3 digitos xxx
    var CodigoSucursal = dataItem.CodigoSucursal;
    if (CodigoSucursal.length < 3) {
        for (let i = CodigoSucursal.length; i < 3; i++) {
            CodigoSucursal = '0' + CodigoSucursal;
        }
    }
    //Ponemos 3 digitos xxx
    var CodigoSerie = '' + dataItem.SerieFacturacion;
    if (CodigoSerie.length < 3) {
        for (let i = CodigoSerie.length; i < 3; i++) {
            CodigoSerie = '0' + CodigoSerie;
        }
    }
    //Ponemos en formato de 9 digitos
    var CodigoFactura = '' + dataItem.NumeroFactura;
    if (CodigoFactura.length < 9) {
        for (let i = CodigoFactura.length; i < 9; i++) {
            CodigoFactura = '0' + CodigoFactura;
        }
    }
    var facturaInd = CodigoSucursal + '-' + CodigoSerie + '-' + CodigoFactura;
    get$ebilling$ConsultaFacturaPdf(facturaInd, function (res) {
        var respuesta = res;
        if (respuesta.Detalle.includes("no ha sido")) {
            alert(respuesta.Detalle);
            return false;
        }
        //convert base64 string to byte array
        var byteCharacters = atob(respuesta.ArchivoPDF);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
        var fileName1 = "Factura" + dataItem.NumeroFactura.replace("-", "_") + ".pdf";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function f(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    get$ebilling$ConsultaFacturaXml(dataItem.NumeroFactura, function (res) {
        //convert base64 string to byte array
        //var byteCharacters = atob(res.Datos);
        //var byteNumbers = new Array(byteCharacters.length);
        //for (var i = 0; i < byteCharacters.length; i++) {
        //    byteNumbers[i] = byteCharacters.charCodeAt(i);
        //}
        //var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([res], { type: "text/xml" });
        var fileName1 = "Factura" + dataItem.NumeroFactura.replace("-", "_") + ".xml";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function DescargarSoportes(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    get$facturacion$ObtenerDatosReporteSoportesFactura(dataItem.IDEmpresa, dataItem.IDSucursal, dataItem.IDCuota, 1, function (res) {
        if (res.Datos == null || res.Datos == undefined || res.Datos == "") {
            return alert('No se puede descargar el archivo.');
        }
        var byteCharacters = atob(res.Datos);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
        var fileName1 = "Soportes_" + dataItem.IDSucursal.toString() + ".pdf";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function DescargarSoporteCarta(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    get$Qpra$CorredoresObtenerArchivoQpra(dataItem.Id_DetalleArchivo, function (res) {
        if (res.Datos == null || res.Datos == undefined || res.Datos == "") {
            return alert('No se puede descargar el archivo.');
        }
        var carta = res.Datos;
        var byteCharacters = atob(carta.Archivo);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
        var fileName1 = carta.Nombre + "" + carta.Extension + "";
        saveAs(blob1, fileName1);
    }, function () { });
}
function DescargarSoportesExcel(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //tipo de reporte2 excel
    get$facturacion$ObtenerDatosReporteSoportesFactura(dataItem.IDEmpresa, dataItem.IDSucursal, dataItem.IDCuota, 2, function (res) {
        if (res.Datos == null || res.Datos == undefined || res.Datos == "") {
            return alert('No se puede descargar el archivo.');
        }
        var byteCharacters = atob(res.Datos);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // now that we have the byte array, construct the blob from it
        var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
        var fileName1 = "Soportes_" + dataItem.IDSucursal.toString() + ".xlsx";
        saveAs(blob1, fileName1);
        // saving text file
        //var blob2 = new Blob(["cool"], { type: "text/plain" });
        //var fileName2 = "cool.txt";
        //saveAs(blob2, fileName2);
    }, function () { });
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
//# sourceMappingURL=Cliente.js.map