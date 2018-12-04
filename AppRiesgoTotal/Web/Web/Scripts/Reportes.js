var functionDescargaRide;
var functionDescargaXml;
var functionDescargaSoportePdf;
var functionDescargaSoporteExcel;
var functionVerDetalleCuota;
head.ready(function () {
    var listEmpresaSucursales;
    //consulta las empresas y listas de este agente
    //Seccion de reportes Siniestralidad
    $('#dt_Desde').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_Hasta').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_Buscar').kendoButton();
    $('#btn_AceptarEmpresas').kendoButton();
    $('#extrasEmpresas').hide();
    $('#extrasEmpresas2').hide();
    $('#extrasIndividual').hide();
    $('#extrasIndividual2').hide();
    $("#rb_formato").kendoButtonGroup({
        index: 0
    });
    $("#ventana_Cuota").kendoWindow({
        width: "350px",
        height: "350px",
        title: "Detalle Valor Cuota",
        modal: true
    }).data("kendoWindow");
    $('#btn_CerrarCuota').click(function () {
        $("#ventana_Cuota").data('kendoWindow').close();
    });
    //Verifico los permisos que tiene el usuario para cargar el combo
    var UsuarioLogueado = UsuarioSesion();
    var planes = UsuarioLogueado.PermisoPlan;
    var respGeneral;
    var listPlanes;
    var listOpciones = new Array();
    var listaSucursales = new Array();
    var listasSucursalesSeleccionadas;
    if (planes != null && planes.length > 0) {
        listPlanes = planes.split(';');
        if (listPlanes.length > 1) {
            var opcionesProductos = new Object();
            opcionesProductos.id = null;
            opcionesProductos.value = 'Seleccione';
            listOpciones.push(opcionesProductos);
        }
        for (var i = 0; i < listPlanes.length - 1; i++) {
            if (listPlanes[i] == 'COR') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'CORPORATIVOS';
                opcionesProductos.value = 'CORPORATIVOS';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'SMAR') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'SMARTPLAN';
                opcionesProductos.value = 'SMARTPLAN';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'POO') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'POOL';
                opcionesProductos.value = 'POOL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'GRUPAL') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'GRUPAL';
                opcionesProductos.value = 'GRUPAL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'IND') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'INDIVIDUAL';
                opcionesProductos.value = 'INDIVIDUAL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'ONC') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'ONCOCARE';
                opcionesProductos.value = 'ONCOCARE';
                listOpciones.push(opcionesProductos);
            }
        }
        if (listPlanes.length > 1) {
            var opcionesProductos = new Object();
            opcionesProductos.id = 'TODOS';
            opcionesProductos.value = 'TODOS';
            listOpciones.push(opcionesProductos);
        }
    }
    var localDataSource = new kendo.data.DataSource({
        data: listOpciones
    });
    $("#selectProducto").kendoDropDownList({
        dataSource: localDataSource,
        dataTextField: "value",
        dataValueField: "id",
        animation: false,
        maxSelectedItems: 1,
        value: ["Seleccione"],
        change: SeleccionTipoPlan
    });
    function SeleccionTipoPlan() {
        var valorSeleccion = $('#selectProducto').val();
        if (valorSeleccion === 'CORPORATIVOS' || valorSeleccion === 'SMARTPLAN' || valorSeleccion === 'POOL') {
            $('#extrasEmpresas').show();
            $('#extrasEmpresas2').show();
            $('#extrasIndividual').hide();
            $('#extrasIndividual2').hide();
            $('#txt_NumeroContrato').val('');
            $('#txt_IdentificacionP').val('');
        }
        else {
            if (valorSeleccion === 'TODOS') {
                $('#extrasEmpresas').show();
                $('#extrasEmpresas2').show();
                $('#extrasIndividual').show();
                $('#extrasIndividual2').show();
                $('#txt_NumeroSucursal').val('');
                $('#txt_NumeroContrato').val('');
                $('#txt_IdentificacionP').val('');
            }
            else {
                if (valorSeleccion === '') {
                    $('#extrasEmpresas').hide();
                    $('#extrasEmpresas2').hide();
                    $('#extrasIndividual').hide();
                    $('#extrasIndividual2').hide();
                    $('#txt_NumeroSucursal').val('');
                    $('#txt_NumeroContrato').val('');
                    $('#txt_IdentificacionP').val('');
                }
                else {
                    $('#extrasEmpresas').show();
                    $('#extrasEmpresas2').hide();
                    $('#extrasIndividual').show();
                    $('#extrasIndividual2').show();
                    $('#txt_NumeroSucursal').val('');
                }
            }
        }
    }
    var listaBrokers = new Array();
    var listasSeleccion;
    var generalListas;
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Brokers",
        modal: true
    }).data("kendoWindow");
    $("#ventana_Empresas").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Empresas",
        modal: true
    }).data("kendoWindow");
    ///verifico si es brokers o grupo de brokers
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        listaBrokers.push(UsuarioLogueado.IdCorredor);
        $('#seccionBroker').hide();
    }
    else {
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes, function (res) {
            $('#seccionBroker').show();
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
    var filtro = new ContratosIndividualesEmpresasPorAgenteFilter();
    filtro.Brokers = [UsuarioLogueado.IdCorredor];
    var productoList = new Array();
    //tomamos los productos
    var planes = UsuarioLogueado.PermisoPlan;
    if (planes != null && planes.length > 0) {
        var listPlanesP = planes.split(';');
        for (var i = 0; i < listPlanesP.length - 1; i++) {
            //llenamos los productos
            productoList.push(listPlanesP[i].toUpperCase());
        }
    }
    filtro.lstProductos = productoList;
    filtro.SoloActivos = true;
    post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro, function (result) {
        if (result == undefined) {
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        }
        var resultado = result.Datos;
        listEmpresaSucursales = result.Datos;
        listasSucursalesSeleccionadas = listEmpresaSucursales;
        $('#grid_Empresas').kendoGrid({
            dataSource: {
                data: listEmpresaSucursales,
                schema: {
                    model: {
                        id: "NumeroSucursal"
                    }
                },
                pageSize: 10,
                sort: { field: "RazonSocial", dir: "asc" },
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
                { field: "RazonSocial", title: "Empresa", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "NumeroSucursal", title: "Número de Lista", headerAttributes: { style: "white-space: normal" }, width: "60px", filterable: { multi: true, search: true } },
                { field: "NombreSucursal", title: "Nombre de Lista", headerAttributes: { style: "white-space: normal" }, width: "200px", filterable: { multi: true, search: true } }
            ]
        });
    }, function (error) {
    });
    Loading_Hide();
    $('#btn_SeleccionarAgentes').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    $('#txt_IdentificacionGenerica').click(function () {
        $("#ventana_Empresas").data('kendoWindow').center().open();
    });
    $('#btn_AceptarGrupoAgentes').click(function () {
        $("#lbl_GrupoAgentes").val(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        listaBrokers = new Array();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.Codigo === Number(r));
            for (let s of parcialresult) {
                //listasSeleccion.push(s);
                listaBrokers.push(s.Codigo);
            }
        }
        //fin proceso
        $("#ventana_GrupoAgentes").data('kendoWindow').close();
    });
    $('#btn_AceptarEmpresas').click(function () {
        $("#txt_IdentificacionGenerica").val(">>" + $("#grid_Empresas").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_Empresas").data('kendoGrid').selectedKeyNames();
        listaSucursales = new Array();
        for (let r of sl) {
            var parcialresult = listasSucursalesSeleccionadas.filter(iteml => iteml.NumeroSucursal === Number(r));
            for (let s of parcialresult) {
                //listasSeleccion.push(s);
                listaSucursales.push(s.NumeroSucursal);
            }
        }
        //fin proceso
        $("#ventana_Empresas").data('kendoWindow').close();
    });
    $('#btn_Buscar').click(function () {
        var FiltroDesde = $('#dt_Desde').data('kendoDatePicker').value();
        var FiltroHasta = $('#dt_Hasta').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        if (listaBrokers.length == 0)
            return alert('Debe seleccionar al menos un broker');
        var TipoReporte = $("#rb_formato").data('kendoButtonGroup').current().index();
        var lisProductos = new Array();
        if ($('#selectProducto').val() === null || $('#selectProducto').val() === '') {
            return alert('Debe seleccionar al menos un tipo de producto');
        }
        if ($('#selectProducto').val() === 'TODOS') {
            for (var i = 0; i < listPlanes.length - 1; i++) {
                if (listPlanes[i] == 'COR')
                    lisProductos.push('CORPORATIVOS');
                if (listPlanes[i] == 'SMAR')
                    lisProductos.push('SMARTPLAN');
                if (listPlanes[i] == 'POO')
                    lisProductos.push('POOL');
                if (listPlanes[i] == 'IND')
                    lisProductos.push('INDIVIDUAL');
                if (listPlanes[i] == 'ONC')
                    lisProductos.push('ONCOCARE');
                if (listPlanes[i] == 'GRUPAL')
                    lisProductos.push('GRUPAL');
            }
        }
        else {
            lisProductos.push($('#selectProducto').val());
        }
        //buscamos y cargamos la grilla :D
        var filtro = new FacturacionFilter();
        filtro.Brokers = listaBrokers;
        filtro.fechaDesde = FiltroDesde;
        filtro.fechaHasta = FiltroHasta;
        filtro.lstProductos = lisProductos;
        filtro.region = "";
        //if ($('#txt_NumeroSucursal').val() != null && $('#txt_NumeroSucursal').val() != '')
        //    filtro.NumSucursal = $('#txt_NumeroSucursal').val();
        if ($('#txt_NumeroContrato').val() != null && $('#txt_NumeroContrato').val() != '')
            filtro.NumContrato = $('#txt_NumeroContrato').val();
        if ($('#txt_IdentificacionP').val() != null && $('#txt_IdentificacionP').val() != '')
            filtro.Identificacion = $('#txt_IdentificacionP').val();
        //if ($('#txt_IdentificacionGenerica').val() != null && $('#txt_IdentificacionGenerica').val() != '')
        //     filtro.RazonSocial = $('#txt_IdentificacionGenerica').val();
        if (listaSucursales.length > 0)
            filtro.Sucursales = listaSucursales;
        else
            filtro.Sucursales = new Array();
        if ($('#grid_facturacion').data().kendoGrid) {
            $('#grid_facturacion').data().kendoGrid.destroy();
            $('#grid_facturacion').empty();
        }
        post$facturacion$ConsultarReporteGeneralFacturacion(filtro, function (res) {
            var lst = res.Datos;
            for (let i of lst) {
                if (i.FechaEmision != null && i.FechaEmision != undefined) {
                    i.FechaEmision = new Date(i.FechaEmision);
                    i.FechaEmisionAdap = i.FechaEmision.getUTCDate() + '/' + (i.FechaEmision.getUTCMonth() + 1) + '/' + i.FechaEmision.getFullYear();
                }
                if (i.FechaInicio != null && i.FechaInicio != undefined) {
                    i.FechaInicio = new Date(i.FechaInicio);
                    i.FechaInicioAdap = i.FechaInicio.getUTCDate() + '/' + (i.FechaInicio.getUTCMonth() + 1) + '/' + i.FechaInicio.getFullYear();
                }
                if (i.FechaFin != null && i.FechaFin != undefined) {
                    i.FechaFin = new Date(i.FechaFin);
                    i.FechaFinAdap = i.FechaFin.getUTCDate() + '/' + (i.FechaFin.getUTCMonth() + 1) + '/' + i.FechaFin.getFullYear();
                }
                if (i.Estado == 26)
                    i.EstadoAdap = 'Cobrado';
                if (i.Estado == 36)
                    i.EstadoAdap = 'Impreso';
                if (i.Estado == 29)
                    i.EstadoAdap = 'Mora';
            }
            if ($('#grid_facturacion').data().kendoGrid) {
                $('#grid_facturacion').data().kendoGrid.destroy();
                $('#grid_facturacion').empty();
            }
            respGeneral = lst;
            if (TipoReporte == 0) {
                $('#ventanaFacturacion').show();
                $('#pnl_ResultadoReporteador').hide();
                $('#grid_facturacion').kendoGrid({
                    dataSource: {
                        data: lst,
                        pageSize: 20
                    },
                    height: 650,
                    scrollable: true,
                    sortable: true,
                    groupable: false,
                    persistSelection: true,
                    pageable: true,
                    detailTemplate: kendo.template($("#templateFacturacion").html()),
                    detailInit: detailInit,
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row"));
                    },
                    columns: [
                        { field: "NombreAgenteVenta", title: "Broker", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "FechaEmision", title: "Fecha Emisión", width: "150px", format: "{0:dd-MM-yyyy}", headerAttributes: { style: "white-space: normal" } },
                        { field: "Nombre", title: "Nombres", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "Identificacion", title: "Identificación", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "NumeroContrato", title: "No-Contrato", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "NumeroFactura", title: "No-Factura", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "CodigoProducto", title: "Producto", width: "100px", headerAttributes: { style: "white-space: normal" } },
                        { field: "FechaInicio", title: "Fecha Inicio Factura", width: "150px", format: "{0:dd-MM-yyyy}", headerAttributes: { style: "white-space: normal" } },
                        { field: "FechaFin", title: "Fecha Fin Factura", width: "150px", format: "{0:dd-MM-yyyy}", headerAttributes: { style: "white-space: normal" } },
                        { field: "ValorTotal", title: "Valor", width: "150px", headerAttributes: { style: "white-space: normal" } },
                        { field: "EstadoContratoDesc", title: "Estado Contrato", width: "150px", headerAttributes: { style: "white-space: normal" } }
                        //{ command: { text: "RIDE", click: DescargarRIDE2 }, title: "Descarga", width: "100px" },
                        //{ command: { text: "XML", click: DescargarXML2 }, title: "Descarga", width: "100px" },
                        //{ command: { text: "PDF", click: DescargarSoportes2 }, title: "Soporte", width: "100px" },
                        //{ command: { text: "EXCEL", click: DescargarSoportesExcel2 }, title: "Soporte", width: "120px" }
                    ]
                });
            }
            else {
                //Reportadeor
                // muestro el panel del reporteador
                $('#ventanaFacturacion').hide();
                $('#pnl_ResultadoReporteador').show();
                // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
                var pars = new ParametrosReporte();
                pars.NombreReporte = "ReporteFacturacionGeneral";
                //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
                pars.Estados = ""; // este reporte no tiene filtro por estados
                pars.FechaInicio = $('#dt_Desde').data('kendoDatePicker').value();
                pars.FechaFin = $('#dt_Hasta').data('kendoDatePicker').value();
                //pars.Identificacion = $('#txt_Identificacion').val().toString();
                var serializado = JSON.stringify(pars);
                var codificado = btoa(serializado);
                var estados = new Array();
                // cargo la ruta en el reporteador
                $('#iframeReporteador').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                ReporteInvocado = false;
            }
        }, function () { });
        var ReporteInvocado = false;
        $('#iframeReporteador').load(function () {
            if (ReporteInvocado == false) {
                var myJsonString = JSON.stringify(respGeneral);
                $('#iframeReporteador').contents().find('#hdn_Data').val(myJsonString);
                $('#iframeReporteador').contents().find('#btn_Cargar').trigger("click");
                ReporteInvocado = true;
            }
        });
        $('#grid_facturacion').kendoGrid();
    });
    function detailInit(e) {
        var detailRow = e.detailRow;
    }
    functionDescargaXml = DescargarXML2;
    function DescargarXML2(CodigoProducto, CodigoSucursal, CodigoSerie, NumeroFactura) {
        var CodProducto = CodigoProducto;
        var NFactura = '';
        if (CodProducto === 'IND' || CodProducto === 'ONC') {
            if (CodigoSucursal.length < 3) {
                for (let i = CodigoSucursal.length; i < 3; i++) {
                    CodigoSucursal = '0' + CodigoSucursal;
                }
            }
            //Ponemos 3 digitos xxx
            if (CodigoSerie.length < 3) {
                for (let i = CodigoSerie.length; i < 3; i++) {
                    CodigoSerie = '0' + CodigoSerie;
                }
            }
            //Ponemos en formato de 9 digitos
            var CodigoFactura = '' + NumeroFactura;
            if (CodigoFactura.length < 9) {
                for (let i = CodigoFactura.length; i < 9; i++) {
                    CodigoFactura = '0' + CodigoFactura;
                }
            }
            NFactura = CodigoSucursal + '-' + CodigoSerie + '-' + CodigoFactura;
        }
        else {
            NFactura = '' + NumeroFactura;
        }
        get$ebilling$ConsultaFacturaXml(NFactura, function (res) {
            //convert base64 string to byte array
            //var byteCharacters = atob(res.Datos);
            //var byteNumbers = new Array(byteCharacters.length);
            //for (var i = 0; i < byteCharacters.length; i++) {
            //    byteNumbers[i] = byteCharacters.charCodeAt(i);
            //}
            //var byteArray = new Uint8Array(byteNumbers);
            // now that we have the byte array, construct the blob from it
            var blob1 = new Blob([res], { type: "text/xml" });
            var fileName1 = ("Factura_" + NumeroFactura).replace("-", "_") + ".xml";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    }
    functionDescargaRide = DescargarRIDE2;
    function DescargarRIDE2(diCodigoProducto, diCodigoSucursal, diSerieFacturacion, diNumeroFactura) {
        var CodProducto = diCodigoProducto;
        var NFactura = '';
        if (CodProducto === 'IND' || CodProducto === 'ONC') {
            var CodigoSucursal = diCodigoSucursal;
            if (CodigoSucursal.length < 3) {
                for (let i = CodigoSucursal.length; i < 3; i++) {
                    CodigoSucursal = '0' + CodigoSucursal;
                }
            }
            //Ponemos 3 digitos xxx
            var CodigoSerie = diSerieFacturacion;
            if (CodigoSerie.length < 3) {
                for (let i = CodigoSerie.length; i < 3; i++) {
                    CodigoSerie = '0' + CodigoSerie;
                }
            }
            //Ponemos en formato de 9 digitos
            var CodigoFactura = diNumeroFactura;
            if (CodigoFactura.length < 9) {
                for (let i = CodigoFactura.length; i < 9; i++) {
                    CodigoFactura = '0' + CodigoFactura;
                }
            }
            NFactura = CodigoSucursal + '-' + CodigoSerie + '-' + CodigoFactura;
        }
        else {
            NFactura = '' + diNumeroFactura;
        }
        get$ebilling$ConsultaFacturaPdf(NFactura, function (res) {
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
            var fileName1 = "Factura_" + diNumeroFactura.replace("-", "_") + ".pdf";
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
    functionDescargaSoportePdf = DescargarSoportes2;
    function DescargarSoportes2(IDEmpresa, IDSucursal, IDCuota) {
        get$facturacion$ObtenerDatosReporteSoportesFactura(IDEmpresa, IDSucursal, IDCuota, 1, function (res) {
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
            var fileName1 = "Soportes_" + IDSucursal.toString() + ".pdf";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    }
    functionDescargaSoporteExcel = DescargarSoportesExcel2;
    function DescargarSoportesExcel2(IDEmpresa, IDSucursal, IDCuota) {
        //tipo de reporte2 excel
        get$facturacion$ObtenerDatosReporteSoportesFactura(IDEmpresa, IDSucursal, IDCuota, 2, function (res) {
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
            var fileName1 = "Soportes_" + IDSucursal.toString() + ".xlsx";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    }
    functionVerDetalleCuota = VerCuota;
    function VerCuota(NumeroFactura, ValorCouta, ValorServiciosAdicionales, ValorGastosAdministrativos, ValorTarjeta, ValorSeguroCampesino, ValorTotal) {
        $('#VC_numeroFactura').text('');
        $('#VC_valorCuota').text('');
        $('#VC_valorServiciosAdicionales').text('');
        $('#VC_valorGastosAdministrativos').text('');
        $('#VC_valorTarjetas').text('');
        $('#VC_valorSeguroCampesimo').text('');
        $('#VC_total').text('');
        //llenamos
        $('#VC_numeroFactura').text(NumeroFactura);
        $('#VC_valorCuota').text(ValorCouta);
        $('#VC_valorServiciosAdicionales').text(ValorServiciosAdicionales);
        $('#VC_valorGastosAdministrativos').text(ValorGastosAdministrativos);
        $('#VC_valorTarjetas').text(ValorTarjeta);
        $('#VC_valorSeguroCampesimo').text(ValorSeguroCampesino);
        $('#VC_total').text(ValorTotal);
        //mostramos
        $("#ventana_Cuota").data('kendoWindow').center().open();
    }
});
//# sourceMappingURL=Reportes.js.map